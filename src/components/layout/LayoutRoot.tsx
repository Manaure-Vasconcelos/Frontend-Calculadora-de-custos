'use client';
import { RecipesProvider } from '@/context/recipes/contextRecipes';
import SideBar from './SideBar';
import { usePathname } from 'next/navigation';

export default function LayoutRoot({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage =
    pathname === '/auth/login' || pathname === '/auth/register';
  return (
    <>
      {!isLoginPage && <SideBar />}
      <main
        className={`flex-1 overflow-y-auto p-4 flex items-center justify-center ${!isLoginPage ? 'ml-48' : ''}`}
      >
        <RecipesProvider>
          <>{children}</>
        </RecipesProvider>
      </main>
      
    </>
  );
}
