'use client';
import { useEffect, useState } from 'react';
import CreateRecipe from './CreateRecipe';
import { Table } from 'react-bootstrap';
import formatForBRL from '@/lib/formatForBrl';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axiosConfig';
import { useRecipes } from '@/context/ContextRecipes';
import DropdownButtons from '../ui/DropdownButtons';

/* 4 render */

export default function AllRecipesDashboard() {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const { recipes, fetchData, deleteRecipe, addRecipe } = useRecipes();

  /* Refatorar */
  useEffect(() => {
    fetchData();
  }, []);

  const router = useRouter();

  const handleOpenModal = () => setCreateModalOpen(true);
  const handleCloseModal = () => setCreateModalOpen(false);

  return (
    <div className="bg-quinary flex-grow rounded-xl p-4 min-w-[450px] max-w-[600px] h-1/2">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl ml-5">Recipes:</h2>
        <button
          className="px-3 py-2 rounded bg-slate-500 hover:bg-slate-700 my-5 mx-3"
          onClick={handleOpenModal}
        >
          Create Recipe
        </button>
      </div>

      <div className="p-4 m-2 bg-slate-700 rounded-lg">
        <Table striped bordered hover className="w-full table-fixed">
          <thead>
            <tr className="border-b-2">
              <th className="w-1/3 pb-4">Title</th>
              <th className="w-1/4 pb-4">Items</th>
              <th className="w-1/4 pb-4">Value Recipe</th>
              <th className="w-1/4 pb-4">Value Real</th>
              <th className="w-1/12 pb-4"></th>
            </tr>
          </thead>

          {recipes.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={4} className="w-full text-center py-4">
                  Adicione uma receita para exibi-la
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <th className="w-1/3 py-2 pl-6 text-left">{recipe.title}</th>
                  <th className="w-1/4 py-2">
                    {recipe.ingredients ? recipe.ingredients.length : 0}
                  </th>
                  <th className="w-1/4 py-2">
                    {formatForBRL(recipe.valuePartial)}
                  </th>
                  <th className="w-1/4 py-2">valor</th>
                  <th className="w-1/12 py-2">
                    <DropdownButtons idRecipe={recipe.id} />
                  </th>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>

      <CreateRecipe
        isModalOpen={isCreateModalOpen}
        onRequestClose={handleCloseModal}
        setData={addRecipe}
      />
    </div>
  );
}
