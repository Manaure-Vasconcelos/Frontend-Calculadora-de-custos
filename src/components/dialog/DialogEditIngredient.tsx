import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/axiosConfig';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RecipeProps } from '../AllRecipesDashboard';

interface Props {
  ingredientId: string;
  open: boolean;
  handleClose: () => void;
}

interface IngredientRequest {
  name: string;
  usedWeight: number;
  grossWeight: number;
  marketPrice: number;
}

export default function DialogEditIngredient({
  ingredientId,
  open,
  handleClose
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IngredientRequest>();
  const queryClient = useQueryClient();

  const onSubmit = async (data: IngredientRequest) => {
    const res = await api.put(`/ingredients/${ingredientId}`, {
      name: data.name ? data.name : undefined,
      usedWeight: data.usedWeight ? Number(data.usedWeight) : undefined,
      grossWeight: data.grossWeight ? Number(data.grossWeight) : undefined,
      marketPrice: data.marketPrice ? Number(data.marketPrice) : undefined
    });
    return res.data;
  };

  const { mutateAsync: updateIngredient } = useMutation({
    mutationFn: onSubmit,
    onSuccess(returnFn, variables, context) {
      const { data } = returnFn;
      queryClient.setQueryData(['recipe'], (previewData: RecipeProps) => {
        const updatedIngredients = previewData.ingredients.map((item) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        });
        return {
          ...previewData,
          ingredients: updatedIngredients
        };
      });
    }
  });

  const HandleOnSubmit = async (data: IngredientRequest) => {
    try {
      await updateIngredient(data);
      reset();
      handleClose();
    } catch (error) {
      alert('error query');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar:</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(HandleOnSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <label htmlFor="name" className="text-right col-span-2">
                Nome:
              </label>
              <Input
                id="name"
                type="text"
                className="col-span-3 sm:max-w-[200px]"
                autoFocus
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Name is required'
                  }
                })}
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <label htmlFor="usedWeight" className="text-right col-span-2">
                Quant. usada:
              </label>
              <Input
                id="usedWeight"
                type="number"
                className="col-span-3 sm:max-w-[200px]"
                {...register('usedWeight', {
                  required: true
                })}
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <label htmlFor="marketPrice" className="text-right col-span-2">
                Preço bruto:
              </label>
              <Input
                id="marketPrice"
                type="number"
                className="col-span-3 sm:max-w-[200px]"
                {...register('marketPrice', {
                  required: true
                })}
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <label htmlFor="grossWeight" className="text-right col-span-2">
                Quant. total:
              </label>
              <Input
                id="grossWeight"
                type="number"
                className="col-span-3 sm:max-w-[200px]"
                {...register('grossWeight', {
                  required: true
                })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button>Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
