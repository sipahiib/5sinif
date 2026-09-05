import React from "react";
import { Composition, registerRoot } from "remotion";
import { Kurz, Main, Short, kurzDuration, mainDuration } from "./Video";
import timings from "./timings.json";
const Root = () => (
  <>
    <Composition
      id="Surtunme"
      component={Main}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={mainDuration()}
    />
    <Composition
      id="SurtunmeKurz"
      component={Kurz}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={kurzDuration()}
    />
    {timings.shorts.map((t, index) => (
      <Composition
        key={index}
        id={`SurtunmeShorts${index + 1}`}
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
