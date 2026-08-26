import asyncio
import json
import os

import edge_tts
import mutagen.mp3


VOICE_FILIZ = "tr-TR-EmelNeural"
VOICE_IBRAHIM = "tr-TR-AhmetNeural"

DIALOGUES = [
    (
        "01",
        "filiz",
        "Merhaba arkadaşlar! Noktayı öğrendik. Şimdi iki noktayı birleştirerek doğru parçasını keşfedeceğiz.",
        "ibrahim",
        "İki noktayı birleştirmek için çizilen en kısa düz çizgiye doğru parçası denir.",
    ),
    (
        "02",
        "ibrahim",
        "Doğru parçası her zaman düzdür ve belirli, yani sonlu bir uzunluğu vardır.",
        "filiz",
        "Ayrıca iki uç noktayla sınırlıdır. Bir uçtan başlar, diğer uçta biter.",
    ),
    (
        "03",
        "filiz",
        "Üçgen, kare ve dikdörtgen gibi çokgenlerin kenarları doğru parçalarının birleşmesiyle oluşur.",
        "ibrahim",
        "Uçları A ve B ise doğru parçasını, köşeli parantez içinde A B ya da B A biçiminde adlandırırız.",
    ),
    (
        "04",
        "ibrahim",
        "Şimdi doğru parçasının uzunluğunu ölçelim. Uzunluk, iki uç noktası arasındaki mesafedir.",
        "filiz",
        "Ölçmek için cetvel ya da ölçü bandı kullanır; sonucu santimetre, metre veya milimetreyle yazarız.",
    ),
    (
        "05",
        "filiz",
        "İki nokta arasındaki mesafe, onları birleştiren doğru parçasının uzunluğuna eşittir.",
        "ibrahim",
        "Bir çokgenin çevresini bulmak için bütün kenar uzunluklarını toplarız.",
    ),
    (
        "06",
        "ibrahim",
        "Dikdörtgenin alanını bulmak için kısa kenar uzunluğuyla uzun kenar uzunluğunu çarparız.",
        "filiz",
        "A B doğru parçasının uzunluğunu iki dik çizgi arasında A B biçiminde gösteririz. Adıyla uzunluğu farklı gösterilir.",
    ),
    (
        "07",
        "filiz",
        "Hatırlayalım: Doğru parçası düz, sonlu ve iki uç noktalıdır. Uzunluğu ölçülebilir.",
        "ibrahim",
        "Harika çalıştın! Artık doğru parçasını tanıyabilir, adlandırabilir ve uzunluğunu ölçebilirsin.",
    ),
]


async def generate():
    output_dir = "public/audio/matematik/dogruparcasi"
    os.makedirs(output_dir, exist_ok=True)
    timings = {}

    for scene_id, speaker_1, text_1, speaker_2, text_2 in DIALOGUES:
        first_path = os.path.join(output_dir, f"{scene_id}_1.mp3")
        second_path = os.path.join(output_dir, f"{scene_id}_2.mp3")
        first_voice = VOICE_FILIZ if speaker_1 == "filiz" else VOICE_IBRAHIM
        second_voice = VOICE_FILIZ if speaker_2 == "filiz" else VOICE_IBRAHIM

        await edge_tts.Communicate(text_1, first_voice, rate="+2%", pitch="+0Hz").save(first_path)
        await edge_tts.Communicate(text_2, second_voice, rate="+2%", pitch="+0Hz").save(second_path)

        first_duration = mutagen.mp3.MP3(first_path).info.length
        total_duration = first_duration + mutagen.mp3.MP3(second_path).info.length + 0.35
        timings[scene_id] = {
            "first_speaker": speaker_1,
            "split_sec": round(first_duration, 2),
            "total_sec": round(total_duration, 2),
        }
        print(f"Scene {scene_id}: {total_duration:.2f}s")

    os.makedirs("src/dogruparcasi", exist_ok=True)
    with open("src/dogruparcasi/dogruparcasi_timings.json", "w", encoding="utf-8") as file:
        json.dump(timings, file, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    asyncio.run(generate())
