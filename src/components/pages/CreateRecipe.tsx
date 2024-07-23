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
import { Recipe } from './AllRecipesDashboard';

interface RecipeRequest {
  title: string;
  describe?: string;
}

export default function DialogCreateRecipe() {
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
      const {data} = returnFn
      queryClient.setQueryData(['recipes'], (previewData: Recipe[]) => {
        return [ ...previewData, data ];
      });
    }
  });

  const onSubmit = async (data: RecipeRequest) => {
    try {
      const res = await createRecipe(data);
      reset();
      router.push(`/calculator/${res.data.id}`);
    } catch (error) {
      alert('error query');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Recipe</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Recipe</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Title:
              </label>
              <Input
                id="title"
                className="col-span-3"
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
                Describe:
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
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
    /*     <ModalDefault
      isModalOpen={isModalOpen}
      onRequestClose={onRequestClose}
      onBackdropClick={onRequestClose}
    >
      <main
        className="fixed inset-0 bg-black bg-opacity-75"
        onClick={onRequestClose}
      ></main>
      <div
        className="bg-slate-600 rounded-lg p-6 shadow-lg absolute w-80 z-10 "
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <span className="flex justify-between items-center">
          <h2 className="text-xl mb-3">Create New Recipe</h2>
          <button className="rounded-lg mb-4 mr-2" onClick={onRequestClose}>
            X
          </button>
        </span>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <label htmlFor="title" className="text-white block text-sm text-left">
            Title:
          </label>
          <input
            type="text"
            {...register('title', {
              required: {
                value: true,
                message: 'Title is required'
              }
            })}
            className="block p-2 w-full bg-slate-900 text-slate-300 rounded"
            autoFocus
          />

          {errors.title && (
            <span className="text-red-500 text-xs">{errors.title.message}</span>
          )}

          <label
            htmlFor="describe"
            className="text-white block text-sm text-left"
          >
            Describe:
          </label>
          <input
            type="text"
            {...register('describe', {
              required: false
            })}
            className="block p-2 w-full bg-slate-900 text-slate-300 rounded"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Create
          </button>
        </form>
      </div>
    </ModalDefault> */
  );
}
