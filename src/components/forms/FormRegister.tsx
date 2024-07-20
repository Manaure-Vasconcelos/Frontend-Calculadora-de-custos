'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axiosConfig';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function FormRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterRequest>();
  const router = useRouter();

  const onSubmit = async (data: RegisterRequest) => {
    if (data.confirmPassword !== data.password)
      return alert('Passwords is not match');

    try {
      await api.post(`/auth/register`, data);
      router.push('/auth/login');
    } catch (error) {
      alert('Verify your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
        >
          First Name
        </label>
        <input
          {...register('name', { required: true })}
          type="text"
          name="name"
          id="name"
          placeholder="Your First Name"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
        >
          Email Address
        </label>
        <input
          {...register('email', { required: true })}
          type="email"
          name="email"
          id="email"
          placeholder="example@example.com"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <label
            htmlFor="password"
            className="text-sm text-gray-600 dark:text-gray-200"
          >
            Password
          </label>
        </div>

        <input
          {...register('password', { required: true })}
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mt-4">
        <div className="flex justify-between mb-2">
          <label
            htmlFor="password"
            className="text-sm text-gray-600 dark:text-gray-200"
          >
            Confirm Password
          </label>
        </div>

        <input
          {...register('confirmPassword', { required: true })}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mt-6">
        <button
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default FormRegister;
