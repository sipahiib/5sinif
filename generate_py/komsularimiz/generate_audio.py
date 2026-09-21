import asyncio, json, math, subprocess
from pathlib import Path
import edge_tts

ROOT=Path(__file__).resolve().parents[2]
DATA=json.loads((ROOT/"content/komsularimiz.json").read_text())
BASE=ROOT/"public/audio/sosyal/komsularimiz"
VOICES={"filiz":"tr-TR-EmelNeural","ibrahim":"tr-TR-AhmetNeural"}
FPS=30

def duration(path):
    return float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","default=nw=1:nk=1",str(path)],text=True))

async def make(text,speaker,path):
    path.parent.mkdir(parents=True,exist_ok=True)
    for attempt in range(3):
        try:
            await edge_tts.Communicate(text,VOICES[speaker],rate="+2%").save(str(path)); break
        except Exception:
            if attempt==2: raise
    return math.ceil(duration(path)*FPS)

async def main():
    timings={"main":[],"kurz":[],"shorts":[]}
    for group in ("main","kurz"):
        for i,scene in enumerate(DATA[group]):
            af=await make(scene["text"],scene["speaker"],BASE/group/f"{scene['id']}.mp3")
            tail=0 if group=="kurz" and i==len(DATA[group])-1 else 12
            timings[group].append({"audioFrames":af,"frames":af+tail})
    main_frames=sum(x["frames"] for x in timings["main"])+210
    kurz_frames=sum(x["frames"] for x in timings["kurz"])
    if kurz_frames>math.floor(main_frames*.70): raise RuntimeError(f"Kurz %70 sınırını aşıyor: {kurz_frames/main_frames:.1%}")
    for i,item in enumerate(DATA["shorts"],1):
        target=BASE/"shorts"/str(i)
        q=await make(item["question"],"ibrahim",target/"question.mp3")
        a=await make(item["answer"],"ibrahim",target/"answer.mp3")
        reveal=q+150; end=reveal+a
        timings["shorts"].append({"qEnd":q,"reveal":reveal,"aEnd":end,"congrats":end,"frames":end+45})
    out=ROOT/"src/komsularimiz/timings.json"
    out.write_text(json.dumps(timings,ensure_ascii=False,indent=2)+"\n")
    print(out)

asyncio.run(main())
