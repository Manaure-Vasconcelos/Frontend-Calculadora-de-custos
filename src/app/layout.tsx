import { Metadata } from 'next';
import './globals.css';
import '@/lib/axiosConfig';
import LayoutRoot from '@/components/layout/LayoutRoot';

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
      <body className="flex min-h-screen flex-row">
        <LayoutRoot>{children}</LayoutRoot>
      </body>
    </html>
  );
}
