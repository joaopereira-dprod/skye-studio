import { useRef, useState } from 'react';
import { Button } from 'skyevantage-design-system';
import { t, useLang } from '../../i18n.js';
import { AuthPage, AuthCard, PasswordField, Requirements, PASSWORD_RULES, wait, focusSoon } from '../../components/auth/Auth.jsx';
import { SCENARIOS } from './scenarios.js';

const MISMATCH = 'As senhas não coincidem';
const REUSED = 'Você não pode reutilizar uma senha anterior.';

// invite: primeiro acesso por convite. reset: quem já tem conta e esqueceu a senha (mesma tela, outro texto e outro destino).
const DEFAULT_EMAIL = 'joao.pereira+1@popstand.com';
const MODES = {
  invite: {
    title: 'Vamos configurar seu acesso', next: 'senha-definida',
    subtitle: (ctx) => t('Boas-vindas, {email}! Você foi convidado para a SkyeVantage como Administrador da unidade.').replace('{email}', ctx?.inviteEmail || DEFAULT_EMAIL),
  },
  reset: {
    title: 'Redefina sua senha', next: 'senha-redefinida',
    subtitle: (ctx) => t('Informe uma nova senha para {email}').replace('{email}', ctx?.resetEmail || DEFAULT_EMAIL),
  },
};

export function DefinirSenha({ go, ctx, mode = 'invite' }) {
  const cfg = MODES[mode];
  useLang();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [touched, setTouched] = useState(false); // depois da primeira digitação, os requisitos ficam verdes ou vermelhos
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const allMet = (v) => PASSWORD_RULES.every((r) => r.test(v));
  const check = (p = password, c = confirm) => ({
    password: !p ? 'Crie uma senha.' : !allMet(p) ? 'A senha ainda não cumpre todos os requisitos.' : '',
    confirm: !c ? 'Confirme sua senha.' : c !== p ? MISMATCH : '',
  });
  const onPassword = (v) => { setPassword(v); setTouched(true); if (errors.password || errors.confirm) setErrors(check(v, confirm)); };
  const onConfirm = (v) => { setConfirm(v); if (errors.confirm) setErrors((x) => ({ ...x, confirm: check(password, v).confirm })); };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const found = check();
    setTouched(true);
    setErrors(found);
    if (found.password || found.confirm) { (found.password ? passwordRef : confirmRef).current?.focus(); return; }
    setLoading(true);
    await wait();
    setLoading(false);
    if (password === SCENARIOS.reusedPassword) {
      setErrors({ password: REUSED, confirm: '' });
      return focusSoon(passwordRef);
    }
    go(cfg.next);
  };

  return (
    <AuthPage>
      <AuthCard title={t(cfg.title)} subtitle={cfg.subtitle(ctx)}>
        <form noValidate onSubmit={submit} aria-busy={loading} className="flex w-full flex-col gap-[var(--space-24)]">
          <div className="flex w-full flex-col gap-[var(--space-8)]">
            <div className="flex w-full flex-col gap-[var(--space-12)]">
              <PasswordField ref={passwordRef} label={t('Nova senha')} placeholder={t('Senha')} autoComplete="new-password" value={password} onChange={(e) => onPassword(e.target.value)} error={errors.password ? t(errors.password) : undefined} invalid={errors.confirm === MISMATCH && !errors.password} disabled={loading} />
              <PasswordField ref={confirmRef} label={t('Confirmar senha')} placeholder={t('Senha')} autoComplete="new-password" value={confirm} onChange={(e) => onConfirm(e.target.value)} error={errors.confirm ? t(errors.confirm) : undefined} disabled={loading} />
            </div>
            <Requirements rules={PASSWORD_RULES} value={password} touched={touched} spaced={!!errors.confirm} />
          </div>
          <Button type="submit" className="w-full" loading={loading}>{t('Definir senha')}</Button>
        </form>
      </AuthCard>
    </AuthPage>
  );
}
