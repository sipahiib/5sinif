import asyncio, hashlib, json, math
from pathlib import Path
import edge_tts
from mutagen.mp3 import MP3
ROOT=Path(__file__).resolve().parents[2]
SRC=ROOT/'content/atasozu-deyim/lesson.json'
OUT=ROOT/'public/audio/turkce/atasozu-deyim'
VOICES={'filiz':'tr-TR-EmelNeural','ibrahim':'tr-TR-AhmetNeural'}
async def audio(text,speaker,name):
    voice=VOICES[speaker]; digest=hashlib.sha256((text+voice+'-2%').encode()).hexdigest()[:10]
    file=OUT/f'{name}-{digest}.mp3';OUT.mkdir(parents=True,exist_ok=True)
    if not file.exists() or file.stat().st_size==0:
        for retry in range(3):
            try:
                await edge_tts.Communicate(text,voice,rate='-2%').save(str(file));break
            except Exception:
                if retry==2:raise
                await asyncio.sleep(1)
    seconds=MP3(file).info.length
    return {'audio':str(file.relative_to(ROOT/'public')),'frames':math.ceil(seconds*30),'seconds':seconds}
async def main():
    source=json.loads(SRC.read_text());data={'fps':30}
    for group in ['main','kurz']:
        cursor=0;scenes=[]
        for i,s in enumerate(source[group]):
            parts=s.get('parts',[{'speaker':s.get('speaker'),'text':s.get('text'),'headline':s.get('title'),'detail':s.get('caption')}])
            local=0;processed=[]
            for j,p in enumerate(parts):
                a=await audio(p['text'],p['speaker'],f'{group}-{s["id"]}-{j}')
                processed.append({**p,**a,'from':local});local+=a['frames']+(6 if group=='main' else 0)
            duration=local+(6 if group=='main' else 0)
            scenes.append({**s,'parts':processed,'from':cursor,'frames':duration});cursor+=duration
            print(group,s['id'],round(duration/30,2),flush=True)
        data[group]={'scenes':scenes,'lessonFrames':cursor,'durationInFrames':cursor+(210 if group=='main' else 0)}
    shorts=[]
    for i,s in enumerate(source['shorts']):
        q=await audio(s['question'],'ibrahim',f'short-{i+1}-q')
        a=await audio(s['answer'],'ibrahim',f'short-{i+1}-a')
        reveal=q['frames']+150;end=reveal+a['frames']
        shorts.append({**s,'q':q,'a':a,'qEnd':q['frames'],'reveal':reveal,'answerEnd':end,'durationInFrames':end+45})
        print('short',i+1,round((end+45)/30,2),flush=True)
    data['shorts']=shorts
    dest=ROOT/'src/atasozu-deyim/timeline.json';dest.write_text(json.dumps(data,ensure_ascii=False,indent=2))
    mainsecs=data['main']['durationInFrames']/30;kurzsecs=data['kurz']['durationInFrames']/30
    print('MAIN',mainsecs,'KURZ',kurzsecs,'RATIO',kurzsecs/mainsecs,flush=True)
    max_seconds=source.get('productionOverrides',{}).get('mainMaxSeconds')
    if max_seconds is not None and mainsecs>max_seconds:raise RuntimeError('Main exceeds configured duration')
    if not .5<=kurzsecs/mainsecs<=.7:raise RuntimeError('Kurz ratio outside50–70%')
asyncio.run(main())
