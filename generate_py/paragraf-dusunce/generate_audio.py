"""Generate main narration from the reviewed production draft and measure it."""
import asyncio
import json
import math
import re
import subprocess
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[2]
DRAFT = ROOT / 'content/paragraf-dusunce/URETIM.md'
AUDIO = ROOT / 'public/audio/turkce/paragraf-dusunce/main'
VOICES = {'Filiz': 'tr-TR-EmelNeural', 'İbrahim': 'tr-TR-AhmetNeural'}

async def main():
    draft = DRAFT.read_text(encoding='utf-8')
    section = draft.split('## Ana video anlatım taslağı\n', 1)[1].split('\n## Kurz/Lumi', 1)[0]
    scenes = re.findall(r'^\d+\. \*\*(.+?) — (Filiz|İbrahim)\.\*\* (.+)$', section, re.M)
    if len(scenes) != 8:
        raise ValueError(f'Expected 8 main scenes, found {len(scenes)}')
    AUDIO.mkdir(parents=True, exist_ok=True)
    timings = []
    for index, (title, speaker, narration) in enumerate(scenes, 1):
        target = AUDIO / f'{index:02}.mp3'
        await edge_tts.Communicate(narration, VOICES[speaker], rate='-2%').save(str(target))
        seconds = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', str(target)], text=True))
        timings.append({'id': f'{index:02}', 'title': title, 'speaker': speaker, 'seconds': seconds, 'audioFrames': math.ceil(seconds * 30)})
        print(f'{index:02} {title}: {seconds:.2f}s', flush=True)
    (ROOT / 'content/paragraf-dusunce/main-audio-timings.json').write_text(json.dumps(timings, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

if __name__ == '__main__':
    asyncio.run(main())
