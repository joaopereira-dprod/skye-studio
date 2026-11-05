import { Shell, Table, Tag } from '../components/Shell.jsx';
export function Leads({ go }) {
  return (
    <Shell active="leads" go={go} title="Leads e clientes" action="Novo lead">
      <div className="mb-4 flex gap-2">
        <input className="h-10 w-80 rounded border border-neutral-300 bg-white px-3 text-sm" placeholder="Buscar por nome ou telefone" />
        <button className="h-10 rounded border border-neutral-300 bg-white px-4 text-sm">Todos os status</button>
      </div>
      <Table
        cols={['Nome', 'Contato', 'Origem', 'Status', 'Sistema']}
        rows={[
          ['Marina Costa', '(19) 98888-1020', 'Indicação', <Tag>Cliente</Tag>, 'Skye Campinas'],
          ['Roberto Alves', '(11) 97777-3344', 'Site', <Tag>Novo lead</Tag>, 'Skye São Paulo'],
          ['Logística Prado', '(11) 3222-5500', 'Google Ads', <Tag>Orçamento enviado</Tag>, 'Skye São Paulo'],
          ['Ana Beatriz Lopes', '(41) 99999-0071', 'Instagram', <Tag>Visita agendada</Tag>, 'Skye Curitiba'],
        ]}
      />
      <button onClick={() => go('orcamentos')} className="mt-4 text-sm underline">Ver orçamentos deste lead</button>
    </Shell>
  );
}
