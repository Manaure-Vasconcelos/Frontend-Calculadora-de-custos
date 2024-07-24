interface HeaderProps {
  h1: string;
  p: string;
}

export default function Header({ h1, p }: HeaderProps) {
  return (
    <header className="p-10 min-w-full">
      <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {h1}
      </h2>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        {p}
      </p>
    </header>
  );
}
