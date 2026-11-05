# Projeto Studio

Este repositório usa o **Studio** (`studio-engine`): protótipo navegável, histórico, wiki do design system, inspetor e chat com o agente.

- Para começar o projeto, use a skill `studio-init` (em `.claude/skills/studio-init`). Ela pergunta o nome, a plataforma e o que o produto faz, troca as telas de exemplo e sobe o Studio.
- Responda no mesmo idioma em que a pessoa escrever (português do Brasil se for ambíguo), curto e direto, e explique o porquê de cada decisão.
- Telas ficam em `src/screens/` e são registradas em `src/screens/index.jsx`. A configuração está em `studio.config.json`.
- Comandos: `npm run dev` (servidor local), `npm run check` (confere o build), `npm run studio` (gera `dist/index.html`).
- Ao criar ou alterar tela, componente ou token, use a skill `design-governance` (`.claude/skills/design-governance`) e rode `npm run governance`: confere WCAG, Gestalt, heurísticas da NN/g e consistência do design system antes de commitar.
- Nunca dê push, publique ou crie repositório sem o "pode" da pessoa.
