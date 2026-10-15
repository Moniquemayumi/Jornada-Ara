import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const f of ['index.html','desktop.html','mobile.html','testar-ranking.html'])await copyFile(f,'dist/'+f);
console.log('Jornada ARA: arquivos prontos em dist/');
