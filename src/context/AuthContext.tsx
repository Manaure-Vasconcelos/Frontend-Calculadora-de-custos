'use client';
import { api } from '@/lib/axiosConfig';
import { setCookie, parseCookies } from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  avatarURL: string;
}

interface AuthContextProps {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

export default function AuthProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  /* const [user, setUser] = useState<User | null>({
    id: 'id',
    name: 'Manaure Vasconcelos',
    email: 'Manaure@gmail.com',
    avatarURL: 'dasda'
  }); */
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get<User>('/user');
        setUser(data);
      } catch (error) {
        throw new Error('Error query data');
      }
    }
    const { logged } = parseCookies();
    if (logged) fetchData();
  }, []);

  async function signIn(email: string, password: string) {
    const { data } = await api.post('/auth/signin', { email, password });

    setCookie(undefined, 'logged', 'logged', {
      sameSite: 'strict',
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    setUser(data.userData);

    router.push('/');
  }

  async function signOut() {
    await api.post('/auth/signout');

    setCookie(undefined, 'logged', '', {
      maxAge: 0,
      path: '/'
    });

    router.push('/auth/login');
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
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
