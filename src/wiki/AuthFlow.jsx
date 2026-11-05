// Página da Wiki: o fluxo de autenticação (Figma: Authentication) e como acionar cada cenário no protótipo.
import { t, lang, useLang } from '../i18n.js';
import { SCENARIOS } from '../screens/auth/scenarios.js';

const tx = (o) => o[lang()];
const SCREENS_DOC = [
  { id: 'login', node: '325-6580', name: { pt: 'Login', en: 'Login' }, text: { pt: 'Entrada de quem já tem conta: e-mail, senha com botão de mostrar, link “Esqueceu sua senha?” e aviso de EULA e Termos.', en: 'Entry for people who already have an account: email, password with a show button, “Forgot your password?” link and EULA and Terms notice.' } },
  { id: 'esqueci-senha', node: '326-7751', name: { pt: 'Esqueci a senha', en: 'Forgot password' }, text: { pt: 'Pede o e-mail e envia o link de redefinição. Tem o link “Voltar ao login”.', en: 'Asks for the email and sends the reset link. Has a “Back to login” link.' } },
  { id: 'link-enviado', node: '326-7862', name: { pt: 'Link enviado', en: 'Password reset sent' }, text: { pt: 'Confirma o envio, mostrando o e-mail digitado.', en: 'Confirms the send, showing the typed email.' } },
  { id: 'email-convite', node: '319-9137', name: { pt: 'E-mail de convite', en: '[Email] Set a password' }, text: { pt: 'O e-mail que o novo usuário recebe, dentro do mockup de cliente de e-mail. O botão “Definir senha” abre a próxima tela.', en: 'The email a new user receives, inside the email client mockup. The “Set Password” button opens the next screen.' } },
  { id: 'definir-senha', node: '326-2', name: { pt: 'Definir senha', en: 'Set a password' }, text: { pt: 'Nova senha, confirmação e lista de requisitos que reage ao que se digita.', en: 'New password, confirmation and a requirements list that reacts to typing.' } },
  { id: 'senha-definida', node: '326-7846', name: { pt: 'Senha definida', en: 'Password set success' }, text: { pt: 'Confirma que a senha foi criada e leva ao login.', en: 'Confirms the password was created and leads to login.' } },
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
  [{ pt: 'Esqueci a senha', en: 'Forgot password' }, { pt: 'Enviar vazio ou com e-mail inválido', en: 'Submit empty or with an invalid email' }, { pt: 'Erro no campo e foco nele.', en: 'Field error and focus on it.' }],
  [{ pt: 'Esqueci a senha', en: 'Forgot password' }, { pt: 'Qualquer e-mail válido', en: 'Any valid email' }, { pt: 'Carrega e abre “Confira sua caixa de entrada!”. A resposta é a mesma exista a conta ou não, para não revelar quem tem cadastro.', en: 'Loads and opens “Check your inbox!”. The answer is the same whether the account exists or not, so it does not reveal who is registered.' }],
  [{ pt: 'Definir senha', en: 'Set a password' }, { pt: 'Começar a digitar a nova senha', en: 'Start typing the new password' }, { pt: 'Cada requisito fica verde (cumprido) ou vermelho (falta), na hora. Antes de digitar, ficam neutros.', en: 'Each requirement turns green (met) or red (missing), instantly. Before typing, they are neutral.' }],
  [{ pt: 'Definir senha', en: 'Set a password' }, { pt: 'Enviar com requisitos faltando', en: 'Submit with missing requirements' }, { pt: 'Erro “A senha ainda não cumpre todos os requisitos.” e foco no campo.', en: 'Error “Your password doesn’t meet all the requirements yet.” and focus on the field.' }],
  [{ pt: 'Definir senha', en: 'Set a password' }, { pt: 'Confirmação diferente da senha', en: 'Confirmation different from the password' }, { pt: 'Erro no campo de confirmação: “As senhas não são iguais.”', en: 'Error on the confirmation field: “The passwords don’t match.”' }],
  [{ pt: 'Definir senha', en: 'Set a password' }, { pt: `Senha ${SCENARIOS.leakedPassword} (cumpre os requisitos)`, en: `Password ${SCENARIOS.leakedPassword} (meets the requirements)` }, { pt: 'Aviso de erro “Escolha outra senha”: a senha apareceu em vazamentos.', en: 'Error banner “Choose a different password”: the password appeared in breaches.' }],
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
        <p className="st-body-sm">{t('Erro de campo: Input com error. Falha geral: Banner de erro. Bloqueio por tentativas: Banner de aviso. Carregando: Button com loading. Sucesso: cartão de confirmação (AuthSuccessCard) e aviso ao entrar no app.')}</p>
      </section>
    </div>
  );
}

export const AUTH_WIKI_PAGE = { id: 'fluxo-auth', label: 'Fluxo de autenticação', after: 'como', Component: () => <div className="dsx"><AuthFlowPage /></div> };
