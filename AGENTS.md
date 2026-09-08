# Project Instructions

## Multi-agent production workflow

- Use specialist sub-agents for future video production and substantial revisions. The primary agent coordinates the work, integrates outputs, and retains final quality approval and delivery responsibility.
- Assign these roles as needed: educational content and script; visual design; animation implementation; Kurz/Lumi creative design; educational accuracy review; visual and platform quality review.
- The content specialist maps numbered source pages, headings, important points, and notes to age-appropriate narration and meaningful Shorts questions. The accuracy reviewer independently checks coverage, factual correctness, question clarity, correct answers, and premature answer clues.
- The visual designer creates readable YouTube horizontal and YouTube Shorts/Instagram Reels vertical compositions. The animator implements synchronized scene-specific movement. The Kurz specialist creates the distinct narration and original Lumi animations required below.
- The visual/platform reviewer independently inspects full-resolution stills and actual moving previews for animation quality, readability on phones, safe areas around platform controls, overlaps, clipping, disconnected graphics, drift, jitter, and timing defects. Merely rendering a preview does not count as inspecting it.
- Start each production with a shared brief containing sources, deliverables, duration limits, output paths, scene/audio timing, and the current project standards. Give every agent a bounded task, explicit deliverables, dependencies, and owned files.
- Run independent tasks in parallel within the available runtime capacity (currently up to three sub-agents alongside the primary agent). Schedule the six specialist roles in stages or reuse agents; do not require all roles to run simultaneously.
- Avoid concurrent edits to the same files. The primary agent manages shared components and integration; specialists report their changes and verification evidence.
- Have someone other than the producer review the content and visuals. Report defects with scene/frame or timecode, evidence, and the required correction; recheck affected scenes after fixes.
- The primary agent reviews the source coverage, specialist reports, and actual previews before authorizing final render. Do not approve with unresolved material defects. After rendering, verify output dimensions, duration, audio, file integrity, and representative final frames before delivery.
- Final approval here means internal quality approval. Publishing or uploading to YouTube or Instagram requires a separate explicit user instruction.

## Quality assurance and animation

- Use polished, scene-specific animation with smooth easing or spring motion, purposeful transitions, synchronized visual emphasis, secondary motion, depth, and restrained particles where useful.
- Keep narration, active-speaker animation, graphics, and scene timing synchronized. Avoid static placeholder visuals, abrupt movement, flicker, jitter, clipping, hidden content, and unreadable compositions.
- Before every final MP4 render, review the complete video at its intended output resolution using both representative stills and a moving preview. Check frame 0, scene transitions, entrances and exits, text, characters, diagrams, countdowns, answer reveals, note callouts, channel cards, and closing animations.
- Inspect every connected or grouped graphic throughout its motion. Lines, arrows, labels, objects, and surfaces must remain correctly joined and aligned; they must not overlap unintentionally, separate, drift, jump, or leave visible gaps.
- Fix every detected defect, rerender the affected preview, and recheck it before producing the final MP4. Apply this process to main videos, Kurz companions, Shorts, Reels, and regenerated outputs.

## Narration

- Never begin with a greeting or introductory phrase such as “Merhaba arkadaşlar.” Start explaining the lesson immediately.
- Derive all scene, choice, countdown, reveal, and ending timings from the actual generated audio durations rather than guessed fixed offsets.

## Main-video characters

- Use `public/images/filiz_2.gif` and `public/images/ibrahim_2.gif`, based on their cleaned transparent 22-frame animations. Never show unused sprite cells, old PNG/drawn characters, white backgrounds, placeholder frames, or removed black artifacts.
- Show exactly one speaking character in each lesson scene. Alternate or preserve the established Filiz/İbrahim speaker roles, and synchronize mouth animation with the active voice.
- Filiz must be visible on frame 0 through a render-blocking image load.
- Show both characters only in the final main-video scene. The non-speaker may use the neutral first frame with subtle breathing motion.
- Preserve the 160 × 280 source box and scale it to the narration card without distortion. Use the established left/right placement unless a scene requires another safe composition.
- In every newly created or regenerated main video, place a clear name label directly below each visible character: `Filiz` below Filiz and `İbrahim` below İbrahim. Keep the label synchronized with the character's placement and fully inside the safe area without covering lesson content. Label both characters separately in the final two-character scene.

## Source pages and main-video layout

- Follow source pages in numeric order and cover every heading, important teaching point, and sentence explicitly labeled “Not.”
- Present each source note in its relevant scene as a clearly labeled `NOT` callout with a contrasting border/accent and restrained entrance animation. Keep it readable and synchronized with the explanation.
- Use source JPGs only to understand the lesson. Never embed their photographs or page imagery; replace them with original code-native diagrams and animations.
- In single-character scenes, expand the lesson composition into the unused side rather than leaving a character-sized empty column. Keep the final two-character scene centered between Filiz and İbrahim.
- Keep each main lesson video at or below 300 seconds, including its closing screen.

## Output and repository rules

- Render horizontal main and Kurz videos at `1920 × 1080`; render Shorts and Reels at `1080 × 1920`.
- Store main and Kurz outputs together under the appropriate topic path in `out`; name the companion `<main-video-name>_kurz.mp4`.
- Store Shorts under `out/shorts/<main-video-name>_shorts/`. Use `<main-video-name>_shorts.mp4` for one Short or numbered names such as `<main-video-name>_shorts_1.mp4` for multiple Shorts.
- Do not leave final MP4 files in the project root.
- Never commit or push MP4 or MP3 files to GitHub. Keep all rendered videos and generated audio local.
- When creating a new main video, also create its Kurz companion and at least one companion Short unless the user explicitly requests otherwise.

## Kurz/Lumi companion

- Create an original, high-quality science-infographic companion inspired only by the broad strengths of polished educational animation. Never copy Kurzgesagt’s visual identity, birds, scenes, music, characters, or narrator voice.
- Make the companion meaningfully different from the main video: use fresh narration, examples, explanation order, visual metaphors, diagrams, transitions, compositions, and motion language.
- Use layered code-native animation, camera movement, depth, secondary motion, and restrained particles at the project’s highest quality level.
- Alternate the established Filiz and İbrahim voices off-screen by scene: Filiz, İbrahim, Filiz, İbrahim, and so on.
- Never show Filiz or İbrahim. Show only the project’s original Lumi mascot in the geometric visual language established by `ay_60_demo.mp4`.
- Include the approved channel card when applicable, but do not add the regular closing screen, CTA, trailing end card, or visible Filiz/İbrahim scene. End immediately when the lesson narration finishes.

## Non-Shorts channel card and closing screen

- In every non-Shorts video lasting at least 35 seconds, show `src/previews/channel-lower-third/ChannelLowerThirdPreview.tsx` from `00:30` through `00:35` without interrupting narration.
- Display `DERSKUTUSU32`, `youtube.com/@derskutusu32`, and `KANALA GİT`. Preserve the approved entrance/exit, shine, progress accent, cursor click, restrained particles, and activated state. Place it in a lower safe area without covering essential content.
- End every regular non-Shorts main video with `src/previews/cta-option-1/CtaOptionOne.tsx`. Keep Filiz and İbrahim on opposite sides and animate like, subscribe, and bell controls in sequence.
- Do not show “Dersi beğendiysen desteğini gösterebilirsin.” Do not apply the regular closing screen to Shorts or Kurz companions.

## Shorts format

- Use the latest approved `surtunme_shorts_1.mp4` layout and motion language for all new or regenerated Shorts.
- Use a bright light-blue-to-white/soft-coral background, soft decorative texture, white rounded cards, navy text, blue/red accents, soft shadows, and generous but purposeful safe spacing. Never use the dark Kurz treatment.
- Fill the vertical frame deliberately. Scale and distribute the header, question, animation, choices, countdown, character, and success message so no large unused vertical region remains.
- Use the approved top header: separate `5. SINIF` and subject pills followed by a subtle horizontal rule.
- Use the approved question card: yellow question-mark badge, `HIZLI SORU • <KONU>` eyebrow, large bold question, and a short neutral information strip. The strip and all pre-answer text must not reveal or imply the answer.
- Place a large original code-native animated illustration directly below the question card. Do not use a simplistic static diagram. Animate its meaningful parts with smooth entrance, continuous or staged motion, and secondary motion that clarifies the given information without revealing the answer.
- Keep the illustration visible with the choices when space permits. Inspect every animation frame so objects, surfaces, arrows, labels, connectors, and related graphics never overlap unintentionally, separate, drift, misalign, or clip.
- İbrahim is the only Shorts character. Place him at the far-right safe edge beside the answer choices and slightly lower than the animation; keep him fully inside the frame and completely clear of the illustration, choices, countdown, and success message.
- After the spoken question ends, show exactly four compact choices labeled A, B, C, and D in a left-side column. They must appear on the first following frame together with the countdown and remain unmarked for five seconds.
- Place the circular countdown below the choices. Count visibly from 5 to 1 with an animated progress ring and `DÜŞÜN!`, without covering the choices or İbrahim.
- At the end of the five-second window, immediately start the answer narration. Keep the question, illustration, and all four choices on the same screen; mark and emphasize the correct choice on its existing card. Never use a separate answer screen.
- After the spoken answer finishes, show a large `Tebrikler!` success card in the lower safe area. Use it to complete the vertical composition, then end the video. Do not add a like, subscribe, CTA, or spoken promotional line.
- Before rendering, inspect frame 0, the illustration entrance and full motion range, the question-to-choice boundary, all five countdown states, the exact reveal frame, answer animation, character position, and the complete `Tebrikler!` state at `1080 × 1920`. Also inspect a full moving preview and correct every visual defect before final render.
