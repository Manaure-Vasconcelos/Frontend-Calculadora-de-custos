'use client';
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

export default function ProfitProduct() {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Card className="rounded-xl p-4 min-w-[350px] max-w-[500px] h-auto sm:min-w-[400px] sm:max-w-[400px]">
      <CardHeader>
        <div className="flex justify-between items-center gap-2">
          <CardTitle>Margem de Lucro:</CardTitle>

          <GroupButtons isEditing={isEditing} toggle={toggleEditing} />
        </div>

        <CardDescription>Defina a margem de Lucro do produto.</CardDescription>
      </CardHeader>

      <CardContent className="mt-3">
        <Slider
          defaultValue={[33]}
          max={100}
          step={1}
          disabled={!isEditing}
          className="cursor-not-allowed bg-foreground disabled:opacity-50 disabled:bg-muted-foreground"
        />
      </CardContent>

      <CardFooter className="flex justify-end mt-3">
        <ResultSpan>R$ 00,00</ResultSpan>
      </CardFooter>
    </Card>
  );
}
