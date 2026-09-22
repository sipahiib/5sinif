import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const root = process.cwd();
const mainDir = `${root}/out/matematik/cember`;
const shortsDir = `${root}/out/shorts/cember_shorts`;
mkdirSync(mainDir, { recursive: true });
mkdirSync(shortsDir, { recursive: true });
const jobs = [
  ["Cember", `${mainDir}/cember.mp4`],
  ["CemberKurz", `${mainDir}/cember_kurz.mp4`],
  ["CemberShorts1", `${shortsDir}/cember_shorts_1.mp4`],
  ["CemberShorts2", `${shortsDir}/cember_shorts_2.mp4`],
];
for (const [id, output] of jobs) {
  console.log(`Rendering ${id}`);
  execFileSync(
    "npx",
    [
      "remotion",
      "render",
      "src/cember/entry.tsx",
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
  ["remotion", "still", "src/cember/entry.tsx", "CemberKurzCover", `${mainDir}/cember_kurz_kapak.png`, "--log=error"],
  { stdio: "inherit" },
);
