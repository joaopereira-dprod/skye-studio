// O design system declara suas variáveis em :root, e o Studio também usa --neutral-100…900 (em HSL, e outros valores no tema escuro).
// Os dois conflitavam: no tema escuro as cores do design system viravam valores inválidos. Aqui as variáveis do design system
// ficam presas à classe .dsx, então só valem dentro das telas do projeto e da página da Wiki.
import { DSStyles } from 'skyevantage-design-system';

const raw = DSStyles().props.children;

// Escala de espaçamento do projeto: todo múltiplo de 4 até 96, igual à coleção Spacing do Figma. O pacote ainda traz 2, 6 e 10 e não traz 28, 36, 44…
// Aqui 2 e 6 viram 4 e 10 vira 8 (arredondado para baixo), e os degraus que faltam são acrescentados. O bloco vai por último para vencer o do pacote.
export const SPACE = Array.from({ length: 24 }, (_, i) => (i + 1) * 4);
const SNAPPED = { 2: 4, 6: 4, 10: 8 };
const spaceOverride = '\n.dsx{' + [...Object.entries(SNAPPED).map(([k, v]) => `--space-${k}:${v}px`), ...SPACE.map((n) => `--space-${n}:${n}px`)].join(';') + '}';
const css = raw.replace(':root{', '.dsx{') + spaceOverride;

const CANON = { '--space-2': '--space-4', '--space-6': '--space-4', '--space-10': '--space-8' }; // nomes antigos que hoje valem outro degrau

/** Variáveis de design que o CSS de um componente lê (as classes começam com os prefixos dados). */
export const tokensOf = (...prefixes) => {
  const found = new Set();
  for (const rule of raw.split('}')) {
    const [sel, body] = rule.split('{');
    if (!body || !prefixes.some((p) => new RegExp(`\\.${p}(?![a-z])`).test(sel))) continue;
    for (const m of body.matchAll(/var\((--[a-z0-9-]+)\)/g)) found.add(CANON[m[1]] || m[1]);
  }
  return [...found].sort();
};

export const DSScope = () => <style data-skyevantage-ds>{css}</style>;
