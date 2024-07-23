import ModalDefault from '../pages/ui/ModalDefault';

interface Props {
  isModalOpen: boolean;
  onRequestClose: () => void;
}

export default function LoginExpired({ isModalOpen, onRequestClose }: Props) {
  return (
    <div>
      <ModalDefault
        isModalOpen={isModalOpen}
        onRequestClose={onRequestClose}
        onBackdropClick={onRequestClose}
      >
        <div>Sessão expirada, redirecionando...</div>
      </ModalDefault>
    </div>
  );
}
