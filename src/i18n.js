// Idioma das telas do projeto. Acompanha o botão PT/EN do Studio, que grava o idioma em <html lang>.
// A chave é o texto em português; o inglês vem de studio.i18n.json. Texto sem tradução fica em português.
import { useSyncExternalStore } from 'react';
import i18n from '../studio.i18n.json';

const EN = i18n.en || {};
const isEn = () => typeof document !== 'undefined' && document.documentElement.lang === 'en';

const subscribe = (cb) => {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  return () => obs.disconnect();
};

/** Faz o componente renderizar de novo quando o idioma muda. */
export const useLang = () => useSyncExternalStore(subscribe, () => (isEn() ? 'en' : 'pt'));

export const t = (pt) => (isEn() ? EN[pt] ?? pt : pt);

/** Idioma atual ('pt' | 'en'), para textos que já vêm nos dois idiomas. */
export const lang = () => (isEn() ? 'en' : 'pt');
