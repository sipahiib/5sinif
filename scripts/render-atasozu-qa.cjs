const {bundle}=require('@remotion/bundler');
const {openBrowser,selectComposition,renderStill}=require('@remotion/renderer');
const fs=require('fs'),path=require('path');
(async()=>{
 const data=require('../src/atasozu-deyim/timeline.json');
 const serveUrl=await bundle({entryPoint:path.resolve('src/atasozu-deyim/entry.tsx')});
 const browser=await openBrowser('chrome');
 const jobs=[];
 for(const group of ['main','kurz']){
  const d=data[group],frames=[0,900,950,1010,1049,d.durationInFrames-1];
  for(const s of d.scenes){frames.push(s.from,s.from+s.frames-1);for(const p of s.parts)frames.push(s.from+p.from+Math.min(75,p.frames-1));}
  if(group==='main')frames.push(d.lessonFrames,d.lessonFrames+160);
  jobs.push({id:group==='main'?'AtasozuDeyimMain':'AtasozuDeyimKurz',name:group,frames});
 }
 for(let i=0;i<2;i++){
  const s=data.shorts[i];jobs.push({id:`AtasozuDeyimShort${i+1}`,name:`short${i+1}`,frames:[0,60,s.qEnd-1,s.qEnd,s.qEnd+30,s.qEnd+60,s.qEnd+90,s.qEnd+120,s.reveal-1,s.reveal,s.reveal+45,s.answerEnd-1,s.answerEnd,s.answerEnd+20,s.durationInFrames-1]});
 }
 for(const j of jobs.filter(j=>!process.env.QA_GROUP||j.name===process.env.QA_GROUP)){
  const out=path.resolve(`out/turkce/atasozu-deyim/qa-${j.name}`);fs.mkdirSync(out,{recursive:true});
  const comp=await selectComposition({serveUrl,id:j.id,puppeteerInstance:browser});
  const frames=[...new Set(process.env.QA_FRAMES?process.env.QA_FRAMES.split(',').map(Number):j.frames)].sort((a,b)=>a-b);
  for(const frame of frames){await renderStill({serveUrl,composition:comp,frame,output:path.join(out,`${String(frame).padStart(5,'0')}.png`),puppeteerInstance:browser,onBrowserLog:log=>{if(log.type==='error')fs.appendFileSync(path.join(out,'browser-errors.jsonl'),JSON.stringify(log)+'\n');}});}
  fs.writeFileSync(path.join(out,'frames.json'),JSON.stringify(frames));console.log(j.name,frames.length,'frames');
 }
 await browser.close({silent:true});
})();
