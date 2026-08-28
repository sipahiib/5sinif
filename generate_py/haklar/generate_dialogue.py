import asyncio
import json
from pathlib import Path

import edge_tts
import mutagen.mp3


VOICE_FILIZ = "tr-TR-EmelNeural"
VOICE_IBRAHIM = "tr-TR-AhmetNeural"

OUTPUT_DIR = Path("public/audio/sosyal/haklar")
TIMINGS_PATH = Path("src/haklar/haklar_timings.json")

DIALOGUES = [
    (
        "01",
        "filiz",
        "Merhaba arkadaşlar! Ailede, okulda ve toplumda üstlendiğimiz roller bize bazı haklar kazandırır. Aynı zamanda yerine getirmemiz gereken görevler de verir.",
        "Yasal ve toplumsal olarak bireylere tanınan yetki ve kazanımlara hak denir. Kendimize ve başkalarına karşı zamanında yerine getirmemiz gereken görevlere ise sorumluluk denir.",
    ),
    (
        "02",
        "ibrahim",
        "Sorumluluk sahibi kişi, yapması gereken işi bir başkasının hatırlatmasını beklemeden zamanında ve istenen biçimde tamamlar.",
        "Bu duygu önce ailede öğrenilir; eğitimle ve deneyimle gelişir. Kendi kararlarını alabilmek, sonucunu düşünmek ve gerektiğinde harekete geçmek sorumluluk bilincinin göstergesidir.",
    ),
    (
        "03",
        "filiz",
        "Üyesi olduğumuz her grupta bir rol üstleniriz. Her rol bize hem kullanabileceğimiz haklar hem de yerine getireceğimiz sorumluluklar getirir.",
        "Örneğin çocuk rolümüzde düşüncelerimizin dinlenmesi hakkımızdır; odamızı toplamak sorumluluğumuzdur. Öğrenci rolümüzde eğitim almak hakkımız, derslerimize çalışmak ise sorumluluğumuzdur.",
    ),
    (
        "04",
        "ibrahim",
        "Aile içinde düşüncelerimizin dikkate alınması, temel ihtiyaçlarımızın karşılanması ve kişisel sorunlarımızın çözümünde destek görmek haklarımızdandır.",
        "Aileyi ilgilendiren konularda yaşımıza uygun biçimde görüşümüzün alınması da önemlidir. Haklarımız, kendimizi güvende ve değerli hissetmemize yardımcı olur.",
    ),
    (
        "05",
        "filiz",
        "Ailedeki sorumluluklarımız odamızı düzenli tutmak, anne ve babamıza yardımcı olmak ve evdeki kaynakları tutumlu kullanmaktır.",
        "Kardeşlerimize örnek olacak davranışlarda bulunmak da sorumluluklarımız arasındadır. Küçük görevleri düzenli yapmak, aile içindeki iş birliğini ve güveni güçlendirir.",
    ),
    (
        "06",
        "ibrahim",
        "Öğrenci olarak güvenli ve sağlıklı bir okul ortamında bulunmak, sosyal etkinliklere katılmak ve fikirlerimizi özgürce söylemek haklarımızdandır.",
        "Teneffüslerde oyun oynamak, soru sormak ve öğrenirken destek görmek de eğitim yaşamımızdaki haklarımızdır. Bu haklardan herkes eşit biçimde yararlanmalıdır.",
    ),
    (
        "07",
        "filiz",
        "Okuldaki sorumluluklarımız derslerimize düzenli çalışmak, okul kurallarına uymak ve çevremizdeki insanların haklarına saygı duymaktır.",
        "Okuldaki araç ve gereçleri özenli kullanmalı, onlara zarar vermemeliyiz. Sorumluluklarımızı yerine getirdiğimizde sınıfımız daha güvenli, düzenli ve huzurlu olur.",
    ),
    (
        "08",
        "ibrahim",
        "Haklar ve sorumluluklar birbirinden ayrı düşünülemez. Kendi hakkımızı kullanırken başkalarının haklarına saygı göstermek ortak yaşamın temelidir.",
        "Sorumluluklarımızı yerine getirdikçe güven artar, ilişkiler güçlenir ve birlikte daha uyumlu yaşarız. Tebrikler, haklarımızı ve sorumluluklarımızı öğrendin!",
    ),
]


async def generate() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    TIMINGS_PATH.parent.mkdir(parents=True, exist_ok=True)
    timings = {}

    for scene_id, speaker, first_text, second_text in DIALOGUES:
        voice = VOICE_FILIZ if speaker == "filiz" else VOICE_IBRAHIM
        first_path = OUTPUT_DIR / f"{scene_id}_1.mp3"
        second_path = OUTPUT_DIR / f"{scene_id}_2.mp3"

        await edge_tts.Communicate(first_text, voice, rate="+3%", pitch="+0Hz").save(str(first_path))
        await edge_tts.Communicate(second_text, voice, rate="+3%", pitch="+0Hz").save(str(second_path))

        first_duration = mutagen.mp3.MP3(first_path).info.length
        second_duration = mutagen.mp3.MP3(second_path).info.length
        tail = 5.0 if scene_id == "08" else 0.42
        timings[scene_id] = {
            "speaker": speaker,
            "split_sec": round(first_duration + 0.16, 3),
            "speech_end_sec": round(first_duration + 0.16 + second_duration, 3),
            "total_sec": round(first_duration + 0.16 + second_duration + tail, 3),
        }
        print(f"Scene {scene_id}: {timings[scene_id]['total_sec']:.2f}s")

    TIMINGS_PATH.write_text(json.dumps(timings, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    asyncio.run(generate())
