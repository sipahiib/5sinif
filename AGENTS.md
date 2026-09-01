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
- Save Shorts videos under `out/shorts/<main-video-name>_shorts/`. The folder name must always consist of the main video's name followed by `_shorts` (for example, `out/shorts/kulturel_shorts/`).
- When a main video has one companion Shorts video, name it `<main-video-name>_shorts.mp4`. When it has multiple Shorts videos, keep them in the same `_shorts` folder and number them as `<main-video-name>_shorts_1.mp4`, `<main-video-name>_shorts_2.mp4`, and so on.
- Whenever a new non-Shorts MP4 video is created, also create a separate companion Shorts video for it.
- Do not leave final rendered videos in the project root.
- Never commit or push any MP4 file to GitHub. Keep all rendered MP4 outputs local, even when related source files are committed or pushed.
- Never commit or push any MP3 file to GitHub. Keep all generated MP3 audio files local, even when related source files are committed or pushed.

## Non-Shorts closing screen

- For every future non-Shorts video, use the approved professional animated closing-screen design represented by `src/previews/cta-option-1/CtaOptionOne.tsx`.
- Keep Filiz and İbrahim on opposite sides of the closing card. Animate the like, subscribe, and notification-bell controls in sequence with polished spring motion, cursor clicks, restrained click particles, and clear activated states.
- Do not display the sentence "Dersi beğendiysen desteğini gösterebilirsin." on the closing screen.
- Apply this closing-screen standard only to videos created or regenerated after this instruction. Do not retrofit existing rendered videos unless explicitly requested.
- This closing-screen requirement never applies to Shorts videos.

## Non-Shorts YouTube channel card

- In every future non-Shorts video that is at least 35 seconds long, show the approved animated YouTube channel card from 00:30 through 00:35.
- Use the design represented by `src/previews/channel-lower-third/ChannelLowerThirdPreview.tsx`: a light rounded creator pill with the YouTube mark, channel identity, URL, and an animated action button.
- Display the channel name as `DERSKUTUSU32`, the address as `youtube.com/@derskutusu32`, and the button label as `KANALA GİT`.
- Keep the card visible for exactly five seconds, including its polished entrance and exit animation. Preserve the spring motion, subtle shine, progress accent, cursor click, restrained particles, and activated button state shown in the approved demo.
- Place the card in the lower safe area without covering the visible character, narration card, essential lesson text, or diagrams. Adapt its horizontal side to the current scene when necessary.
- Do not add spoken narration for the channel card and do not interrupt or alter the lesson narration.
- Do not apply this channel card to Shorts videos.

## Shorts videos

- In every Shorts video, İbrahim must be the only character shown. Do not use Filiz in Shorts videos.
- Do not include a like, subscribe, or other call-to-action page at the end of a Shorts video. İbrahim must not narrate a like, subscribe, or other call-to-action line. Shorts videos are exempt from any general end-of-video like/subscribe requirement.
- Before the answer is revealed, do not display any word, label, hint, diagram caption, or other on-screen text that contains the answer or makes the correct choice obvious. Keep the question page and pre-answer visual free of answer-revealing terms such as the correct option's name, symbol, defining keyword, or instrument name.
- After İbrahim asks the question in a Shorts video, display exactly three answer choices labeled A, B, and C. Keep all three choices visible and unmarked for five seconds.
- After the five-second choice window, clearly indicate the correct choice while İbrahim narrates the answer. One second after the spoken answer finishes, display the text "Tebrikler!" and then end the video.
