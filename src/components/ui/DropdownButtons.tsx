import { Button, Dropdown, DropdownItem, Modal } from 'flowbite-react';
import Link from 'next/link';
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import ModalDeleteItem from './ModalDeleteItem';

export default function DropdownButtons({ idRecipe }: { idRecipe: number }) {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
      <ModalDeleteItem
        openModal={openModal}
        setOpenModal={handleCloseModal}
        id={idRecipe}
      />
    </>
  );
}
