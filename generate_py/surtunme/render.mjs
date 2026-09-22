import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
const root = process.cwd(),
  mainDir = `${root}/out/fen/kuvvet/surtunme`,
  shortsDir = `${root}/out/shorts/surtunme_shorts`;
mkdirSync(mainDir, { recursive: true });
mkdirSync(shortsDir, { recursive: true });
const jobs = [
  ["Surtunme", `${mainDir}/surtunme.mp4`],
  ["SurtunmeKurz", `${mainDir}/surtunme_kurz.mp4`],
  ...[1, 2, 3].map((i) => [
    `SurtunmeShorts${i}`,
    `${shortsDir}/surtunme_shorts_${i}.mp4`,
  ]),
];
for (const [id, output] of jobs) {
  console.log(`Rendering ${id}`);
  execFileSync(
    "npx",
    [
      "remotion",
      "render",
      "src/surtunme/entry.tsx",
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
  console.log(`Completed ${output}`);
}
execFileSync(
  "npx",
  ["remotion", "still", "src/surtunme/entry.tsx", "SurtunmeKurzCover", `${mainDir}/surtunme_kurz_kapak.png`, "--log=error"],
  { stdio: "inherit" },
);
