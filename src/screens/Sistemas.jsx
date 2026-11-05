import { Shell, Table, Tag } from '../components/Shell.jsx';
export function Sistemas({ go }) {
  return (
    <Shell active="sistemas" go={go} title="Sistemas (franquias)" action="Novo sistema">
      <Table
        cols={['Franquia', 'Cidade', 'Responsável', 'Projetos ativos', 'Status']}
        rows={[
          ['Skye Campinas', 'Campinas, SP', 'Carlos Ribeiro', '5', <Tag>Ativa</Tag>],
          ['Skye São Paulo', 'São Paulo, SP', 'Fernanda Dias', '8', <Tag>Ativa</Tag>],
          ['Skye Curitiba', 'Curitiba, PR', 'Henrique Souza', '3', <Tag>Ativa</Tag>],
          ['Skye Florianópolis', 'Florianópolis, SC', 'Juliana Prates', '0', <Tag>Em implantação</Tag>],
        ]}
      />
    </Shell>
  );
}
