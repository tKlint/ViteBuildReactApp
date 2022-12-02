import React from 'react';
import { useAppSelector } from '@/store/hooks';

type IProps = {
  /**
   * 权限标记
   */
  tag: React.Key;
  /**
   * 指定用户权限
   * @description 默认从用户状态redux中获取
   */
  access?: React.Key[];
  /**
   * 权限通过后渲染的内容
   */
  children: JSX.Element;
  /**
   * 权限不通过时渲染的内容
   */
  fallback?: JSX.Element;
}
const Authorized: React.FC<IProps> = (props) => {
  const { permissions } = useAppSelector((state) => state.user);
  const {
    access = [], fallback = null, children, tag,
  } = props;
  return (
    (permissions || access)?.includes(tag) ? children : fallback
  );
};

export default Authorized;
