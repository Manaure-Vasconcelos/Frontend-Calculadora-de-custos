import { Metadata } from 'next';
import './globals.css';
import '@/lib/axiosConfig';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Calculadora de Preço',
  keywords: [
    'calculadora',
    'ficha técnica',
    'custo fixos',
    'custo unitário',
    'microempreendedor',
    'MEI'
  ],
  icons: {
    icon: '/favicon2.png'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
