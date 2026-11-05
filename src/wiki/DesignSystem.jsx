import { useState } from 'react';
import {
  primitives, semantic, space, radius, textStyles, shadows, Icon,
  Button, IconButton, Input, Select, Textarea, Checkbox, Radio, RadioCard, Tag, Badge, FilterTag,
  Banner, Toast, BoxedTabs, SegmentedControl, DropdownMenu, MetricCard, Table, IconLabelCell, KeyValueTable,
  Pagination, Modal, Breadcrumb,
} from 'skyevantage-design-system';
import { t, useLang } from '../i18n.js';
import { DSScope } from '../ds.jsx';

const ICONS = ['check', 'minus', 'plus', 'x', 'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'chevrons-up-down', 'pencil',
  'ellipsis-vertical', 'info', 'circle-check', 'circle-x', 'triangle-alert', 'search', 'calendar', 'loader', 'arrow-left', 'trash', 'copy'];

const copy = (v) => { try { navigator.clipboard.writeText(v); } catch { /* sem permissão de área de transferência */ } };
const resolve = (v) => primitives[v] || v;
const family = (k) => k.replace(/-\d+$/, '');
const FAMILIES = [...new Set(Object.keys(primitives).map(family))];
const SEMANTIC_GROUPS = ['bg', 'text', 'border', 'icon'];
const STYLE_GROUPS = ['display', 'title', 'body', 'label', 'caption'];

const H3 = ({ children }) => <h3 className="st-display-md">{children}</h3>;
const Muted = ({ children }) => <p className="st-body-sm muted" style={{ maxWidth: '68ch' }}>{children}</p>;
// Os componentes do design system são só para tema claro: ficam num painel claro, também no tema escuro do Studio.
const Panel = ({ children, className = '' }) => (
  <div className={`sv rounded-[var(--radius-lg)] border border-[color:var(--border-subdued)] bg-[var(--bg-surface)] p-[var(--space-24)] text-[color:var(--text-primary)] ${className}`}>{children}</div>
);
const Group = ({ label, children }) => (
  <div className="mb-[var(--space-24)] flex flex-col gap-[var(--space-8)] last:mb-0">
    <span className="t-label-sm text-[color:var(--text-secondary)]">{label}</span>
    <div className="flex flex-wrap items-center gap-[var(--space-16)]">{children}</div>
  </div>
);
const Row = ({ children }) => <div className="flex flex-wrap items-start gap-[var(--space-16)]">{children}</div>;

/** Abas sem fundo: texto na cor do Studio, só a selecionada tem contorno e negrito. */
function TabBar({ tabs, value, onChange }) {
  return (
    <div role="tablist" className="flex flex-wrap gap-[var(--space-8)]">
      {tabs.map(({ id, label }) => {
        const on = value === id;
        return (
          <button key={id} type="button" role="tab" aria-selected={on} onClick={() => onChange(id)}
            className={`h-10 rounded-full border bg-transparent px-[var(--space-16)] text-sm text-[color:var(--c-text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              on ? 'border-[color:var(--c-border-focus)] font-bold' : 'border-transparent font-normal hover:border-[color:var(--c-border-strong)]'}`}>
            {/* o rótulo em negrito reserva a largura, para as abas não pularem ao selecionar */}
            <span className="grid"><span className="col-start-1 row-start-1">{label}</span><span aria-hidden="true" className="invisible col-start-1 row-start-1 font-bold">{label}</span></span>
          </button>
        );
      })}
    </div>
  );
}

/** Filtros: nenhum marcado mostra tudo; marcados mostram só os escolhidos. */
function FilterBar({ groups, selected, onToggle, onClear }) {
  return (
    <div className="flex flex-col gap-[var(--space-12)]" role="group" aria-label={t('Filtros')}>
      {groups.map((g) => (
        <div key={g.label} className="flex flex-col gap-[var(--space-8)]">
          <span className="st-label-md muted">{g.label.toUpperCase()}</span>
          <div className="sv flex flex-wrap gap-[var(--space-8)]">
            {g.items.map(({ id, label }) => (
              <FilterTag key={id} applied={selected.has(id)} onClick={() => onToggle(id)} onRemove={() => onToggle(id)}>{label}</FilterTag>
            ))}
          </div>
        </div>
      ))}
      {selected.size > 0 && (
        <div className="sv self-start"><Button variant="link" size="sm" onClick={onClear} className="!text-[color:var(--text-link-hover)]">{t('Limpar filtros')}</Button></div>
      )}
    </div>
  );
}

function Swatch({ name, value, token }) {
  return (
    <button type="button" onClick={() => copy(value)} title={`${t('Copiar')} ${value}`}
      className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border-default)] bg-[var(--bg-surface)] p-0 text-left text-[color:var(--text-primary)]">
      <span className="h-14 border-b border-[color:var(--border-subdued)]" style={{ background: value }} />
      <span className="flex flex-col gap-[2px] p-[var(--space-8)]">
        <b className="t-label-md">{name}</b>
        <span className="t-caption-lg text-[color:var(--text-secondary)]">{token}</span>
        <span className="t-caption-lg">{value}</span>
      </span>
    </button>
  );
}

/* ---------------- Tokens ---------------- */
const TOKEN_FILTERS = [
  { label: t('Cores primitivas'), items: FAMILIES.map((f) => ({ id: `p-${f}`, label: f })) },
  { label: t('Cores semânticas'), items: SEMANTIC_GROUPS.map((g) => ({ id: `s-${g}`, label: g })) },
  { label: t('Escalas'), items: [{ id: 'x-space', label: 'Espaçamento' }, { id: 'x-radius', label: 'Raio de borda' }, { id: 'x-shadow', label: 'Sombras' }] },
];

function Tokens({ show }) {
  const fams = FAMILIES.filter((f) => show(`p-${f}`));
  const sems = SEMANTIC_GROUPS.filter((g) => show(`s-${g}`));
  return (
    <>
      <Muted>{t('Clique numa cor para copiar o valor. Os tokens viram variáveis CSS (por exemplo --bg-action-primary) quando o <DSStyles /> está montado.')}</Muted>
      {fams.length > 0 && <H3>{t('Cores primitivas')}</H3>}
      {fams.map((f) => (
        <section key={f} className="flex flex-col gap-[var(--space-8)]">
          <h4 className="st-label-md muted">{f.toUpperCase()}</h4>
          <div className="grid gap-[var(--space-12)]" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))' }}>
            {Object.entries(primitives).filter(([k]) => family(k) === f).map(([k, v]) => <Swatch key={k} name={k} value={v} token={`--${k}`} />)}
          </div>
        </section>
      ))}
      {sems.length > 0 && <H3>{t('Cores semânticas')}</H3>}
      {sems.length > 0 && <Muted>{t('Papéis de cor usados pelos componentes. Cada um aponta para uma cor primitiva.')}</Muted>}
      {sems.map((g) => (
        <section key={g} className="flex flex-col gap-[var(--space-8)]">
          <h4 className="st-label-md muted">{g.toUpperCase()}</h4>
          <div className="grid gap-[var(--space-12)]" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))' }}>
            {Object.entries(semantic).filter(([k]) => k.startsWith(`${g}-`)).map(([k, v]) => (
              <Swatch key={k} name={k} value={resolve(v)} token={`--${k} → ${v}`} />
            ))}
          </div>
        </section>
      ))}
      {show('x-space') && (
        <>
          <H3>{t('Espaçamento')}</H3>
          <Panel className="flex flex-col gap-[var(--space-8)]">
            {Object.entries(space).map(([k, v]) => (
              <div key={k} className="flex items-center gap-[var(--space-16)]">
                <span className="t-caption-lg w-24">--space-{k}</span>
                <i className="block h-3 rounded-[2px] bg-[var(--bg-action-primary)]" style={{ width: v }} />
                <span className="t-caption-lg text-[color:var(--text-secondary)]">{v}px</span>
              </div>
            ))}
          </Panel>
        </>
      )}
      {show('x-radius') && (
        <>
          <H3>{t('Raio de borda')}</H3>
          <Row>
            {Object.entries(radius).map(([k, v]) => (
              <Panel key={k} className="flex w-36 flex-col items-center gap-[var(--space-8)]">
                <div className="h-16 w-16 border-2 border-[color:var(--border-action-outline)] bg-[var(--bg-surface-subdued)]" style={{ borderRadius: Math.min(v, 32) }} />
                <span className="t-caption-lg">--radius-{k}</span>
                <span className="t-caption-lg text-[color:var(--text-secondary)]">{v >= 999 ? t('pílula') : `${v}px`}</span>
              </Panel>
            ))}
          </Row>
        </>
      )}
      {show('x-shadow') && (
        <>
          <H3>{t('Sombras')}</H3>
          <Row>
            {Object.entries(shadows).map(([k, v]) => (
              <Panel key={k} className="flex w-44 flex-col items-center gap-[var(--space-8)]">
                <div className="h-16 w-24 rounded-[var(--radius-md)] bg-[var(--bg-surface)]" style={{ boxShadow: v }} />
                <span className="t-caption-lg">--shadow-{k}</span>
              </Panel>
            ))}
          </Row>
        </>
      )}
    </>
  );
}

/* ---------------- Estilos de texto ---------------- */
const STYLE_FILTERS = [{ label: t('Grupos'), items: STYLE_GROUPS.map((g) => ({ id: g, label: g })) }];

function Styles({ show }) {
  return (
    <>
      <Muted>{t('Estilos de texto da família Inter. Cada um vira uma classe (por exemplo .t-title-lg).')}</Muted>
      {STYLE_GROUPS.filter(show).map((g) => (
        <section key={g} className="flex flex-col gap-[var(--space-8)]">
          <h4 className="st-label-md muted">{g.toUpperCase()}</h4>
          <Panel className="flex flex-col gap-[var(--space-16)]">
            {Object.entries(textStyles).filter(([k]) => k.startsWith(`${g}-`)).map(([k, [size, line, weight, ls]]) => (
              <div key={k} className="flex flex-wrap items-baseline justify-between gap-[var(--space-16)] border-b border-[color:var(--border-subdued)] pb-[var(--space-12)] last:border-0 last:pb-0">
                <span className={`t-${k}`}>{t('Telhados que duram, com orçamento claro')}</span>
                <span className="t-caption-lg text-[color:var(--text-secondary)]">.t-{k} · Inter · {size}/{line} · {t('peso')} {weight}{ls ? ` · ${ls}` : ''}</span>
              </div>
            ))}
          </Panel>
        </section>
      ))}
    </>
  );
}

/* ---------------- Componentes ---------------- */
const Props = ({ rows }) => (
  <table className="t-body-sm mt-[var(--space-24)] w-full border-collapse text-left text-[color:var(--text-primary)]">
    <thead><tr className="text-[color:var(--text-secondary)]"><th className="py-2 pr-4 font-medium">Prop</th><th className="py-2 pr-4 font-medium">{t('Valores')}</th><th className="py-2 font-medium">{t('Padrão')}</th></tr></thead>
    <tbody>{rows.map(([p, v, d]) => (
      <tr key={p} className="border-t border-[color:var(--border-subdued)]"><td className="t-caption-lg py-2 pr-4">{p}</td><td className="py-2 pr-4">{v}</td><td className="t-caption-lg py-2">{d || '—'}</td></tr>
    ))}</tbody>
  </table>
);

function Spec({ name, desc, props, children }) {
  return (
    <section className="flex flex-col gap-[var(--space-8)]">
      <h4 className="st-label-md muted" style={{ textTransform: 'none' }}>{name}</h4>
      <Panel>
        <div className="t-body-sm mb-[var(--space-24)] max-w-[68ch] text-[color:var(--text-secondary)]">{desc}</div>
        {children}
        {props && <Props rows={props} />}
      </Panel>
    </section>
  );
}

const GROUPS = {
  acoes: ['Button', 'IconButton'],
  forms: ['Input', 'Select', 'Textarea', 'Checkbox', 'Radio', 'RadioCard'],
  status: ['Tag', 'Badge', 'FilterTag'],
  feedback: ['Banner', 'Toast', 'Modal'],
  nav: ['BoxedTabs', 'SegmentedControl', 'Breadcrumb', 'DropdownMenu'],
  dados: ['MetricCard', 'Table', 'KeyValueTable', 'Pagination'],
  icones: ['Icon'],
};
const GROUP_LABEL = { acoes: 'Ações', forms: 'Formulários', status: 'Status', feedback: 'Feedback', nav: 'Navegação', dados: 'Dados', icones: 'Ícones' };
const COMPONENT_FILTERS = [{ label: t('Componentes'), items: Object.values(GROUPS).flat().map((n) => ({ id: n, label: n })) }];

function Components({ show }) {
  const [tab, setTab] = useState('a');
  const [seg, setSeg] = useState('manual');
  const [card, setCard] = useState('report');
  const [chip, setChip] = useState(true);
  const [open, setOpen] = useState(false);
  const w72 = 'w-72';
  const items = {
    Button: () => (
      <Spec name="Button" desc={t('Ação principal ou secundária. Tem estados de carregando e desabilitado.')}
        props={[['variant', 'primary | secondary | ghost | link | critical | success', 'primary'], ['size', 'sm | md | lg', 'md'], ['iconLeft / iconRight', 'icon name'], ['loading, disabled', 'boolean', 'false']]}>
        <Group label={t('Variantes')}>{['primary', 'secondary', 'ghost', 'link', 'critical', 'success'].map((v) => <Button key={v} variant={v} iconLeft="plus">{v}</Button>)}</Group>
        <Group label={t('Estados')}><Button>Default</Button><Button disabled>Disabled</Button><Button loading>Loading</Button></Group>
        <Group label={t('Tamanhos')}><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button></Group>
      </Spec>),
    IconButton: () => (
      <Spec name="IconButton" desc={t('Botão só com ícone. O label é obrigatório, para acessibilidade.')}
        props={[['icon', 'icon name'], ['label', 'string (obrigatório)'], ['variant', 'primary | secondary | ghost | …', 'secondary'], ['size', 'sm | md | lg', 'md']]}>
        <Row><IconButton icon="pencil" label="Edit" /><IconButton icon="ellipsis-vertical" label="More" variant="ghost" /><IconButton icon="trash" label="Delete" variant="critical" /></Row>
      </Spec>),
    Input: () => (
      <Spec name="Input" desc={t('Campo de texto com rótulo, texto de ajuda, ícones, complementos (addons) e estado de erro.')}
        props={[['label, helper', 'string'], ['error', 'string | true'], ['size', 'sm | md | lg', 'md'], ['iconLeft / iconRight', 'icon name'], ['addonLeft / addonRight', 'string']]}>
        <Row>
          <div className={w72}><Input label="Total Roof Area" addonRight="ft²" defaultValue="3000" helper="Round up" /></div>
          <div className={w72}><Input label="Search" iconLeft="search" placeholder="Search leads" /></div>
          <div className={w72}><Input label="Estimate Name" error="Estimate name is required" placeholder="Enter the name" /></div>
        </Row>
      </Spec>),
    Select: () => (
      <Spec name="Select" desc={t('Lista de opções nativa, com rótulo e estado de erro.')}
        props={[['label, helper, error', 'string'], ['size', 'sm | md | lg', 'md'], ['placeholder', 'string', 'Select an option']]}>
        <div className={w72}><Select label="Roof Type"><option>Standard</option><option>Mansard</option></Select></div>
      </Spec>),
    Textarea: () => (
      <Spec name="Textarea" desc={t('Campo de texto de várias linhas, com rótulo e texto de ajuda.')} props={[['label, helper, error', 'string']]}>
        <div className={w72}><Textarea label="Notes" helper="0 / 800" /></div>
      </Spec>),
    Checkbox: () => (
      <Spec name="Checkbox" desc={t('Seleção simples. Aceita estado indeterminado.')} props={[['label', 'string'], ['indeterminate', 'boolean', 'false']]}>
        <Row><Checkbox label="Checked" defaultChecked /><Checkbox label="Indeterminate" indeterminate /><Checkbox label="Unchecked" /></Row>
      </Spec>),
    Radio: () => (
      <Spec name="Radio" desc={t('Escolha de uma opção dentro de um grupo.')} props={[['label', 'string'], ['name', 'string (agrupa os radios)']]}>
        <Row><Radio label="Option A" name="ds-r" defaultChecked /><Radio label="Option B" name="ds-r" /></Row>
      </Spec>),
    RadioCard: () => (
      <Spec name="RadioCard" desc={t('Escolha de uma opção em formato de cartão, com título e descrição.')} props={[['title, description', 'string'], ['checked', 'boolean'], ['onChange', '(value) => void']]}>
        <Row>
          <RadioCard title="Order a measurement report" description="Charges apply." checked={card === 'report'} value="report" onChange={setCard} />
          <RadioCard title="Enter measurements manually" description="Type the roof measurements yourself." checked={card === 'manual'} value="manual" onChange={setCard} />
        </Row>
      </Spec>),
    Tag: () => (
      <Spec name="Tag" desc={t('Mostra o estado de um item.')} props={[['color', 'success | warning | info | error', 'info'], ['styleType', 'subtle | solid', 'subtle']]}>
        <Row><Tag color="success">Completed</Tag><Tag color="warning">Awaiting</Tag><Tag color="info">Scheduled</Tag><Tag color="error">Cancelled</Tag><Tag color="info" styleType="solid">Current</Tag></Row>
      </Spec>),
    Badge: () => (
      <Spec name="Badge" desc={t('Selo curto, sem estado associado.')} props={[['color', 'primary | neutral | disabled', 'neutral']]}>
        <Row><Badge color="primary">Primary</Badge><Badge>Neutral</Badge><Badge color="disabled">Disabled</Badge></Row>
      </Spec>),
    FilterTag: () => (
      <Spec name="FilterTag" desc={t('Chip de filtro. Aplicado, mostra o botão de remover.')} props={[['applied', 'boolean', 'false'], ['onRemove', '() => void']]}>
        <Row><FilterTag applied={chip} onClick={() => setChip(!chip)} onRemove={() => setChip(false)}>Chimneys</FilterTag><FilterTag>Skylights</FilterTag></Row>
      </Spec>),
    Banner: () => (
      <Spec name="Banner" desc={t('Aviso dentro da página, em largura total.')} props={[['color', 'success | warning | info | error', 'info'], ['title', 'string']]}>
        <Banner color="warning" title="1 required field left in 1 add-on">Exhaust Vent Type is required.</Banner>
      </Spec>),
    Toast: () => (
      <Spec name="Toast" desc={t('Aviso flutuante, com botão de fechar.')} props={[['color', 'success | warning | info | error', 'info'], ['onDismiss', '() => void']]}>
        <Toast color="success" title="Estimate set as active" onDismiss={() => {}} />
      </Spec>),
    Modal: () => (
      <Spec name="Modal" desc={t('Janela que abre sobre a tela, com cabeçalho, corpo e rodapé.')} props={[['size', 'sm | md | lg', 'md'], ['open, onClose', 'boolean, () => void'], ['footer', 'node']]}>
        <Button variant="ghost" onClick={() => setOpen(true)}>Open modal</Button>
        <Modal open={open} title="Delete estimate?" size="sm" onClose={() => setOpen(false)}
          footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button variant="critical" onClick={() => setOpen(false)}>Delete</Button></>}>
          This cannot be undone.
        </Modal>
      </Spec>),
    BoxedTabs: () => (
      <Spec name="BoxedTabs" desc={t('Abas em caixa, para trocar de seção.')} props={[['tabs', '{ id, label }[]'], ['value, onChange', 'id, (id) => void']]}>
        <BoxedTabs tabs={[{ id: 'a', label: 'Roof Measurements' }, { id: 'b', label: 'Materials' }, { id: 'c', label: 'Labor' }]} value={tab} onChange={setTab} />
      </Spec>),
    SegmentedControl: () => (
      <Spec name="SegmentedControl" desc={t('Alternador entre poucas opções.')} props={[['options', '{ id, label }[]'], ['value, onChange', 'id, (id) => void']]}>
        <SegmentedControl options={[{ id: 'manual', label: 'Enter manually' }, { id: 'report', label: 'Order a report' }]} value={seg} onChange={setSeg} />
      </Spec>),
    Breadcrumb: () => (
      <Spec name="Breadcrumb" desc={t('Trilha de navegação. O último item é a página atual.')} props={[['items', '{ label, href? }[]']]}>
        <Breadcrumb items={[{ label: 'Home' }, { label: 'Estimator' }, { label: 'Create Estimate' }]} />
      </Spec>),
    DropdownMenu: () => (
      <Spec name="DropdownMenu" desc={t('Menu de opções ou de ações.')} props={[['items', '{ id, label, selected?, critical? }[]'], ['onSelect', '(id) => void']]}>
        <div className="w-56"><DropdownMenu items={[{ id: 'edit', label: 'Edit' }, { id: 'copy', label: 'Make a copy' }, { id: 'del', label: 'Delete', critical: true }]} /></div>
      </Spec>),
    MetricCard: () => (
      <Spec name="MetricCard" desc={t('Número de destaque, com rótulo.')} props={[['label, value', 'string']]}>
        <div className="w-64"><MetricCard label="Total Cost" value="$450.00" /></div>
      </Spec>),
    Table: () => (
      <Spec name="Table" desc={t('Tabela com colunas configuráveis.')} props={[['columns', '{ key, header, width?, sortable?, render?(row) }[]'], ['rows', 'array de objetos'], ['currentRow', '(row) => boolean']]}>
        <Table
          columns={[
            { key: 'name', header: 'Estimate Name', sortable: true, render: (r) => <span className="sv-cell">{r.name}{r.current && <Tag color="info" showIcon={false}>Current</Tag>}</span> },
            { key: 'by', header: 'Created By', sortable: true },
            { key: 'b', header: 'Option B', sortable: true },
            { key: 'p', header: 'Provider', render: () => <IconLabelCell icon="calendar">Zoom</IconLabelCell> },
            { key: 'm', header: '', align: 'right', render: () => <IconButton icon="ellipsis-vertical" label="Row menu" variant="ghost" size="sm" /> },
          ]}
          rows={[{ id: 1, name: 'Design Ref - Standard', current: true, by: 'joao@popstand.com', b: '$450.00' }, { id: 2, name: 'Design Ref - Standard', by: 'joao@popstand.com', b: '$430.00' }]}
          currentRow={(r) => r.current}
        />
      </Spec>),
    KeyValueTable: () => (
      <Spec name="KeyValueTable" desc={t('Pares de rótulo e valor, com botão de editar opcional.')} props={[['items', '{ label, value, onEdit? }[]']]}>
        <KeyValueTable items={[{ label: 'Flat Fee', value: '$0.00', onEdit: () => {} }, { label: 'Labor', value: '$450.00', onEdit: () => {} }]} />
      </Spec>),
    Pagination: () => (
      <Spec name="Pagination" desc={t('Navegação entre páginas, com linhas por página.')} props={[['page, pageCount', 'number'], ['rowsPerPage', 'number', '10'], ['onPage, onRowsPerPage', 'function']]}>
        <Pagination page={1} pageCount={3} />
      </Spec>),
    Icon: () => (
      <Spec name="Icon" desc={t('Só contorno, nunca preenchido. Use <Icon name="…" size={16} />.')} props={[['name', 'icon name'], ['size', 'number', '16']]}>
        <div className="grid gap-[var(--space-12)]" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(110px,1fr))' }}>
          {ICONS.map((n) => (
            <div key={n} className="flex flex-col items-center gap-[var(--space-8)] rounded-[var(--radius-md)] border border-[color:var(--border-subdued)] p-[var(--space-12)]">
              <Icon name={n} size={24} /><span className="t-caption-lg text-[color:var(--text-secondary)]">{n}</span>
            </div>
          ))}
        </div>
      </Spec>),
  };
  return (
    <>
      <Muted>{t('Todos os componentes do design system, com exemplos ao vivo. Importe de skyevantage-design-system.')}</Muted>
      {Object.entries(GROUPS).map(([g, names]) => {
        const visible = names.filter(show);
        if (!visible.length) return null;
        return (
          <section key={g} className="flex flex-col gap-[var(--space-16)]">
            <H3>{t(GROUP_LABEL[g])}</H3>
            {visible.map((n) => <div key={n}>{items[n]()}</div>)}
          </section>
        );
      })}
    </>
  );
}

const TABS = [
  ['tokens', 'Tokens', Tokens, TOKEN_FILTERS],
  ['estilos', 'Estilos de texto', Styles, STYLE_FILTERS],
  ['componentes', 'Componentes', Components, COMPONENT_FILTERS],
];

export function DesignSystemPage() {
  useLang();
  const [tab, setTab] = useState('tokens');
  const [sel, setSel] = useState({ tokens: new Set(), estilos: new Set(), componentes: new Set() });
  const [, , Cur, filters] = TABS.find(([id]) => id === tab);
  const selected = sel[tab];
  const toggle = (id) => setSel((s) => { const n = new Set(s[tab]); if (!n.delete(id)) n.add(id); return { ...s, [tab]: n }; });
  const clear = () => setSel((s) => ({ ...s, [tab]: new Set() }));
  // as abas ficam sem rótulos de grupo traduzidos em tempo de módulo: os rótulos dos filtros passam por t() aqui
  const groups = filters.map((g) => ({ ...g, label: t(g.label), items: g.items.map((i) => ({ ...i, label: t(i.label) })) }));
  const show = (id) => selected.size === 0 || selected.has(id);
  return (
    <div className="doc dsx">
      <DSScope />
      <h2 className="st-headline-bold-40">{t('Design system')} · SkyeVantage</h2>
      <p>{t('Tokens, estilos de texto e componentes do SkyeVantage ERP, instalados do pacote skyevantage-design-system (v0.1.0).')}</p>
      <TabBar tabs={TABS.map(([id, label]) => ({ id, label: t(label) }))} value={tab} onChange={setTab} />
      <FilterBar groups={groups} selected={selected} onToggle={toggle} onClear={clear} />
      <Cur show={show} />
    </div>
  );
}
