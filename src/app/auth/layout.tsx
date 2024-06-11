import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Register - Login',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
    <div className='flex justify-center items-center min-h-screen'>
      {children}
    </div>
	);
}
