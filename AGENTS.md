# Project Instructions

## Video animation quality

- For every future video in this project, use higher-quality animation than the current baseline.
- Prefer smooth, layered, scene-specific motion over simple or mostly static visuals.
- Use polished easing or spring motion, purposeful transitions, secondary motion, depth, and restrained particles where they improve the lesson.
- Keep narration, active-speaker animation, visual emphasis, and scene timing synchronized.
- Prevent overlaps, clipped text, hidden edges, abrupt movement, and unreadable compositions.
- Before delivery, visually inspect representative frames from every scene and correct layout or animation defects.

## Character assets

- In every future video, use `public/images/filiz_2.gif` and `public/images/ibrahim_2.gif` as the Filiz and İbrahim character visuals. Do not use the previous PNG or drawn character assets.
- Use the cleaned, transparent 22-frame animation derived from each GIF. Do not display unused sprite cells, the original white background, black placeholder frames, or the removed black face/moustache-area artifacts.
- Keep the character animation synchronized with the active speaker.
- Show exactly one character on every lesson scene, and that visible character must provide the full narration for that scene. Show both Filiz and İbrahim only on the final scene; the non-speaking final-scene character may remain on its neutral first frame with subtle breathing motion.
- Filiz must already be visible on frame 0 when the video starts. Load character sprite assets with a render-blocking image component so the first rendered frame cannot omit her.
- Size and vertically position the GIF-based characters so their visible top and bottom align with the narration card height. Preserve the 160 x 280 source character box, but adjust scene scale and position as needed to fill the side column and match the card height.
- Preserve the established left/right character placement and speaker roles unless a scene specifically requires a different composition.

## Source pages and scene layout

- Never place photographs or other embedded images from source JPG files under `public/pages` into a video. Use the source pages only to understand the lesson content; replace their imagery with original code-native diagrams, illustrations, or animations.
- On every single-character scene, expand the presentation into the side where the hidden character would otherwise appear. Do not leave an unused character-sized empty area on either the left or right.
- Keep the final two-character scene centered between Filiz and İbrahim.

## Video output organization

- Save every rendered video under `out/<video-name>/<video-name>.mp4`.
- Create the matching `<video-name>` directory under `out` when it does not exist.
- Save every future Shorts video under `out/shorts/<shorts-video-name>/<shorts-video-name>.mp4`; create a new matching subdirectory for each Shorts video.
- Whenever a new non-Shorts MP4 video is created, also create a separate companion Shorts video for it.
- Do not leave final rendered videos in the project root.
