// Peças das telas de autenticação (Figma: Authentication). Tudo é composto com componentes e tokens do design system SkyeVantage:
// AuthCard, AuthHeader, AuthSuccessCard, campo de senha e lista de requisitos. Nenhum valor solto: cores, espaços e textos vêm dos tokens.
import { useState, forwardRef } from 'react';
import { Button, Input, Icon } from 'skyevantage-design-system';
import { t, useLang } from '../../i18n.js';
import { DSScope } from '../../ds.jsx';
import logo from '../../assets/auth/logo.js';
import eye from '../../assets/auth/eye.svg';

// O build entrega o SVG como texto em data:image/svg+xml,… com aspas duplas: dentro de url() ele precisa ir entre aspas simples.
const cssUrl = (src) => `url('${src.replace(/'/g, '%27')}')`;

/** Página das telas de autenticação: fundo secundário, cartão centralizado. */
export function AuthPage({ children }) {
  useLang();
  return (
    <div className="dsx sv flex h-full flex-col items-center justify-center gap-[var(--space-32)] overflow-auto bg-[var(--bg-surface-secondary)] p-[var(--space-24)]">
      <DSScope />
      {children}
    </div>
  );
}

/** AuthHeader: logo e texto de apresentação. `gap` muda de 20 (dentro do cartão) para 24 (no e-mail). */
export function AuthHeader({ title, subtitle, gap = 'var(--space-20)', width }) {
  return (
    <div className="flex w-full flex-col items-center overflow-hidden text-center" style={{ gap, maxWidth: width }}>
      <img src={logo} alt="SkyeVantage Cloud Platform" width={214} height={88} className="h-[88px] w-[214px] flex-none object-cover" />
      <div className="flex w-full flex-col items-center gap-[var(--space-6)]">
        {title && <h1 className="t-title-md w-full text-[color:var(--text-primary)]">{title}</h1>}
        {subtitle && <p className="t-body-md w-full text-[color:var(--text-secondary)]">{subtitle}</p>}
      </div>
    </div>
  );
}

/** AuthCard: cartão de 460px com cabeçalho e o conteúdo no slot. */
export function AuthCard({ title, subtitle, children, label }) {
  return (
    <section aria-label={label || title} className="flex w-[460px] max-w-full flex-none flex-col items-start gap-[var(--space-40)] overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border-default)] bg-[var(--bg-surface)] p-[var(--space-32)] shadow-[var(--shadow-400)]">
      <AuthHeader title={title} subtitle={subtitle} />
      <div className="flex w-full flex-col items-start">{children}</div>
    </section>
  );
}

/** AuthSuccessCard: confirmação de sucesso, com ícone, texto e um botão. */
export function AuthSuccessCard({ title, text, cta, onCta }) {
  return (
    <section aria-labelledby="auth-success-title" className="flex w-[460px] max-w-full flex-none flex-col items-center justify-center gap-[var(--space-40)] overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border-default)] bg-[var(--bg-surface)] p-[var(--space-32)] shadow-[var(--shadow-400)]">
      <div className="flex size-14 flex-none items-center justify-center rounded-full bg-[var(--bg-success-strong)] text-[color:var(--text-success-strong)]"><Icon name="check" size={28} /></div>
      <div role="status" className="flex w-full flex-col items-center gap-[var(--space-4)] text-center">
        <h1 id="auth-success-title" className="t-title-sm w-full text-[color:var(--text-primary)]">{title}</h1>
        <p className="t-body-md w-full text-[color:var(--text-secondary)]">{text}</p>
      </div>
      <Button className="w-full" onClick={onCta} autoFocus>{cta}</Button>
    </section>
  );
}

/** Link de texto dentro de um parágrafo (EULA, Termos). */
export function InlineLink({ children, onClick }) {
  return <button type="button" onClick={onClick} className="t-label-sm cursor-pointer bg-transparent p-0 text-[color:var(--text-link)] underline hover:text-[color:var(--text-link-hover)] focus-visible:shadow-[var(--shadow-focusRing)] focus-visible:outline-none">{children}</button>;
}

const EyeOff = <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49M14.084 14.158a3 3 0 0 1-4.242-4.242M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" />;

/** Campo de senha: Input do design system com o botão de mostrar ou ocultar dentro do campo (ícone do Figma). */
export const PasswordField = forwardRef(function PasswordField({ label, error, ...rest }, ref) {
  const [shown, setShown] = useState(false);
  const toggle = shown ? t('Ocultar senha') : t('Mostrar senha');
  return (
    <div className="auth-pw relative w-full">
      <Input ref={ref} label={label} error={error} type={shown ? 'text' : 'password'} autoComplete="current-password" {...rest} />
      <button type="button" onClick={() => setShown((s) => !s)} aria-label={toggle} title={toggle} aria-pressed={shown}
        className="absolute right-[var(--space-8)] top-[calc(24px+var(--space-4))] flex size-8 items-center justify-center rounded-[var(--radius-sm)] bg-transparent text-[color:var(--icon-default)] hover:bg-[var(--bg-surface-subdued)] focus-visible:shadow-[var(--shadow-focusRing)] focus-visible:outline-none">
        {shown
          ? <Icon size={18}>{EyeOff}</Icon>
          : <span aria-hidden="true" style={{ display: 'block', width: 18, height: 18, background: 'currentColor', WebkitMaskImage: cssUrl(eye), maskImage: cssUrl(eye), WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }} />}
      </button>
    </div>
  );
});

/** Lista de requisitos da senha. Antes de digitar fica neutra; depois, verde (cumprido) ou vermelha (falta). */
export function Requirements({ rules, value, touched }) {
  return (
    <ul aria-label={t('Requisitos da senha')} className="flex w-full list-none flex-col gap-[var(--space-4)] p-0">
      {rules.map((r) => {
        const ok = r.test(value);
        const state = !touched ? 'idle' : ok ? 'ok' : 'bad';
        const tone = { idle: 'text-[color:var(--text-secondary)]', ok: 'text-[color:var(--text-secondary)]', bad: 'text-[color:var(--text-critical)]' }[state];
        const iconTone = { idle: 'text-[color:var(--icon-subdued)]', ok: 'text-[color:var(--text-success)]', bad: 'text-[color:var(--text-critical)]' }[state];
        return (
          <li key={r.id} className="flex items-center gap-[var(--space-4)]">
            <span className={iconTone}><Icon name="circle-check" size={16} /></span>
            <span className={`t-body-xs ${tone}`}>{t(r.label)}<span className="sr-only"> — {ok ? t('cumprido') : t('não cumprido')}</span></span>
          </li>
        );
      })}
    </ul>
  );
}

export const PASSWORD_RULES = [
  { id: 'len', label: 'Mínimo: pelo menos 8 caracteres', test: (v) => v.length >= 8 },
  { id: 'upper', label: 'Maiúscula: pelo menos 1 letra (A-Z)', test: (v) => /[A-Z]/.test(v) },
  { id: 'lower', label: 'Minúscula: pelo menos 1 letra (a-z)', test: (v) => /[a-z]/.test(v) },
  { id: 'digit', label: 'Número: pelo menos 1 dígito (0-9)', test: (v) => /\d/.test(v) },
  { id: 'symbol', label: 'Caractere especial: pelo menos 1 símbolo (ex.: !@#$%^&*)', test: (v) => /[^A-Za-z0-9]/.test(v) },
];

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
/** Devolve o foco a um campo depois que a tela volta do estado de carregando (os campos ficam desabilitados enquanto carrega). */
export const focusSoon = (ref) => setTimeout(() => ref.current?.focus(), 60);
/** Simula o tempo de resposta do servidor. */
export const wait = (ms = 900) => new Promise((r) => setTimeout(r, ms));
