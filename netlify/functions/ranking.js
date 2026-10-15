const { getStore } = require('@netlify/blobs');
const headers = {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'};
const answer = (statusCode, data) => ({statusCode, headers, body:JSON.stringify(data)});
const clean = (v) => String(v || '').replace(/[<>\x00-\x1f]/g, '').trim().slice(0,32);
exports.handler = async (event) => {
  try {
    if (!['GET','POST'].includes(event.httpMethod)) return answer(405,{error:'Método não permitido'});
    const store=getStore('ara-ranking-v1');
    if (event.httpMethod === 'POST') {
      if ((event.body || '').length>2048) return answer(413,{error:'Dados grandes demais'});
      let data; try {data=JSON.parse(event.body||'{}')}catch{return answer(400,{error:'JSON inválido'})}
      if (!['solo','duo','team'].includes(data.mode) || !Number.isInteger(data.points) || data.points<1 || data.points>5000000) return answer(400,{error:'Pontuação inválida'});
      const label=clean(data.label);
      const players=Array.isArray(data.players) ? data.players.map(clean).slice(0,3) : [];
      const count=data.mode==='solo'?0:data.mode==='duo'?2:3;
      if (!label || (count && (players.length!==count || players.some(p=>!p)))) return answer(400,{error:'Participantes inválidos'});
      const id=String(data.id || '').replace(/[^a-zA-Z0-9-]/g,'').slice(0,80);
      if (id.length<8) return answer(400,{error:'Identificador inválido'});
      await store.setJSON('entry-'+id,{label,players,points:data.points,mode:data.mode,at:Date.now()},{onlyIfNew:true});
      return answer(200,{ok:true});
    }
    const scores=[];
    let cursor;
    do {
      const listing=await store.list({prefix:'entry-', cursor});
      const chunk=await Promise.all(listing.blobs.map(b=>store.get(b.key,{type:'json'})));
      scores.push(...chunk.filter(Boolean));
      cursor=listing.cursor;
    }while(cursor && scores.length<5000);
    scores.sort((a,b)=>b.points-a.points||a.at-b.at);
    return answer(200,{solo:scores.filter(s=>s.mode==='solo').slice(0,50),groups:scores.filter(s=>s.mode==='duo'||s.mode==='team').slice(0,50)});
  }catch(err){console.error('Ranking error',err);return answer(503,{error:'Serviço de ranking indisponível'})}
};
