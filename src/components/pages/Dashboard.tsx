'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axiosConfig';
import AllRecipes from './AllRecipesDashboard';
import FixedCosts from './FixedCosts';
import dynamic from 'next/dynamic';
import { Recipe } from '@/context/ContextRecipes';

interface UserData {
  id: string;
  name: string;
  recipes: Recipe[];
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  const LoadingAnimation = dynamic(() => import('../ui/LoadingAnimation'), {
    ssr: false
  });

  /* Refatorar / criar context */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get<UserData>('/user');
        setUserData(res.data);
      } catch (error: any) {
        console.log(error);
        /* alert('Login expirado, você será redirecionado.'); */
        /* router.push('/auth/login'); */
      }
    };

    fetchData();
  }, []);

  if (!userData)
    return (
      <div className="h-screen flex items-center">
        <LoadingAnimation height={250} width={250} />
      </div>
    );

  return (
    <div className="p-4 w-full h-full flex flex-col justify-normal items-start ">
      <h1 className="text-xl font-bold p-4">Dashboard</h1>
      {userData && (
        <div className="border border-slate-400 p-4 w-full gap-2">
          <h1 className="block text-xl p-5">Welcome, {userData.name}</h1>
          <main className="flex justify-around">
            <AllRecipes />
            <FixedCosts />
          </main>
        </div>
      )}
    </div>
  );
}
