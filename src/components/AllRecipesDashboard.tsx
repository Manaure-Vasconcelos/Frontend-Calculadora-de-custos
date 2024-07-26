'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { api } from '@/lib/axiosConfig';
import formatForBRL from '@/lib/formatForBrl';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import DropdownButtons from './ui/DropdownButtons';
import DialogCreateRecipe from './dialog/DialogCreateRecipe';

export interface Ingredient {
  id: number;
  name: string;
  usedWeight: number;
  grossWeight: number;
  marketPrice: number;
  realAmount: number;
  recipeId: number;
}

export interface Recipe {
  id: number;
  title: string;
  describe: string | null;
  valuePartial: number;
  ingredients: Ingredient[];
  createdAt: Date;
}

export default function AllRecipesDashboard() {
  const LoadingAnimation = dynamic(
    () => import('@/components/ui/LoadingAnimation'),
    {
      ssr: false
    }
  );

  const fetchData = async () => {
    const res = await api.get<Recipe[]>(`/recipes/all`);
    return res.data;
    /* return [
      {
        id: 10,
        title: 'receita',
        describe: null,
        valuePartial: 10,
        ingredients: [],
        createdAt: new Date()
      }
    ]; */
  };

  const {
    data: recipes,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ['data']
  });

  return (
    <div className="flex-1 rounded-xl p-4 w-full min-w-[350px] min-h-[200px] sm:min-w-[550px] sm:max-w-[700px] lg:min-w-[550px] lg:max-w-[650px] xl:min-w-[550px] xl:max-w-[750px] overflow-x-hidden bg-slate-200">
      <div className="flex p-3 justify-between items-center">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Recipes:
        </h3>
        <DialogCreateRecipe />
      </div>

      <Table className="w-full h-auto overflow-x-hidden mt-5 p-3">
        <TableHeader>
          <TableRow className="border-b-2 border-black">
            <TableHead className="w-1/3 pb-4 text-center">Title</TableHead>
            <TableHead className="w-1/4 pb-4 text-center">Items</TableHead>
            <TableHead className="w-1/4 pb-4 text-center">
              Value Recipe
            </TableHead>
            <TableHead className="w-1/4 pb-4 text-center">Value Real</TableHead>
            <TableHead className="w-1/12 pb-4"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell colSpan={5}>
                <LoadingAnimation height={50} width={50} />
              </TableCell>
            </TableRow>
          )}

          {isError && (
            <TableRow>
              <TableCell colSpan={5}>{error.message}</TableCell>
            </TableRow>
          )}

          {recipes &&
            recipes.map((recipe: Recipe) => (
              <TableRow key={recipe.id}>
                <TableCell className="w-1/3 py-2 pl-6 text-center">
                  {recipe.title}
                </TableCell>
                <TableCell className="w-1/4 py-2 text-center">
                  {recipe.ingredients ? recipe.ingredients.length : 0}
                </TableCell>
                <TableCell className="w-1/4 py-2 text-center">
                  {formatForBRL(recipe.valuePartial)}
                </TableCell>
                <TableCell className="w-1/4 py-2 text-center">valor</TableCell>
                <TableCell className="w-1/12 py-2 text-center">
                  <DropdownButtons idRecipe={recipe.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
