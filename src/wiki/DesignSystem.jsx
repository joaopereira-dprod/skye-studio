import { useState } from 'react';
import {
  DSStyles, primitives, semantic, space, radius, textStyles, shadows, Icon,
  Button, IconButton, Input, Select, Textarea, Checkbox, Radio, RadioCard, Tag, Badge, FilterTag,
  Banner, Toast, BoxedTabs, SegmentedControl, DropdownMenu, MetricCard, Table, IconLabelCell, KeyValueTable,
  Pagination, Modal, Breadcrumb,
} from 'skyevantage-design-system';
import { t, useLang } from '../i18n.js';

const ICONS = ['check', 'minus', 'plus', 'x', 'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right', 'chevrons-up-down', 'pencil',
  'ellipsis-vertical', 'info', 'circle-check', 'circle-x', 'triangle-alert', 'search', 'calendar', 'loader', 'arrow-left', 'trash', 'copy'];

const copy = (v) => { try { navigator.clipboard.writeText(v); } catch { /* sem permissão de área de transferência */ } };
const resolve = (v) => primitives[v] || v;
const family = (k) => k.replace(/-\d+$/, '');
const FAMILIES = [...new Set(Object.keys(primitives).map(family))];

const H3 = ({ children }) => <h3 className="st-display-md" style={{ marginTop: 32 }}>{children}</h3>;
const Muted = ({ children }) => <p className="st-body-sm muted" style={{ maxWidth: '68ch' }}>{children}</p>;
// Os componentes do design system são só para tema claro: ficam num painel claro, também no tema escuro do Studio.
const Panel = ({ children, className = '' }) => (
  <div className={`sv rounded-[var(--radius-lg)] border border-[var(--border-subdued)] bg-[var(--bg-surface)] p-[var(--space-24)] text-[var(--text-primary)] ${className}`}>{children}</div>
);
const Row = ({ children }) => <div className="flex flex-wrap items-start gap-[var(--space-16)]">{children}</div>;

function Swatch({ name, value, token }) {
  return (
    <button type="button" onClick={() => copy(value)} title={`${t('Copiar')} ${value}`}
      className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--bg-surface)] p-0 text-left text-[var(--text-primary)]">
      <span className="h-14 border-b border-[var(--border-subdued)]" style={{ background: value }} />
      <span className="flex flex-col gap-[2px] p-[var(--space-8)]">
        <b className="t-label-md">{name}</b>
        <span className="t-caption-lg text-[var(--text-secondary)]">{token}</span>
        <span className="t-caption-lg">{value}</span>
      </span>
    </button>
  );
}

function Tokens() {
  return (
    <>
      <Muted>{t('Clique numa cor para copiar o valor. Os tokens viram variáveis CSS (por exemplo --bg-action-primary) quando o <DSStyles /> está montado.')}</Muted>
      <H3>{t('Cores primitivas')}</H3>
      {FAMILIES.map((f) => (
        <section key={f} className="flex flex-col gap-[var(--space-8)]">
          <h4 className="st-label-md muted">{f.toUpperCase()}</h4>
          <div className="grid gap-[var(--space-12)]" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(150px,1fr))' }}>
            {Object.entries(primitives).filter(([k]) => family(k) === f).map(([k, v]) => <Swatch key={k} name={k} value={v} token={`--${k}`} />)}
          </div>
        </section>
      ))}
      <H3>{t('Cores semânticas')}</H3>
      <Muted>{t('Papéis de cor usados pelos componentes. Cada um aponta para uma cor primitiva.')}</Muted>
      {['bg', 'text', 'border', 'icon'].map((g) => (
        <section key={g} className="flex flex-col gap-[var(--space-8)]">
          <h4 className="st-label-md muted">{g.toUpperCase()}</h4>
          <div className="grid gap-[var(--space-12)]" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))' }}>
            {Object.entries(semantic).filter(([k]) => k.startsWith(`${g}-`)).map(([k, v]) => (
              <Swatch key={k} name={k} value={resolve(v)} token={`--${k} → ${v}`} />
            ))}
          </div>
        </section>
      ))}
      <H3>{t('Espaçamento')}</H3>
      <Panel className="flex flex-col gap-[var(--space-8)]">
        {Object.entries(space).map(([k, v]) => (
          <div key={k} className="flex items-center gap-[var(--space-16)]">
            <span className="t-caption-lg w-24">--space-{k}</span>
            <i className="block h-3 rounded-[2px] bg-[var(--bg-action-primary)]" style={{ width: v }} />
            <span className="t-caption-lg text-[var(--text-secondary)]">{v}px</span>
          </div>
        ))}
      </Panel>
      <H3>{t('Raio de borda')}</H3>
      <Row>
        {Object.entries(radius).map(([k, v]) => (
          <Panel key={k} className="flex w-36 flex-col items-center gap-[var(--space-8)]">
            <div className="h-16 w-16 border-2 border-[var(--border-action-outline)] bg-[var(--bg-surface-subdued)]" style={{ borderRadius: Math.min(v, 32) }} />
            <span className="t-caption-lg">--radius-{k}</span>
            <span className="t-caption-lg text-[var(--text-secondary)]">{v >= 999 ? t('pílula') : `${v}px`}</span>
          </Panel>
        ))}
      </Row>
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
  );
}

function Styles() {
  const groups = ['display', 'title', 'body', 'label', 'caption'];
  return (
    <>
      <Muted>{t('Estilos de texto da família Inter. Cada um vira uma classe (por exemplo .t-title-lg).')}</Muted>
      {groups.map((g) => (
        <section key={g} className="flex flex-col gap-[var(--space-8)]">
          <h4 className="st-label-md muted">{g.toUpperCase()}</h4>
          <Panel className="flex flex-col gap-[var(--space-16)]">
            {Object.entries(textStyles).filter(([k]) => k.startsWith(`${g}-`)).map(([k, [size, line, weight, ls]]) => (
              <div key={k} className="flex flex-wrap items-baseline justify-between gap-[var(--space-16)] border-b border-[var(--border-subdued)] pb-[var(--space-12)] last:border-0 last:pb-0">
                <span className={`t-${k}`}>{t('Telhados que duram, com orçamento claro')}</span>
                <span className="t-caption-lg text-[var(--text-secondary)]">.t-{k} · Inter · {size}/{line} · {t('peso')} {weight}{ls ? ` · ${ls}` : ''}</span>
              </div>
            ))}
          </Panel>
        </section>
      ))}
    </>
  );
}

const Props = ({ rows }) => (
  <table className="t-body-sm mt-[var(--space-12)] w-full border-collapse text-left">
    <thead><tr className="text-[var(--text-secondary)]"><th className="py-1 pr-4 font-medium">Prop</th><th className="py-1 pr-4 font-medium">{t('Valores')}</th><th className="py-1 font-medium">{t('Padrão')}</th></tr></thead>
    <tbody>{rows.map(([p, v, d]) => (
      <tr key={p} className="border-t border-[var(--border-subdued)]"><td className="t-caption-lg py-1 pr-4">{p}</td><td className="py-1 pr-4">{v}</td><td className="t-caption-lg py-1">{d || '—'}</td></tr>
    ))}</tbody>
  </table>
);

function Spec({ name, desc, props, children }) {
  return (
    <section className="flex flex-col gap-[var(--space-8)]">
      <h4 className="st-label-md muted" style={{ textTransform: 'none' }}>{name}</h4>
      <Panel>
        <p className="t-body-sm mb-[var(--space-16)] text-[var(--text-secondary)]">{desc}</p>
        {children}
        {props && <Props rows={props} />}
      </Panel>
    </section>
  );
}

function Components() {
  const [tab, setTab] = useState('a');
  const [seg, setSeg] = useState('manual');
  const [card, setCard] = useState('report');
  const [chip, setChip] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Muted>{t('Todos os componentes do design system, com exemplos ao vivo. Importe de skyevantage-design-system.')}</Muted>
      <H3>{t('Ações')}</H3>
      <Spec name="Button" desc={t('Ação principal ou secundária. Tem estados de carregando e desabilitado.')}
        props={[['variant', 'primary | secondary | ghost | link | critical | success', 'primary'], ['size', 'sm | md | lg', 'md'], ['iconLeft / iconRight', 'icon name'], ['loading, disabled', 'boolean', 'false']]}>
        <Row>
          {['primary', 'secondary', 'ghost', 'link', 'critical', 'success'].map((v) => <Button key={v} variant={v} iconLeft="plus">{v}</Button>)}
          <Button disabled>Disabled</Button><Button loading>Loading</Button>
        </Row>
        <div className="mt-[var(--space-16)]"><Row><Button size="sm">Small</Button><Button size="md">Medium</Button><Button size="lg">Large</Button></Row></div>
      </Spec>
      <Spec name="IconButton" desc={t('Botão só com ícone. O label é obrigatório, para acessibilidade.')}
        props={[['icon', 'icon name'], ['label', 'string (obrigatório)'], ['variant', 'primary | secondary | ghost | …', 'secondary'], ['size', 'sm | md | lg', 'md']]}>
        <Row><IconButton icon="pencil" label="Edit" /><IconButton icon="ellipsis-vertical" label="More" variant="ghost" /><IconButton icon="trash" label="Delete" variant="critical" /></Row>
      </Spec>
      <H3>{t('Formulários')}</H3>
      <Spec name="Input · Select · Textarea" desc={t('Campos com rótulo, texto de ajuda, ícones, complementos (addons) e estado de erro.')}
        props={[['label, helper', 'string'], ['error', 'string | true'], ['size', 'sm | md | lg', 'md'], ['iconLeft / iconRight', 'icon name'], ['addonLeft / addonRight', 'string']]}>
        <Row>
          <div className="w-72"><Input label="Total Roof Area" addonRight="ft²" defaultValue="3000" helper="Round up" /></div>
          <div className="w-72"><Input label="Search" iconLeft="search" placeholder="Search leads" /></div>
          <div className="w-72"><Input label="Estimate Name" error="Estimate name is required" placeholder="Enter the name" /></div>
          <div className="w-72"><Select label="Roof Type"><option>Standard</option><option>Mansard</option></Select></div>
          <div className="w-72"><Textarea label="Notes" helper="0 / 800" /></div>
        </Row>
      </Spec>
      <Spec name="Checkbox · Radio · RadioCard" desc={t('Seleção simples. O Checkbox aceita estado indeterminado.')}>
        <Row>
          <Checkbox label="Checked" defaultChecked /><Checkbox label="Indeterminate" indeterminate /><Radio label="Radio" name="ds-r" defaultChecked />
        </Row>
        <div className="mt-[var(--space-16)]"><Row>
          <RadioCard title="Order a measurement report" description="Charges apply." checked={card === 'report'} value="report" onChange={setCard} />
          <RadioCard title="Enter measurements manually" description="Type the roof measurements yourself." checked={card === 'manual'} value="manual" onChange={setCard} />
        </Row></div>
      </Spec>
      <H3>{t('Status')}</H3>
      <Spec name="Tag · Badge · FilterTag" desc={t('Tag mostra o estado de um item; Badge é um selo neutro; FilterTag é o chip de filtro.')}
        props={[['Tag color', 'success | warning | info | error', 'info'], ['Tag styleType', 'subtle | solid', 'subtle'], ['Badge color', 'primary | neutral | disabled', 'neutral']]}>
        <Row>
          <Tag color="success">Completed</Tag><Tag color="warning">Awaiting</Tag><Tag color="info">Scheduled</Tag><Tag color="error">Cancelled</Tag>
          <Tag color="info" styleType="solid">Current</Tag><Badge color="primary">Primary</Badge><Badge>Neutral</Badge>
          <FilterTag applied={chip} onClick={() => setChip(!chip)} onRemove={() => setChip(false)}>Chimneys</FilterTag>
        </Row>
      </Spec>
      <H3>{t('Feedback')}</H3>
      <Spec name="Banner · Toast · Modal" desc={t('Banner fica na página; Toast flutua; Modal abre sobre a tela.')}
        props={[['color', 'success | warning | info | error', 'info'], ['Modal size', 'sm | md | lg', 'md']]}>
        <div className="flex flex-col gap-[var(--space-16)]">
          <Banner color="warning" title="1 required field left in 1 add-on">Exhaust Vent Type is required.</Banner>
          <Toast color="success" title="Estimate set as active" onDismiss={() => {}} />
          <div><Button variant="ghost" onClick={() => setOpen(true)}>Open modal</Button></div>
        </div>
        <Modal open={open} title="Delete estimate?" size="sm" onClose={() => setOpen(false)}
          footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button variant="critical" onClick={() => setOpen(false)}>Delete</Button></>}>
          This cannot be undone.
        </Modal>
      </Spec>
      <H3>{t('Navegação')}</H3>
      <Spec name="BoxedTabs · SegmentedControl · Breadcrumb · DropdownMenu" desc={t('Abas, alternador, trilha de navegação e menu de opções.')}>
        <div className="flex flex-col gap-[var(--space-16)]">
          <Breadcrumb items={[{ label: 'Home' }, { label: 'Estimator' }, { label: 'Create Estimate' }]} />
          <BoxedTabs tabs={[{ id: 'a', label: 'Roof Measurements' }, { id: 'b', label: 'Materials' }, { id: 'c', label: 'Labor' }]} value={tab} onChange={setTab} />
          <div><SegmentedControl options={[{ id: 'manual', label: 'Enter manually' }, { id: 'report', label: 'Order a report' }]} value={seg} onChange={setSeg} /></div>
          <div className="w-56"><DropdownMenu items={[{ id: 'edit', label: 'Edit' }, { id: 'copy', label: 'Make a copy' }, { id: 'del', label: 'Delete', critical: true }]} /></div>
        </div>
      </Spec>
      <H3>{t('Dados')}</H3>
      <Spec name="MetricCard · Table · KeyValueTable · Pagination" desc={t('Números de destaque, tabelas com colunas configuráveis, pares chave-valor e paginação.')}
        props={[['Table columns', '{ key, header, width?, sortable?, render?(row) }'], ['Table rows', 'array de objetos'], ['Table currentRow', '(row) => boolean']]}>
        <div className="flex flex-col gap-[var(--space-16)]">
          <div className="w-64"><MetricCard label="Total Cost" value="$450.00" /></div>
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
          <Pagination page={1} pageCount={1} />
          <KeyValueTable items={[{ label: 'Flat Fee', value: '$0.00', onEdit: () => {} }, { label: 'Labor', value: '$450.00', onEdit: () => {} }]} />
        </div>
      </Spec>
      <H3>{t('Ícones')}</H3>
      <Spec name="Icon" desc={t('Só contorno, nunca preenchido. Use <Icon name="…" size={16} />.')}>
        <div className="grid gap-[var(--space-12)]" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(110px,1fr))' }}>
          {ICONS.map((n) => (
            <div key={n} className="flex flex-col items-center gap-[var(--space-8)] rounded-[var(--radius-md)] border border-[var(--border-subdued)] p-[var(--space-12)]">
              <Icon name={n} size={24} /><span className="t-caption-lg text-[var(--text-secondary)]">{n}</span>
            </div>
          ))}
        </div>
      </Spec>
    </>
  );
}

const TABS = [['tokens', 'Tokens', Tokens], ['estilos', 'Estilos de texto', Styles], ['componentes', 'Componentes', Components]];

export function DesignSystemPage() {
  useLang();
  const [tab, setTab] = useState('tokens');
  const Cur = TABS.find(([id]) => id === tab)[2];
  return (
    <div className="doc">
      <DSStyles />
      <h2 className="st-headline-bold-40">{t('Design system')} · SkyeVantage</h2>
      <p>{t('Tokens, estilos de texto e componentes do SkyeVantage ERP, instalados do pacote skyevantage-design-system (v0.1.0).')}</p>
      <div className="sv"><BoxedTabs tabs={TABS.map(([id, label]) => ({ id, label: t(label) }))} value={tab} onChange={setTab} /></div>
      <Cur />
    </div>
  );
}
