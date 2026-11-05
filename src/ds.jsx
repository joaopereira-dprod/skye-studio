// O design system declara suas variáveis em :root, e o Studio também usa --neutral-100…900 (em HSL, e outros valores no tema escuro).
// Os dois conflitavam: no tema escuro as cores do design system viravam valores inválidos. Aqui as variáveis do design system
// ficam presas à classe .dsx, então só valem dentro das telas do projeto e da página da Wiki.
import { DSStyles } from 'skyevantage-design-system';

const raw = DSStyles().props.children;
const css = raw.replace(':root{', '.dsx{');

/** Variáveis de design que o CSS de um componente lê (as classes começam com os prefixos dados). */
export const tokensOf = (...prefixes) => {
  const found = new Set();
  for (const rule of raw.split('}')) {
    const [sel, body] = rule.split('{');
    if (!body || !prefixes.some((p) => new RegExp(`\\.${p}(?![a-z])`).test(sel))) continue;
    for (const m of body.matchAll(/var\((--[a-z0-9-]+)\)/g)) found.add(m[1]);
  }
  return [...found].sort();
};

export const DSScope = () => <style data-skyevantage-ds>{css}</style>;
