import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
const root = process.cwd(),
  mainDir = `${root}/out/fen/hucre`,
  shortsDir = `${root}/out/shorts/hucre_shorts`;
mkdirSync(mainDir, { recursive: true });
mkdirSync(shortsDir, { recursive: true });
for (const [id, output] of [
  ["Hucre", `${mainDir}/hucre.mp4`],
  ["HucreKurz", `${mainDir}/hucre_kurz.mp4`],
  ["HucreShorts1", `${shortsDir}/hucre_shorts_1.mp4`],
  ["HucreShorts2", `${shortsDir}/hucre_shorts_2.mp4`],
]) {
  console.log(`Rendering ${id}`);
  execFileSync(
    "npx",
    [
      "remotion",
      "render",
      "src/hucre/entry.tsx",
      id,
      output,
      "--scale=0.6666666667",
      "--codec=h264",
      "--crf=18",
      "--concurrency=5",
      "--log=error",
    ],
    { stdio: "inherit" },
  );
}
execFileSync(
  "npx",
  ["remotion", "still", "src/hucre/entry.tsx", "HucreKurzCover", `${mainDir}/hucre_kurz_kapak.png`, "--log=error"],
  { stdio: "inherit" },
);
