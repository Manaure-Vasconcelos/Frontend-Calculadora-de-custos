import LayoutRoot from '@/components/layout/LayoutRoot';

export default function Acount() {
  return (
    <LayoutRoot
      h1="Acount"
      p="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    >
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
