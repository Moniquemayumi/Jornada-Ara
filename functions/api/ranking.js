const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
const clean=v=>String(v??"").replace(/[<>\x00-\x1f]/g,"").trim().slice(0,50);
const dbOf=ctx=>ctx.env.DB;
export async function onRequestGet(ctx){
 if(!dbOf(ctx)) return json({error:"Banco D1 não conectado. Configure binding DB no Cloudflare Pages."},503);
 try{
  const rows=await ctx.env.DB.prepare("SELECT id, mode, label, players, points, created_at AS at FROM ranking_entries ORDER BY points DESC, created_at ASC LIMIT 200").all();
  const scores=(rows.results||[]).map(r=>({...r,players:JSON.parse(r.players||"[]")}));
  return json({solo:scores.filter(s=>s.mode==="solo").slice(0,50),groups:scores.filter(s=>s.mode!=="solo").slice(0,50)});
 }catch(e){console.error("ranking GET",e);return json({error:"Falha ao consultar ranking; verifique a migração do banco."},503)}
}
export async function onRequestPost(ctx){
 if(!dbOf(ctx))return json({error:"Banco D1 não conectado."},503);
 const size=Number(ctx.request.headers.get("content-length")||0);if(size>4096)return json({error:"Envio muito grande"},413);
 let p;try{const body=await ctx.request.text();if(body.length>4096)return json({error:"Envio muito grande"},413);p=JSON.parse(body)}catch{return json({error:"JSON inválido"},400)}
 const mode=p?.mode,points=p?.points,id=String(p?.id||"").replace(/[^\w-]/g,"").slice(0,80);
 const label=clean(p?.label),players=Array.isArray(p?.players)?p.players.map(clean):[];
 const expected=mode==="solo"?0:mode==="duo"?2:mode==="team"?3:-1;
 if(expected<0||!label||!Number.isSafeInteger(points)||points<1||points>5000000||id.length<8||players.length!==expected||players.some(v=>!v))return json({error:"Dados da partida inválidos"},400);
 try{
  await ctx.env.DB.prepare("INSERT OR IGNORE INTO ranking_entries (id,mode,label,players,points,created_at) VALUES (?,?,?,?,?,?)")
   .bind(id,mode,label,JSON.stringify(players),points,Date.now()).run();
  return json({ok:true});
 }catch(e){console.error("ranking POST",e);return json({error:"Falha ao salvar pontuação"},503)}
}
