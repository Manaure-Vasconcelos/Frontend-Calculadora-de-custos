import { api } from '@/lib/axiosConfig';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function ModalDeleteItem({
  openModal,
  setOpenModal,
  id
}: {
  openModal: boolean;
  setOpenModal: () => void;
  id: number;
}) {
  async function handleDeleteItem() {
    await api.delete(`/recipes/${id}`);
    setOpenModal();
  }

  return (
    <Modal
      show={openModal}
      size="md"
      onClose={setOpenModal}
      popup
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75 mx-auto"
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="gray" onClick={() => handleDeleteItem()}>
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={setOpenModal}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDeleteItem;
