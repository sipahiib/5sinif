import asyncio
import edge_tts
import os
import mutagen.mp3

VOICE = "tr-TR-AhmetNeural"

scenes_audio = [
    {
        "file": "public/audio/01.mp3",
        "text": "Merhaba arkadaşlar! Bugün Türkçe dersimizde karşıt, yani zıt anlamlı sözcükleri öğreniyoruz! Karşıt durumları karşılayan sözcüklere zıt anlamlı denir. Cümlede yer değiştirdiklerinde cümlenin anlamı tam tersi yönünde değişir.",
        "rate": "+12%",
        "pitch": "-2Hz"
    },
    {
        "file": "public/audio/02.mp3",
        "text": "Ders sayfamızdaki sözcük çiftleri: Kalın - ince, zayıf - şişman, akıllı - deli, gül - ağla, yaz - kış!",
        "rate": "+10%",
        "pitch": "-2Hz"
    },
    {
        "file": "public/audio/03.mp3",
        "text": "Cümlelerimizi inceleyelim arkadaşlar: Bu kış çok soğuk geçti. Bu yaz çok sıcak geçti. Akıllı köprü arayıncaya dek, deli suyu geçer!",
        "rate": "+10%",
        "pitch": "-2Hz"
    },
    {
        "file": "public/audio/04.mp3",
        "text": "Önemli bir uyarı arkadaşlar! Bir sözcüğün zıt anlamı ile olumsuzu farklıdır: Güzel, güzel değil, çirkin. Sulu, susuz, kuru. Tatlı, tatsız, acı. Çıkmak, çıkmamak, inmek. Gülmek, gülmemek, ağlamak!",
        "rate": "+12%",
        "pitch": "-2Hz"
    },
    {
        "file": "public/audio/05.mp3",
        "text": "İkinci dersimiz Eş Anlamlı Sözcükler! Yazılışları farklı ama aynı anlamı taşıyan sözcüklerdir ve birbirinin yerine kullanılabilirler arkadaşlar!",
        "rate": "+10%",
        "pitch": "-2Hz"
    },
    {
        "file": "public/audio/06.mp3",
        "text": "Eş anlamlı örneklerimiz arkadaşlar: Kalp, yürek ve gönül! Ev ile hane! Yaşlı ile ihtiyar! Bu sözcükler aynı anlamdadır!",
        "rate": "+10%",
        "pitch": "-2Hz"
    },
    {
        "file": "public/audio/07.mp3",
        "text": "Önemli bir uyarı arkadaşlar! Kelimenin cümledeki anlamına dikkat: Beyaz peynir yerine ak peynir veya kafam bozuldu yerine başım bozuldu diyemeyiz!",
        "rate": "+10%",
        "pitch": "-2Hz"
    },
    {
        "file": "public/audio/08.mp3",
        "text": "Tebrikler! Zıt ve eş anlamlı sözcükleri öğrendiniz. Artık cümlelerdeki anlam farklarını daha kolay fark edebilirsiniz. Çok iyi çalıştınız!",
        "rate": "+0%",
        "pitch": "-2Hz"
    }
]

async def generate():
    os.makedirs("public/audio", exist_ok=True)
    for item in scenes_audio:
        communicate = edge_tts.Communicate(item["text"], VOICE, rate=item["rate"], pitch=item["pitch"])
        await communicate.save(item["file"])
        m = mutagen.mp3.MP3(item["file"])
        print(f"Generated {item['file']}: duration = {m.info.length:.2f}s")

if __name__ == "__main__":
    asyncio.run(generate())
