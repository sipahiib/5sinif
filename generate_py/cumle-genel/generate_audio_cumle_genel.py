import asyncio
import os

import edge_tts
import mutagen.mp3

VOICE = "tr-TR-EmelNeural"

scenes = [
    ("cumle_genel_01.mp3", "Cümle; bir düşünceyi, duyguyu, dileği veya haberi anlatan anlamlı ve kurallı bir sözcük dizisidir."),
    ("cumle_genel_02.mp3", "Cümlenin konusu, cümlenin genelinde üzerinde durulan düşünce veya duygudur."),
    ("cumle_genel_03.mp3", "Ana düşünce, cümlede anlatılmak ve verilmek istenen mesajdır."),
    ("cumle_genel_04.mp3", "Cümle tamamlama sorularında boşluğa gelecek bölüm cümlenin anlamına ve yapısına uymalıdır."),
    ("cumle_genel_05.mp3", "Cümle oluştururken karışık verilen sözcükleri anlamlı ve kurallı biçimde sıralarız."),
    ("cumle_genel_06.mp3", "Cümle anlamlı, kurallı ve anlaşılır olmalıdır."),
]


async def generate():
    os.makedirs("public/audio", exist_ok=True)
    for filename, text in scenes:
        path = os.path.join("public/audio", filename)
        await edge_tts.Communicate(text, VOICE, rate="+0%", pitch="+0Hz").save(path)
        print(f"Generated {path}: duration = {mutagen.mp3.MP3(path).info.length:.2f}s")


if __name__ == "__main__":
    asyncio.run(generate())