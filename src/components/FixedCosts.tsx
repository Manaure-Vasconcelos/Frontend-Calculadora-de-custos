'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useRef, useState } from 'react';
import { Input } from './ui/input';
import GroupButtons from './ui/ButtonsGroup';
import ResultSpan from './ui/ResultSpan';
import { Info, LockKeyhole, LockKeyholeOpen } from 'lucide-react';
import { api } from '@/lib/axiosConfig';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Skeleton } from '@/components/ui/skeleton';
import formatForARS from '@/lib/formatForARS';

interface ProfileRequest {
  fixedCosts: number;
  daysOfWorking: number;
  salesPerDay: number;
}

interface Profile {
  fixedCosts: number;
  daysOfWorking: number;
  salesPerDay: number;
  fixedCostTotal: number;
}

export default function FixedCosts() {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfileRequest>();

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const fetchData = async () => {
    try {
      const res = await api.get<Profile>(`/profile`);
      return res.data;
    } catch (err: any) {
      return err.message;
    }
  };

  const {
    data: profile,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchData,
    refetchOnWindowFocus: false
  });

  const onSubmit = async (data: ProfileRequest) => {
    const payload = {
      fixedCosts: data.fixedCosts ? Number(data.fixedCosts) : undefined,
      daysOfWorking: data.daysOfWorking
        ? Number(data.daysOfWorking)
        : undefined,
      salesPerDay: data.salesPerDay ? Number(data.salesPerDay) : undefined
    };
    const res = await api.patch<ProfileRequest>(`/profile`, payload);
    return res.data;
  };

  const { mutateAsync: patchProfile } = useMutation({
    mutationFn: onSubmit,
    onSuccess(returnFn, variables, context) {
      queryClient.setQueryData(['profile'], returnFn);
    }
  });

  const HandleOnSubmit = async (data: ProfileRequest) => {
    try {
      await patchProfile(data);
      reset();
      toggleEditing();
    } catch (error) {
      alert('error query');
    }
  };

  if (isLoading)
    return (
      <Card className="rounded-xl min-w-[350px] min-h-[400px] sm:min-w-[350px] sm:max-w-[350px] lg:min-w-[400px] lg:max-w-[350px] xl:min-w-[400px] xl:max-w-[400px] flex flex-col justify-normal p-2 gap-2">
        <Skeleton className="w-full h-full" />
      </Card>
    );

    if (isError)
    return (
      <Card className="rounded-xl min-w-[350px] min-h-[400px] sm:min-w-[350px] sm:max-w-[350px] lg:min-w-[400px] lg:max-w-[350px] xl:min-w-[400px] xl:max-w-[400px] flex flex-col justify-normal p-2 gap-2">
        {error.message}
      </Card>
    );

  return (
    <Card className="rounded-xl min-w-[350px] sm:min-w-[350px] sm:max-w-[350px] lg:min-w-[400px] lg:max-w-[350px] xl:min-w-[400px] xl:max-w-[400px] flex flex-col justify-normal p-2 gap-2">
      <form ref={formRef} onSubmit={handleSubmit(HandleOnSubmit)}>

      <CardHeader>
        <div className="flex justify-between items-center gap-3">
          <div className="flex items-center">
            <CardTitle className="mr-4">Gastos Fixos</CardTitle>
            <Info size={18} className="hover:text-primary cursor-pointer" />
          </div>
          <GroupButtons
            isEditing={isEditing}
            toggle={toggleEditing}
            formRef={formRef}
          />
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
            {isLoading ? (
              <>carregando</>
            ) : (
              <Input
                id="fixedCost"
                type="number"
                className="pl-9 w-[300px] sm:w-[300px] md:w-[200px] lg:w-[300px] border-muted-foreground"
                disabled={!isEditing}
                placeholder={`${formatForARS(profile?.fixedCosts)}`}
                {...register('fixedCosts')}
              />
            )}
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
              placeholder={`${profile?.salesPerDay}`}
              {...register('salesPerDay')}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="daysOfWorking"
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
              id="daysOfWorking"
              type="number"
              className="pl-9 w-[300px] sm:w-[300px] md:w-[200px] lg:w-[300px] border-muted-foreground"
              disabled={!isEditing}
              placeholder={`${profile?.daysOfWorking}`}
              {...register('daysOfWorking')}
            />
          </div>
        </div>
      </CardContent>
            </form>
      <CardFooter className="flex flex-col mt-2">
        <div className="flex flex-col justify-start items-start w-full pl-2 mb-2">
          <h4 className="text-primary text-lg font-semibold leading-none tracking-tight">
            O SEU CUSTO FIXO É DE:
          </h4>
          <p className="text-muted-foreground">
            Esse valor é adicionado em cada produto.
          </p>
        </div>
        <ResultSpan>{formatForARS(profile?.fixedCostTotal)}</ResultSpan>
      </CardFooter>
    </Card>
  );
}
