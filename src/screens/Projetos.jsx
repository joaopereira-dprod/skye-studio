import { Shell, Table, Tag, Stat } from '../components/Shell.jsx';
export function Projetos({ go }) {
  return (
    <Shell active="projetos" go={go} title="Projetos" action="Novo projeto">
      <div className="mb-6 grid grid-cols-4 gap-4">
        <Stat label="Em andamento" value="12" />
        <Stat label="Aguardando material" value="4" />
        <Stat label="Concluídos no mês" value="9" />
        <Stat label="Receita prevista" value="R$ 184 mil" />
      </div>
      <Table
        cols={['Projeto', 'Cliente', 'Sistema', 'Etapa', 'Prazo']}
        rows={[
          ['Telhado residencial – Rua das Acácias', 'Marina Costa', 'Skye Campinas', <Tag>Em execução</Tag>, '18/11'],
          ['Troca de telhas – Galpão Norte', 'Logística Prado', 'Skye São Paulo', <Tag>Aguardando material</Tag>, '25/11'],
          ['Reforma de cobertura – Condomínio Vista', 'Condomínio Vista', 'Skye Curitiba', <Tag>Vistoria</Tag>, '02/12'],
          ['Impermeabilização – Padaria Central', 'Paulo Menezes', 'Skye Campinas', <Tag>Concluído</Tag>, '30/10'],
        ]}
      />
    </Shell>
  );
}
