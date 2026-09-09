import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
const root = process.cwd(),
  mainDir = `${root}/out/turkce/gecis-paragraf`,
  shortsDir = `${root}/out/shorts/gecis-paragraf_shorts`;
mkdirSync(mainDir, { recursive: true });
mkdirSync(shortsDir, { recursive: true });
for (const [id, output] of [
  ["GecisParagraf", `${mainDir}/gecis-paragraf.mp4`],
  ["GecisParagrafKurz", `${mainDir}/gecis-paragraf_kurz.mp4`],
  ["GecisParagrafShorts1", `${shortsDir}/gecis-paragraf_shorts_1.mp4`],
  ["GecisParagrafShorts2", `${shortsDir}/gecis-paragraf_shorts_2.mp4`],
]) {
  console.log(`Rendering ${id}`);
  execFileSync(
    "npx",
    [
      "remotion",
      "render",
      "src/gecis-paragraf/entry.tsx",
      id,
      output,
      "--codec=h264",
      "--crf=18",
      "--concurrency=5",
      "--log=error",
    ],
    { stdio: "inherit" },
  );
}
