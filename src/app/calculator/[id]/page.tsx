import LayoutRoot from '@/components/layout/LayoutRoot';
import FullRecipe from '@/components/pages/FullRecipe';

export default function Calculator({ params }: { params: { id: string } }) {
  return (
    <LayoutRoot
      h1="Recipe details"
      p="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <div className="p-4 w-full h-full flex flex-col items-start">
        <header>
          <h1 className="text-xl font-bold p-4">Calculator</h1>
        </header>
        <main className="p-4 w-full h-full flex flex-col justify-normal items-start ">
          <FullRecipe id={params.id} />
        </main>
      </div>
    </LayoutRoot>
  );
}
