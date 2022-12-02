/* eslint-disable react/jsx-props-no-spreading */
import { Menu, MenuProps } from 'antd';

interface IProps extends MenuProps {
  // custom props
}

interface QkMenuType extends React.FC<IProps> {

}

const {
  Divider, Item, SubMenu, ItemGroup,
} = Menu;

/**
 * @description Antd Menu使用React.Component封装
 * @description QkMenu使用Hook对Antd Menu进行二次封装
 */
const QkMenu: QkMenuType = (props) => (
  <div className="qk-component-menu">
    <Menu {...props} />
  </div>
);

export default Object.assign(QkMenu, {
  Divider, Item, SubMenu, ItemGroup,
});
