import React from "react";
import { Composition, registerRoot } from "remotion";
import { Main, Short, mainDuration } from "./Video";
import { Kurz2, VividKurz, vividKurzDuration } from "./Kurz2";
import timings from "./timings.json";
const Root = () => (
  <>
    <Composition
      id="AnadoludaIlkHayat"
      component={Main}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={mainDuration()}
    />
    <Composition
      id="AnadoludaIlkHayatKurz"
      component={VividKurz}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={vividKurzDuration()}
    />
    <Composition
      id="AnadoludaIlkHayatKurz2"
      component={Kurz2}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={900}
    />
    <Composition
      id="AnadoludaIlkHayatShorts1"
      component={Short}
      defaultProps={{ index: 0 }}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={timings.shorts[0].frames}
    />
    <Composition
      id="AnadoludaIlkHayatShorts2"
      component={Short}
      defaultProps={{ index: 1 }}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={timings.shorts[1].frames}
    />
  </>
);
registerRoot(Root);
