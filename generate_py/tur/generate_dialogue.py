import asyncio
import edge_tts
import os
import json
import mutagen.mp3

# More natural Turkish neural voices for a human-like narration.
# Recommended Azure voices: AhmetNeural (male) and EmelNeural (female).
VOICE_WOODY = "tr-TR-AhmetNeural"   # İbrahim
VOICE_JESSIE = "tr-TR-EmelNeural"   # Filiz

dialogues = [
    {
        "id": "01",
        "p1": {"speaker": "filiz", "voice": VOICE_JESSIE, "text": "Merhaba! Bugün Türkçe dersimizde hikâye, yani öykü türünü tanıyacağız.", "pitch": "+0Hz", "rate": "+0%"},
        "p2": {"speaker": "ibrahim", "voice": VOICE_WOODY, "text": "Hikâye; olmuş ya da olabilecek olayları, zaman, yer ve kişiye bağlı olarak anlatan kısa olay yazısıdır.", "pitch": "+0Hz", "rate": "+0%"}
    },
    {
        "id": "02",
        "p1": {"speaker": "ibrahim", "voice": VOICE_WOODY, "text": "Hikâyede olay ve kişi kadrosu sınırlıdır. Sayfa sayısı azdır.", "pitch": "+0Hz", "rate": "+10%"},
        "p2": {"speaker": "filiz", "voice": VOICE_JESSIE, "text": "Olaylar kısa bir zamanda anlatılır. Temel unsurları yer, zaman, kahramanlar, olay ve ana fikirdir.", "pitch": "+0Hz", "rate": "+10%"}
    },
    {
        "id": "03",
        "p1": {"speaker": "filiz", "voice": VOICE_JESSIE, "text": "Hikâye genellikle üç bölümden oluşur: serim, düğüm ve çözüm.", "pitch": "+0Hz", "rate": "+0%"},
        "p2": {"speaker": "ibrahim", "voice": VOICE_WOODY, "text": "Serimde kişiler ve çevre tanıtılır. Düğümde olaylar gelişir ve karmaşıklaşır. Çözümde ise olay sonuçlandırılır.", "pitch": "+0Hz", "rate": "+0%"}
    },
    {
        "id": "04",
        "p1": {"speaker": "ibrahim", "voice": VOICE_WOODY, "text": "Şimdi kısa bir örnek düşünelim: Bir çocuk, kaybolan kedisini arıyor.", "pitch": "+0Hz", "rate": "+0%"},
        "p2": {"speaker": "filiz", "voice": VOICE_JESSIE, "text": "Kedinin kaybolması düğüm, çocuğun onu bulması ise çözüm bölümüdür. Böylece olay, kişiler, yer, zaman ve ana fikir birlikte görülür.", "pitch": "+0Hz", "rate": "+0%"}
    },
    {
        "id": "05",
        "p1": {"speaker": "filiz", "voice": VOICE_JESSIE, "text": "Hikâyeyi incelerken önce şu soruları sorabiliriz: Olay nerede ve ne zaman geçiyor? Kahramanlar kimler?", "pitch": "+0Hz", "rate": "+0%"},
        "p2": {"speaker": "ibrahim", "voice": VOICE_WOODY, "text": "Sonra olayın nasıl geliştiğine ve yazarın bize vermek istediği ana fikre bakarız.", "pitch": "+0Hz", "rate": "+0%"}
    },
    {
        "id": "06",
        "p1": {"speaker": "ibrahim", "voice": VOICE_WOODY, "text": "Hikâyenin temel unsurlarını tekrar edelim: yer, zaman, kahramanlar, olay ve ana fikir.", "pitch": "+0Hz", "rate": "+0%"},
        "p2": {"speaker": "filiz", "voice": VOICE_JESSIE, "text": "Olayın anlatıldığı bölümleri de unutmayalım: serim, düğüm ve çözüm.", "pitch": "+0Hz", "rate": "+0%"}
    },
    {
        "id": "07",
        "p1": {"speaker": "filiz", "voice": VOICE_JESSIE, "text": "Tebrikler! Artık bir hikâyeyi okurken türünü ve temel unsurlarını daha kolay fark edebilirsin.", "pitch": "+0Hz", "rate": "+0%"},
        "p2": {"speaker": "ibrahim", "voice": VOICE_WOODY, "text": "Yer, zaman, kahramanlar, olay ve ana fikri bulmayı; serim, düğüm ve çözümü ayırmayı unutma. Çok iyi çalıştın!", "pitch": "+0Hz", "rate": "+0%"}
    },
    {
        "id": "08",
        "p1": {"speaker": "ibrahim", "voice": VOICE_WOODY, "text": "Hikâye türünü başarıyla öğrendin!", "pitch": "+0Hz", "rate": "+0%"},
        "p2": {"speaker": "filiz", "voice": VOICE_JESSIE, "text": "Şimdi bir hikâye seç ve içindeki unsurları birlikte keşfet!", "pitch": "+0Hz", "rate": "+0%"}
    }
]

async def generate():
    os.makedirs("public/audio", exist_ok=True)
    timing_data = {}
    
    for d in dialogues:
        f1 = f"public/audio/temp_{d['id']}_1.mp3"
        f2 = f"public/audio/temp_{d['id']}_2.mp3"
        out_f = f"public/audio/{d['id']}.mp3"
        
        c1 = edge_tts.Communicate(d['p1']['text'], d['p1']['voice'], pitch=d['p1']['pitch'], rate=d['p1']['rate'])
        await c1.save(f1)
        
        c2 = edge_tts.Communicate(d['p2']['text'], d['p2']['voice'], pitch=d['p2']['pitch'], rate=d['p2']['rate'])
        await c2.save(f2)
        
        m1 = mutagen.mp3.MP3(f1)
        dur1 = m1.info.length
        
        m2 = mutagen.mp3.MP3(f2)
        dur2 = m2.info.length
        
        with open(out_f, "wb") as out_file:
            with open(f1, "rb") as in1:
                out_file.write(in1.read())
            with open(f2, "rb") as in2:
                out_file.write(in2.read())

        with open(f"public/audio/{d['id']}_1.mp3", "wb") as out_file:
            with open(f1, "rb") as in1:
                out_file.write(in1.read())
        with open(f"public/audio/{d['id']}_2.mp3", "wb") as out_file:
            with open(f2, "rb") as in2:
                out_file.write(in2.read())
                
        if os.path.exists(f1): os.remove(f1)
        if os.path.exists(f2): os.remove(f2)
        
        total_duration = dur1 + dur2
        timing_data[d['id']] = {
            "first_speaker": d['p1']['speaker'],
            "split_sec": round(dur1, 2),
            "total_sec": round(total_duration, 2)
        }
        print(f"Scene {d['id']}: Speaker 1 ({d['p1']['speaker']}) = {dur1:.2f}s, Speaker 2 ({d['p2']['speaker']}) = {dur2:.2f}s, Total = {total_duration:.2f}s")
        
    with open("src/dialogue_timings.json", "w", encoding="utf-8") as f:
        json.dump(timing_data, f, indent=2, ensure_ascii=False)
    print("Saved dialogue_timings.json successfully!")

if __name__ == "__main__":
    asyncio.run(generate())
