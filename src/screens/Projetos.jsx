import { Shell, Table, Status, Stat } from '../components/Shell.jsx';
export function Projetos({ go }) {
  return (
    <Shell active="projetos" go={go} title="Projetos" action="Novo projeto">
      <div className="mb-[var(--space-24)] grid grid-cols-4 gap-[var(--space-16)]">
        <Stat label="Em andamento" value="12" />
        <Stat label="Aguardando material" value="4" />
        <Stat label="Concluídos no mês" value="9" />
        <Stat label="Receita prevista" value="R$ 184 mil" />
      </div>
      <Table
        cols={['Projeto', 'Cliente', 'Sistema', 'Etapa', 'Prazo']}
        rows={[
          ['Telhado residencial – Rua das Acácias', 'Marina Costa', 'Skye Campinas', <Status>Em execução</Status>, '18/11'],
          ['Troca de telhas – Galpão Norte', 'Logística Prado', 'Skye São Paulo', <Status>Aguardando material</Status>, '25/11'],
          ['Reforma de cobertura – Condomínio Vista', 'Condomínio Vista', 'Skye Curitiba', <Status>Vistoria</Status>, '02/12'],
          ['Impermeabilização – Padaria Central', 'Paulo Menezes', 'Skye Campinas', <Status>Concluído</Status>, '30/10'],
        ]}
      />
    </Shell>
  );
}
