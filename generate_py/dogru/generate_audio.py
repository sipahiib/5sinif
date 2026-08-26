import asyncio
import json
import os

import edge_tts
import mutagen.mp3


VOICE_FILIZ = "tr-TR-EmelNeural"
VOICE_IBRAHIM = "tr-TR-AhmetNeural"

SCENES = [
    ("01", "filiz", "Merhaba arkadaşlar! Bugün iki yönde sonsuza uzanan doğruyla tanışacağız. Düz ve bitmeyen yolculuğumuz şimdi başlıyor!"),
    ("02", "ibrahim", "Doğrunun başlangıç ve bitiş noktası yoktur. Düz bir çizgi üzerinde her iki yönde sonsuza uzar. İki uçtaki oklar bu özelliği gösterir."),
    ("03", "filiz", "Bir doğruyu adlandırmak için üzerindeki iki noktayı kullanabiliriz. A ve B noktalarından geçen doğruyu, üzerinde çift yönlü ok bulunan A B biçiminde gösteririz."),
    ("04", "ibrahim", "Doğruyu adlandırırken noktaların sırası önemli değildir. A B doğrusu ile B A doğrusu aynı doğruyu gösterir. Çünkü doğru her iki yönde de sonsuzdur."),
    ("05", "filiz", "Doğrular küçük harflerle de adlandırılabilir. Örnekte A ve B noktalarından geçen doğruya d doğrusu adını verebiliriz."),
    ("06", "ibrahim", "Şimdi kareli zeminde farklı noktalar seçelim. Noktalardan geçen düz çizgileri iki yönde uzatıp uçlarına ok ekleyerek üç farklı doğru oluşturalım."),
    ("07", "filiz", "Karşılaştıralım: Doğru parçasının iki ucu sınırlıdır. Işının bir başlangıcı ve tek yönlü oku vardır. Doğrunun ise iki ucunda ok bulunur."),
    ("08", "ibrahim", "Tebrikler! Doğrunun düz olduğunu, iki yönde sonsuza uzandığını ve iki noktayla ya da küçük bir harfle adlandırılabildiğini öğrendin."),
]


async def generate():
    output_dir = "public/audio/matematik/dogru"
    os.makedirs(output_dir, exist_ok=True)
    timings = {}

    for scene_id, speaker, text in SCENES:
        output_path = os.path.join(output_dir, f"{scene_id}.mp3")
        voice = VOICE_FILIZ if speaker == "filiz" else VOICE_IBRAHIM
        await edge_tts.Communicate(text, voice, rate="+2%", pitch="+0Hz").save(output_path)
        audio_duration = mutagen.mp3.MP3(output_path).info.length
        timings[scene_id] = {"speaker": speaker, "audio_sec": round(audio_duration, 2), "total_sec": round(audio_duration + 0.45, 2)}
        print(f"Scene {scene_id}: {audio_duration + 0.45:.2f}s")

    with open("src/dogru/dogru_timings.json", "w", encoding="utf-8") as file:
        json.dump(timings, file, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    asyncio.run(generate())
