import Link from 'next/link'

export default function NavBar() {
	return (
		<>
			<nav className='bg-gray-800 w-full py-3'>
				<ul className='flex justify-end space-x-4 pr-8 text-white'>
					<li className='list-none'>
            <Link href='/'>Dashboard</Link>
          </li>
					<li className='list-none'>
            <Link href='./calculator'>Calculator</Link>
          </li>
					<li className='list-none'>
            <Link href='./acount'>Acount</Link>
            </li>
					<li className='list-none'>
            <Link href='./about'>Sobre</Link>
            </li>
				</ul>
			</nav>
		</>
	);
}
