import {execFileSync} from "node:child_process";
import {mkdirSync} from "node:fs";
const dir=`${process.cwd()}/out/turkce/es-zit-anlam`;
mkdirSync(dir,{recursive:true});
execFileSync("npx",["remotion","render","src/es-zit-anlam/entry.tsx","EsZitAnlam",`${dir}/es_zit_anlam.mp4`,"--codec=h264","--crf=18","--concurrency=5","--log=error"],{stdio:"inherit"});
