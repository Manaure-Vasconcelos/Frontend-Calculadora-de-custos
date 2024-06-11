'use client';
import { Metadata } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';

/* export const metadata: Metadata = {
	title: 'Register',
};
 */
interface RegisterRequest {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default function Register() {
	const { register, handleSubmit, watch } = useForm();

	const onSubmit = handleSubmit(data => console.log(data))

	/* const onSubmit : SubmitHandler <Inputs> = ( dados ) = > console .​ registro ( dados )   */

	return (
		<div className='border border-gray-300 rounded-lg p-4 w-80 mx-auto flex flex-col justify-center items-center'>
			<h1 className='text-xl font-bold p-4'>Registrar</h1>

			<form onSubmit={onSubmit} className='w-full flex flex-col gap-4 items-center'>
				<input
					type='text'
					{...register('username', { required: true })}
					placeholder='Username'
					className='border border-gray-300 rounded p-2 w-full'
					/>
				<input
					type='email'
					{...register('email', { required: true })}
					placeholder='Email'
					className='border border-gray-300 rounded p-2 w-full'
					/>
				<input
					type='password'
					{...register('password', { required: true })}
					placeholder='Password'
					className='border border-gray-300 rounded p-2 w-full'
					/>
				<input
					type='confirmPassword'
					{...register('confirmPassword', { required: true })}
					placeholder='Confirm Password'
					className='border border-gray-300 rounded p-2 w-full'
				/>

				<button className='bg-blue-500 rounded p-2 w-full'>Register</button>
			</form>
		</div>
	);
}
