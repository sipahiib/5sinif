import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
const qa = process.argv.includes("--qa");
const root = process.cwd();
const dir = qa
  ? "/tmp/sozcuk-noktalama-qa"
  : `${root}/out/turkce/sozcuk-noktalama`;
mkdirSync(dir, { recursive: true });
mkdirSync(`${root}/out/shorts/sozcuk-noktalama_shorts`, { recursive: true });
const jobs = qa
  ? [
      ["MainQA", `${dir}/main.mov`],
      ["KurzQA", `${dir}/kurz.mov`],
      ...[1, 2, 3].map((i) => [`ShortQA${i}`, `${dir}/short-${i}.mov`]),
    ]
  : [
      ["SozcukNoktalama", `${dir}/sozcuk-noktalama.mp4`],
      ["SozcukNoktalamaKurz", `${dir}/sozcuk-noktalama_kurz.mp4`],
      ...[1, 2, 3].map((i) => [
        `SozcukNoktalamaShorts${i}`,
        `${root}/out/shorts/sozcuk-noktalama_shorts/sozcuk-noktalama_shorts_${i}.mp4`,
      ]),
    ];
for (const [id, output] of jobs) {
  console.log(`Rendering ${id}`, new Date().toISOString());
  execFileSync(
    "npx",
    [
      "remotion",
      "render",
      `src/sozcuk-noktalama/${qa ? "qa-entry" : "entry"}.tsx`,
      id,
      output,
      "--codec=h264",
      "--crf=18",
      "--concurrency=5",
      "--log=error",
    ],
    { stdio: "inherit" },
  );
  console.log(`Completed ${output}`);
}
