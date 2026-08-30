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

const colors = {
  navy: '#173B66',
  blue: '#2D73C7',
  blueSoft: '#E7F1FC',
  red: '#E94F5F',
  redDark: '#CF3345',
  ink: '#20344A',
  muted: '#6E8195',
  cream: '#FFF9EF',
};

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const HeartIcon: React.FC<{filled: boolean}> = ({filled}) => (
  <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 20.2 4.1 12.7C-.7 8.2 5.8 1 12 6.3 18.2 1 24.7 8.2 19.9 12.7Z"
      fill={filled ? '#FFFFFF' : 'none'}
      stroke={filled ? '#FFFFFF' : colors.navy}
      strokeWidth="2.1"
      strokeLinejoin="round"
    />
  </svg>
);

const BellIcon: React.FC<{active: boolean}> = ({active}) => (
  <svg width="29" height="29" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.5 10.2c0-3.2 2-5.5 5.5-5.5s5.5 2.3 5.5 5.5v3.2l1.7 2.3H4.8l1.7-2.3Z" fill={active ? '#FFFFFF' : 'none'} stroke={active ? '#FFFFFF' : colors.navy} strokeWidth="1.9" strokeLinejoin="round"/>
    <path d="M9.6 18.1c.4 1.1 1.2 1.7 2.4 1.7s2-.6 2.4-1.7" fill="none" stroke={active ? '#FFFFFF' : colors.navy} strokeWidth="1.9" strokeLinecap="round"/>
  </svg>
);

const Pointer: React.FC<{x: number; y: number; pressed: boolean}> = ({x, y, pressed}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `scale(${pressed ? 0.86 : 1})`, transformOrigin: '2px 2px', zIndex: 100, filter: 'drop-shadow(0 5px 5px rgba(18,44,72,.28))'}}>
    <svg width="34" height="42" viewBox="0 0 34 42">
      <path d="M3 2.5 29 25l-12.2 1.4-6.5 11.1Z" fill="#FFFFFF" stroke="#173B66" strokeWidth="2.5" strokeLinejoin="round"/>
    </svg>
  </div>
);

const Burst: React.FC<{start: number; x: number; y: number; color: string}> = ({start, x, y, color}) => {
  const frame = useCurrentFrame();
  const t = interpolate(frame, [start, start + 20], [0, 1], clamp);
  if (frame < start || frame > start + 22) return null;
  return <>
    {Array.from({length: 10}).map((_, index) => {
      const angle = (index / 10) * Math.PI * 2;
      const distance = 16 + t * (34 + (index % 3) * 5);
      const size = index % 2 === 0 ? 7 : 5;
      return <div key={index} style={{position: 'absolute', left: x + Math.cos(angle) * distance - size / 2, top: y + Math.sin(angle) * distance - size / 2, width: size, height: size, borderRadius: index % 3 === 0 ? 2 : '50%', background: index % 4 === 0 ? '#F7B84B' : color, opacity: 1 - t, transform: `rotate(${t * 150 + index * 23}deg) scale(${1 - t * .28})`, zIndex: 90}}/>;
    })}
  </>;
};

const Orb: React.FC<{x: number; y: number; size: number; delay: number; color: string}> = ({x, y, size, delay, color}) => {
  const frame = useCurrentFrame();
  const float = Math.sin((frame + delay) / 24) * 7;
  return <div style={{position: 'absolute', left: x, top: y + float, width: size, height: size, borderRadius: '50%', background: color, opacity: .52, boxShadow: `0 10px 24px ${color}`}}/>;
};

export const CtaOptionOne: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cardIn = spring({frame, fps, config: {damping: 17, stiffness: 82, mass: .8}});
  const headingIn = spring({frame: frame - 10, fps, config: {damping: 16, stiffness: 105}});
  const controlsIn = spring({frame: frame - 31, fps, config: {damping: 13, stiffness: 125}});
  const likeClicked = frame >= 73;
  const subscribed = frame >= 114;
  const bellActive = frame >= 149;
  const likeBounce = spring({frame: frame - 72, fps, config: {damping: 7, stiffness: 230}});
  const subBounce = spring({frame: frame - 113, fps, config: {damping: 8, stiffness: 205}});
  const bellBounce = spring({frame: frame - 148, fps, config: {damping: 7, stiffness: 220}});
  const pressed = (frame >= 69 && frame <= 74) || (frame >= 110 && frame <= 115) || (frame >= 145 && frame <= 150);

  const cursorX = interpolate(frame, [42, 66, 78, 106, 119, 143, 154, 188], [760, 390, 390, 554, 554, 685, 685, 760], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const cursorY = interpolate(frame, [42, 66, 78, 106, 119, 143, 154, 188], [480, 310, 310, 310, 310, 310, 310, 475], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const ring = interpolate(frame, [148, 155, 166], [0, 1, 0], clamp);
  const shine = interpolate(frame, [33, 85], [-100, 570], clamp);
  const exitGlow = interpolate(frame, [175, 205], [0, 1], clamp);

  return <AbsoluteFill style={{fontFamily: 'Trebuchet MS, Arial, sans-serif', overflow: 'hidden', color: colors.ink, background: `radial-gradient(circle at 50% 25%, #FFFFFF 0, #F2F8FF 42%, #DCEBFA 100%)`}}>
    <div style={{position: 'absolute', inset: 0, opacity: .26, backgroundImage: 'linear-gradient(rgba(45,115,199,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(45,115,199,.18) 1px, transparent 1px)', backgroundSize: '36px 36px', maskImage: 'linear-gradient(to bottom, black, transparent 85%)'}}/>
    <div style={{position: 'absolute', left: -95, top: -120, width: 380, height: 380, borderRadius: '50%', border: '70px solid rgba(233,79,95,.08)'}}/>
    <div style={{position: 'absolute', right: -120, bottom: -190, width: 430, height: 430, borderRadius: '50%', border: '85px solid rgba(45,115,199,.09)'}}/>
    <Orb x={88} y={52} size={14} delay={0} color="#F7B84B"/><Orb x={824} y={75} size={19} delay={18} color="#E94F5F"/><Orb x={740} y={446} size={11} delay={34} color="#2D73C7"/><Orb x={163} y={454} size={9} delay={52} color="#62C4AA"/>

    <div style={{position: 'absolute', left: 184, top: 58, width: 592, height: 390, borderRadius: 35, background: 'rgba(255,255,255,.94)', border: '2px solid rgba(255,255,255,.98)', boxShadow: '0 28px 65px rgba(23,59,102,.18), inset 0 0 0 1px rgba(45,115,199,.08)', transform: `translateY(${(1-cardIn)*28}px) scale(${.94 + cardIn*.06})`, opacity: cardIn, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: -30, right: -30, top: -88, height: 180, borderRadius: '50%', background: 'linear-gradient(100deg, rgba(45,115,199,.13), rgba(233,79,95,.1))'}}/>
      <div style={{position: 'absolute', left: shine, top: -60, width: 72, height: 560, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.72), transparent)', transform: 'rotate(18deg)', opacity: .55}}/>

      <div style={{position: 'absolute', left: 0, right: 0, top: 42, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: headingIn, transform: `translateY(${(1-headingIn)*15}px)`}}>
        <div style={{height: 30, padding: '0 15px', borderRadius: 15, background: colors.blueSoft, color: colors.blue, display: 'flex', alignItems: 'center', fontSize: 12, letterSpacing: 1.6, fontWeight: 950}}>5. SINIF • YENİ NESİL DERSLER</div>
        <div style={{marginTop: 24, color: colors.navy, fontSize: 35, lineHeight: 1.05, fontWeight: 950, letterSpacing: -.7}}>Birlikte öğrenmeye devam!</div>
      </div>

      <div style={{position: 'absolute', left: 48, right: 48, top: 218, height: 83, padding: 9, borderRadius: 25, background: '#F3F7FB', border: '1px solid #E1EAF3', display: 'flex', alignItems: 'center', gap: 10, transform: `translateY(${(1-controlsIn)*18}px) scale(${.96 + controlsIn*.04})`, opacity: controlsIn}}>
        <div style={{height: 63, width: 173, borderRadius: 19, background: likeClicked ? colors.blue : '#FFFFFF', color: likeClicked ? '#FFFFFF' : colors.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: likeClicked ? `2px solid ${colors.blue}` : '2px solid #D7E2ED', boxShadow: likeClicked ? '0 11px 23px rgba(45,115,199,.27)' : '0 7px 16px rgba(23,59,102,.09)', fontSize: 17, fontWeight: 950, transform: `scale(${likeClicked ? .9 + likeBounce*.1 : 1})`}}>
          <HeartIcon filled={likeClicked}/>{likeClicked ? 'BEĞENİLDİ' : 'BEĞEN'}
        </div>
        <div style={{height: 63, flex: 1, borderRadius: 19, background: subscribed ? '#FFFFFF' : `linear-gradient(135deg, ${colors.red}, ${colors.redDark})`, color: subscribed ? colors.navy : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: subscribed ? '2px solid #D7E2ED' : '2px solid rgba(255,255,255,.55)', boxShadow: subscribed ? '0 7px 16px rgba(23,59,102,.09)' : '0 12px 24px rgba(207,51,69,.28)', fontSize: 17, fontWeight: 950, transform: `scale(${subscribed ? .9 + subBounce*.1 : 1})`}}>
          <span style={{fontSize: 21}}>{subscribed ? '✓' : '▶'}</span>{subscribed ? 'ABONE OLDUN' : 'ABONE OL'}
        </div>
        <div style={{position: 'relative', width: 63, height: 63, borderRadius: 19, background: bellActive ? colors.navy : '#FFFFFF', border: bellActive ? `2px solid ${colors.navy}` : '2px solid #D7E2ED', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: bellActive ? '0 11px 23px rgba(23,59,102,.26)' : '0 7px 16px rgba(23,59,102,.09)', transform: `scale(${bellActive ? .88 + bellBounce*.12 : 1}) rotate(${bellActive ? Math.sin((frame-148)*1.35)*(1-ring)*2.8 : 0}deg)`}}>
          <BellIcon active={bellActive}/>
          {frame >= 147 && frame <= 168 && <><div style={{position: 'absolute', inset: -10 - ring*13, borderRadius: 27, border: `3px solid rgba(45,115,199,${.58*(1-ring)})`}}/><div style={{position: 'absolute', inset: -4 - ring*8, borderRadius: 24, border: `2px solid rgba(247,184,75,${.75*(1-ring)})`}}/></>}
        </div>
      </div>

      <div style={{position: 'absolute', left: 72, right: 72, bottom: 25, display: 'flex', alignItems: 'center', gap: 14, opacity: .72 + exitGlow*.28}}>
        <div style={{height: 2, flex: 1, background: 'linear-gradient(90deg, transparent, #C7D7E7)'}}/>
        <div style={{fontSize: 12, color: colors.muted, fontWeight: 900, letterSpacing: 1.25}}>BİR SONRAKİ DERSTE GÖRÜŞÜRÜZ</div>
        <div style={{height: 2, flex: 1, background: 'linear-gradient(90deg, #C7D7E7, transparent)'}}/>
      </div>
    </div>

    <GifCharacter name="filiz" x={102} y={125} scale={1.12} animate={false}/>
    <GifCharacter name="ibrahim" x={858} y={125} scale={1.12} flip animate={false}/>

    {frame >= 42 && <Pointer x={cursorX} y={cursorY} pressed={pressed}/>} 
    <Burst start={72} x={413} y={311} color={colors.blue}/>
    <Burst start={113} x={588} y={311} color={colors.red}/>
    <Burst start={148} x={698} y={311} color="#F7B84B"/>

    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 14, background: `linear-gradient(90deg, ${colors.red}, #F7B84B 42%, ${colors.blue} 72%, ${colors.navy})`}}/>
  </AbsoluteFill>;
};

export const CtaOptionOneConfig = {
  id: 'CtaOptionOnePreview',
  fps: 30,
  width: 960,
  height: 540,
  durationInFrames: 210,
};
