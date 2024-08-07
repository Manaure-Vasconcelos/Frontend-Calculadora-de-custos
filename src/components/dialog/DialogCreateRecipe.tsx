import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axiosConfig';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RecipeProps } from '../AllRecipesDashboard';
import { useState } from 'react';
import { CirclePlus } from 'lucide-react';

interface RecipeRequest {
  title: string;
  describe?: string;
}

export default function DialogCreateRecipe() {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RecipeRequest>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const fetchData = async (data: RecipeRequest) => {
    const res = await api.post(`/recipes`, data);
    return res.data;
  };

  const { mutateAsync: createRecipe } = useMutation({
    mutationFn: fetchData,
    onSuccess(returnFn, variables, context) {
      const { data } = returnFn;
      queryClient.setQueryData(['recipes'], (previewData: RecipeProps[]) => {
        return [...previewData, data];
      });
    }
  });

  const onSubmit = async (data: RecipeRequest) => {
    try {
      const res = await createRecipe(data);
      setOpen(false);
      reset();
      router.push(`/calculator/${res.data.id}`);
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
          <DialogTitle>Criar Produto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right">
                Nome:
              </label>
              <Input
                id="title"
                className="col-span-3"
                autoFocus
                {...register('title', {
                  required: {
                    value: true,
                    message: 'Title is required'
                  }
                })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="username" className="text-right">
                Descrição:
              </label>
              <Input
                id="describe"
                className="col-span-3"
                {...register('describe', {
                  required: false
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
