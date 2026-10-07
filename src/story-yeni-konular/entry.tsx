import React from 'react';
import {AbsoluteFill,Audio,Composition,Folder,registerRoot,Sequence,staticFile} from 'remotion';
import {Opening} from './Opening';import {Force} from './Force';import {Angles} from './Angles';import {Culture} from './Culture';import {Words} from './Words';import {Closing} from './Closing';
import t from './timeline.json';
export const NewTopicsStory:React.FC=()=> <AbsoluteFill style={{background:'#fff'}}>
<Sequence name="Yeni konular eklendi" from={t.scenes[0].from} durationInFrames={t.scenes[0].frames}><Opening/></Sequence>
<Sequence name="Kuvvet" from={t.scenes[1].from} durationInFrames={t.scenes[1].frames}><Force/></Sequence>
<Sequence name="Açılar" from={t.scenes[2].from} durationInFrames={t.scenes[2].frames}><Angles/></Sequence>
<Sequence name="Kültürel özellikler" from={t.scenes[3].from} durationInFrames={t.scenes[3].frames}><Culture/></Sequence>
<Sequence name="Somut soyut ifadeler" from={t.scenes[4].from} durationInFrames={t.scenes[4].frames}><Words/></Sequence>
<Sequence name="YouTube kapanışı" from={t.scenes[5].from} durationInFrames={t.scenes[5].frames}><Closing/></Sequence>
<Audio src={staticFile('audio/promos/story-yeni-konular/music-v2.wav')} volume={.8}/>
</AbsoluteFill>;
const Root=()=> <><Composition id="YeniKonularStory" component={NewTopicsStory} width={720} height={1280} fps={30} durationInFrames={t.durationInFrames}/><Folder name="Yeni-Konular-Sahneler">
<Composition id="YeniOpening" component={Opening} width={720} height={1280} fps={30} durationInFrames={t.scenes[0].frames}/>
<Composition id="YeniForce" component={Force} width={720} height={1280} fps={30} durationInFrames={t.scenes[1].frames}/>
<Composition id="YeniAngles" component={Angles} width={720} height={1280} fps={30} durationInFrames={t.scenes[2].frames}/>
<Composition id="YeniCulture" component={Culture} width={720} height={1280} fps={30} durationInFrames={t.scenes[3].frames}/>
<Composition id="YeniWords" component={Words} width={720} height={1280} fps={30} durationInFrames={t.scenes[4].frames}/>
<Composition id="YeniClosing" component={Closing} width={720} height={1280} fps={30} durationInFrames={t.scenes[5].frames}/>
</Folder></>;registerRoot(Root);
