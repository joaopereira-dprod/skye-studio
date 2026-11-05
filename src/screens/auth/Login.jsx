import { useRef, useState } from 'react';
import { Button, Input, Banner } from 'skyevantage-design-system';
import { t, useLang } from '../../i18n.js';
import { AuthPage, AuthCard, PasswordField, InlineLink, isEmail, wait, focusSoon } from '../../components/auth/Auth.jsx';
import { SCENARIOS } from './scenarios.js';

export function Login({ go, notify }) {
  useLang();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const locked = attempts >= SCENARIOS.maxAttempts;

  const check = (e = email, p = password) => ({
    email: !e.trim() ? 'Informe seu e-mail.' : !isEmail(e) ? 'Informe um e-mail válido.' : '',
    password: !p ? 'Informe sua senha.' : '',
  });
  const onEmail = (v) => { setEmail(v); if (errors.email) setErrors((x) => ({ ...x, email: check(v, password).email })); };
  const onPassword = (v) => { setPassword(v); if (errors.password) setErrors((x) => ({ ...x, password: check(email, v).password })); };

  const submit = async (e) => {
    e.preventDefault();
    if (loading || locked) return;
    const found = check();
    setErrors(found);
    setBanner(null);
    if (found.email || found.password) { (found.email ? emailRef : passwordRef).current?.focus(); return; }
    setLoading(true);
    await wait();
    setLoading(false);
    const mail = email.trim().toLowerCase();
    if (mail === SCENARIOS.offline.email) { focusSoon(emailRef); return setBanner({ color: 'error', title: 'Sem conexão', text: 'Não foi possível falar com o servidor. Verifique sua internet e tente de novo.' }); }
    if (mail === SCENARIOS.loginDisabled.email) { focusSoon(emailRef); return setBanner({ color: 'error', title: 'Conta desativada', text: 'Sua conta foi desativada. Fale com o administrador da sua franquia.' }); }
    if (mail === SCENARIOS.loginOk.email && password === SCENARIOS.loginOk.password) {
      notify('success', t('Bem-vindo de volta'), t('Login feito com sucesso.'));
      return go('projetos', { email: mail }, { root: true });
    }
    const n = attempts + 1;
    setAttempts(n);
    if (n < SCENARIOS.maxAttempts) focusSoon(passwordRef);
    setBanner(n >= SCENARIOS.maxAttempts
      ? { color: 'warning', title: 'Muitas tentativas', text: 'Por segurança, o login ficou bloqueado por 5 minutos. Você pode redefinir sua senha agora.' }
      : { color: 'error', title: 'E-mail ou senha incorretos', text: 'Confira os dados e tente de novo. Restam {n} tentativa(s).', n: SCENARIOS.maxAttempts - n });
  };

  return (
    <AuthPage>
      <AuthCard title={t('Bem-vindo de volta')}>
        <form noValidate onSubmit={submit} aria-busy={loading} className="flex w-full flex-col gap-[var(--space-24)]">
          {banner && <Banner color={banner.color} title={t(banner.title)}>{t(banner.text).replace('{n}', banner.n ?? '')}</Banner>}
          <div className="flex w-full flex-col gap-[var(--space-12)]">
            <Input ref={emailRef} label={t('E-mail')} type="email" autoComplete="username" placeholder="example@email.com" value={email} onChange={(e) => onEmail(e.target.value)} error={errors.email ? t(errors.email) : undefined} disabled={loading} />
            <PasswordField ref={passwordRef} label={t('Senha')} placeholder={t('Senha')} value={password} onChange={(e) => onPassword(e.target.value)} error={errors.password ? t(errors.password) : undefined} disabled={loading} />
            <div className="flex w-full justify-end">
              <Button type="button" variant="link" size="sm" className="!px-[var(--space-12)] underline" onClick={() => go('esqueci-senha', { email })}>{t('Esqueceu sua senha?')}</Button>
            </div>
          </div>
          <Button type="submit" className="w-full" loading={loading} disabled={locked}>{t('Entrar')}</Button>
          <p className="t-body-xs m-0 text-center text-[color:var(--text-secondary)]">
            {t('Ao criar uma conta ou entrar neste sistema, você concorda com o')}{' '}
            <InlineLink onClick={() => go('eula')}>EULA</InlineLink> {t('e os')} <InlineLink onClick={() => go('termos')}>{t('Termos de Serviço')}</InlineLink>.
          </p>
        </form>
      </AuthCard>
    </AuthPage>
  );
}
