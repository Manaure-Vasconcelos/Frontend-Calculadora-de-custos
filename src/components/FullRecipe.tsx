'use client';
import { api } from '@/lib/axiosConfig';
import dynamic from 'next/dynamic';
import DialogCreateIngredient from './dialog/DialogCreateIngredient';
import DropdownButtons from './ui/DropdownButtons';
import { Ingredient, Recipe } from './AllRecipesDashboard';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table';

interface Props {
  id: string;
}

export default function FullRecipe({ id }: Props) {
  const LoadingAnimation = dynamic(
    () => import('@/components/ui/LoadingAnimation'),
    {
      ssr: false
    }
  );

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
    <div className="flex-1 rounded-xl p-4 min-w-[350px] max-w-[450px] min-h-[200px] sm:min-w-[450px] sm:max-w-[600px] overflow-x-hidden bg-slate-200">
      <header className="flex justify-between items-center">
        <h3 className="text-2xl ml-5">{recipe.title}</h3>
        <DialogCreateIngredient recipeId={id} />
      </header>
      <main className="p-4 mt-4 overflow-hidden">
        <Table className="w-full min-h-[200px]">
          <TableHeader>
            <TableRow className="border-b-2 border-black">
              <TableHead className="w-1/3 pb-4 text-center">Name</TableHead>
              <TableHead className="w-1/4 pb-4 text-center">
                Used Weight
              </TableHead>
              <TableHead className="w-1/4 pb-4 text-center">
                Market Price
              </TableHead>
              <TableHead className="w-1/4 pb-4 text-center">
                Gross Weight
              </TableHead>
              <TableHead className="w-1/4 pb-4 text-center">
                Real Amount
              </TableHead>
              <TableHead className="w-1/6 pb-4"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recipe.ingredients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="w-full text-center py-4">
                  Adicione um ingrediente para exibi-lo
                </TableCell>
              </TableRow>
            ) : (
              recipe?.ingredients.map((ingredient: Ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell className="w-1/3 py-2 pl-3 text-left">
                    {ingredient.name}
                  </TableCell>
                  <TableCell className="w-1/4 py-2 text-center">
                    {ingredient.usedWeight}
                  </TableCell>
                  <TableCell className="w-1/4 py-2 text-center">
                    {ingredient.marketPrice}
                  </TableCell>
                  <TableCell className="w-1/4 py-2 text-center">
                    {ingredient.grossWeight}
                  </TableCell>
                  <TableCell className="w-1/4 py-2 text-center">
                    {ingredient.realAmount}
                  </TableCell>
                  <TableCell className="w-1/6 py-2 text-center">
                    <DropdownButtons idRecipe={ingredient.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
