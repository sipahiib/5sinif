import json, math, subprocess, pathlib
from mutagen.mp3 import MP3
root=pathlib.Path(__file__).resolve().parents[2]; data=json.loads((root/'content/noktalama/lesson.json').read_text()); out=root/'public/audio/turkce/noktalama';out.mkdir(parents=True,exist_ok=True)
def gen(text,voice,name):
 p=out/(name+'.mp3')
 if not p.exists(): subprocess.run([str(root/'.venv/bin/edge-tts'),'--voice',voice,'--rate=-2%','--text',text,'--write-media',str(p)],check=True)
 return {'audio':str(p.relative_to(root/'public')),'frames':math.ceil(MP3(p).info.length*30)}
for group in ('main','kurz'):
 cursor=0
 for i,s in enumerate(data[group]):
  s.update(gen(s['text'],'tr-TR-EmelNeural' if i%2==0 else 'tr-TR-AhmetNeural',f'{group}-{i}'));s['from']=cursor;s['duration']=s['frames']+(12 if group=='main' else 0);cursor+=s['duration']
 data[group+'Frames']=cursor
data['duration']=data['mainFrames']+210
s=data['short'];s['q']=gen(s['question'],'tr-TR-AhmetNeural','short-q');s['a']=gen(s['answer'],'tr-TR-AhmetNeural','short-a');s['qEnd']=s['q']['frames'];s['reveal']=s['qEnd']+150;s['answerEnd']=s['reveal']+s['a']['frames'];s['duration']=s['answerEnd']+60
(root/'src/noktalama/timeline.json').write_text(json.dumps(data,ensure_ascii=False,indent=2));print('Main',data['duration']/30,'Kurz',data['kurzFrames']/30,'ratio',data['kurzFrames']/data['duration'],'Short',s['duration']/30)
