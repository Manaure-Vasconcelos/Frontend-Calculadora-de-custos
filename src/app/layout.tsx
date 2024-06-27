import NavBar from '@/components/layout/NavBar';
import { Metadata } from 'next';
import './globals.css';
import '@/lib/axiosConfig';
import { RecipesProvider } from '@/context/recipes/contextRecipes';

export const metadata: Metadata = {
  title: 'Calculadora de Custos - Dashboard',
  keywords: [
    'calculadora',
    'ficha técnica',
    'custo fixos',
    'custo unitário',
    'microempreendedor',
    'MEI'
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="flex min-h-screen">
        <NavBar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto p-4 ml-48 flex items-center justify-center">
            <RecipesProvider>
              <>{children}</>
            </RecipesProvider>
          </main>
          <footer className="bg-slate-700 w-full p-4 fixed bottom-0 left-48 z-10">
            Info pessoal / links
          </footer>
        </div>
      </body>
    </html>
  );
}
