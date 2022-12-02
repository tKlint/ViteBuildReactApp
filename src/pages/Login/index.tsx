import QkForm from '@/components/QkForm';
import { API_LOGIN } from '@/service/login';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUser } from '@/store/user';
import { Checkbox, Input } from 'antd';
import React from 'react';

import './style.less';

type IProps = {};
const Login: React.FC<IProps> = (props) => {
  console.log(props, 'login');
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  type LoginFeild = API_LOGIN.LoginData;
  const submitLogin = (formData: LoginFeild) => {
    dispatch(fetchUser(formData));
    return Promise.resolve(true);
  };
  return (
    <div className="page-Login">
      <div className="login-form-content">
        {user.token}
        <QkForm<LoginFeild>
          qk="2"
          onFinish={submitLogin}
        >
          <QkForm.Item
            name="userName"
          >
            <Input placeholder="请输入账号" />
          </QkForm.Item>
          <QkForm.Item
            name="userPassword"
          >
            <Input type="password" placeholder="请输入密码" />
          </QkForm.Item>
          <QkForm.Item
            name="autoLogin"
          >
            <Checkbox>记住密码</Checkbox>
          </QkForm.Item>
        </QkForm>
      </div>
    </div>
  );
};

export default Login;
