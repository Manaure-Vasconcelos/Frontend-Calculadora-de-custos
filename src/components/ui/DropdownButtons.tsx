import { Button, Dropdown, DropdownItem, Modal } from 'flowbite-react';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DropdownButtons({ idRecipe }: { idRecipe: number }) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Dropdown
        label=""
        renderTrigger={() => (
          <svg
            className="w-6 h-6 text-black dark:text-white cursor-pointer hover:scale-105 transform"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#B7B7B7"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M6 12h.01m6 0h.01m5.99 0h.01"
            />
          </svg>
        )}
        placement="right"
      >
        <DropdownItem>
          <Link href={`/calculator/${idRecipe}`}>Edit</Link>
        </DropdownItem>
        <DropdownItem onClick={() => setOpenModal(true)}>Delete</DropdownItem>
      </Dropdown>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
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
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
