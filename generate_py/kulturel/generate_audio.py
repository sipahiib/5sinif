import asyncio
import json
import re
import subprocess
from pathlib import Path

import edge_tts
import mutagen.mp3

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "public/audio/sosyal/kulturel"
TIMINGS = ROOT / "src/kulturel/kulturel_timings.json"
SHORT_OUTPUT = ROOT / "public/audio/shorts/kulturel"
SHORT_TIMINGS = ROOT / "src/shorts/lesson-shorts/lesson_shorts_timings.json"
VOICES = {"filiz": "tr-TR-EmelNeural", "ibrahim": "tr-TR-AhmetNeural"}

SCENES = [
    ("01", "filiz", "Merhaba arkadaşlar! Bugün kültürel özelliklere saygıyı ve birlikte yaşama kültürünü öğreneceğiz.", "Bir toplumun tarih boyunca ürettiği ve kuşaktan kuşağa aktardığı maddi ve manevi değerlerin tümüne kültür denir. Kültür, toplumun ortak kimliğini oluşturur."),
    ("02", "ibrahim", "Kültür hem maddi hem de manevi değerlerden oluşur. Mimari eserler, giysiler, yemekler, halk oyunları ve el sanatları maddi kültür ögeleridir.", "İnançlar, gelenekler, düşünce biçimleri, türküler ve atasözleri ise manevi kültür ögeleridir. Bu iki alan sürekli etkileşim içindedir."),
    ("03", "filiz", "Her toplumun kendine özgü kültürü vardır. Kültür geçmişten günümüze ulaştığı için tarihseldir ve insan eseridir.", "Kültür durağan değildir; zaman içinde yeni ögeler kazanır, bazı ögeleri değişir. Her toplumun kültürel değişim hızı da birbirinden farklıdır."),
    ("04", "ibrahim", "Farklı kültürlere saygı göstermek anlayış, hoşgörü ve uyumun gelişmesini sağlar. İnsanların değerlerini, inançlarını ve alışkanlıklarını dikkate almalıyız.", "Araştırmak, kitap okumak, film izlemek ve seyahat etmek farklı kültürleri tanımamıza yardım eder. Ön yargıları bırakıp başka bakış açılarını anlamaya çalışmalıyız."),
    ("05", "filiz", "Türkiye'nin bölgelerinde farklı halk oyunları görülür. Ege'de zeybek, Karadeniz'de horon, Doğu ve Güneydoğu Anadolu'da halay oynanır.", "Trakya'da hora, Ankara'da misket, Artvin'de atabarı, Edirne'de karşılama, Erzurum'da bar ve Elazığ'da çayda çıra kültürel zenginliğimizdendir."),
    ("06", "ibrahim", "Müzik aletlerimiz de bölgelere göre çeşitlenir. Kemençe, davul, bağlama, tef, tulum, zurna, tar ve kaşık bunlardan bazılarıdır.", "Yöresel yemeklerimiz de kültürel zenginliğimizi gösterir. Kayseri mantısı, Hatay künefesi, Rize çayı, Maraş dondurması ve Gaziantep baklavası buna örnektir."),
    ("07", "filiz", "El sanatları, toplumun duygularını ve kültürel özelliklerini yansıtan geleneksel ürünlerdir. Dokumacılık, çinicilik, çömlekçilik, bakırcılık, ahşap oymacılığı ve ebru bunlara örnektir.", "Türkülerimiz de sevinçleri, acıları ve yaşanmışlıkları dile getirir. Ortak duygularımızı yansıtarak toplumsal birliğimizi güçlendirir."),
    ("08", "ibrahim", "Kültürel farklılıklar bizi ayıran değil, ortak yaşamımızı zenginleştiren değerlerdir.", "Kendi kültürümüzü tanır, farklı kültürlere saygı gösterirsek anlayış ve hoşgörü içinde birlikte yaşarız. Tebrikler, konuyu tamamladın!"),
]

SHORTS = {
    "kulturel_1": {"question": "Bir toplumun kuşaktan kuşağa aktardığı maddi ve manevi değerlerin tümüne ne denir?", "answer": "Doğru cevap A şıkkı, kültürdür."},
    "kulturel_2": {"question": "Aşağıdakilerden hangisi manevi kültür ögesidir?", "answer": "Doğru cevap B şıkkı, türkülerdir."},
    "kulturel_3": {"question": "Karadeniz Bölgesi ile özdeşleşen halk oyunu hangisidir?", "answer": "Doğru cevap C şıkkı, horondur."},
    "kulturel_4": {"question": "Aşağıdakilerden hangisi geleneksel el sanatlarımızdan biridir?", "answer": "Doğru cevap A şıkkı, çiniciliktir."},
}

def speech_window(path: Path, duration: float):
    result = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(path), "-af", "silencedetect=noise=-40dB:d=0.12", "-f", "null", "-"], capture_output=True, text=True)
    starts = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", result.stderr)]
    ends = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", result.stderr)]
    return (ends[0] if ends and ends[0] < 1.5 else 0.0, starts[-1] if starts and starts[-1] > duration / 2 else duration)

async def save(text, voice, path, rate="+3%"):
    path.parent.mkdir(parents=True, exist_ok=True)
    await edge_tts.Communicate(text, voice, rate=rate, pitch="+0Hz").save(str(path))

async def main():
    tasks = []
    for scene_id, speaker, first, second in SCENES:
        tasks += [save(first, VOICES[speaker], OUTPUT / f"{scene_id}_1.mp3"), save(second, VOICES[speaker], OUTPUT / f"{scene_id}_2.mp3")]
    for slug, lines in SHORTS.items():
        for key, text in lines.items():
            tasks.append(save(text, VOICES["ibrahim"], ROOT / f"public/audio/shorts/{slug}/{key}.mp3", "+6%"))
    await asyncio.gather(*tasks)

    timings = {}
    for scene_id, speaker, _, _ in SCENES:
        a = mutagen.mp3.MP3(OUTPUT / f"{scene_id}_1.mp3").info.length
        b = mutagen.mp3.MP3(OUTPUT / f"{scene_id}_2.mp3").info.length
        timings[scene_id] = {"speaker": speaker, "split_sec": round(a + .16, 3), "speech_end_sec": round(a + .16 + b, 3), "total_sec": round(a + .16 + b + .45, 3)}
    TIMINGS.parent.mkdir(parents=True, exist_ok=True)
    TIMINGS.write_text(json.dumps(timings, ensure_ascii=False, indent=2), encoding="utf-8")

    all_timings = json.loads(SHORT_TIMINGS.read_text(encoding="utf-8"))
    for slug, lines in SHORTS.items():
        durations, windows = {}, {}
        for key in ("question", "answer"):
            path = ROOT / f"public/audio/shorts/{slug}/{key}.mp3"
            durations[key] = mutagen.mp3.MP3(path).info.length
            windows[key] = speech_window(path, durations[key])
        q_start = .35
        q_speech_start = q_start + windows["question"][0]
        q_end = q_start + windows["question"][1]
        a_speech_start = q_end + 5
        a_start = a_speech_start - windows["answer"][0]
        a_end = a_start + windows["answer"][1]
        all_timings[slug] = {"fps": 30, "question_start": round(q_start, 3), "question_speech_start": round(q_speech_start, 3), "question_end": round(q_end, 3), "answer_start": round(a_start, 3), "answer_speech_start": round(a_speech_start, 3), "answer_end": round(a_end, 3), "total_sec": round(a_end + 2.2, 3), "durations": {k: round(v, 3) for k, v in durations.items()}, "speech_windows": {k: [round(v[0], 3), round(v[1], 3)] for k, v in windows.items()}, "lines": lines}
    SHORT_TIMINGS.write_text(json.dumps(all_timings, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"lesson": sum(x["total_sec"] for x in timings.values()), "shorts": {slug: all_timings[slug]["total_sec"] for slug in SHORTS}}, ensure_ascii=False))

if __name__ == "__main__":
    asyncio.run(main())
