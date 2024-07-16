import LayoutRoot from '@/components/layout/LayoutRoot';
import FullRecipe from '@/components/pages/FullRecipe';

export default function Calculator({ params }: { params: { id: string } }) {
  const header = (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Recipe details
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </>
  );

  return (
    <LayoutRoot header={header}>
      <div className="p-4 w-full h-full flex flex-col items-top">
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
