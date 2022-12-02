import React from 'react';
import { Button, Result } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

type INotFoundProps = {
  isNotFoundModule?: boolean;
  modulePath?: string;
};

const NotFound: React.FC<INotFoundProps> = (props) => {
  const { pathname } = useLocation();
  const { modulePath, isNotFoundModule } = props;
  const navigate = useNavigate();
  const errMessage = isNotFoundModule ? '文件不存在' : '页面不存在';
  const errSubMessage = isNotFoundModule
    ? `文件: ${modulePath}不存在, 请确认文件路径是否正确`
    : `页面: ${pathname}不存在, 请确认路由地址是否正确`;
  const backToHome = () => {
    navigate('/');
  };
  return (
    <div>
      <Result
        status="404"
        title={errMessage}
        subTitle={errSubMessage}
        extra={<Button type="primary" onClick={backToHome}>返回主页</Button>}
      />
    </div>
  );
};

export default NotFound;
