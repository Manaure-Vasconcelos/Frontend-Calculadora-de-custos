import Link from 'next/link';

export default function NavBar() {
	return (
		<>
			<nav className='bg-slate-900 w-full py-4 border-b-2'>
				<ul className='flex justify-end space-x-4 pr-8 text-white'>
					<li className='list-none'>
						<Link href='./about'>About</Link>
					</li>
					<li className='list-none'>
						<Link href='/'>Dashboard</Link>
					</li>
					<li className='list-none'>
						<Link href='./calculator'>Calculator</Link>
					</li>
					<li className='list-none'>
						<Link href='./acount'>Acount</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
