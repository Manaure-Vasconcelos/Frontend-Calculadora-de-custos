import Link from 'next/link';

export default function NavBar() {
  return (
    <>
      <nav className="bg-slate-900 h-full w-48 fixed left-0 top-0 bottom-0 z-10 p-4">
        <ul className="w-full flex flex-col justify-center gap-5 text-white text-xl">
          <li className="list-none border-b-2 border-transparent hover:border-white transition-all ease-in-out duration-300">
            <Link href="/">Dashboard</Link>
          </li>
          <li className="list-none border-b-2 border-transparent hover:border-white transition-all ease-in-out duration-300">
            <Link href="/">All Recipes*</Link>
          </li>
          <li className="list-none border-b-2 border-transparent hover:border-white transition-all ease-in-out duration-300">
            <Link href="/">Fixed Costs*</Link>
          </li>
          <li className="list-none border-b-2 border-transparent hover:border-white transition-all ease-in-out duration-300">
            <Link href="./about">About</Link>
          </li>
          <li className="list-none border-b-2 border-transparent hover:border-white transition-all ease-in-out duration-300">
            <Link href="./acount">Acount</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
