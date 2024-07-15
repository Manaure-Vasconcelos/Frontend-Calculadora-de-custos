'use client';
import { api } from '@/lib/axiosConfig';
import { setCookie, parseCookies } from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext({} as AuthContextProps);

export default function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const fetchUserData = async () => {
      const { access_token } = parseCookies();

      if (access_token) {
        const { data } = await api.get<User>('/user');
        setUser(data);
      }
    };

    fetchUserData();
  }, []);

  async function signIn(email: string, password: string) {
    const res = await api.post('/auth/login', { email, password });
    console.log(res.data);
    setCookie(undefined, 'access_token', res.data.access_token, {
      maxAge: 60 * 60 * 1,
      path: '/',
    });

    setUser(res.data.userData);
    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
