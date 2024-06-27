'use client';
import { RecipesProvider } from '@/context/recipes/contextRecipes';
import NavBar from './NavBar';
import { usePathname } from 'next/navigation';

export default function LayoutRoot({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/auth/login' || pathname === '/auth/register'
  return (
    <>
      {!isLoginPage && <NavBar />}
      <main
        className={`flex-1 overflow-y-auto p-4 flex items-center justify-center ${!isLoginPage ? 'ml-48' : ''}`}
      >
        <RecipesProvider>
          <>{children}</>
        </RecipesProvider>
      </main>
      <footer
        className={`bg-slate-700 w-full p-4 fixed bottom-0 ${!isLoginPage ? 'left-48 z-10' : ''}`}
      >
        Info pessoal / links
      </footer>
    </>
  );
}
