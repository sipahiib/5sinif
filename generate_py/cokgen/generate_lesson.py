import asyncio, json, math
from pathlib import Path
import edge_tts
from mutagen.mp3 import MP3
root=Path(__file__).resolve().parents[2]
source=json.loads((root/'content/cokgen/lesson.json').read_text())
out=root/'public/audio/matematik/cokgen'
voices={'filiz':'tr-TR-EmelNeural','ibrahim':'tr-TR-AhmetNeural'}
sem=asyncio.Semaphore(4)
async def make(group,i,s):
 p=out/f'{group}-{i+1}.mp3'
 async with sem:
  for trial in range(3):
   try:
    await edge_tts.Communicate(s['text'],voices[s['speaker']],rate='-2%').save(str(p));break
   except Exception:
    if trial==2: raise
    await asyncio.sleep(2)
 return math.ceil(MP3(p).info.length*30)
async def main():
 tasks=[make(group,i,s) for group in ('main','kurz') for i,s in enumerate(source[group])]
 durations=iter(await asyncio.gather(*tasks)); data={}
 for group in ('main','kurz'):
  cursor=0;scenes=[]
  for i,s in enumerate(source[group]):
   n=next(durations);frames=n+(8 if group=='main' else 0)
   scenes.append({**s,'audio':f'audio/matematik/cokgen/{group}-{i+1}.mp3','from':cursor,'audioFrames':n,'frames':frames});cursor+=frames
  data[group]={'scenes':scenes,'lessonFrames':cursor,'durationInFrames':cursor+(210 if group=='main' else 0)}
 (root/'src/cokgen/timeline.json').write_text(json.dumps(data,ensure_ascii=False,indent=2))
 print('main',data['main']['durationInFrames']/30,'kurz',data['kurz']['durationInFrames']/30,'ratio',data['kurz']['durationInFrames']/data['main']['durationInFrames'])
asyncio.run(main())
