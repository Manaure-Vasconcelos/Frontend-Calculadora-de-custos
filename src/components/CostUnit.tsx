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
          <CardTitle className="flex justify-start">Costs Unit:</CardTitle>
          <GroupButtons isEditing={isEditing} toggle={toggleEditing} />
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col justify-around gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="serving" className="text-right">
              Serving:
            </label>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="pack" className="text-right">
              Pack:
            </label>
            <Input
              id="pack"
              type="number"
              className="col-span-3"
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

        <CardFooter className="flex justify-end mt-3">
          <ResultSpan>
            R$ 00,00
          </ResultSpan>
        </CardFooter>
      </form>
    </Card>
  );
}
