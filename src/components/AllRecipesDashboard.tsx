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
import formatForARS from '@/lib/formatForARS';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import DropdownButtons from './ui/DropdownButtons';
import DialogCreateRecipe from './dialog/DialogCreateRecipe';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

export interface IngredientProps {
  id: number;
  name: string;
  usedWeight: number;
  grossWeight: number;
  marketPrice: number;
  realAmount: number;
  recipeId: number;
}

export interface RecipeProps {
  id: number;
  title: string;
  describe: string | null;
  valuePartial: number;
  ingredients: IngredientProps[];
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
    const res = await api.get<RecipeProps[]>(`/recipes/all`);
    return res.data;
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

  if (isLoading)
    return (
      <Card className="flex-1 rounded-xl p-4 w-full min-h-[200px] min-w-[400px] sm:min-w-[650px] sm:max-w-[700px] xl:min-w-[750px] xl:max-w-[800px] overflow-x-hidden border">
        <Skeleton className="w-full h-full" />
      </Card>
    );

  return (
    <Card className="flex-1 rounded-xl p-4 w-full min-w-[400px] min-h-[200px] sm:min-w-[650px] sm:max-w-[700px] xl:min-w-[750px] xl:max-w-[800px] overflow-x-hidden border">
      <CardHeader className="flex flex-row p-3 justify-between items-center">
        <CardTitle>Produtos:</CardTitle>
        <DialogCreateRecipe />
      </CardHeader>

      <CardContent>
        <Table className="w-full h-auto overflow-x-hidden mt-5">
          <TableHeader>
            <TableRow className="border-b-black dark:border-b-foreground">
              <TableHead className="w-1/3 pb-4 text-center">Nome</TableHead>
              <TableHead className="w-1/4 pb-4 text-center">Itens</TableHead>
              <TableHead className="w-1/4 pb-4 text-center">
                Valor Real
              </TableHead>
              <TableHead className="w-1/4 pb-4 text-center">
                Valor Total
              </TableHead>
              <TableHead className="w-1/12 pb-4"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5}>
                  <LoadingAnimation height={100} width={100} />
                </TableCell>
              </TableRow>
            )}

            {isError && (
              <TableRow>
                <TableCell colSpan={5}>{error.message}</TableCell>
              </TableRow>
            )}

            {recipes?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="w-full text-center py-4">
                  Adicione uma receita para exibi-la
                </TableCell>
              </TableRow>
            ) : (
              recipes?.map((recipe: RecipeProps) => (
                <TableRow key={recipe.id}>
                  <TableCell className="w-1/3 py-2 pl-6 text-center">
                    {recipe.title}
                  </TableCell>
                  <TableCell className="w-1/4 py-2 text-center">
                    {recipe.ingredients ? recipe.ingredients.length : 0}
                  </TableCell>
                  <TableCell className="w-1/4 py-2 text-center">
                    {formatForARS(recipe.valuePartial)}
                  </TableCell>
                  <TableCell className="w-1/4 py-2 text-center">
                    valor
                  </TableCell>
                  <TableCell className="w-1/12 py-2 text-center">
                    <DropdownButtons
                      idItem={String(recipe.id)}
                      url={'/recipes'}
                    />
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
