# Modelo do Studio

Ponto de partida para um projeto com o Studio: protótipo navegável (mobile ou web), histórico de commits e PRs, wiki do design system, inspetor, comentários e chat com o agente.

## Como usar

1. Clique em **Use this template → Create a new repository** (botão verde, no topo desta página). Dê um nome e escolha Private.
2. Abra o repositório novo numa sessão do Claude Code (no computador, no tablet ou na nuvem) e peça: **“quero começar um projeto com o Studio”**.
3. O agente faz algumas perguntas (nome, plataforma, o que o produto faz), troca as telas de exemplo pelas do seu produto e sobe o Studio.

Quem nunca usou GitHub ou terminal encontra o passo a passo no próprio Studio: aba Wiki, em “Como usar”.

**Se você recebeu isto como zip:** descompacte numa pasta vazia, **fora de qualquer outro projeto**, e abra a própria pasta `studio-template` no Claude Code. A skill cria o repositório no GitHub por você, com o seu aval.

## O que vem aqui

- `.claude/skills/studio-init/`: a skill que conduz o começo do projeto.
- `CLAUDE.md`: instruções para o agente.
- `studio.config.json` e `studio.project.js`: configuração e ponte com o motor.
- `src/screens/`: duas telas de exemplo para apagar.
- `vendor/studio-engine-0.3.8.tgz`: o motor do Studio, empacotado. Nenhum login nem repositório extra é necessário para instalar.
- `package.json`: aponta para esse arquivo (`studio-engine`).

Precisa de Node 18 ou mais novo para rodar localmente (`npm install` e `npm run dev`).
