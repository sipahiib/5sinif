import asyncio
import json
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[2]
DATA = json.loads((ROOT / "content/yardimlasma-narration.json").read_text())
VOICES = {"filiz": "tr-TR-EmelNeural", "ibrahim": "tr-TR-AhmetNeural"}


async def create(text, speaker, output):
    output.parent.mkdir(parents=True, exist_ok=True)
    await edge_tts.Communicate(text, VOICES[speaker], rate="+1%").save(str(output))
    print(output.relative_to(ROOT))


async def main():
    for group in ("main", "kurz"):
        for scene in DATA[group]:
            await create(scene["text"], scene["speaker"], ROOT / "public/audio/sosyal/yardimlasma" / group / f"{scene['id']}.mp3")
    for index, short in enumerate(DATA["shorts"], 1):
        base = ROOT / "public/audio/sosyal/yardimlasma" / "shorts" / f"{index:02d}"
        await create(short["question"], "ibrahim", base / "question.mp3")
        await create(short["answer"], "ibrahim", base / "answer.mp3")


asyncio.run(main())
