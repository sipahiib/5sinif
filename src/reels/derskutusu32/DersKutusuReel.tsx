import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {GifCharacter} from '../../GifCharacter';

const C = {
  navy: '#173B66',
  blue: '#2D73C7',
  red: '#E94F5F',
  redDark: '#CF3345',
  amber: '#F7B84B',
  mint: '#62C4AA',
  cream: '#FFF9EF',
};

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const YouTubeMark: React.FC<{scale: number}> = ({scale}) => (
  <div style={{width: 186, height: 132, borderRadius: 42, background: `linear-gradient(145deg, ${C.red}, ${C.redDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${scale})`, boxShadow: '0 30px 60px rgba(207,51,69,.3), inset 0 0 0 4px rgba(255,255,255,.22)'}}>
    <svg width="92" height="72" viewBox="0 0 92 72" aria-hidden="true">
      <rect x="1" y="1" width="90" height="70" rx="22" fill="#FFFFFF"/>
      <path d="m38 21 31 15-31 15Z" fill={C.red}/>
    </svg>
  </div>
);

const Cursor: React.FC<{x: number; y: number; pressed: boolean; opacity: number}> = ({x, y, pressed, opacity}) => (
  <div style={{position: 'absolute', left: x, top: y, opacity, transform: `scale(${pressed ? .84 : 1})`, transformOrigin: '3px 3px', filter: 'drop-shadow(0 9px 8px rgba(18,44,72,.28))', zIndex: 100}}>
    <svg width="62" height="76" viewBox="0 0 34 42">
      <path d="M3 2.5 29 25l-12.2 1.4-6.5 11.1Z" fill="#FFFFFF" stroke={C.navy} strokeWidth="2.3" strokeLinejoin="round"/>
    </svg>
  </div>
);

const ClickBurst: React.FC<{start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + 26], [0, 1], clamp);
  if (frame < start || frame > start + 28) return null;
  return <>
    {Array.from({length: 14}).map((_, index) => {
      const angle = (index / 14) * Math.PI * 2;
      const distance = 32 + t * (70 + (index % 3) * 9);
      const size = index % 2 === 0 ? 13 : 9;
      return <div key={index} style={{position: 'absolute', left: 540 + Math.cos(angle) * distance - size/2, top: 934 + Math.sin(angle) * distance - size/2, width: size, height: size, borderRadius: index % 4 === 0 ? 3 : '50%', background: index % 3 === 0 ? C.amber : index % 3 === 1 ? C.blue : C.red, opacity: 1-t, transform: `rotate(${index*29+t*170}deg) scale(${1-t*.3})`, zIndex: 92}}/>;
    })}
  </>;
};

const FloatShape: React.FC<{x: number; y: number; size: number; color: string; phase: number; square?: boolean}> = ({x, y, size, color, phase, square}) => {
  const frame = useCurrentFrame();
  const float = Math.sin(frame/22 + phase)*15;
  const rotate = frame*.25 + phase*32;
  return <div style={{position: 'absolute', left: x, top: y+float, width: size, height: size, borderRadius: square ? 9 : '50%', background: color, opacity: .5, transform: `rotate(${rotate}deg)`, boxShadow: `0 18px 34px ${color}`}}/>;
};

export const DersKutusuReel: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const card = spring({frame: frame-8, fps, config: {damping: 15, stiffness: 92, mass: .9}});
  const mark = spring({frame: frame-18, fps, config: {damping: 10, stiffness: 145, mass: .75}});
  const name = spring({frame: frame-40, fps, config: {damping: 14, stiffness: 120}});
  const follow = spring({frame: frame-70, fps, config: {damping: 13, stiffness: 125}});
  const filizIn = spring({frame, fps, config: {damping: 16, stiffness: 75}});
  const ibrahimIn = spring({frame: frame-6, fps, config: {damping: 16, stiffness: 75}});
  const clickStart = 157;
  const clicked = frame >= clickStart;
  const clickBounce = spring({frame: frame-clickStart, fps, config: {damping: 7, stiffness: 210}});
  const pulse = 1 + Math.sin(Math.max(0, frame-clickStart)/13)*.018*(clicked ? 1 : 0);
  const ring = interpolate(frame, [clickStart, clickStart+18, clickStart+42], [0, 1, 0], clamp);
  const cursorOpacity = interpolate(frame, [112, 130, 190, 210], [0, 1, 1, 0], clamp);
  const cursorX = interpolate(frame, [112, 148, 190], [950, 535, 535], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const cursorY = interpolate(frame, [112, 148, 190], [1390, 928, 928], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const pressed = frame >= 152 && frame <= 158;
  const shimmer = interpolate(frame, [38, 128], [-220, 1120], clamp);
  const glow = .72 + Math.sin(frame/18)*.12;

  return <AbsoluteFill style={{fontFamily: 'Trebuchet MS, Arial, sans-serif', overflow: 'hidden', color: C.navy, background: 'radial-gradient(circle at 50% 24%, #FFFFFF 0, #F2F8FF 46%, #DDEAF7 100%)'}}>
    <div style={{position: 'absolute', inset: 0, opacity: .27, backgroundImage: 'linear-gradient(rgba(45,115,199,.18) 2px, transparent 2px), linear-gradient(90deg, rgba(45,115,199,.18) 2px, transparent 2px)', backgroundSize: '72px 72px', maskImage: 'linear-gradient(to bottom, black, transparent 86%)'}}/>
    <div style={{position: 'absolute', left: -360, top: -330, width: 850, height: 850, borderRadius: '50%', border: '150px solid rgba(233,79,95,.075)'}}/>
    <div style={{position: 'absolute', right: -390, bottom: -460, width: 930, height: 930, borderRadius: '50%', border: '165px solid rgba(45,115,199,.085)'}}/>
    <div style={{position: 'absolute', left: -130, right: -130, top: 1125, height: 240, background: 'linear-gradient(100deg, rgba(233,79,95,.11), rgba(247,184,75,.08) 48%, rgba(45,115,199,.12))', transform: 'rotate(-5deg)', filter: 'blur(2px)'}}/>

    <FloatShape x={112} y={176} size={25} color={C.amber} phase={0}/>
    <FloatShape x={916} y={245} size={32} color={C.red} phase={1.4}/>
    <FloatShape x={90} y={1030} size={18} color={C.mint} phase={2.8} square/>
    <FloatShape x={942} y={1150} size={21} color={C.blue} phase={4.2} square/>
    <FloatShape x={172} y={1470} size={15} color={C.red} phase={5.1}/>
    <FloatShape x={865} y={1530} size={17} color={C.amber} phase={6.4}/>

    <div style={{position: 'absolute', left: 74, right: 74, top: 265, height: 830, borderRadius: 62, background: 'rgba(255,255,255,.94)', border: '4px solid rgba(255,255,255,.98)', boxShadow: '0 55px 120px rgba(23,59,102,.18), inset 0 0 0 2px rgba(45,115,199,.08)', transform: `translateY(${(1-card)*62}px) scale(${.92+card*.08})`, opacity: card, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -110, right: -110, top: -230, height: 430, borderRadius: '50%', background: 'linear-gradient(105deg, rgba(45,115,199,.14), rgba(233,79,95,.11))'}}/>
      <div style={{position: 'absolute', left: shimmer, top: -140, width: 130, height: 1150, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.82), transparent)', transform: 'rotate(17deg)', opacity: .62}}/>

      <div style={{position: 'absolute', left: 0, right: 0, top: 112, display: 'flex', justifyContent: 'center', transform: `translateY(${(1-mark)*35}px)`}}>
        <YouTubeMark scale={.75+mark*.25}/>
      </div>

      <div style={{position: 'absolute', left: 50, right: 50, top: 340, height: 170, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: name, transform: `translateY(${(1-name)*38}px) scale(${.95+name*.05})`}}>
        <div style={{fontSize: 94, lineHeight: 1, fontWeight: 950, letterSpacing: 1.5, color: C.navy, textShadow: '0 8px 20px rgba(23,59,102,.12)'}}>DERSKUTUSU32</div>
      </div>

      <div style={{position: 'absolute', left: 82, right: 82, top: 583, height: 158, borderRadius: 42, background: clicked ? C.navy : `linear-gradient(135deg, ${C.red}, ${C.redDark})`, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: clicked ? '0 28px 58px rgba(23,59,102,.3)' : '0 28px 58px rgba(207,51,69,.3)', border: '4px solid rgba(255,255,255,.62)', opacity: follow, transform: `translateY(${(1-follow)*42}px) scale(${follow*(clicked ? .9+clickBounce*.1 : 1)*pulse})`, overflow: 'hidden'}}>
        <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,${.2*ring}) 0, transparent ${22+ring*42}%)`}}/>
        <div style={{fontSize: 51, lineHeight: 1, fontWeight: 950, letterSpacing: .4}}>YouTube’da bizi takip et!</div>
      </div>
      {frame >= clickStart && frame <= clickStart+44 && <div style={{position: 'absolute', left: 154-ring*36, right: 154-ring*36, top: 655-ring*36, height: 16+ring*72, borderRadius: 50, border: `5px solid rgba(247,184,75,${.72*(1-ring)})`}}/>}
    </div>

    <div style={{position: 'absolute', left: 0, top: 0, transform: `translateX(${(1-filizIn)*-92}px) translateY(${(1-filizIn)*28}px)`}}>
      <GifCharacter name="filiz" x={220} y={1400} scale={2.35} animate={false}/>
    </div>
    <div style={{position: 'absolute', left: 0, top: 0, transform: `translateX(${(1-ibrahimIn)*92}px) translateY(${(1-ibrahimIn)*28}px)`}}>
      <GifCharacter name="ibrahim" x={860} y={1400} scale={2.35} flip animate={false}/>
    </div>

    <div style={{position: 'absolute', left: 180, right: 180, bottom: 95, height: 12, borderRadius: 6, background: `linear-gradient(90deg, transparent, rgba(233,79,95,${glow}), ${C.amber}, rgba(45,115,199,${glow}), transparent)`}}/>
    <ClickBurst start={clickStart}/>
    <Cursor x={cursorX} y={cursorY} pressed={pressed} opacity={cursorOpacity}/>
  </AbsoluteFill>;
};

export const DersKutusuReelConfig = {
  id: 'DersKutusuInstagramReel',
  fps: 30,
  width: 1080,
  height: 1920,
  durationInFrames: 300,
};
