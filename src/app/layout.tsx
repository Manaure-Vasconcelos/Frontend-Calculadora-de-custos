import { Metadata } from 'next';
import './globals.css';
import '@/lib/axiosConfig';
import RecipesProvider from '@/context/ContextRecipes';
import AuthProvider from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'Calculadora de Preço',
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
      <body className="flex min-h-screen flex-row">
        <AuthProvider>
          <RecipesProvider>{children}</RecipesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
