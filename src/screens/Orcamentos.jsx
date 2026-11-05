import { t, useLang } from '../i18n.js';
import { Shell, Table, Tag } from '../components/Shell.jsx';
export function Orcamentos({ go }) {
  useLang();
  return (
    <Shell active="orcamentos" go={go} title="Orçamentos" action="Novo orçamento">
      <Table
        cols={['Nº', 'Cliente', 'Área', 'Valor', 'Status']}
        rows={[
          ['#1042', 'Logística Prado', '620 m²', 'R$ 86.400', <Tag>Enviado</Tag>],
          ['#1041', 'Marina Costa', '140 m²', 'R$ 24.900', <Tag>Aprovado</Tag>],
          ['#1040', 'Condomínio Vista', '380 m²', 'R$ 51.200', <Tag>Em análise</Tag>],
          ['#1039', 'Paulo Menezes', '95 m²', 'R$ 11.750', <Tag>Recusado</Tag>],
        ]}
      />
      <button onClick={() => go('projetos')} className="mt-4 text-sm underline">{t('Ver projetos dos orçamentos aprovados')}</button>
    </Shell>
  );
}
