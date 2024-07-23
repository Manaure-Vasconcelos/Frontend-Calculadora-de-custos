'use client';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { api } from '@/lib/axiosConfig';
import dynamic from 'next/dynamic';
import CreateIngredient from './CreateIngredient';
import DropdownButtons from '../ui/DropdownButtons';
import { Ingredient, Recipe } from './AllRecipesDashboard';
import { useQuery } from '@tanstack/react-query';

interface Props {
  id: string;
}

export default function FullRecipe({ id }: Props) {
  const [isModalOpen, setModalOpen] = useState(false);

  const LoadingAnimation = dynamic(
    () => import('@/components/ui/LoadingAnimation'),
    {
      ssr: false
    }
  );

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const fetchData = async () => {
    try {
      const res = await api.get<Recipe>(`/recipes/${id}`);
      return res.data;
    } catch (err: any) {
      return err.message;
    }
  };

  const {
    data: recipe,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['recipe'],
    queryFn: fetchData,
    refetchOnWindowFocus: false
  });

  if (isLoading)
    return (
      <div className="border rounded-lg p-4 w-[300px] h-full flex flex-col items-start">
        <LoadingAnimation height={250} width={250} />
      </div>
    );

  if (isError)
    return (
      <div className="border rounded-lg p-4 w-[300px] h-full flex flex-col items-start">
        {error.message}
      </div>
    );

  return (
    recipe && (
      <div className="border rounded-lg flex flex-col items-start flex-1 p-4 min-w-[350px] max-w-[450px] h-full sm:min-w-[450px] sm:max-w-[600px] sm:h-full overflow-hidden">
        <header className="flex justify-between items-center">
          <h2 className="text-2xl ml-5">{recipe.title}</h2>
          <button
            className="px-3 py-2 rounded bg-slate-500 hover:bg-slate-700 my-5 mx-3"
            onClick={handleOpenModal}
          >
            Create Ingredient
          </button>
        </header>
        <main className="p-4 m-2 bg-slate-700 rounded-lg">
          <Table striped bordered hover className="w-full min-h-[300px] table-fixed">
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
                {recipe?.ingredients.map((ingredient: Ingredient) => (
                  <tr key={ingredient.id}>
                    <th className="w-1/3 py-2 pl-3 text-left">
                      {ingredient.name}
                    </th>
                    <th className="w-1/4 py-2">{ingredient.usedWeight}</th>
                    <th className="w-1/4 py-2">{ingredient.marketPrice}</th>
                    <th className="w-1/4 py-2">{ingredient.grossWeight}</th>
                    <th className="w-1/4 py-2">{ingredient.realAmount}</th>
                    <th className="w-1/6 py-2">
                      <DropdownButtons idRecipe={ingredient.id} />
                    </th>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </main>
        <CreateIngredient
          recipeId={id}
          isModalOpen={isModalOpen}
          onRequestClose={handleCloseModal}
        />
      </div>
    )
  );
}
