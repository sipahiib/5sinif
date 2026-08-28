import asyncio
import json
import re
import subprocess
from pathlib import Path

import edge_tts
import mutagen.mp3


VOICE = "tr-TR-EmelNeural"
OUTPUT_DIR = Path("public/audio/sosyal/haklar_shorts")
TIMINGS_PATH = Path("src/haklar-shorts/haklar_shorts_timings.json")

LINES = {
    "question": "Okulda güvenli bir ortamda bulunmak hakkımızsa, bu hakkı koruyan sorumluluklarımız nelerdir?",
    "answer": "Kurallara uymak, başkalarının haklarına saygı duymak ve okul araçlarını özenli kullanmak!",
    "cta": "Cevabı bildiysen beğen, yeni dersler için abone ol!",
}


def detect_speech_window(path: Path, duration: float) -> tuple[float, float]:
    result = subprocess.run(
        [
            "ffmpeg",
            "-hide_banner",
            "-i",
            str(path),
            "-af",
            "silencedetect=noise=-40dB:d=0.12",
            "-f",
            "null",
            "-",
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    output = result.stderr
    silence_ends = [float(value) for value in re.findall(r"silence_end: ([0-9.]+)", output)]
    silence_starts = [float(value) for value in re.findall(r"silence_start: ([0-9.]+)", output)]
    speech_start = silence_ends[0] if silence_ends and silence_ends[0] < 1.5 else 0.0
    speech_end = silence_starts[-1] if silence_starts and silence_starts[-1] > duration / 2 else duration
    return speech_start, speech_end


async def generate() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    TIMINGS_PATH.parent.mkdir(parents=True, exist_ok=True)
    durations: dict[str, float] = {}
    windows: dict[str, tuple[float, float]] = {}

    for key, text in LINES.items():
        path = OUTPUT_DIR / f"{key}.mp3"
        await edge_tts.Communicate(text, VOICE, rate="+6%", pitch="+0Hz").save(str(path))
        durations[key] = mutagen.mp3.MP3(path).info.length
        windows[key] = detect_speech_window(path, durations[key])

    question_start = 0.35
    question_speech_end = question_start + windows["question"][1]
    answer_speech_start = question_speech_end + 4.6
    answer_start = answer_speech_start - windows["answer"][0]
    answer_speech_end = answer_start + windows["answer"][1]
    cta_speech_start = answer_speech_end + 0.18
    cta_start = cta_speech_start - windows["cta"][0]
    total_sec = max(cta_start + durations["cta"] + 0.45, 18.0)

    timing = {
        "fps": 30,
        "question_start": round(question_start, 3),
        "question_speech_start": round(question_start + windows["question"][0], 3),
        "question_end": round(question_speech_end, 3),
        "answer_start": round(answer_start, 3),
        "answer_speech_start": round(answer_speech_start, 3),
        "answer_end": round(answer_speech_end, 3),
        "cta_start": round(cta_start, 3),
        "cta_speech_start": round(cta_speech_start, 3),
        "cta_end": round(cta_start + windows["cta"][1], 3),
        "total_sec": round(total_sec, 3),
        "lines": LINES,
    }
    TIMINGS_PATH.write_text(json.dumps(timing, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(timing, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    asyncio.run(generate())
