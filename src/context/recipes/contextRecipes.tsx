'use client';
import { createContext, useContext, useState } from 'react';
import axios from '@/lib/axiosConfig';

export interface Recipe {
  id: number;
  title: string;
  describe: string | null;
  userId: string;
  valuePartial: number;
  ingredients: Ingredient[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Ingredient {
  id: number;
  name: string;
  usedWeight: number;
  grossWeight: number;
  marketPrice: number;
  realAmount: number;
  recipeId: number;
}

interface RecipeContextProps {
  recipes: Recipe[];
  fetchData: () => Promise<void>
  addRecipe: (newRecipe: Recipe) => void;
  updateRecipe: (id: number, updatedRecipe: Recipe) => void;
  deleteRecipe: (id: number) => void;
  getRecipeById: (id: number) => void;
}

const RecipesContext = createContext<RecipeContextProps>(
  {} as RecipeContextProps
);

export const RecipesProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchData = async () => {
    try {
      const res = await axios.get<Recipe[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/recipes/all`
      );
      setRecipes(res.data);
    } catch (error) {
      console.log(`Error fetching data`);
    }
  };

  const addRecipe = (newRecipe: Recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  const updateRecipe = (id: number, updatedRecipe: Recipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
      )
    );
  };

  const deleteRecipe = (id: number) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id)
    );
  };

  const getRecipeById = (id: number): Recipe | undefined => {
    return recipes.find((recipe) => recipe.id === id);
  };

  return (
    <RecipesContext.Provider
      value={{ recipes,fetchData,addRecipe, updateRecipe, deleteRecipe, getRecipeById }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipesProvider');
  }
  return context;
};
