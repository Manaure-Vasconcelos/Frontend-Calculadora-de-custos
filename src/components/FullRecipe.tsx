import formatForARS from '@/lib/formatForARS';
import DialogCreateIngredient from './dialog/DialogCreateIngredient';
import DropdownButtons from './ui/DropdownButtons';
import { IngredientProps } from './AllRecipesDashboard';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from './ui/table';
import { Card, CardContent, CardHeader } from './ui/card';
import { useQuery } from '@tanstack/react-query';
import { GetRecipe } from '@/app/calculator/[id]/page';
import { Skeleton } from './ui/skeleton';
import ResultSpan from './ui/ResultSpan';

export default function FullRecipe() {
  const {
    data: recipe,
    isLoading,
    isError,
    error
  } = useQuery<GetRecipe>({
    queryKey: ['recipe']
  });

  if (isLoading || !recipe)
    return (
      <Card className="flex-1 rounded-xl min-w-[400px] max-w-[500px] min-h-[200px] sm:w-[400px] sm:max-w-[650px] lg:min-w-[600px] lg:max-w-[650px] xl:min-w-[550px] xl:max-w-[750px] overflow-x-hidden">
        <Skeleton className="w-full h-full" />
      </Card>
    );

  if (isError)
    return (
      <Card className="flex-1 rounded-xl p-4 min-w-[400px] max-w-[500px] min-h-[200px] sm:w-[400px] sm:max-w-[650px] lg:min-w-[600px] lg:max-w-[650px] xl:min-w-[550px] xl:max-w-[750px] overflow-x-hidden">
        {error.message}
      </Card>
    );

  return (
    <Card className="flex-1 rounded-xl p-2 min-w-[400px] max-w-[500px] min-h-[200px] sm:w-[400px] sm:max-w-[650px] lg:min-w-[600px] lg:max-w-[650px] xl:min-w-[550px] xl:max-w-[750px] overflow-x-hidden">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row sm:justify-evenly w-full">
          <div className="flex sm:w-1/2">
            <h4 className="text-lg font-bold text-header">Nome:</h4>
            <h4 className="ml-2 leading-7">{recipe.title}</h4>
          </div>

          <div className="flex w-1/2">
            <h4 className="text-lg font-bold text-header">Descrição:</h4>
            <h4 className="ml-2 leading-7">
              {recipe.describe ? recipe.describe : '----'}
            </h4>
          </div>
        </div>
        <DialogCreateIngredient recipeId={recipe.id!} />
      </CardHeader>

      <CardContent className="mt-4 overflow-hidden pb-0">
        <Table className="w-full">
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
            {recipe.ingredients?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="w-full text-center py-4">
                  Adicione um ingrediente para exibi-lo
                </TableCell>
              </TableRow>
            ) : (
              recipe.ingredients?.map((ingredient: IngredientProps) => (
                <TableRow key={ingredient.id}>
                  <TableCell className="w-1/3 py-2 pl-3 text-center">
                    {ingredient.name}
                  </TableCell>
                  <TableCell className="w-1/4 py-2 text-center">
                    {ingredient.usedWeight}
                  </TableCell>
                  <TableCell className="w-1/4 py-2 text-center">
                    {formatForARS(ingredient.marketPrice)}
                  </TableCell>
                  <TableCell className="w-1/4 py-2 text-center">
                    {ingredient.grossWeight}
                  </TableCell>
                  <TableCell className="w-1/4 py-2 text-center">
                    {formatForARS(ingredient.realAmount)}
                  </TableCell>
                  <TableCell className="w-1/6 py-2 text-center">
                    <DropdownButtons
                      idItem={String(ingredient.id)}
                      url={'/ingredients'}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="text-right">
                <div className='flex flex-row gap-3 items-center justify-end'>
                Total:
                <ResultSpan>{formatForARS(recipe.valuePartial)}</ResultSpan>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
