import { api } from '@/lib/axiosConfig';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function DialogDeleteItem({
  id,
  recipeId,
  url,
  open,
  handleClose
}: {
  id: string;
  url: string;
  recipeId?: number;
  open: boolean;
  handleClose: () => void;
}) {
  const queryClient = useQueryClient();
  const IngredientOrAdditional = ['/ingredients', '/additional'].includes(url);
  const onDeleteItem = async () => {
    try {
      if (url === '/recipes') {
        await api.delete(`${url}/${id}`);
      }

      if (IngredientOrAdditional) {
        await api.delete(`${url}/${recipeId}/${id}`);
      }
    } catch (error) {
      alert('erro delete item');
    }
  };

  const { mutateAsync: deleteItem } = useMutation({
    mutationFn: onDeleteItem,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['recipe'] });
    }
  });

  async function handleDeleteItem() {
    await deleteItem();
    handleClose();
  }

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this item?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action is irreversible. The item will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleClose()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteItem}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DialogDeleteItem;
