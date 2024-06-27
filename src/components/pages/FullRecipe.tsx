'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Table } from 'react-bootstrap';
import axios from '@/lib/axiosConfig';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Recipe } from '@/context/recipes/contextRecipes';
import CreateIngredient from './CreateIngredient';

interface Props {
  id: string;
}

export default function FullRecipe({ id }: Props) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const LoadingAnimation = dynamic(
    () => import('@/components/ui/LoadingAnimation'),
    {
      ssr: false
    }
  );

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

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

  return (
    recipe && (
      <div className="border rounded-lg p-4 w-1/2 h-full flex flex-col items-start">
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
        <CreateIngredient
          isModalOpen={isModalOpen}
          onRequestClose={handleCloseModal}
        />
      </div>
    )
  );
}
