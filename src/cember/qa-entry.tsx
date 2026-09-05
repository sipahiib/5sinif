import React from "react";
import { AbsoluteFill, Composition, Sequence, registerRoot } from "remotion";
import { Kurz, Main, Short, mainDuration } from "./Video";
import timings from "./timings.json";

const windows = (group: "main" | "kurz") => {
  let offset = 0;
  const result: { from: number; length: number }[] = [];
  for (const timing of timings[group]) {
    result.push(
      { from: offset, length: 70 },
      { from: offset + Math.floor(timing.frames / 2), length: 15 },
      { from: offset + timing.frames - 25, length: 25 },
    );
    offset += timing.frames;
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
      {windows(group).map((window, i) => {
        const from = at;
        at += window.length;
        return (
          <Sequence key={i} from={from} durationInFrames={window.length}>
            <Sequence from={-window.from}>
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
      durationInFrames={windows("main").reduce(
        (sum, item) => sum + item.length,
        0,
      )}
    />
    <Composition
      id="KurzQA"
      component={() => <Preview group="kurz" />}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={windows("kurz").reduce(
        (sum, item) => sum + item.length,
        0,
      )}
    />
    {timings.shorts.map((item, index) => (
      <Composition
        key={index}
        id={`ShortQA${index + 1}`}
        component={Short}
        defaultProps={{ index }}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={item.frames}
      />
    ))}
  </>
);
registerRoot(Root);
