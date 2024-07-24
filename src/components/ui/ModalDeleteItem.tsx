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

function DialogDeleteItem({
  id,
  open,
  handleClose
}: {
  id: number;
  open: boolean;
  handleClose: () => void;
}) {
  async function handleDeleteItem() {
    try {
      await api.delete(`/recipes/${id}`);
      handleClose();
    } catch (error) {
      alert('erro delete item');
    }
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
