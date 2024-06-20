"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../axiosConfig";
import RecipesDashboard from "./RecipesDashboard";
import FixedCosts from "./FixedCosts";
import dynamic from "next/dynamic";


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
  id: string;
  name: string;
  recipes: Recipe[];
}

export default function Dashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const LoadingAnimation = dynamic(
    () => import("../components/LoadingAnimation"),
    {
      ssr: false,
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<UserData>(
          "https://backend-calculadora-de-custo.onrender.com/user"
        );
        setUserData(res.data);
        setLoading(false);
      } catch (error) {
        alert("Login expirado, você será redirecionado.");
        router.push("/auth/login");
      }
    };

    
    fetchData();
  }, [router]);

  if (loading) return <LoadingAnimation />;

  return (
    <div className="p-4 w-full h-full flex flex-col justify-normal items-start ">
      <h1 className="text-xl font-bold p-4">Dashboard</h1>
      {userData ? (
        <div className="border border-slate-400 p-4 w-full gap-2">
          <h1 className="block text-xl p-5">Welcome, {userData.name}</h1>
          <main className="flex justify-around">
            <RecipesDashboard userData={userData} />
            <FixedCosts />
          </main>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
