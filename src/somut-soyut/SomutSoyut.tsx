import React from 'react';
import {AbsoluteFill, Audio, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Minecraftfiliz, Minecraftibrahim} from '../MinecraftCharacter';

const scenes = [
  {start: 0, duration: 11.42, title: 'SOMUT VE SOYUT ANLAMLI SÖZCÜKLER', type: 'intro', first: 'filiz', split: 6.5, audio: 'somut_01'},
  {start: 11.42, duration: 11.06, title: 'SOMUT ANLAM', type: 'somut', first: 'ibrahim', split: 6.91, audio: 'somut_02'},
  {start: 22.48, duration: 8.62, title: 'GÖZ VE KULAK KONUŞUYOR', type: 'eye-ear', first: 'filiz', split: 4.44, audio: 'somut_03'},
  {start: 31.1, duration: 12.79, title: 'DOKUNMA, KOKLAMA VE TATMA', type: 'touch-smell-taste', first: 'ibrahim', split: 5.18, audio: 'somut_04'},
  {start: 43.89, duration: 13.7, title: 'SOYUT ANLAM', type: 'soyut', first: 'filiz', split: 7.06, audio: 'somut_05'},
  {start: 57.59, duration: 12.62, title: 'DUYULARIMIZLA KONTROL EDELİM', type: 'question', first: 'ibrahim', split: 7.85, audio: 'somut_06'},
  {start: 70.21, duration: 12, title: 'SOMUT MU, SOYUT MU?', type: 'compare', first: 'filiz', split: 5.69, audio: 'somut_07'},
  {start: 82.21, duration: 10.2, title: 'TEBRİKLER!', type: 'finish', first: 'ibrahim', split: 5.59, audio: 'somut_08'},
];

const organSets: Record<string, Array<{icon: string; label: string}>> = {
  intro: [{icon: '👁️', label: 'Göz'}, {icon: '👂', label: 'Kulak'}, {icon: '✋', label: 'El / Deri'}, {icon: '👃', label: 'Burun'}, {icon: '👅', label: 'Dil'}],
  somut: [{icon: '👁️', label: 'Görüyorum'}, {icon: '👂', label: 'Duyuyorum'}, {icon: '✋', label: 'Dokunuyorum'}],
  'eye-ear': [{icon: '👁️', label: 'Göz: Görürüm'}, {icon: '👂', label: 'Kulak: Duyarım'}],
  'touch-smell-taste': [{icon: '✋', label: 'El / Deri'}, {icon: '👃', label: 'Burun'}, {icon: '👅', label: 'Dil'}],
  soyut: [{icon: '❤️', label: 'Sevgi'}, {icon: '💭', label: 'Özlem'}, {icon: '😊', label: 'Mutluluk'}],
  question: [{icon: '👁️', label: 'Görebiliyor muyum?'}, {icon: '👂', label: 'Duyabiliyor muyum?'}, {icon: '✋', label: 'Dokunabiliyor muyum?'}],
  compare: [{icon: '🍎', label: 'Elma: Somut'}, {icon: '🌧️', label: 'Yağmur: Somut'}, {icon: '🤝', label: 'Dostluk: Soyut'}],
};

const sceneText: Record<string, {heading: string; body: string}> = {
  intro: {heading: 'Bugünkü konu', body: 'Somut ve soyut anlamlı sözcükler. Beş duyu organımız bu konuyu anlamamıza yardım eder.'},
  somut: {heading: 'Somut anlamlı sözcük', body: 'Beş duyu organımızdan en az biriyle algılayabildiğimiz kelimelere somut anlamlı kelimeler denir. Örnek: kelebek, silgi, güneş.'},
  'eye-ear': {heading: 'Göz ve kulak', body: 'Göz; kelebeği, silgiyi ve güneşi görür. Kulak; sesleri ve müziği duyar.'},
  'touch-smell-taste': {heading: 'El, burun ve dil', body: 'Elimizle dokunur, burnumuzla kokuları alır, dilimizle tatları hissederiz. Bu organlar somut varlıkları algılamamızı sağlar.'},
  soyut: {heading: 'Soyut anlamlı sözcük', body: 'Beş duyu organımızdan hiçbiriyle algılayamadığımız kelimelere soyut anlamlı kelimeler denir. Örnek: sevgi, özlem, korku, mutluluk.'},
  question: {heading: 'Kendimize soralım', body: 'Bunu görebiliyor, duyabiliyor, dokunabiliyor, koklayabiliyor ya da tadabiliyor muyum?'},
  compare: {heading: 'Sonuç', body: 'Duyularımızla algılayabiliyorsak somut, algılayamıyorsak soyuttur. Elma somut, dostluk soyuttur.'},
};

const SceneContent: React.FC<{type: string}> = ({type}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const items = organSets[type] || [];
  if (type === 'finish') return <div style={{fontSize: 44, fontWeight: 900, color: '#B91C1C'}}>Somut ve soyut anlamı öğrendin!</div>;
  const text = sceneText[type];
  return <div style={{width: 570, padding: '20px 24px', background: '#FFFFFF', border: '3px solid #B91C1C', borderRadius: 16, boxShadow: '0 8px 20px rgba(15,23,42,0.12)'}}>
    <div style={{fontSize: 23, fontWeight: 900, color: '#B91C1C', marginBottom: 10}}>{text.heading}</div>
    <div style={{fontSize: 17, lineHeight: 1.4, fontWeight: 700, color: '#334155', marginBottom: 12}}>{text.body}</div>
    <div style={{display: 'grid', gap: 10}}>{items.map((item, index) => { const pop = spring({frame: frame - index * 5, fps, config: {damping: 14, stiffness: 120}}); return <div key={item.label} style={{transform: `scale(${pop})`, display: 'flex', alignItems: 'center', gap: 16, padding: '9px 14px', background: index % 2 ? '#FFF7ED' : '#FEF2F2', borderLeft: `6px solid ${index % 2 ? '#EA580C' : '#B91C1C'}`}}><span style={{fontSize: 31}}>{item.icon}</span><span style={{fontSize: 21, fontWeight: 900, color: '#334155'}}>{item.label}</span></div>;})}</div>
    {type === 'somut' && <div style={{marginTop: 14, fontSize: 17, fontWeight: 800, color: '#7F1D1D'}}>Duyularımızla algıladıklarımız somuttur.</div>}
    {type === 'soyut' && <div style={{marginTop: 14, fontSize: 17, fontWeight: 800, color: '#7F1D1D'}}>Duyularımızla algılayamadıklarımız soyuttur.</div>}
  </div>;
};

const SomutSoyutScene: React.FC<{scene: typeof scenes[number]}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const firstSpeakerTalking = frame < Math.round(scene.split * fps);
  const secondSpeakerTalking = frame >= Math.round(scene.split * fps);
  const filizTalking = scene.first === 'filiz' ? firstSpeakerTalking : secondSpeakerTalking;
  const ibrahimTalking = scene.first === 'ibrahim' ? firstSpeakerTalking : secondSpeakerTalking;
  return <AbsoluteFill>
    <div style={{height: 76, background: '#B91C1C', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', fontWeight: 900}}><span style={{fontSize: 19}}>5. SINIF TÜRKÇE</span><span style={{fontSize: 23}}>{scene.title}</span></div>
    <div style={{position: 'absolute', top: 102, left: 205, right: 205, bottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><SceneContent type={scene.type}/></div>
    <Minecraftfiliz x={112} y={146} scale={0.78} isTalking={filizTalking}/>
    <Minecraftibrahim x={848} y={146} scale={0.78} flip isTalking={ibrahimTalking}/>
    <div style={{position: 'absolute', left: 55, top: 368, minWidth: 114, textAlign: 'center', background: '#0F766E', color: '#FFFFFF', padding: '6px 14px', border: '2px solid #FFFFFF', borderRadius: 10, fontWeight: 900, zIndex: 30}}>Filiz</div>
    <div style={{position: 'absolute', right: 55, top: 368, minWidth: 114, textAlign: 'center', background: '#991B1B', color: '#FFFFFF', padding: '6px 14px', border: '2px solid #FFFFFF', borderRadius: 10, fontWeight: 900, zIndex: 30}}>İbrahim</div>
    <Audio src={staticFile(`audio/${scene.audio}_1.mp3`)} />
    <Sequence from={Math.round(scene.split * fps)}><Audio src={staticFile(`audio/${scene.audio}_2.mp3`)} /></Sequence>
  </AbsoluteFill>;
};

export const SomutSoyut: React.FC = () => {
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background: '#FFFFFF', color: '#1E293B', fontFamily: 'Arial, sans-serif', overflow: 'hidden'}}>{scenes.map((scene) => <Sequence key={scene.audio} from={Math.round(scene.start * fps)} durationInFrames={Math.round(scene.duration * fps)}><SomutSoyutScene scene={scene}/></Sequence>)}</AbsoluteFill>;
};

export const SomutSoyutConfig = {id: 'SomutSoyut', fps: 30, width: 960, height: 540, durationInFrames: Math.round(92.41 * 30)};
