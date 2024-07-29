'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axiosConfig';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

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
        <Input
          {...register('name', { required: true })}
          type="text"
          name="name"
          id="name"
          placeholder="Your First Name"
          className="block w-full px-4 py-2 mt-2"
        />
      </div>

      <div className="mt-4">
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
          className="block w-full px-4 py-2 mt-2"
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

        <Input
          {...register('password', { required: true })}
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
          className="block w-full px-4 py-2 mt-2"
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

        <Input
          {...register('confirmPassword', { required: true })}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="block w-full px-4 py-2 mt-2"
        />
      </div>

      <div className="mt-6">
        <Button
          className="w-full px-4 py-2 tracking-wide bg-primary hover:bg-green-400"
        >
          Sign Up
        </Button>
      </div>
    </form>
  );
}

export default FormRegister;
