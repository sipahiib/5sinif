import React from "react";
import { AbsoluteFill, Composition, Sequence, registerRoot } from "remotion";
import { Kurz, Main, Short, mainDuration } from "./Video";
import timings from "./timings.json";
const windows = (group: "main" | "kurz") => {
  let offset = 0;
  const result: { from: number; length: number }[] = [];
  for (const t of timings[group]) {
    result.push(
      { from: offset, length: 70 },
      { from: offset + Math.floor(t.frames / 2), length: 15 },
      { from: offset + t.frames - 25, length: 25 },
    );
    offset += t.frames;
  }
  result.push({ from: 900, length: 150 });
  if (group === "main")
    result.push({ from: mainDuration() - 210, length: 210 });
  return result;
};
const Preview = ({ group }: { group: "main" | "kurz" }) => {
  let at = 0;
  const Component = group === "main" ? Main : Kurz;
  return (
    <AbsoluteFill>
      {windows(group).map((w, i) => {
        const from = at;
        at += w.length;
        return (
          <Sequence key={i} from={from} durationInFrames={w.length}>
            <Sequence from={-w.from}>
              <Component />
            </Sequence>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
const Root = () => (
  <>
    <Composition
      id="MainQA"
      component={() => <Preview group="main" />}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={windows("main").reduce((s, w) => s + w.length, 0)}
    />
    <Composition
      id="KurzQA"
      component={() => <Preview group="kurz" />}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={windows("kurz").reduce((s, w) => s + w.length, 0)}
    />
    {timings.shorts.map((t, index) => (
      <Composition
        key={index}
        id={`ShortQA${index + 1}`}
        component={Short}
        defaultProps={{ index }}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={t.frames}
      />
    ))}
  </>
);
registerRoot(Root);
