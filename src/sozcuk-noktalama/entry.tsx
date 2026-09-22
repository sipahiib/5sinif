import React from "react";
import { Composition, Still, registerRoot } from "remotion";
import { KurzCover } from "../components/KurzCover";
import { Main, Kurz, Short, mainDuration, kurzDuration } from "./Video";
import timings from "./timings.json";
const Root = () => (
  <>
    <Composition
      id="SozcukNoktalama"
      component={Main}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={mainDuration()}
    />
    <Composition
      id="SozcukNoktalamaKurz"
      component={Kurz}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={kurzDuration()}
    />
    <Still
      id="SozcukNoktalamaKurzCover"
      component={KurzCover}
      defaultProps={{subject: "TÜRKÇE", title: "SÖZCÜK VE NOKTALAMA", accent: "#ffb36b", secondary: "#7257e8"}}
      width={1280}
      height={720}
    />
    {timings.shorts.map((t, index) => (
      <Composition
        key={index}
        id={`SozcukNoktalamaShorts${index + 1}`}
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
