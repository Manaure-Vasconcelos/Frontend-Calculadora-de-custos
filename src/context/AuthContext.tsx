'use client';
import { api } from '@/lib/axiosConfig';
import { setCookie, parseCookies } from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { importSPKI, jwtVerify } from 'jose';

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
        const spki = process.env.JWT_SECRET;
        const alg = 'RS256';

        if (!spki) throw new Error('Secret key not found');

        const publicKey = await importSPKI(spki, alg);

        await jwtVerify(access_token, publicKey);

        const { data } = await api.get<User>('/user');
        setUser(data);
      }
    };

    fetchUserData();
  }, []);

  async function signIn(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password });
    setCookie(undefined, 'access_token', data.access_token, {
      maxAge: 60 * 60 * 1,
      path: '/'
    });

    api.defaults.headers['Authorization'] = `Bearer ${data.access_token}`;

    setUser(data.userData);
    router.push('/');
  }

  // rota logout => exclui o cookies ou seta um cookie vazio vencendo no horario atual.
  // seta o user como null

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
