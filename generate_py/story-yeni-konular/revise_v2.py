import json, math, struct, wave
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
timeline=ROOT/'src/story-yeni-konular/timeline.json'
original=timeline.with_name('timeline-v1.json')
if not original.exists():original.write_bytes(timeline.read_bytes())
data=json.loads(original.read_text())
cursor=0
for scene in data['scenes']:
    scene['from']=cursor
    scene['frames']+=60
    scene['voiceEnabled']=False
    cursor+=scene['frames']
data.update({'durationInFrames':cursor,'revision':2,'narrationEnabled':False,'extraSecondsPerScene':2})
timeline.write_text(json.dumps(data,ensure_ascii=False,indent=2))

rate=44100;length=cursor/30;samples=[0.0]*round(length*rate);beat=60/108
notes=[523.25,659.25,783.99,987.77,783.99,659.25,587.33,783.99]
for k in range(math.ceil(length/(beat/2))):
    for j in range(int(rate*.42)):
        pos=round(k*beat/2*rate)+j
        if pos>=len(samples):break
        t=j/rate;hz=notes[k%8]
        samples[pos]+=.035*min(1,t/.008)*math.exp(-t*12)*(math.sin(2*math.pi*hz*t)+.18*math.sin(4*math.pi*hz*t))
for start in [s['from']/30 for s in data['scenes'][1:]]:
    for j in range(int(rate*.22)):
        pos=round(start*rate)+j
        if pos>=len(samples):break
        t=j/rate;samples[pos]+=.022*math.sin(2*math.pi*1046.5*t)*math.exp(-t*18)*min(1,t/.008)
with wave.open(str(ROOT/'public/audio/promos/story-yeni-konular/music-v2.wav'),'wb') as w:
    w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate)
    for i,s in enumerate(samples):
        t=i/rate;fade=min(1,t/.15,max(0,(length-t)/.4));w.writeframesraw(struct.pack('<h',round(s*fade*32767)))
print('V2',cursor,'frames',length,'seconds',[(s['id'],s['frames']/30) for s in data['scenes']])
