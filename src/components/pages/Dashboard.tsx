'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axiosConfig';
import AllRecipes from './AllRecipesDashboard';
import FixedCosts from './FixedCosts';
import dynamic from 'next/dynamic';
import { Recipe } from './EditRecipe';


interface UserData {
  id: string;
  name: string;
  recipes: Recipe[];
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const LoadingAnimation = dynamic(() => import('../ui/LoadingAnimation'), {
    ssr: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<UserData>(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`
        );
        setUserData(res.data);
        setLoading(false);
      } catch (error) {
        alert('Login expirado, você será redirecionado.');
        router.push('/auth/login');
      }
    };

    fetchData();
  }, [router]);

  if (loading) return <LoadingAnimation height={250} width={250}/>;

  return (
    <div className="p-4 w-full h-full flex flex-col justify-normal items-start ">
      <h1 className="text-xl font-bold p-4">Dashboard</h1>
      {userData ? (
        <div className="border border-slate-400 p-4 w-full gap-2">
          <h1 className="block text-xl p-5">Welcome, {userData.name}</h1>
          <main className="flex justify-around">
            <AllRecipes userData={userData} />
            <FixedCosts />
          </main>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
