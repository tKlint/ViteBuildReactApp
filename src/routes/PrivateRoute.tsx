import React from 'react';
import { useAppSelector } from '@/store/hooks';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IProps } from './WrapperRouteComponent';

/**
 * 授权校验组件
 * @param props
 * @returns
 */
const PrivateRoute: React.FC<IProps> = (props) => {
  const { element } = props;
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const toLogin = () => {
    navigate('/login');
  };
  return user.token ? (
    element as JSX.Element
  ) : (
    <Result status="error" title="授权过期" subTitle="请重新登录">
      <Button onClick={toLogin}>返回登录</Button>
    </Result>
  );
};

export default PrivateRoute;
