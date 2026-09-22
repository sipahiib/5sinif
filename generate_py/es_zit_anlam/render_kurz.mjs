import {execFileSync} from "node:child_process";
import {mkdirSync} from "node:fs";
const dir=`${process.cwd()}/out/turkce/es-zit-anlam`;
mkdirSync(dir,{recursive:true});
execFileSync("npx",["remotion","render","src/es-zit-anlam/entry.tsx","EsZitAnlamKurz",`${dir}/es_zit_anlam_kurz.mp4`,"--scale=0.6666666667","--codec=h264","--crf=18","--concurrency=5","--log=error"],{stdio:"inherit"});
execFileSync("npx",["remotion","still","src/es-zit-anlam/entry.tsx","EsZitAnlamKurzCover",`${dir}/es_zit_anlam_kurz_kapak.png`,"--log=error"],{stdio:"inherit"});
