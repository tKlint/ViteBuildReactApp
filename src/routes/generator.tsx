import { IMenus, UserState } from '@/store/user';
import React, { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
// import type { Route } from '@ant-design/pro-layout/lib/typings';
import WrapperRouteComponent from './WrapperRouteComponent';
import { getDynamicModule, ModuleElemnet } from './modules';

const NotFound = React.lazy(() => import('@/pages/NotFound'));
/**
 * 根据json生产路由对象
 * @param routes 服务端返回路由json
 * @param parentPath 父路由
 * @returns RouteObject
 */
export const generateRoutes = (routes: UserState['routes']): (RouteObject | undefined)[] => {
  if (!routes) {
    return [];
  }
  return routes.map((menus) => {
    const { children, component, path } = menus;
    const routeProps: RouteObject = {
      path,
      children: children ? (generateRoutes(children) as RouteObject[]) : undefined,
      element: undefined,
    };
    if (component) {
      const dynamicModule = getDynamicModule(component);
      const ModuleComponent = lazy<React.FC>(dynamicModule as unknown as ModuleElemnet);
      let element = <ModuleComponent />;
      if (!dynamicModule) {
        element = <NotFound isNotFoundModule modulePath={component} />;
      }
      routeProps.element = <WrapperRouteComponent element={element} auth={false} />;
    }
    return routeProps;
  });
};

/**
 * 根据json生产菜单对象
 * @param routes 服务端返回路由json
 * @returns
 */
export function generateMenus(routes: UserState['routes']): IMenus[] {
  if (!routes) {
    return [];
  }
  return routes.map((item) => {
    const icon = item.icon || '';
    return {
      icon,
      name: item.name,
      path: item.path,
      children: item.children ? generateMenus(item.children) : undefined,
      meta: item.meta,
      target: item.target,
      hideInMenu: item.hideInMenu,
      fullScreen: item.fullScreen,
    } as IMenus;
  });
}
