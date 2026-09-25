"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { GuidePage } from "@/content/guide-page";
import { ProjectWalkthrough } from "./project-walkthrough";
import { CopyPrompt } from "./copy-prompt";
import { GuideIcon } from "./guide-icon";
import s from "./claude-series-experience.module.css";

export function SeriesGuideLink({ href, children, className, current }: {href:string;children:ReactNode;className?:string;current?:boolean}) {
  const [destination,setDestination] = useState(href);
  useEffect(() => {
    if (["localhost", "127.0.0.1"].includes(location.hostname)) {
      const review = new URLSearchParams(location.search).get("review") === "1";
      setDestination(href + (review ? "?review=1" : ""));
    }
  }, [href]);
  return <a href={destination} className={className} aria-current={current ? "page" : undefined}>{children}</a>;
}

export function ClaudeSeriesExperience({ series }: { series: NonNullable<GuidePage["series"]> }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [all, setAll] = useState(false);
  const [checks, setChecks] = useState<boolean[]>([false, false, false]);
  useEffect(() => {
    if (series.part !== 1) return;
    try {
      const task = localStorage.getItem("shift-lead-claude-task");
      if (series.tasks.some(item => item.id === task)) setSelected(task);
    } catch { /* Task selection works without storage. */ }
  }, [series]);
  function chooseTask(task: string) {
    setSelected(task); setAll(false); setChecks([false, false, false]);
    try { localStorage.setItem("shift-lead-claude-task", task); } catch { /* Optional convenience. */ }
  }
  const taskChecks: Record<string, string[]> = {
    meeting: ["The invitation is assigned to the programme lead for 8 October.", "The room-check deadline is marked ‘Not agreed’.", "The 22 October launch is still unconfirmed."],
    document: ["The answer says a recording is not confirmed.", "The quoted words appear in the source.", "Speaker approval is still required."],
    email: ["Delivery is requested by 10 October for the 12 October event.", "The draft asks the supplier to flag any risk of delay.", "No names or commitments have been invented."],
  };
  return <div className={s.experience}>
    <nav className={s.seriesNav} aria-label="Claude guide series">
      <SeriesGuideLink href="/guides/claude/" current={series.part === 1}>1. Finish a task</SeriesGuideLink>
      <SeriesGuideLink href="/guides/claude-projects/" current={series.part === 2}>2. Reuse your instructions</SeriesGuideLink>
    </nav>
    <p className={s.returnNote}><GuideIcon name="book"/>Reading on your phone? Bookmark this guide to return to it on your laptop. Access is remembered in this browser; another browser may ask for your email again.</p>
    {series.part === 1 ? <ProjectWalkthrough project={false} labels={["Choose a task", "Try the example", "Check your result"]} storageKey="shift-lead-claude-task-step">
      <section>
        <h2>1. Choose your task</h2>
        <div className={s.choices}>{series.tasks.map(task => <button key={task.id} aria-pressed={selected === task.id} aria-controls="claude-examples" onClick={() => chooseTask(task.id)}><GuideIcon name={task.id === "meeting" ? "check" : task.id === "document" ? "search" : "prompt"}/><strong>{task.title}</strong><span>{task.outcome}</span></button>)}</div>
      </section>
      <section id="claude-examples" aria-label="Task examples">
        <button className={s.textButton} aria-expanded={all} onClick={() => setAll(!all)}>{all ? "Show my selected task" : "Read all examples"}</button>
        <h2>2. See it, then try it</h2>
        <p>Open <a href="https://claude.ai/" target="_blank" rel="noreferrer">Claude</a>, sign in or create an account, and start a conversation. Select <strong>Copy</strong> on your chosen example, paste it into the message box and send. A free account is enough to try this text exercise, subject to usage limits.</p>
        <p className={s.note}>These examples are fictional. Sample results illustrate what to look for; Claude’s wording may differ.</p>
        {!selected && !all && <p className={s.empty} role="status">Return to “Choose a task” to select an example, or read all examples.</p>}
        {series.tasks.filter(task => all || selected === task.id).map(task => <article className={s.task} key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.example}</p>
          <div className={s.workspace}>
            <div className={s.sample}><h4>{task.id === "meeting" ? "What to look for" : "A useful result"}</h4><p>{task.result}</p></div>
            <CopyPrompt label="Instructions to try" prompt={task.prompt}/>
          </div>
        </article>)}
      </section>
      <section>
        <h2>3. Check, then use your own material</h2>
        <p>Check the result against the source: <strong>right facts, right dates, no invented promises.</strong> For the document example, check that the quoted words exist and support the answer.</p>
        {selected && <fieldset className={s.practice} key={selected}>
          <legend>Check your {selected === "meeting" ? "meeting notes" : selected === "document" ? "document answer" : "email draft"}</legend>
          {taskChecks[selected].map((label, index) => <label key={label} className={s.checkRow}><input type="checkbox" checked={checks[index]} onChange={event => setChecks(previous => previous.map((value, i) => i === index ? event.target.checked : value))}/>{label}</label>)}
          <p role="status">{checks.every(Boolean) ? "You’ve checked all 3 points. Try the instructions with your own material." : "Read the reply Claude gave you. Tick each box only if that point is correct in the reply."}</p>
        </fieldset>}
        {!selected && <p className={s.note}>Choose a task in step 1 to get its result checklist.</p>}
        <p>Now replace the sample notes or source with your own approved, non-confidential material. Keep the instruction above it.</p>
        <details open><summary>Correct a wrong line</summary><CopyPrompt label="Correction instructions" prompt={series.correction}/></details>
        <details open><summary>Make a wordy answer clearer</summary><CopyPrompt label="Clearer answer instructions" prompt="Give me the result first, in plain English. Keep the explanation to 3 short bullets. Preserve important uncertainty."/></details>
      </section>
    </ProjectWalkthrough> : <ProjectWalkthrough>
      <section>
        <h2>1. Create a place to save your instructions</h2>
        <p>We’ll turn rough meeting notes into decisions, a list of who does what, and questions still to resolve. Then you’ll try a second meeting without explaining the format again. The practice notes are fictional.</p>
        <ol className={s.steps}>
          <li>Open <a href="https://claude.ai/projects" target="_blank" rel="noreferrer">Claude Projects</a> in another tab and sign in. Keep this guide open beside it.</li>
          <li>Click <strong>+ New Project</strong> at the top right.</li>
          <li>For the name, enter <strong>Meeting follow-ups</strong>. For the description, enter <strong>Decisions and next steps from my meeting notes</strong>.</li>
          <li>If Claude offers a sharing choice, choose <strong>private</strong>. Finish creating the Project.</li>
        </ol>
        <p><strong>Before moving on:</strong> you should be inside the Project you just named.</p>
        <details><summary>What is a Project? Do I need to pay?</summary><p>A Project is a space in Claude where you keep instructions for a particular job. Those instructions apply to chats you start inside it. Free accounts can create up to 5 Projects. <a href="https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects" target="_blank" rel="noreferrer">Claude’s setup help</a></p></details>
      </section>
      <section>
        <h2>2. Save how you want your notes organised</h2>
        <p>These instructions tell Claude which headings to use and how to handle missing names or dates. Save them in the Project’s instructions, not in a chat message.</p>
        <ol className={s.steps}>
          <li>In your Project, click <strong>Set project instructions</strong>.</li>
          <li>Click <strong>Copy</strong> below, then paste the text into that instructions box.</li>
          <li>Click <strong>Save instructions</strong> in Claude.</li>
        </ol>
        <CopyPrompt label="Rules to paste into Project instructions" prompt={series.instructions}/>
        <p><strong>Before moving on:</strong> reopen the instructions and check that your text is there. You don’t need to upload a file for this exercise.</p>
      </section>
      <section>
        <h2>3. Turn the first notes into next steps</h2>
        <p>Your team has discussed changing its weekly meeting. Copy the rough notes below to find out what was agreed and what still needs a decision.</p>
        <ol className={s.steps}>
          <li>Start a chat from inside <strong>Meeting follow-ups</strong>.</li>
          <li>Click <strong>Copy</strong> below. Paste into the chat’s message box, then send it.</li>
          <li>Read Claude’s reply and check it against the example below. The wording can differ.</li>
        </ol>
        <div className={s.workspace}><CopyPrompt label="Message to paste into the chat" prompt={series.exercise}/><div className={`${s.sample} ${s.meetingResult}`}>
          <h3>What a useful follow-up shows</h3>
          <div className={s.resultGroup}><h4>Decisions</h4><p>Test shorter meetings for 2 weeks.</p></div>
          <div className={s.resultGroup}><h4>Who does what</h4>
            <table className={s.actionTable}><thead><tr><th scope="col">Task</th><th scope="col">Person</th><th scope="col">Due date</th></tr></thead><tbody>
              <tr><th scope="row">Send the agenda</th><td>Alex</td><td>Friday</td></tr>
              <tr><th scope="row">Collect feedback</th><td>Not agreed</td><td>Not agreed</td></tr>
            </tbody></table>
          </div>
          <div className={s.resultGroup}><h4>Questions to resolve</h4><p>Should we record the meetings? This was suggested, not agreed.</p></div>
        </div></div>
      </section>
      <section>
        <h2>4. Try your next meeting without repeating the setup</h2>
        <p>This is a different meeting, with different people and tasks. You want Claude to use the saved format without bringing in the first meeting’s facts.</p>
        <ol className={s.steps}>
          <li>Return to <a href="https://claude.ai/projects" target="_blank" rel="noreferrer">Projects</a> and open <strong>Meeting follow-ups</strong>.</li>
          <li>Start a <strong>new chat inside that Project</strong>. Don’t continue the first conversation.</li>
          <li>Copy the message below, paste it into the new chat and send. Leave your saved Project instructions alone.</li>
        </ol>
        <CopyPrompt label="Message for the new chat" prompt={"Please organise these meeting notes. We agreed to update the staff welcome pack. Sam will draft the checklist by Tuesday. Jo will check the links; no deadline was agreed. A welcome video was suggested, but we haven’t decided whether to make one."}/>
        <ReuseCheck/>
        <details><summary>How do I use this for my own work?</summary><p>After your next meeting, start a new chat in this Project and paste notes you’re allowed to share. Check the names, dates and decisions before using the follow-up. If your team needs different headings, edit the saved instructions once.</p></details>
      </section>
    </ProjectWalkthrough>}
  </div>;
}

function ReuseCheck() {
  const [answer, setAnswer] = useState<string | null>(null);
  return <div className={s.practice}>
    <h3>Did the saved instructions help?</h3>
    <p>Did Claude use the same 3 headings and action table? Look for Sam’s Tuesday deadline, Jo’s missing deadline marked “Not agreed”, and the video still undecided. Alex and the first meeting’s agenda should not appear.</p>
    <div className={s.answerChoices}>{["Yes, it followed my rules", "Not yet"].map(label => <button key={label} aria-pressed={answer === label} onClick={() => setAnswer(label)}>{label}</button>)}</div>
    <p role="status">{answer === "Yes, it followed my rules" ? "You’ve now used the saved rules for 2 separate chats. Next time, paste your new meeting notes instead of explaining the headings and table again." : answer === "Not yet" ? "Check that you opened the chat inside your Project and saved its instructions. If one rule was missed, make that rule clearer and try a new conversation." : "Choose after you’ve tried the second task in Claude."}</p>
  </div>;
}
