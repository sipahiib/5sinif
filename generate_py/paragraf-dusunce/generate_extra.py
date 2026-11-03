import asyncio, json, math, subprocess
from pathlib import Path
import edge_tts
ROOT=Path(__file__).resolve().parents[2]
data=json.loads((ROOT/'content/paragraf-dusunce/ek-anlatim.json').read_text())
voices={'filiz':'tr-TR-EmelNeural','ibrahim':'tr-TR-AhmetNeural'}
async def make(text,speaker,path):
    path.parent.mkdir(parents=True,exist_ok=True)
    await edge_tts.Communicate(text,voices[speaker],rate='-2%').save(str(path))
    sec=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(path)],text=True))
    print(path.name,round(sec,2),flush=True)
    return math.ceil(sec*30)
async def main():
    base=ROOT/'public/audio/turkce/paragraf-dusunce'
    out={'kurz':[]}
    for i,s in enumerate(data['kurz'],1):
        out['kurz'].append(await make(s['text'],s['speaker'],base/'kurz'/f'{i:02}.mp3'))
    for part in ['question','answer']:
        out[part]=await make(data['short'][part],'ibrahim',base/'short'/f'{part}.mp3')
    (ROOT/'content/paragraf-dusunce/extra-timings.json').write_text(json.dumps(out,indent=2)+'\n')
asyncio.run(main())
