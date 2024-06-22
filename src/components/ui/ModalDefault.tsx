import Modal from 'react-bootstrap/Modal';

interface Props {
  children: any;
  isModalOpen: boolean;
  onRequestClose: () => void;
  onBackdropClick: () => void;
}

export default function ModalDefault({
  children,
  isModalOpen,
  onRequestClose
}: Props) {
  return (
    <Modal
      show={isModalOpen}
      onHide={onRequestClose}
      onBackdropClick={onRequestClose}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      {children}
    </Modal>
  );
}
