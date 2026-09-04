import asyncio
import json
from pathlib import Path

import edge_tts
import mutagen.mp3

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "public/audio/channel_trailer"
TIMINGS = ROOT / "src/channel-trailer/channel_trailer_timings.json"

LINES = [
    ("01", "tr-TR-EmelNeural", "Ders Kutusu, beşinci sınıf konularını kısa, anlaşılır ve görsel derslerle öğrenmeni kolaylaştırır."),
    ("02", "tr-TR-AhmetNeural", "Türkçe, matematik, fen ve sosyal bilgiler; hareketli örnekler ve adım adım açıklamalarla işlenir."),
    ("03", "tr-TR-EmelNeural", "Mini sorular ve Shorts videolarıyla öğrendiklerini kontrol eder, bilgini hızlıca pekiştirirsin."),
]


async def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    await asyncio.gather(*[
        edge_tts.Communicate(text, voice, rate="+8%", pitch="+0Hz").save(str(OUTPUT / f"{key}.mp3"))
        for key, voice, text in LINES
    ])
    timings = {
        key: {"duration": round(mutagen.mp3.MP3(OUTPUT / f"{key}.mp3").info.length, 3), "text": text}
        for key, _, text in LINES
    }
    TIMINGS.parent.mkdir(parents=True, exist_ok=True)
    TIMINGS.write_text(json.dumps(timings, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(timings, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
