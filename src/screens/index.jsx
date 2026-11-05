import { Projetos } from './Projetos.jsx';
import { Leads } from './Leads.jsx';
import { Sistemas } from './Sistemas.jsx';
import { Orcamentos } from './Orcamentos.jsx';
import { Usuarios } from './Usuarios.jsx';
import { Login } from './auth/Login.jsx';
import { EsqueciSenha } from './auth/EsqueciSenha.jsx';
import { DefinirSenha } from './auth/DefinirSenha.jsx';
import { SenhaDefinida, LinkEnviado, LinkConviteExpirado } from './auth/Confirmacoes.jsx';
import { EmailConvite } from './auth/EmailConvite.jsx';
export const SCREENS = [
  // Autenticação (Figma: Authentication). O protótipo abre no login.
  { id: 'login', label: 'Login', group: 'Autenticação', Component: Login, figma: '325-6580' },
  { id: 'esqueci-senha', label: 'Esqueci a senha', group: 'Autenticação', Component: EsqueciSenha, figma: '326-7751' },
  { id: 'link-enviado', label: 'Link enviado', group: 'Autenticação', Component: LinkEnviado, figma: '326-7862' },
  { id: 'email-convite', label: 'E-mail de convite', group: 'Autenticação', Component: EmailConvite, figma: '319-9137' },
  { id: 'definir-senha', label: 'Definir senha', group: 'Autenticação', Component: DefinirSenha, figma: '326-2' },
  { id: 'senha-definida', label: 'Senha definida', group: 'Autenticação', Component: SenhaDefinida, figma: '326-7846' },
  { id: 'link-convite-expirado', label: 'Link do convite expirado', group: 'Autenticação', Component: LinkConviteExpirado, figma: '8531-54652' },
  { id: 'projetos', label: 'Projetos', group: 'Operação', Component: Projetos, figma: null },
  { id: 'leads', label: 'Leads e clientes', group: 'Operação', Component: Leads, figma: null },
  { id: 'orcamentos', label: 'Orçamentos', group: 'Operação', Component: Orcamentos, figma: null },
  { id: 'sistemas', label: 'Sistemas', group: 'Administração', Component: Sistemas, figma: null },
  { id: 'usuarios', label: 'Usuários', group: 'Administração', Component: Usuarios, figma: null },
];
import { NAV_STUBS } from '../components/Sidebar.jsx';
// Destinos do menu lateral que ainda não têm tela: o Studio mostra o aviso “Tela não desenhada”.
export const STUBS = [...NAV_STUBS, 'eula', 'termos'];
