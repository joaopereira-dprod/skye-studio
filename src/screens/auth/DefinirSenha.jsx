import { useRef, useState } from 'react';
import { Button, Banner } from 'skyevantage-design-system';
import { t, useLang } from '../../i18n.js';
import { AuthPage, AuthCard, PasswordField, Requirements, PASSWORD_RULES, wait, focusSoon } from '../../components/auth/Auth.jsx';
import { SCENARIOS } from './scenarios.js';

export function DefinirSenha({ go }) {
  useLang();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [touched, setTouched] = useState(false); // depois da primeira digitação, os requisitos ficam verdes ou vermelhos
  const [errors, setErrors] = useState({});
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const allMet = (v) => PASSWORD_RULES.every((r) => r.test(v));
  const check = (p = password, c = confirm) => ({
    password: !p ? 'Crie uma senha.' : !allMet(p) ? 'A senha ainda não cumpre todos os requisitos.' : '',
    confirm: !c ? 'Confirme sua senha.' : c !== p ? 'As senhas não são iguais.' : '',
  });
  const onPassword = (v) => { setPassword(v); setTouched(true); setBanner(null); if (errors.password || errors.confirm) setErrors(check(v, confirm)); };
  const onConfirm = (v) => { setConfirm(v); if (errors.confirm) setErrors((x) => ({ ...x, confirm: check(password, v).confirm })); };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const found = check();
    setTouched(true);
    setErrors(found);
    setBanner(null);
    if (found.password || found.confirm) { (found.password ? passwordRef : confirmRef).current?.focus(); return; }
    setLoading(true);
    await wait();
    setLoading(false);
    if (password === SCENARIOS.leakedPassword) {
      setBanner({ color: 'error', title: 'Escolha outra senha', text: 'Essa senha apareceu em vazamentos de dados. Use uma senha que só você conheça.' });
      return focusSoon(passwordRef);
    }
    go('senha-definida');
  };

  return (
    <AuthPage>
      <AuthCard title={t('Vamos configurar seu acesso')} subtitle={t('Crie uma senha para começar a usar sua conta.')}>
        <form noValidate onSubmit={submit} aria-busy={loading} className="flex w-full flex-col gap-[var(--space-24)]">
          {banner && <Banner color={banner.color} title={t(banner.title)}>{t(banner.text)}</Banner>}
          <div className="flex w-full flex-col gap-[var(--space-8)]">
            <div className="flex w-full flex-col gap-[var(--space-12)]">
              <PasswordField ref={passwordRef} label={t('Nova senha')} placeholder={t('Senha')} autoComplete="new-password" value={password} onChange={(e) => onPassword(e.target.value)} error={errors.password ? t(errors.password) : undefined} disabled={loading} />
              <PasswordField ref={confirmRef} label={t('Confirmar senha')} placeholder={t('Senha')} autoComplete="new-password" value={confirm} onChange={(e) => onConfirm(e.target.value)} error={errors.confirm ? t(errors.confirm) : undefined} disabled={loading} />
            </div>
            <Requirements rules={PASSWORD_RULES} value={password} touched={touched} />
          </div>
          <Button type="submit" className="w-full" loading={loading}>{t('Definir senha')}</Button>
        </form>
      </AuthCard>
    </AuthPage>
  );
}
