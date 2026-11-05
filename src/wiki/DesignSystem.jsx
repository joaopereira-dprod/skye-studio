// Páginas da Wiki para o design system SkyeVantage. Cada uma entra na barra lateral com itens filhos (ver WIKI_PAGES em studio.project.js):
//   Tokens → cores primitivas, cores semânticas, espaçamento, raio de borda, sombras
//   Estilos de texto → display, title, body, label, caption
//   Componentes → uma seção por categoria, um item por componente
import { primitives, semantic, radius, textStyles, shadows } from 'skyevantage-design-system';
import { t, lang, useLang } from '../i18n.js';
import { DSScope, SPACE } from '../ds.jsx';
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
function Tokens({ pick }) {
  if (pick === 'primitivas') {
    return (
      <article className="component">
        <Header kicker="TOKENS" title={t('Cores primitivas')}>{t('A paleta base. Clique numa cor para copiar o valor. Os componentes não usam estas cores direto: usam as semânticas, que apontam para elas.')}</Header>
        {FAMILIES.map((f) => (
          <section key={f}>
            <h4>{f.toUpperCase()}</h4>
            <div className="swatches">{Object.entries(primitives).filter(([k]) => family(k) === f).map(([k, v]) => <Swatch key={k} name={k} value={v} token={`--${k}`} />)}</div>
          </section>
        ))}
      </article>
    );
  }
  if (pick === 'semanticas') {
    return (
      <article className="component">
        <Header kicker="TOKENS" title={t('Cores semânticas')}>{t('Papéis de cor lidos pelos componentes. Cada um aponta para uma cor primitiva, então trocar a paleta não exige mexer nos componentes.')}</Header>
        {SEMANTIC_GROUPS.map((g) => (
          <section key={g}>
            <h4>{g.toUpperCase()}</h4>
            <div className="swatches">{Object.entries(semantic).filter(([k]) => k.startsWith(`${g}-`)).map(([k, v]) => <Swatch key={k} name={k} value={resolve(v)} token={`--${k}`} note={`→ ${v}`} />)}</div>
          </section>
        ))}
      </article>
    );
  }
  if (pick === 'espaco') {
    return (
      <article className="component">
        <Header kicker="TOKENS" title={t('Espaçamento')}>{t('Escala de espaçamento em pixels: todo múltiplo de 4, de 4 a 96. Use sempre um destes valores para margens, vãos e preenchimentos.')}</Header>
        <div className="card pad" style={{ display: 'grid', gap: 'var(--space-12)' }}>{SPACE.map((v) => <div className="sp" key={v}><span className="mono">--space-{v}</span><i style={{ width: v }} /><span className="mono muted">{v}px</span></div>)}</div>
      </article>
    );
  }
  if (pick === 'raio') {
    return (
      <article className="component">
        <Header kicker="TOKENS" title={t('Raio de borda')}>{t('Cantos arredondados. O botão usa o raio de pílula; campos e cartões usam o médio.')}</Header>
        <div className="card pad" style={{ display: 'flex', gap: 'var(--space-24)', flexWrap: 'wrap' }}>
          {Object.entries(radius).map(([k, v]) => <div className="tile" key={k}><div className="tile__box" style={{ border: '2px solid var(--c-surface-inverse)', background: 'var(--c-neutral-100)', borderRadius: Math.min(v, 28) }} /><span className="mono">--radius-{k}</span><span className="mono muted">{v >= 999 ? t('pílula') : `${v}px`}</span></div>)}
        </div>
      </article>
    );
  }
  return (
    <article className="component">
      <Header kicker="TOKENS" title={t('Sombras')}>{t('Elevação. Quanto maior o número, mais o elemento flutua sobre a tela.')}</Header>
      <div className="card pad" style={{ display: 'flex', gap: 'var(--space-24)', flexWrap: 'wrap' }}>
        {Object.entries(shadows).map(([k, v]) => <div className="tile" key={k}><div className="tile__box" style={{ background: 'var(--c-surface-default)', borderRadius: 12, boxShadow: v }} /><span className="mono">--shadow-{k}</span></div>)}
      </div>
    </article>
  );
}

/* ---------------- Estilos de texto ---------------- */
const STYLE_NOTE = {
  display: { pt: 'Números e títulos de maior destaque.', en: 'Largest numbers and headings.' },
  title: { pt: 'Títulos de página e de seção.', en: 'Page and section titles.' },
  body: { pt: 'Texto corrido e conteúdo de campos.', en: 'Body text and field content.' },
  label: { pt: 'Rótulos de botão, campo e item de menu.', en: 'Button, field and menu item labels.' },
  caption: { pt: 'Legendas e textos de apoio muito pequenos.', en: 'Captions and very small supporting text.' },
};

function Styles({ pick }) {
  const g = STYLE_GROUPS.includes(pick) ? pick : STYLE_GROUPS[0];
  return (
    <article className="component">
      <Header kicker={t('ESTILOS DE TEXTO')} title={g.charAt(0).toUpperCase() + g.slice(1)}>{tx(STYLE_NOTE[g])} {t('Família Inter. Cada estilo vira uma classe, por exemplo .t-title-lg.')}</Header>
      {Object.entries(textStyles).filter(([k]) => k.startsWith(`${g}-`)).map(([k, [size, line, weight, ls]]) => (
        <div className="card pad spec" key={k}>
          <span className={`t-${k}`}>{t('Telhados que duram, com orçamento claro')}</span>
          <span className="mono muted">.t-{k} · Inter · {size}/{line} · {t('peso')} {weight}{ls ? ` · ${ls}` : ''}</span>
        </div>
      ))}
    </article>
  );
}

/* ---------------- Componentes ---------------- */
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
      <div className="example"><div className={`preview${d.top ? ' preview--top' : ''}`}>{d.demo()}</div><pre className="code">{d.code}</pre></div>
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

/* ---------------- Páginas da Wiki ---------------- */
const page = (Comp, id) => function DesignSystemPage({ target }) {
  useLang();
  return <div className="dsx"><DSScope /><Comp pick={target?.[id]} /></div>;
};

const TOKEN_ITEMS = [
  { id: 'primitivas', label: 'Cores primitivas' }, { id: 'semanticas', label: 'Cores semânticas' },
  { id: 'espaco', label: 'Espaçamento' }, { id: 'raio', label: 'Raio de borda' }, { id: 'sombra', label: 'Sombras' },
];

/** Entram em WIKI_PAGES, logo depois de “Como usar” e “Processo”. */
export const DS_WIKI_PAGES = [
  { id: 'ds-tokens', label: 'Tokens', after: 'como', def: 'primitivas', groups: [{ id: 'tokens', items: TOKEN_ITEMS }], Component: page(Tokens, 'ds-tokens') },
  { id: 'ds-estilos', label: 'Estilos de texto', after: 'como', def: 'display', groups: [{ id: 'estilos', items: STYLE_GROUPS.map((g) => ({ id: g, label: g.charAt(0).toUpperCase() + g.slice(1) })) }], Component: page(Styles, 'ds-estilos') },
  {
    id: 'ds-componentes', label: 'Componentes', after: 'como', def: DOCS[0].name, Component: page(Component, 'ds-componentes'),
    groups: CATEGORIES.map(([id, label]) => ({ id, label: label.pt, items: DOCS.filter((d) => d.cat === id).map((d) => ({ id: d.name, label: d.name })) })),
  },
];
