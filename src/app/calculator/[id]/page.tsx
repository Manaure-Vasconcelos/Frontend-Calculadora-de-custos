'use client';
import LayoutRoot from '@/components/layout/LayoutRoot';
import FullRecipe from '@/components/FullRecipe';
import CostUnit from '@/components/CostUnit';
import ProfitProduct from '@/components/ProfitProduct';
import { api } from '@/lib/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { IngredientProps } from '@/components/AllRecipesDashboard';

export interface GetRecipe {
  id: number;
  title: string;
  describe: string;
  valuePartial: number;
  createdAt: Date;
  ingredients: IngredientProps[];
  additional: IngredientProps[];
  serving: number;
  pack: number;
  profit: number;
  valueUnit: number;
  valueTotal: number;
}

export default function Calculator({ params }: { params: { id: string } }) {
  const fetchData = async (): Promise<GetRecipe> => {
    try {
      const res = await api.get<GetRecipe>(`/recipes/${params.id}`);
      return res.data;
    } catch (err: any) {
      return err.message;
    }
  };

  const { data } = useQuery({
    queryKey: ['recipe'],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ['data']
  });

  return (
    <LayoutRoot
      h1="Recipe details"
      p="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <FullRecipe />
      <div className="flex-wrap gap-3 w-[400px] p-0 flex flex-col justify-center items-center">
        <CostUnit />
        <ProfitProduct />
      </div>
    </LayoutRoot>
  );
}
