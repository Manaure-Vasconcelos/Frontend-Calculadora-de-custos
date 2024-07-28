'use client';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import Header from './Header';
import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
  h1: string;
  p: string;
}

export default function LayoutRoot({ children, h1, p }: LayoutProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Ou um componente de carregamento
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-gray1 dark:bg-background px-4 md:px-6">
        <NavBar />
      </header>
      <main className="flex-1 w-full m-0 overflow-auto bg-background ">
        <Header h1={h1} p={p} />
        <section className="flex flex-wrap p-2 mt-6 gap-5 justify-evenly items-start">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  );
}
