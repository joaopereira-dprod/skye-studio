import { DS_WIKI_PAGES } from './src/wiki/DesignSystem.jsx';
export { default as HISTORY } from './data/history.json';
export { SCREENS, STUBS } from './src/screens/index.jsx';
export const TOKENS = { version: '0', color: {}, font: {}, type: {}, space: {}, radius: {}, shadow: {} };
export const DESIGN = { audit: null, screens: {} };
export const DOCS = [];
export const FIGMA_FILE = null;
export const TabBar = () => null;
export const PortalContainer = ({ children }) => children;
export const WIKI_PAGES = DS_WIKI_PAGES; // Tokens, Estilos de texto e Componentes, com itens filhos na barra lateral (precisa do studio-engine 0.3.11)
