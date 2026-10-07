import asyncio, hashlib, json, math, struct, subprocess, wave
from pathlib import Path
import edge_tts

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'public/audio/promos/story-yeni-konular'
SRC=ROOT/'src/story-yeni-konular'
TEXTS=[('opening','Yeni konular eklendi. YouTube’dan takip edin'),('force','Kuvvet'),('angles','Açılar'),('culture','Kültürel özellikler'),('words','Somut ve soyut'),('closing',"Ders Kutusu'nu YouTube'da izle, abone ol")]

async def main():
    OUT.mkdir(parents=True,exist_ok=True);SRC.mkdir(parents=True,exist_ok=True)
    scenes=[]
    for key,text in TEXTS:
        digest=hashlib.sha256((text+'tr-TR-EmelNeural-2%').encode()).hexdigest()[:10]
        raw=OUT/f'{key}-{digest}.mp3';wav=OUT/f'{key}-{digest}.wav'
        if not raw.exists() or raw.stat().st_size<100:
            cached=ROOT/'public/audio/promos/story-dort-ders/closing-2ab88f4208.mp3'
            if key=='closing' and cached.exists():
                raw.write_bytes(cached.read_bytes())
            else:
                tmp=raw.with_suffix('.partial.mp3')
                await edge_tts.Communicate(text,'tr-TR-EmelNeural',rate='-2%').save(str(tmp))
                tmp.replace(raw)
        subprocess.run(['ffmpeg','-y','-v','error','-i',str(raw),'-af','silenceremove=start_periods=1:start_duration=0.02:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_duration=0.02:start_threshold=-45dB,areverse,loudnorm=I=-16:TP=-2:LRA=7','-ar','44100',str(wav)],check=True)
        seconds=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(wav)]))
        scenes.append({'id':key,'text':text,'audio':str(wav.relative_to(ROOT/'public')),'audioSeconds':seconds,'audioFrames':math.ceil(seconds*30)})
        print(key,round(seconds,3),flush=True)
    minimums=[90,55,55,55,55,110]
    durations=[max(m,s['audioFrames']+8) for m,s in zip(minimums,scenes)]
    total=max(420,sum(durations))
    if total>450:raise RuntimeError('Narration exceeds the 15 second Story limit')
    durations[-1]+=total-sum(durations)
    cursor=0
    for s,d in zip(scenes,durations):
        s.update({'from':cursor,'frames':d,'voiceFrom':3});cursor+=d
    (SRC/'timeline.json').write_text(json.dumps({'fps':30,'durationInFrames':total,'scenes':scenes},ensure_ascii=False,indent=2))
    rate=44100;length=total/30;samples=[0.0]*round(length*rate);beat=60/108
    notes=[523.25,659.25,783.99,987.77,783.99,659.25,587.33,783.99]
    for k in range(math.ceil(length/(beat/2))):
        for j in range(int(rate*.42)):
            pos=round(k*beat/2*rate)+j
            if pos>=len(samples):break
            t=j/rate;hz=notes[k%8]
            samples[pos]+=.035*min(1,t/.008)*math.exp(-t*12)*(math.sin(2*math.pi*hz*t)+.18*math.sin(4*math.pi*hz*t))
    for start in [s['from']/30 for s in scenes[1:]]:
        for j in range(int(rate*.22)):
            pos=round(start*rate)+j
            if pos>=len(samples):break
            t=j/rate;samples[pos]+=.022*math.sin(2*math.pi*1046.5*t)*math.exp(-t*18)*min(1,t/.008)
    with wave.open(str(OUT/'music.wav'),'wb') as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate)
        for i,s in enumerate(samples):
            t=i/rate;fade=min(1,t/.15,max(0,(length-t)/.4));w.writeframesraw(struct.pack('<h',round(s*fade*32767)))
    print('TOTAL',total/30,'SCENE_FRAMES',durations,flush=True)

asyncio.run(main())
