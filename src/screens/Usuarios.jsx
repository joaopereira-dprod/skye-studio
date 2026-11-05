import { Shell, Table, Tag } from '../components/Shell.jsx';
export function Usuarios({ go }) {
  return (
    <Shell active="usuarios" go={go} title="Usuários" action="Convidar usuário">
      <Table
        cols={['Nome', 'E-mail', 'Perfil', 'Sistema', 'Status']}
        rows={[
          ['Carlos Ribeiro', 'carlos@skye.com', <Tag>Franqueado</Tag>, 'Skye Campinas', 'Ativo'],
          ['Fernanda Dias', 'fernanda@skye.com', <Tag>Franqueado</Tag>, 'Skye São Paulo', 'Ativo'],
          ['Luiz Moreira', 'luiz@skye.com', <Tag>Orçamentista</Tag>, 'Skye São Paulo', 'Ativo'],
          ['Patrícia Gomes', 'patricia@skye.com', <Tag>Administradora</Tag>, 'Todos', 'Convite pendente'],
        ]}
      />
    </Shell>
  );
}
