import LayoutRoot from '@/components/layout/LayoutRoot';
import FullRecipe from '@/components/pages/FullRecipe';

export default function Calculator({ params }: { params: { id: string } }) {
  return (
    <LayoutRoot
      h1="Recipe details"
      p="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <FullRecipe id={params.id} />
      {/* <main className="p-4 w-full h-full flex flex-col justify-normal items-start ">
      </main> */}
    </LayoutRoot>
  );
}
