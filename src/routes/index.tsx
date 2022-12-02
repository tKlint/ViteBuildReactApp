import React, { Suspense, useEffect, useMemo } from 'react';
import {
  Navigate, RouteObject, useLocation, useNavigate, useRoutes,
} from 'react-router-dom';
import { cloneDeep } from 'lodash';
import { generateRoutes } from '@/routes/generator';
import SuspendFallbackLoading from '@/layout/SuspendFallbackLoading';
import WrapperRouteComponent from './WrapperRouteComponent';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { afterLogin } from '../store/user';

const NotFound = React.lazy(() => import('@/pages/NotFound'));
const Login = React.lazy(() => import('@/pages/Login'));
const Layout = React.lazy(() => import('../layout'));

const defaultRouters: RouteObject[] = [
  {
    path: '/login',
    element: <WrapperRouteComponent auth={false} element={<Login />} />,
  },
  {
    path: '/',
    element: <WrapperRouteComponent auth element={<Layout />} />,
    children: [],
  },
];

const notFoundPage = [
  {
    path: '*',
    element: <WrapperRouteComponent auth element={<NotFound />} />,
  },
];

const RenderRouter: React.FC<{ routerList: RouteObject[] }> = ({ routerList }) => {
  const element = useRoutes(routerList);
  return <Suspense fallback={<SuspendFallbackLoading message="请等待" size="full" />}>{element}</Suspense>;
};

export default function DynamicRouter() {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { pathname, state, search } = useLocation();

  const navigate = useNavigate();

  const { token, routes, userNo = '' } = user;
  useEffect(() => {
    // 未登录访问其他页面
    if (!token && pathname !== '/login') {
      const encodePathname = encodeURIComponent(`${pathname}${search}`);
      return navigate(
        { pathname: '/login', search: `?redirect=${encodePathname}` },
        { replace: true, state: { from: pathname } },
      );
    }
    // 已登录访问登录页面
    if (token && pathname === '/login') {
      const redirect = search;
      if (redirect) {
        const [targetPath, targetSearch] = decodeURIComponent(redirect).split('?redirect=')[1].split('?');
        return navigate({ pathname: targetPath, search: targetSearch ? `?${targetSearch}` : '' });
      }
      return navigate({ pathname: '/' });
    }
    // 已登录未获取路由
    if (token && !routes?.length) {
      dispatch(afterLogin({ token, userNo }));
    }
    return () => {};
  }, [token, pathname, state]);

  const newRoutes = useMemo(() => {
    const routesInstance = cloneDeep(defaultRouters);
    const routesWithComponent = generateRoutes(routes) as RouteObject[];
    const layoutRoute = routesInstance.find((item) => item.path === '/')?.children;
    // const defaultPage = routesWithComponent[0]?.path || '';
    const defaultRouter = {
      path: '/',
      element: <Navigate to="home" />,
    };
    layoutRoute?.push(defaultRouter, ...cloneDeep([...routesWithComponent]), ...notFoundPage);
    return routesInstance;
  }, [routes]);
  return <RenderRouter routerList={newRoutes} />;
}
