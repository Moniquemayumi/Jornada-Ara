# Jornada ARA 🎮

Jogo web com versões para computador e celular, cinco áreas do Grupo ARA e a fase Corporativo.

## Arquivos
- `index.html`: direciona para mobile ou desktop conforme o dispositivo.
- `mobile.html` e `desktop.html`: jogos completos.
- `testar-ranking.html`: diagnóstico do ranking.
- `netlify/functions/ranking.js`: API do ranking (individuais e grupos).
- `netlify.toml` e `package.json`: configuração de build e funções do Netlify.

## Publicação no Netlify
**Importante:** mantenha o site existente `jornada-ara-jogo.netlify.app`. No painel do Netlify, conecte **este repositório ao projeto existente**, não crie outro site.
- Publish directory: `.`
- Functions directory: `netlify/functions`
- Dependências: instaladas a partir de `package.json`

O Netlify pode bloquear novos deploys se os créditos da equipe estiverem esgotados.

## Verificação
Após um deploy bem-sucedido, abra `https://jornada-ara-jogo.netlify.app/testar-ranking.html` e `/.netlify/functions/ranking`. A API deve responder JSON com `solo` e `groups`. Teste uma pontuação em um celular e confira no computador.

O ranking não possui autenticação ou verificação criptográfica das partidas. Para uma competição oficial com prevenção a fraudes, será preciso fortalecer o servidor.

## Status
Arquivos do jogo e API enviados ao GitHub. **Deploy no Netlify ainda não concluído.**
