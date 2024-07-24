'use client';
import SideBar from './SideBar';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import Header from './Header';

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
    <div className="flex h-screen">
      <SideBar />
      <main className="flex flex-1 m-0 overflow-auto bg-white">
        <section className="flex flex-col flex-1 w-full">
          <div className="flex-1 overflow-auto">
            <Header h1={h1} p={p} />
            <article className="flex flex-wrap h-full container p-2 mt-6 gap-2 justify-evenly items-start space-y-5">
              {children}
            </article>
          </div>
          <Footer />
        </section>
      </main>
    </div>
  );
}
