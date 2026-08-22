import asyncio
import edge_tts
import os
import mutagen.mp3

VOICE = "tr-TR-EmelNeural"

scenes_audio = [
    {"file": "public/audio/somut_01.mp3", "text": "Merhaba arkadaşlar! Bugün somut ve soyut anlamlı sözcükleri öğreneceğiz.", "rate": "+0%", "pitch": "+0Hz"},
    {"file": "public/audio/somut_02.mp3", "text": "Beş duyu organımızdan en az biriyle algılayabildiğimiz kelimelere somut anlamlı kelimeler denir.", "rate": "+0%", "pitch": "+0Hz"},
    {"file": "public/audio/somut_03.mp3", "text": "Göz diyor ki: Kelebek, silgi ve güneş gibi varlıkları görebiliriz. Kulak da ekliyor: Sesleri ve müziği duyabiliriz.", "rate": "+0%", "pitch": "+0Hz"},
    {"file": "public/audio/somut_04.mp3", "text": "Elimizle bir nesneye dokunabilir, burnumuzla kokuları alabilir, dilimizle tatları hissedebiliriz. Bu yüzden el, burun ve dil de somut sözcükleri anlamamıza yardım eder.", "rate": "+0%", "pitch": "+0Hz"},
    {"file": "public/audio/somut_05.mp3", "text": "Beş duyu organımızdan hiçbiriyle algılayamadığımız kelimelere soyut anlamlı kelimeler denir. Sevgi, özlem, korku ve mutluluk soyut anlamlıdır.", "rate": "+0%", "pitch": "+0Hz"},
    {"file": "public/audio/somut_06.mp3", "text": "Somut ve soyut ayrımını yaparken kendimize şu soruyu soralım: Bunu görebiliyor, duyabiliyor, dokunabiliyor, koklayabiliyor ya da tadabiliyor muyum?", "rate": "+0%", "pitch": "+0Hz"},
    {"file": "public/audio/somut_07.mp3", "text": "Evetse sözcük somuttur. Hayırsa soyuttur. Örneğin elma somut, dostluk ise soyuttur.", "rate": "+0%", "pitch": "+0Hz"},
    {"file": "public/audio/somut_08.mp3", "text": "Tebrikler! Artık duyu organlarının yardımıyla somut ve soyut anlamlı sözcükleri ayırt edebilirsin.", "rate": "+0%", "pitch": "+0Hz"},
]

async def generate():
    os.makedirs("public/audio", exist_ok=True)
    for item in scenes_audio:
        communicate = edge_tts.Communicate(item["text"], VOICE, rate=item["rate"], pitch=item["pitch"])
        await communicate.save(item["file"])
        duration = mutagen.mp3.MP3(item["file"]).info.length
        print(f"Generated {item['file']}: duration = {duration:.2f}s")

if __name__ == "__main__":
    asyncio.run(generate())
