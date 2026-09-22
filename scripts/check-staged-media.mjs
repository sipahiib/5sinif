import {execFileSync} from "node:child_process";

const staged = execFileSync(
  "git",
  ["diff", "--cached", "--name-only", "--diff-filter=ACMR"],
  {encoding: "utf8"},
)
  .split("\n")
  .filter(Boolean);

const blocked = staged.filter((file) => /\.(mp3|mp4)$/i.test(file));

if (blocked.length > 0) {
  console.error("HATA: MP3/MP4 dosyalari Git'e eklenemez:");
  for (const file of blocked) console.error(`- ${file}`);
  process.exit(1);
}

console.log("PASS: Stage edilen MP3/MP4 dosyasi yok.");
