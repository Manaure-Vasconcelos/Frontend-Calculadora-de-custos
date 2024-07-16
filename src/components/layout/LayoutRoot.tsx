'use client';
import SideBar from './SideBar';
import Footer from './Footer';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export default function LayoutRoot({ children, header }: LayoutProps) {
  const path = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Ou um componente de carregamento
  }

  const isAuthRoute = path.includes('/auth');

  return isAuthRoute ? (
    <>{children}</>
  ) : (
    <>
      <SideBar />
      <div className="flex flex-col w-full bg-white">
        <header className="p-10">{header}</header>
        <main className="flex-1 overflow-y-auto p-4 flex items-center justify-center">
          <>{children}</>
        </main>
        <Footer />
      </div>
    </>
  );
}
