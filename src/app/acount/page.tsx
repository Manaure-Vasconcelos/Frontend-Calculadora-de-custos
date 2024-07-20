import LayoutRoot from "@/components/layout/LayoutRoot"

export default function Acount() {
  const header = (
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Acount
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </>
  );

  return (
    <LayoutRoot header={header}>
      <div>
        <h1>Acount</h1>
        <ul>
          <li>Dados da conta como:</li>
          <li>Alterar nome, email ou senha</li>
          <li>Deletar todos dados registrados</li>
          <li>Logout</li>
          <li>Deletar conta</li>
        </ul>
      </div>
    </LayoutRoot>
  );
}
