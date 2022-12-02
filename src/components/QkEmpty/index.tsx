/* eslint-disable react/jsx-props-no-spreading */
import { Empty, EmptyProps } from 'antd';
import React from 'react';

interface IProps extends EmptyProps {
  // custom props
}

interface EmptyType extends React.FC<IProps> {
}
const QkEmpty: EmptyType = (props) => (
  <div className="qk-component-empty">
    <Empty {...props} />
  </div>
);

export default Object.assign(QkEmpty, {
  PRESENTED_IMAGE_DEFAULT: Empty.PRESENTED_IMAGE_DEFAULT,
  PRESENTED_IMAGE_SIMPLE: Empty.PRESENTED_IMAGE_SIMPLE,
});
