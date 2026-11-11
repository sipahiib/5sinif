import json, math, subprocess, pathlib
from mutagen.mp3 import MP3
root=pathlib.Path(__file__).resolve().parents[2]
data=json.loads((root/'content/sayilar/lesson.json').read_text())
out=root/'public/audio/matematik/sayilar';out.mkdir(parents=True,exist_ok=True)
def gen(text,voice,name):
 p=out/(name+'.mp3')
 if not p.exists(): subprocess.run([str(root/'.venv/bin/edge-tts'),'--voice',voice,'--rate=-2%','--text',text,'--write-media',str(p)],check=True)
 return {'audio':str(p.relative_to(root/'public')),'frames':math.ceil(MP3(p).info.length*30)}
cursor=0
for i,s in enumerate(data['main']):
 s.update(gen(s['text'],'tr-TR-EmelNeural' if i%2==0 else 'tr-TR-AhmetNeural',f'main-{i}'));s['from']=cursor;s['duration']=s['frames']+12;cursor+=s['duration']
s=data['short'];s['q']=gen(s['question'],'tr-TR-AhmetNeural','short-q');s['a']=gen(s['answer'],'tr-TR-AhmetNeural','short-a');s['qEnd']=s['q']['frames'];s['reveal']=s['qEnd']+150;s['answerEnd']=s['reveal']+s['a']['frames'];s['duration']=s['answerEnd']+60
data['lessonFrames']=cursor;data['duration']=cursor+210
(root/'src/sayilar/timeline.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
print('main frames',data['duration'],'short frames',s['duration'])
