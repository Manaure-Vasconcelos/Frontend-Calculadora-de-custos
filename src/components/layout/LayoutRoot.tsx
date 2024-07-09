'use client';
import { RecipesProvider } from '@/context/recipes/contextRecipes';
import SideBar from './SideBar';
import Footer from './Footer';

export default function LayoutRoot({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar />
      <div className="flex flex-col w-full">
        <header className="border border-b-slate-500 p-6">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Header
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </header>
        <main className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
          <RecipesProvider>
            <>{children}</>
          </RecipesProvider>
        </main>
        <Footer />
      </div>
    </>
  );
}
