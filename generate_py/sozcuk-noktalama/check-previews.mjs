import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
const dir='/tmp/sozcuk-noktalama-qa';
const t=JSON.parse(readFileSync('src/sozcuk-noktalama/timings.json'));
for(let i=0;i<3;i++){
 const a=t.shorts[i];
 if(a.reveal-a.qEnd!==150)throw Error('Countdown duration');
 const frames=[0,a.qEnd-1,a.qEnd,a.qEnd+60,a.reveal-1,a.reveal,a.aEnd-1,a.congrats+12];
 for(let j=0;j<frames.length;j++)execFileSync('ffmpeg',['-v','error','-y','-ss',String(frames[j]/30),'-i',`${dir}/short-${i+1}.mov`,'-frames:v','1',`${dir}/s${i+1}-${j}.png`]);
 execFileSync('ffmpeg',['-v','error','-y','-i',`${dir}/s${i+1}-%d.png`,'-vf','scale=270:480,tile=4x2:padding=8:margin=8','-frames:v','1',`${dir}/short-${i+1}-check.png`]);
 console.log(`Short ${i+1}: choices=${a.qEnd}/30s reveal=${a.reveal}/30s congrats=${a.congrats}/30s`);
}
