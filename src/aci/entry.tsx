import React from "react";
import { Composition, registerRoot } from "remotion";
import timings from "./timings.json";
import { Cover, Kurz, Main, Short, kurzDuration, mainDuration } from "./Video";

const Root = () => (
  <>
    <Composition
      id="Aci"
      component={Main}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={mainDuration()}
    />
    <Composition
      id="AciKurz"
      component={Kurz}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={kurzDuration()}
    />
    <Composition
      id="AciThumbnail"
      component={Cover}
      defaultProps={{ variant: "main" as const, index: 0 }}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={1}
    />
    <Composition
      id="AciKurzThumbnail"
      component={Cover}
      defaultProps={{ variant: "kurz" as const, index: 0 }}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={1}
    />
    {timings.shorts.map((t, i) => (
      <Composition
        key={i}
        id={`AciShorts${i + 1}`}
        component={Short}
        defaultProps={{ index: i }}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={t.frames}
      />
    ))}
    {timings.shorts.map((_, i) => (
      <Composition
        key={`cover-${i}`}
        id={`AciShortsThumbnail${i + 1}`}
        component={Cover}
        defaultProps={{ variant: "short" as const, index: i }}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={1}
      />
    ))}
  </>
);
registerRoot(Root);
