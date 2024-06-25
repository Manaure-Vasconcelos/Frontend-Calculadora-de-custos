'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Table } from 'react-bootstrap';
import axios from '@/lib/axiosConfig';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

interface Props {
  id: string;
}

interface Ingredient {
  id: number;
  name: string;
  usedWeight: number;
  grossWeight: number;
  marketPrice: number;
  realAmount: number;
  recipeId: number;
}

interface Recipe {
  id: string;
  title: string;
  describe: string | null;
  valuePartial: number;
  ingredients: Ingredient[];
  createAt: Date;
}

interface IngredientRequest {
  name: string;
  usedWeight: number;
  grossWeight: number;
  marketPrice: number;
}

export default function AddItems({ id }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IngredientRequest>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const router = useRouter();

  const LoadingAnimation = dynamic(
    () => import('@/components/ui/LoadingAnimation'),
    {
      ssr: false
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Recipe>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/${id}`
        );
        setRecipe(res.data);
      } catch (err) {
        alert('Login expirado, você será redirecionado.');
        router.push('/auth/login');
      }
    };

    fetchData();
  }, []);

  if (!recipe) return <LoadingAnimation height={250} width={250} />;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    /* const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/recipes`,
      data
    );

    if (res.status === 201) {
      onRequestClose();
      router.push('/calculator');
    } */
  });

  return (
    recipe && (
      <div className="border roudend-lg w-1/2">
        <header>
          <h2>{recipe.title}</h2>
        </header>
        <main className="p-4 m-2 bg-slate-700 rounded-lg">
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
                type="text"
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
                type="text"
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
                type="text"
                {...register('grossWeight', {
                  required: true
                })}
                className="block p-2 w-full bg-slate-900 text-slate-300 rounded"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Create
              </button>
            </form>
          </div>
          <Table striped bordered hover className="w-full table-fixed">
            <thead>
              <tr className="border-b-2">
                <th className="w-1/3 pb-4">Name</th>
                <th className="w-1/4 pb-4">Used Weight</th>
                <th className="w-1/4 pb-4">Market Price</th>
                <th className="w-1/4 pb-4">Gross Weight</th>
                <th className="w-1/4 pb-4">Real Amount</th>
                <th className="w-1/6 pb-4"></th>
              </tr>
            </thead>

            {recipe.ingredients.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={4} className="w-full text-center py-4">
                    Adicione um ingrediente para exibi-lo
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {recipe?.ingredients.map((ingredient) => (
                  <tr key={ingredient.id}>
                    <th className="w-1/3 py-2 pl-3 text-left">
                      {ingredient.name}
                    </th>
                    <th className="w-1/4 py-2">{ingredient.usedWeight}</th>
                    <th className="w-1/4 py-2">{ingredient.marketPrice}</th>
                    <th className="w-1/4 py-2">{ingredient.grossWeight}</th>
                    <th className="w-1/4 py-2">{ingredient.realAmount}</th>
                    <th className="w-1/6 py-2">
                      <button
                        className="bg-transparent px-2 py-1 rounded transform transition-transform duration-200 hover:scale-110"
                        onClick={() => {}}
                      >
                        <img
                          src="/editIcon.svg"
                          alt="Editar"
                          className="inline-block align-text-top"
                          height="21"
                          width="21"
                        />
                      </button>
                      <button
                        className="bg-transparent px-2 py-1 rounded transform transition-transform duration-200 hover:scale-110"
                        onClick={() => {}}
                      >
                        <img
                          src="/deleteIcon.svg"
                          alt="Delete"
                          className="inline-block align-text-top"
                          height="21"
                          width="21"
                        />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </main>
      </div>
    )
  );
}
