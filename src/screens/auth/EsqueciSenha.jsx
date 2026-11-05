import { useRef, useState } from 'react';
import { Button, Input, Banner } from 'skyevantage-design-system';
import { t, useLang } from '../../i18n.js';
import { AuthPage, AuthCard, isEmail, wait, focusSoon } from '../../components/auth/Auth.jsx';
import { SCENARIOS } from './scenarios.js';

export function EsqueciSenha({ go, ctx }) {
  useLang();
  const [email, setEmail] = useState(ctx?.email || '');
  const [error, setError] = useState('');
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const check = (v) => (!v.trim() ? 'Informe seu e-mail.' : !isEmail(v) ? 'Informe um e-mail válido.' : '');

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const found = check(email);
    setError(found);
    setBanner(null);
    if (found) return ref.current?.focus();
    setLoading(true);
    await wait();
    setLoading(false);
    if (email.trim().toLowerCase() === SCENARIOS.offline.email) {
      focusSoon(ref);
      return setBanner({ color: 'error', title: 'Não foi possível enviar', text: 'Tivemos um problema ao enviar o e-mail. Tente de novo em instantes.' });
    }
    go('link-enviado', { email: email.trim() });
  };

  return (
    <AuthPage>
      <AuthCard title={t('Sem problemas, acontece!')} subtitle={t('Informe seu e-mail e enviaremos um link para redefinir sua senha.')}>
        <form noValidate onSubmit={submit} aria-busy={loading} className="flex w-full flex-col gap-[var(--space-24)]">
          {banner && <Banner color={banner.color} title={t(banner.title)}>{t(banner.text)}</Banner>}
          <Input ref={ref} label={t('E-mail')} type="email" autoComplete="email" placeholder="example@email.com" value={email}
            onChange={(e) => { setEmail(e.target.value); if (error) setError(check(e.target.value)); }} error={error ? t(error) : undefined} disabled={loading} />
          <div className="flex w-full flex-col items-center gap-[var(--space-12)]">
            <Button type="submit" className="w-full" loading={loading}>{t('Redefinir senha')}</Button>
            <Button type="button" variant="link" size="sm" className="!px-[var(--space-12)] underline" onClick={() => go('login', undefined, { root: true })}>{t('Voltar ao login')}</Button>
          </div>
        </form>
      </AuthCard>
    </AuthPage>
  );
}
