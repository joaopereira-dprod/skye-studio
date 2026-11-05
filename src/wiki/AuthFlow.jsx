// Página da Wiki: o fluxo de autenticação (Figma: Authentication) e como acionar cada cenário no protótipo.
import { t, lang, useLang } from '../i18n.js';
import { SCENARIOS } from '../screens/auth/scenarios.js';

const tx = (o) => o[lang()];
const SCREENS_DOC = [
  { id: 'login', node: '325-6580', name: { pt: 'Login', en: 'Login' }, text: { pt: 'Entrada de quem já tem conta: e-mail, senha com botão de mostrar, link “Esqueceu sua senha?” e aviso de EULA e Termos.', en: 'Entry for people who already have an account: email, password with a show button, “Forgot your password?” link and EULA and Terms notice.' } },
  { id: 'esqueci-senha', node: '326-7751', name: { pt: 'Esqueci a senha', en: 'Forgot password' }, text: { pt: 'Para quem já tem conta e esqueceu a senha: pede o e-mail e envia o link de redefinição. Tem o link “Voltar ao login”.', en: 'For people who already have an account and forgot the password: asks for the email and sends the reset link. Has a “Back to login” link.' } },
  { id: 'link-enviado', node: '326-7862', name: { pt: 'Link enviado', en: 'Password reset sent' }, text: { pt: 'Confirma o envio, mostrando o e-mail digitado.', en: 'Confirms the send, showing the typed email.' } },
  { id: 'email-recuperar-senha', node: '8462-52205', name: { pt: 'E-mail de recuperação', en: '[Email] Forgot your password' }, text: { pt: 'O e-mail de recuperação no mockup de cliente de e-mail. O botão “Criar nova senha” abre o formulário de redefinição.', en: 'The recovery email in the email client mockup. The “Set new password” button opens the reset form.' } },
  { id: 'redefinir-senha', node: '8617-63962', name: { pt: 'Redefinir senha', en: 'Reset password' }, text: { pt: 'O mesmo formulário do primeiro acesso, com o título “Redefina sua senha” e o e-mail da conta.', en: 'The same form as first access, titled “Reset your password” and showing the account email.' } },
  { id: 'senha-redefinida', node: '8712-98998', name: { pt: 'Senha redefinida', en: 'Password reset success' }, text: { pt: 'Confirma que a senha foi redefinida e leva ao login.', en: 'Confirms the password was reset and leads to login.' } },
  { id: 'link-redefinicao-expirado', node: '8617-64330', name: { pt: 'Link de redefinição expirado', en: 'Reset link expired' }, text: { pt: 'Cartão de erro, sem botão: o link de redefinição venceu e a pessoa deve pedir um novo.', en: 'Error card with no button: the reset link expired and the person must ask for a new one.' } },
  { id: 'email-convite', node: '319-9137', name: { pt: 'E-mail de convite', en: '[Email] Set a password' }, text: { pt: 'O e-mail que o novo usuário recebe, dentro do mockup de cliente de e-mail. O botão “Definir senha” abre a próxima tela.', en: 'The email a new user receives, inside the email client mockup. The “Set Password” button opens the next screen.' } },
  { id: 'definir-senha', node: '326-2', name: { pt: 'Definir senha', en: 'Set a password' }, text: { pt: 'Primeiro acesso por convite: boas-vindas com o e-mail e o perfil, nova senha, confirmação e uma lista de requisitos que reage ao que se digita.', en: 'First access by invitation: welcome with the email and role, new password, confirmation and a requirements list that reacts to typing.' } },
  { id: 'senha-definida', node: '326-7846', name: { pt: 'Senha definida', en: 'Password set success' }, text: { pt: 'Confirma que a senha foi criada e leva ao login.', en: 'Confirms the password was created and leads to login.' } },
  { id: 'link-convite-expirado', node: '8531-54652', name: { pt: 'Link do convite expirado', en: 'Invite link expired' }, text: { pt: 'Cartão de erro, sem botão: o link do convite venceu e a pessoa deve procurar quem a convidou.', en: 'Error card with no button: the invite link expired and the person must reach out to whoever invited them.' } },
];

const FIGMA = 'https://www.figma.com/design/SPElEKzaDCu32XXersJofk/SkyeVantage-ERP---v2';

const ROWS = [
  [{ pt: 'Login', en: 'Login' }, { pt: 'Enviar com campos vazios', en: 'Submit with empty fields' }, { pt: 'Erro em cada campo (“Informe seu e-mail.”, “Informe sua senha.”) e o foco vai ao primeiro erro.', en: 'An error on each field (“Enter your email.”, “Enter your password.”) and focus moves to the first error.' }],
  [{ pt: 'Login', en: 'Login' }, { pt: 'E-mail sem formato válido, como “ana@”', en: 'Email in an invalid format, like “ana@”' }, { pt: 'Erro no campo: “Informe um e-mail válido.”', en: 'Field error: “Enter a valid email address.”' }],
  [{ pt: 'Login', en: 'Login' }, { pt: `E-mail ${SCENARIOS.loginOk.email} e senha ${SCENARIOS.loginOk.password}`, en: `Email ${SCENARIOS.loginOk.email} and password ${SCENARIOS.loginOk.password}` }, { pt: 'Carrega, avisa “Bem-vindo de volta” e abre o app em Projetos.', en: 'Loads, shows “Welcome back” and opens the app on Projects.' }],
  [{ pt: 'Login', en: 'Login' }, { pt: 'Qualquer outro e-mail e senha válidos', en: 'Any other valid email and password' }, { pt: 'Aviso de erro “E-mail ou senha incorretos”, com as tentativas que restam.', en: 'Error banner “Incorrect email or password”, with the attempts left.' }],
  [{ pt: 'Login', en: 'Login' }, { pt: `${SCENARIOS.maxAttempts} tentativas erradas seguidas`, en: `${SCENARIOS.maxAttempts} wrong attempts in a row` }, { pt: 'Aviso amarelo “Muitas tentativas” e o botão Entrar fica desabilitado. O link para redefinir a senha continua ativo.', en: 'Yellow banner “Too many attempts” and the Login button is disabled. The reset password link stays active.' }],
  [{ pt: 'Login', en: 'Login' }, { pt: `E-mail ${SCENARIOS.loginDisabled.email}`, en: `Email ${SCENARIOS.loginDisabled.email}` }, { pt: 'Aviso de erro “Conta desativada”.', en: 'Error banner “Account disabled”.' }],
  [{ pt: 'Login e Esqueci a senha', en: 'Login and Forgot password' }, { pt: `E-mail ${SCENARIOS.offline.email}`, en: `Email ${SCENARIOS.offline.email}` }, { pt: 'Aviso de erro de conexão (login) ou de envio (esqueci a senha).', en: 'Connection error banner (login) or send error banner (forgot password).' }],
  [{ pt: 'Esqueci a senha', en: 'Forgot password' }, { pt: 'Enviar vazio ou com e-mail inválido', en: 'Submit empty or with an invalid email' }, { pt: 'Borda vermelha e a mensagem “Informe um e-mail válido.” sob o campo, com o foco nele.', en: 'Red border and the message “Please enter a valid email” under the field, with focus on it.' }],
  [{ pt: 'Esqueci a senha', en: 'Forgot password' }, { pt: 'Qualquer e-mail válido', en: 'Any valid email' }, { pt: 'Carrega e abre “Confira sua caixa de entrada!”. A resposta é a mesma exista a conta ou não, para não revelar quem tem cadastro.', en: 'Loads and opens “Check your inbox!”. The answer is the same whether the account exists or not, so it does not reveal who is registered.' }],
  [{ pt: 'Esqueci a senha', en: 'Forgot password' }, { pt: 'Enviar o e-mail com um erro de digitação, como “example@email,com”', en: 'Submit the email with a typo, like “example@email,com”' }, { pt: 'Mesmo estado de erro do Figma: campo vermelho, 2px, e “Informe um e-mail válido.”', en: 'Same error state as the Figma: red 2px field and “Please enter a valid email”.' }],
  [{ pt: 'Redefinir senha', en: 'Reset password' }, { pt: 'As mesmas regras de “Definir senha”: requisitos ao vivo, senhas diferentes, senha que a conta já usa', en: 'The same rules as “Set a password”: live requirements, different passwords, a password the account already uses' }, { pt: 'Mesmos erros e mesmo comportamento. Ao concluir, abre “Tudo pronto!” com o texto de redefinição.', en: 'Same errors and behavior. On finish, it opens “You’re all set!” with the reset wording.' }],
  [{ pt: 'Link de redefinição expirado', en: 'Reset link expired' }, { pt: 'Abrir a tela pela lista de telas do Studio', en: 'Open the screen from the Studio screen list' }, { pt: 'Cartão de erro com o nome de quem pedir um novo link. Em um sistema real, aparece no lugar do formulário quando o link já venceu.', en: 'Error card naming who to ask for a new link. In a real system, it replaces the form when the link has already expired.' }],
  [{ pt: 'Definir senha', en: 'Set a password' }, { pt: 'Começar a digitar a nova senha', en: 'Start typing the new password' }, { pt: 'Cada requisito fica verde (cumprido) ou vermelho (falta), na hora. Antes de digitar, ficam neutros.', en: 'Each requirement turns green (met) or red (missing), instantly. Before typing, they are neutral.' }],
  [{ pt: 'Definir senha', en: 'Set a password' }, { pt: 'Enviar com requisitos faltando', en: 'Submit with missing requirements' }, { pt: 'Erro “A senha ainda não cumpre todos os requisitos.” e foco no campo.', en: 'Error “Your password doesn’t meet all the requirements yet.” and focus on the field.' }],
  [{ pt: 'Definir senha', en: 'Set a password' }, { pt: 'Confirmação diferente da senha', en: 'Confirmation different from the password' }, { pt: 'Os dois campos ficam com borda vermelha e a mensagem “As senhas não coincidem” aparece sob a confirmação.', en: 'Both fields get a red border and the message “Passwords do not match” appears under the confirmation.' }],
  [{ pt: 'Definir senha', en: 'Set a password' }, { pt: `Senha ${SCENARIOS.reusedPassword} (a que a conta já usa)`, en: `Password ${SCENARIOS.reusedPassword} (the one the account already uses)` }, { pt: 'Só o campo da nova senha fica vermelho, com “Você não pode reutilizar uma senha anterior.”', en: 'Only the new password field turns red, with “You cannot reuse a previous password”.' }],
  [{ pt: 'Link do convite expirado', en: 'Invite link expired' }, { pt: 'Abrir a tela pela lista de telas do Studio', en: 'Open the screen from the Studio screen list' }, { pt: 'Cartão de erro com o nome de quem convidou. Em um sistema real, esta tela aparece no lugar do formulário quando o link do convite já venceu.', en: 'Error card with the name of whoever invited. In a real system, this screen replaces the form when the invite link has already expired.' }],
  [{ pt: 'Definir senha', en: 'Set a password' }, { pt: 'Qualquer senha válida, igual na confirmação', en: 'Any valid password, matching the confirmation' }, { pt: 'Carrega e abre “Tudo pronto!”.', en: 'Loads and opens “You’re all set!”.' }],
];

export function AuthFlowPage() {
  useLang();
  return (
    <div className="component">
      <header className="chead">
        <div className="row"><span className="st-label-md muted">{t('FLUXO')}</span></div>
        <h2 className="st-headline-bold-40">{t('Fluxo de autenticação')}</h2>
        <p className="st-body-md">{t('Seis telas: login, recuperação de senha e primeiro acesso por convite. Tudo é montado com componentes e tokens do design system SkyeVantage. O protótipo não tem servidor, então o resultado depende do que se digita.')}</p>
      </header>
      <section>
        <h4>{t('Telas')}</h4>
        <div className="tablewrap"><table className="props"><thead><tr><th>{t('Tela')}</th><th>{t('O que faz')}</th><th>Figma</th></tr></thead>
          <tbody>{SCREENS_DOC.map((s) => (
            <tr key={s.id}><td>{tx(s.name)}</td><td>{tx(s.text)}</td><td><a href={`${FIGMA}?node-id=${s.node}`} target="_blank" rel="noreferrer">{t('Abrir no Figma ↗')}</a></td></tr>
          ))}</tbody></table></div>
      </section>
      <section>
        <h4>{t('Cenários e como acioná-los')}</h4>
        <p className="st-body-sm muted">{t('Dados de uma conta válida para entrar')}: <span className="mono">{SCENARIOS.loginOk.email}</span> · <span className="mono">{SCENARIOS.loginOk.password}</span></p>
        <div className="tablewrap"><table className="props"><thead><tr><th>{t('Tela')}</th><th>{t('Faça')}</th><th>{t('Resultado')}</th></tr></thead>
          <tbody>{ROWS.map((r, i) => <tr key={i}><td>{tx(r[0])}</td><td>{tx(r[1])}</td><td>{tx(r[2])}</td></tr>)}</tbody></table></div>
      </section>
      <section>
        <h4>{t('Feedbacks usados')}</h4>
        <p className="st-body-sm">{t('Erro de campo: Input com error (ou só a borda, quando a mensagem está no campo vizinho). Falha geral: Banner de erro. Bloqueio por tentativas: Banner de aviso. Carregando: Button com loading. Sucesso: cartão de confirmação (AuthSuccessCard) e aviso ao entrar no app.')}</p>
      </section>
    </div>
  );
}

export const AUTH_WIKI_PAGE = { id: 'fluxo-auth', label: 'Fluxo de autenticação', after: 'como', Component: () => <div className="dsx"><AuthFlowPage /></div> };
