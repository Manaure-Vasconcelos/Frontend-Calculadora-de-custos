'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { PopoverStatusProperty } from './PopoverStatusProperty';

export default function FixedCosts() {
  const [isEditing, setIsEditing] = useState(false);  

  // chamar o useQuery aqui2

  return (
    <Card className="rounded-xl w-[300px] min-w-[250px] min-h-[200px] max-w-[300px] sm:min-w-[400px] sm:max-w-[400px] flex flex-col justify-normal bg-slate-200 p-2">
      <CardHeader>
        <CardTitle className="flex justify-start">Gastos Fixos</CardTitle>
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
            className="flex-grow min-w-[100px] max-w-[150px]"
            disabled={!isEditing}
            value={0}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setIsEditing(!isEditing)}>Edit</Button>
      </CardFooter>
    </Card>
  );
}
