// Sidebar do protótipo, conforme o Figma (SkyeVantage ERP v2): Sidebar/Expanded (240px) e Sidebar/Collapsed (64px).
// Ícones e logo são os arquivos do Figma, em src/assets/sidebar. Os ícones do menu entram como máscara, para trocar de cor
// (cinza no repouso, branco no item ativo) sem redesenhar nada.
// Itens sem tela no protótipo apontam para ids de STUBS (src/screens/index.jsx): o Studio mostra o aviso “Tela não desenhada”.
import { useSyncExternalStore } from 'react';
import { Icon } from 'skyevantage-design-system';
import { t, useLang } from '../i18n.js';
import franchisesIcon from '../assets/sidebar/franchises.svg';
import leadsIcon from '../assets/sidebar/leads.svg';
import projectsIcon from '../assets/sidebar/projects.svg';
import customersIcon from '../assets/sidebar/customers.svg';
import usersIcon from '../assets/sidebar/users.svg';
import estimatesIcon from '../assets/sidebar/estimates.svg';
import systemsIcon from '../assets/sidebar/systems.svg';
import servicesIcon from '../assets/sidebar/services.svg';
import settingsIcon from '../assets/sidebar/settings.svg';
import contactsIcon from '../assets/sidebar/contacts.svg';
import operationsIcon from '../assets/sidebar/operations.svg';
import chevronIcon from '../assets/sidebar/chevron.svg';
import headerBuilding from '../assets/sidebar/header-building.svg';
import headerChevron from '../assets/sidebar/header-chevron.svg';
import collapsedBuilding from '../assets/sidebar/collapsed-building.svg';
import collapsedUser from '../assets/sidebar/collapsed-user.svg';
import logo from '../assets/sidebar/logo.js';

// id = tela do protótipo (SCREENS) ou destino ainda não desenhado (STUBS). `chevron`: no Figma o item tem seta, mas o filho não foi desenhado.
export const NAV = [
  { id: 'franquias', label: 'Franquias', icon: franchisesIcon },
  { id: 'leads', label: 'Leads', icon: leadsIcon },
  { id: 'projetos', label: 'Projetos', icon: projectsIcon },
  { id: 'clientes', label: 'Clientes', icon: customersIcon },
  { id: 'usuarios', label: 'Usuários', icon: usersIcon },
  { id: 'orcamentos', label: 'BESTimator', icon: estimatesIcon },
  { id: 'sistemas', label: 'Sistemas', icon: systemsIcon },
  {
    id: 'servicos', label: 'Serviços', icon: servicesIcon,
    children: [
      { id: 'fornecedores', label: 'Fornecedores de materiais' }, { id: 'equipes-instalacao', label: 'Equipes de instalação' },
      { id: 'cacambas', label: 'Empresas de caçamba' }, { id: 'inspetores-sotao', label: 'Inspetores de sótão' },
    ],
  },
  { id: 'config-bestimator', label: 'Configurações do BESTimator', icon: settingsIcon, chevron: true },
  { id: 'contatos', label: 'Contatos e indicações', icon: contactsIcon, chevron: true },
  { id: 'usuarios-corporativos', label: 'Usuários corporativos', icon: usersIcon },
  { id: 'operacoes', label: 'Pessoa de operações', icon: operationsIcon },
  { id: 'emails', label: 'Gestão de e-mails', icon: operationsIcon },
];
export const NAV_STUBS = NAV.flatMap((n) => (n.children ? n.children.map((c) => c.id) : [n.id]))
  .filter((id) => !['leads', 'projetos', 'usuarios', 'orcamentos', 'sistemas'].includes(id));

// Recolhido e grupos abertos valem para todas as telas, então ficam fora dos componentes.
let state = { collapsed: false, open: new Set(['servicos']) };
const subs = new Set();
const useNav = () => useSyncExternalStore((f) => { subs.add(f); return () => subs.delete(f); }, () => state);
const update = (patch) => { state = { ...state, ...patch }; subs.forEach((f) => f()); };
const toggleGroup = (id) => { const open = new Set(state.open); if (!open.delete(id)) open.add(id); update({ open }); };

// O build entrega o SVG como texto em data:image/svg+xml,… com aspas duplas: dentro de url() ele precisa ir entre aspas simples.
const cssUrl = (src) => `url('${src.replace(/'/g, '%27')}')`;

const Mask = ({ src, size = 18, className = '' }) => (
  <span aria-hidden="true" className={className} style={{
    display: 'block', flex: 'none', width: size, height: size, background: 'currentColor',
    WebkitMaskImage: cssUrl(src), maskImage: cssUrl(src), WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskPosition: 'center', maskPosition: 'center',
  }} />
);

const Divider = ({ wrap, line }) => (
  <div className={`flex w-full flex-none flex-col overflow-hidden ${wrap}`}><div className={`h-px bg-[var(--bg-surface-active)] ${line}`} /></div>
);

const rest = 'bg-transparent text-[color:var(--text-secondary)] hover:bg-[var(--bg-surface-subdued)]';
const on = 'bg-[var(--bg-action-primary)] text-[color:var(--text-on-action)]';

function MenuItem({ item, active, onClick, compact, expanded, controls }) {
  const label = t(item.label);
  return (
    <button
      type="button" onClick={onClick} aria-current={active ? 'page' : undefined}
      aria-expanded={expanded} aria-controls={controls}
      aria-label={compact ? label : undefined} title={compact ? label : undefined}
      className={`flex flex-none items-center rounded-[var(--radius-sm)] ${compact ? 'size-11 justify-center' : 'w-full gap-[var(--space-8)] px-[var(--space-12)] py-[var(--space-10)] text-left'} ${active ? on : rest}`}
    >
      <Mask src={item.icon} />
      {!compact && <span className="t-label-md flex-1">{label}</span>}
      {!compact && (item.children || item.chevron) && <Mask src={chevronIcon} size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />}
    </button>
  );
}

// Item de 2º nível: sem ícone, recuado (36px), texto 12px. Ativo: texto na cor de ação.
function SubItem({ item, active, onClick }) {
  return (
    <button type="button" onClick={onClick} aria-current={active ? 'page' : undefined}
      className={`t-label-sm flex w-full flex-none items-center rounded-[var(--radius-sm)] bg-transparent px-9 py-[var(--space-10)] text-left hover:bg-[var(--bg-surface-subdued)] ${active ? 'text-[color:var(--text-action-outline)]' : 'text-[color:var(--text-secondary)]'}`}>
      {t(item.label)}
    </button>
  );
}

function ToggleButton({ isCollapsed }) {
  const label = isCollapsed ? t('Expandir menu') : t('Recolher menu');
  return (
    <button type="button" onClick={() => update({ collapsed: !isCollapsed })} aria-label={label} title={label} aria-expanded={!isCollapsed}
      className={`absolute right-[-16px] z-10 flex size-6 items-center justify-center rounded-full border border-[color:var(--border-default)] bg-[var(--bg-surface)] text-[color:var(--icon-default)] hover:bg-[var(--bg-surface-subdued)] ${isCollapsed ? 'top-4' : 'top-6'}`}>
      <Icon name={isCollapsed ? 'chevron-right' : 'chevron-left'} size={14} />
    </button>
  );
}

export function Sidebar({ active, go }) {
  useLang();
  const { collapsed: isCollapsed, open } = useNav();
  const base = 'sv relative flex h-full flex-none flex-col border-r border-[color:var(--border-default)] bg-[var(--bg-surface)] shadow-[2px_0_24px_rgba(0,0,0,0.06)]';

  if (isCollapsed) {
    return (
      <aside aria-label={t('Menu principal')} className={`${base} w-16 items-center gap-[var(--space-4)] pb-[var(--space-16)] pt-[var(--space-12)]`}>
        <ToggleButton isCollapsed />
        <div className="flex size-8 flex-none items-center justify-center overflow-hidden rounded-[var(--radius-sm)] bg-[var(--bg-action-outline-pressed)]">
          <img src={collapsedBuilding} alt="" width={24} height={24} />
        </div>
        <Divider wrap="px-[var(--space-8)] py-[var(--space-4)]" line="w-full" />
        <nav aria-label={t('Menu principal')} className="flex min-h-0 flex-1 flex-col items-center gap-[var(--space-4)] overflow-y-auto">
          {NAV.map((n) => (
            // Grupo com filhos: recolhido não há onde mostrar os filhos, então abre o menu já com o grupo aberto.
            <MenuItem key={n.id} item={n} compact active={active === n.id}
              onClick={() => (n.children ? update({ collapsed: false, open: new Set(state.open).add(n.id) }) : go(n.id))} />
          ))}
        </nav>
        <Divider wrap="px-[var(--space-8)] pb-[var(--space-4)] pt-[var(--space-8)]" line="w-full" />
        <div className="flex size-8 flex-none items-center justify-center rounded-full bg-[var(--bg-surface-subdued)]"><img src={collapsedUser} alt={t('Perfil')} width={16} height={16} /></div>
      </aside>
    );
  }

  return (
    <aside aria-label={t('Menu principal')} className={`${base} w-60 pb-[var(--space-16)] pt-[var(--space-8)]`}>
      <ToggleButton isCollapsed={false} />
      <button type="button" title={t('Trocar franquia')} className="flex w-full flex-none items-center gap-[var(--space-8)] rounded-[var(--radius-sm)] bg-transparent py-[var(--space-12)] pl-[var(--space-12)] pr-[var(--space-24)] text-left hover:bg-[var(--bg-surface-subdued)]">
        <span className="flex size-8 flex-none items-center justify-center rounded-[var(--radius-sm)] bg-[var(--bg-action-outline-pressed)]"><img src={headerBuilding} alt="" width={16} height={16} /></span>
        <span className="flex min-w-0 flex-1 flex-col whitespace-nowrap">
          <span className="t-label-md text-[color:var(--text-primary)]">Popstand Franchise</span>
          <span className="text-[10px] font-normal leading-[14px] tracking-[0.02em] text-[color:var(--text-secondary)]">{t('Administrador corporativo')}</span>
        </span>
        <img src={headerChevron} alt="" width={16} height={16} className="flex-none" />
      </button>
      <Divider wrap="px-[var(--space-12)] py-[var(--space-8)]" line="w-full" />
      <div className="flex-none px-[var(--space-12)] py-[var(--space-4)]"><span className="t-caption-sm text-[color:var(--text-secondary)]">{t('Menu principal')}</span></div>
      <nav aria-label={t('Menu principal')} className="flex min-h-0 flex-1 flex-col gap-[var(--space-4)] overflow-y-auto px-[var(--space-8)]">
        {NAV.map((n) => {
          if (!n.children) return <MenuItem key={n.id} item={n} active={active === n.id} onClick={() => go(n.id)} />;
          const isOpen = open.has(n.id);
          return (
            <div key={n.id} className="flex flex-none flex-col gap-[var(--space-4)]">
              <MenuItem item={n} expanded={isOpen} controls={`sub-${n.id}`} onClick={() => toggleGroup(n.id)} />
              {isOpen && (
                <div id={`sub-${n.id}`} role="group" aria-label={t(n.label)} className="flex flex-col gap-[var(--space-4)]">
                  {n.children.map((c) => <SubItem key={c.id} item={c} active={active === c.id} onClick={() => go(c.id)} />)}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div className="flex flex-none flex-col items-center py-[var(--space-12)]"><img src={logo} alt="SkyeVantage" width={136} height={47} /></div>
      <Divider wrap="px-[var(--space-12)] pb-[var(--space-12)]" line="w-full" />
      <div className="flex flex-none items-center gap-[var(--space-8)] px-[var(--space-12)]">
        <span className="t-label-sm flex size-8 flex-none items-center justify-center rounded-full bg-[var(--bg-action-primary)] text-[color:var(--text-on-action)]">JP</span>
        <span className="flex min-w-0 flex-col">
          <span className="t-label-md text-[color:var(--text-primary)]">João Pereira</span>
          <span className="truncate text-[10px] font-normal leading-[14px] tracking-[0.02em] text-[color:var(--text-secondary)]">joao.pereira@popstand.com</span>
        </span>
      </div>
    </aside>
  );
}
