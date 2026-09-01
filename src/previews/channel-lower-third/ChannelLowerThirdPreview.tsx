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
  paleBlue: '#EAF4FF',
  red: '#E94F5F',
  redDark: '#CF3345',
  ink: '#26394D',
  muted: '#718399',
  line: '#D7E4F0',
};

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const YouTubeMark: React.FC = () => (
  <div style={{width: 54, height: 54, borderRadius: 17, background: `linear-gradient(145deg, ${C.red}, ${C.redDark})`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 11px 24px rgba(207,51,69,.28)', flex: '0 0 auto'}}>
    <svg width="29" height="22" viewBox="0 0 29 22" aria-hidden="true">
      <rect x=".5" y=".5" width="28" height="21" rx="6.8" fill="#FFFFFF"/>
      <path d="m12 6.6 7.2 4.4-7.2 4.4Z" fill={C.red}/>
    </svg>
  </div>
);

const Cursor: React.FC<{x: number; y: number; pressed: boolean; opacity: number}> = ({x, y, pressed, opacity}) => (
  <div style={{position: 'absolute', left: x, top: y, opacity, transform: `scale(${pressed ? .86 : 1})`, transformOrigin: '2px 2px', filter: 'drop-shadow(0 5px 5px rgba(18,44,72,.3))', zIndex: 90}}>
    <svg width="31" height="39" viewBox="0 0 34 42">
      <path d="M3 2.5 29 25l-12.2 1.4-6.5 11.1Z" fill="#FFFFFF" stroke={C.navy} strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  </div>
);

const ClickBurst: React.FC<{start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + 18], [0, 1], clamp);
  if (frame < start || frame > start + 20) return null;
  return <>
    {Array.from({length: 9}).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 9;
      const distance = 12 + t * (25 + (i % 2) * 5);
      return <div key={i} style={{position: 'absolute', left: 754 + Math.cos(angle) * distance, top: 460 + Math.sin(angle) * distance, width: i % 2 ? 5 : 7, height: i % 2 ? 5 : 7, borderRadius: i % 3 ? '50%' : 2, background: i % 3 === 0 ? '#F7B84B' : C.red, opacity: 1 - t, transform: `rotate(${i * 31 + t * 120}deg)`, zIndex: 89}}/>;
    })}
  </>;
};

const LessonBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const card = spring({frame: frame - 3, fps, config: {damping: 17, stiffness: 95}});
  const lineDraw = interpolate(frame, [12, 58], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const dotPulse = 1 + Math.sin(frame / 10) * .08;
  return <>
    <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 62% 25%, #FFFFFF 0, #F1F7FD 46%, #DEEAF6 100%)'}}/>
    <div style={{position: 'absolute', inset: 0, opacity: .28, backgroundImage: 'linear-gradient(rgba(45,115,199,.17) 1px, transparent 1px), linear-gradient(90deg, rgba(45,115,199,.17) 1px, transparent 1px)', backgroundSize: '36px 36px', maskImage: 'linear-gradient(to bottom, black, transparent 88%)'}}/>
    <div style={{position: 'absolute', left: -95, top: -135, width: 350, height: 350, borderRadius: '50%', border: '70px solid rgba(233,79,95,.07)'}}/>
    <div style={{position: 'absolute', right: -120, bottom: -175, width: 400, height: 400, borderRadius: '50%', border: '80px solid rgba(45,115,199,.08)'}}/>

    <div style={{position: 'absolute', left: 36, right: 36, top: 24, height: 55, borderRadius: 19, background: 'rgba(255,255,255,.94)', border: '2px solid #FFFFFF', boxShadow: '0 12px 28px rgba(23,59,102,.11)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 13}}>
      <div style={{width: 35, height: 35, borderRadius: 12, background: C.paleBlue, color: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 950}}>∞</div>
      <div>
        <div style={{fontSize: 10, color: C.red, fontWeight: 950, letterSpacing: 1.5}}>MATEMATİK</div>
        <div style={{fontSize: 19, color: C.navy, fontWeight: 950}}>Doğru ve Temel Özellikleri</div>
      </div>
      <div style={{marginLeft: 'auto', padding: '7px 12px', borderRadius: 12, background: '#FFF4F5', color: C.redDark, fontSize: 11, fontWeight: 950, letterSpacing: .7}}>ÖRNEK DERS SAHNESİ</div>
    </div>

    <div style={{position: 'absolute', left: 194, top: 101, width: 714, height: 300, borderRadius: 27, background: 'rgba(255,255,255,.96)', border: `2px solid ${C.line}`, boxShadow: '0 20px 44px rgba(23,59,102,.13)', transform: `translateY(${(1-card)*15}px) scale(${.98 + card*.02})`, opacity: card, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -45, top: -65, width: 190, height: 190, borderRadius: '50%', background: 'rgba(45,115,199,.055)'}}/>
      <div style={{position: 'absolute', left: 36, top: 34, color: C.red, fontSize: 11, fontWeight: 950, letterSpacing: 1.4}}>TEMEL BİLGİ</div>
      <div style={{position: 'absolute', left: 36, top: 58, color: C.navy, fontSize: 28, fontWeight: 950}}>Doğru iki yönde sonsuza uzanır.</div>
      <div style={{position: 'absolute', left: 36, top: 105, right: 36, height: 1, background: C.line}}/>
      <div style={{position: 'absolute', left: 86, top: 179, width: 530, height: 6, borderRadius: 3, background: '#D9E5F1'}}>
        <div style={{height: '100%', width: `${lineDraw*100}%`, borderRadius: 3, background: `linear-gradient(90deg, ${C.blue}, ${C.red})`, boxShadow: '0 5px 15px rgba(45,115,199,.22)'}}/>
        <div style={{position: 'absolute', left: -25, top: -10, width: 0, height: 0, borderTop: '13px solid transparent', borderBottom: '13px solid transparent', borderRight: `25px solid ${C.blue}`}}/>
        <div style={{position: 'absolute', right: -25, top: -10, width: 0, height: 0, borderTop: '13px solid transparent', borderBottom: '13px solid transparent', borderLeft: `25px solid ${C.red}`}}/>
        <div style={{position: 'absolute', left: '49%', top: -8, width: 22, height: 22, borderRadius: '50%', background: '#FFFFFF', border: `5px solid ${C.navy}`, transform: `scale(${dotPulse})`, boxShadow: '0 6px 13px rgba(23,59,102,.2)'}}/>
      </div>
      <div style={{position: 'absolute', left: 256, top: 225, width: 200, height: 35, borderRadius: 17, background: C.paleBlue, color: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 950}}>UÇ NOKTASI YOKTUR</div>
    </div>

    <GifCharacter name="filiz" x={106} y={111} scale={1.06} animate={false}/>
    <div style={{position: 'absolute', left: 43, top: 406, width: 128, height: 34, borderRadius: 12, background: '#738399', border: '3px solid #FFFFFF', boxShadow: '0 6px 15px rgba(23,59,102,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: 14, fontWeight: 950}}>Filiz</div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 14, background: `linear-gradient(90deg, ${C.navy}, ${C.blue} 52%, ${C.red})`}}/>
  </>;
};

export const ChannelLowerThird: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const start = 30;
  const exitStart = 158;
  const enter = spring({frame: frame - start, fps, config: {damping: 15, stiffness: 125, mass: .8}});
  const exit = interpolate(frame, [exitStart, 180], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const visible = frame >= start && frame <= 182;
  const reveal = interpolate(frame, [start + 6, start + 27], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const buttonIn = spring({frame: frame - start - 19, fps, config: {damping: 13, stiffness: 150}});
  const buttonClicked = frame >= 119;
  const buttonBounce = spring({frame: frame - 118, fps, config: {damping: 7, stiffness: 220}});
  const cursorOpacity = interpolate(frame, [82, 94, 137, 149], [0, 1, 1, 0], clamp);
  const cursorX = interpolate(frame, [82, 111, 137], [905, 744, 744], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const cursorY = interpolate(frame, [82, 111, 137], [520, 456, 456], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const pressed = frame >= 114 && frame <= 120;
  const shimmer = interpolate(frame, [43, 108], [-90, 620], clamp);
  if (!visible) return null;

  return <>
    <div style={{position: 'absolute', left: 213, bottom: 26, width: 674, height: 91, borderRadius: 28, background: 'rgba(255,255,255,.96)', border: '2px solid rgba(255,255,255,.98)', boxShadow: '0 18px 42px rgba(23,59,102,.23), inset 0 0 0 1px rgba(45,115,199,.11)', display: 'flex', alignItems: 'center', padding: '0 13px', gap: 13, overflow: 'hidden', opacity: enter*(1-exit), transform: `translateX(${(1-enter)*85 + exit*95}px) translateY(${(1-enter)*18 + exit*18}px) scale(${.96 + enter*.04 - exit*.025})`, transformOrigin: '90% 50%', zIndex: 70}}>
      <div style={{position: 'absolute', left: -70, top: -105, width: 240, height: 240, borderRadius: '50%', background: 'rgba(233,79,95,.055)'}}/>
      <div style={{position: 'absolute', left: shimmer, top: -40, width: 60, height: 180, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.85), transparent)', transform: 'rotate(18deg)', opacity: .75}}/>
      <div style={{transform: `scale(${.9 + enter*.1})`}}><YouTubeMark/></div>
      <div style={{width: 318, opacity: reveal, transform: `translateX(${(1-reveal)*19}px)`}}>
        <div style={{fontSize: 17, color: C.navy, fontWeight: 950, letterSpacing: .5}}>DERSKUTUSU32</div>
        <div style={{marginTop: 4, fontSize: 14, color: C.muted, fontWeight: 800}}>youtube.com/@derskutusu32</div>
      </div>
      <div style={{marginLeft: 'auto', width: 191, height: 55, borderRadius: 18, background: buttonClicked ? C.navy : `linear-gradient(135deg, ${C.red}, ${C.redDark})`, border: '2px solid rgba(255,255,255,.65)', boxShadow: buttonClicked ? '0 10px 22px rgba(23,59,102,.25)' : '0 11px 24px rgba(207,51,69,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#FFFFFF', fontSize: 15, fontWeight: 950, letterSpacing: .25, opacity: buttonIn, transform: `scale(${buttonClicked ? .9 + buttonBounce*.1 : buttonIn})`}}>
        <span style={{fontSize: 19}}>{buttonClicked ? '✓' : '↗'}</span>{buttonClicked ? 'KANAL AÇILDI' : 'KANALA GİT'}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 5, background: '#EDF3F8'}}><div style={{height: '100%', width: `${interpolate(frame, [start, exitStart], [0, 100], clamp)}%`, background: `linear-gradient(90deg, ${C.red}, #F7B84B, ${C.blue})`}}/></div>
    </div>
    <Cursor x={cursorX} y={cursorY} pressed={pressed} opacity={cursorOpacity*(1-exit)}/>
    <ClickBurst start={118}/>
  </>;
};

export const ChannelLowerThirdPreview: React.FC = () => <AbsoluteFill style={{overflow: 'hidden', fontFamily: 'Trebuchet MS, Arial, sans-serif'}}>
  <LessonBackdrop/>
  <ChannelLowerThird/>
</AbsoluteFill>;

export const ChannelLowerThirdPreviewConfig = {
  id: 'ChannelLowerThirdPreview',
  fps: 30,
  width: 960,
  height: 540,
  durationInFrames: 210,
};
