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
import { PopoverStatusProperty } from './PopoverStatusProperty';
import GroupButtons from './ui/ButtonsGroup';
import ResultSpan from './ui/ResultSpan';

export default function FixedCosts() {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  // chamar o useQuery aqui2

  return (
    <Card className="rounded-xl w-full min-w-[400px] min-h-[200px] sm:min-w-[350px] sm:max-w-[400px] lg:min-w-[400px] lg:max-w-[450px] xl:min-w-[400px] xl:max-w-[450px] flex flex-col justify-normal p-2">
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <CardTitle className="flex justify-start">Gastos Fixos</CardTitle>
          <GroupButtons isEditing={isEditing} toggle={toggleEditing} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-around gap-4">
        <div className="flex justify-between items-center gap-4">
          <label htmlFor="workplace" className="text-right">
            Local de trabalho:
          </label>
          <PopoverStatusProperty disabled={isEditing} />
        </div>
        <div className="flex justify-between items-center gap-4">
          <label htmlFor="fixedCost" className="text-right">
            Gastos Fixos:
          </label>
          <Input
            id="fixedCost"
            type="number"
            className="flex-grow min-w-[100px] max-w-[150px]"
            disabled={!isEditing}
            value={0}
          />
        </div>
        <div className="flex justify-between items-center gap-4">
          <label htmlFor="salesPerDay" className="text-right">
            Nº de vendas / dia:
          </label>
          <Input
            id="salesPerDay"
            type="number"
            className="flex-grow min-w-[100px] max-w-[150px]"
            disabled={!isEditing}
            value={0}
          />
        </div>
      </CardContent>
      <CardFooter>
        <ResultSpan>R$ 00,00</ResultSpan>
      </CardFooter>
    </Card>
  );
}
