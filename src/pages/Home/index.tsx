import Authorized from '@/components/Authorized';
import React from 'react';
import { Button, message } from 'antd';
import useAccess from '@/util/useAccess';
import './style.less';

type IProps = {};
const Home: React.FC<IProps> = () => {
  const hasAccess = useAccess('col:prod:df:detail');
  const accessList = useAccess()[1];
  const testAccess = () => {
    if (hasAccess) {
      message.success('我有权限:col:prod:df:detail');
    }
  };
  return (
    <div className="page-Home">
      Home
      <Authorized tag="hi">
        <div>
          你有权限吗
        </div>
      </Authorized>
      <Authorized tag="col:prod:df:detail">
        <div>我有权限</div>
      </Authorized>
      <Button onClick={testAccess}>权限检测</Button>
      <ul>
        {accessList.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
};

export default Home;
