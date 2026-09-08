import asyncio
import json
import math
import subprocess
import sys
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[2]
DATA = json.loads((ROOT / "content/es_zit_anlam.json").read_text())
BASE = ROOT / "public/audio/turkce/es-zit-anlam"
VOICES = {"filiz": "tr-TR-EmelNeural", "ibrahim": "tr-TR-AhmetNeural"}
FORCE = "--force" in sys.argv

def duration(path):
    return float(subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=nw=1:nk=1", str(path)
    ], text=True))

async def make(scene, group):
    path = BASE / group / f"{scene['id']}.mp3"
    path.parent.mkdir(parents=True, exist_ok=True)
    if FORCE or not path.exists() or path.stat().st_size < 1000:
        await edge_tts.Communicate(scene["text"], VOICES[scene["speaker"]], rate="+2%").save(str(path))
    seconds = duration(path)
    print(f"{scene['id']}: {seconds:.3f}s", flush=True)
    return {"audioFrames": math.ceil(seconds * 30), "frames": math.ceil(seconds * 30) + 12}

async def main():
    timings = {"main": [], "kurz": []}
    for group in ("main", "kurz"):
        for index, scene in enumerate(DATA[group]):
            item = await make(scene, group)
            if group == "kurz" and index == len(DATA[group]) - 1:
                item["frames"] = item["audioFrames"]
            timings[group].append(item)
    target = ROOT / "src/es-zit-anlam/timings.json"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps(timings, indent=2) + "\n")

asyncio.run(main())
