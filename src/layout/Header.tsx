import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import './style.less';
import HeaderRight from './HeaderRight';

const Header: React.FC<HeaderViewProps> = (props) => {
  const { onCollapse, collapsed } = props;
  const toggleMenu = () => {
    onCollapse?.(!collapsed);
  };
  const collapsedIconStyle = {
    fontSize: 18,
    paddingTop: 7,
  };
  return (
    <div className="layout-header">
      <Button onClick={toggleMenu} type="link" style={{ padding: 0 }}>
        {collapsed
          ? <MenuUnfoldOutlined style={collapsedIconStyle} />
          : <MenuFoldOutlined style={collapsedIconStyle} />}
      </Button>
      <HeaderRight />
    </div>
  );
};

export default Header;
