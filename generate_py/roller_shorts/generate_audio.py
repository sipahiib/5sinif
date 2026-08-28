import asyncio
import json
import re
import subprocess
from pathlib import Path

import edge_tts
import mutagen.mp3


VOICE = "tr-TR-AhmetNeural"
RATE = "+6%"
OUTPUT_DIR = Path("public/audio/sosyal/roller_shorts")
TIMINGS_PATH = Path("src/roller-shorts/roller_shorts_timings.json")

LINES = {
    "question": "Hasan'ın evde, okulda ve halk oyunlarındaki rolleri neler?",
    "answer": "Evde çocuk, okulda öğrenci, halk oyunlarında oyuncu!",
    "cta": "Bu tip örnekler için kanalımıza bekliyoruz!",
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
    speech_windows: dict[str, tuple[float, float]] = {}
    for key, text in LINES.items():
        path = OUTPUT_DIR / f"{key}.mp3"
        metadata_path = OUTPUT_DIR / f"{key}_words.jsonl"
        await edge_tts.Communicate(
            text, VOICE, rate=RATE, pitch="+0Hz", boundary="WordBoundary"
        ).save(
            str(path), str(metadata_path)
        )
        durations[key] = mutagen.mp3.MP3(path).info.length
        speech_windows[key] = detect_speech_window(path, durations[key])

    question_start = 0.35
    question_speech_end = question_start + speech_windows["question"][1]
    countdown_start = question_speech_end
    answer_speech_start = countdown_start + 5.0
    answer_start = answer_speech_start - speech_windows["answer"][0]
    answer_speech_end = answer_start + speech_windows["answer"][1]
    cta_speech_start = answer_speech_end + 0.20
    cta_start = cta_speech_start - speech_windows["cta"][0]
    total = max(15.0, cta_start + durations["cta"] + 0.45)

    starts = {
        "question": question_start,
        "answer": answer_start,
        "cta": cta_start,
    }
    captions = []
    for key in LINES:
        metadata_path = OUTPUT_DIR / f"{key}_words.jsonl"
        words = [
            json.loads(line)
            for line in metadata_path.read_text(encoding="utf-8").splitlines()
            if line.strip() and json.loads(line)["type"] == "WordBoundary"
        ]
        metadata_start = words[0]["offset"] / 10_000_000
        metadata_end = (words[-1]["offset"] + words[-1]["duration"]) / 10_000_000
        speech_start, speech_end = speech_windows[key]
        metadata_scale = (speech_end - speech_start) / (metadata_end - metadata_start)

        def aligned_time(raw_offset: float) -> float:
            return starts[key] + speech_start + (raw_offset - metadata_start) * metadata_scale

        group = []
        for word in words:
            proposed = " ".join([item["text"] for item in group] + [word["text"]])
            if group and (len(group) >= 3 or len(proposed) > 15):
                captions.append(
                    {
                        "start": round(aligned_time(group[0]["offset"] / 10_000_000), 3),
                        "end": round(aligned_time((group[-1]["offset"] + group[-1]["duration"]) / 10_000_000), 3),
                        "text": " ".join(item["text"] for item in group),
                    }
                )
                group = []
            group.append(word)
        if group:
            captions.append(
                {
                    "start": round(aligned_time(group[0]["offset"] / 10_000_000), 3),
                    "end": round(aligned_time((group[-1]["offset"] + group[-1]["duration"]) / 10_000_000), 3),
                    "text": " ".join(item["text"] for item in group),
                }
            )

    timing = {
        "fps": 30,
        "question_start": round(question_start, 3),
        "question_speech_start": round(question_start + speech_windows["question"][0], 3),
        "question_end": round(question_speech_end, 3),
        "countdown_start": round(countdown_start, 3),
        "answer_start": round(answer_start, 3),
        "answer_speech_start": round(answer_speech_start, 3),
        "answer_end": round(answer_speech_end, 3),
        "cta_start": round(cta_start, 3),
        "cta_speech_start": round(cta_speech_start, 3),
        "cta_end": round(cta_start + speech_windows["cta"][1], 3),
        "total_sec": round(total, 3),
        "durations": {key: round(value, 3) for key, value in durations.items()},
        "speech_windows": {key: [round(value[0], 3), round(value[1], 3)] for key, value in speech_windows.items()},
        "lines": LINES,
        "captions": captions,
    }
    TIMINGS_PATH.write_text(json.dumps(timing, ensure_ascii=False, indent=2), encoding="utf-8")

    print(json.dumps(timing, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    asyncio.run(generate())
