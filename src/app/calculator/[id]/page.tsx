import LayoutRoot from '@/components/layout/LayoutRoot';
import FullRecipe from '@/components/FullRecipe';
import CostUnit from '@/components/CostUnit';

export default function Calculator({ params }: { params: { id: string } }) {
  return (
    <LayoutRoot
      h1="Recipe details"
      p="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <FullRecipe id={params.id} />
      <CostUnit />
    </LayoutRoot>
  );
}
