import NavBar from '@/components/NavBar';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Calculadora de Custos - Dashboard',
	keywords: [
		'calculadora',
		'ficha técnica',
		'custo fixos',
		'custo unitário',
		'microempreendedor',
		'MEI',
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pt-br'>
			<body>
				<header>
					<NavBar />
				</header>
				<>{children}</>
			</body>
		</html>
	);
}
