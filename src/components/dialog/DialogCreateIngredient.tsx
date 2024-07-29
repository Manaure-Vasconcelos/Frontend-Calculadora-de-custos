import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/axiosConfig';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Recipe } from '../AllRecipesDashboard';
import { useState } from 'react';
import { CirclePlus } from 'lucide-react';

interface Props {
  recipeId: string;
}

interface IngredientRequest {
  name: string;
  usedWeight: number;
  grossWeight: number;
  marketPrice: number;
}

export default function DialogCreateIngredient({ recipeId }: Props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IngredientRequest>();
  const queryClient = useQueryClient();

  const onSubmit = async (data: IngredientRequest) => {
    const res = await api.post(`/ingredients/${recipeId}`, {
      name: data.name,
      usedWeight: Number(data.usedWeight),
      grossWeight: Number(data.grossWeight),
      marketPrice: Number(data.marketPrice)
    });
    return res.data;
  };

  const { mutateAsync: createIngredient } = useMutation({
    mutationFn: onSubmit,
    onSuccess(returnFn, variables, context) {
      const { data } = returnFn;
      queryClient.setQueryData(['recipe'], (previewData: Recipe) => {
        return {
          ...previewData,
          ingredients: [...previewData.ingredients, data]
        };
      });
    }
  });

  const HandleOnSubmit = async (data: IngredientRequest) => {
    try {
      await createIngredient(data);
      reset();
      setOpen(false);
    } catch (error) {
      alert('error query');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full p-0 w-7 h-7 hover:bg-primary"
          variant={'secondary'}
        >
          <CirclePlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Item:</DialogTitle>
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
