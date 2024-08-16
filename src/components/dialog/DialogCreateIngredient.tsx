import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Controller, useForm } from 'react-hook-form';
import { api } from '@/lib/axiosConfig';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface Props {
  recipeId: number;
}

interface IngredientRequest {
  name: string;
  usedWeight: number;
  grossWeight: number;
  marketPrice: number;
  choose: string;
}

export default function DialogCreateIngredient({ recipeId }: Props) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm<IngredientRequest>();
  const queryClient = useQueryClient();

  const onSubmit = async (data: IngredientRequest) => {
    if (data.choose === 'item') {
      console.log('aqui');
      const res = await api.post(`/ingredients/${recipeId}`, {
        name: data.name,
        usedWeight: Number(data.usedWeight),
        marketPrice: Number(data.marketPrice),
        grossWeight: Number(data.grossWeight)
      });
      return res.data;
    }

    if (data.choose === 'additional') {
      const res = await api.post(`/additional/${recipeId}`, {
        name: data.name,
        usedWeight: Number(data.usedWeight),
        marketPrice: Number(data.marketPrice),
        grossWeight: Number(data.grossWeight)
      });
      return res.data;
    }
  };

  const { mutateAsync: createIngredient } = useMutation({
    mutationFn: onSubmit,
    onSuccess(returnFn, variables, context) {
      queryClient.setQueryData(['recipe'], () => {
        return returnFn;
      });
    }
  });

  const HandleOnSubmit = async (data: IngredientRequest) => {
    try {
      await createIngredient(data);
      reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
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
        <form onSubmit={handleSubmit(HandleOnSubmit)}>
          <DialogHeader className="gap-3">
            <DialogTitle>Adicionar:</DialogTitle>
            <Controller
              control={control}
              name="choose"
              defaultValue="item"
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  defaultValue="item"
                  orientation="horizontal"
                  className="flex flex-row justify-evenly"
                  value={value}
                  onValueChange={onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="item" id="item" />
                    <label htmlFor="item">Item.</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="additional" id="additional" />
                    <label htmlFor="additional">Adicional.</label>
                  </div>
                </RadioGroup>
              )}
            />
          </DialogHeader>
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
