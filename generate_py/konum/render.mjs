import {execFileSync} from "node:child_process";import {mkdirSync} from "node:fs";
const root=process.cwd(),out=`${root}/out/sosyal/konum`,short=`${root}/out/shorts/konum_shorts`;mkdirSync(out,{recursive:true});mkdirSync(short,{recursive:true});
const render=(id,path)=>execFileSync("npx",["remotion","render","src/konum/entry.tsx",id,path,"--codec=h264","--crf=18","--concurrency=5","--log=error"],{stdio:"inherit"});
render("Konum",`${out}/konum.mp4`);render("KonumKurz",`${out}/konum_kurz.mp4`);render("KonumShorts1",`${short}/konum_shorts.mp4`);
