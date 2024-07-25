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
  open,
  handleClose
}: {
  id: number;
  open: boolean;
  handleClose: () => void;
}) {
  const queryClient = useQueryClient();
  const onDeleteItem = async () => {
    try {
      await api.delete(`/recipes/${id}`);
    } catch (error) {
      alert('erro delete item');
    }
  };

  const { mutateAsync: deleteItem } = useMutation({
    mutationFn: onDeleteItem,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
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
