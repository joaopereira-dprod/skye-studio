import { t, useLang } from '../i18n.js';
import { Button } from 'skyevantage-design-system';
import { Shell, Table, Status } from '../components/Shell.jsx';
export function Orcamentos({ go }) {
  useLang();
  return (
    <Shell active="orcamentos" go={go} title="Orçamentos" action="Novo orçamento">
      <Table
        cols={['Nº', 'Cliente', 'Área', 'Valor', 'Status']}
        rows={[
          ['#1042', 'Logística Prado', '620 m²', 'R$ 86.400', <Status>Enviado</Status>],
          ['#1041', 'Marina Costa', '140 m²', 'R$ 24.900', <Status>Aprovado</Status>],
          ['#1040', 'Condomínio Vista', '380 m²', 'R$ 51.200', <Status>Em análise</Status>],
          ['#1039', 'Paulo Menezes', '95 m²', 'R$ 11.750', <Status>Recusado</Status>],
        ]}
      />
      <Button variant="link" className="mt-[var(--space-16)]" onClick={() => go('projetos')}>{t('Ver projetos dos orçamentos aprovados')}</Button>
    </Shell>
  );
}
