import { Button, Table as DSTable, MetricCard, Tag as DSTag, Badge } from 'skyevantage-design-system';
import { t, useLang } from '../i18n.js';
import { DSScope } from '../ds.jsx';
import { Sidebar } from './Sidebar.jsx';

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
      <Sidebar active={active} go={go} />
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
