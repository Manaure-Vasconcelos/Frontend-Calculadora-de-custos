import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register - Login'
};

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='w-full'>{children}</div>;
}
