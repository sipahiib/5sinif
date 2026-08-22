import asyncio
import json
import os

import edge_tts
import mutagen.mp3

VOICE_FILIZ = "tr-TR-EmelNeural"
VOICE_IBRAHIM = "tr-TR-AhmetNeural"

# Each scene is split into two speakers so the character animation follows the measured audio.
dialogues = [
    ("01", "filiz", "Merhaba arkadaşlar, selam! Bugün Ay’ın Dünya etrafındaki hareketi sırasında Güneş’ten aldığı ışığı farklı şekillerde nasıl gördüğümüzü öğreneceğiz. Ay’ın Dünya’dan görünen aydınlık yüzünün değişmesine Ay’ın evreleri denir.", "ibrahim", "Ay’ın ana evreleri yeni ay, ilk dördün, dolunay ve son dördündür."),
    ("02", "ibrahim", "Yeni ay evresinde Ay, Dünya ile Güneş arasındadır. Güneş, Ay’ın Dünya’dan görünmeyen kısmını aydınlatır. Ay’ın karanlık kısmı Dünya’ya dönük olduğundan Ay’ı göremeyiz.", "filiz", "İlk dördünde Ay, Dünya’dan yarım daire şeklinde görülür. Yeni ay evresinden sonra Ay, Dünya etrafında çeyrek, yani dörtte bir tur atmıştır ve sağ yarısı aydınlıktır."),
    ("03", "filiz", "Dolunay evresinde Ay’ın Dünya’dan görünen kısmı Güneş ışınlarını tam aldığı için aydınlanır. Bu evrede Ay’ın aydınlık yüzünün tamamı Dünya üzerinde yuvarlak olarak görülür.", "ibrahim", "Son dördünde Ay, ilk dördün evresindeki gibi yarım daire şeklinde görülür. Ay, Dünya etrafındaki hareketinin dörtte üçünü tamamlamıştır ve sol yarısı aydınlık görünür."),
    ("04", "ibrahim", "Ana evreler arasında yaklaşık bir hafta vardır. Yeni ay evresinden sonra ilk dördün, dolunay ve son dördün evreleri görülür.", "filiz", "Bir yeni ay evresinden sonra tekrar yeni ay evresinin görülmesi yaklaşık 29 gün 12 saat sürer. Takvimlerde bu süre bir ay olarak adlandırılır."),
    ("05", "filiz", "Ana evrelerin aralarındaki geçiş durumuna göre Ay, hilal ve şişkin ay şeklinde olabilir. Hilal; Ay’ın, Güneş’in doğusunda olduğu zaman ters C harfi şeklinde, batısında olduğu zaman C harfi şeklinde görüldüğü evredir.", "ibrahim", "Hilal, yeni ay ve son dördün evrelerinden sonra gözlemlenir. İki kez hilal evresi gözlemlenir."),
    ("06", "ibrahim", "Şişkin ay, Ay’ın ilk dördün evresinden ve dolunay evresinden sonra görüldüğü evredir.", "filiz", "İki kez şişkin ay evresi gözlemlenir. Ana evreler arasındaki geçişlerde Ay’ın aydınlık görünen kısmı yavaş yavaş değişir."),
    ("07", "filiz", "Ay’ın evrelerini sıralayalım: Yeni ay, şişkin ay, ilk dördün, şişkin ay, dolunay, şişkin ay, son dördün, hilal ve yeni ay.", "ibrahim", "Ay’ın birbirini takip eden iki ana evresi arasında geçen süre yaklaşık bir haftadır. Ay’ın evreleri, Güneş’ten aldığı ışığın Dünya’dan görülen bölümüne göre oluşur."),
    ("08", "filiz", "Tebrikler! Ana evreleri ve ara evreleri birbirinden ayırt edebilir, Ay’ın evrelerinin oluşumunu ve sıralanışını açıklayabilirsin.", "ibrahim", "Bir ayın yaklaşık 29 gün 12 saat sürdüğünü artık biliyorsun. Çok iyi çalıştın!"),
]


async def generate():
    output_dir = "public/audio/fen/ay"
    os.makedirs(output_dir, exist_ok=True)
    timings = {}
    for scene_id, speaker_1, text_1, speaker_2, text_2 in dialogues:
        first_path = os.path.join(output_dir, f"{scene_id}_1.mp3")
        second_path = os.path.join(output_dir, f"{scene_id}_2.mp3")
        first_voice = VOICE_FILIZ if speaker_1 == "filiz" else VOICE_IBRAHIM
        second_voice = VOICE_FILIZ if speaker_2 == "filiz" else VOICE_IBRAHIM
        await edge_tts.Communicate(text_1, first_voice, rate="+0%", pitch="+0Hz").save(first_path)
        await edge_tts.Communicate(text_2, second_voice, rate="+0%", pitch="+0Hz").save(second_path)
        first_duration = mutagen.mp3.MP3(first_path).info.length
        total_duration = first_duration + mutagen.mp3.MP3(second_path).info.length
        timings[scene_id] = {"first_speaker": speaker_1, "split_sec": round(first_duration, 2), "total_sec": round(total_duration, 2)}
        print(f"Scene {scene_id}: {total_duration:.2f}s")
    with open("src/ay/ay_timings.json", "w", encoding="utf-8") as file:
        json.dump(timings, file, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    asyncio.run(generate())
