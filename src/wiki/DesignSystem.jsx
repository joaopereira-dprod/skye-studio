import { useState } from 'react';
import { primitives, semantic, space, radius, textStyles, shadows } from 'skyevantage-design-system';
import { t, lang, useLang } from '../i18n.js';
import { DSScope } from '../ds.jsx';
import { DOCS, CATEGORIES } from './ds-docs.jsx';
import { SCREENS } from '../screens/index.jsx';

const FIGMA = 'https://www.figma.com/design/SPElEKzaDCu32XXersJofk/SkyeVantage-ERP---v2';
const tx = (o) => (typeof o === 'string' ? t(o) : o[lang()]); // texto já bilíngue ({ pt, en }) ou chave do dicionário
const copy = (v) => { try { navigator.clipboard.writeText(v); } catch { /* sem permissão de área de transferência */ } };
const resolve = (v) => primitives[v] || v;
const family = (k) => k.replace(/-\d+$/, '');
const FAMILIES = [...new Set(Object.keys(primitives).map(family))];
const SEMANTIC_GROUPS = ['bg', 'text', 'border', 'icon'];
const STYLE_GROUPS = ['display', 'title', 'body', 'label', 'caption'];

/** Abas como no Figma (BoxedTabGroup): a atual tem caixa e cor de link; as outras só a linha de baixo. */
function TabBar({ tabs, value, onChange }) {
  return (
    <div role="tablist" className="flex border-b border-[color:var(--c-border-default)]">
      {tabs.map(({ id, label }) => {
        const on = value === id;
        return (
          <button key={id} type="button" role="tab" aria-selected={on} onClick={() => onChange(id)}
            className={`-mb-px flex items-center justify-center px-4 py-[10px] text-[16px] font-medium leading-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] ${
              on ? 'rounded-t-lg border border-b-0 border-solid border-[#e4e6e7] bg-white text-[#9a6e13]'
                : 'border-b border-transparent bg-transparent text-[color:var(--c-text-primary)] hover:text-[color:var(--c-text-secondary)]'}`}>
            {label}
          </button>
        );
      })}
    </div>
  );
}

/** Filtros de uma escolha: um marcado por vez, sem ícone. Usa o estilo do FilterTag do design system. */
function FilterBar({ groups, value, onPick }) {
  return (
    <div className="flex flex-col gap-4" role="group" aria-label={t('Filtros')}>
      {groups.map((g) => (
        <div key={g.label} className="flex flex-col gap-2">
          <span className="st-label-md muted">{g.label.toUpperCase()}</span>
          <div className="flex flex-wrap gap-2">
            {g.items.map(({ id, label }) => (
              <button key={id} type="button" aria-pressed={value === id} onClick={() => onPick(id)} className="sv sv-filtertag">{label}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const Header = ({ kicker, title, children }) => (
  <header className="chead">
    <div className="row"><span className="st-label-md muted">{kicker}</span></div>
    <h2 className="st-headline-bold-40">{title}</h2>
    {children && <p className="st-body-md">{children}</p>}
  </header>
);

const Swatch = ({ name, value, token, note }) => (
  <button type="button" className="swatch" onClick={() => copy(value)} title={`${t('Copiar')} ${value}`}>
    <span className="c" style={{ background: value }} />
    <span className="t"><b className="st-label-md">{name}</b><span className="mono muted">{token}</span><span className="mono">{value}</span>{note && <span className="st-body-xs muted">{note}</span>}</span>
  </button>
);

/* ---------------- Tokens ---------------- */
const TOKEN_FILTERS = [
  { label: 'Cores primitivas', items: FAMILIES.map((f) => ({ id: `p-${f}`, label: f })) },
  { label: 'Cores semânticas', items: SEMANTIC_GROUPS.map((g) => ({ id: `s-${g}`, label: g })) },
  { label: 'Escalas', items: [{ id: 'x-space', label: 'Espaçamento' }, { id: 'x-radius', label: 'Raio de borda' }, { id: 'x-shadow', label: 'Sombras' }] },
];

function Tokens({ pick }) {
  const [kind, key] = [pick.slice(0, 1), pick.slice(2)];
  if (kind === 'p') {
    const items = Object.entries(primitives).filter(([k]) => family(k) === key);
    return (
      <article className="component">
        <Header kicker={`TOKENS / ${t('Cores primitivas').toUpperCase()}`} title={key}>{t('A paleta base. Clique numa cor para copiar o valor. Os componentes não usam estas cores direto: usam as semânticas, que apontam para elas.')}</Header>
        <div className="swatches">{items.map(([k, v]) => <Swatch key={k} name={k} value={v} token={`--${k}`} />)}</div>
      </article>
    );
  }
  if (kind === 's') {
    const items = Object.entries(semantic).filter(([k]) => k.startsWith(`${key}-`));
    return (
      <article className="component">
        <Header kicker={`TOKENS / ${t('Cores semânticas').toUpperCase()}`} title={key}>{t('Papéis de cor lidos pelos componentes. Cada um aponta para uma cor primitiva, então trocar a paleta não exige mexer nos componentes.')}</Header>
        <div className="swatches">{items.map(([k, v]) => <Swatch key={k} name={k} value={resolve(v)} token={`--${k}`} note={`→ ${v}`} />)}</div>
      </article>
    );
  }
  if (key === 'space') {
    return (
      <article className="component">
        <Header kicker="TOKENS" title={t('Espaçamento')}>{t('Escala de espaçamento em pixels. Use sempre um destes valores para margens, vãos e preenchimentos.')}</Header>
        <div className="card pad" style={{ display: 'grid', gap: 10 }}>{Object.entries(space).map(([k, v]) => <div className="sp" key={k}><span className="mono">--space-{k}</span><i style={{ width: v }} /><span className="mono muted">{v}px</span></div>)}</div>
      </article>
    );
  }
  if (key === 'radius') {
    return (
      <article className="component">
        <Header kicker="TOKENS" title={t('Raio de borda')}>{t('Cantos arredondados. O botão usa o raio de pílula; campos e cartões usam o médio.')}</Header>
        <div className="card pad" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {Object.entries(radius).map(([k, v]) => <div className="tile" key={k}><div className="tile__box" style={{ border: '2px solid var(--c-surface-inverse)', background: 'var(--c-neutral-100)', borderRadius: Math.min(v, 28) }} /><span className="mono">--radius-{k}</span><span className="mono muted">{v >= 999 ? t('pílula') : `${v}px`}</span></div>)}
        </div>
      </article>
    );
  }
  return (
    <article className="component">
      <Header kicker="TOKENS" title={t('Sombras')}>{t('Elevação. Quanto maior o número, mais o elemento flutua sobre a tela.')}</Header>
      <div className="card pad" style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {Object.entries(shadows).map(([k, v]) => <div className="tile" key={k}><div className="tile__box" style={{ background: 'var(--c-surface-default)', borderRadius: 12, boxShadow: v }} /><span className="mono">--shadow-{k}</span></div>)}
      </div>
    </article>
  );
}

/* ---------------- Estilos de texto ---------------- */
const STYLE_FILTERS = [{ label: 'Grupos', items: STYLE_GROUPS.map((g) => ({ id: g, label: g })) }];
const STYLE_NOTE = {
  display: { pt: 'Números e títulos de maior destaque.', en: 'Largest numbers and headings.' },
  title: { pt: 'Títulos de página e de seção.', en: 'Page and section titles.' },
  body: { pt: 'Texto corrido e conteúdo de campos.', en: 'Body text and field content.' },
  label: { pt: 'Rótulos de botão, campo e item de menu.', en: 'Button, field and menu item labels.' },
  caption: { pt: 'Legendas e textos de apoio muito pequenos.', en: 'Captions and very small supporting text.' },
};

function Styles({ pick }) {
  return (
    <article className="component">
      <Header kicker={`TOKENS / ${t('Estilos de texto').toUpperCase()}`} title={pick}>{tx(STYLE_NOTE[pick])} {t('Família Inter. Cada estilo vira uma classe, por exemplo .t-title-lg.')}</Header>
      {Object.entries(textStyles).filter(([k]) => k.startsWith(`${pick}-`)).map(([k, [size, line, weight, ls]]) => (
        <div className="card pad spec" key={k}>
          <span className={`t-${k}`}>{t('Telhados que duram, com orçamento claro')}</span>
          <span className="mono muted">.t-{k} · Inter · {size}/{line} · {t('peso')} {weight}{ls ? ` · ${ls}` : ''}</span>
        </div>
      ))}
    </article>
  );
}

/* ---------------- Componentes ---------------- */
const COMPONENT_FILTERS = CATEGORIES.map(([id, label]) => ({ label, items: DOCS.filter((d) => d.cat === id).map((d) => ({ id: d.name, label: d.name })) }));

function Component({ pick }) {
  const d = DOCS.find((x) => x.name === pick) || DOCS[0];
  const cat = CATEGORIES.find(([id]) => id === d.cat)[1];
  const used = d.used.map((id) => SCREENS.find((s) => s.id === id)?.label).filter(Boolean);
  return (
    <article className="component" aria-labelledby="comp-title">
      <header className="chead">
        <div className="row">
          <span className="st-label-md muted">{t('COMPONENTES')} / {tx(cat).toUpperCase()}</span>
          <span className="status status--ok">{t('estável')}</span>
          <a className="st-body-sm" href={d.figma ? `${FIGMA}?node-id=${d.figma}` : FIGMA} target="_blank" rel="noreferrer">{t('Abrir no Figma ↗')}</a>
        </div>
        <h2 id="comp-title" className="st-headline-bold-40">{d.name}</h2>
        <p className="st-body-md">{tx(d.desc)}</p>
      </header>
      <div className="example"><div className="preview">{d.demo()}</div><pre className="code">{d.code}</pre></div>
      <section>
        <h4>Props</h4>
        <div className="tablewrap"><table className="props"><thead><tr><th>{t('Nome')}</th><th>{t('Tipo')}</th><th>{t('Padrão')}</th><th>{t('Descrição')}</th></tr></thead>
          <tbody>{d.props.map((p) => <tr key={p[0]}><td className="mono">{p[0]}</td><td className="mono">{p[1]}</td><td className="mono">{p[2]}</td><td>{tx(p[3])}</td></tr>)}</tbody></table></div>
      </section>
      <div className="dd"><div className="do"><b className="plus">{t('Faça')}</b><p className="st-body-sm">{tx(d.do)}</p></div><div className="dont"><b className="minus">{t('Evite')}</b><p className="st-body-sm">{tx(d.dont)}</p></div></div>
      <p className="st-body-sm muted">{t('Tokens')}: <span className="mono">{d.tokens.join(', ')}</span><br />{t('Usado em')}: {used.length ? used.map((l) => t(l)).join(', ') : t('nenhuma tela ainda')}</p>
    </article>
  );
}

const TABS = [
  ['tokens', 'Tokens', Tokens, TOKEN_FILTERS, 'p-primary'],
  ['estilos', 'Estilos de texto', Styles, STYLE_FILTERS, 'display'],
  ['componentes', 'Componentes', Component, COMPONENT_FILTERS, 'Button'],
];

export function DesignSystemPage() {
  useLang();
  const [tab, setTab] = useState('tokens');
  const [pick, setPick] = useState(Object.fromEntries(TABS.map(([id, , , , first]) => [id, first])));
  const [, , Cur, filters] = TABS.find(([id]) => id === tab);
  const groups = filters.map((g) => ({ ...g, label: tx(g.label), items: g.items.map((i) => ({ ...i, label: tx(i.label) })) }));
  return (
    <div className="doc dsx">
      <DSScope />
      <h2 className="st-headline-bold-40">{t('Design system')} · SkyeVantage</h2>
      <p>{t('Tokens, estilos de texto e componentes do SkyeVantage ERP, instalados do pacote skyevantage-design-system (v0.1.0).')}</p>
      <TabBar tabs={TABS.map(([id, label]) => ({ id, label: t(label) }))} value={tab} onChange={setTab} />
      <div className="grid items-start gap-6 lg:grid-cols-[190px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-[calc(var(--top-h,0px)+16px)] lg:max-h-[calc(100vh-var(--top-h,0px)-32px)] lg:overflow-auto">
          <FilterBar groups={groups} value={pick[tab]} onPick={(id) => setPick((p) => ({ ...p, [tab]: id }))} />
        </div>
        <Cur pick={pick[tab]} />
      </div>
    </div>
  );
}
