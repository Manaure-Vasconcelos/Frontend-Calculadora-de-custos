'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';

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

  const onSubmit = (data: CostUnitRequest) => {
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-200 rounded-xl p-4 min-w-[150px] max-w-[250px] h-auto sm:min-w-[350px] sm:max-w-[400px] flex flex-col justify-normal items-center gap-3">
      <header>
        <h3>Costs Unit:</h3>
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-around gap-4"
      >
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right">
            Serving:
          </label>
          <Input
            id="serving"
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
          <label htmlFor="name" className="text-right">
            Pack:
          </label>
          <Input
            id="pack"
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

         {!isEditing && (
          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsEditing(!isEditing)}>Edit</Button>
          </div>
        )}

        {isEditing && (
          <div className="flex justify-end gap-2">
            <Button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => setIsEditing(!isEditing)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
              Save
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
