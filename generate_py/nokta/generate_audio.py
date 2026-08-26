import asyncio
import json
import os

import edge_tts
import mutagen.mp3


VOICE_FILIZ = "tr-TR-EmelNeural"
VOICE_IBRAHIM = "tr-TR-AhmetNeural"

SCENES = [
    ("01", "filiz", "Merhaba arkadaşlar! Bugün geometrideki en küçük ama en önemli kavramlardan biri olan noktayı keşfedeceğiz. Hazırsanız başlayalım."),
    ("02", "ibrahim", "Noktanın eni, boyu veya yüksekliği yoktur. Yalnızca bulunduğu yeri, yani bir konumu gösterir. Noktaları büyük harflerle adlandırırız."),
    ("03", "filiz", "Kalemin kâğıda bıraktığı küçük iz, noktayı düşünmemize yardım eder. Örneğin bu izi A harfiyle adlandırabiliriz."),
    ("04", "ibrahim", "Gökyüzündeki yıldızlar gerçekte çok büyüktür. Ama çok uzakta oldukları için gözümüze küçük birer nokta gibi görünürler."),
    ("05", "filiz", "Ekrandaki resimler de piksel adı verilen çok küçük renkli noktalardan oluşur. Pikseller yan yana gelince görüntüyü oluşturur."),
    ("06", "ibrahim", "Noktaları birleştirdiğimizde doğru parçaları oluşur. Doğru parçalarını birleştirerek üçgen, kare ve başka geometrik şekiller çizebiliriz."),
    ("07", "filiz", "Tebrikler! Noktanın boyutu olmadığını, konum gösterdiğini ve büyük harflerle adlandırıldığını öğrendin. Çok güzel çalıştın!"),
]


async def generate():
    output_dir = "public/audio/matematik/nokta"
    os.makedirs(output_dir, exist_ok=True)
    timings = {}

    for scene_id, speaker, text in SCENES:
        output_path = os.path.join(output_dir, f"{scene_id}.mp3")
        voice = VOICE_FILIZ if speaker == "filiz" else VOICE_IBRAHIM
        await edge_tts.Communicate(text, voice, rate="+2%", pitch="+0Hz").save(output_path)
        audio_duration = mutagen.mp3.MP3(output_path).info.length
        timings[scene_id] = {"speaker": speaker, "audio_sec": round(audio_duration, 2), "total_sec": round(audio_duration + 0.45, 2)}
        print(f"Scene {scene_id}: {audio_duration + 0.45:.2f}s")

    with open("src/nokta/nokta_timings.json", "w", encoding="utf-8") as file:
        json.dump(timings, file, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    asyncio.run(generate())
