import asyncio
import json
import os

import edge_tts
import mutagen.mp3


VOICE_FILIZ = "tr-TR-EmelNeural"
VOICE_IBRAHIM = "tr-TR-AhmetNeural"

SCENES = [
    ("01", "filiz", "Merhaba arkadaşlar! Bugün bir noktadan başlayıp tek yönde sonsuza uzanan ışını keşfedeceğiz. Sonsuz yolculuğumuz başlasın!"),
    ("02", "ibrahim", "Işının bir başlangıç noktası vardır. Bu noktadan sonra aynı yönde hiç durmadan uzar. Ok işareti, ışının hangi yöne gittiğini gösterir."),
    ("03", "filiz", "Işını adlandırırken önce başlangıç noktasını, sonra ışın üzerindeki başka bir noktayı söyleriz. A'dan başlayıp B'den geçen ışına A B ışını denir."),
    ("04", "ibrahim", "Açılar iki ışının aynı başlangıç noktasından çıkmasıyla oluşur. Ortak başlangıç noktasına açının köşesi, ışınlara da açının kolları denir."),
    ("05", "filiz", "Bir el fenerinin ışığını düşün. Işık kaynağından çıkar ve seçtiğimiz yönde ilerler. Bu görüntü, ışını hatırlamamıza yardım eder."),
    ("06", "ibrahim", "Kareli zeminde bir başlangıç noktası seçelim. Sonra farklı yönlerde oklar çizerek üç ayrı ışın oluşturalım ve başlangıç noktasını önce yazarak adlandıralım."),
    ("07", "filiz", "Tebrikler! Işının bir başlangıç noktası olduğunu, tek yönde sonsuza uzandığını ve açılar oluşturduğunu öğrendin. Harika çalıştın!"),
]


async def generate():
    output_dir = "public/audio/matematik/isin"
    os.makedirs(output_dir, exist_ok=True)
    timings = {}

    for scene_id, speaker, text in SCENES:
        output_path = os.path.join(output_dir, f"{scene_id}.mp3")
        voice = VOICE_FILIZ if speaker == "filiz" else VOICE_IBRAHIM
        await edge_tts.Communicate(text, voice, rate="+2%", pitch="+0Hz").save(output_path)
        audio_duration = mutagen.mp3.MP3(output_path).info.length
        timings[scene_id] = {"speaker": speaker, "audio_sec": round(audio_duration, 2), "total_sec": round(audio_duration + 0.45, 2)}
        print(f"Scene {scene_id}: {audio_duration + 0.45:.2f}s")

    with open("src/isin/isin_timings.json", "w", encoding="utf-8") as file:
        json.dump(timings, file, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    asyncio.run(generate())
