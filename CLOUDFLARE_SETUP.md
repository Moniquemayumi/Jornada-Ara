# Publicação no Cloudflare Pages + D1

1. No Cloudflare, crie um banco de dados D1 chamado **jornada-ara-ranking**.
2. Execute o SQL de `schema.sql` no console do banco (ou use `npx wrangler d1 execute jornada-ara-ranking --remote --file=./schema.sql` após autenticar).
3. Em **Workers & Pages > Create > Pages > Connect to Git**, conecte `Moniquemayumi/Jornada-Ara`, branch `main`.
4. Defina **Build command** = `npm run build` e **Build output directory** = `dist` (root directory vazia).
5. Em **Settings > Bindings > Add > D1**, variável **DB**, escolha **jornada-ara-ranking**. Configure também em preview se desejar. **Redeploy** após o binding.
6. Teste `https://SEU-PROJETO.pages.dev/api/ranking`. Esperado: `{"solo":[],"groups":[]}` antes de qualquer pontuação.
7. Termine uma jornada e verifique o ranking em outro dispositivo.

IMPORTANTE: o endereço antigo `jornada-ara-jogo.netlify.app` não é transferido para Cloudflare. Não precisa apagar o site antigo.

Segurança: o envio das pontuações ainda é baseado nos dados do navegador, sem confirmação criptográfica da partida, portanto NÃO é resistente a trapaças. Em competição oficial, precisa autenticação/verificação no servidor.
