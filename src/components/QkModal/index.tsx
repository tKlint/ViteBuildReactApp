/* eslint-disable react/jsx-props-no-spreading */
import { Modal, ModalProps } from 'antd';

interface IProps extends ModalProps {
  // custom props
}

type QkModalType = React.FC<IProps> & {

}

const {
  config,
  confirm,
  destroyAll,
  info,
  success,
  error,
  warn,
  warning,
  useModal,
} = Modal;

const QkModal: QkModalType = (props) => (
  <div className="qk-component-modal">
    <Modal {...props} />
  </div>
);

export default Object.assign(QkModal, {
  config,
  confirm,
  destroyAll,
  info,
  success,
  error,
  warn,
  warning,
  useModal,
});
