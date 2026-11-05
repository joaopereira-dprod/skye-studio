import { Projetos } from './Projetos.jsx';
import { Leads } from './Leads.jsx';
import { Sistemas } from './Sistemas.jsx';
import { Orcamentos } from './Orcamentos.jsx';
import { Usuarios } from './Usuarios.jsx';
export const SCREENS = [
  { id: 'projetos', label: 'Projetos', group: 'Operação', Component: Projetos, figma: null },
  { id: 'leads', label: 'Leads e clientes', group: 'Operação', Component: Leads, figma: null },
  { id: 'orcamentos', label: 'Orçamentos', group: 'Operação', Component: Orcamentos, figma: null },
  { id: 'sistemas', label: 'Sistemas', group: 'Administração', Component: Sistemas, figma: null },
  { id: 'usuarios', label: 'Usuários', group: 'Administração', Component: Usuarios, figma: null },
];
import { NAV_STUBS } from '../components/Sidebar.jsx';
// Destinos do menu lateral que ainda não têm tela: o Studio mostra o aviso “Tela não desenhada”.
export const STUBS = NAV_STUBS;
