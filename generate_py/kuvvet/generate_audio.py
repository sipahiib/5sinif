import asyncio
import json
import re
import subprocess
from pathlib import Path

import edge_tts
import mutagen.mp3

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "public/audio/fen/kuvvet"
TIMINGS = ROOT / "src/kuvvet/kuvvet_timings.json"
SHORT_TIMINGS = ROOT / "src/shorts/lesson-shorts/lesson_shorts_timings.json"
VOICES = {"filiz": "tr-TR-EmelNeural", "ibrahim": "tr-TR-AhmetNeural"}

SCENES = [
    ("01", "filiz", "Merhaba arkadaşlar! Bugün kuvveti, kuvvetin özelliklerini ve nasıl ölçüldüğünü öğreneceğiz.", "Duran cisimleri hareket ettiren, hareketli cisimleri durduran; hız, yön veya şekil değişikliği oluşturabilen etkiye kuvvet denir."),
    ("02", "ibrahim", "Kuvveti göremeyiz ama etkilerini günlük yaşamda gözlemleyebiliriz. Kapıyı açarken, çantayı taşırken veya oyun hamurunu şekillendirirken kuvvet uygularız.", "Kuvvet, F harfiyle gösterilir. Uluslararası birim sistemindeki birimi Newton'dur ve kısaca N harfiyle yazılır."),
    ("03", "filiz", "Kuvvet bir cismi harekete geçirebilir, durdurabilir, hızlandırabilir ya da yavaşlatabilir.", "Ayrıca cismin hareket yönünü ve doğrultusunu değiştirebilir veya esnek bir cismin şeklini değiştirebilir."),
    ("04", "ibrahim", "Bir kuvvetin uygulama noktası, yönü, doğrultusu ve büyüklüğü vardır. Okun başladığı yer uygulama noktasını, ok ucu ise yönü gösterir.", "Okun üzerinde bulunduğu doğu-batı ya da kuzey-güney çizgisi doğrultudur. Bölme sayısı ise kuvvetin büyüklüğünü belirtir."),
    ("05", "filiz", "Yerkürenin cisimlere uyguladığı çekme kuvvetine yer çekimi kuvveti denir.", "Mıknatısın demir, nikel ve kobalt gibi maddelerden yapılmış cisimlere uyguladığı çekme kuvvetine ise manyetik kuvvet denir."),
    ("06", "ibrahim", "Üzerine kuvvet uygulandığında şekli değişen, kuvvet kalkınca eski hâline dönen cisimlere esnek cisim denir. Yay, sünger, balon ve lastik buna örnektir.", "Yayın esneklik özelliğinden yararlanarak kuvvetin büyüklüğünü ölçen araca dinamometre ya da kuvvetölçer denir."),
    ("07", "filiz", "Dinamometreye uygulanan kuvvet arttıkça içindeki yayın uzaması da artar. Yayın cinsi, kalınlığı ve boyu ölçülebilecek en büyük kuvveti belirler.", "Esneklik sınırı aşılırsa dinamometre bozulabilir. Dar aralıklarla ölçeklendirilmiş dinamometreler daha hassas ölçüm yapar. Tebrikler, kuvveti tanıdın!"),
]

SHORTS = {
    "kuvvet_1": {"question": "Kuvvetin birimi aşağıdakilerden hangisidir?", "answer": "Doğru cevap B şıkkı, Newton'dur."},
    "kuvvet_2": {"question": "Kuvvetin büyüklüğünü ölçen araç hangisidir?", "answer": "Doğru cevap C şıkkı, dinamometredir."},
}

def speech_window(path, duration):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", str(path), "-af", "silencedetect=noise=-40dB:d=0.12", "-f", "null", "-"], capture_output=True, text=True)
    starts = [float(x) for x in re.findall(r"silence_start: ([0-9.]+)", r.stderr)]
    ends = [float(x) for x in re.findall(r"silence_end: ([0-9.]+)", r.stderr)]
    return (ends[0] if ends and ends[0] < 1.5 else 0, starts[-1] if starts and starts[-1] > duration / 2 else duration)

async def save(text, voice, path, rate="+3%"):
    path.parent.mkdir(parents=True, exist_ok=True)
    await edge_tts.Communicate(text, voice, rate=rate, pitch="+0Hz").save(str(path))

async def main():
    jobs = []
    for scene_id, speaker, first, second in SCENES:
        jobs += [save(first, VOICES[speaker], OUTPUT / f"{scene_id}_1.mp3"), save(second, VOICES[speaker], OUTPUT / f"{scene_id}_2.mp3")]
    for slug, lines in SHORTS.items():
        for key, text in lines.items(): jobs.append(save(text, VOICES["ibrahim"], ROOT / f"public/audio/shorts/{slug}/{key}.mp3", "+6%"))
    await asyncio.gather(*jobs)
    timings = {}
    for scene_id, speaker, _, _ in SCENES:
        a = mutagen.mp3.MP3(OUTPUT / f"{scene_id}_1.mp3").info.length
        b = mutagen.mp3.MP3(OUTPUT / f"{scene_id}_2.mp3").info.length
        timings[scene_id] = {"speaker": speaker, "split_sec": round(a+.16,3), "speech_end_sec": round(a+.16+b,3), "total_sec": round(a+.16+b+.45,3)}
    TIMINGS.parent.mkdir(parents=True, exist_ok=True)
    TIMINGS.write_text(json.dumps(timings, ensure_ascii=False, indent=2), encoding="utf-8")
    all_timings = json.loads(SHORT_TIMINGS.read_text(encoding="utf-8"))
    for slug, lines in SHORTS.items():
        durations, windows = {}, {}
        for key in ("question","answer"):
            path = ROOT / f"public/audio/shorts/{slug}/{key}.mp3"
            durations[key] = mutagen.mp3.MP3(path).info.length
            windows[key] = speech_window(path,durations[key])
        qs=.35; qss=qs+windows["question"][0]; qe=qs+windows["question"][1]; ass=qe+5; ast=ass-windows["answer"][0]; ae=ast+windows["answer"][1]
        all_timings[slug]={"fps":30,"question_start":round(qs,3),"question_speech_start":round(qss,3),"question_end":round(qe,3),"answer_start":round(ast,3),"answer_speech_start":round(ass,3),"answer_end":round(ae,3),"total_sec":round(ae+2.2,3),"durations":{k:round(v,3) for k,v in durations.items()},"speech_windows":{k:[round(v[0],3),round(v[1],3)] for k,v in windows.items()},"lines":lines}
    SHORT_TIMINGS.write_text(json.dumps(all_timings,ensure_ascii=False,indent=2),encoding="utf-8")
    print(json.dumps({"lesson":sum(v["total_sec"] for v in timings.values()),"shorts":{k:all_timings[k]["total_sec"] for k in SHORTS}},ensure_ascii=False))

if __name__ == "__main__": asyncio.run(main())
