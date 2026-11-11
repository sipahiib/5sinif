import asyncio,json,math,pathlib
import edge_tts
from mutagen.mp3 import MP3
r=pathlib.Path(__file__).resolve().parents[2]; source=r/'content/noktalama/lesson.json';d=json.loads(source.read_text());
d['main'][2]['example']='Çocuk seslendi:\n— Merhaba!';d['main'][4]['example']='— Ne zaman?\n— Haftaya...'
d['main'][4]['text']=d['main'][4]['text'].replace('iki ya da daha fazla nokta','iki veya üçten fazla nokta');d['main'][4]['detail']='NOT: İki veya üçten fazla nokta kullanılmaz.'
d['kurz'][4]['text']=d['kurz'][4]['text'].replace('iki veya daha fazla noktayla','iki veya üçten fazla noktayla')
source.write_text(json.dumps(d,ensure_ascii=False,indent=2))
t=json.loads((r/'src/noktalama/timeline.json').read_text())
async def run():
 for group,i in [('main',3),('main',4),('kurz',4)]:
  s=d[group][i];voice='tr-TR-EmelNeural' if i%2==0 else 'tr-TR-AhmetNeural';p=r/f'public/audio/turkce/noktalama/{group}-{i}-v2.mp3';meta=p.with_suffix('.jsonl');await edge_tts.Communicate(s['text'],voice,rate='-2%',boundary='WordBoundary').save(str(p),str(meta));t[group][i].update(s);t[group][i]['audio']=str(p.relative_to(r/'public'));t[group][i]['frames']=math.ceil(MP3(p).info.length*30)
  if group=='main':
   words=[json.loads(x) for x in meta.read_text().splitlines()]; term='Soru' if i==3 else 'Unutma';w=next(x for x in words if x.get('text','').startswith(term));t[group][i]['noteFrame']=round(w['offset']/1e7*30)
 for group in ['main','kurz']:
  cur=0
  for s in t[group]: s['from']=cur;s['duration']=s['frames']+(12 if group=='main' else 0);cur+=s['duration']
  t[group+'Frames']=cur
 t['duration']=t['mainFrames']+210
 for i in [0,4]:t['kurz'][i]['visual']=d['kurz'][i]['visual']
 (r/'src/noktalama/timeline.json').write_text(json.dumps(t,ensure_ascii=False,indent=2));print('MAIN',t['duration']/30,'KURZ',t['kurzFrames']/30,'RATIO',t['kurzFrames']/t['duration'],'notes',t['main'][3]['noteFrame'],t['main'][4]['noteFrame'])
asyncio.run(run())
