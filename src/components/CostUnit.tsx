'use client';
import { useState } from 'react';
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
import { Info } from 'lucide-react';

interface CostUnitRequest {
  serving: number;
  pack: number;
}

export default function CostUnit() {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CostUnitRequest>();

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = (data: CostUnitRequest) => {
    setIsEditing(false);
  };

  return (
    <Card className="rounded-xl p-4 min-w-[350px] max-w-[500px] h-auto sm:min-w-[400px] sm:max-w-[400px] flex flex-col justify-normal gap-3 mb-4">
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <div className="flex items-center">
            <CardTitle className="mr-4">Custo Unitário:</CardTitle>
            <Info size={18} className="hover:text-primary cursor-pointer" />
          </div>
          <GroupButtons isEditing={isEditing} toggle={toggleEditing} />
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col justify-around gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <h4 className="text-header text-base font-semibold leading-none tracking-tight col-span-6">
              RENDIMENTO:
            </h4>
            <p className="text-muted-foreground col-span-6">
              Quantas unidades rende a receita?
            </p>
            <span className="sr-only">
              Serving:
            </span>
            <Input
              id="serving"
              type="number"
              className="col-span-3"
              disabled={!isEditing}
              autoFocus
              {...register('serving', {
                required: {
                  value: true,
                  message: 'Name is required'
                }
              })}
            />
          </div>
          <div className="grid grid-cols-6 items-center justify-center gap-4">
            <h4 className="text-header text-base font-semibold leading-none tracking-tight col-span-6">
              CUSTO COM EMBALAGEM
            </h4>
            <p className="text-muted-foreground col-span-6">
              Quanl custo para embalar o produto?
            </p>

            <span className="sr-only">Pack:</span>
            <Input
              id="pack"
              type="number"
              className="col-span-4"
              disabled={!isEditing}
              {...register('pack', {
                required: {
                  value: true,
                  message: 'Name is required'
                }
              })}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col mt-2">
          <div className="flex flex-col justify-start items-start w-full pl-2 mb-2">
            <h4 className="text-header text-lg font-semibold leading-none tracking-tight">
              CUSTO PARA CRIAR O PRODUTO:
            </h4>
            <p className="text-muted-foreground">
              Esse é o custo total de [N] produtos.
            </p>
          </div>
          <ResultSpan>R$ 00,00</ResultSpan>
        </CardFooter>
      </form>
    </Card>
  );
}
