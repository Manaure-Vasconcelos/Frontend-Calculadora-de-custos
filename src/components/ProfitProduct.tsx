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
import { useState, useRef, useEffect } from 'react';
import ResultSpan from './ui/ResultSpan';
import { Info } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetRecipe } from '@/app/calculator/[id]/page';
import formatForARS from '@/lib/formatForARS';
import LoadingAnimation from './ui/LoadingAnimation';
import { Controller, useForm } from 'react-hook-form';
import { api } from '@/lib/axiosConfig';

interface ProfitRequest {
  profit: number;
}

interface ResultProps extends ProfitRequest {
  valueTotal: number;
}

export default function ProfitProduct() {
  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState<ResultProps>({
    profit: 0,
    valueTotal: 0
  });
  const queryClient = useQueryClient();
  const formRef = useRef(null);
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ProfitRequest>();

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

  useEffect(() => {
    if (expenses) {
      setTemp({ profit: expenses.profit, valueTotal: expenses.valueTotal });
    }
  }, [expenses]);


  const onSubmit = async (newProfit: number) => {
    const res = await api.patch('/expenses', {
      valuePartial: expenses?.valuePartial,
      profit: newProfit,
      recipeId: expenses?.id
    });
    setTemp({ profit: res.data.profit, valueTotal: res.data.valueTotal });
    return res.data;
  };

  const { mutateAsync: saveExpenses } = useMutation({
    mutationFn: onSubmit,
    onSuccess(returnFn) {
      queryClient.setQueryData(['recipe'], (previewData: GetRecipe) => {
        return {
          ...previewData,
          profit: returnFn.profit,
          valueTotal: returnFn.valueTotal
        };
      });
    }
  });

  const HandleOnSubmit = async (data: any) => {
    const newProfit = data.profit[0];
    if (newProfit === undefined) {
      toggleEditing();
      return;
    }

    await saveExpenses(newProfit);
    toggleEditing();
  };

  const calculate = (data: any) => {
    const newProfit = data[0][0];
    if(!expenses?.valueUnit) return
    const newValueTotal =
      expenses?.valueUnit + expenses?.valueUnit * (newProfit / 100);
    setTemp({ profit: newProfit, valueTotal: newValueTotal });
  };

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
      <form ref={formRef} onSubmit={handleSubmit(HandleOnSubmit)}></form>
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center">
            <CardTitle className="mr-4">Margem de Lucro:</CardTitle>
            <Info size={18} className="hover:text-primary cursor-pointer" />
          </div>

          <GroupButtons
            isEditing={isEditing}
            toggle={toggleEditing}
            formRef={formRef}
          />
        </div>

        <CardDescription>Defina a margem de Lucro do produto.</CardDescription>
      </CardHeader>

      <CardContent className="mt-3">
        <Controller
          control={control}
          name="profit"
          defaultValue={expenses.profit}
          render={({ field: { value, onChange } }) => (
            <Slider
              value={[value]}
              onValueChange={onChange}
              onValueCommit={(e) => calculate(e)}
              min={0}
              max={100}
              step={1}
              disabled={!isEditing}
              className={`${!isEditing ? 'cursor-not-allowed' : 'cursor-pointer'} text-black`}
            />
          )}
        />
      </CardContent>

      <CardFooter className="flex flex-col mt-3">
        <div className="flex flex-col justify-start items-start w-full pl-2 mb-2">
          <h4 className="text-primary text-lg font-semibold leading-none tracking-tight">
            ESSE É O VALOR DO SEU PRODUTO:
          </h4>
          <p className="text-muted-foreground">
            Custo unitário: {formatForARS(expenses.valueUnit)} + Margem de
            lucro: {temp.profit}%
          </p>
        </div>
        <ResultSpan>{formatForARS(temp.valueTotal)}</ResultSpan>
      </CardFooter>
    </Card>
  );
}
