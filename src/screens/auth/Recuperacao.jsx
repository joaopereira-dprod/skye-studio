// Fluxo "Esqueci a senha" (Figma: Forgot Password), depois do e-mail enviado: e-mail de recuperação, formulário de nova senha,
// confirmação e link vencido. O formulário é o mesmo do primeiro acesso (DefinirSenha), em outro modo.
import { Button } from 'skyevantage-design-system';
import { t, useLang } from '../../i18n.js';
import { DSScope } from '../../ds.jsx';
import { AuthHeader, AuthPage, AuthSuccessCard } from '../../components/auth/Auth.jsx';
import { EmailClient } from '../../components/auth/EmailClient.jsx';
import { DefinirSenha } from './DefinirSenha.jsx';
import { SCENARIOS } from './scenarios.js';

export function EmailRecuperarSenha({ go, ctx }) {
  useLang();
  return (
    <div className="dsx sv h-full">
      <DSScope />
      <EmailClient subject={t('Recupere sua senha - SkyeVantage')}>
        <AuthHeader gap="var(--space-24)" width={500}
          title={t('João, recupere sua senha.')}
          subtitle={t('Parece que você perdeu sua senha? Estamos aqui para ajudar: clique abaixo para criar uma nova senha.')} />
        <Button onClick={() => go('redefinir-senha', { resetEmail: ctx?.email || undefined })}>{t('Criar nova senha')}</Button>
      </EmailClient>
    </div>
  );
}

export const RedefinirSenha = (props) => <DefinirSenha {...props} mode="reset" />;

export function SenhaRedefinida({ go }) {
  useLang();
  return (
    <AuthPage>
      <AuthSuccessCard title={t('Tudo pronto!')} text={t('Sua senha foi redefinida. Entre para começar a usar sua conta.')} cta={t('Ir para o login')} onCta={() => go('login', undefined, { root: true })} />
    </AuthPage>
  );
}

/** Link de redefinição vencido: cartão de erro, sem botão. */
export function LinkRedefinicaoExpirado() {
  useLang();
  return (
    <AuthPage>
      <AuthSuccessCard tone="error" title={t('O link de redefinição de senha expirou')} text={t('Este link de redefinição não é mais válido. Peça um novo link a {name}.').replace('{name}', SCENARIOS.resetSupport)} />
    </AuthPage>
  );
}
