const html = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');

// Called only after saveAndPush confirms the Git push succeeded.
export function formatTelegramReply(analysis, type, url, filePath) {
  let text='<b>Saved to GitHub research inbox</b>\n\n';
  text+='Obsidian imports separately while your Mac and Obsidian are running.\n\n';
  text+='<b>Analysis:</b> '+html(analysis.analysisStatus || 'needs_analysis')+'\n';
  text+=html(String(analysis.summary || 'Analysis pending.').slice(0,600))+'\n\n';
  for(const p of (analysis.projectFit || []).slice(0,2)) text+='<b>'+html(p.project)+':</b> '+html(p.fit)+' — '+html(String(p.reason).slice(0,200))+'\n';
  text+='\nSaving keeps the source for later. It is not approval to publish.\n';
  text+='<code>'+html(String(filePath).slice(0,300))+'</code>';
  // Do not echo signed source URLs or raw model output into Telegram HTML.
  return text;
}
