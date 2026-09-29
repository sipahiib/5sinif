import asyncio
import json
import math
import subprocess
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[2]
DATA = json.loads((ROOT / "content/anadoluda_ilkhayat.json").read_text())
BASE = ROOT / "public/audio/sosyal/anadoluda_ilkhayat"
VOICES = {"filiz": "tr-TR-EmelNeural", "ibrahim": "tr-TR-AhmetNeural"}
FPS = 30


def duration(path):
    return float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)],
        text=True,
    ))


async def make(text, speaker, path, rate="-2%"):
    path.parent.mkdir(parents=True, exist_ok=True)
    for attempt in range(3):
        try:
            await edge_tts.Communicate(text, VOICES[speaker], rate=rate).save(str(path))
            break
        except Exception:
            if attempt == 2:
                raise
            await asyncio.sleep(2)
    return math.ceil(duration(path) * FPS)


async def main():
    out = ROOT / "src/anadoluda-ilkhayat/timings.json"
    shorts_only = "--shorts-only" in sys.argv
    kurz2_only = "--kurz2-only" in sys.argv
    kurz_only = "--kurz-only" in sys.argv
    timings = json.loads(out.read_text()) if shorts_only or kurz2_only or kurz_only else {"main": [], "kurz": [], "shorts": []}
    if kurz_only:
        timings["kurz"] = []
        for i, scene in enumerate(DATA["kurz"]):
            audio = await make(scene["text"], scene["speaker"], BASE / "kurz" / f"{i+1:02d}.mp3")
            timings["kurz"].append({"audioFrames": audio, "frames": audio + (0 if i == len(DATA["kurz"])-1 else 12)})
    elif not shorts_only and not kurz2_only:
        for group in ("main", "kurz"):
            for i, scene in enumerate(DATA[group]):
                af = await make(scene["text"], scene["speaker"], BASE / group / f"{i+1:02d}.mp3")
                timings[group].append({"audioFrames": af, "frames": af + (0 if group == "kurz" and i == len(DATA[group])-1 else 12)})
    main_frames = sum(t["frames"] for t in timings["main"]) + 210
    kurz_frames = sum(t["frames"] for t in timings["kurz"])
    if main_frames > 9000:
        raise RuntimeError(f"Ana video 300 saniyeyi aşıyor: {main_frames / FPS:.1f}s")
    if kurz_frames < math.ceil(main_frames * .50):
        raise RuntimeError(f"Kurz %50 alt sınırının altında: {kurz_frames/main_frames:.1%}")
    if kurz_frames > math.floor(main_frames * .70):
        raise RuntimeError(f"Kurz %70 sınırını aşıyor: {kurz_frames/main_frames:.1%}")
    if kurz2_only:
        audio_frames = []
        for i, scene in enumerate(DATA["kurz2"]):
            audio_frames.append(await make(scene["text"], scene["speaker"], BASE / "kurz2" / f"{i+1:02d}.mp3"))
        remaining = 900 - sum(audio_frames)
        if remaining < 0:
            raise RuntimeError(f"Kurz 2 sesleri 30 saniyeyi aşıyor: {sum(audio_frames) / FPS:.1f}s")
        timings["kurz2"] = []
        for i, audio in enumerate(audio_frames):
            tail = remaining // len(audio_frames) + (1 if i < remaining % len(audio_frames) else 0)
            timings["kurz2"].append({"audioFrames": audio, "frames": audio + tail})
    elif shorts_only:
        timings["shorts"] = []
        for i, item in enumerate(DATA["shorts"], 1):
            target = BASE / "shorts" / str(i)
            q = await make(item["question"], "ibrahim", target / "question.mp3", "-2%")
            a = await make(item["answer"], "ibrahim", target / "answer.mp3", "-2%")
            reveal = q + 150
            end = reveal + a
            timings["shorts"].append({"qEnd": q, "reveal": reveal, "aEnd": end, "congrats": end, "frames": end + 45})
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(timings, ensure_ascii=False, indent=2) + "\n")
    if kurz2_only:
        print(f"kurz2={sum(x['frames'] for x in timings['kurz2'])/FPS:.1f}s audio={sum(x['audioFrames'] for x in timings['kurz2'])/FPS:.1f}s")
    elif kurz_only:
        print(f"kurz={sum(x['frames'] for x in timings['kurz'])/FPS:.1f}s")
    else:
        print(f"main={main_frames/FPS:.1f}s kurz={kurz_frames/FPS:.1f}s short={timings['shorts'][0]['frames']/FPS:.1f}s")


asyncio.run(main())
