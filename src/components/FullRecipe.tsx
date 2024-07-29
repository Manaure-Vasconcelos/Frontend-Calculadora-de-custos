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
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
      <Card className="flex-1 rounded-xl p-4 min-w-[400px] max-w-[500px] min-h-[200px] sm:w-[400px] sm:max-w-[650px] lg:min-w-[600px] lg:max-w-[650px] xl:min-w-[550px] xl:max-w-[750px] overflow-x-hidden">
        <LoadingAnimation height={150} width={150} />
      </Card>
    );

  if (isError)
    return (
      <Card className="flex-1 rounded-xl p-4 min-w-[400px] max-w-[500px] min-h-[200px] sm:w-[400px] sm:max-w-[650px] lg:min-w-[600px] lg:max-w-[650px] xl:min-w-[550px] xl:max-w-[750px] overflow-x-hidden">
        {error.message}
      </Card>
    );

  return (
    <Card className="flex-1 rounded-xl p-4 min-w-[400px] max-w-[500px] min-h-[200px] sm:w-[400px] sm:max-w-[650px] lg:min-w-[600px] lg:max-w-[650px] xl:min-w-[550px] xl:max-w-[750px] overflow-x-hidden">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className='text-black dark:text-white'>{recipe.title}</CardTitle>
        <DialogCreateIngredient recipeId={id} />
      </CardHeader>

      <CardContent className="p-4 mt-4 overflow-hidden">
        <Table className="w-full min-h-[200px]">
          <TableHeader>
            <TableRow className="border-b-1 border-black dark:border-white">
              <TableHead className="w-1/3 pb-4 text-center">Name</TableHead>
              <TableHead className="w-1/4 pb-4 text-center">
                Quant. usada:
              </TableHead>
              <TableHead className="w-1/4 pb-4 text-center">
                Preço bruto:
              </TableHead>
              <TableHead className="w-1/4 pb-4 text-center">
                Quant. total:
              </TableHead>
              <TableHead className="w-1/4 pb-4 text-center">Custo</TableHead>
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
                  <TableCell className="w-1/3 py-2 pl-3 text-center">
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
      </CardContent>
    </Card>
  );
}
