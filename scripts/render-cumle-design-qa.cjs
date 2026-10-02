const {bundle}=require('@remotion/bundler');
const {selectComposition,renderStill,openBrowser}=require('@remotion/renderer');
const fs=require('fs');
const path=require('path');
(async()=>{
 const timeline=require('../src/cumle-genel-design/timeline.json');
 const out=path.resolve('out/turkce/cumle-genel-design/qa-frames');fs.mkdirSync(out,{recursive:true});
 const serveUrl=await bundle({entryPoint:path.resolve('src/cumle-genel-design/entry.tsx')});
 const browser=await openBrowser('chrome');
 const comp=await selectComposition({serveUrl,id:'CumleGenelDesign',puppeteerInstance:browser});
 const frames=[0,900,945,1010,1049,timeline.lessonFrames,timeline.lessonFrames+160,timeline.durationInFrames-1];
 for(const s of timeline.scenes){frames.push(s.from,s.from+s.frames-1);for(const p of s.parts)frames.push(s.from+p.from+Math.min(65,p.frames-1));}
 const unique=[...new Set(process.env.QA_FRAMES?process.env.QA_FRAMES.split(',').map(Number):frames)].sort((a,b)=>a-b);
 for(const frame of unique){await renderStill({serveUrl,composition:comp,frame,output:path.join(out,`${String(frame).padStart(5,'0')}.png`),puppeteerInstance:browser});console.log('frame',frame);}
 await browser.close({silent:true});
 fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify({frames:unique,timeline},null,2));
})();
