import asyncio
import json
import math
import subprocess
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[2]
DATA = json.loads((ROOT / "content/cevremiz.json").read_text())
BASE = ROOT / "public/audio/sosyal/cevremiz"
VOICES = {"filiz": "tr-TR-EmelNeural", "ibrahim": "tr-TR-AhmetNeural"}
FPS = 30


def duration(path: Path) -> float:
    return float(
        subprocess.check_output(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)],
            text=True,
        )
    )


async def make(text: str, speaker: str, path: Path) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists() or path.stat().st_size < 1000:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(text, VOICES[speaker], rate="+2%").save(str(path))
                break
            except Exception:
                if attempt == 2:
                    raise
    seconds = duration(path)
    print(f"{path.relative_to(ROOT)}: {seconds:.3f}s", flush=True)
    return math.ceil(seconds * FPS)


async def main() -> None:
    timings = {"main": [], "kurz": [], "shorts": []}
    for group in ("main", "kurz"):
        for index, scene in enumerate(DATA[group]):
            audio_frames = await make(scene["text"], scene["speaker"], BASE / group / f"{scene['id']}.mp3")
            tail = 0 if group == "kurz" and index == len(DATA[group]) - 1 else 12
            timings[group].append({"audioFrames": audio_frames, "frames": audio_frames + tail})

    main_frames = sum(item["frames"] for item in timings["main"]) + 210
    kurz_frames = sum(item["frames"] for item in timings["kurz"])
    if kurz_frames > math.floor(main_frames * 0.70):
        raise RuntimeError(
            f"Kurz süresi ana videonun %70 sınırını aşıyor: {kurz_frames / FPS:.2f}s / {main_frames / FPS:.2f}s"
        )

    for index, item in enumerate(DATA["shorts"], start=1):
        target = BASE / "shorts" / str(index)
        question_frames = await make(item["question"], "ibrahim", target / "question.mp3")
        answer_frames = await make(item["answer"], "ibrahim", target / "answer.mp3")
        q_end = question_frames
        reveal = q_end + 5 * FPS
        answer_end = reveal + answer_frames
        timings["shorts"].append(
            {"qEnd": q_end, "reveal": reveal, "aEnd": answer_end, "congrats": answer_end, "frames": answer_end + 45}
        )

    target = ROOT / "src/cevremiz/timings.json"
    target.write_text(json.dumps(timings, indent=2, ensure_ascii=False) + "\n")
    print(f"Yazıldı: {target.relative_to(ROOT)}")


asyncio.run(main())
