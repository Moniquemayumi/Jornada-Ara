# Jornada ARA 🎮

Jogo educativo do Grupo ARA, com fases Têxtil, Agrícola, Hotéis, Empreendimentos, Energia e Corporativo.

## Situação de publicação
O backend do ranking está no repositório em `netlify/functions/ranking.js`, com dependência `@netlify/blobs` no `package.json` e configuração em `netlify.toml`.

**Ainda faltam os arquivos grandes do jogo:** `index.html`, `mobile.html`, `desktop.html` e recursos visuais. Não vincule este repositório ao site em produção antes de adicioná-los.

## Publicação
1. Envie os arquivos do jogo para a raiz deste repositório.
2. No Netlify, abra o projeto existente jornada-ara-jogo e conecte este repositório em Build & deploy / Continuous deployment.
3. Confirme Publish directory = `.` e Functions directory = `netlify/functions`.
4. Faça o deploy e teste `/.netlify/functions/ranking`. O retorno esperado é JSON com listas `solo` e `groups`.
5. Teste uma pontuação em um celular e veja se aparece em outro dispositivo.

O ranking ainda não valida pontuações obtidas no cliente; não é à prova de fraudes.
