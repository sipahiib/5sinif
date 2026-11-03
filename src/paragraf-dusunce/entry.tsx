import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Main,Kurz,Short,mainLength,kurzLength,shortLength} from './Video';
const Root:React.FC=()=> <><Composition id="ParagrafDusunceMain" component={Main} width={1280} height={720} fps={30} durationInFrames={mainLength}/><Composition id="ParagrafDusunceKurz" component={Kurz} width={1280} height={720} fps={30} durationInFrames={kurzLength}/><Composition id="ParagrafDusunceShort" component={Short} width={720} height={1280} fps={30} durationInFrames={shortLength}/></>;
registerRoot(Root);
