import AllRecipesDashboard from '@/components/pages/AllRecipesDashboard';
import FixedCosts from '@/components/pages/FixedCosts';
import Dashboard from '@/components/pages/Dashboard';

export default function Home() {
  return (
    <div className="h-full w-full items-start flex justify-between">
      <AllRecipesDashboard />
      <FixedCosts />
    </div>
  );
}
