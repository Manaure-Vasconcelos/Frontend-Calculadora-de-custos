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
      <body>
        <header>
          <NavBar />
        </header>
        <RecipesProvider>
          <>{children}</>
        </RecipesProvider>
      </body>
    </html>
  );
}
