import asyncio
import json
import math
import subprocess
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[2]
DATA = json.loads((ROOT / "content/mezopotamya.json").read_text())
BASE = ROOT / "public/audio/sosyal/mezopotamya"
VOICES = {"filiz": "tr-TR-EmelNeural", "ibrahim": "tr-TR-AhmetNeural"}

def frames(path: Path) -> int:
    seconds = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)], text=True))
    return math.ceil(seconds * 30)

async def make(text: str, speaker: str, path: Path) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    await edge_tts.Communicate(text, VOICES[speaker], rate="-2%").save(str(path))
    return frames(path)

async def main() -> None:
    timings = {"main": [], "kurz": [], "shorts": []}
    for group in ("main", "kurz"):
        for scene in DATA[group]:
            audio = await make(scene["text"], scene["speaker"], BASE / group / f'{scene["id"]}.mp3')
            timings[group].append({"audioFrames": audio, "frames": audio + 12})
    short = DATA["shorts"][0]
    question = await make(short["question"], "ibrahim", BASE / "shorts/question.mp3")
    answer = await make(short["answer"], "ibrahim", BASE / "shorts/answer.mp3")
    reveal = question + 150
    answer_end = reveal + answer
    timings["shorts"].append({"qEnd": question, "reveal": reveal, "aEnd": answer_end, "congrats": answer_end, "frames": answer_end + 45})
    target = ROOT / "src/mezopotamya"
    target.mkdir(parents=True, exist_ok=True)
    (target / "timings.json").write_text(json.dumps(timings, indent=2) + "\n")

asyncio.run(main())
