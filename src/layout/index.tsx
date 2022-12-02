/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import { useAppSelector } from '@/store/hooks';
import { IMenus } from '@/store/user';
import { flatArrayObject } from '@/util';
import { MenuDataItem, ProLayout } from '@ant-design/pro-layout';
import { Suspense, useMemo } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import SuspendFallbackLoading from './SuspendFallbackLoading';
import './style.less';

const Layout: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;
  const { QK_APP_LOGO_URL, QK_APP_TITLE } = import.meta.env;

  const user = useAppSelector((state) => state.user);

  const antMenus = useMemo(() => user.menus?.map((item) => ({
    ...item,
    icon: item.icon ? <i className={item.icon as string} /> : undefined,
  })), [user.menus]);

  const layoutRouteProps = {
    path: '/',
    routes: antMenus,
  };

  const menuItemRender = (itemProps: MenuDataItem, defaultDom: React.ReactNode) => {
    const { target = '_self', path } = itemProps;
    const isWebSite = /^http:|^https:/.test(path!);
    return (
      isWebSite
        ? <a target={target} href={path}>{defaultDom}</a>
        : <Link target={target} to={path!}>{defaultDom}</Link>
    );
  };

  const flatRoutes = flatArrayObject<IMenus>(user.menus || [], ['children']);
  const currentRouter = flatRoutes.find((item) => item.path === pathname);

  if (currentRouter?.fullScreen) {
    return <Outlet />;
  }

  return (
    <div>
      <ProLayout
        title={QK_APP_TITLE}
        logo={QK_APP_LOGO_URL}
        defaultCollapsed={false}
        location={{ pathname }}
        route={layoutRouteProps}
        style={{ minHeight: '100vh' }}
        menuItemRender={menuItemRender}
        fixedHeader
        fixSiderbar
        collapsedButtonRender={false}
        // eslint-disable-next-line react/jsx-props-no-spreading
        headerContentRender={(props) => <Header {...props} />}
      >
        <Suspense fallback={<SuspendFallbackLoading message="请等待" />}>
          <div className="layout-content">
            <Outlet />
          </div>
        </Suspense>
      </ProLayout>
    </div>
  );
};
export default Layout;
