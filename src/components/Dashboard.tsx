"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from "../../axiosConfig";

interface Recipe {
  id: number;
  title: string;
  describe: string;
  userId: string;
  valuePartial: number;
  ingredients: any[];
  createdAt: Date;
  updatedAt: Date;
}

interface UserData {
  id: number;
  name: string;
  recipes: Recipe[];
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get<UserData>(
          "https://backend-calculadora-de-custo.onrender.com/user"
        );
        setUserData(res.data);

      } catch(error) {
        alert('Login expirado, você será redirecionado.')
        router.push('/auth/login')
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="p-4 w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold p-4">Dashboard</h1>
      {userData ? (
        <div className="border border-slate-400 p-4 w-full gap-2">
          <h1 className="block text-xl p-5">Welcome, {userData.name}</h1>
          <main className="flex justify-around">
            <section className="border border-slate-700 p-4 w-1/2">
            <div className='flex justify-between items-center'>
              <h2 className='text-xl'>Recipes:</h2>
              <button className='px-2 py-1 rounded bg-slate-500 mr-5 mb-2 mt-2' onClick={() => router.push('/calculator')}>Create Recipe</button>
            </div>
              <div className='mt-2 w-full'>{userData.recipes.map((recipe) => (
                <article key={recipe.id} className='bg-white border-b p-2 flex justify-between items-center'>
                  <span>Title: {recipe.title}</span>
                  <span>Itens: {recipe.ingredients.length}</span>
                  <span>Value: {recipe.valuePartial}</span>
                  <button className='bg-blue-500 text-white px-2 py-1 rounded'>Edit</button>
                </article>
              ))}</div>
            </section>
            <section className="border border-slate-700 p-4 w-1/3">Fixed Costs
            <ul>
              <li>Contas fixas: Gás, luz, internet, aluguel.</li>
              <li>Empreende na propria casa ou local alugado</li>
              <li>Nº de vendas/dia</li>
              </ul></section>
          </main>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
