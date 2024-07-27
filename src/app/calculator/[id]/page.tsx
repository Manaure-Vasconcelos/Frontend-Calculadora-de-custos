import LayoutRoot from '@/components/layout/LayoutRoot';
import FullRecipe from '@/components/FullRecipe';
import CostUnit from '@/components/CostUnit';
import ProfitProduct from '@/components/ProfitProduct';

export default function Calculator({ params }: { params: { id: string } }) {
  return (
    <LayoutRoot
      h1="Recipe details"
      p="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <FullRecipe id={params.id} />
      <div className="flex-wrap gap-3 w-[400px] p-0 flex flex-col justify-center items-center">
        <CostUnit />
        <ProfitProduct />
      </div>
    </LayoutRoot>
  );
}
