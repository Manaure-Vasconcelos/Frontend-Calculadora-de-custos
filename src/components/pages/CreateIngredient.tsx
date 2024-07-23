import { useForm } from 'react-hook-form';
import { api } from '@/lib/axiosConfig';
import ModalDefault from '../ui/ModalDefault';

interface Props {
  recipeId: string;
  isModalOpen: boolean;
  onRequestClose: () => void;
}

interface IngredientRequest {
  name: string;
  usedWeight: number;
  grossWeight: number;
  marketPrice: number;
}

export default function CreateIngredient({
  recipeId,
  isModalOpen,
  onRequestClose
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IngredientRequest>();

  const onSubmit = handleSubmit(async (data) => {
    const res = await api.post(`/ingredients/${recipeId}`, {
      name: data.name,
      usedWeight: Number(data.usedWeight),
      grossWeight: Number(data.grossWeight),
      marketPrice: Number(data.marketPrice)
    });

    console.log(res);

    onRequestClose();
  });

  return (
    <ModalDefault
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
        <div>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <label
              htmlFor="name"
              className="text-white block text-sm text-left"
            >
              Name:
            </label>
            <input
              type="text"
              {...register('name', {
                required: {
                  value: true,
                  message: 'Name is required'
                }
              })}
              className="block p-2 w-full bg-slate-900 text-slate-300 rounded"
              autoFocus
            />

            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}

            <label
              htmlFor="usedWeight"
              className="text-white block text-sm text-left"
            >
              Used Weight:
            </label>
            <input
              type="number"
              {...register('usedWeight', {
                required: true
              })}
              className="block p-2 w-full bg-slate-900 text-slate-300 rounded"
            />

            <label
              htmlFor="marketPrice"
              className="text-white block text-sm text-left"
            >
              Market Price:
            </label>
            <input
              type="number"
              {...register('marketPrice', {
                required: true
              })}
              className="block p-2 w-full bg-slate-900 text-slate-300 rounded"
            />

            <label
              htmlFor="grossWeight"
              className="text-white block text-sm text-left"
            >
              Gross Weight:
            </label>
            <input
              type="number"
              {...register('grossWeight', {
                required: true
              })}
              className="block p-2 w-full bg-slate-900 text-slate-300 rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </ModalDefault>
  );
}
