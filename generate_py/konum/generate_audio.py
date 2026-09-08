import asyncio, json, math, subprocess, sys
from pathlib import Path
import edge_tts

ROOT=Path(__file__).resolve().parents[2]
DATA=json.loads((ROOT/'content/konum.json').read_text())
BASE=ROOT/'public/audio/sosyal/konum'
VOICES={'filiz':'tr-TR-EmelNeural','ibrahim':'tr-TR-AhmetNeural'}
FORCE='--force' in sys.argv

def duration(path):
    return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(path)],text=True))

async def make(text,speaker,path,rate='+3%'):
    path.parent.mkdir(parents=True,exist_ok=True)
    if FORCE or not path.exists() or path.stat().st_size<1000:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(text,VOICES[speaker],rate=rate).save(str(path)); break
            except Exception:
                if attempt==2: raise
    return math.ceil(duration(path)*30)

async def main():
    timings={'main':[],'kurz':[],'shorts':[]}
    for group in ('main','kurz'):
        for i,s in enumerate(DATA[group]):
            audio=await make(s['text'],s['speaker'],BASE/group/f"{s['id']}.mp3",'+7%' if group=='main' else '+3%')
            tail=0 if group=='kurz' and i==len(DATA[group])-1 else 12
            timings[group].append({'audioFrames':audio,'frames':audio+tail})
    for i,s in enumerate(DATA['shorts'],1):
        q=await make(s['question'],'ibrahim',BASE/'shorts'/str(i)/'question.mp3')
        a=await make(s['answer'],'ibrahim',BASE/'shorts'/str(i)/'answer.mp3')
        q_speech=max(1,q-31)
        reveal=q_speech+150
        a_speech=max(1,a-43)
        timings['shorts'].append({'qEnd':q_speech,'reveal':reveal,'aEnd':reveal+a_speech,'congrats':reveal+a_speech+30,'frames':reveal+a_speech+75})
    target=ROOT/'src/konum/timings.json'; target.parent.mkdir(parents=True,exist_ok=True)
    target.write_text(json.dumps(timings,indent=2)+'\n')
    main=sum(x['frames'] for x in timings['main'])+210
    kurz=sum(x['frames'] for x in timings['kurz'])
    print(f'main={main/30:.2f}s kurz={kurz/30:.2f}s ratio={kurz/main:.3f}')
    if main>9000: raise SystemExit('Main video exceeds 300 seconds')

asyncio.run(main())
