import { t, useLang } from '../../i18n.js';
import { AuthPage, AuthSuccessCard } from '../../components/auth/Auth.jsx';
import { SCENARIOS } from './scenarios.js';

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

/** Link do convite vencido: cartão de erro, sem botão. Quem convidou é quem a pessoa deve procurar. */
export function LinkConviteExpirado({ ctx }) {
  useLang();
  return (
    <AuthPage>
      <AuthSuccessCard tone="error" title={t('Este link expirou')} text={t('Este link não é mais válido. Peça um novo a {name}.').replace('{name}', ctx?.invitedBy || SCENARIOS.invitedBy)} />
    </AuthPage>
  );
}
