import NavBar from '@/components/NavBar';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Calculadora de Custos - Dashboard',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<header>
					<NavBar />
				</header>
				<>{children}</>
			</body>
		</html>
	);
}
