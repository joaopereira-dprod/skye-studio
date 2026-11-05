import { Button } from 'skyevantage-design-system';
import { t, useLang } from '../../i18n.js';
import { DSScope } from '../../ds.jsx';
import { AuthHeader } from '../../components/auth/Auth.jsx';
import { EmailClient } from '../../components/auth/EmailClient.jsx';

export function EmailConvite({ go }) {
  useLang();
  return (
    <div className="dsx sv h-full">
      <DSScope />
      <EmailClient subject={t('Bem-vindo à SkyeVantage!')}>
        <AuthHeader gap="var(--space-24)" width={500}
          title={t('João, você foi convidado para a SkyeVantage!')}
          subtitle={t('Seu e-mail {email} foi convidado como novo usuário. Crie sua senha pelo link abaixo para começar.').replace('{email}', 'example@email.com')} />
        <Button onClick={() => go('definir-senha')}>{t('Definir senha')}</Button>
      </EmailClient>
    </div>
  );
}
