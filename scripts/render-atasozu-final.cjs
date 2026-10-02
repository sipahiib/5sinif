const {bundle}=require('@remotion/bundler');
const {openBrowser,selectComposition,renderMedia}=require('@remotion/renderer');
const fs=require('fs'),path=require('path');
(async()=>{
const serveUrl=await bundle({entryPoint:path.resolve('src/atasozu-deyim/entry.tsx')});
const browser=await openBrowser('chrome');
const jobs=[['AtasozuDeyimMain','out/turkce/atasozu-deyim/atasozu-deyim.mp4'],['AtasozuDeyimKurz','out/turkce/atasozu-deyim/atasozu-deyim_kurz.mp4'],['AtasozuDeyimShort1','out/shorts/turkce/atasozu-deyim_shorts/atasozu-deyim_shorts_1.mp4'],['AtasozuDeyimShort2','out/shorts/turkce/atasozu-deyim_shorts/atasozu-deyim_shorts_2.mp4']];
for(const [id,outputLocation] of jobs.filter(j=>!process.env.RENDER_ONLY||j[0]===process.env.RENDER_ONLY)){fs.mkdirSync(path.dirname(outputLocation),{recursive:true});const composition=await selectComposition({serveUrl,id,puppeteerInstance:browser});let last=-1;await renderMedia({serveUrl,composition,outputLocation,codec:'h264',crf:18,concurrency:4,puppeteerInstance:browser,onProgress:p=>{const n=Math.floor(p.progress*10);if(n>last){last=n;console.log(id,n*10+'%');}}});console.log('DONE',outputLocation);}
await browser.close({silent:true});
})().catch(e=>{console.error(e);process.exit(1)});
