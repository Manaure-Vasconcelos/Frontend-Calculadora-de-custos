'use client';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from "@/lib/axiosConfig";
import Link from 'next/link';

interface RegisterRequest {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterRequest>();
	const router = useRouter();

	const onSubmit = handleSubmit(async (data) => {
		if (data.confirmPassword !== data.password)
			return alert('Passwords is not match');

		const res = await axios.post('https://backend-calculadora-de-custo.onrender.com/auth/register', data);
		if (res.status === 201) router.push('/auth/login');
	});

	return (
		<div className=' border border-gray-300 rounded-lg p-4 w-80 mx-auto flex flex-col justify-center items-center'>
			<form onSubmit={onSubmit} className='w-full flex flex-col gap-2'>
				<h1 className='text-xl font-bold p-4 text-center'>Register</h1>

				<label
					htmlFor='name'
					className='text-slate-500 block text-sm text-left'>
					Username:
				</label>
				<input
					type='text'
					{...register('name', {
						required: {
							value: true,
							message: 'Name is required',
						},
					})}
					className='block rounded p-2 w-full bg-slate-900 text-slate-300'
					placeholder='3 - 20 chars'
				/>
				{errors.name && (
					<span className='text-red-500 text-xs'>{errors.name.message}</span>
				)}

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
					placeholder='example@domain.com'
				/>
				{errors.email && (
					<span className='text-red-500 text-xs'>{errors.email.message}</span>
				)}

				<label
					htmlFor='confirmPassword'
					className='text-slate-500 block text-sm text-left'>
					Confirm Password:
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
					placeholder='Min: 8 chars. (A-a-1-@)'
				/>
				{errors.password && (
					<span className='text-red-500 text-xs'>
						{errors.password.message}
					</span>
				)}

				<label
					htmlFor='confirmPassword'
					className='text-slate-500 block text-sm text-left'>
					Password:
				</label>
				<input
					type='password'
					{...register('confirmPassword', {
						required: {
							value: true,
							message: 'Password is required',
						},
					})}
					className='block rounded p-2 w-full bg-slate-900 text-slate-300'
					placeholder='Min: 8 chars. (A-a-1-@)'
				/>
				{errors.confirmPassword && (
					<span className='text-red-500 text-xs'>
						{errors.confirmPassword.message}
					</span>
				)}

				<button className='bg-blue-500 rounded-lg mt-3 p-3 w-full'>
					Register
				</button>

				<span className='flex flex-row justify-center items-center gap-2 pt-2'>
					<h3 className='text-sm text-slate-200'>Already have an Account? </h3>
					<Link href={'/auth/login'} className='text-blue-500 '>
						Login
					</Link>
				</span>
			</form>
		</div>
	);
}
