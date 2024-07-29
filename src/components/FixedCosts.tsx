'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useState } from 'react';
import { Input } from './ui/input';
import GroupButtons from './ui/ButtonsGroup';
import ResultSpan from './ui/ResultSpan';
import { Info, LockKeyhole, LockKeyholeOpen } from 'lucide-react';

export default function FixedCosts() {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // chamar o useQuery aqui2

  return (
    <Card className="rounded-xl min-w-[350px] min-h-[200px] sm:min-w-[350px] sm:max-w-[350px] lg:min-w-[400px] lg:max-w-[350px] xl:min-w-[400px] xl:max-w-[400px] flex flex-col justify-normal p-2 gap-2">
      <CardHeader>
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center">
            <CardTitle className="mr-4">Gastos Fixos</CardTitle>
            <Info size={18} className="hover:text-primary cursor-pointer" />
          </div>
          <GroupButtons isEditing={isEditing} toggle={toggleEditing} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-around gap-5">
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="fixedCost"
              className="text-base font-semibold leading-none tracking-tight"
            >
              CUSTO FIXO :
            </label>
          </div>
          <div className="relative">
            {!isEditing && (
              <LockKeyhole className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            )}
            {isEditing && (
              <LockKeyholeOpen className="absolute left-2.5 top-2.5 h-4 w-4 " />
            )}
            <Input
              id="fixedCost"
              type="number"
              className="pl-9 w-[300px] sm:w-[300px] md:w-[200px] lg:w-[300px] border-muted-foreground"
              disabled={!isEditing}
              value={0}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="salesPerDay"
              className=" text-base font-semibold leading-none tracking-tight"
            >
              Nº DE VENDAS / DIA:
            </label>
          </div>
          <div className="relative">
            {!isEditing && (
              <LockKeyhole className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            )}
            {isEditing && (
              <LockKeyholeOpen className="absolute left-2.5 top-2.5 h-4 w-4 " />
            )}
            <Input
              id="salesPerDay"
              type="number"
              className="pl-9 w-[300px] sm:w-[300px] md:w-[200px] lg:w-[300px] border-muted-foreground"
              disabled={!isEditing}
              value={0}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="salesPerDay"
              className="text-base font-semibold leading-none tracking-tight"
            >
              Nº DE DIAS TRABALHADOS / SEMANA:
            </label>
          </div>
          <div className="relative">
            {!isEditing && (
              <LockKeyhole className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            )}
            {isEditing && (
              <LockKeyholeOpen className="absolute left-2.5 top-2.5 h-4 w-4 " />
            )}
            <Input
              id="salesPerDay"
              type="number"
              className="pl-9 w-[300px] sm:w-[300px] md:w-[200px] lg:w-[300px] border-muted-foreground"
              disabled={!isEditing}
              value={0}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col mt-2">
        <div className="flex flex-col justify-start items-start w-full pl-2 mb-2">
          <h4 className="text-primary text-lg font-semibold leading-none tracking-tight">
            O SEU CUSTO FIXO É DE:
          </h4>
          <p className="text-muted-foreground">
            Esse valor é adicionado em cada produto.
          </p>
        </div>
        <ResultSpan>$ 00,00</ResultSpan>
      </CardFooter>
    </Card>
  );
}
