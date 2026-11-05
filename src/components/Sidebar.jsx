// Sidebar do protótipo, conforme o Figma (SkyeVantage ERP v2): Sidebar/Expanded (240px) e Sidebar/Collapsed (64px).
// Ícones e logo são os arquivos do Figma, em src/assets/sidebar. Os ícones do menu entram como máscara, para trocar de cor
// (cinza no repouso, branco no item ativo) sem redesenhar nada.
import { useSyncExternalStore } from 'react';
import { Icon } from 'skyevantage-design-system';
import { t, useLang } from '../i18n.js';
import projectsIcon from '../assets/sidebar/projects.svg';
import leadsIcon from '../assets/sidebar/leads.svg';
import estimatesIcon from '../assets/sidebar/estimates.svg';
import systemsIcon from '../assets/sidebar/systems.svg';
import usersIcon from '../assets/sidebar/users.svg';
import headerBuilding from '../assets/sidebar/header-building.svg';
import headerChevron from '../assets/sidebar/header-chevron.svg';
import collapsedBuilding from '../assets/sidebar/collapsed-building.svg';
import collapsedUser from '../assets/sidebar/collapsed-user.svg';
import logo from '../assets/sidebar/logo.js';

const NAV = [
  { id: 'projetos', label: 'Projetos', icon: projectsIcon },
  { id: 'leads', label: 'Leads e clientes', icon: leadsIcon },
  { id: 'orcamentos', label: 'Orçamentos', icon: estimatesIcon },
  { id: 'sistemas', label: 'Sistemas', icon: systemsIcon },
  { id: 'usuarios', label: 'Usuários', icon: usersIcon },
];

// Expandido ou recolhido: vale para todas as telas, então fica fora dos componentes.
let collapsed = false;
const subs = new Set();
const useCollapsed = () => useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => collapsed);
const setCollapsed = (v) => { collapsed = v; subs.forEach((f) => f()); };

// O build entrega o SVG como texto em data:image/svg+xml,… com aspas duplas: dentro de url() ele precisa ir entre aspas simples.
const cssUrl = (src) => `url('${src.replace(/'/g, '%27')}')`;

const Mask = ({ src, size = 18 }) => (
  <span aria-hidden="true" style={{
    display: 'block', flex: 'none', width: size, height: size, background: 'currentColor',
    WebkitMaskImage: cssUrl(src), maskImage: cssUrl(src), WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskPosition: 'center', maskPosition: 'center',
  }} />
);

const Divider = ({ wrap, line }) => (
  <div className={`flex w-full flex-col overflow-hidden ${wrap}`}><div className={`h-px bg-[var(--bg-surface-active)] ${line}`} /></div>
);

function MenuItem({ item, active, go, compact }) {
  const label = t(item.label);
  return (
    <button
      type="button" onClick={() => go(item.id)} aria-current={active ? 'page' : undefined}
      aria-label={compact ? label : undefined} title={compact ? label : undefined}
      className={`flex items-center rounded-[var(--radius-sm)] ${compact ? 'size-11 justify-center' : 'w-full gap-[var(--space-8)] px-[var(--space-12)] py-[var(--space-10)] text-left'} ${
        active ? 'bg-[var(--bg-action-primary)] text-[color:var(--text-on-action)]' : 'bg-transparent text-[color:var(--text-secondary)] hover:bg-[var(--bg-surface-subdued)]'}`}
    >
      <Mask src={item.icon} />
      {!compact && <span className="t-label-md flex-1 truncate">{label}</span>}
    </button>
  );
}

function ToggleButton({ isCollapsed }) {
  const label = isCollapsed ? t('Expandir menu') : t('Recolher menu');
  return (
    <button type="button" onClick={() => setCollapsed(!isCollapsed)} aria-label={label} title={label} aria-expanded={!isCollapsed}
      className="absolute right-[-12px] top-[22px] z-10 flex size-6 items-center justify-center rounded-full border border-[color:var(--border-default)] bg-[var(--bg-surface)] text-[color:var(--icon-default)] hover:bg-[var(--bg-surface-subdued)]">
      <Icon name={isCollapsed ? 'chevron-right' : 'chevron-left'} size={14} />
    </button>
  );
}

export function Sidebar({ active, go }) {
  useLang();
  const isCollapsed = useCollapsed();
  const base = 'sv relative flex h-full flex-none flex-col border-r border-[color:var(--border-default)] bg-[var(--bg-surface)] shadow-[2px_0_24px_rgba(0,0,0,0.06)]';

  if (isCollapsed) {
    return (
      <aside aria-label={t('Menu principal')} className={`${base} w-16 items-center gap-[var(--space-4)] pb-[var(--space-16)] pt-[var(--space-12)]`}>
        <ToggleButton isCollapsed />
        <div className="flex size-8 flex-none items-center justify-center overflow-hidden rounded-[var(--radius-sm)] bg-[var(--bg-action-outline-pressed)]">
          <img src={collapsedBuilding} alt="" width={24} height={24} />
        </div>
        <Divider wrap="px-[var(--space-8)] py-[var(--space-4)]" line="w-full" />
        <nav className="flex flex-col items-center gap-[var(--space-4)]">
          {NAV.map((n) => <MenuItem key={n.id} item={n} active={active === n.id} go={go} compact />)}
        </nav>
        <div className="flex-1" />
        <Divider wrap="px-[var(--space-8)] pb-[var(--space-4)]" line="w-full" />
        <div className="flex size-8 flex-none items-center justify-center rounded-full bg-[var(--bg-surface-subdued)]"><img src={collapsedUser} alt={t('Perfil')} width={16} height={16} /></div>
      </aside>
    );
  }

  return (
    <aside aria-label={t('Menu principal')} className={`${base} w-60 pb-[var(--space-16)] pt-[var(--space-8)]`}>
      <ToggleButton isCollapsed={false} />
      <button type="button" title={t('Trocar franquia')} className="flex w-full items-center gap-[var(--space-8)] rounded-[var(--radius-sm)] bg-transparent p-[var(--space-12)] text-left hover:bg-[var(--bg-surface-subdued)]">
        <span className="flex size-8 flex-none items-center justify-center rounded-[var(--radius-sm)] bg-[var(--bg-action-outline-pressed)]"><img src={headerBuilding} alt="" width={16} height={16} /></span>
        <span className="flex min-w-0 flex-1 flex-col whitespace-nowrap">
          <span className="t-label-md text-[color:var(--text-primary)]">Popstand Franchise</span>
          <span className="text-[10px] font-normal leading-[14px] tracking-[0.02em] text-[color:var(--text-secondary)]">{t('Administrador corporativo')}</span>
        </span>
        <img src={headerChevron} alt="" width={16} height={16} className="flex-none" />
      </button>
      <Divider wrap="px-[var(--space-12)] py-[var(--space-8)]" line="w-full" />
      <div className="px-[var(--space-12)] py-[var(--space-4)]"><span className="t-caption-sm text-[color:var(--text-secondary)]">{t('Menu principal')}</span></div>
      <nav className="flex flex-col gap-[var(--space-4)] px-[var(--space-8)]">
        {NAV.map((n) => <MenuItem key={n.id} item={n} active={active === n.id} go={go} />)}
      </nav>
      <div className="flex-1" />
      <div className="flex flex-col items-center py-[var(--space-12)]"><img src={logo} alt="SkyeVantage" width={136} height={47} /></div>
      <Divider wrap="px-[var(--space-12)] pb-[var(--space-12)]" line="w-full" />
      <div className="flex items-center gap-[var(--space-8)] px-[var(--space-12)]">
        <span className="t-label-sm flex size-8 flex-none items-center justify-center rounded-full bg-[var(--bg-action-primary)] text-[color:var(--text-on-action)]">JP</span>
        <span className="flex min-w-0 flex-col">
          <span className="t-label-md text-[color:var(--text-primary)]">João Pereira</span>
          <span className="truncate text-[10px] font-normal leading-[14px] tracking-[0.02em] text-[color:var(--text-secondary)]">joao.pereira@popstand.com</span>
        </span>
      </div>
    </aside>
  );
}
