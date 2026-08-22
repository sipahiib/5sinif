import argparse
import asyncio
import json
from pathlib import Path

import edge_tts
import mutagen.mp3

VOICE_FILIZ = "tr-TR-EmelNeural"
VOICE_IBRAHIM = "tr-TR-AhmetNeural"
VOICES = {"filiz": VOICE_FILIZ, "ibrahim": VOICE_IBRAHIM}


def load_manifest(path: Path) -> dict:
    with path.open(encoding="utf-8") as file:
        manifest = json.load(file)
    if not isinstance(manifest.get("lessons"), list) or not manifest["lessons"]:
        raise ValueError("Manifest must contain a non-empty 'lessons' array")
    return manifest


def validate_scene(scene: dict, image_root: Path) -> None:
    required = ("id", "image", "dialogue")
    missing = [field for field in required if not scene.get(field)]
    if missing:
        raise ValueError(f"Scene {scene.get('id', '?')} is missing: {', '.join(missing)}")
    image_path = image_root / scene["image"]
    if not image_path.is_file():
        raise FileNotFoundError(f"Image not found: {image_path}")
    for speaker in ("filiz", "ibrahim"):
        if not scene["dialogue"].get(speaker, "").strip():
            raise ValueError(f"Scene {scene['id']} has empty {speaker} dialogue")


async def generate_lesson(lesson: dict, project_root: Path) -> None:
    image_root = project_root / "public" / lesson["imageRoot"]
    audio_root = project_root / "public" / lesson["audioRoot"]
    timing_root = project_root / "content" / "timings"
    audio_root.mkdir(parents=True, exist_ok=True)
    timing_root.mkdir(parents=True, exist_ok=True)
    timings = {}

    for scene in lesson["scenes"]:
        validate_scene(scene, image_root)
        first_speaker = scene["firstSpeaker"]
        second_speaker = "ibrahim" if first_speaker == "filiz" else "filiz"
        first_path = audio_root / f"{scene['id']}_1.mp3"
        second_path = audio_root / f"{scene['id']}_2.mp3"
        await edge_tts.Communicate(scene["dialogue"][first_speaker], VOICES[first_speaker]).save(str(first_path))
        await edge_tts.Communicate(scene["dialogue"][second_speaker], VOICES[second_speaker]).save(str(second_path))
        split_sec = mutagen.mp3.MP3(first_path).info.length
        total_sec = split_sec + mutagen.mp3.MP3(second_path).info.length
        timings[scene["id"]] = {
            "first_speaker": first_speaker,
            "split_sec": round(split_sec, 2),
            "total_sec": round(total_sec, 2),
        }
        scene["splitSec"] = round(split_sec, 2)
        scene["totalSec"] = round(total_sec, 2)
        print(f"{lesson['id']} / {scene['id']}: {total_sec:.2f}s")

    output_path = timing_root / f"{lesson['id']}.json"
    with output_path.open("w", encoding="utf-8") as file:
        json.dump(timings, file, indent=2, ensure_ascii=False)
    print(f"Timing written to {output_path}")


async def main() -> None:
    parser = argparse.ArgumentParser(description="Generate lesson audio and timing data from a central manifest")
    parser.add_argument("manifest", type=Path)
    parser.add_argument("--lesson", help="Only generate the lesson with this id")
    args = parser.parse_args()
    project_root = Path(__file__).resolve().parents[1]
    manifest = load_manifest(project_root / args.manifest)
    lessons = [lesson for lesson in manifest["lessons"] if not args.lesson or lesson["id"] == args.lesson]
    if not lessons:
        raise ValueError(f"Lesson not found: {args.lesson}")
    for lesson in lessons:
        await generate_lesson(lesson, project_root)
    manifest_path = project_root / args.manifest
    with manifest_path.open("w", encoding="utf-8") as file:
        json.dump(manifest, file, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    asyncio.run(main())