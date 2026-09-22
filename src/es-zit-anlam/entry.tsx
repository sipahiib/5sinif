import React from "react";
import {Composition,Still,registerRoot} from "remotion";
import {KurzCover} from "../components/KurzCover";
import {Kurz,Main,kurzDuration,mainDuration} from "./Video";
const Root=()=> <>
  <Composition id="EsZitAnlam" component={Main} width={1920} height={1080} fps={30} durationInFrames={mainDuration()}/>
  <Composition id="EsZitAnlamKurz" component={Kurz} width={1920} height={1080} fps={30} durationInFrames={kurzDuration()}/>
  <Still id="EsZitAnlamKurzCover" component={KurzCover} defaultProps={{subject:"TÜRKÇE",title:"EŞ VE ZIT ANLAMLI SÖZCÜKLER",accent:"#6ce5d0",secondary:"#7257e8"}} width={1280} height={720}/>
</>;
registerRoot(Root);
