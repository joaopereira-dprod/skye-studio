import { Button, Table as DSTable, MetricCard, Tag as DSTag, Badge } from 'skyevantage-design-system';
import { t, useLang } from '../i18n.js';
import { DSScope } from '../ds.jsx';

const NAV = [
  { id: 'projetos', label: 'Projetos' },
  { id: 'leads', label: 'Leads e clientes' },
  { id: 'sistemas', label: 'Sistemas' },
  { id: 'orcamentos', label: 'Orçamentos' },
  { id: 'usuarios', label: 'Usuários' },
];

// Cor da Tag do design system para cada status (a chave é o texto em português).
const STATUS_COLOR = {
  'Concluído': 'success', 'Aprovado': 'success', 'Ativa': 'success', 'Ativo': 'success', 'Cliente': 'success',
  'Aguardando material': 'warning', 'Em análise': 'warning', 'Visita agendada': 'warning', 'Em implantação': 'warning', 'Convite pendente': 'warning',
  'Em execução': 'info', 'Vistoria': 'info', 'Novo lead': 'info', 'Orçamento enviado': 'info', 'Enviado': 'info',
  'Recusado': 'error',
};

export function Status({ children }) {
  useLang();
  return <DSTag color={STATUS_COLOR[children] || 'info'}>{t(children)}</DSTag>;
}

export function Role({ children }) {
  useLang();
  return <Badge color="neutral">{t(children)}</Badge>;
}

export function Shell({ active, go, title, action, children }) {
  useLang();
  return (
    <div className="dsx flex h-full bg-[var(--bg-surface-secondary)] text-[color:var(--text-primary)]">
      <DSScope />
      <aside className="flex w-60 flex-col border-r border-[color:var(--border-subdued)] bg-[var(--bg-surface)] p-[var(--space-16)]">
        <div className="t-title-xs mb-[var(--space-24)] px-[var(--space-8)] text-[color:var(--text-brand)]">Skye Advantage</div>
        <nav className="flex flex-col gap-[var(--space-4)]">
          {NAV.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => go(n.id)}
              aria-current={active === n.id ? 'page' : undefined}
              className={`t-label-lg h-10 rounded-[var(--radius-md)] px-[var(--space-12)] text-left ${
                active === n.id
                  ? 'bg-[var(--bg-action-primary)] text-[color:var(--text-on-action)]'
                  : 'bg-transparent text-[color:var(--text-secondary)] hover:bg-[var(--bg-surface-subdued)]'
              }`}
            >
              {t(n.label)}
            </button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-[var(--space-32)]">
        <div className="mb-[var(--space-24)] flex items-center justify-between">
          <h1 className="t-title-lg">{t(title)}</h1>
          {action && <Button iconLeft="plus">{t(action)}</Button>}
        </div>
        {children}
      </main>
    </div>
  );
}

/** Tabela do design system. cols: títulos em português; rows: matrizes de texto ou elementos. */
export function Table({ cols, rows }) {
  useLang();
  const columns = cols.map((c, i) => ({
    key: String(i),
    header: t(c),
    render: (r) => (typeof r[i] === 'string' ? t(r[i]) : r[i]),
  }));
  return <DSTable columns={columns} rows={rows.map((r, i) => Object.assign([...r], { id: i }))} />;
}

export function Stat({ label, value }) {
  useLang();
  return <MetricCard label={t(label)} value={t(value)} />;
}
