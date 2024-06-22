'use client';
import { useState } from 'react';
import CreateRecipe from './CreateRecipe';
import EditRecipe, { Recipe } from './EditRecipe';
import { Table } from 'react-bootstrap';

interface Props {
  userData: {
    id: string;
    name: string;
    recipes: Recipe[];
  };
}

export default function AllRecipesDashboard({ userData }: Props) {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [data, setData] = useState<Recipe | null>(null);

  const handleOpenModal = () => setCreateModalOpen(true);
  const handleCloseModal = (identify: string) => {
    if (identify === 'create') {
      setCreateModalOpen(false);
    }
    if (identify === 'edit') {
      setEditModalOpen(false);
    }
  };

  const handleEditItem = (data: Recipe) => {
    setData(data);
    setEditModalOpen(true);
  };

  return (
    <section className="border border-slate-700 p-4 w-1/2" id="root">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl ml-5">Recipes:</h2>
        <button
          className="px-3 py-2 rounded bg-slate-500 hover:bg-slate-700 my-5 mx-3"
          onClick={() => handleOpenModal()}
        >
          Create Recipe
        </button>
      </div>

      <div className="p-4 m-2 bg-slate-700 rounded-lg">
        <Table striped bordered hover className="w-full table-fixed">
          <thead>
            <tr className="border-b-2">
              <th className="w-1/4 p-2">Title</th>
              <th className="w-1/4 p-2">Items</th>
              <th className="w-1/4 p-2">Value Recipe</th>
              <th className="w-1/4 p-2">Value Real</th>
              <th className="w-1/4 p-2"></th>
            </tr>
          </thead>

          {userData.recipes.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={4} className="w-full text-center py-4">
                  Adicione uma receita para exibi-la
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {userData.recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <th className="w-1/4 py-2 pl-7 text-left">{recipe.title}</th>
                  <th className="w-1/4 py-2">{recipe.ingredients.length}</th>
                  <th className="w-1/4 py-2">
                    {recipe.valuePartial.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </th>
                  <th className="w-1/4 py-2">valor</th>
                  <th className="w-1/4 py-2 pr-2 text-right">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded"
                      onClick={() => handleEditItem(recipe)}
                    >
                      Edit
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>

      <CreateRecipe
        isModalOpen={isCreateModalOpen}
        onRequestClose={() => handleCloseModal('create')}
      />
      <EditRecipe
        isModalOpen={isEditModalOpen}
        onRequestClose={() => handleCloseModal('edit')}
        data={data}
      />
    </section>
  );
}
