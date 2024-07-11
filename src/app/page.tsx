import AllRecipesDashboard from '@/components/pages/AllRecipesDashboard';
import FixedCosts from '@/components/pages/FixedCosts';
import Dashboard from '@/components/pages/Dashboard';
import LayoutRoot from '@/components/layout/LayoutRoot';

export default function Home() {
  const header = (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Dashboard
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </>
  );

  return (
    <LayoutRoot header={header}>
      <div className="h-full w-full items-start flex justify-between">
        <AllRecipesDashboard />
        <FixedCosts />
      </div>
    </LayoutRoot>
  );
}
