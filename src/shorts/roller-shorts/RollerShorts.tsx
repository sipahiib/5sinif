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
import timing from './roller_shorts_timings.json';

const palette = {
  navy: '#173B66',
  blue: '#2877C7',
  red: '#D8505B',
  coral: '#F28A7E',
  amber: '#F6BC46',
  mint: '#34A985',
  ink: '#172638',
  pale: '#F4F9FE',
};

const sec = (value: number, fps: number) => Math.round(value * fps);

const Badge: React.FC<{children: React.ReactNode; color: string}> = ({children, color}) => (
  <div style={{
    padding: '14px 24px',
    borderRadius: 999,
    background: color,
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 950,
    letterSpacing: 1.5,
    boxShadow: '0 10px 28px rgba(23,59,102,0.16)',
  }}>
    {children}
  </div>
);

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(165deg, #EAF5FF 0%, #FFFFFF 46%, #FFF3EF 100%)',
      overflow: 'hidden',
      fontFamily: 'Verdana, Arial, sans-serif',
    }}>
      <div style={{position: 'absolute', width: 760, height: 760, borderRadius: '50%', left: -390, top: 420, background: 'rgba(40,119,199,0.08)', transform: `translateY(${Math.sin(frame / 28) * 18}px)`}}/>
      <div style={{position: 'absolute', width: 650, height: 650, borderRadius: '50%', right: -330, top: 40, background: 'rgba(216,80,91,0.08)', transform: `translateY(${Math.cos(frame / 34) * 16}px)`}}/>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{
          position: 'absolute',
          left: 88 + (i * 181) % 880,
          top: 160 + (i * 267) % 1500,
          width: 10 + (i % 3) * 7,
          height: 10 + (i % 3) * 7,
          borderRadius: i % 2 ? 4 : '50%',
          background: i % 2 ? 'rgba(246,188,70,0.25)' : 'rgba(40,119,199,0.18)',
          transform: `translateY(${Math.sin(frame / 15 + i) * 13}px) rotate(${frame * (i % 2 ? 0.45 : -0.3)}deg)`,
        }}/>
      ))}
    </AbsoluteFill>
  );
};

const Header: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 15, stiffness: 110}});
  return (
    <div style={{position: 'absolute', left: 62, right: 62, top: 70, display: 'flex', alignItems: 'center', gap: 18, transform: `translateY(${(1 - enter) * -36}px)`, opacity: enter}}>
      <Badge color={palette.navy}>5. SINIF</Badge>
      <Badge color={palette.red}>SOSYAL BİLGİSİ</Badge>
      <div style={{height: 4, flex: 1, borderRadius: 99, background: 'linear-gradient(90deg, #BFD9F2, rgba(191,217,242,0))'}}/>
    </div>
  );
};

const QuestionCard: React.FC<{isWaiting: boolean}> = ({isWaiting}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 3, fps, config: {damping: 14, stiffness: 105}});
  const pulse = 1 + Math.sin(frame / 8) * 0.025;
  return (
    <div style={{
      position: 'absolute',
      left: 64,
      right: 64,
      top: 170,
      height: 355,
      borderRadius: 42,
      background: '#FFFFFF',
      border: '4px solid #D4E5F5',
      boxShadow: '0 26px 70px rgba(23,59,102,0.16)',
      padding: '38px 42px',
      transform: `translateY(${(1 - enter) * 55}px) scale(${0.96 + enter * 0.04})`,
      overflow: 'hidden',
    }}>
      <div style={{position: 'absolute', right: -44, top: -55, width: 220, height: 220, borderRadius: '50%', background: palette.amber, opacity: 0.18}}/>
      <div style={{display: 'flex', alignItems: 'center', gap: 22}}>
        <div style={{width: 92, height: 92, flex: '0 0 92px', borderRadius: 28, background: palette.amber, color: palette.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, fontSize: 60, transform: `scale(${isWaiting ? pulse : 1}) rotate(${Math.sin(frame / 12) * 2}deg)`, boxShadow: '0 12px 24px rgba(246,188,70,0.30)'}}>?</div>
        <div>
          <div style={{color: palette.red, fontSize: 25, fontWeight: 950, letterSpacing: 2}}>HIZLI SORU</div>
          <div style={{color: palette.ink, fontSize: 48, lineHeight: 1.16, fontWeight: 950, marginTop: 10}}>Hasan’ın farklı gruplardaki rolleri neler?</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 42, bottom: 30, padding: '12px 22px', borderRadius: 16, background: '#EDF5FC', color: palette.navy, fontWeight: 900, fontSize: 23}}>
        ROL = GRUP İÇİNDEKİ GÖREVİMİZ
      </div>
    </div>
  );
};

type GroupCardProps = {
  label: string;
  role: string;
  icon: string;
  color: string;
  x: number;
  y: number;
  delay: number;
  revealRole: boolean;
};

const GroupCard: React.FC<GroupCardProps> = ({label, role, icon, color, x, y, delay, revealRole}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - delay, fps, config: {damping: 13, stiffness: 105}});
  const roleIn = spring({frame: frame - delay - 5, fps, config: {damping: 11, stiffness: 145}});
  const drift = Math.sin(frame / 15 + delay) * 5;
  return (
    <div style={{position: 'absolute', left: x, top: y + drift, width: 292, height: 205, transform: `translateX(${(1 - enter) * -42}px) scale(${0.91 + enter * 0.09})`, opacity: enter}}>
      <div style={{position: 'absolute', inset: 0, borderRadius: 31, background: '#FFFFFF', border: `4px solid ${color}`, boxShadow: '0 18px 42px rgba(23,59,102,0.13)', padding: '24px 22px'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
          <div style={{width: 64, height: 64, borderRadius: 20, background: color, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 35, fontWeight: 950}}>{icon}</div>
          <div style={{fontSize: 26, color: palette.ink, fontWeight: 950, lineHeight: 1.08}}>{label}</div>
        </div>
        <div style={{marginTop: 19, height: 58, borderRadius: 17, background: revealRole ? color : '#EDF2F7', color: revealRole ? '#FFFFFF' : '#7A8796', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 950, fontSize: 27, transform: revealRole ? `scale(${0.82 + roleIn * 0.18})` : undefined}}>
          {revealRole ? `✓ ${role}` : 'ROLÜ NE?'}
        </div>
      </div>
    </div>
  );
};

const RoleDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const centerIn = spring({frame: frame - 12, fps, config: {damping: 13, stiffness: 100}});
  const spin = frame * 0.22;
  const role1 = frame >= sec(timing.captions[4].start, fps);
  const role2 = frame >= sec(timing.captions[5].start, fps);
  const role3 = frame >= sec(timing.captions[6].start, fps);
  return (
    <div style={{position: 'absolute', left: 64, right: 64, top: 575, height: 585}}>
      <svg style={{position: 'absolute', inset: 0}} viewBox="0 0 952 585">
        <path d="M465 282 C370 250 335 154 292 126 M465 282 C350 310 326 422 292 458 M485 284 C590 280 625 285 661 286" fill="none" stroke="#B8CEE2" strokeWidth="7" strokeLinecap="round" strokeDasharray="14 13" strokeDashoffset={-frame * 2.3}/>
      </svg>
      <div style={{position: 'absolute', left: 362, top: 172, width: 220, height: 220, borderRadius: '50%', background: '#FFF7E6', border: `6px solid ${palette.amber}`, boxShadow: '0 20px 50px rgba(23,59,102,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${0.82 + centerIn * 0.18})`}}>
        <div style={{position: 'absolute', inset: -18, borderRadius: '50%', border: '3px dashed rgba(246,188,70,0.58)', transform: `rotate(${spin}deg)`}}/>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: 66}}>👦</div>
          <div style={{fontSize: 30, color: palette.navy, fontWeight: 950}}>HASAN</div>
        </div>
      </div>
      <GroupCard label="AİLESİ" role="ÇOCUK" icon="⌂" color={palette.red} x={0} y={15} delay={8} revealRole={role1}/>
      <GroupCard label="OKULU" role="ÖĞRENCİ" icon="✎" color={palette.blue} x={0} y={352} delay={15} revealRole={role2}/>
      <GroupCard label="HALK OYUNLARI" role="OYUNCU" icon="♫" color={palette.mint} x={660} y={184} delay={22} revealRole={role3}/>
    </div>
  );
};

const Countdown: React.FC<{progress: number}> = ({progress}) => {
  const frame = useCurrentFrame();
  const remaining = Math.max(1, Math.ceil(5 - progress * 5));
  const circumference = 2 * Math.PI * 92;
  const pop = 1 + Math.sin(frame / 4) * 0.035;
  return (
    <div style={{position: 'absolute', left: 320, top: 1185, width: 350, height: 350, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 25px 60px rgba(23,59,102,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${pop})`, zIndex: 30}}>
      <svg width="270" height="270" viewBox="0 0 220 220" style={{position: 'absolute', transform: 'rotate(-90deg)'}}>
        <circle cx="110" cy="110" r="92" fill="none" stroke="#E7EEF5" strokeWidth="15"/>
        <circle cx="110" cy="110" r="92" fill="none" stroke={palette.amber} strokeWidth="15" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * progress}/>
      </svg>
      <div style={{textAlign: 'center'}}>
        <div style={{fontSize: 112, lineHeight: 0.9, color: palette.navy, fontWeight: 950}}>{remaining}</div>
        <div style={{fontSize: 22, color: palette.red, fontWeight: 950, marginTop: 16, letterSpacing: 2}}>DÜŞÜN!</div>
      </div>
    </div>
  );
};

const AnswerBanner: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - sec(timing.answer_speech_start, fps);
  const enter = spring({frame: local, fps, config: {damping: 12, stiffness: 120}});
  return (
    <div style={{position: 'absolute', left: 72, top: 1195, width: 595, minHeight: 410, borderRadius: 38, background: 'linear-gradient(145deg, #173B66, #245F9A)', color: '#FFFFFF', boxShadow: '0 28px 70px rgba(23,59,102,0.28)', padding: '35px 34px', transform: `translateX(${(1 - enter) * -80}px) scale(${0.96 + enter * 0.04})`, opacity: enter, zIndex: 25}}>
      <div style={{fontSize: 27, color: '#F8D06A', fontWeight: 950, letterSpacing: 2}}>DOĞRU CEVAP</div>
      <div style={{fontSize: 43, lineHeight: 1.18, fontWeight: 950, marginTop: 18}}>
        Bir kişi, bulunduğu gruba göre farklı roller üstlenir.
      </div>
      <div style={{marginTop: 27, height: 5, borderRadius: 99, background: 'linear-gradient(90deg, #F6BC46, rgba(246,188,70,0.08))'}}/>
    </div>
  );
};

const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - sec(timing.cta_speech_start, fps);
  const enter = spring({frame: local, fps, config: {damping: 12, stiffness: 125}});
  const button = spring({frame: local - 8, fps, config: {damping: 9, stiffness: 155}});
  return (
    <>
      <div style={{position: 'absolute', left: 55, top: 570, width: 705, minHeight: 560, borderRadius: 50, background: '#FFFFFF', border: `5px solid ${palette.red}`, boxShadow: '0 30px 90px rgba(23,59,102,0.24)', padding: '52px 45px', transform: `translateY(${(1 - enter) * 90}px) scale(${0.94 + enter * 0.06})`, opacity: enter, zIndex: 60}}>
        <div style={{fontSize: 30, color: palette.red, fontWeight: 950, letterSpacing: 2}}>DAHA FAZLASI İÇİN</div>
        <div style={{fontSize: 62, lineHeight: 1.08, color: palette.navy, fontWeight: 950, marginTop: 22}}>KANALIMIZA<br/>BEKLİYORUZ!</div>
        <div style={{marginTop: 45, width: 500, height: 112, borderRadius: 28, background: palette.red, color: '#FFFFFF', fontSize: 36, fontWeight: 950, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, boxShadow: '0 18px 35px rgba(216,80,91,0.34)', transform: `scale(${0.8 + button * 0.2})`}}>
          <span style={{fontSize: 44}}>▶</span> ABONE OL
        </div>
      </div>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const p = interpolate(local - i * 2, [0, 35], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
        return <div key={i} style={{position: 'absolute', left: 110 + i * 122, top: 550 + p * (120 + (i % 3) * 45), width: 14 + (i % 2) * 7, height: 14 + (i % 2) * 7, borderRadius: i % 2 ? 3 : '50%', background: i % 3 === 0 ? palette.amber : i % 3 === 1 ? palette.red : palette.blue, transform: `translateX(${Math.sin(i * 2.3) * p * 90}px) rotate(${p * 260}deg)`, opacity: 1 - p * 0.35, zIndex: 70}}/>;
      })}
    </>
  );
};

export const RollerShorts: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const questionAudioStart = sec(timing.question_start, fps);
  const questionStart = sec(timing.question_speech_start, fps);
  const questionEnd = sec(timing.question_end, fps);
  const answerAudioStart = sec(timing.answer_start, fps);
  const answerStart = sec(timing.answer_speech_start, fps);
  const answerEnd = sec(timing.answer_end, fps);
  const ctaAudioStart = sec(timing.cta_start, fps);
  const ctaStart = sec(timing.cta_speech_start, fps);
  const ctaEnd = sec(timing.cta_end, fps);
  const waiting = frame >= questionEnd && frame < answerStart;
  const answering = frame >= answerStart && frame < ctaStart;
  const cta = frame >= ctaStart;
  const talking = (frame >= questionStart && frame < questionEnd) || (frame >= answerStart && frame < answerEnd) || (frame >= ctaStart && frame < ctaEnd);
  const countdownProgress = interpolate(frame, [questionEnd, answerStart], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{fontFamily: 'Verdana, Arial, sans-serif', color: palette.ink}}>
      <Background/>
      <Header/>
      {!cta && <QuestionCard isWaiting={waiting}/>} 
      {!cta && <RoleDiagram/>} 
      {waiting && <Countdown progress={countdownProgress}/>} 
      {answering && <AnswerBanner/>}
      {cta && <CTA/>}

      <GifCharacter name="ibrahim" x={895} y={1495} scale={2.08} flip animate={talking}/>
      <div style={{position: 'absolute', right: 38, top: 1784, width: 290, height: 58, borderRadius: 18, background: talking ? palette.blue : '#6D7C8C', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 25, fontWeight: 950, zIndex: 28, border: '3px solid #FFFFFF', boxShadow: '0 10px 26px rgba(23,59,102,0.22)'}}>
        {talking && <span style={{width: 11, height: 11, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 0 0 7px rgba(255,255,255,0.20)'}}/>} İBRAHİM
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 34, background: `linear-gradient(90deg, ${palette.navy}, ${palette.blue} 55%, ${palette.red})`, zIndex: 120}}/>

      <Sequence from={questionAudioStart}><Audio src={staticFile('audio/sosyal/roller_shorts/question.mp3')}/></Sequence>
      <Sequence from={answerAudioStart}><Audio src={staticFile('audio/sosyal/roller_shorts/answer.mp3')}/></Sequence>
      <Sequence from={ctaAudioStart}><Audio src={staticFile('audio/sosyal/roller_shorts/cta.mp3')}/></Sequence>
    </AbsoluteFill>
  );
};

export const RollerShortsConfig = {
  id: 'RollerShorts',
  fps: timing.fps,
  width: 1080,
  height: 1920,
  durationInFrames: Math.ceil(timing.total_sec * timing.fps),
};
