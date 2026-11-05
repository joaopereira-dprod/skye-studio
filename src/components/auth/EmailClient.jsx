// Mockup/EmailClient (Figma): moldura de um cliente de e-mail estilo Gmail, para mostrar o e-mail transacional.
// É uma ilustração: a moldura (navegador, cabeçalho, menu, barras) fica escondida dos leitores de tela; só o e-mail em si é conteúdo.
// As cores da ilustração são tokens (--illustration-gmail-*), declarados em studio.project.css; ainda não existem no pacote do design system.
import { t, useLang } from '../../i18n.js';
import { appbar_1, appbar_2, appbar_3, appbar_4, gmail_logo } from '../../assets/email/pngs.js';
import dotRed from '../../assets/email/dot-red.svg';
import dotYellow from '../../assets/email/dot-yellow.svg';
import dotGreen from '../../assets/email/dot-green.svg';
import arrowBack from '../../assets/email/arrow-back.svg';
import arrowForward from '../../assets/email/arrow-forward.svg';
import refresh from '../../assets/email/refresh.svg';
import lock from '../../assets/email/lock.svg';
import more from '../../assets/email/more.svg';
import menuDown from '../../assets/email/menu-down.svg';
import star from '../../assets/email/star.svg';
import reply from '../../assets/email/reply.svg';
import moreVert from '../../assets/email/more-vert.svg';
import sender from '../../assets/email/sender.svg';
import print from '../../assets/email/print.svg';
import openInNew from '../../assets/email/open-in-new.svg';
import labelImportantLg from '../../assets/email/label-important-lg.svg';
import chevronRightSm from '../../assets/email/chevron-right-sm.svg';
import appbarDivider from '../../assets/email/appbar-divider.svg';
import add from '../../assets/email/add.svg';
import tbArrowBack from '../../assets/email/tb-arrow-back.svg';
import tbArchive from '../../assets/email/tb-archive.svg';
import tbReport from '../../assets/email/tb-report.svg';
import tbDelete from '../../assets/email/tb-delete.svg';
import tbLine from '../../assets/email/tb-line.svg';
import tbMail from '../../assets/email/tb-mail.svg';
import tbSchedule from '../../assets/email/tb-schedule.svg';
import tbAddTask from '../../assets/email/tb-add-task.svg';
import tbLine2 from '../../assets/email/tb-line2.svg';
import tbMove from '../../assets/email/tb-move.svg';
import tbLabel from '../../assets/email/tb-label.svg';
import tbMoreVert from '../../assets/email/tb-more-vert.svg';
import tbDropDown from '../../assets/email/tb-drop-down.svg';
import tbLang from '../../assets/email/tb-lang.svg';
import tbChevronLeft from '../../assets/email/tb-chevron-left.svg';
import tbChevronRight from '../../assets/email/tb-chevron-right.svg';
import navInbox from '../../assets/email/nav-inbox.svg';
import navStar from '../../assets/email/nav-star.svg';
import navSnoozed from '../../assets/email/nav-snoozed.svg';
import navImportant from '../../assets/email/nav-important.svg';
import navChats from '../../assets/email/nav-chats.svg';
import navSent from '../../assets/email/nav-sent.svg';
import navDrafts from '../../assets/email/nav-drafts.svg';
import navSpam from '../../assets/email/nav-spam.svg';
import navAllMail from '../../assets/email/nav-all-mail.svg';
import navBin from '../../assets/email/nav-bin.svg';
import navMore from '../../assets/email/nav-more.svg';
import composeEdit from '../../assets/email/compose-edit.svg';
import search from '../../assets/email/search.svg';
import tune from '../../assets/email/tune.svg';
import help from '../../assets/email/help.svg';
import settings from '../../assets/email/settings.svg';
import apps from '../../assets/email/apps.svg';
import menu from '../../assets/email/menu.svg';

const Img = ({ src, size = 20, className = '' }) => <img src={src} alt="" width={size} height={size} className={`flex-none ${className}`} />;
const Sep = ({ src }) => <span className="flex h-5 w-0 flex-none items-center justify-center"><img src={src} alt="" className="h-0 w-5 rotate-90" /></span>;

const NAV = [
  { icon: navInbox, label: 'Inbox', count: '311', active: true }, { icon: navStar, label: 'Starred' }, { icon: navSnoozed, label: 'Snoozed' },
  { icon: navImportant, label: 'Important' }, { icon: navChats, label: 'Chats' }, { icon: navSent, label: 'Sent' }, { icon: navDrafts, label: 'Drafts' },
  { icon: navSpam, label: 'Spam', count: '311', strong: true }, { icon: navAllMail, label: 'All Mail' }, { icon: navBin, label: 'Bin' }, { icon: navMore, label: 'More' },
];

function Browser() {
  return (
    <div aria-hidden="true" className="flex-none overflow-hidden rounded-t-[var(--radius-md)] bg-[var(--illustration-gmail-202124)]">
      <div className="flex h-6 items-center gap-[var(--space-8)] px-[var(--space-8)]"><Img src={dotRed} size={10} /><Img src={dotYellow} size={10} className="ml-[var(--space-8)]" /><Img src={dotGreen} size={10} className="ml-[var(--space-8)]" /></div>
      <div className="flex h-12 items-center gap-[var(--space-24)] bg-[var(--illustration-gmail-35363a)] pl-[var(--space-8)] pr-[var(--space-4)]">
        <Img src={arrowBack} size={28} /><Img src={arrowForward} size={28} /><Img src={refresh} size={28} />
        <div className="flex min-w-0 flex-1 items-center gap-[var(--space-12)] rounded-full bg-[var(--illustration-gmail-202124)] py-[var(--space-8)] pl-[var(--space-16)] pr-[var(--space-8)]">
          <img src={lock} alt="" width={10} height={13} className="flex-none" />
          <span className="t-body-md text-[color:var(--text-on-action)]">gmail.com</span>
        </div>
        <Img src={more} size={32} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div aria-hidden="true" className="flex h-14 flex-none items-center">
      <div className="flex w-[256px] flex-none items-center gap-[var(--space-16)] pl-[var(--space-24)]">
        <Img src={menu} size={24} /><img src={gmail_logo} alt="" width={96} height={36} className="ml-[var(--space-16)] h-9 w-24 flex-none object-cover" />
      </div>
      <div className="flex h-12 max-w-[722px] flex-1 items-center gap-[var(--space-16)] rounded-[var(--radius-md)] bg-[var(--bg-action-outline-pressed)] px-[var(--space-16)]">
        <Img src={search} size={24} /><span className="t-label-2xl flex-1 text-[color:var(--text-secondary)]">Search mail</span><Img src={tune} size={24} />
      </div>
      <div className="ml-auto flex items-center gap-[var(--space-16)] pr-[var(--space-8)]">
        <div className="flex items-center gap-[var(--space-20)]"><Img src={help} size={24} /><Img src={settings} size={24} /><Img src={apps} size={24} /></div>
        <div className="flex size-11 items-center justify-center"><span className="t-body-xl flex size-8 items-center justify-center rounded-full bg-[var(--border-info)] text-[color:var(--text-on-action)]">P</span></div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <nav aria-hidden="true" className="flex w-[256px] flex-none flex-col">
      <div className="h-[72px] flex-none px-[var(--space-8)] pt-[var(--space-8)]">
        <div className="inline-flex items-center gap-[var(--space-16)] rounded-[var(--radius-xl)] bg-[var(--illustration-gmail-c2e7ff)] py-[var(--space-16)] pl-[var(--space-16)] pr-[var(--space-20)]">
          <Img src={composeEdit} size={24} /><span className="t-label-lg text-[color:var(--illustration-gmail-001d35)]">Compose</span>
        </div>
      </div>
      <ul className="m-0 flex list-none flex-col p-0 pr-[var(--space-16)]">
        {NAV.map((n) => (
          <li key={n.label} className={`relative flex h-8 items-center rounded-r-full ${n.active ? 'bg-[var(--illustration-gmail-d3e2fd)]' : ''}`}>
            <span className="absolute left-[var(--space-24)] flex"><Img src={n.icon} /></span>
            <span className={`ml-[var(--space-64)] ${n.active ? 't-label-lg text-[color:var(--illustration-gmail-001d35)]' : n.strong ? 't-label-lg text-[color:var(--illustration-gmail-202124)]' : 't-body-md text-[color:var(--illustration-gmail-202124)]'}`}>{n.label}</span>
            {n.count && <span className={`t-label-sm absolute right-[var(--space-12)] ${n.active ? 'text-[color:var(--illustration-gmail-001d35)]' : 'text-[color:var(--text-secondary)]'}`}>{n.count}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function AppBar() {
  return (
    <div aria-hidden="true" className="flex w-14 flex-none flex-col items-center">
      {[appbar_1, appbar_2, appbar_3, appbar_4].map((s, i) => <div key={i} className="flex size-14 flex-none items-center justify-center"><Img src={s} size={20} /></div>)}
      <img src={appbarDivider} alt="" width={56} height={32} className="flex-none" />
      <div className="flex size-14 flex-none items-center justify-center"><Img src={add} size={24} /></div>
    </div>
  );
}

function Toolbar() {
  return (
    <div aria-hidden="true" className="relative flex h-12 flex-none items-center rounded-t-[var(--radius-xl)] bg-[var(--bg-surface)]">
      <span className="absolute left-[var(--space-16)]"><Img src={tbArrowBack} /></span>
      <div className="ml-[var(--space-72)] flex items-center gap-[var(--space-20)]">
        <div className="flex items-start gap-[var(--space-24)]"><Img src={tbArchive} /><Img src={tbReport} /><Img src={tbDelete} /></div>
        <Sep src={tbLine} />
        <div className="flex items-start gap-[var(--space-24)]"><Img src={tbMail} /><Img src={tbSchedule} /><Img src={tbAddTask} /></div>
        <Sep src={tbLine2} />
        <div className="flex items-start gap-[var(--space-24)]"><Img src={tbMove} /><Img src={tbLabel} /><Img src={tbMoreVert} /></div>
      </div>
      <div className="absolute right-[var(--space-28)] flex items-center"><Img src={tbChevronLeft} className="mr-[var(--space-20)]" /><Img src={tbChevronRight} className="mr-[var(--space-20)]" /><Img src={tbLang} /><Img src={tbDropDown} /></div>
    </div>
  );
}

/** Cliente de e-mail com o corpo do e-mail no centro (children). `subject` é o assunto exibido. */
export function EmailClient({ subject, children }) {
  useLang();
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[var(--bg-action-outline-hover)] text-[color:var(--text-primary)]">
      <Browser />
      <Header />
      <div className="flex min-h-0 flex-1">
        <Nav />
        <main className="mt-[var(--space-8)] flex min-w-0 flex-1 flex-col">
          <Toolbar />
          <div className="flex h-14 flex-none items-center gap-[var(--space-16)] bg-[var(--bg-surface)] pl-[var(--space-72)] pr-[var(--space-32)]">
            <h2 className="t-body-2xl m-0 text-[color:var(--text-primary)]">{subject}</h2>
            <span aria-hidden="true" className="flex"><Img src={labelImportantLg} size={24} /></span>
            <span aria-hidden="true" className="ml-auto flex gap-[var(--space-16)]"><Img src={print} /><Img src={openInNew} /></span>
          </div>
          <div className="relative flex h-20 flex-none items-start bg-[var(--bg-surface)]">
            <div aria-hidden="true" className="flex h-20 w-[var(--space-72)] flex-none items-center justify-center"><Img src={sender} size={40} /></div>
            <div className="mt-[var(--space-20)] flex min-w-0 flex-1 flex-col gap-[var(--space-4)]">
              <div className="flex items-center gap-[var(--space-4)] whitespace-nowrap">
                <span className="t-label-lg text-[color:var(--text-primary)]">SkyeVantage</span>
                <span className="t-body-xs text-[color:var(--text-secondary)]">&lt;noreply@skyevantage.com&gt;</span>
                <span className="t-body-xs text-[color:var(--text-secondary)]">Unsubscribe</span>
              </div>
              <div className="flex items-center"><span className="t-label-sm text-[color:var(--text-secondary)]">to me</span><span aria-hidden="true" className="flex"><Img src={menuDown} /></span></div>
            </div>
            <div className="ml-auto flex items-center gap-[var(--space-12)] pr-[var(--space-32)] pt-[var(--space-20)]">
              <span className="t-body-xs whitespace-nowrap text-[color:var(--text-secondary)]">Wed, Sep 15, 8:07 AM (2 days ago)</span>
              <span aria-hidden="true" className="flex gap-[var(--space-24)]"><Img src={star} /><Img src={reply} /><Img src={moreVert} /></span>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[var(--space-32)] overflow-auto rounded-b-[var(--radius-md)] bg-[var(--bg-surface)] pt-[var(--space-48)]">{children}</div>
        </main>
        <AppBar />
      </div>
    </div>
  );
}
