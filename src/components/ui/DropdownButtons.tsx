import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DialogDeleteItem from './ModalDeleteItem';
import DialogEditIngredient from '@/components/dialog/DialogEditIngredient';
import { Edit, Trash2 } from 'lucide-react';

export default function DropdownButtons({
  idItem,
  recipeId,
  url
}: {
  idItem: string;
  recipeId?: number;
  url: string;
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const router = useRouter();

  const handleDeleteDialog = () => {
    setOpenDeleteDialog(!openDeleteDialog);
  };
  const handleEditDialog = () => {
    setOpenEditDialog(!openEditDialog);
  };

  const handleEdit = () => {
    if (url === '/recipes') router.push(`/calculator/${idItem}`);

    if (url === '/ingredients') {
      handleEditDialog();
    }
    
    if (url === '/additional') {
      handleEditDialog();
    }
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
          <DropdownMenuItem
            className="flex justify-evenly items-center cursor-pointer gap-1"
            onClick={() => handleEdit()}
          >
            <Edit size={19} />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpenDeleteDialog(true)}
            className="flex justify-evenly items-center cursor-pointer"
          >
            <Trash2 size={19} />
            <span>Deletar</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogDeleteItem
        id={idItem}
        url={url}
        recipeId={recipeId}
        open={openDeleteDialog}
        handleClose={handleDeleteDialog}
      />
      <DialogEditIngredient
        ingredientId={idItem}
        url={url}
        recipeId={recipeId}
        open={openEditDialog}
        handleClose={handleEditDialog}
      />
    </>
  );
}
