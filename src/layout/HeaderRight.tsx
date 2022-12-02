import {
  Avatar, Dropdown, MenuProps, Space, Tag,
} from 'antd';
import React from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

import './style.less';
import { LogoutOutlined } from '@ant-design/icons';
import { signOut } from '@/store/user';

const HeaderRight: React.FC = () => {
  const { userName, avatarUrl } = useAppSelector((state) => state.user);
  const dispath = useAppDispatch();
  const logout = () => {
    dispath(signOut());
  };
  const dropDownItems: MenuProps['items'] = [
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ];
  return (
    <div className="layout-header-right">
      <Space>
        {import.meta.env.DEV && <Tag color="#108ee9">DEV</Tag>}
        <Dropdown menu={{ items: dropDownItems }} className="avatar-drop-down">
          <div className="avatar-content">
            <Avatar size="small" src={avatarUrl} />
            <span>{userName}</span>
          </div>
        </Dropdown>
      </Space>
    </div>
  );
};

export default HeaderRight;
