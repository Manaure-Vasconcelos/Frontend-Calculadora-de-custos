import { useRef, useState } from 'react';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from './ui/card';
import GroupButtons from './ui/ButtonsGroup';
import ResultSpan from './ui/ResultSpan';
import { Info, LockKeyhole, LockKeyholeOpen } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetRecipe } from '@/app/calculator/[id]/page';
import formatForARS from '@/lib/formatForARS';
import LoadingAnimation from './ui/LoadingAnimation';

interface CostUnitRequest {
  serving: number;
  pack: number;
}

export default function CostUnit() {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CostUnitRequest>();
  const {
    data: expenses,
    isLoading,
    isError,
    error
  } = useQuery<GetRecipe>({
    queryKey: ['recipe']
  });

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const HandleOnSubmit = (data: CostUnitRequest) => {
    console.log(data);
    setIsEditing(false);
  };

  if (isLoading || !expenses)
    return (
      <Card className="rounded-xl p-4 min-w-[350px] max-w-[500px] h-[200px] sm:min-w-[400px] sm:max-w-[400px]">
        <LoadingAnimation height={100} width={100} />
      </Card>
    );

  if (isError)
    return (
      <Card className="rounded-xl p-4 min-w-[350px] max-w-[500px] h-[200px] sm:min-w-[400px] sm:max-w-[400px]">
        {error.message}
      </Card>
    );

  return (
    <Card className="rounded-xl p-4 min-w-[350px] max-w-[500px] h-auto sm:min-w-[400px] sm:max-w-[400px] flex flex-col justify-normal gap-3 mb-4">
      <form ref={formRef} onSubmit={handleSubmit(HandleOnSubmit)}></form>
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center">
            <CardTitle className="mr-4">Custo Unitário:</CardTitle>
            <Info size={18} className="hover:text-primary cursor-pointer" />
          </div>
          <GroupButtons
            isEditing={isEditing}
            toggle={toggleEditing}
            formRef={formRef}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col justify-around gap-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="serving"
              className="text-base font-semibold leading-none tracking-tight"
            >
              RENDIMENTO:
            </label>
            <p className="text-muted-foreground">
              Quantas unidades rende a receita?
            </p>
          </div>
          <div className="relative">
            {!isEditing && (
              <LockKeyhole className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            )}
            {isEditing && (
              <LockKeyholeOpen className="absolute left-2.5 top-2.5 h-4 w-4 " />
            )}
            <Input
              id="serving"
              type="number"
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] border-muted-foreground"
              disabled={!isEditing}
              autoFocus
              placeholder={`${expenses.serving} uni`}
              {...register('serving')}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="pack"
              className="text-base font-semibold leading-none tracking-tight col-span-6"
            >
              CUSTO COM EMBALAGEM
            </label>
            <p className="text-muted-foreground col-span-6">
              Qual custo para embalar o produto?
            </p>
          </div>

          <span className="sr-only">Pack:</span>
          <div className="relative">
            {!isEditing && (
              <LockKeyhole className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            )}
            {isEditing && (
              <LockKeyholeOpen className="absolute left-2.5 top-2.5 h-4 w-4 " />
            )}

            <Input
              id="pack"
              type="number"
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] border-muted-foreground"
              disabled={!isEditing}
              placeholder={`${formatForARS(expenses.pack)}`}
              {...register('pack')}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col mt-2">
        <div className="flex flex-col justify-start items-start w-full pl-2 mb-2">
          <h4 className="text-primary text-lg font-semibold leading-none tracking-tight">
            CUSTO PARA CRIAR O PRODUTO:
          </h4>
          <p className="text-muted-foreground">
            Esse é o custo total de 1 unidade.
          </p>
        </div>
        <ResultSpan>{formatForARS(expenses.valueUnit)}</ResultSpan>
      </CardFooter>
    </Card>
  );
}
