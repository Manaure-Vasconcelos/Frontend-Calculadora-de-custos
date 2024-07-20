import AllRecipesDashboard from '@/components/pages/AllRecipesDashboard';
import FixedCosts from '@/components/pages/FixedCosts';
import LayoutRoot from '@/components/layout/LayoutRoot';
import Header from '@/components/layout/Header';

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
