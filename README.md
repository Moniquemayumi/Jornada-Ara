# Jornada ARA 🎮

Jogo de plataforma 2D do Grupo ARA, com versões mobile e desktop, acessibilidade e ranking individual/grupos.

## Cloudflare Pages + D1

O repositório foi preparado para **Cloudflare Pages Functions** usando o banco **Cloudflare D1**.

- Site: `index.html`, `mobile.html`, `desktop.html`
- API: `functions/api/ranking.js` — endpoint `/api/ranking`
- Banco: `schema.sql`
- Build: `npm run build`, saída `dist`
- Instruções: [CLOUDFLARE_SETUP.md](./CLOUDFLARE_SETUP.md)

**Ainda é necessário criar o banco D1 na sua conta, executar `schema.sql`, vincular o D1 à variável `DB` no projeto Pages e fazer o deploy.** O GitHub está atualizado, mas a hospedagem Cloudflare ainda não foi ativada.

O ranking usa pontuações enviadas pelo navegador e ainda não tem verificação antifraude de partidas.

## Netlify (legado)

Os arquivos `netlify.toml` e `netlify/functions/ranking.js` continuam no repositório como referência da antiga implantação; o jogo agora usa o endpoint Cloudflare.
