import asyncio
import json
import os

import edge_tts
import mutagen.mp3

VOICE_FILIZ = "tr-TR-EmelNeural"
VOICE_IBRAHIM = "tr-TR-AhmetNeural"

dialogues = [
    {"id": "01", "p1": ("filiz", VOICE_FILIZ, "Merhaba arkadaşlar! Bugün cümle konusunu öğreneceğiz. Cümle; bir düşünceyi, duyguyu, dileği veya haberi anlatan anlamlı ve kurallı bir sözcük dizisidir."), "p2": ("ibrahim", VOICE_IBRAHIM, "Cümlelerimizi doğru anlamak için sözcüklerin birbiriyle olan ilişkisine ve cümlenin bütününe dikkat ederiz.")},
    {"id": "02", "p1": ("ibrahim", VOICE_IBRAHIM, "Cümlenin konusu, cümlenin genelinde üzerinde durulan düşünce veya duygudur."), "p2": ("filiz", VOICE_FILIZ, "Konuyu bulmak için kendimize şu soruyu sorarız: Bu cümlede neyden söz ediliyor?")},
    {"id": "03", "p1": ("filiz", VOICE_FILIZ, "Ana düşünce, cümlede anlatılmak ve verilmek istenen mesajdır."), "p2": ("ibrahim", VOICE_IBRAHIM, "Ana düşünceyi bulmak için konuyla ilgili vurgulanmak istenen nedir diye sorarız. Ana düşünce bir yargı bildirir.")},
    {"id": "04", "p1": ("ibrahim", VOICE_IBRAHIM, "Cümle tamamlama sorularında boşluğa gelecek sözcük veya sözcük öbeğini buluruz."), "p2": ("filiz", VOICE_FILIZ, "Seçtiğimiz bölüm cümlenin anlamına ve yapısına uymalıdır. Boşluk cümlenin başında, ortasında veya sonunda olabilir.")},
    {"id": "05", "p1": ("filiz", VOICE_FILIZ, "Şimdi sayfadaki gibi nokta nokta bırakılmış beş cümleye bakalım. Bir: Nokta nokta, yeni nesillerin yetişmesinde en önemli görevi üstlenir."), "p2": ("ibrahim", VOICE_IBRAHIM, "İki: Ampulü bulan nokta nokta o zamanlar oldukça gençti. Üç: Ressamın bu resminde âdeta bir nokta nokta cümbüşü yaşanıyor. Dört: Başarmanın tek yolu nokta nokta. Beş: Nokta nokta şiirinde hüzünlü bir tablo çizer. Cevapları cümlenin anlamına ve yapısına göre sen bulmalısın.")},
    {"id": "06", "p1": ("ibrahim", VOICE_IBRAHIM, "Cümle oluştururken karışık verilen sözcükleri anlamlı ve kurallı biçimde sıralarız. İlk örnekte sözcükler şunlardır: göstergesidir, mutluluğun, gülümsemek, en, çok."), "p2": ("filiz", VOICE_FILIZ, "Doğru sıralama şöyledir: Gülümsemek mutluluğun en çok göstergesidir. Böylece anlamlı ve kurallı bir cümle kurarız.")},
    {"id": "07", "p1": ("filiz", VOICE_FILIZ, "İkinci örnekte sözcükleri şöyle sıralarız: Saygı sağlıklı iletişimin vazgeçilmez unsurudur."), "p2": ("ibrahim", VOICE_IBRAHIM, "Üçüncü örneğin doğru cümlesi de şudur: Toplumsal yardımlaşma huzuru artırır. Sözcüklerin anlam ilişkisini ve doğru sırasını mutlaka kontrol ederiz.")},
    {"id": "08", "p1": ("filiz", VOICE_FILIZ, "Tebrikler! Cümlenin konusunu ve ana düşüncesini bulmayı, eksik cümleleri tamamlamayı öğrendin."), "p2": ("ibrahim", VOICE_IBRAHIM, "Artık karışık sözcüklerle anlamlı ve kurallı cümleler oluşturabilirsin. Çok iyi çalıştın!")},
]


async def generate():
    output_dir = "public/audio"
    os.makedirs(output_dir, exist_ok=True)
    timings = {}
    for dialogue in dialogues:
        first_file = os.path.join(output_dir, f"cumle_{dialogue['id']}_1.mp3")
        second_file = os.path.join(output_dir, f"cumle_{dialogue['id']}_2.mp3")
        first_speaker, first_voice, first_text = dialogue["p1"]
        second_speaker, second_voice, second_text = dialogue["p2"]
        await edge_tts.Communicate(first_text, first_voice, rate="+0%", pitch="+0Hz").save(first_file)
        await edge_tts.Communicate(second_text, second_voice, rate="+0%", pitch="+0Hz").save(second_file)
        first_duration = mutagen.mp3.MP3(first_file).info.length
        total_duration = first_duration + mutagen.mp3.MP3(second_file).info.length
        timings[dialogue["id"]] = {"first_speaker": first_speaker, "split_sec": round(first_duration, 2), "total_sec": round(total_duration, 2)}
        print(f"Scene {dialogue['id']}: {first_duration:.2f}s + {total_duration - first_duration:.2f}s = {total_duration:.2f}s")
    with open("src/cumle-genel/cumle_genel_timings.json", "w", encoding="utf-8") as file:
        json.dump(timings, file, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    asyncio.run(generate())