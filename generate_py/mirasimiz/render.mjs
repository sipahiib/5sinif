import {execFileSync} from 'node:child_process';
import {mkdirSync} from 'node:fs';
const dir=`${process.cwd()}/out/sosyal/mirasimiz`;
const shortsDir=`${process.cwd()}/out/shorts/mirasimiz_shorts`;
mkdirSync(dir,{recursive:true});
mkdirSync(shortsDir,{recursive:true});
for(const [id,name] of [['Mirasimiz','mirasimiz.mp4'],['MirasimizKurz','mirasimiz_kurz.mp4']]) execFileSync('npx',['remotion','render','src/mirasimiz/entry.tsx',id,`${dir}/${name}`,'--scale=0.6666666667','--codec=h264','--crf=18','--concurrency=5','--log=error'],{stdio:'inherit'});
for(const [id,name] of [['MirasimizShorts1','mirasimiz_shorts_1.mp4'],['MirasimizShorts2','mirasimiz_shorts_2.mp4']]) execFileSync('npx',['remotion','render','src/mirasimiz/entry.tsx',id,`${shortsDir}/${name}`,'--scale=0.6666666667','--codec=h264','--crf=18','--concurrency=5','--log=error'],{stdio:'inherit'});
execFileSync('npx',['remotion','still','src/mirasimiz/entry.tsx','MirasimizKurzCover',`${dir}/mirasimiz_kurz_kapak.png`,'--log=error'],{stdio:'inherit'});
