import asyncio
import edge_tts
import os
import json
import mutagen.mp3

VOICE_FILIZ = "tr-TR-EmelNeural"
VOICE_IBRAHIM = "tr-TR-AhmetNeural"

dialogues = [
    {"id": "01", "p1": {"speaker": "filiz", "voice": VOICE_FILIZ, "text": "Merhaba arkadaşlar! Bugün somut ve soyut anlamlı sözcükleri öğreneceğiz."}, "p2": {"speaker": "ibrahim", "voice": VOICE_IBRAHIM, "text": "Bu konuyu öğrenirken beş duyu organımız bize yardımcı olacak."}},
    {"id": "02", "p1": {"speaker": "ibrahim", "voice": VOICE_IBRAHIM, "text": "Beş duyu organımızdan en az biriyle algılayabildiğimiz kelimelere somut anlamlı kelimeler denir."}, "p2": {"speaker": "filiz", "voice": VOICE_FILIZ, "text": "Kelebek, silgi ve güneş somut anlamlı kelimelerdir."}},
    {"id": "03", "p1": {"speaker": "filiz", "voice": VOICE_FILIZ, "text": "Göz diyor ki: Kelebeği, silgiyi ve güneşi görebilirim."}, "p2": {"speaker": "ibrahim", "voice": VOICE_IBRAHIM, "text": "Kulak da ekliyor: Sesleri ve müziği duyabilirim."}},
    {"id": "04", "p1": {"speaker": "ibrahim", "voice": VOICE_IBRAHIM, "text": "Elimizle nesnelere dokunabilir, burnumuzla kokuları alabiliriz."}, "p2": {"speaker": "filiz", "voice": VOICE_FILIZ, "text": "Dilimizle tatları hissederiz. Böylece beş duyu organımız somut varlıkları algılamamızı sağlar."}},
    {"id": "05", "p1": {"speaker": "filiz", "voice": VOICE_FILIZ, "text": "Beş duyu organımızdan hiçbiriyle algılayamadığımız kelimelere soyut anlamlı kelimeler denir."}, "p2": {"speaker": "ibrahim", "voice": VOICE_IBRAHIM, "text": "Sevgi, özlem, korku ve mutluluk soyut anlamlıdır; onları göremeyiz ama hissedebiliriz."}},
    {"id": "06", "p1": {"speaker": "ibrahim", "voice": VOICE_IBRAHIM, "text": "Şimdi kendimize soralım: Bunu görebiliyor, duyabiliyor, dokunabiliyor, koklayabiliyor ya da tadabiliyor muyum?"}, "p2": {"speaker": "filiz", "voice": VOICE_FILIZ, "text": "Evetse sözcük somuttur. Hayırsa soyuttur."}},
    {"id": "07", "p1": {"speaker": "filiz", "voice": VOICE_FILIZ, "text": "Elma, yağmur ve çiçek somuttur; çünkü onları duyularımızla algılayabiliriz."}, "p2": {"speaker": "ibrahim", "voice": VOICE_IBRAHIM, "text": "Dostluk, umut ve mutluluk ise soyuttur; onları duyu organlarımızla algılayamayız."}},
    {"id": "08", "p1": {"speaker": "ibrahim", "voice": VOICE_IBRAHIM, "text": "Tebrikler! Somut ve soyut anlamlı sözcükleri öğrendin."}, "p2": {"speaker": "filiz", "voice": VOICE_FILIZ, "text": "Duyu organlarının yardımıyla sözcükleri ayırt etmeyi unutma!"}},
]

async def generate():
    os.makedirs("public/audio", exist_ok=True)
    timing_data = {}
    for dialogue in dialogues:
        first_file = f"public/audio/somut_{dialogue['id']}_1.mp3"
        second_file = f"public/audio/somut_{dialogue['id']}_2.mp3"
        first = edge_tts.Communicate(dialogue["p1"]["text"], dialogue["p1"]["voice"], rate="+0%", pitch="+0Hz")
        second = edge_tts.Communicate(dialogue["p2"]["text"], dialogue["p2"]["voice"], rate="+0%", pitch="+0Hz")
        await first.save(first_file)
        await second.save(second_file)
        first_duration = mutagen.mp3.MP3(first_file).info.length
        second_duration = mutagen.mp3.MP3(second_file).info.length
        timing_data[dialogue["id"]] = {"first_speaker": dialogue["p1"]["speaker"], "split_sec": round(first_duration, 2), "total_sec": round(first_duration + second_duration, 2)}
    with open("src/somut_soyut_timings.json", "w", encoding="utf-8") as file:
        json.dump(timing_data, file, indent=2, ensure_ascii=False)
    print("Saved somut_soyut_timings.json successfully!")

if __name__ == "__main__":
    asyncio.run(generate())
