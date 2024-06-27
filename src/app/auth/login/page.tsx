'use client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from '@/lib/axiosConfig';
import Link from 'next/link';

interface RegisterRequest {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterRequest>();
  const router = useRouter();
  const [loginError, setLoginError] = useState('');

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        data
      );

      if (res.status === 200) {
        const token = res.data.access_token;
        localStorage.setItem('authToken', token);
        router.push('/');
      }
    } catch (error) {
      setLoginError('Failed to login. Please try again.');
      console.log(error);
    }
  });

  return (
    <div
      className="w-full min-h-full flex justify-center items-center"
    >
      <form
        onSubmit={onSubmit}
        className="border border-gray-300 rounded-lg p-4 w-80 flex flex-col gap-2"
      >
        <h1 className="text-xl font-bold pt-4 pb-1 text-center">Login</h1>
        <p className="text-xm text-slate-200 text-center pb-2">
          Use your email and password to login
        </p>

        {loginError && (
          <div className="text-red-500 text-xs mb-2 text-center">
            {loginError}
          </div>
        )}

        <label
          htmlFor="email"
          className="text-slate-500 block text-sm text-left"
        >
          Email:
        </label>
        <input
          type="email"
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required'
            }
          })}
          className="block rounded p-2 w-full bg-slate-900 text-slate-300"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">{errors.email.message}</span>
        )}

        <label
          htmlFor="password"
          className="text-slate-500 block text-sm text-left"
        >
          Password:
        </label>
        <input
          type="password"
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required'
            }
          })}
          className="block rounded p-2 w-full bg-slate-900 text-slate-300"
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}

        <button className="bg-blue-500 rounded-lg mt-3 p-3 w-full">
          Login
        </button>
        <span className="flex flex-row justify-center items-center gap-2 pt-2">
          <h3 className="text-sm text-slate-200">New to here? </h3>
          <Link href={'/auth/register'} className="text-blue-500">
            Create an acount
          </Link>
        </span>
      </form>
    </div>
  );
}
