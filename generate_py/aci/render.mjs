import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
const root = process.cwd(),
  mainDir = `${root}/out/matematik/aci`,
  shortsDir = `${root}/out/shorts/aci_shorts`;
mkdirSync(mainDir, { recursive: true });
mkdirSync(shortsDir, { recursive: true });
for (const [id, output] of [
  ["Aci", `${mainDir}/aci.mp4`],
  ["AciKurz", `${mainDir}/aci_kurz.mp4`],
  ["AciShorts1", `${shortsDir}/aci_shorts_1.mp4`],
]) {
  console.log(`Rendering ${id}`);
  execFileSync(
    "npx",
    [
      "remotion",
      "render",
      "src/aci/entry.tsx",
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
  ["remotion", "still", "src/aci/entry.tsx", "AciKurzCover", `${mainDir}/aci_kurz_kapak.png`, "--log=error"],
  { stdio: "inherit" },
);
