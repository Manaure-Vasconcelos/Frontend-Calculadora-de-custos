import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useState } from 'react';
import DialogDeleteItem from './ModalDeleteItem';
import { DeleteIcon, Edit, Trash2 } from 'lucide-react';

export default function DropdownButtons({ idRecipe }: { idRecipe: number }) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseModal = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
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
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href={`/calculator/${idRecipe}`}>
            <DropdownMenuItem className="flex justify-evenly items-center cursor-pointer">
              <Edit size={19} />
              Edit
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpenDialog(true)}
            className="flex justify-evenly items-center cursor-pointer"
          >
            <Trash2 size={19} />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogDeleteItem
        id={idRecipe}
        open={openDialog}
        handleClose={handleCloseModal}
      />
    </>
  );
}
