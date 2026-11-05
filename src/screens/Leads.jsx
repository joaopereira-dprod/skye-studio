import { t, useLang } from '../i18n.js';
import { Input, Button } from 'skyevantage-design-system';
import { Shell, Table, Status } from '../components/Shell.jsx';
export function Leads({ go }) {
  useLang();
  return (
    <Shell active="leads" go={go} title="Leads e clientes" action="Novo lead">
      <div className="mb-[var(--space-16)] flex items-end gap-[var(--space-8)]">
        <Input className="w-80" iconLeft="search" placeholder={t('Buscar por nome ou telefone')} aria-label={t('Buscar por nome ou telefone')} />
        <Button variant="ghost" iconRight="chevron-down">{t('Todos os status')}</Button>
      </div>
      <Table
        cols={['Nome', 'Contato', 'Origem', 'Status', 'Sistema']}
        rows={[
          ['Marina Costa', '(19) 98888-1020', 'Indicação', <Status>Cliente</Status>, 'Skye Campinas'],
          ['Roberto Alves', '(11) 97777-3344', 'Site', <Status>Novo lead</Status>, 'Skye São Paulo'],
          ['Logística Prado', '(11) 3222-5500', 'Google Ads', <Status>Orçamento enviado</Status>, 'Skye São Paulo'],
          ['Ana Beatriz Lopes', '(41) 99999-0071', 'Instagram', <Status>Visita agendada</Status>, 'Skye Curitiba'],
        ]}
      />
      <Button variant="link" className="mt-[var(--space-16)] !text-[color:var(--text-link-hover)]" onClick={() => go('orcamentos')}>{t('Ver orçamentos deste lead')}</Button>
    </Shell>
  );
}
