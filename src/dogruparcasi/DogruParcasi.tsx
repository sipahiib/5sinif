import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Minecraftfiliz, Minecraftibrahim} from '../MinecraftCharacter';
import timings from './dogruparcasi_timings.json';

type Scene = {
  id: string;
  title: string;
  image: string;
  focus: string;
  points: string[];
  firstSpeaker: 'filiz' | 'ibrahim';
  splitSec: number;
  totalSec: number;
  visualKind: string;
};

const COLORS = {navy: '#123B63', blue: '#1677C8', pale: '#EAF7FF', red: '#E64545', yellow: '#FFC928', ink: '#1A2735', teal: '#0D9488'};

const sceneTexts: Scene[] = [
  {id: '01', title: 'Doğru Parçasını Tanıyalım', image: '2.dogruparcasi.jpg', focus: 'İki noktanın en kısa yolculuğu', points: ['İki noktayı birleştiren en kısa düz çizgidir.', 'A ve B gibi iki uç noktası bulunur.', 'Geometrinin temel yapı taşlarından biridir.'], firstSpeaker: 'filiz', splitSec: timings['01'].split_sec, totalSec: timings['01'].total_sec, visualKind: 'segment'},
  {id: '02', title: 'Doğru Parçasının Özellikleri', image: '2.dogruparcasi.jpg', focus: 'Düz, sonlu ve sınırlı', points: ['Her zaman düz bir çizgidir.', 'Belirli ve sonlu bir uzunluğu vardır.', 'İki uç noktayla sınırlıdır.'], firstSpeaker: 'ibrahim', splitSec: timings['02'].split_sec, totalSec: timings['02'].total_sec, visualKind: 'properties'},
  {id: '03', title: 'Doğru Parçasını Adlandıralım', image: '2.dogruparcasi.jpg', focus: 'Çokgenler ve adlandırma', points: ['Çokgenlerin kenarları doğru parçalarıdır.', 'Uç noktaların harfleri kullanılır.', '[AB] ile [BA] aynı doğru parçasını gösterir.'], firstSpeaker: 'filiz', splitSec: timings['03'].split_sec, totalSec: timings['03'].total_sec, visualKind: 'polygons'},
  {id: '04', title: 'Uzunluğu Nasıl Ölçeriz?', image: '3.dogruparcasi.jpg', focus: 'İki nokta arasındaki mesafe', points: ['Uzunluk, iki uç arasındaki mesafedir.', 'Cetvel veya ölçü bandıyla ölçülür.', 'cm, m ve mm gibi birimlerle yazılır.'], firstSpeaker: 'ibrahim', splitSec: timings['04'].split_sec, totalSec: timings['04'].total_sec, visualKind: 'ruler'},
  {id: '05', title: 'Mesafe ve Çevre', image: '3.dogruparcasi.jpg', focus: 'Uzunluğu kullanalım', points: ['İki nokta arasındaki mesafe doğru parçasının uzunluğudur.', 'Çevre, bütün kenar uzunluklarının toplamıdır.', 'Ölçüler aynı uzunluk biriminde olmalıdır.'], firstSpeaker: 'filiz', splitSec: timings['05'].split_sec, totalSec: timings['05'].total_sec, visualKind: 'perimeter'},
  {id: '06', title: 'Alan ve Uzunluk Gösterimi', image: '3.dogruparcasi.jpg', focus: 'Ad ile uzunluk farklıdır', points: ['Dikdörtgenin alanı: kısa kenar × uzun kenar.', 'Doğru parçası [AB] biçiminde adlandırılır.', 'Uzunluğu |AB| biçiminde gösterilir.'], firstSpeaker: 'ibrahim', splitSec: timings['06'].split_sec, totalSec: timings['06'].total_sec, visualKind: 'area'},
  {id: '07', title: 'Tebrikler!', image: '3.dogruparcasi.jpg', focus: 'Doğru parçasını öğrendin', points: ['Düz, sonlu ve iki uç noktalıdır.', 'Adlandırılabilir ve uzunluğu ölçülebilir.', 'Çevre ve alan hesaplarında kullanılır.'], firstSpeaker: 'filiz', splitSec: timings['07'].split_sec, totalSec: timings['07'].total_sec, visualKind: 'final'},
];

const Dot: React.FC<{x: number; y: number; label: string}> = ({x, y, label}) => <><circle cx={x} cy={y} r="7" fill={COLORS.red}/><text x={x} y={y - 15} textAnchor="middle" fill={COLORS.ink} fontSize="19" fontWeight="900">{label}</text></>;

const GeometryVisual: React.FC<{kind: string}> = ({kind}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const progress = spring({frame, fps, config: {damping: 18, stiffness: 75}});
  const pulse = 1 + Math.sin(frame / 10) * 0.035;

  if (kind === 'segment') return <svg viewBox="0 0 260 230" width="250" height="220"><path d="M45 112 H215" stroke={COLORS.blue} strokeWidth="7" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress}/><Dot x={45} y={112} label="A"/><Dot x={215} y={112} label="B"/><text x="130" y="174" textAnchor="middle" fill={COLORS.navy} fontSize="20" fontWeight="900">[AB] Doğru Parçası</text><text x="130" y="202" textAnchor="middle" fill={COLORS.ink} fontSize="14">En kısa düz yol</text></svg>;
  if (kind === 'properties') return <svg viewBox="0 0 260 230" width="250" height="220"><path d="M43 68 H217" stroke={COLORS.blue} strokeWidth="7" strokeLinecap="round"/><Dot x={43} y={68} label="A"/><Dot x={217} y={68} label="B"/><g fontSize="17" fontWeight="900" fill={COLORS.navy}><rect x="35" y="112" width="190" height="31" rx="8" fill="#DBEAFE"/><text x="130" y="134" textAnchor="middle">✓ Doğrusaldır</text><rect x="35" y="151" width="190" height="31" rx="8" fill="#FEF3C7"/><text x="130" y="173" textAnchor="middle">✓ Sonlu uzunluk</text><rect x="35" y="190" width="190" height="31" rx="8" fill="#D1FAE5"/><text x="130" y="212" textAnchor="middle">✓ İki uç nokta</text></g></svg>;
  if (kind === 'polygons') return <svg viewBox="0 0 260 230" width="250" height="220"><polygon points="57,153 106,55 155,153" fill="#DBEAFE" stroke={COLORS.blue} strokeWidth="6" strokeLinejoin="round"/><rect x="167" y="82" width="70" height="70" fill="#FEF3C7" stroke="#D97706" strokeWidth="6"/><text x="130" y="193" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="900">Kenarlar = Doğru Parçaları</text><text x="130" y="220" textAnchor="middle" fill={COLORS.red} fontSize="18" fontWeight="900">[AB] = [BA]</text></svg>;
  if (kind === 'ruler') return <svg viewBox="0 0 260 230" width="250" height="220"><path d="M42 70 H218" stroke={COLORS.blue} strokeWidth="6"/><Dot x={42} y={70} label="A"/><Dot x={218} y={70} label="B"/><g transform="translate(30 118)"><rect width="200" height="48" rx="5" fill="#FDE68A" stroke="#B45309" strokeWidth="3"/>{Array.from({length: 21}, (_, i) => <path key={i} d={`M${i * 10} 0 V${i % 5 === 0 ? 24 : i % 2 === 0 ? 17 : 11}`} stroke="#78350F" strokeWidth="2"/>)}<text x="100" y="39" textAnchor="middle" fill="#78350F" fontSize="16" fontWeight="900">cetvel</text></g><text x="130" y="207" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="900">|AB| = uzunluk</text></svg>;
  if (kind === 'perimeter') return <svg viewBox="0 0 260 230" width="250" height="220"><polygon points="66,145 88,55 184,43 211,132 134,166" fill="#ECFDF5" stroke={COLORS.teal} strokeWidth="7" strokeLinejoin="round" transform={`scale(${pulse})`} transformOrigin="134px 104px"/><g fill={COLORS.red}>{[[66,145],[88,55],[184,43],[211,132],[134,166]].map(([x,y], i) => <circle key={i} cx={x} cy={y} r="5"/>)}</g><text x="130" y="198" textAnchor="middle" fill={COLORS.navy} fontSize="17" fontWeight="900">ÇEVRE</text><text x="130" y="220" textAnchor="middle" fill={COLORS.ink} fontSize="14">Tüm kenarları topla</text></svg>;
  if (kind === 'area') return <svg viewBox="0 0 260 230" width="250" height="220"><rect x="38" y="44" width="184" height="120" rx="3" fill="#DBEAFE" stroke={COLORS.blue} strokeWidth="6"/>{[84,130,176].map((x) => <path key={x} d={`M${x} 44 V164`} stroke="#93C5FD" strokeWidth="2"/>)}{[84,124].map((y) => <path key={y} d={`M38 ${y} H222`} stroke="#93C5FD" strokeWidth="2"/>)}<text x="130" y="107" textAnchor="middle" fill={COLORS.navy} fontSize="21" fontWeight="900">ALAN</text><text x="130" y="194" textAnchor="middle" fill={COLORS.ink} fontSize="16" fontWeight="900">kısa kenar × uzun kenar</text><text x="130" y="219" textAnchor="middle" fill={COLORS.red} fontSize="17" fontWeight="900">[AB] ≠ |AB|</text></svg>;
  return <svg viewBox="0 0 260 230" width="250" height="220"><circle cx="130" cy="105" r="74" fill="#DBEAFE" stroke={COLORS.blue} strokeWidth="5"/><path d="M91 107 L119 135 L171 75" fill="none" stroke={COLORS.teal} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"/><text x="130" y="201" textAnchor="middle" fill={COLORS.navy} fontSize="22" fontWeight="900">Harika iş çıkardın!</text></svg>;
};

const SceneView: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const splitFrame = Math.round(scene.splitSec * fps);
  const firstActive = frame < splitFrame;
  const filizTalking = scene.firstSpeaker === 'filiz' ? firstActive : !firstActive;
  const ibrahimTalking = scene.firstSpeaker === 'ibrahim' ? firstActive : !firstActive;
  const entrance = spring({frame, fps, config: {damping: 16, stiffness: 105}});
  const imageScale = interpolate(frame, [0, scene.totalSec * fps], [1.02, 1.08], {extrapolateRight: 'clamp'});
  const showCta = scene.id === '07' && frame >= Math.max(0, scene.totalSec * fps - 5 * fps);

  return <AbsoluteFill style={{background: COLORS.pale, overflow: 'hidden', fontFamily: 'Trebuchet MS, Arial, sans-serif'}}>
    <div style={{height: 76, background: COLORS.navy, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', fontWeight: 900, position: 'relative', zIndex: 8}}><span style={{fontSize: 20}}>5. SINIF MATEMATİK</span><span style={{fontSize: 24}}>{scene.title}</span></div>
    <div style={{position: 'absolute', inset: '92px 22px 18px', borderRadius: 20, overflow: 'hidden', background: 'white', boxShadow: '0 8px 24px rgba(18,59,99,0.2)'}}><Img src={staticFile(`pages/matematik/${scene.image}`)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: scene.image.startsWith('2.') ? 'center 45%' : 'center 39%', transform: `scale(${imageScale})`, opacity: 0.2}}/><div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(247,252,255,0.98) 0%, rgba(247,252,255,0.91) 68%, rgba(247,252,255,0.64) 100%)'}}/></div>
    <div style={{position: 'absolute', left: 205, top: 104, width: 370, zIndex: 3, transform: `translateY(${(1 - entrance) * 22}px) scale(${0.97 + entrance * 0.03})`}}><div style={{background: 'rgba(255,255,255,0.97)', border: `3px solid ${COLORS.blue}`, borderRadius: 17, padding: '15px 17px', boxShadow: '0 12px 28px rgba(18,59,99,0.14)'}}><div style={{fontSize: 21, fontWeight: 900, color: COLORS.navy, marginBottom: 9}}>{scene.focus}</div><div style={{display: 'grid', gap: 7}}>{scene.points.map((point, index) => <div key={point} style={{fontSize: 14, lineHeight: 1.28, fontWeight: 800, color: COLORS.ink, background: index % 2 === 0 ? '#EFF6FF' : '#FFF7ED', borderLeft: `5px solid ${index % 2 === 0 ? COLORS.blue : COLORS.red}`, padding: '7px 8px'}}>{point}</div>)}</div></div></div>
    <div style={{position: 'absolute', right: 248, top: 300, width: 214, height: 198, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.96)', border: `3px solid ${COLORS.blue}`, borderRadius: 16, boxShadow: '0 10px 22px rgba(18,59,99,0.18)', zIndex: 2}}><GeometryVisual kind={scene.visualKind}/></div>
    <Minecraftfiliz x={112} y={150} scale={0.78} isTalking={filizTalking}/><Minecraftibrahim x={848} y={150} scale={0.78} flip isTalking={ibrahimTalking}/>
    <div style={{position: 'absolute', left: 57, top: 394, minWidth: 110, textAlign: 'center', background: filizTalking ? COLORS.red : '#334155', color: 'white', padding: '6px 12px', borderRadius: 9, border: '2px solid white', fontWeight: 900, zIndex: 10}}>Filiz</div><div style={{position: 'absolute', right: 57, top: 394, minWidth: 110, textAlign: 'center', background: ibrahimTalking ? COLORS.blue : '#334155', color: 'white', padding: '6px 12px', borderRadius: 9, border: '2px solid white', fontWeight: 900, zIndex: 10}}>İbrahim</div>
    {showCta && <div style={{position: 'absolute', left: 255, right: 255, bottom: 28, display: 'flex', gap: 18, zIndex: 20}}><div style={{flex: 1, background: COLORS.red, color: 'white', padding: '13px 18px', borderRadius: 14, textAlign: 'center', fontSize: 23, fontWeight: 900, boxShadow: '0 7px 15px rgba(0,0,0,0.18)'}}>♥ BEĞEN</div><div style={{flex: 1, background: COLORS.blue, color: 'white', padding: '13px 18px', borderRadius: 14, textAlign: 'center', fontSize: 21, fontWeight: 900, boxShadow: '0 7px 15px rgba(0,0,0,0.18)'}}>✓ ABONE OL</div></div>}
    <Audio src={staticFile(`audio/matematik/dogruparcasi/${scene.id}_1.mp3`)}/><Sequence from={splitFrame}><Audio src={staticFile(`audio/matematik/dogruparcasi/${scene.id}_2.mp3`)}/></Sequence>
  </AbsoluteFill>;
};

export const DogruParcasi: React.FC = () => <AbsoluteFill>{sceneTexts.map((scene, index) => <Sequence key={scene.id} from={Math.round(sceneTexts.slice(0, index).reduce((sum, previous) => sum + previous.totalSec, 0) * 30)} durationInFrames={Math.round(scene.totalSec * 30)}><SceneView scene={scene}/></Sequence>)}</AbsoluteFill>;

export const DogruParcasiConfig = {id: 'DogruParcasi', fps: 30, width: 960, height: 540, durationInFrames: Math.round(sceneTexts.reduce((sum, scene) => sum + scene.totalSec, 0) * 30)};
