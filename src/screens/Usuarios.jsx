import { Shell, Table, Status, Role } from '../components/Shell.jsx';
export function Usuarios({ go }) {
  return (
    <Shell active="usuarios" go={go} title="Usuários" action="Convidar usuário">
      <Table
        cols={['Nome', 'E-mail', 'Perfil', 'Sistema', 'Status']}
        rows={[
          ['Carlos Ribeiro', 'carlos@skye.com', <Role>Franqueado</Role>, 'Skye Campinas', <Status>Ativo</Status>],
          ['Fernanda Dias', 'fernanda@skye.com', <Role>Franqueado</Role>, 'Skye São Paulo', <Status>Ativo</Status>],
          ['Luiz Moreira', 'luiz@skye.com', <Role>Orçamentista</Role>, 'Skye São Paulo', <Status>Ativo</Status>],
          ['Patrícia Gomes', 'patricia@skye.com', <Role>Administradora</Role>, 'Todos', <Status>Convite pendente</Status>],
        ]}
      />
    </Shell>
  );
}
