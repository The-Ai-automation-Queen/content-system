import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
export function capture(text,path){
 const match=text.match(/^## (?:Full Content|Raw Content|Full Transcript|Transcript)\s*\n([\s\S]*)/mi);
 if(!match)return null;
 const content=match[1].replace(/^>\s?/gm,'').replace(/^\[!\w+\].*$/gm,'').trim();
 if(content.length<120)return null;
 return {type:text.match(/^source:\s*["']?([^"'\n]+)/m)?.[1]||'article',id:createHash('sha256').update(path+'\0'+content).digest('hex'),path,title:text.match(/^# (.+)$/m)?.[1]||path,content,sourceHash:createHash('sha256').update(content).digest('hex'),contextVersion:text.match(/^context_version:\s*["']?([^"'\n]+)/m)?.[1]||'legacy'};
}
export function inventory(repo){
 const files=execFileSync('git',['-C',repo,'ls-files','-z'],{encoding:'utf8'}).split('\0');
 return files.filter(p=>p.endsWith('.md')&&!/(^|\/)(archive|_archive|_Derived|Indexes)\//i.test(p)).map(p=>capture(readFileSync(resolve(repo,p),'utf8'),p)).filter(Boolean);
}
export function retrieve(items,query,limit=5){
 const terms=[...new Set(query.toLowerCase().match(/[\p{L}\p{N}]{3,}/gu)||[])];
 return items.map(x=>({item:x,match:terms.reduce((n,t)=>n+(x.title.toLowerCase().includes(t)?4:0)+(x.content.toLowerCase().includes(t)?1:0),0)})).filter(x=>x.match>0).sort((a,b)=>b.match-a.match||a.item.path.localeCompare(b.item.path)).slice(0,limit).map(x=>x.item);
}
