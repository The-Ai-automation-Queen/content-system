import {mkdirSync,existsSync,readFileSync,writeFileSync,openSync,closeSync,unlinkSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import {inventory} from './knowledge.mjs';
import {loadPositioningContext} from './context/positioning.mjs';
import {analyzeContent} from './analyzer.mjs';
import {config} from './config.mjs';
export async function reassess({repo=config.repoLocalPath,destination=process.env.RESEARCH_ASSESSMENT_DIR||'/root/research-bot/assessments',limit=10,analyze=analyzeContent,load=loadPositioningContext,items}={}){
 if(!Number.isInteger(limit)||limit<1||limit>40)throw Error('Batch limit must be 1–40');
 if(config.allowPaid)throw Error('Historical refresh requires paid Anthropic fallback disabled');
 mkdirSync(destination,{recursive:true,mode:0o700});const lock=resolve(destination,'.lock');let fd;
 try{fd=openSync(lock,'wx')}catch{return {status:'already_running'}};
 try{
  const context=load();const captures=items||inventory(repo);let completed=0,attempted=0,failed=0,consecutiveFailures=0;
  const pending=[];
  for(const item of captures){
   const key=createHash('sha256').update(item.id+'\0'+context.commit).digest('hex');const path=resolve(destination,key+'.json');
   if(existsSync(path)){const previous=JSON.parse(readFileSync(path,'utf8'));if(previous.analysisStatus==='draft'){completed++;continue;}}
   pending.push({item,path});
  }
  for(const {item,path} of pending){
   if(attempted>=limit)continue;
   attempted++;
   const analysis=await analyze({title:item.title,content:item.content},item.type||'article',{loadContext:()=>context});
   const record={...analysis,sourceId:item.id,sourcePath:item.path,sourceHash:item.sourceHash,assessedAt:new Date().toISOString(),historicalAnalysis:'superseded',publicEligibility:'unassessed'};
   writeFileSync(path,JSON.stringify(record,null,2)+'\n',{mode:0o600});
   if(analysis.analysisStatus==='draft'){completed++;consecutiveFailures=0}else{failed++;consecutiveFailures++;}
   if(consecutiveFailures>=3)break;
  }
  const report={status:consecutiveFailures>=3?'provider_blocked':completed===captures.length?'complete':'partial',total:captures.length,completed,remaining:captures.length-completed,attempted,failed,contextCommit:context.commit,at:new Date().toISOString()};
  writeFileSync(resolve(destination,'status.json'),JSON.stringify(report,null,2)+'\n',{mode:0o600});return report;
 }finally{closeSync(fd);unlinkSync(lock)}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 reassess({limit:Number(process.argv[2]||10)}).then(r=>console.log(JSON.stringify(r))).catch(e=>{console.error(e.message);process.exitCode=1});
}
