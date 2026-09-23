"use client";
import { type ReactNode, useEffect, useRef, useState } from "react";
import type { GuidePage, GuideSection, GuideStep } from "@/content/guide-page";
import type { LearningFormat } from "@/content/guide-formats";
import { AgentInstructionBuilder } from "./agent-instruction-builder";
import { CopyPrompt } from "./copy-prompt";
import { GuideIcon, cleanLabel } from "./guide-icon";
import s from "./guide-learning-experience.module.css";

function Text({ text }: { text: string }) { return <>{text.split("**").map((part, i) => i % 2 ? <strong key={i}>{part}</strong> : part)}</>; }
const names: Record<LearningFormat, string> = { explorer:"Explore the guide", glossary:"Find the term you need", decision:"Choose what fits your task", walkthrough:"Your guided walkthrough", "prompt-builder":"Give an agent clear instructions", practice:"Make a practice plan", audit:"Work through the checks" };
const hints: Record<LearningFormat, string> = { explorer:"Open an example, then try the action at the end.", glossary:"Search definitions or filter by topic. Open a term to see its explanation.", decision:"Select an option to read the guide’s explanation. These are choices to explore, not an automated recommendation.", walkthrough:"One section at a time. Tick actions as you go, or expand the whole guide.", "prompt-builder":"Try a complete example first, then adapt it to a task of your own.", practice:"Choose a skill from the guide and turn it into one small practice session.", audit:"Mark only the checks you have completed. This records your progress, not a verified result." };

export function GuideLearningExperience({ guide, format, conclusion, skipFirstSection = false }: { guide: GuidePage; format: LearningFormat; conclusion: ReactNode; skipFirstSection?: boolean }) {
  const sections = skipFirstSection ? guide.sections.slice(1) : guide.sections;
  const [index, setIndex] = useState(0), [all, setAll] = useState(false), [checks,setChecks] = useState<Record<string, boolean>>({}), [ready,setReady] = useState(false), [saved,setSaved] = useState(true);
  const [query,setQuery] = useState(""), [group,setGroup] = useState("all"), [picked,setPicked] = useState<Record<string,number>>({});
  const [task,setTask] = useState(""),[context,setContext] = useState(""),[output,setOutput] = useState(""),[skill,setSkill] = useState("");
  const ref=useRef<HTMLDivElement>(null), storageKey=`shift-lead-learning:${guide.slug}:v1`;
  useEffect(()=>{try {const v=JSON.parse(localStorage.getItem(storageKey)||"null"); if(v && Number.isInteger(v.index) && v.index>=0 && v.index<sections.length)setIndex(v.index); if(v?.checks && typeof v.checks==="object")setChecks(Object.fromEntries(Object.entries(v.checks).filter(([,x])=>x===true)) as Record<string,boolean>);}catch{setSaved(false);}setReady(true);},[storageKey,sections.length]);
  useEffect(()=>{if(ready)try{localStorage.setItem(storageKey,JSON.stringify({index,checks}));}catch{setSaved(false);}},[index,checks,ready,storageKey]);
  const toggle=(id:string)=>setChecks(old=>({...old,[id]:!old[id]}));
  function go(i:number){setIndex(i);requestAnimationFrame(()=>{ref.current?.scrollIntoView({block:"start"});ref.current?.focus({preventScroll:true});});}
  function renderLinks(step: GuideStep) { return step.links && <div className={s.links}>{step.links.map(l=><a href={l.href} key={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}</div>; }
  function renderSteps(steps: readonly GuideStep[], id: string) {return <ul className={s.steps}>{steps.map((step,i)=><li key={step.title}><label><input type="checkbox" checked={checks[`${id}-${i}`]===true} onChange={()=>toggle(`${id}-${i}`)}/><strong>{step.title}</strong></label><details><summary>Show instructions</summary><p><Text text={step.body}/></p>{renderLinks(step)}</details></li>)}</ul>;}
  function renderSection(section: GuideSection, sectionIndex: number) {
    const id=`section-${sectionIndex}`;
    return <section key={section.heading} className={s.section} aria-labelledby={`learn-${guide.slug}-${sectionIndex}`}>
      <h3 id={`learn-${guide.slug}-${sectionIndex}`}>{section.heading}</h3>
      {"introduction" in section && section.introduction && <p><Text text={section.introduction}/></p>}
      {section.kind==="prose" && <>{section.paragraphs.map(p=><p key={p}><Text text={p}/></p>)}{section.keyLine&&<blockquote><Text text={section.keyLine}/></blockquote>}</>}
      {section.kind==="cards" && (format==="decision" ? <><div className={s.options}>{section.items.map((item,i)=><button key={item.title} aria-pressed={picked[id]===i} onClick={()=>setPicked({...picked,[id]:i})}>{item.title}</button>)}</div>{picked[id]!==undefined ? <div className={s.result} role="status"><strong>{section.items[picked[id]].title}</strong><p><Text text={section.items[picked[id]].body}/></p></div> : <p className={s.hint}>Choose an option to read its explanation.</p>}</> : <div className={s.cards}>{section.items.map(item=><details key={item.title}><summary><GuideIcon name="book"/>{cleanLabel(item.title)}</summary><p><Text text={item.body}/></p></details>)}</div>)}
      {section.kind==="steps"&&renderSteps(section.steps,id)}
      {section.kind==="accordion"&&section.items.map((item,i)=><details key={item.title}><summary>{item.title}</summary><p><Text text={item.body}/></p>{renderLinks(item)}{format==="audit"&&<label className={s.check}><input type="checkbox" checked={checks[`${id}-${i}`]===true} onChange={()=>toggle(`${id}-${i}`)}/>I have reviewed this setting</label>}</details>)}
      {section.kind==="comparison"&&<div className={s.comparison}>{section.columns.map((col,i)=><div key={col}><h4>{col}</h4>{section.rows.map((row,n)=><p key={n}><Text text={row[i]}/></p>)}</div>)}</div>}
      <label className={s.check}><input type="checkbox" checked={checks[id]===true} onChange={()=>toggle(id)}/>I have reviewed this section</label>
    </section>;
  }
  const cardSections=guide.sections.filter((x):x is Extract<GuideSection,{kind:"cards"}>=>x.kind==="cards");
  const glossarySections = sections.filter((x):x is Extract<GuideSection,{kind:"cards"}>=>x.kind==="cards");
  const entries=glossarySections.flatMap(x=>x.items.map(item=>({...item,group:x.heading})));
  const matches=entries.filter(x=>(group==="all"||x.group===group)&&`${x.title} ${x.body}`.toLowerCase().includes(query.toLowerCase()));
  const plan=`Skill to practise: ${skill}\nTask: ${task.trim()}\nPractice session: ${context.trim()||"Choose one small session."}\nCheck the result: ${output.trim()||"Compare the result with the original task and identify one improvement."}`;
  const learningSections = <>
    {format==="glossary" ? <><div className={s.filters}><label>Search terms<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a term or explanation"/></label><label>Topic<select value={group} onChange={e=>setGroup(e.target.value)}><option value="all">All topics</option>{glossarySections.map(x=><option key={x.heading}>{x.heading}</option>)}</select></label></div><p role="status" className={s.hint}>{matches.length} matching entries</p>{matches.length?matches.map(x=><details key={`${x.group}-${x.title}`}><summary>{x.title}</summary><small>{x.group}</small><p><Text text={x.body}/></p></details>):<p>No matching terms. Try another word or choose all topics.</p>}{sections.map((section,i)=>section.kind!=="cards"&&renderSection(section,i))}</> : <>
      <div className={s.toolbar}><strong>Your guide · {index+1} of {sections.length}</strong><button onClick={()=>setAll(!all)} aria-pressed={all}>{all?"One section at a time":"Read all sections"}</button></div>
      {sections.length > 1 && <nav className={s.progress} aria-label="Guide steps">{sections.map((section,i)=><button type="button" key={section.heading} aria-current={!all&&index===i?"step":undefined} onClick={()=>go(i)}><span>{String(i+1).padStart(2,"0")}</span>{section.heading}</button>)}</nav>}
      {sections.map((section,i)=><div key={section.heading} hidden={!all&&index!==i}>{renderSection(section,i)}</div>)}
      {!all&&<nav className={s.footer} aria-label="Guide section navigation"><button disabled={index===0} onClick={()=>go(index-1)}>← Back</button><span>{index+1} / {sections.length}</span><button disabled={index===sections.length-1} onClick={()=>go(index+1)}>Next →</button></nav>}
    </>}
  </>;
  return <div className={s.experience} ref={ref} tabIndex={-1}>
    <header className={s.header}><GuideIcon name={format==="prompt-builder"?"prompt":format==="glossary"?"search":format==="decision"?"route":"book"}/><h2>{names[format]}</h2></header>
    <p>{hints[format]}</p><p className={s.hint}>{saved?"Checklist progress stays on this device.":"Storage is unavailable; progress lasts for this visit."} Your typed content is not saved or sent to a service.</p>
    {format==="prompt-builder"&&<AgentInstructionBuilder/>}
    {format==="practice"&&<div className={s.builder}><label htmlFor="practice-skill">Choose a skill to practise</label><select id="practice-skill" value={skill} onChange={e=>setSkill(e.target.value)}><option value="">Select a skill</option>{(cardSections[0]?.items??[]).map(x=><option key={x.title}>{x.title}</option>)}</select><label htmlFor="practice-task">Which everyday task will you use?</label><input id="practice-task" value={task} onChange={e=>setTask(e.target.value)}/><label htmlFor="practice-session">When and for how long?</label><input id="practice-session" value={context} onChange={e=>setContext(e.target.value)}/><label htmlFor="practice-check">How will you check the result?</label><input id="practice-check" value={output} onChange={e=>setOutput(e.target.value)}/>{skill&&task.trim()?<CopyPrompt label="Your practice plan" prompt={plan}/>:<p className={s.hint}>Choose a skill and task to create your plan.</p>}</div>}
    {format==="prompt-builder" ? <details><summary>More help with prompts</summary>{learningSections}</details> : learningSections}
    {guide.tryNow&&<details className={s.tryNow}><summary><GuideIcon name="prompt"/>{guide.tryNow.heading}</summary><p><Text text={guide.tryNow.introduction}/></p><CopyPrompt label="Guide prompt" prompt={guide.tryNow.prompt} collapsible/>{guide.tryNow.instructions&&renderSteps(guide.tryNow.instructions,"action")}<p><Text text={guide.tryNow.check}/></p></details>}
    {(format==="glossary" || all || index===sections.length-1) && conclusion}
  </div>;
}
