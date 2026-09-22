import React from "react";
import { Composition, Still, registerRoot } from "remotion";
import { KurzCover } from "../components/KurzCover";
import { Kurz, Main, Short, kurzDuration, mainDuration } from "./Video";
import timings from "./timings.json";
const Root = () => (
  <>
    <Composition
      id="GecisParagraf"
      component={Main}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={mainDuration()}
    />
    <Composition
      id="GecisParagrafKurz"
      component={Kurz}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={kurzDuration()}
    />
    <Still
      id="GecisParagrafKurzCover"
      component={KurzCover}
      defaultProps={{subject: "TÜRKÇE", title: "GEÇİŞ VE BAĞLANTI İFADELERİ", accent: "#70e0d2", secondary: "#ff7d79"}}
      width={1280}
      height={720}
    />
    {timings.shorts.map((item, index) => (
      <Composition
        key={index}
        id={`GecisParagrafShorts${index + 1}`}
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
