import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Minecraftfiliz, Minecraftibrahim} from './MinecraftCharacter';
import {Lesson, LessonScene} from './lesson-types';

const Scene: React.FC<{lesson: Lesson; scene: LessonScene}> = ({lesson, scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const duration = scene.totalSec ?? 1;
  const split = Math.min(scene.splitSec ?? duration / 2, duration);
  const splitFrame = Math.round(split * fps);
  const firstActive = frame < splitFrame;
  const entrance = spring({frame, fps, config: {damping: 16, stiffness: 100}});
  const filizTalking = scene.firstSpeaker === 'filiz' ? firstActive : !firstActive;
  const ibrahimTalking = scene.firstSpeaker === 'ibrahim' ? firstActive : !firstActive;
  const imageScale = interpolate(frame, [0, duration * fps], [1.03, 1.08], {extrapolateRight: 'clamp'});
  const imagePath = `${lesson.imageRoot}/${scene.image}`;
  const audioBase = `${lesson.audioRoot}/${scene.id}`;

  return <AbsoluteFill style={{background: '#EAF2F8', overflow: 'hidden', fontFamily: 'Trebuchet MS, sans-serif'}}>
    <div style={{height: 76, background: '#1E3A5F', color: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', fontWeight: 900, zIndex: 5}}>
      <span style={{fontSize: 20}}>{lesson.subject}</span><span style={{fontSize: 24}}>{scene.title}</span>
    </div>
    <div style={{position: 'absolute', inset: '92px 22px 18px', borderRadius: 20, overflow: 'hidden', background: '#F8FAFC', boxShadow: '0 8px 24px rgba(30,58,95,0.18)'}}>
      <Img src={staticFile(imagePath)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${imageScale})`, opacity: 0.14}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(248,250,252,0.98) 0%, rgba(248,250,252,0.91) 68%, rgba(248,250,252,0.62) 100%)'}} />
    </div>
    <div style={{position: 'absolute', left: 205, right: 250, top: 104, bottom: 74, zIndex: 2}}>
      <div style={{width: 338, transform: `translateY(${(1 - entrance) * 20}px) scale(${0.97 + entrance * 0.03})`, background: 'rgba(255,255,255,0.97)', border: '3px solid #2563EB', borderRadius: 16, padding: '14px 16px', boxShadow: '0 12px 28px rgba(30,58,95,0.14)'}}>
        <div style={{fontSize: 21, fontWeight: 900, color: '#1E3A5F', marginBottom: 9}}>{scene.focus}</div>
        <div style={{display: 'grid', gap: 6}}>{scene.points.map((point, index) => <div key={`${scene.id}-${index}`} style={{fontSize: 14, lineHeight: 1.28, fontWeight: 800, color: '#172033', background: index % 2 === 0 ? '#EFF6FF' : '#F0FDFA', borderLeft: `5px solid ${index % 2 === 0 ? '#2563EB' : '#0D9488'}`, padding: '6px 7px'}}>{point}</div>)}</div>
      </div>
    </div>
    <Minecraftfiliz x={112} y={150} scale={0.78} isTalking={filizTalking} />
    <Minecraftibrahim x={848} y={150} scale={0.78} flip isTalking={ibrahimTalking} />
    <div style={{position: 'absolute', left: 57, top: 394, minWidth: 110, textAlign: 'center', background: filizTalking ? '#2563EB' : '#334155', color: '#FFFFFF', padding: '6px 12px', borderRadius: 9, border: '2px solid #FFFFFF', fontWeight: 900, zIndex: 10}}>Filiz</div>
    <div style={{position: 'absolute', right: 57, top: 394, minWidth: 110, textAlign: 'center', background: ibrahimTalking ? '#0D9488' : '#334155', color: '#FFFFFF', padding: '6px 12px', borderRadius: 9, border: '2px solid #FFFFFF', fontWeight: 900, zIndex: 10}}>İbrahim</div>
    {scene.dialogue && <><Audio src={staticFile(`${audioBase}_1.mp3`)} /><Sequence from={splitFrame}><Audio src={staticFile(`${audioBase}_2.mp3`)} /></Sequence></>}
  </AbsoluteFill>;
};

export const LessonVideo: React.FC<{lesson: Lesson}> = ({lesson}) => {
  const {fps} = useVideoConfig();
  let start = 0;
  return <AbsoluteFill>{lesson.scenes.map((scene) => {
    const duration = Math.round((scene.totalSec ?? 1) * fps);
    const sequence = <Sequence key={scene.id} from={start} durationInFrames={duration}><Scene lesson={lesson} scene={scene} /></Sequence>;
    start += duration;
    return sequence;
  })}</AbsoluteFill>;
};