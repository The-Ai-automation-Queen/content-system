"use client";
import { useRef, useState } from "react";
import { CopyPrompt } from "./copy-prompt";
import s from "./guide-learning-experience.module.css";

const examples = [
  { title: "Prepare a meeting", task: "Create an agenda for a 20-minute project planning meeting.", context: "Use only the sample notes below: the launch date is undecided; the team needs to agree who writes the announcement and who checks the website. The audience is a small project team.", output: "A table with topic, minutes and decision needed. Leave the owner as ‘to agree’ where no name is supplied.", limits: "Draft the agenda here. Do not create calendar events, contact anyone or change files.", check: "Check that the timings total 20 minutes and both decisions in the notes are covered. Do not invent names or dates." },
  { title: "Compare options", task: "Prepare a comparison to help me choose a venue for a small workshop.", context: "Use these fictional options only: Room A costs £120, holds 12 people and has a projector. Room B costs £90, holds 8 people and has no projector. We expect 10 people, need a projector and have a £150 budget.", output: "A comparison table, one suggested option and a short explanation tied to my requirements.", limits: "Use only the supplied details. Do not browse, contact venues, book anything or spend money.", check: "Check each option against attendance, equipment and budget. Mark anything not supplied as unknown." },
  { title: "Build a simple page", task: "Build a local preview of a one-page workshop website.", context: "The fictional workshop is ‘Clearer weekly planning’. It lasts 60 minutes and covers choosing priorities, planning the week and reviewing progress. No date, venue or booking link has been supplied. Use the project folder I explicitly select.", output: "A working local page using the project’s existing framework, plus a short explanation of what changed and how to preview it.", limits: "Inspect the selected project first. Ask before installing dependencies or replacing existing work. Do not deploy, add tracking, create accounts or collect personal data. If you cannot access files or run commands, explain the limitation and guide me one step at a time.", check: "Check the page on a narrow screen, report which checks you ran and flag missing event details. Do not invent dates, testimonials or a working booking flow." },
];
type Brief = typeof examples[number];
function assemble(b: Brief) { return `Goal\n${b.task}\n\nContext and allowed material\n${b.context}\n\nWhat to deliver\n${b.output}\n\nPermissions and limits\n${b.limits}\n\nBefore starting\nIf essential information or access is missing, ask me a short, specific question. Explain unfamiliar steps in plain language.\n\nCompletion check\n${b.check}\nReport what you completed, what you checked and anything still needing my input. Do not claim an action succeeded unless you verified it.`; }
export function AgentInstructionBuilder() {
  const [stage, setStage] = useState(0);
  const [fieldIndex, setFieldIndex] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  function move(stage: number) { setStage(stage); requestAnimationFrame(()=>{panel.current?.scrollIntoView({block:"start"}); panel.current?.focus({preventScroll:true});}); }
  const [selected, setSelected] = useState(0);
  const [brief, setBrief] = useState<Brief | null>(null);
  const example = examples[selected];
  const fields = [
    ["task", "What should the agent complete?"], ["context", "What information or files may it use?"],
    ["output", "What should it deliver?"], ["limits", "What may it do, and when must it ask?"],
    ["check", "How will you know it is finished correctly?"],
  ] as const;
  return <div ref={panel} tabIndex={-1} className={s.agentPanel}>
    <nav className={s.options} aria-label="Instruction builder steps">{["1. Example", "2. Adapt", "3. Use"].map((label,i)=><button key={label} aria-current={stage===i?"step":undefined} aria-pressed={stage===i} disabled={i===1&&!brief} onClick={()=>move(i)}>{label}</button>)}</nav>
    <section hidden={stage!==0} className={s.section} aria-labelledby="agent-example-title">
      <h3 id="agent-example-title">1. Start with a worked example</h3>
      <p>A prompt is the instruction you give AI. When an agent can take actions, also say what it may use, what it may change and what it must check. Its available tools and permissions determine what it can actually do.</p>
      <div className={s.options} aria-label="Choose an example">{examples.map((x,i)=><button key={x.title} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{x.title}</button>)}</div>
      <p className={s.hint}>These are fictional practice examples. You can copy one as it is before writing your own.</p>
      <CopyPrompt label={`${example.title}: complete agent instructions`} prompt={assemble(example)} collapsible/>
      <details><summary>Why these instructions work</summary><ul><li><strong>Goal:</strong> gives the agent one concrete job.</li><li><strong>Material:</strong> tells it which information to use instead of guessing.</li><li><strong>Deliverable:</strong> describes the result you want back.</li><li><strong>Limits:</strong> separates work it can do from actions needing your permission.</li><li><strong>Check:</strong> makes completion something you can review.</li></ul></details>
      <p><strong>What to check in this example:</strong> {example.check}</p>
      <button onClick={()=>{setBrief({...example});setFieldIndex(0);move(1);}}>{brief ? "Replace my draft with this example" : "Adapt this example"}</button>
      {brief && <p className={s.hint} role="status">Your draft is below. Choosing another example above will not change it until you click Replace.</p>}
    </section>
    {brief && <section hidden={stage!==1} className={s.section} aria-labelledby="agent-adapt-title"><h3 id="agent-adapt-title">2. Make it yours</h3><p>Change the example details to match one small task. Keep the permissions and completion check specific.</p><div className={s.builder}><p className={s.hint} role="status">Detail {fieldIndex+1} of {fields.length}</p>{fields.map(([key,label],i)=><div key={key} hidden={i!==fieldIndex}><label htmlFor={`agent-${key}`}>{label}</label><textarea id={`agent-${key}`} value={brief[key]} onChange={e=>setBrief({...brief,[key]:e.target.value})}/></div>)}<nav className={s.footer} aria-label="Instruction fields"><button disabled={fieldIndex===0} onClick={()=>setFieldIndex(fieldIndex-1)}>Previous detail</button><button disabled={fieldIndex===fields.length-1} onClick={()=>setFieldIndex(fieldIndex+1)}>Next detail</button></nav>{fields.every(([key])=>brief[key].trim()) ? <CopyPrompt label="Your agent instructions" prompt={assemble(brief)} collapsible/> : <p role="status">Complete all 5 fields to create your instructions. Use “No additional material” if the task needs none.</p>}</div><button onClick={()=>move(2)}>How to use these instructions</button></section>}
    <section hidden={stage!==2} className={s.section} aria-labelledby="agent-use-title"><h3 id="agent-use-title">{brief ? "3" : "2"}. Try it and check the result</h3><ol><li>Open the AI tool you already use and start a new conversation or task.</li><li>Click Copy on the example or your adapted instructions, then paste them into the message box.</li><li>Read them before sending. Replace any example details and use only information you are allowed to share.</li><li>For a file-building task, select the intended project in your agent tool. If you do not know how, ask it to explain the next step before proceeding.</li><li>Send the instructions. Answer any clarification questions, then compare the result with the completion check.</li></ol><p>If something is missing, reply: “Check your result against my instructions. Tell me what is missing, then correct it within the same permissions.”</p></section>
  </div>;
}
