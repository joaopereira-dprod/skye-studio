// O design system declara suas variáveis em :root, e o Studio também usa --neutral-100…900 (em HSL, e outros valores no tema escuro).
// Os dois conflitavam: no tema escuro as cores do design system viravam valores inválidos. Aqui as variáveis do design system
// ficam presas à classe .dsx, então só valem dentro das telas do projeto e da página da Wiki.
import { DSStyles } from 'skyevantage-design-system';

const css = DSStyles().props.children.replace(':root{', '.dsx{');

export const DSScope = () => <style data-skyevantage-ds>{css}</style>;
