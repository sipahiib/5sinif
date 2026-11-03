import asyncio, json, math, re, subprocess
from pathlib import Path
import edge_tts

root = Path('public/audio/matematik/cokgen')
lines = {'question':'Şekildeki çokgenin adı nedir?', 'answer':'Doğru cevap B, altıgen. Çünkü bu çokgenin altı kenarı vardır.'}
async def main():
    for key, value in lines.items():
        await edge_tts.Communicate(value, 'tr-TR-AhmetNeural', rate='-2%').save(str(root / (key+'.mp3')))
    windows = {}
    for key in lines:
        file = root / (key+'.mp3')
        duration = float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(file)]))
        proc = subprocess.run(['ffmpeg','-hide_banner','-i',str(file),'-af','silencedetect=noise=-40dB:d=0.1','-f','null','-'],capture_output=True,text=True)
        starts = [float(x) for x in re.findall(r'silence_start: ([0-9.]+)',proc.stderr)]
        ends = [float(x) for x in re.findall(r'silence_end: ([0-9.]+)',proc.stderr)]
        windows[key] = {'duration':duration,'start':ends[0] if ends and ends[0]<1 else 0,'end':starts[-1] if starts and starts[-1]>duration/2 else duration}
    qend=math.ceil(windows['question']['end']*30)
    reveal=qend+150
    answerfrom=max(0,reveal-math.floor(windows['answer']['start']*30))
    answerend=answerfrom+math.ceil(windows['answer']['end']*30)
    timing={'qEnd':qend,'reveal':reveal,'answerFrom':answerfrom,'answerEnd':answerend,'total':answerend+60,'audio':windows,'lines':lines}
    Path('src/cokgen/timing.json').write_text(json.dumps(timing,ensure_ascii=False,indent=2))
    print(json.dumps(timing,ensure_ascii=False,indent=2))
asyncio.run(main())
