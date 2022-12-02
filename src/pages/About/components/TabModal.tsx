import { Button } from 'antd';
import React, { useState } from 'react';
import QkModal from '@/components/QkModal/index';

const TabModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const closeModal = () => setVisible(false);
  const openModal = () => setVisible(true);
  const onOk = () => {
    closeModal();
    QkModal.success({
      title: '关闭成功',
    });
  };
  const onCancel = () => {
    closeModal();
    QkModal.confirm({
      title: '确定关闭吗',
      onOk: closeModal,
    });
  };
  return (
    <div>
      <Button onClick={openModal}>open Modal</Button>
      <QkModal
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <div>
          hello world
        </div>
      </QkModal>
    </div>
  );
};

export default TabModal;
