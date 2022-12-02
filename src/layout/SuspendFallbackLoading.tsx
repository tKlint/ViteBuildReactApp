import { Spin } from 'antd';
import React, { FC } from 'react';

import './style.less';

interface FallbackMessageProps {
  message: string;
  size?: 'full' | 'auto';
}

export const SuspendFallbackLoading: FC<FallbackMessageProps> = (props) => {
  const { size = 'auto', message } = props;
  const wrapHeightMap = {
    full: '100vh',
    auto: '100%',
  };

  return (
    <div className="layout-fallbak-loading" style={{ height: wrapHeightMap[size] }}>
      <Spin tip={message} />
    </div>
  );
};

export default SuspendFallbackLoading;
