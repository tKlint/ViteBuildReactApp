/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { RouteProps } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

export type IProps = RouteProps & {
  auth?: boolean;
  element: React.ReactNode;
};

/**
 * 路由容器组件
 * @descriptions 判断是当前页面是否需要登录
 * @param props
 * @returns
 */
const WrapperRouteComponent: React.FC<IProps> = (props) => {
  const { auth, element } = props;
  return auth ? <PrivateRoute {...props} /> : (element as JSX.Element);
};
export default WrapperRouteComponent;
