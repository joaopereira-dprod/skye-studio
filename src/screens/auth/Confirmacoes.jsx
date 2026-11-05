import { t, useLang } from '../../i18n.js';
import { AuthPage, AuthSuccessCard } from '../../components/auth/Auth.jsx';

export function SenhaDefinida({ go }) {
  useLang();
  return (
    <AuthPage>
      <AuthSuccessCard title={t('Tudo pronto!')} text={t('Sua senha foi criada. Entre para começar a usar sua conta.')} cta={t('Ir para o login')} onCta={() => go('login', undefined, { root: true })} />
    </AuthPage>
  );
}

export function LinkEnviado({ go, ctx }) {
  useLang();
  const email = ctx?.email || 'example@email.com';
  return (
    <AuthPage>
      <AuthSuccessCard title={t('Confira sua caixa de entrada!')} text={t('Enviamos um link para redefinir a senha para {email}.').replace('{email}', email)} cta={t('Ir para o login')} onCta={() => go('login', undefined, { root: true })} />
    </AuthPage>
  );
}
