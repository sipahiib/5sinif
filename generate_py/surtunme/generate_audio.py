import asyncio
import json
import math
import subprocess
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[2]
DATA = json.loads((ROOT / 'content/surtunme.json').read_text())
BASE = ROOT / 'public/audio/fen/kuvvet/surtunme'
VOICES = {'filiz': 'tr-TR-EmelNeural', 'ibrahim': 'tr-TR-AhmetNeural'}


def duration(path):
    return float(subprocess.check_output([
        'ffprobe', '-v', 'error', '-show_entries', 'format=duration',
        '-of', 'default=nw=1:nk=1', str(path)
    ], text=True))


async def make(text, speaker, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists() or path.stat().st_size < 1000:
        for attempt in range(3):
            try:
                await edge_tts.Communicate(text, VOICES[speaker], rate='+2%').save(str(path))
                break
            except Exception:
                if attempt == 2:
                    raise
    seconds = duration(path)
    print(f'{path.relative_to(ROOT)}: {seconds:.3f}s', flush=True)
    return math.ceil(seconds * 30)


async def main():
    timings = {'main': [], 'kurz': [], 'shorts': []}
    for group in ('main', 'kurz'):
        for i, scene in enumerate(DATA[group]):
            frames = await make(scene['text'], scene['speaker'], BASE / group / f"{scene['id']}.mp3")
            tail = 0 if group == 'kurz' and i == len(DATA[group]) - 1 else 12
            timings[group].append({'audioFrames': frames, 'frames': frames + tail})
    for i, item in enumerate(DATA['shorts'], 1):
        target = BASE / 'shorts' / str(i)
        question = await make(item['question'], 'ibrahim', target / 'question.mp3')
        answer = await make(item['answer'], 'ibrahim', target / 'answer.mp3')
        reveal = question + 150
        end = reveal + answer
        timings['shorts'].append({'qEnd': question, 'reveal': reveal, 'aEnd': end, 'congrats': end, 'frames': end + 45})
    output = ROOT / 'src/surtunme/timings.json'
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(timings, indent=2) + '\n')
    print('Timings saved.', flush=True)


asyncio.run(main())
