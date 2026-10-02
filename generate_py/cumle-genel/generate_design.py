"""Generate isolated -2% narration and measured scene/part timings."""
import asyncio
import json
import math
import hashlib
from pathlib import Path
import edge_tts
from mutagen.mp3 import MP3

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / 'content/cumle-genel-design/lesson.json'
OUT = ROOT / 'public/audio/turkce/cumle-genel-design'

async def main():
    scenes = json.loads(DATA.read_text())
    OUT.mkdir(parents=True, exist_ok=True)
    cursor = 0
    for scene in scenes:
        voice = 'tr-TR-EmelNeural' if scene['speaker'] == 'filiz' else 'tr-TR-AhmetNeural'
        parts = []
        local = 0
        for i, text in enumerate(scene['parts']):
            digest = hashlib.sha256((text + voice + '-2%').encode()).hexdigest()[:8]
            file = OUT / f"{scene['id']}-{i}-{digest}.mp3"
            # New output namespace: never overwrite legacy tracked narration.
            if not file.exists() or file.stat().st_size == 0:
                await edge_tts.Communicate(text, voice, rate='-2%').save(str(file))
            seconds = MP3(file).info.length
            frames = math.ceil(seconds * 30)
            parts.append({'text':text, 'audio':str(file.relative_to(ROOT / 'public')), 'from':local, 'frames':frames, 'seconds':seconds})
            local += frames + 8
        scene['parts'] = parts
        scene['from'] = cursor
        scene['frames'] = local + 10
        cursor += scene['frames']
        print(scene['id'], round(local / 30, 2), flush=True)
    payload = {'fps':30, 'lessonFrames':cursor, 'durationInFrames':cursor + 210, 'scenes':scenes}
    if payload['durationInFrames'] > 9000:
        raise RuntimeError(f"Over 300s: {payload['durationInFrames']/30}")
    (ROOT / 'src/cumle-genel-design/timeline.json').write_text(json.dumps(payload, ensure_ascii=False, indent=2))
    print('TOTAL', payload['durationInFrames']/30, flush=True)

asyncio.run(main())
