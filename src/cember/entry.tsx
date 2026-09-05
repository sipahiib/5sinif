import React from "react";
import { Composition, registerRoot } from "remotion";
import { Kurz, Main, Short, kurzDuration, mainDuration } from "./Video";
import timings from "./timings.json";

const Root = () => (
  <>
    <Composition
      id="Cember"
      component={Main}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={mainDuration()}
    />
    <Composition
      id="CemberKurz"
      component={Kurz}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={kurzDuration()}
    />
    {timings.shorts.map((item, index) => (
      <Composition
        key={index}
        id={`CemberShorts${index + 1}`}
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
