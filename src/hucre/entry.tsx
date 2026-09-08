import React from "react";
import { Composition, registerRoot } from "remotion";
import timings from "./timings.json";
import { Kurz, Main, Short, kurzDuration, mainDuration } from "./Video";

const Root = () => (
  <>
    <Composition
      id="Hucre"
      component={Main}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={mainDuration()}
    />
    <Composition
      id="HucreKurz"
      component={Kurz}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={kurzDuration()}
    />
    {timings.shorts.map((t, i) => (
      <Composition
        key={i}
        id={`HucreShorts${i + 1}`}
        component={Short}
        defaultProps={{ index: i }}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={t.frames}
      />
    ))}
  </>
);
registerRoot(Root);
