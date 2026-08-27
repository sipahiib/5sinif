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
        "Merhaba arkadaşlar! Birlikte yaşarken aile, sınıf ve kulüp gibi birçok topluluğun içinde bulunuruz. Peki her topluluk bir grup mudur?",
        "ibrahim",
        "Belirli amaçlar çevresinde toplanan, kurallara göre hareket eden ve karşılıklı ilişki kuran en az iki kişilik insan topluluğuna grup denir.",
    ),
    (
        "02",
        "ibrahim",
        "Bir topluluğa grup diyebilmek için üyelerin ortak bir amacı olmalıdır. Üyeler bu amaç için birlikte hareket eder.",
        "filiz",
        "Ayrıca üyeler arasında iş birliği, görev dağılımı ve karşılıklı sosyal ilişkiler bulunmalıdır. Bu üç özellik, grubu sıradan bir kalabalıktan ayırır.",
    ),
    (
        "03",
        "filiz",
        "Aile, sınıf, iş yeri, mahalle ve spor takımı günlük yaşamımızdaki gruplara örnektir.",
        "ibrahim",
        "Eğitsel kulüpler, halk oyunları ekibi ve tiyatro kulübü de ortak bir amaç çevresinde çalışan gruplardır. Bir kişi aynı anda birden fazla grupta yer alabilir.",
    ),
    (
        "04",
        "ibrahim",
        "Toplumsal bir varlık olan insanlar ihtiyaçlarını karşılamak için gruplar oluşturur. Grubun amacına ulaşması için herkes üzerine düşen görevi yerine getirir.",
        "filiz",
        "Grup içinde her üyenin üzerine düşen göreve rol denir. Her grubun amacı farklı olduğu için üstlendiğimiz roller de farklılık gösterebilir.",
    ),
    (
        "05",
        "filiz",
        "Hasan okul grubunda öğrenci, evde çocuk, halk oyunları ekibinde ise oyuncu rolündedir.",
        "ibrahim",
        "Rollerimiz zamanla değişebilir. Hasan ileride doktor olabilir, evlendiğinde eş rolünü üstlenebilir. Yani yaşımız, bulunduğumuz grup ve sorumluluklarımız rollerimizi etkiler.",
    ),
    (
        "06",
        "ibrahim",
        "Farklı gruplarda farklı rollerimiz vardır. Bu roller birbirine karıştırılırsa rol çatışması ortaya çıkar.",
        "filiz",
        "Örneğin doktor olan bir annenin evde çocuğuna, hastanesindeki bir hastaya davranır gibi davranması rol çatışmasıdır. Çünkü anne ve doktor rolleri aynı değildir.",
    ),
    (
        "07",
        "filiz",
        "Şimdi Dilek Hanım’ın yaşamını düşünelim. Öğrencilik yıllarında koroda görev almış, voleybol takımında kaptan olmuş ve üniversitede öğretmenlik okumuştur.",
        "ibrahim",
        "Daha sonra öğretmen, eş ve anne rollerini üstlenmiştir. Yaşamındaki gruplar, yaşı ve sorumlulukları değiştikçe rolleri de değişmiştir.",
    ),
    (
        "08",
        "ibrahim",
        "Özetleyelim: Grup, ortak amaç ve kurallarla bir araya gelen insanlardan oluşur. Rol ise grup içindeki görev ve sorumluluğumuzdur.",
        "filiz",
        "Roller zamanla değişebilir ve karıştırıldığında rol çatışması yaşanabilir. Tebrikler, grupları ve gruplardaki rollerimizi öğrendin!",
    ),
]


async def generate():
    output_dir = "public/audio/sosyal/roller"
    os.makedirs(output_dir, exist_ok=True)
    timings = {}

    for scene_id, speaker_1, text_1, speaker_2, text_2 in DIALOGUES:
        first_path = os.path.join(output_dir, f"{scene_id}_1.mp3")
        second_path = os.path.join(output_dir, f"{scene_id}_2.mp3")
        first_voice = VOICE_FILIZ if speaker_1 == "filiz" else VOICE_IBRAHIM
        # A scene uses one visible character and therefore one consistent voice.
        second_voice = first_voice

        await edge_tts.Communicate(text_1, first_voice, rate="+2%", pitch="+0Hz").save(first_path)
        await edge_tts.Communicate(text_2, second_voice, rate="+2%", pitch="+0Hz").save(second_path)

        first_duration = mutagen.mp3.MP3(first_path).info.length
        second_duration = mutagen.mp3.MP3(second_path).info.length
        total_duration = first_duration + second_duration + (5 if scene_id == "08" else 0.35)
        timings[scene_id] = {
            "first_speaker": speaker_1,
            "split_sec": round(first_duration + 0.18, 2),
            "total_sec": round(total_duration, 2),
        }
        print(f"Scene {scene_id}: {total_duration:.2f}s")

    with open("src/roller/roller_timings.json", "w", encoding="utf-8") as file:
        json.dump(timings, file, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    asyncio.run(generate())
