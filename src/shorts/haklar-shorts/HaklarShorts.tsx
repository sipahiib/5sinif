import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {GifCharacter} from '../GifCharacter';
import timing from './haklar_shorts_timings.json';

const palette = {
  navy: '#173B66',
  blue: '#2D78BE',
  red: '#C84F5A',
  amber: '#F4B83E',
  mint: '#2EA77C',
  ink: '#17283A',
  paleBlue: '#EDF6FD',
  paleRed: '#FFF0F0',
};

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const sec = (value: number, fps: number) => Math.round(value * fps);

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background: 'linear-gradient(160deg, #EAF5FF 0%, #FFFFFF 48%, #FFF0ED 100%)', overflow: 'hidden', fontFamily: 'Trebuchet MS, Arial, sans-serif'}}>
    <div style={{position: 'absolute', left: -380, top: 340 + Math.sin(frame / 28) * 18, width: 760, height: 760, borderRadius: '50%', background: 'rgba(45,120,190,0.075)'}}/>
    <div style={{position: 'absolute', right: -370, top: 10 + Math.cos(frame / 33) * 16, width: 690, height: 690, borderRadius: '50%', background: 'rgba(200,79,90,0.07)'}}/>
    {Array.from({length: 11}, (_, i) => <div key={i} style={{position: 'absolute', left: 50 + (i * 149) % 930, top: 120 + (i * 223) % 1550, width: 10 + (i % 3) * 6, height: 10 + (i % 3) * 6, borderRadius: i % 2 ? 4 : '50%', background: i % 3 === 0 ? 'rgba(244,184,62,0.35)' : i % 3 === 1 ? 'rgba(45,120,190,0.20)' : 'rgba(200,79,90,0.18)', transform: `translateY(${Math.sin(frame / 15 + i) * 14}px) rotate(${frame * (i % 2 ? 0.42 : -0.28)}deg)`}}/>)}
  </AbsoluteFill>;
};

const Header: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [0, 18], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  return <div style={{position: 'absolute', left: 56, right: 56, top: 62, display: 'flex', alignItems: 'center', gap: 15, transform: `translateY(${(1 - enter) * -38}px)`, opacity: enter}}>
    {[['5. SINIF', palette.navy], ['SOSYAL BİLGİSİ', palette.red]].map(([label, color]) => <div key={label} style={{padding: '14px 22px', borderRadius: 999, background: color, color: '#FFFFFF', fontSize: 26, fontWeight: 950, letterSpacing: 1, boxShadow: '0 10px 27px rgba(23,59,102,0.17)'}}>{label}</div>)}
    <div style={{height: 4, flex: 1, borderRadius: 99, background: 'linear-gradient(90deg, #BCD8F0, transparent)'}}/>
  </div>;
};

const QuestionCard: React.FC<{waiting: boolean}> = ({waiting}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 3, fps, config: {damping: 14, stiffness: 105}});
  const pulse = waiting ? 1 + Math.sin(frame / 7) * 0.025 : 1;
  return <div style={{position: 'absolute', left: 62, right: 62, top: 164, height: 366, borderRadius: 42, padding: '36px 39px', background: '#FFFFFF', border: '4px solid #D2E4F4', boxShadow: '0 28px 72px rgba(23,59,102,0.16)', transform: `translateY(${(1 - enter) * 52}px) scale(${0.95 + enter * 0.05})`, opacity: enter, overflow: 'hidden'}}>
    <div style={{position: 'absolute', right: -55, top: -70, width: 245, height: 245, borderRadius: '50%', background: 'rgba(244,184,62,0.17)'}}/>
    <div style={{display: 'flex', alignItems: 'center', gap: 23}}>
      <div style={{width: 94, height: 94, flex: '0 0 94px', borderRadius: 29, background: palette.amber, color: palette.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 61, fontWeight: 950, transform: `scale(${pulse}) rotate(${Math.sin(frame / 12) * 2}deg)`, boxShadow: '0 13px 30px rgba(244,184,62,0.3)'}}>?</div>
      <div><div style={{color: palette.red, fontSize: 25, fontWeight: 950, letterSpacing: 2}}>HIZLI SORU</div><div style={{color: palette.ink, fontSize: 43, lineHeight: 1.14, fontWeight: 950, marginTop: 10}}>Bu hakkı hangi sorumluluklarımız korur?</div></div>
    </div>
    <div style={{position: 'absolute', left: 39, bottom: 28, padding: '12px 20px', borderRadius: 16, background: palette.paleBlue, color: palette.navy, fontSize: 24, fontWeight: 900}}>GÜVENLİ OKUL = HEPİMİZİN HAKKI</div>
  </div>;
};

const BalanceDiagram: React.FC<{reveal: boolean}> = ({reveal}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const base = spring({frame: frame - 10, fps, config: {damping: 14, stiffness: 100}});
  const answer = spring({frame: frame - sec(timing.answer_speech_start, fps), fps, config: {damping: 12, stiffness: 125}});
  const tilt = Math.sin(frame / 22) * 2;
  const duties = [
    ['KURALLARA UY', '✓', palette.blue],
    ['HAKLARA SAYGI', '♥', palette.red],
    ['ARAÇLARI KORU', '◆', palette.mint],
  ];
  return <div style={{position: 'absolute', left: 62, right: 62, top: 570, height: 670, transform: `translateY(${(1 - base) * 45}px)`, opacity: base}}>
    <svg viewBox="0 0 956 670" width="956" height="670" style={{position: 'absolute', inset: 0}}>
      <g transform={`rotate(${tilt} 478 210)`}>
        <path d="M180 220 H776" stroke={palette.navy} strokeWidth="20" strokeLinecap="round"/>
        <path d="M238 225 L160 405 M718 225 L796 405" stroke={palette.navy} strokeWidth="7"/>
        <path d="M85 405 Q160 495 235 405Z" fill={palette.paleBlue} stroke={palette.blue} strokeWidth="8"/>
        <path d="M721 405 Q796 495 871 405Z" fill={palette.paleRed} stroke={palette.red} strokeWidth="8"/>
        <text x="160" y="397" textAnchor="middle" fill={palette.blue} fontSize="34" fontWeight="950">HAK</text>
        <text x="796" y="397" textAnchor="middle" fill={palette.red} fontSize="29" fontWeight="950">SORUMLULUK</text>
      </g>
      <path d="M478 105 V500" stroke={palette.navy} strokeWidth="24" strokeLinecap="round"/><circle cx="478" cy="210" r="35" fill={palette.amber} stroke="#FFFFFF" strokeWidth="9"/><path d="M360 520 H596" stroke={palette.navy} strokeWidth="30" strokeLinecap="round"/>
    </svg>
    {reveal && <div style={{position: 'absolute', left: 40, right: 40, bottom: 0, height: 262, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, transform: `translateY(${(1 - answer) * 65}px)`, opacity: answer}}>
      {duties.map(([label, icon, color], i) => <div key={label} style={{borderRadius: 30, background: '#FFFFFF', border: `5px solid ${color}`, boxShadow: '0 20px 45px rgba(23,59,102,0.15)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 15, transform: `translateY(${Math.sin(frame / 14 + i) * 5}px)`}}><div style={{width: 74, height: 74, borderRadius: 22, background: color, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 42, fontWeight: 950}}>{icon}</div><div style={{fontSize: 25, lineHeight: 1.15, textAlign: 'center', color: palette.ink, fontWeight: 950}}>{label}</div></div>)}
    </div>}
  </div>;
};

const Countdown: React.FC<{start: number; end: number}> = ({start, end}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [start, end], [0, 1], clamp);
  const remaining = Math.max(1, Math.ceil(5 - progress * 5));
  const circumference = 2 * Math.PI * 86;
  return <div style={{position: 'absolute', left: 365, top: 1260, width: 350, height: 350, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 25px 65px rgba(23,59,102,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 25, transform: `scale(${1 + Math.sin(frame / 5) * 0.025})`}}>
    <svg width="270" height="270" viewBox="0 0 220 220" style={{position: 'absolute', transform: 'rotate(-90deg)'}}><circle cx="110" cy="110" r="86" fill="none" stroke="#E5EDF4" strokeWidth="16"/><circle cx="110" cy="110" r="86" fill="none" stroke={palette.amber} strokeWidth="16" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * progress}/></svg>
    <div style={{textAlign: 'center'}}><div style={{fontSize: 108, lineHeight: 0.88, color: palette.navy, fontWeight: 950}}>{remaining}</div><div style={{fontSize: 22, color: palette.red, fontWeight: 950, letterSpacing: 2, marginTop: 16}}>DÜŞÜN!</div></div>
  </div>;
};

const AnswerBanner: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - sec(timing.answer_speech_start, fps);
  const enter = spring({frame: local, fps, config: {damping: 12, stiffness: 120}});
  return <div style={{position: 'absolute', left: 60, top: 1242, width: 650, minHeight: 350, borderRadius: 40, background: 'linear-gradient(145deg, #173B66, #286BA9)', color: '#FFFFFF', boxShadow: '0 30px 75px rgba(23,59,102,0.28)', padding: '36px 37px', transform: `translateX(${(1 - enter) * -90}px) scale(${0.95 + enter * 0.05})`, opacity: enter, zIndex: 30}}>
    <div style={{color: '#F8D069', fontSize: 27, fontWeight: 950, letterSpacing: 2}}>DOĞRU CEVAP</div><div style={{fontSize: 40, lineHeight: 1.18, fontWeight: 950, marginTop: 17}}>Kurallara uy, haklara saygı duy, okul araçlarını koru!</div>
  </div>;
};

const CTA: React.FC<{start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < start) return null;
  const enter = spring({frame: frame - start, fps, config: {damping: 12, stiffness: 126}});
  const like = spring({frame: frame - start - 6, fps, config: {damping: 10, stiffness: 150}});
  const sub = spring({frame: frame - start - 12, fps, config: {damping: 10, stiffness: 150}});
  const shine = interpolate((frame - start) % 55, [0, 55], [-100, 650]);
  return <div style={{position: 'absolute', left: 48, right: 48, top: 545, height: 590, borderRadius: 52, background: '#FFFFFF', border: `6px solid ${palette.red}`, boxShadow: '0 34px 100px rgba(23,59,102,0.25)', padding: '52px 44px', transform: `translateY(${(1 - enter) * 100}px) scale(${0.94 + enter * 0.06})`, opacity: enter, zIndex: 80}}>
    <div style={{color: palette.red, fontSize: 29, fontWeight: 950, letterSpacing: 2}}>CEVABI BİLDİN Mİ?</div><div style={{fontSize: 62, lineHeight: 1.07, color: palette.navy, fontWeight: 950, marginTop: 23}}>YENİ DERSLERDE<br/>GÖRÜŞELİM!</div>
    <div style={{display: 'flex', gap: 18, marginTop: 48}}>
      {[
        ['♥', 'BEĞEN', palette.red, like, 358],
        ['▶', 'ABONE OL', palette.blue, sub, 430],
      ].map(([icon, label, color, scale, width]) => <div key={String(label)} style={{position: 'relative', overflow: 'hidden', width: Number(width), height: 112, borderRadius: 28, background: String(color), color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 17, fontSize: 35, fontWeight: 950, boxShadow: '0 18px 42px rgba(23,59,102,0.22)', transform: `scale(${Number(scale)})`}}><span style={{fontSize: 43}}>{String(icon)}</span>{String(label)}<div style={{position: 'absolute', left: shine, top: -30, width: 42, height: 180, background: 'rgba(255,255,255,0.25)', transform: 'rotate(20deg)'}}/></div>)}
    </div>
  </div>;
};

export const HaklarShorts: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const qAudio = sec(timing.question_start, fps);
  const qStart = sec(timing.question_speech_start, fps);
  const qEnd = sec(timing.question_end, fps);
  const aAudio = sec(timing.answer_start, fps);
  const aStart = sec(timing.answer_speech_start, fps);
  const aEnd = sec(timing.answer_end, fps);
  const cAudio = sec(timing.cta_start, fps);
  const cStart = sec(timing.cta_speech_start, fps);
  const cEnd = sec(timing.cta_end, fps);
  const totalFrames = Math.ceil(timing.total_sec * fps);
  const ctaVisualStart = totalFrames - sec(5, fps);
  const waiting = frame >= qEnd && frame < aStart;
  const answering = frame >= aStart && frame < ctaVisualStart;
  const cta = frame >= ctaVisualStart;
  const talking = (frame >= qStart && frame < qEnd) || (frame >= aStart && frame < aEnd) || (frame >= cStart && frame < cEnd);

  return <AbsoluteFill style={{fontFamily: 'Trebuchet MS, Arial, sans-serif', color: palette.ink}}>
    <Background/><Header/>
    {!cta && <><QuestionCard waiting={waiting}/><BalanceDiagram reveal={answering}/></>}
    {waiting && <Countdown start={qEnd} end={aStart}/>} {answering && <AnswerBanner/>}<CTA start={ctaVisualStart}/>
    <GifCharacter name="filiz" x={905} y={1495} scale={2.12} animate={talking}/>
    <div style={{position: 'absolute', right: 35, top: 1785, width: 288, height: 58, borderRadius: 18, background: talking ? palette.red : '#718093', color: '#FFFFFF', border: '3px solid #FFFFFF', boxShadow: '0 10px 28px rgba(23,59,102,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, zIndex: 100, fontSize: 25, fontWeight: 950}}>{talking && <span style={{width: 11, height: 11, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 0 0 6px rgba(255,255,255,0.2)'}}/>} FİLİZ</div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 34, background: `linear-gradient(90deg, ${palette.navy}, ${palette.blue} 50%, ${palette.red})`, zIndex: 140}}/>
    <Sequence from={qAudio}><Audio src={staticFile('audio/sosyal/haklar_shorts/question.mp3')}/></Sequence>
    <Sequence from={aAudio}><Audio src={staticFile('audio/sosyal/haklar_shorts/answer.mp3')}/></Sequence>
    <Sequence from={cAudio}><Audio src={staticFile('audio/sosyal/haklar_shorts/cta.mp3')}/></Sequence>
  </AbsoluteFill>;
};

export const HaklarShortsConfig = {
  id: 'HaklarShorts',
  fps: timing.fps,
  width: 1080,
  height: 1920,
  durationInFrames: Math.ceil(timing.total_sec * timing.fps),
};
