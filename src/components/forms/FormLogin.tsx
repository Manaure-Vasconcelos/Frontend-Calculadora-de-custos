'use client';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface SignInRequest {
  email: string;
  password: string;
}

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInRequest>();
  const { signIn } = useAuth();

  const onSubmit = async ({ email, password }: SignInRequest) => {
    try {
      await signIn(email, password);
    } catch (err: any) {
      alert('Check your credentials and try again.');
    }
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
          >
            Email Address
          </label>
          <Input
            {...register('email', { required: true })}
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
            className="block w-full px-4 py-2 mt-2 "
          />
        </div>

        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <label
              htmlFor="password"
              className="text-sm text-gray-600 dark:text-gray-200"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Input
            {...register('password', { required: true })}
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            className="block w-full px-4 py-2 mt-2"
          />
        </div>

        <div className="mt-6">
          <Button className="w-full px-4 py-2 tracking-wide bg-primary hover:bg-green-400">
            Sign in
          </Button>
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <span className="text-xs text-gray-500 uppercase dark:text-gray-400 cursor-default">
              or
            </span>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
          <Link
            href="#"
            className="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <svg className="w-6 h-6 mx-2" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>

            <span className="mx-2">Sign in with Google</span>
          </Link>
        </div>
      </form>

      <p className="mt-6 text-sm text-center text-gray-400">
        Don't have an account yet?{' '}
        <Link
          href="/auth/register"
          className="text-blue-500 focus:outline-none focus:underline hover:underline"
        >
          Sign up
        </Link>
        .
      </p>
    </div>
  );
}
