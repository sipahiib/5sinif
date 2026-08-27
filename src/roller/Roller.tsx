import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {GifCharacter} from '../GifCharacter';
import timings from './roller_timings.json';

type Speaker = 'filiz' | 'ibrahim';
type VisualKind = 'group' | 'criteria' | 'examples' | 'role' | 'hasan' | 'conflict' | 'timeline' | 'summary';

type SceneData = {
  id: keyof typeof timings;
  title: string;
  eyebrow: string;
  focus: string;
  points: string[];
  visual: VisualKind;
  firstSpeaker: Speaker;
};

const scenes: SceneData[] = [
  {
    id: '01',
    title: 'GRUP NEDİR?',
    eyebrow: 'Birlikte Yaşamak',
    focus: 'Ortak amaçla bir araya geliriz',
    points: [
      'Grup, en az iki kişiden oluşur.',
      'Üyeler belirli bir amaç çevresinde toplanır.',
      'Kurallara göre hareket eder ve ilişki kurarlar.',
    ],
    visual: 'group',
    firstSpeaker: 'filiz',
  },
  {
    id: '02',
    title: 'BİR TOPLULUĞU GRUP YAPAN NEDİR?',
    eyebrow: 'Grubun Temel Özellikleri',
    focus: 'Üç koşul birlikte bulunur',
    points: ['Ortak amaç', 'İş birliği ve görev dağılımı', 'Karşılıklı sosyal ilişki'],
    visual: 'criteria',
    firstSpeaker: 'ibrahim',
  },
  {
    id: '03',
    title: 'HAYATIMIZDAKİ GRUPLAR',
    eyebrow: 'Günlük Yaşamdan Örnekler',
    focus: 'Birçok grubun üyesiyiz',
    points: ['Aile ve sınıf', 'Mahalle, iş yeri ve spor takımı', 'Kulüpler ve halk oyunları ekibi'],
    visual: 'examples',
    firstSpeaker: 'filiz',
  },
  {
    id: '04',
    title: 'GRUPLARDAKİ ROLLERİMİZ',
    eyebrow: 'Görev ve Sorumluluk',
    focus: 'Rol, grup içindeki görevimizdir',
    points: [
      'Her üye üzerine düşen görevi yerine getirir.',
      'Roller grubun amacına göre değişir.',
      'Aynı kişi farklı gruplarda farklı roller üstlenir.',
    ],
    visual: 'role',
    firstSpeaker: 'ibrahim',
  },
  {
    id: '05',
    title: 'HASAN’IN FARKLI ROLLERİ',
    eyebrow: 'Bir Kişi, Birçok Rol',
    focus: 'Bulunduğumuz grup rolümüzü etkiler',
    points: ['Evde → çocuk', 'Okulda → öğrenci', 'Halk oyunlarında → oyuncu'],
    visual: 'hasan',
    firstSpeaker: 'filiz',
  },
  {
    id: '06',
    title: 'ROL ÇATIŞMASI',
    eyebrow: 'Roller Karıştırılırsa',
    focus: 'Her rolün davranışı farklıdır',
    points: [
      'Farklı gruplardaki roller birbirine karıştırılabilir.',
      'Bu durum rol çatışması olarak adlandırılır.',
      'Doktor rolü ile anne rolü aynı davranışları gerektirmez.',
    ],
    visual: 'conflict',
    firstSpeaker: 'ibrahim',
  },
  {
    id: '07',
    title: 'ROLLER ZAMANLA DEĞİŞİR',
    eyebrow: 'Dilek Hanım’ın Yaşamı',
    focus: 'Yaşam değiştikçe roller de değişir',
    points: ['Öğrenci ve koro üyesi', 'Voleybol takımı kaptanı', 'Öğretmen, eş ve anne'],
    visual: 'timeline',
    firstSpeaker: 'filiz',
  },
  {
    id: '08',
    title: 'HATIRLAYALIM',
    eyebrow: 'Dersi Tamamladın',
    focus: 'Grup + rol + sorumluluk',
    points: [
      'Grup üyeleri ortak amaçla hareket eder.',
      'Rol, grup içindeki görev ve sorumluluğumuzdur.',
      'Roller değişebilir; karıştırılması rol çatışmasıdır.',
    ],
    visual: 'summary',
    firstSpeaker: 'ibrahim',
  },
];

const palette = {
  navy: '#173B66',
  blue: '#2463A7',
  red: '#B74B54',
  coral: '#E67B73',
  amber: '#F2B84B',
  ink: '#182536',
  muted: '#516174',
  paleBlue: '#EDF5FC',
  paleRed: '#FDF0F0',
};

const Person: React.FC<{x: number; y: number; color: string; delay: number}> = ({x, y, color, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enterProgress = spring({frame: frame - delay, fps, config: {damping: 12, stiffness: 115}});
  const enter = 0.72 + enterProgress * 0.28;
  const bob = Math.sin((frame + delay) / 10) * 2;
  return (
    <g transform={`translate(${x} ${y + bob}) scale(${enter})`}>
      <circle cx="0" cy="-15" r="11" fill={color}/>
      <path d="M-18 24 Q-17 -2 0 -2 Q17 -2 18 24Z" fill={color}/>
      <path d="M-7 6 L0 13 L7 6" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
    </g>
  );
};

const AnimatedVisual: React.FC<{kind: VisualKind}> = ({kind}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const revealProgress = spring({frame: frame - 10, fps, config: {damping: 14, stiffness: 105}});
  const reveal = 0.72 + revealProgress * 0.28;
  const drift = Math.sin(frame / 16) * 3;
  const dash = 150 - (frame * 2.2) % 150;

  if (kind === 'examples') {
    const examples = [
      {label: 'AİLE', icon: '⌂', x: 57, y: 64, color: palette.red},
      {label: 'SINIF', icon: '✎', x: 163, y: 64, color: palette.blue},
      {label: 'TAKIM', icon: '★', x: 57, y: 164, color: '#2D9A7A'},
      {label: 'KULÜP', icon: '♫', x: 163, y: 164, color: '#9B6AC0'},
    ];
    return <svg viewBox="0 0 220 230" width="220" height="230">
      <path d="M57 64 H163 M57 164 H163 M57 64 L163 164 M163 64 L57 164" stroke="#D7E1EB" strokeWidth="2" strokeDasharray="5 6" strokeDashoffset={dash}/>
      {examples.map((item, i) => {
        const itemProgress = spring({frame: frame - 4 - i * 7, fps, config: {damping: 13, stiffness: 120}});
        const itemIn = 0.72 + itemProgress * 0.28;
        return <g key={item.label} transform={`translate(${item.x} ${item.y}) scale(${itemIn})`}>
          <circle r="39" fill="#FFFFFF" stroke={item.color} strokeWidth="3"/>
          <circle cy="-8" r="18" fill={item.color}/>
          <text y="-1" textAnchor="middle" fill="#FFFFFF" fontSize="21" fontWeight="900">{item.icon}</text>
          <text y="24" textAnchor="middle" fill={palette.ink} fontSize="11" fontWeight="900">{item.label}</text>
        </g>;
      })}
    </svg>;
  }
  if (kind === 'hasan') {
    const roles = [
      {label: 'ÇOCUK', x: 42, y: 54, color: palette.red},
      {label: 'ÖĞRENCİ', x: 178, y: 54, color: palette.blue},
      {label: 'OYUNCU', x: 110, y: 190, color: '#2D9A7A'},
    ];
    return <svg viewBox="0 0 220 230" width="220" height="230">
      <path d="M92 101 L55 72 M128 101 L165 72 M110 138 V166" fill="none" stroke={palette.amber} strokeWidth="4" strokeDasharray="7 6" strokeDashoffset={dash}/>
      <circle cx="110" cy="116" r="43" fill="#FFF8E8" stroke={palette.amber} strokeWidth="3"/>
      <Person x={110} y={126} color={palette.navy} delay={3}/>
      <text x="110" y="151" textAnchor="middle" fill={palette.navy} fontSize="11" fontWeight="900">HASAN</text>
      {roles.map((role, i) => {
        const roleProgress = spring({frame: frame - 9 - i * 8, fps, config: {damping: 14, stiffness: 115}});
        const roleIn = 0.72 + roleProgress * 0.28;
        return <g key={role.label} transform={`translate(${role.x} ${role.y}) scale(${roleIn})`}>
          <circle r="32" fill="#FFFFFF" stroke={role.color} strokeWidth="3"/>
          <text y="4" textAnchor="middle" fill={role.color} fontSize="10" fontWeight="900">{role.label}</text>
        </g>;
      })}
    </svg>;
  }
  if (kind === 'timeline') {
    const stages = [
      {label: 'ÖĞRENCİ', x: 34, color: palette.red},
      {label: 'KAPTAN', x: 85, color: '#9B6AC0'},
      {label: 'ÖĞRETMEN', x: 139, color: palette.blue},
      {label: 'ANNE', x: 190, color: '#2D9A7A'},
    ];
    const lineProgress = interpolate(frame, [5, 42], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return <svg viewBox="0 0 220 230" width="220" height="230">
      <text x="110" y="35" textAnchor="middle" fill={palette.navy} fontSize="14" fontWeight="900">DİLEK HANIM’IN ROLLERİ</text>
      <path d="M25 111 H195" stroke="#D7E1EB" strokeWidth="6" strokeLinecap="round"/>
      <path d="M25 111 H195" stroke={palette.amber} strokeWidth="6" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - lineProgress}/>
      {stages.map((stage, i) => {
        const stageProgress = spring({frame: frame - 8 - i * 10, fps, config: {damping: 13, stiffness: 115}});
        const stageIn = 0.72 + stageProgress * 0.28;
        return <g key={stage.label} transform={`translate(${stage.x} 111) scale(${stageIn})`}>
          <circle r="19" fill={stage.color} stroke="#FFFFFF" strokeWidth="4"/>
          <text y={i % 2 === 0 ? -31 : 39} textAnchor="middle" fill={stage.color} fontSize="9" fontWeight="900">{stage.label}</text>
        </g>;
      })}
      <rect x="47" y="176" width="126" height="34" rx="11" fill={palette.navy}/>
      <text x="110" y="198" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">ZAMANLA DEĞİŞİR</text>
    </svg>;
  }

  if (kind === 'group') {
    return <svg viewBox="0 0 220 230" width="220" height="230">
      <circle cx="110" cy="104" r="79" fill={palette.paleBlue} stroke="#B9D8F4" strokeWidth="2" strokeDasharray="6 7" transform={`rotate(${frame * 0.25} 110 104)`}/>
      <Person x={110} y={65} color={palette.red} delay={2}/><Person x={68} y={126} color={palette.blue} delay={7}/><Person x={152} y={126} color="#2D9A7A" delay={12}/>
      <path d="M94 80 L79 106 M126 80 L141 106 M89 129 H131" stroke={palette.amber} strokeWidth="4" strokeLinecap="round" strokeDasharray="7 6" strokeDashoffset={dash}/>
      <rect x="34" y="184" width="152" height="34" rx="12" fill={palette.navy}/>
      <text x="110" y="206" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="900">ORTAK AMAÇ</text>
    </svg>;
  }

  if (kind === 'criteria') {
    const labels = ['ORTAK AMAÇ', 'İŞ BİRLİĞİ', 'SOSYAL İLİŞKİ'];
    return <svg viewBox="0 0 220 230" width="220" height="230">
      {labels.map((label, i) => {
        const rawProgress = spring({frame: frame - 5 - i * 9, fps, config: {damping: 13, stiffness: 120}});
        const progress = 0.72 + rawProgress * 0.28;
        const y = 35 + i * 62;
        return <g key={label} transform={`translate(${(1 - progress) * 16} 0)`}>
          <circle cx="35" cy={y} r="17" fill={i === 0 ? palette.red : i === 1 ? palette.blue : '#2D9A7A'}/>
          <path d={`M27 ${y} L33 ${y + 6} L44 ${y - 7}`} fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="61" y={y - 18} width="132" height="36" rx="10" fill={i % 2 ? palette.paleBlue : palette.paleRed}/>
          <text x="127" y={y + 5} textAnchor="middle" fill={palette.ink} fontSize="12" fontWeight="900">{label}</text>
        </g>;
      })}
    </svg>;
  }

  if (kind === 'role') {
    return <svg viewBox="0 0 220 230" width="220" height="230">
      <circle cx="110" cy="78" r="36" fill={palette.paleBlue} stroke={palette.blue} strokeWidth="3"/>
      <Person x={110} y={88} color={palette.blue} delay={4}/>
      <path d="M83 122 C60 144 54 158 52 174 M110 124 V177 M137 122 C160 144 166 158 168 174" fill="none" stroke={palette.navy} strokeWidth="3" strokeDasharray="6 6" strokeDashoffset={dash}/>
      {['EV', 'OKUL', 'KULÜP'].map((label, i) => <g key={label} transform={`translate(${52 + i * 58} 190) scale(${reveal})`}>
        <circle r="25" fill={i === 0 ? palette.paleRed : i === 1 ? palette.paleBlue : '#ECF8F3'} stroke={i === 0 ? palette.red : i === 1 ? palette.blue : '#2D9A7A'} strokeWidth="2"/>
        <text y="4" textAnchor="middle" fill={palette.ink} fontSize="10" fontWeight="900">{label}</text>
      </g>)}
    </svg>;
  }

  if (kind === 'conflict') {
    const shake = Math.sin(frame * 0.7) * Math.max(0, interpolate(frame, [18, 32], [0, 4], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
    return <svg viewBox="0 0 220 230" width="220" height="230">
      <g transform={`translate(${shake} 0)`}>
        <rect x="18" y="43" width="77" height="95" rx="16" fill={palette.paleBlue} stroke={palette.blue} strokeWidth="3"/>
        <text x="56.5" y="78" textAnchor="middle" fontSize="26">🩺</text><text x="56.5" y="111" textAnchor="middle" fill={palette.navy} fontSize="14" fontWeight="900">DOKTOR</text>
        <rect x="125" y="43" width="77" height="95" rx="16" fill={palette.paleRed} stroke={palette.red} strokeWidth="3"/>
        <text x="163.5" y="78" textAnchor="middle" fontSize="26">🏠</text><text x="163.5" y="111" textAnchor="middle" fill={palette.red} fontSize="14" fontWeight="900">ANNE</text>
        <path d="M94 70 L126 111 M126 70 L94 111" stroke="#F2B84B" strokeWidth="8" strokeLinecap="round"/>
      </g>
      <rect x="34" y="166" width="152" height="42" rx="12" fill={palette.navy}/>
      <text x="110" y="192" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900">ROLLER KARIŞMASIN</text>
    </svg>;
  }

  return <svg viewBox="0 0 220 230" width="220" height="230">
    <circle cx="110" cy="102" r="72" fill="#FFF8E8" stroke={palette.amber} strokeWidth="3" strokeDasharray="7 7" transform={`rotate(${frame * 0.45} 110 102)`}/>
    <path d="M72 104 L97 129 L151 72" fill="none" stroke="#2D9A7A" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" transform={`translate(0 ${drift}) scale(${reveal})`} transformOrigin="110px 104px"/>
    <rect x="34" y="180" width="152" height="35" rx="12" fill={palette.navy}/>
    <text x="110" y="202" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900">BİRLİKTE YAŞAMAK</text>
  </svg>;
};

const Header: React.FC<{scene: SceneData; index: number}> = ({scene, index}) => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [0, 18], [-10, 0], {extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 70, background: '#FFFFFF', borderBottom: '4px solid #B74B54', display: 'flex', alignItems: 'center', padding: '0 30px', color: palette.navy, zIndex: 20, boxShadow: '0 5px 16px rgba(23,59,102,0.08)'}}>
    <div style={{width: 146, padding: '7px 9px', borderRadius: 9, background: palette.navy, color: '#FFFFFF', fontSize: 11.5, lineHeight: 1.08, textAlign: 'center', fontWeight: 900}}>5. SINIF<br/>SOSYAL BİLGİSİ</div>
    <div style={{marginLeft: 20, transform: `translateX(${slide}px)`}}>
      <div style={{fontSize: 11, letterSpacing: 1.4, color: palette.red, fontWeight: 900}}>{scene.eyebrow.toLocaleUpperCase('tr-TR')}</div>
      <div style={{fontSize: 23, letterSpacing: 0.2, fontWeight: 950}}>{scene.title}</div>
    </div>
    <div style={{marginLeft: 'auto', width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: palette.paleRed, color: palette.red, fontSize: 17, fontWeight: 950}}>{index + 1}</div>
  </div>;
};

const SpeakerTag: React.FC<{name: Speaker; active: boolean}> = ({name, active}) => {
  const isFiliz = name === 'filiz';
  return <div style={{position: 'absolute', left: isFiliz ? 48 : undefined, right: isFiliz ? undefined : 48, top: 398, width: 128, height: 34, borderRadius: 11, background: active ? (isFiliz ? palette.red : palette.blue) : '#728093', color: '#FFFFFF', border: '3px solid #FFFFFF', boxShadow: '0 4px 12px rgba(24,37,54,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontSize: 14, fontWeight: 950, zIndex: 25}}>
    {active && <span style={{width: 7, height: 7, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 0 0 4px rgba(255,255,255,0.22)'}}/>}
    {isFiliz ? 'Filiz' : 'İbrahim'}
  </div>;
};

const CTA: React.FC<{start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const like = spring({frame: frame - start, fps, config: {damping: 12, stiffness: 135}});
  const subscribe = spring({frame: frame - start - 7, fps, config: {damping: 12, stiffness: 135}});
  const shine = interpolate((frame - start) % 55, [0, 55], [-80, 270]);
  if (frame < start) return null;
  return <div style={{position: 'absolute', left: 205, right: 205, bottom: 20, height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, zIndex: 40}}>
    <div style={{position: 'relative', overflow: 'hidden', width: 190, height: 56, borderRadius: 15, background: '#E3484F', color: '#FFFFFF', transform: `scale(${like})`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: '3px solid #FFFFFF', boxShadow: '0 8px 20px rgba(183,75,84,0.3)', fontSize: 20, fontWeight: 950}}><span style={{fontSize: 25}}>♥</span> BEĞEN<div style={{position: 'absolute', top: -20, left: shine, width: 28, height: 100, background: 'rgba(255,255,255,0.24)', transform: 'rotate(20deg)'}}/></div>
    <div style={{position: 'relative', overflow: 'hidden', width: 205, height: 56, borderRadius: 15, background: palette.blue, color: '#FFFFFF', transform: `scale(${subscribe})`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, border: '3px solid #FFFFFF', boxShadow: '0 8px 20px rgba(36,99,167,0.3)', fontSize: 19, fontWeight: 950}}><span style={{fontSize: 23}}>▶</span> ABONE OL<div style={{position: 'absolute', top: -20, left: shine - 20, width: 28, height: 100, background: 'rgba(255,255,255,0.24)', transform: 'rotate(20deg)'}}/></div>
  </div>;
};

const Scene: React.FC<{scene: SceneData; index: number}> = ({scene, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const timing = timings[scene.id];
  const splitFrame = Math.round(timing.split_sec * fps);
  const secondEnd = Math.round((timing.total_sec - (scene.id === '08' ? 5 : 0.2)) * fps);
  const firstActive = frame < splitFrame;
  const secondActive = frame >= splitFrame && frame < secondEnd;
  const narratorTalking = firstActive || secondActive;
  const cardIn = spring({frame: frame - 4, fps, config: {damping: 16, stiffness: 105}});
  const visualIn = spring({frame: frame - 10, fps, config: {damping: 15, stiffness: 95}});
  const totalFrames = Math.round(timing.total_sec * fps);
  const isFinalScene = scene.id === '08';
  const narratorOnLeft = scene.firstSpeaker === 'filiz';
  const infoLeft = isFinalScene ? 193 : narratorOnLeft ? 193 : 347;
  const infoWidth = isFinalScene ? 348 : 420;
  const visualLeft = isFinalScene ? 555 : narratorOnLeft ? 630 : 40;
  const visualWidth = isFinalScene ? 220 : 290;
  const footerLeft = isFinalScene ? 205 : narratorOnLeft ? 193 : 30;
  const footerRight = isFinalScene ? 205 : narratorOnLeft ? 30 : 193;

  return <AbsoluteFill style={{background: '#FFFFFF', overflow: 'hidden', fontFamily: 'Trebuchet MS, Arial, sans-serif'}}>
    <Header scene={scene} index={index}/>

    <div style={{position: 'absolute', left: infoLeft, top: 92, width: infoWidth, height: 296, transform: `translateY(${(1 - cardIn) * 10}px) scale(${0.99 + cardIn * 0.01})`, borderRadius: 20, border: '2px solid #D8E4EF', background: '#FFFFFF', boxShadow: '0 15px 34px rgba(23,59,102,0.12)', padding: '20px 20px 16px', zIndex: 10}}>
      <div style={{fontSize: 20, lineHeight: 1.18, color: palette.navy, fontWeight: 950, marginBottom: 13}}>{scene.focus}</div>
      <div style={{display: 'grid', gap: 9}}>
        {scene.points.map((point, pointIndex) => {
          const pointIn = spring({frame: frame - 10 - pointIndex * 8, fps, config: {damping: 16, stiffness: 115}});
          return <div key={point} style={{minHeight: 48, display: 'flex', alignItems: 'center', transform: `translateX(${(1 - pointIn) * 10}px)`, padding: '8px 10px', borderRadius: 11, color: palette.ink, background: pointIndex % 2 === 0 ? palette.paleRed : palette.paleBlue, borderLeft: `6px solid ${pointIndex % 2 === 0 ? palette.red : palette.blue}`, fontSize: scene.id === '06' ? 12.5 : 13.5, lineHeight: 1.22, fontWeight: 850}}>
            <span style={{width: 22, height: 22, flex: '0 0 22px', marginRight: 9, borderRadius: '50%', color: '#FFFFFF', background: pointIndex % 2 === 0 ? palette.red : palette.blue, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 950}}>{pointIndex + 1}</span>{point}
          </div>;
        })}
      </div>
    </div>

    <div style={{position: 'absolute', left: visualLeft, top: 116, width: visualWidth, height: 248, transform: `translateX(${(1 - visualIn) * (narratorOnLeft ? 12 : -12)}px) scale(${0.99 + visualIn * 0.01})`, borderRadius: 20, background: '#FFFFFF', border: `3px solid ${scene.visual === 'conflict' ? palette.red : palette.navy}`, boxShadow: '0 15px 32px rgba(23,59,102,0.13)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', zIndex: 9}}>
      <AnimatedVisual kind={scene.visual}/>
    </div>

    <div style={{position: 'absolute', left: footerLeft, right: footerRight, top: 407, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 8}}>
      <div style={{height: 2, flex: 1, background: '#D7E1EB'}}/><div style={{margin: '0 15px', color: palette.muted, fontSize: 11, fontWeight: 900, letterSpacing: 1}}>GRUPLAR VE ROLLERİMİZ</div><div style={{height: 2, flex: 1, background: '#D7E1EB'}}/>
    </div>

    <GifCharacter name={scene.firstSpeaker} x={scene.firstSpeaker === 'filiz' ? 112 : 848} y={102} scale={1.02} flip={scene.firstSpeaker === 'ibrahim'} animate={narratorTalking}/>
    <SpeakerTag name={scene.firstSpeaker} active={narratorTalking}/>
    {isFinalScene && <><GifCharacter name="filiz" x={112} y={102} scale={1.02} animate={false}/><SpeakerTag name="filiz" active={false}/></>}

    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 14, background: `linear-gradient(90deg, ${palette.navy} 0 50%, ${palette.red} 50% 100%)`}}/>
    <Audio src={staticFile(`audio/sosyal/roller/${scene.id}_1.mp3`)}/>
    <Sequence from={splitFrame}><Audio src={staticFile(`audio/sosyal/roller/${scene.id}_2.mp3`)}/></Sequence>
    {scene.id === '08' && <CTA start={totalFrames - 150}/>} 
  </AbsoluteFill>;
};

const sceneDuration = (scene: SceneData) => Math.round(timings[scene.id].total_sec * 30);
const sceneStart = (index: number) => scenes.slice(0, index).reduce((sum, scene) => sum + sceneDuration(scene), 0);

export const Roller: React.FC = () => <AbsoluteFill style={{background: '#FFFFFF'}}>
  {scenes.map((scene, index) => <Sequence key={scene.id} from={sceneStart(index)} durationInFrames={sceneDuration(scene)}><Scene scene={scene} index={index}/></Sequence>)}
</AbsoluteFill>;

export const RollerConfig = {
  id: 'Roller',
  fps: 30,
  width: 960,
  height: 540,
  durationInFrames: scenes.reduce((sum, scene) => sum + sceneDuration(scene), 0),
};
