import React from "react";
import { Composition, Still, registerRoot } from "remotion";
import { KurzCover } from "../components/KurzCover";
import timings from "./timings.json";
import { Kurz, Main, Short, kurzDuration, mainDuration } from "./Video";

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
    <Still
      id="AciKurzCover"
      component={KurzCover}
      defaultProps={{subject: "MATEMATİK", title: "AÇILAR", accent: "#65e4d6", secondary: "#8267e8"}}
      width={1280}
      height={720}
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
  </>
);
registerRoot(Root);
