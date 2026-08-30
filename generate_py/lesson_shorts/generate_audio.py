import asyncio
import json
import re
import subprocess
from pathlib import Path

import edge_tts
import mutagen.mp3


VOICE = "tr-TR-AhmetNeural"
RATE = "+6%"
AUDIO_ROOT = Path("public/audio/shorts")
TIMINGS_PATH = Path("src/shorts/lesson-shorts/lesson_shorts_timings.json")
CONGRATS_DELAY_SECONDS = 1.0
CONGRATS_HOLD_SECONDS = 1.2

LESSONS = {
    "ay": {
        "question": "Ay'ın dört ana evresi nelerdir?",
        "answer": "Yeni ay, ilk dördün, dolunay ve son dördün.",
    },
    "gunes": {
        "question": "Güneş'in çapı, Dünya'nın çapının yaklaşık kaç katıdır?",
        "answer": "Yaklaşık yüz dokuz katıdır!",
    },
    "nokta": {
        "question": "Boyutu olmayan ama bir konum belirten geometrik kavram nedir?",
        "answer": "Bu kavram noktadır.",
    },
    "dogruparcasi": {
        "question": "İki noktayı birleştiren en kısa düz çizgiye ne denir?",
        "answer": "Doğru parçası denir.",
    },
    "isin": {
        "question": "Bir noktadan başlayıp tek yönde sonsuza uzanan düz çizgi nedir?",
        "answer": "Bu şekil ışındır.",
    },
    "dogru": {
        "question": "İki yönde sonsuza uzanan, uç noktası olmayan düz çizgi nedir?",
        "answer": "Bu şekil doğrudur.",
    },
    "cumle_genel": {
        "question": "Bir cümlenin konusunu bulmak için hangi soruyu sorarız?",
        "answer": "Bu cümlede neyden söz ediliyor, diye sorarız.",
    },
    "es_zit_anlam": {
        "question": "Ev-hane ve yaz-kış çiftlerinden hangisi zıt anlamlıdır?",
        "answer": "Yaz ve kış zıt; ev ve hane eş anlamlıdır.",
    },
    "somut_soyut": {
        "question": "Sevgi sözcüğü somut mu, soyut mu?",
        "answer": "Soyuttur; çünkü beş duyu organımızla algılayamayız.",
    },
    "tur": {
        "question": "Hikâyenin üç ana bölümü nelerdir?",
        "answer": "Serim, düğüm ve çözüm.",
    },
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


async def synthesize(slug: str, key: str, text: str, semaphore: asyncio.Semaphore) -> None:
    folder = AUDIO_ROOT / slug
    folder.mkdir(parents=True, exist_ok=True)
    async with semaphore:
        await edge_tts.Communicate(text, VOICE, rate=RATE, pitch="+0Hz").save(
            str(folder / f"{key}.mp3")
        )


async def generate() -> None:
    semaphore = asyncio.Semaphore(5)
    tasks = []
    for slug, lines in LESSONS.items():
        for key, text in lines.items():
            tasks.append(synthesize(slug, key, text, semaphore))
    await asyncio.gather(*tasks)

    all_timings = {}
    for slug, lesson in LESSONS.items():
        folder = AUDIO_ROOT / slug
        durations = {}
        windows = {}
        for key in ("question", "answer"):
            path = folder / f"{key}.mp3"
            durations[key] = mutagen.mp3.MP3(path).info.length
            windows[key] = detect_speech_window(path, durations[key])

        question_start = 0.35
        question_speech_start = question_start + windows["question"][0]
        question_speech_end = question_start + windows["question"][1]
        answer_speech_start = question_speech_end + 5.0
        answer_start = answer_speech_start - windows["answer"][0]
        answer_speech_end = answer_start + windows["answer"][1]
        total = answer_speech_end + CONGRATS_DELAY_SECONDS + CONGRATS_HOLD_SECONDS

        if total > 23.0:
            raise RuntimeError(f"{slug} videosu {total:.2f} saniye; 23 saniyeyi aşıyor")

        all_timings[slug] = {
            "fps": 30,
            "question_start": round(question_start, 3),
            "question_speech_start": round(question_speech_start, 3),
            "question_end": round(question_speech_end, 3),
            "answer_start": round(answer_start, 3),
            "answer_speech_start": round(answer_speech_start, 3),
            "answer_end": round(answer_speech_end, 3),
            "total_sec": round(total, 3),
            "durations": {key: round(value, 3) for key, value in durations.items()},
            "speech_windows": {
                key: [round(value[0], 3), round(value[1], 3)] for key, value in windows.items()
            },
            "lines": lesson,
        }

    TIMINGS_PATH.parent.mkdir(parents=True, exist_ok=True)
    TIMINGS_PATH.write_text(
        json.dumps(all_timings, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps({slug: timing["total_sec"] for slug, timing in all_timings.items()}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    asyncio.run(generate())
