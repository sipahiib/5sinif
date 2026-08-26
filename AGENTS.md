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
- Keep the character animation synchronized with the active speaker. A non-speaking character may remain on its neutral first frame while retaining the established subtle breathing motion.
- Display these GIF-based characters at the same apparent size as the previous characters: use the existing 160 x 280 character box and the established scene scale (typically `0.78` in 960 x 540 videos), adjusting only for transparent padding or differing image aspect ratios so their visible body size remains matched.
- Preserve the established left/right character placement and speaker roles unless a scene specifically requires a different composition.

## Video output organization

- Save every rendered video under `out/<video-name>/<video-name>.mp4`.
- Create the matching `<video-name>` directory under `out` when it does not exist.
- Do not leave final rendered videos in the project root.
