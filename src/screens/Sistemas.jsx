import { Shell, Table, Status } from '../components/Shell.jsx';
export function Sistemas({ go }) {
  return (
    <Shell active="sistemas" go={go} title="Sistemas (franquias)" action="Novo sistema">
      <Table
        cols={['Franquia', 'Cidade', 'Responsável', 'Projetos ativos', 'Status']}
        rows={[
          ['Skye Campinas', 'Campinas, SP', 'Carlos Ribeiro', '5', <Status>Ativa</Status>],
          ['Skye São Paulo', 'São Paulo, SP', 'Fernanda Dias', '8', <Status>Ativa</Status>],
          ['Skye Curitiba', 'Curitiba, PR', 'Henrique Souza', '3', <Status>Ativa</Status>],
          ['Skye Florianópolis', 'Florianópolis, SC', 'Juliana Prates', '0', <Status>Em implantação</Status>],
        ]}
      />
    </Shell>
  );
}
