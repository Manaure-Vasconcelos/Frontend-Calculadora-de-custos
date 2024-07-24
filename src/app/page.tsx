import AllRecipesDashboard from '@/components/AllRecipesDashboard';
import FixedCosts from '@/components/FixedCosts';
import LayoutRoot from '@/components/layout/LayoutRoot';

export default function Home() {
  return (
    <LayoutRoot
      h1="Dashboard"
      p="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
      <AllRecipesDashboard />
      <FixedCosts />
    </LayoutRoot>
  );
}
