const lines = [
  'Loading appreciation modules...',
  'Respect.dll loaded successfully',
  'Gratitude.exe running',
  'Teacher_day.celebration initialized',
];

const codeArea = document.getElementById('codeArea');
const logArea = document.getElementById('logArea');
const executeBtn = document.getElementById('executeBtn');
const downloadBtn = document.getElementById('downloadBtn');
const typeSound = document.getElementById('typeSound');

function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function playTyping(){ if(typeSound) { typeSound.currentTime=0; typeSound.play().catch(()=>{}); } }

async function runSequence(){
  codeArea.querySelectorAll('p').forEach(p=>p.style.opacity=0.2);
  for(let i=0;i<lines.length;i++){
    const el = document.getElementById('line'+(i+1));
    el.textContent = '';
    playTyping();
    for(let j=0;j<lines[i].length;j++){
      el.textContent += lines[i][j];
      await sleep(24);
    }
    el.style.opacity=1;
    await sleep(200);
  }
  const time = new Date().toLocaleString();
  const entry = `[${time}] Teacher appreciation executed.`;
  logArea.textContent = entry + '\n' + logArea.textContent;
  downloadBtn.dataset.content = entry + '\n\n--\nHacker Teacher Appreciation Log\n';
}

executeBtn.addEventListener('click', runSequence);

downloadBtn.addEventListener('click', ()=>{
  const content = downloadBtn.dataset.content || 'No entries yet.';
  const blob = new Blob([content],{type:'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='gratitude_log.txt'; a.click();
  URL.revokeObjectURL(url);
});

document.addEventListener('keydown', (e)=>{ if(e.key==='Enter') runSequence(); });
