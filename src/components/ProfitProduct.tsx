import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card';
import { Slider } from './ui/slider';
import GroupButtons from './ui/ButtonsGroup';
import { useState } from 'react';
import ResultSpan from './ui/ResultSpan';
import { Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { GetRecipe } from '@/app/calculator/[id]/page';
import formatForARS from '@/lib/formatForARS';
import LoadingAnimation from './ui/LoadingAnimation';

export default function ProfitProduct() {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const {
    data: expenses,
    isLoading,
    isError,
    error
  } = useQuery<GetRecipe>({
    queryKey: ['recipe']
  });

  if (isLoading || !expenses)
    return (
      <Card className="rounded-xl p-4 min-w-[350px] max-w-[500px] h-auto sm:min-w-[400px] sm:max-w-[400px]">
        <LoadingAnimation height={100} width={100} />
      </Card>
    );

  if (isError)
    return (
      <Card className="rounded-xl p-4 min-w-[350px] max-w-[500px] h-auto sm:min-w-[400px] sm:max-w-[400px]">
        {error.message}
      </Card>
    );

  return (
    <Card className="rounded-xl p-4 min-w-[350px] max-w-[500px] h-auto sm:min-w-[400px] sm:max-w-[400px]">
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center">
            <CardTitle className="mr-4">Margem de Lucro:</CardTitle>
            <Info size={18} className="hover:text-primary cursor-pointer" />
          </div>

          <GroupButtons
            isEditing={isEditing}
            toggle={toggleEditing}
            formRef={'algo'}
          />
        </div>

        <CardDescription>Defina a margem de Lucro do produto.</CardDescription>
      </CardHeader>

      <CardContent className="mt-3">
        <Slider
          defaultValue={[expenses?.profit]}
          max={100}
          step={1}
          disabled={!isEditing}
          className={`${!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'} text-black`}
        />
      </CardContent>

      <CardFooter className="flex flex-col mt-3">
        <div className="flex flex-col justify-start items-start w-full pl-2 mb-2">
          <h4 className="text-primary text-lg font-semibold leading-none tracking-tight">
            ESSE É O VALOR DO SEU PRODUTO:
          </h4>
          <p className="text-muted-foreground">
            Custo unitário: {formatForARS(expenses.valueUnit)} + Margem de lucro:{' '}
            {expenses.profit}%
          </p>
        </div>
        <ResultSpan>{formatForARS(expenses.valueTotal)}</ResultSpan>
      </CardFooter>
    </Card>
  );
}
