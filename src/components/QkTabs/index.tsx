/* eslint-disable react/jsx-props-no-spreading */
import { Tabs, TabsProps } from 'antd';

interface IProps extends TabsProps {
  // custom props
}

interface QkTabsType {
  (props: IProps): JSX.Element;
}

const { TabPane } = Tabs;

const QkTabs: QkTabsType = (props) => (
  <div className="qk-component-tabs">
    <Tabs {...props} />
  </div>
);

export default Object.assign(QkTabs, { TabPane });
