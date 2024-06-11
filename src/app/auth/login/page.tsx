'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface RegisterRequest {
	email: string;
	password: string;
}

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterRequest>();
	const router = useRouter();

	const onSubmit = handleSubmit(async (data) => {
		const res = await axios.post('http://localhost:3001/auth/login', data);
		console.log(res);
		if (res.status === 201) router.push('/');
	});

	return (
		<div className=' border border-gray-300 rounded-lg p-4 w-80 mx-auto flex flex-col justify-center items-center'>
			<form onSubmit={onSubmit} className='w-full flex flex-col gap-2'>
				<h1 className='text-xl font-bold pt-4 pb-1 text-center'>Login</h1>
				<p className='text-xm text-slate-200 text-center pb-2'>
					Use your email and password to login
				</p>

				<label
					htmlFor='email'
					className='text-slate-500 block text-sm text-left'>
					Email:
				</label>
				<input
					type='email'
					{...register('email', {
						required: {
							value: true,
							message: 'Email is required',
						},
					})}
					className='block rounded p-2 w-full bg-slate-900 text-slate-300'
				/>
				{errors.email && (
					<span className='text-red-500 text-xs'>{errors.email.message}</span>
				)}

				<label
					htmlFor='password'
					className='text-slate-500 block text-sm text-left'>
					Password:
				</label>
				<input
					type='password'
					{...register('password', {
						required: {
							value: true,
							message: 'Password is required',
						},
					})}
					className='block rounded p-2 w-full bg-slate-900 text-slate-300'
				/>
				{errors.password && (
					<span className='text-red-500 text-xs'>
						{errors.password.message}
					</span>
				)}

				<button className='bg-blue-500 rounded-lg mt-3 p-3 w-full'>
					Login
				</button>
				<span className='flex flex-row justify-center items-center gap-2 pt-2'>
					<h3 className='text-sm text-slate-200'>New to here? </h3>
					<Link href={'/auth/register'} className='text-blue-500'>
						Create an acount
					</Link>
				</span>
			</form>
		</div>
	);
}
