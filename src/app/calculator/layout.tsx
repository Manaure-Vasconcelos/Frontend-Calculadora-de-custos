import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Calculadora de Custos',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <div>{children}</div>;
}
