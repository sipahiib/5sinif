import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Minecraftfiliz, Minecraftibrahim} from '../MinecraftCharacter';
import timings from './nokta_timings.json';

type Scene = {id: string; title: string; focus: string; points: string[]; speaker: 'filiz' | 'ibrahim'; audioSec: number; totalSec: number; visualKind: string};

const COLORS = {navy: '#123B63', blue: '#1677C8', pale: '#EAF7FF', red: '#E64545', yellow: '#FFC928', ink: '#1A2735', teal: '#0D9488'};

const scenes: Scene[] = [
  {id: '01', title: 'Noktayı Keşfediyoruz', focus: 'Geometrinin temel taşı', points: ['Nokta çok küçük ama çok önemlidir.', 'Geometrik çizimlerin başlangıcıdır.', 'Bulunduğu yeri, yani konumu gösterir.'], speaker: 'filiz', audioSec: timings['01'].audio_sec, totalSec: timings['01'].total_sec, visualKind: 'intro'},
  {id: '02', title: 'Noktanın Özellikleri', focus: 'Boyutu yok, konumu var', points: ['Eni, boyu ve yüksekliği yoktur.', 'Yalnızca bir konumu gösterir.', 'A, B, C gibi büyük harflerle adlandırılır.'], speaker: 'ibrahim', audioSec: timings['02'].audio_sec, totalSec: timings['02'].total_sec, visualKind: 'position'},
  {id: '03', title: 'Kalemin Bıraktığı İz', focus: 'Noktayı günlük hayatta görelim', points: ['Kalemin bıraktığı küçük iz noktaya benzer.', 'İzin bulunduğu yer bir konumdur.', 'Örnekteki noktanın adı A noktasıdır.'], speaker: 'filiz', audioSec: timings['03'].audio_sec, totalSec: timings['03'].total_sec, visualKind: 'pencil'},
  {id: '04', title: 'Gökyüzündeki Noktalar', focus: 'Uzaktaki yıldızlar', points: ['Yıldızlar gerçekte çok büyüktür.', 'Çok uzakta oldukları için küçük görünürler.', 'Gözümüze nokta gibi görünmeleri uzaklıkla ilgilidir.'], speaker: 'ibrahim', audioSec: timings['04'].audio_sec, totalSec: timings['04'].total_sec, visualKind: 'stars'},
  {id: '05', title: 'Ekrandaki Renkli Noktalar', focus: 'Pikseller görüntüyü oluşturur', points: ['Piksel, ekrandaki çok küçük renkli bir noktadır.', 'Pikseller yan yana dizilir.', 'Birlikte resimleri ve görüntüleri oluştururlar.'], speaker: 'filiz', audioSec: timings['05'].audio_sec, totalSec: timings['05'].total_sec, visualKind: 'pixels'},
  {id: '06', title: 'Noktalardan Şekillere', focus: 'Noktaları birleştirelim', points: ['İki nokta birleşince doğru parçası oluşur.', 'Doğru parçaları birleşince şekiller oluşur.', 'Üçgen ve kare buna örnektir.'], speaker: 'ibrahim', audioSec: timings['06'].audio_sec, totalSec: timings['06'].total_sec, visualKind: 'connect'},
  {id: '07', title: 'Tebrikler!', focus: 'Noktayı öğrendin', points: ['Noktanın boyutu yoktur.', 'Konum gösterir ve büyük harfle adlandırılır.', 'Çizgilerin ve şekillerin temelini oluşturur.'], speaker: 'filiz', audioSec: timings['07'].audio_sec, totalSec: timings['07'].total_sec, visualKind: 'final'},
];

const Point: React.FC<{x: number; y: number; label?: string; pulse?: boolean}> = ({x, y, label, pulse = false}) => {
  const frame = useCurrentFrame();
  const ringScale = 1 + (frame % 45) / 45;
  return <g>{pulse && <circle cx={x} cy={y} r={14 * ringScale} fill="none" stroke={COLORS.yellow} strokeWidth="4" opacity={1 - (ringScale - 1)}/>}<circle cx={x} cy={y} r="8" fill={COLORS.red}/>{label && <text x={x + 17} y={y - 12} fill={COLORS.ink} fontSize="20" fontWeight="900">{label}</text>}</g>;
};

const PointVisual: React.FC<{kind: string}> = ({kind}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = spring({frame, fps, config: {damping: 15, stiffness: 90}});

  if (kind === 'intro') return <svg viewBox="0 0 260 230" width="250" height="220"><Point x={130} y={94} label="A" pulse/><text x="130" y="168" textAnchor="middle" fill={COLORS.navy} fontSize="28" fontWeight="900">NOKTA</text><text x="130" y="198" textAnchor="middle" fill={COLORS.ink} fontSize="15">Küçük ama çok önemli!</text></svg>;
  if (kind === 'position') return <svg viewBox="0 0 260 230" width="250" height="220"><path d="M38 50 H222 M38 90 H222 M38 130 H222 M38 170 H222 M70 28 V196 M120 28 V196 M170 28 V196" stroke="#BFDBFE" strokeWidth="2"/><Point x={170} y={90} label="A" pulse/><text x="130" y="218" textAnchor="middle" fill={COLORS.navy} fontSize="17" fontWeight="900">A noktası bir konum gösterir</text></svg>;
  if (kind === 'pencil') return <svg viewBox="0 0 260 230" width="250" height="220"><g transform={`translate(${(1 - entrance) * -35} ${(1 - entrance) * -25}) rotate(42 110 80)`}><rect x="52" y="60" width="136" height="28" rx="8" fill="#F2C49B" stroke="#B77945" strokeWidth="3"/><polygon points="188,60 225,74 188,88" fill="#E5B98B"/><polygon points="215,70 230,74 215,78" fill="#334155"/><rect x="52" y="60" width="20" height="28" fill="#F87171"/></g><Point x={201} y={152} label="A" pulse/><text x="130" y="208" textAnchor="middle" fill={COLORS.navy} fontSize="17" fontWeight="900">Kalemin bıraktığı küçük iz</text></svg>;
  if (kind === 'stars') return <svg viewBox="0 0 260 230" width="250" height="220"><rect x="15" y="15" width="230" height="175" rx="18" fill="#102B4E"/><g fill="#FFF7B2" stroke="#FDE68A">{[[50,55,4],[99,91,6],[155,48,5],[209,103,4],[72,145,5],[173,151,7]].map(([x,y,r], i) => <circle key={i} cx={x} cy={y} r={r + Math.sin((frame + i * 9) / 8) * 1.5}/>)}</g><text x="130" y="218" textAnchor="middle" fill={COLORS.navy} fontSize="17" fontWeight="900">Uzaktaki yıldızlar nokta gibi</text></svg>;
  if (kind === 'pixels') return <svg viewBox="0 0 260 230" width="250" height="220"><g transform="translate(36 27)">{Array.from({length: 48}, (_, i) => <rect key={i} x={(i % 8) * 24} y={Math.floor(i / 8) * 24} width="19" height="19" rx="3" fill={i % 7 === 0 ? COLORS.red : i % 5 === 0 ? COLORS.yellow : i % 3 === 0 ? COLORS.teal : COLORS.blue} transform={`scale(${0.92 + Math.sin((frame + i * 5) / 11) * 0.06})`} transformOrigin={`${(i % 8) * 24 + 10}px ${Math.floor(i / 8) * 24 + 10}px`}/>)}</g><text x="130" y="205" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="900">PİKSELLER</text><text x="130" y="224" textAnchor="middle" fill={COLORS.ink} fontSize="13">Görüntünün küçük noktaları</text></svg>;
  if (kind === 'connect') {const progress = interpolate(entrance, [0, 1], [0, 1]); return <svg viewBox="0 0 260 230" width="250" height="220"><path d="M55 155 L130 50 L210 155 Z" fill="#DBEAFE" stroke={COLORS.blue} strokeWidth="7" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress}/><Point x={55} y={155}/><Point x={130} y={50}/><Point x={210} y={155}/><text x="130" y="202" textAnchor="middle" fill={COLORS.navy} fontSize="18" fontWeight="900">Noktalar birleşince</text><text x="130" y="222" textAnchor="middle" fill={COLORS.ink} fontSize="14">geometrik şekiller oluşur</text></svg>;}
  return <svg viewBox="0 0 260 230" width="250" height="220"><circle cx="130" cy="103" r="73" fill="#DBEAFE" stroke={COLORS.blue} strokeWidth="5"/><path d="M91 105 L119 133 L171 73" fill="none" stroke={COLORS.teal} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/><text x="130" y="207" textAnchor="middle" fill={COLORS.navy} fontSize="22" fontWeight="900">Harika iş çıkardın!</text></svg>;
};

const SceneView: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const talking = frame < Math.round(scene.audioSec * fps);
  const cardIn = spring({frame, fps, config: {damping: 16, stiffness: 105}});
  const imageScale = interpolate(frame, [0, scene.totalSec * fps], [1.02, 1.08], {extrapolateRight: 'clamp'});
  const filizTalking = scene.speaker === 'filiz' && talking;
  const ibrahimTalking = scene.speaker === 'ibrahim' && talking;
  const showCta = scene.id === '07' && frame >= Math.max(0, scene.totalSec * fps - 5 * fps);

  return <AbsoluteFill style={{background: COLORS.pale, overflow: 'hidden', fontFamily: 'Trebuchet MS, Arial, sans-serif'}}>
    <div style={{height: 76, background: COLORS.navy, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', fontWeight: 900, position: 'relative', zIndex: 8}}><span style={{fontSize: 20}}>5. SINIF MATEMATİK</span><span style={{fontSize: 24}}>{scene.title}</span></div>
    <div style={{position: 'absolute', inset: '92px 22px 18px', borderRadius: 20, overflow: 'hidden', background: 'white', boxShadow: '0 8px 24px rgba(18,59,99,0.2)'}}><Img src={staticFile('pages/matematik/1.nokta.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', transform: `scale(${imageScale})`, opacity: 0.18}}/><div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(247,252,255,0.98) 0%, rgba(247,252,255,0.91) 68%, rgba(247,252,255,0.64) 100%)'}}/></div>
    <div style={{position: 'absolute', left: 205, top: 104, width: 370, zIndex: 3, transform: `translateY(${(1 - cardIn) * 22}px) scale(${0.97 + cardIn * 0.03})`}}><div style={{background: 'rgba(255,255,255,0.97)', border: `3px solid ${COLORS.blue}`, borderRadius: 17, padding: '15px 17px', boxShadow: '0 12px 28px rgba(18,59,99,0.14)'}}><div style={{fontSize: 21, fontWeight: 900, color: COLORS.navy, marginBottom: 9}}>{scene.focus}</div><div style={{display: 'grid', gap: 7}}>{scene.points.map((point, index) => <div key={point} style={{fontSize: 14, lineHeight: 1.28, fontWeight: 800, color: COLORS.ink, background: index % 2 === 0 ? '#EFF6FF' : '#FFF7ED', borderLeft: `5px solid ${index % 2 === 0 ? COLORS.blue : COLORS.red}`, padding: '7px 8px'}}>{point}</div>)}</div></div></div>
    <div style={{position: 'absolute', right: 248, top: 300, width: 214, height: 198, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.96)', border: `3px solid ${COLORS.blue}`, borderRadius: 16, boxShadow: '0 10px 22px rgba(18,59,99,0.18)', zIndex: 2}}><PointVisual kind={scene.visualKind}/></div>
    <Minecraftfiliz x={112} y={150} scale={0.78} isTalking={filizTalking}/><Minecraftibrahim x={848} y={150} scale={0.78} flip isTalking={ibrahimTalking}/>
    <div style={{position: 'absolute', left: 57, top: 394, minWidth: 110, textAlign: 'center', background: filizTalking ? COLORS.red : '#334155', color: 'white', padding: '6px 12px', borderRadius: 9, border: '2px solid white', fontWeight: 900, zIndex: 10}}>Filiz</div><div style={{position: 'absolute', right: 57, top: 394, minWidth: 110, textAlign: 'center', background: ibrahimTalking ? COLORS.blue : '#334155', color: 'white', padding: '6px 12px', borderRadius: 9, border: '2px solid white', fontWeight: 900, zIndex: 10}}>İbrahim</div>
    {showCta && <div style={{position: 'absolute', left: 255, right: 255, bottom: 28, display: 'flex', gap: 18, zIndex: 20}}><div style={{flex: 1, background: COLORS.red, color: 'white', padding: '13px 18px', borderRadius: 14, textAlign: 'center', fontSize: 23, fontWeight: 900, boxShadow: '0 7px 15px rgba(0,0,0,0.18)'}}>♥ BEĞEN</div><div style={{flex: 1, background: COLORS.blue, color: 'white', padding: '13px 18px', borderRadius: 14, textAlign: 'center', fontSize: 21, fontWeight: 900, boxShadow: '0 7px 15px rgba(0,0,0,0.18)'}}>✓ ABONE OL</div></div>}
    <Audio src={staticFile(`audio/matematik/nokta/${scene.id}.mp3`)}/>
  </AbsoluteFill>;
};

export const Nokta: React.FC = () => <AbsoluteFill>{scenes.map((scene, index) => <Sequence key={scene.id} from={Math.round(scenes.slice(0, index).reduce((sum, previous) => sum + previous.totalSec, 0) * 30)} durationInFrames={Math.round(scene.totalSec * 30)}><SceneView scene={scene}/></Sequence>)}</AbsoluteFill>;

export const NoktaConfig = {id: 'Nokta', fps: 30, width: 960, height: 540, durationInFrames: Math.round(scenes.reduce((sum, scene) => sum + scene.totalSec, 0) * 30)};
