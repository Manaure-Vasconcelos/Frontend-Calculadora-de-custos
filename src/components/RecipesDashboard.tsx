import { useState } from "react";
import ModalCreateRecipe from "./ModalCreateRecipe";

interface Props {
  userData: {
    id: string;
    name: string;
    recipes: any[];
  };
}

export default function RecipesDashboard({ userData }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <section className="border border-slate-700 p-4 w-1/2" id="root">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Recipes:</h2>
        <button
          className="px-2 py-1 rounded bg-slate-500 mr-5 mb-2 mt-2"
          onClick={handleOpenModal}
        >
          Create Recipe
        </button>
      </div>
      <div className="mt-2 w-full">
        {userData.recipes.map((recipe) => (
          <article
            key={recipe.id}
            className="bg-slate-700 border-b p-2 flex justify-between items-center"
          >
            <span>Title: {recipe.title}</span>
            <span>Itens: {recipe.ingredients.length}</span>
            <span>Value: {recipe.valuePartial}</span>
            <button className="bg-blue-500 text-white px-2 py-1 rounded">
              Edit
            </button>
          </article>
        ))}
      </div>

      <ModalCreateRecipe
        isModalOpen={isModalOpen}
        onRequestClose={handleCloseModal}
      />
    </section>
  );
}
