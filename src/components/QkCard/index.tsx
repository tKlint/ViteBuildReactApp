/* eslint-disable react/jsx-props-no-spreading */
import { Card, CardProps } from 'antd';

interface IProps extends CardProps {
  // custom props
}

type InternalCardType =
  React.FC<IProps & React.RefAttributes<HTMLDivElement>>;

interface QkCardType extends InternalCardType {

}

/**
 * @description Antd Card使用React.ForwardRefExoticComponent进行封装
 * @description QkCard使用React.FC对Antd Card进行二次封装
 * @description 由于Antd Card并没有使用Ref QkCard改写了类型
 * @param props
 * @returns
 */
const QkCard: QkCardType = (props) => (
  <div className="qk-component-card">
    <Card {...props} />
  </div>
);

export default Object.assign(QkCard, { Grid: Card.Grid, Meta: Card.Meta });
