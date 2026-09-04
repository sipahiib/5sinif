import asyncio
import json
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parents[2]
DATA = json.loads((ROOT / "content/kutle-agirlik-narration.json").read_text())
VOICES = {"filiz": "tr-TR-EmelNeural", "ibrahim": "tr-TR-AhmetNeural"}


async def main():
    for group, scenes in DATA.items():
        target = ROOT / "public/audio/fen/kutle-agirlik" / group
        target.mkdir(parents=True, exist_ok=True)
        for scene in scenes:
            output = target / f"{scene['id']}.mp3"
            await edge_tts.Communicate(
                scene["text"], VOICES[scene["speaker"]], rate="+1%"
            ).save(str(output))
            print(output.relative_to(ROOT))


asyncio.run(main())
