import {execFileSync} from "node:child_process";
import {mkdirSync} from "node:fs";
const root=process.cwd(),mainDir=`${root}/out/fen/destek-hareket-sistemi`,shortsDir=`${root}/out/shorts/destek-hareket-sistemi_shorts`;
mkdirSync(mainDir,{recursive:true});mkdirSync(shortsDir,{recursive:true});
for(const [id,out] of [["DestekHareketSistemi",`${mainDir}/destek-hareket-sistemi.mp4`],["DestekHareketSistemiKurz",`${mainDir}/destek-hareket-sistemi_kurz.mp4`],["DestekHareketSistemiShorts1",`${shortsDir}/destek-hareket-sistemi_shorts_1.mp4`],["DestekHareketSistemiShorts2",`${shortsDir}/destek-hareket-sistemi_shorts_2.mp4`]]) execFileSync("npx",["remotion","render","src/destek-hareket-sistemi/entry.tsx",id,out,"--scale=0.6666666667","--codec=h264","--crf=18","--concurrency=5","--log=error"],{stdio:"inherit"});
execFileSync("npx",["remotion","still","src/destek-hareket-sistemi/entry.tsx","DestekHareketSistemiKurzCover",`${mainDir}/destek-hareket-sistemi_kurz_kapak.png`,"--log=error"],{stdio:"inherit"});
