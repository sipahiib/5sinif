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
import timings from './haklar_timings.json';

type Speaker = 'filiz' | 'ibrahim';
type VisualKind =
  | 'balance'
  | 'initiative'
  | 'roleMap'
  | 'familyRights'
  | 'familyDuty'
  | 'schoolRights'
  | 'schoolDuty'
  | 'harmony';

type SceneData = {
  id: keyof typeof timings;
  title: string;
  eyebrow: string;
  focus: string;
  points: string[];
  speaker: Speaker;
  visual: VisualKind;
};

const scenes: SceneData[] = [
  {
    id: '01',
    title: 'HAKLARIM VE SORUMLULUKLARIM',
    eyebrow: 'Birlikte Yaşamak',
    focus: 'Hak kazanımdır, sorumluluk görevdir',
    points: ['Haklarımız bize yetki ve özgürlük sağlar.', 'Sorumluluklarımız görevlerimizi gösterir.', 'İkisini bilmek sağlıklı ilişkiler kurdurur.'],
    speaker: 'filiz',
    visual: 'balance',
  },
  {
    id: '02',
    title: 'SORUMLULUK BİLİNCİ',
    eyebrow: 'Kendiliğinden Harekete Geçmek',
    focus: 'Görevimizi hatırlatılmadan yaparız',
    points: ['İşi zamanında ve özenle tamamlarız.', 'Kararlarımızın sonucunu düşünürüz.', 'Sorumluluk duygusu eğitimle gelişir.'],
    speaker: 'ibrahim',
    visual: 'initiative',
  },
  {
    id: '03',
    title: 'ROL, HAK VE SORUMLULUK',
    eyebrow: 'Bir Rolün İki Yüzü',
    focus: 'Her rol hak ve sorumluluk getirir',
    points: ['Çocuk rolü → dinlenme hakkı', 'Çocuk rolü → odasını toplama görevi', 'Öğrenci rolü → eğitim ve çalışma dengesi'],
    speaker: 'filiz',
    visual: 'roleMap',
  },
  {
    id: '04',
    title: 'AİLEDEKİ HAKLARIMIZ',
    eyebrow: 'Güvenli ve Değerli Hissetmek',
    focus: 'Aile içinde sözümüz ve ihtiyaçlarımız önemlidir',
    points: ['Düşüncelerimizin dikkate alınması', 'Temel ihtiyaçlarımızın karşılanması', 'Sorunlarımızın çözümünde destek görmek'],
    speaker: 'ibrahim',
    visual: 'familyRights',
  },
  {
    id: '05',
    title: 'AİLEDEKİ SORUMLULUKLARIMIZ',
    eyebrow: 'Evde İş Birliği',
    focus: 'Küçük görevler büyük güven oluşturur',
    points: ['Odamızı düzenli ve temiz tutmak', 'Ailemize yardım etmek ve tutumlu olmak', 'Kardeşlerimize iyi örnek olmak'],
    speaker: 'filiz',
    visual: 'familyDuty',
  },
  {
    id: '06',
    title: 'OKULDAKİ HAKLARIMIZ',
    eyebrow: 'Öğrenci Olmak',
    focus: 'Herkes eşit ve güvenli biçimde öğrenir',
    points: ['Güvenli ve sağlıklı ortamda bulunmak', 'Fikir söylemek ve soru sormak', 'Etkinliklere ve oyunlara katılmak'],
    speaker: 'ibrahim',
    visual: 'schoolRights',
  },
  {
    id: '07',
    title: 'OKULDAKİ SORUMLULUKLARIMIZ',
    eyebrow: 'Saygılı ve Düzenli Okul',
    focus: 'Haklarımızı sorumluluklarımız korur',
    points: ['Derslerimize düzenli çalışmak', 'Kurallara uymak ve haklara saygı duymak', 'Araç ve gereçleri özenli kullanmak'],
    speaker: 'filiz',
    visual: 'schoolDuty',
  },
  {
    id: '08',
    title: 'BİRLİKTE UYUMLU YAŞARIZ',
    eyebrow: 'Dersi Tamamladın',
    focus: 'Hak + sorumluluk = güvenli ortak yaşam',
    points: ['Kendi hakkımızı biliriz.', 'Başkalarının hakkına saygı gösteririz.', 'Görevlerimizi zamanında yerine getiririz.'],
    speaker: 'ibrahim',
    visual: 'harmony',
  },
];

const palette = {
  navy: '#173B66',
  blue: '#2D78BE',
  red: '#C84F5A',
  coral: '#F08A7E',
  amber: '#F4B83E',
  mint: '#2EA77C',
  violet: '#8C66B4',
  ink: '#17283A',
  muted: '#56687A',
  paleBlue: '#EDF6FD',
  paleRed: '#FFF0F0',
  paleMint: '#ECF8F3',
};

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

const Background: React.FC<{index: number}> = ({index}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background: 'linear-gradient(135deg, #F8FCFF 0%, #FFFFFF 52%, #FFF7F2 100%)', overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: -150 + Math.sin(frame / 35) * 10, top: 65, width: 330, height: 330, borderRadius: '50%', background: 'rgba(45,120,190,0.055)', filter: 'blur(2px)'}}/>
    <div style={{position: 'absolute', right: -120 + Math.cos(frame / 42) * 12, top: 120, width: 310, height: 310, borderRadius: '50%', background: 'rgba(200,79,90,0.055)', filter: 'blur(2px)'}}/>
    {Array.from({length: 9}, (_, i) => <div key={i} style={{position: 'absolute', left: 32 + ((i * 137 + index * 29) % 890), top: 82 + ((i * 83) % 390), width: 5 + (i % 3) * 2, height: 5 + (i % 3) * 2, borderRadius: i % 2 ? 2 : '50%', background: i % 3 === 0 ? 'rgba(244,184,62,0.30)' : i % 3 === 1 ? 'rgba(45,120,190,0.18)' : 'rgba(200,79,90,0.18)', transform: `translateY(${Math.sin(frame / 18 + i) * 7}px) rotate(${frame * (i % 2 ? 0.35 : -0.25)}deg)`}}/>)}
  </AbsoluteFill>;
};

const VisualShell: React.FC<{children: React.ReactNode; accent?: string}> = ({children, accent = palette.navy}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 7, fps, config: {damping: 15, stiffness: 96}});
  return <div style={{position: 'absolute', inset: 0, borderRadius: 22, background: '#FFFFFF', border: `3px solid ${accent}`, boxShadow: '0 18px 38px rgba(23,59,102,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transform: `translateY(${(1 - enter) * 18}px) scale(${0.96 + enter * 0.04})`, opacity: enter}}>
    <div style={{position: 'absolute', width: 155, height: 155, borderRadius: '50%', right: -55, top: -55, background: `${accent}12`}}/>
    {children}
  </div>;
};

const SceneVisual: React.FC<{kind: VisualKind}> = ({kind}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dash = 170 - (frame * 2.2) % 170;
  const bob = (offset: number) => Math.sin(frame / 13 + offset) * 3;
  const pop = (delay: number) => 0.72 + spring({frame: frame - delay, fps, config: {damping: 12, stiffness: 125}}) * 0.28;

  if (kind === 'balance') {
    const tilt = Math.sin(frame / 22) * 2.2;
    return <VisualShell accent={palette.amber}><svg viewBox="0 0 280 235" width="276" height="235">
      <g transform={`rotate(${tilt} 140 105)`}>
        <path d="M62 86 H218" stroke={palette.navy} strokeWidth="8" strokeLinecap="round"/>
        <path d="M78 89 L55 143 M202 89 L225 143" stroke={palette.navy} strokeWidth="3"/>
        <path d="M31 143 Q55 175 79 143Z" fill={palette.paleBlue} stroke={palette.blue} strokeWidth="3"/>
        <path d="M201 143 Q225 175 249 143Z" fill={palette.paleRed} stroke={palette.red} strokeWidth="3"/>
        <text x="55" y="139" textAnchor="middle" fill={palette.blue} fontSize="13" fontWeight="900">HAK</text>
        <text x="225" y="139" textAnchor="middle" fill={palette.red} fontSize="11" fontWeight="900">SORUMLULUK</text>
      </g>
      <path d="M140 55 V184" stroke={palette.navy} strokeWidth="9" strokeLinecap="round"/>
      <circle cx="140" cy="82" r="14" fill={palette.amber} stroke="#FFFFFF" strokeWidth="4"/>
      <path d="M105 191 H175" stroke={palette.navy} strokeWidth="12" strokeLinecap="round"/>
      <text x="140" y="222" textAnchor="middle" fill={palette.navy} fontSize="13" fontWeight="900">DENGE BİRLİKTE KURULUR</text>
    </svg></VisualShell>;
  }
  if (kind === 'initiative') {
    const hand = interpolate(frame, [8, 28, 45], [0, -10, 0], {...clamp, easing: Easing.inOut(Easing.cubic)});
    const progress = interpolate(frame, [14, 52], [0, 1], clamp);
    return <VisualShell accent={palette.blue}><svg viewBox="0 0 280 235" width="276" height="235">
      <circle cx="140" cy="102" r="68" fill={palette.paleBlue} stroke="#C7E1F5" strokeWidth="3"/>
      <circle cx="140" cy="102" r="45" fill="#FFFFFF" stroke={palette.blue} strokeWidth="6"/>
      <path d="M140 102 L140 70 M140 102 L167 114" stroke={palette.navy} strokeWidth="7" strokeLinecap="round"/>
      <path d="M140 33 A69 69 0 0 1 207 99" fill="none" stroke={palette.mint} strokeWidth="8" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - progress}/>
      <g transform={`translate(195 ${57 + hand}) rotate(-18)`}>
        <path d="M0 31 C15 7 35 7 46 23 C36 22 29 29 25 42Z" fill={palette.coral}/>
        <circle cx="43" cy="20" r="8" fill={palette.amber}/>
      </g>
      <rect x="47" y="183" width="186" height="38" rx="13" fill={palette.navy}/>
      <text x="140" y="207" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">BEKLEMEDEN HAREKETE GEÇ</text>
    </svg></VisualShell>;
  }
  if (kind === 'roleMap') {
    const nodes = [
      {x: 50, y: 55, label: 'ÇOCUK', color: palette.red},
      {x: 230, y: 55, label: 'ÖĞRENCİ', color: palette.blue},
      {x: 50, y: 183, label: 'HAK', color: palette.mint},
      {x: 230, y: 183, label: 'GÖREV', color: palette.violet},
    ];
    return <VisualShell accent={palette.violet}><svg viewBox="0 0 280 235" width="276" height="235">
      <path d="M72 69 L119 102 M208 69 L161 102 M72 169 L119 132 M208 169 L161 132" fill="none" stroke="#C6D6E4" strokeWidth="4" strokeDasharray="8 7" strokeDashoffset={dash}/>
      <circle cx="140" cy="117" r="43" fill="#FFF8E8" stroke={palette.amber} strokeWidth="4"/>
      <text x="140" y="112" textAnchor="middle" fill={palette.navy} fontSize="15" fontWeight="900">BENİM</text>
      <text x="140" y="130" textAnchor="middle" fill={palette.navy} fontSize="15" fontWeight="900">ROLLERİM</text>
      {nodes.map((node, i) => <g key={node.label} transform={`translate(${node.x} ${node.y + bob(i)}) scale(${pop(5 + i * 6)})`}>
        <circle r="34" fill="#FFFFFF" stroke={node.color} strokeWidth="4"/>
        <text y="5" textAnchor="middle" fill={node.color} fontSize="11" fontWeight="900">{node.label}</text>
      </g>)}
    </svg></VisualShell>;
  }
  if (kind === 'familyRights') {
    const wave = Math.sin(frame / 9) * 5;
    return <VisualShell accent={palette.red}><svg viewBox="0 0 280 235" width="276" height="235">
      <path d="M45 104 L140 34 L235 104 V206 H45Z" fill={palette.paleRed} stroke={palette.red} strokeWidth="4" strokeLinejoin="round"/>
      <rect x="111" y="145" width="58" height="61" rx="8" fill="#FFFFFF" stroke={palette.red} strokeWidth="3"/>
      <circle cx="87" cy="124" r="25" fill="#FFFFFF" stroke={palette.blue} strokeWidth="3"/>
      <circle cx="193" cy="124" r="25" fill="#FFFFFF" stroke={palette.mint} strokeWidth="3"/>
      <path d="M75 125 Q87 135 99 125 M181 125 Q193 135 205 125" fill="none" stroke={palette.navy} strokeWidth="3" strokeLinecap="round"/>
      <g transform={`translate(${wave} 0)`}><path d="M118 86 Q140 66 162 86 Q162 108 140 120 Q118 108 118 86Z" fill={palette.coral}/></g>
      <text x="140" y="226" textAnchor="middle" fill={palette.navy} fontSize="13" fontWeight="900">DİNLENİRİM • DESTEKLENİRİM</text>
    </svg></VisualShell>;
  }
  if (kind === 'familyDuty') {
    const sparkle = (frame * 3) % 45;
    return <VisualShell accent={palette.mint}><svg viewBox="0 0 280 235" width="276" height="235">
      <rect x="32" y="48" width="216" height="142" rx="18" fill={palette.paleMint} stroke={palette.mint} strokeWidth="4"/>
      <rect x="51" y="76" width="88" height="70" rx="10" fill="#FFFFFF" stroke={palette.blue} strokeWidth="3"/>
      <path d="M51 113 H139 M95 76 V146" stroke="#D5E7F5" strokeWidth="3"/>
      <rect x="163" y="99" width="52" height="47" rx="7" fill="#FFF8E8" stroke={palette.amber} strokeWidth="3"/>
      <path d="M172 98 Q189 67 206 98" fill="none" stroke={palette.amber} strokeWidth="5"/>
      <path d="M62 170 H218" stroke={palette.navy} strokeWidth="5" strokeLinecap="round"/>
      {[0, 1, 2].map((i) => <g key={i} transform={`translate(${66 + i * 55} ${169 - Math.abs((sparkle - i * 12) % 45 - 22) / 7}) scale(${pop(6 + i * 7)})`}><path d="M0 -9 L3 -3 L9 0 L3 3 L0 9 L-3 3 L-9 0 L-3 -3Z" fill={i === 1 ? palette.red : palette.amber}/></g>)}
      <rect x="50" y="201" width="180" height="27" rx="10" fill={palette.navy}/>
      <text x="140" y="219" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="900">DÜZEN • YARDIM • TASARRUF</text>
    </svg></VisualShell>;
  }
  if (kind === 'schoolRights') {
    const orbit = frame * 0.7;
    return <VisualShell accent={palette.blue}><svg viewBox="0 0 280 235" width="276" height="235">
      <path d="M57 92 L140 38 L223 92 V199 H57Z" fill={palette.paleBlue} stroke={palette.blue} strokeWidth="4"/>
      <rect x="122" y="139" width="36" height="60" rx="6" fill="#FFFFFF" stroke={palette.blue} strokeWidth="3"/>
      <path d="M83 112 H112 V139 H83Z M168 112 H197 V139 H168Z" fill="#FFFFFF" stroke={palette.blue} strokeWidth="3"/>
      <rect x="95" y="66" width="90" height="32" rx="11" fill={palette.navy}/><text x="140" y="87" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">OKULUM</text>
      <g transform={`rotate(${orbit} 140 116)`}><circle cx="140" cy="26" r="13" fill={palette.amber}/><circle cx="140" cy="206" r="13" fill={palette.red}/></g>
      <path d="M39 211 H241" stroke={palette.mint} strokeWidth="7" strokeLinecap="round"/>
      <text x="140" y="231" textAnchor="middle" fill={palette.navy} fontSize="11" fontWeight="900">GÜVENLİ • EŞİT • KATILIMCI</text>
    </svg></VisualShell>;
  }
  if (kind === 'schoolDuty') {
    const checks = [palette.blue, palette.red, palette.mint];
    return <VisualShell accent={palette.navy}><svg viewBox="0 0 280 235" width="276" height="235">
      <rect x="46" y="30" width="188" height="180" rx="18" fill="#FFFFFF" stroke={palette.navy} strokeWidth="4"/>
      <rect x="95" y="20" width="90" height="27" rx="10" fill={palette.amber}/>
      {[0, 1, 2].map((i) => {
        const draw = interpolate(frame, [8 + i * 12, 24 + i * 12], [0, 1], clamp);
        const y = 77 + i * 52;
        return <g key={i}>
          <rect x="65" y={y - 16} width="32" height="32" rx="8" fill={`${checks[i]}18`} stroke={checks[i]} strokeWidth="3"/>
          <path d={`M72 ${y} L80 ${y + 8} L93 ${y - 8}`} fill="none" stroke={checks[i]} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - draw}/>
          <rect x="112" y={y - 9} width={88 + i * 12} height="8" rx="4" fill="#D8E3EC"/>
          <rect x="112" y={y + 7} width={67 + i * 14} height="6" rx="3" fill="#EDF2F6"/>
        </g>;
      })}
      <text x="140" y="229" textAnchor="middle" fill={palette.navy} fontSize="12" fontWeight="900">ÇALIŞ • SAYGI DUY • KORU</text>
    </svg></VisualShell>;
  }

  const ring = interpolate(frame, [4, 50], [0, 1], clamp);
  return <VisualShell accent={palette.amber}><svg viewBox="0 0 280 235" width="276" height="235">
    <circle cx="140" cy="108" r="76" fill="#FFF8E8" stroke="#F8D98C" strokeWidth="3" strokeDasharray="8 8" transform={`rotate(${frame * 0.35} 140 108)`}/>
    <circle cx="140" cy="108" r="53" fill="#FFFFFF" stroke={palette.mint} strokeWidth="7" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - ring}/>
    <path d="M108 109 L130 132 L174 82" fill="none" stroke={palette.mint} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - ring}/>
    {[0, 1, 2, 3].map((i) => <circle key={i} cx={140 + Math.cos(frame / 25 + i * Math.PI / 2) * 96} cy={108 + Math.sin(frame / 25 + i * Math.PI / 2) * 72} r="9" fill={[palette.red, palette.blue, palette.violet, palette.amber][i]}/>) }
    <rect x="50" y="193" width="180" height="34" rx="12" fill={palette.navy}/>
    <text x="140" y="215" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="900">GÜVEN • SAYGI • UYUM</text>
  </svg></VisualShell>;
};

const Header: React.FC<{scene: SceneData; index: number}> = ({scene, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 17, stiffness: 100}});
  return <div style={{position: 'absolute', inset: '0 0 auto 0', height: 72, display: 'flex', alignItems: 'center', padding: '0 30px', background: 'rgba(255,255,255,0.96)', borderBottom: `4px solid ${palette.red}`, boxShadow: '0 6px 20px rgba(23,59,102,0.08)', zIndex: 30}}>
    <div style={{width: 146, borderRadius: 10, padding: '8px 9px', background: palette.navy, color: '#FFFFFF', textAlign: 'center', fontSize: 11.5, lineHeight: 1.05, fontWeight: 950}}>5. SINIF<br/>SOSYAL BİLGİSİ</div>
    <div style={{marginLeft: 20, transform: `translateX(${(1 - enter) * -18}px)`, opacity: enter}}>
      <div style={{fontSize: 10.5, letterSpacing: 1.5, color: palette.red, fontWeight: 950}}>{scene.eyebrow.toLocaleUpperCase('tr-TR')}</div>
      <div style={{fontSize: scene.title.length > 26 ? 20.5 : 23, color: palette.navy, fontWeight: 950, letterSpacing: 0.2}}>{scene.title}</div>
    </div>
    <div style={{marginLeft: 'auto', width: 44, height: 44, borderRadius: '50%', background: palette.paleRed, color: palette.red, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 950}}>{index + 1}</div>
  </div>;
};

const InfoCard: React.FC<{scene: SceneData; final: boolean}> = ({scene, final}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame: frame - 3, fps, config: {damping: 16, stiffness: 100}});
  return <div style={{position: 'absolute', inset: 0, borderRadius: 22, border: '2px solid #D7E4EF', background: 'rgba(255,255,255,0.98)', boxShadow: '0 18px 40px rgba(23,59,102,0.13)', padding: final ? '21px 22px 16px' : '21px 20px 16px', transform: `translateY(${(1 - enter) * 14}px) scale(${0.98 + enter * 0.02})`, opacity: enter, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: -30, top: -45, width: 130, height: 130, borderRadius: '50%', background: 'rgba(200,79,90,0.05)'}}/>
    <div style={{position: 'relative', fontSize: final ? 19 : 20, lineHeight: 1.17, color: palette.navy, fontWeight: 950, marginBottom: 13}}>{scene.focus}</div>
    <div style={{display: 'grid', gap: 9}}>
      {scene.points.map((point, i) => {
        const item = spring({frame: frame - 9 - i * 8, fps, config: {damping: 15, stiffness: 112}});
        const color = i === 0 ? palette.red : i === 1 ? palette.blue : palette.mint;
        return <div key={point} style={{minHeight: final ? 46 : 49, display: 'flex', alignItems: 'center', padding: '8px 10px', borderRadius: 12, borderLeft: `6px solid ${color}`, background: i === 0 ? palette.paleRed : i === 1 ? palette.paleBlue : palette.paleMint, color: palette.ink, fontSize: final ? 13 : 13.4, lineHeight: 1.2, fontWeight: 850, transform: `translateX(${(1 - item) * 15}px)`, opacity: item}}>
          <span style={{width: 23, height: 23, flex: '0 0 23px', marginRight: 9, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', background: color, fontSize: 12, fontWeight: 950}}>{i + 1}</span>{point}
        </div>;
      })}
    </div>
  </div>;
};

const SpeakerTag: React.FC<{speaker: Speaker; active: boolean}> = ({speaker, active}) => {
  const filiz = speaker === 'filiz';
  return <div style={{position: 'absolute', left: filiz ? 47 : undefined, right: filiz ? undefined : 47, top: 402, width: 130, height: 35, borderRadius: 12, background: active ? (filiz ? palette.red : palette.blue) : '#718093', color: '#FFFFFF', border: '3px solid #FFFFFF', boxShadow: '0 5px 14px rgba(23,59,102,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, zIndex: 30, fontSize: 14, fontWeight: 950}}>
    {active && <span style={{width: 8, height: 8, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 0 0 4px rgba(255,255,255,0.22)'}}/>}{filiz ? 'Filiz' : 'İbrahim'}
  </div>;
};

const CTA: React.FC<{start: number}> = ({start}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < start) return null;
  const like = spring({frame: frame - start, fps, config: {damping: 11, stiffness: 145}});
  const sub = spring({frame: frame - start - 7, fps, config: {damping: 11, stiffness: 145}});
  const shine = interpolate((frame - start) % 58, [0, 58], [-70, 470]);
  const Button = ({label, icon, color, scale}: {label: string; icon: string; color: string; scale: number}) => <div style={{position: 'relative', overflow: 'hidden', width: label === 'BEĞEN' ? 182 : 213, height: 58, borderRadius: 17, background: color, color: '#FFFFFF', border: '3px solid #FFFFFF', boxShadow: '0 10px 26px rgba(23,59,102,0.27)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 11, fontSize: 20, fontWeight: 950, transform: `scale(${scale})`}}><span style={{fontSize: 25}}>{icon}</span>{label}<div style={{position: 'absolute', left: shine, top: -25, width: 30, height: 110, background: 'rgba(255,255,255,0.25)', transform: 'rotate(20deg)'}}/></div>;
  return <div style={{position: 'absolute', left: 0, right: 0, bottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, zIndex: 80}}>
    <Button label="BEĞEN" icon="♥" color={palette.red} scale={like}/><Button label="ABONE OL" icon="▶" color={palette.blue} scale={sub}/>
  </div>;
};

const Scene: React.FC<{scene: SceneData; index: number}> = ({scene, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const timing = timings[scene.id];
  const splitFrame = Math.round(timing.split_sec * fps);
  const speechEnd = Math.round(timing.speech_end_sec * fps);
  const totalFrames = Math.round(timing.total_sec * fps);
  const active = frame < speechEnd;
  const final = scene.id === '08';
  const leftSpeaker = scene.speaker === 'filiz';
  const info = final ? {left: 205, top: 91, width: 350, height: 302} : {left: leftSpeaker ? 194 : 346, top: 92, width: 421, height: 302};
  const visual = final ? {left: 566, top: 116, width: 220, height: 252} : {left: leftSpeaker ? 630 : 39, top: 116, width: 291, height: 252};
  const progress = interpolate(frame, [0, totalFrames], [0, 1], clamp);

  return <AbsoluteFill style={{fontFamily: 'Trebuchet MS, Arial, sans-serif', color: palette.ink, overflow: 'hidden'}}>
    <Background index={index}/><Header scene={scene} index={index}/>
    <div style={{position: 'absolute', ...info, zIndex: 12}}><InfoCard scene={scene} final={final}/></div>
    <div style={{position: 'absolute', ...visual, zIndex: 11}}><SceneVisual kind={scene.visual}/></div>

    <GifCharacter name={scene.speaker} x={leftSpeaker ? 112 : 848} y={104} scale={1.05} flip={!leftSpeaker} animate={active}/>
    <SpeakerTag speaker={scene.speaker} active={active}/>
    {final && scene.speaker !== 'filiz' && <><GifCharacter name="filiz" x={112} y={104} scale={1.05} animate={false}/><SpeakerTag speaker="filiz" active={false}/></>}

    <div style={{position: 'absolute', left: final ? 205 : leftSpeaker ? 194 : 30, right: final ? 205 : leftSpeaker ? 30 : 194, top: 414, height: 35, display: 'flex', alignItems: 'center', zIndex: 8}}>
      <div style={{height: 2, flex: 1, background: '#D6E1EA'}}/><div style={{margin: '0 14px', color: palette.muted, fontSize: 10.5, letterSpacing: 1, fontWeight: 900}}>HAKLARIM VE SORUMLULUKLARIM</div><div style={{height: 2, flex: 1, background: '#D6E1EA'}}/>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 14, background: `linear-gradient(90deg, ${palette.navy}, ${palette.blue} 45%, ${palette.red})`, zIndex: 90}}><div style={{height: '100%', width: `${progress * 100}%`, background: palette.amber}}/></div>
    <Audio src={staticFile(`audio/sosyal/haklar/${scene.id}_1.mp3`)}/>
    <Sequence from={splitFrame}><Audio src={staticFile(`audio/sosyal/haklar/${scene.id}_2.mp3`)}/></Sequence>
    {final && <CTA start={totalFrames - 150}/>} 
  </AbsoluteFill>;
};

const sceneFrames = (scene: SceneData) => Math.round(timings[scene.id].total_sec * 30);
const sceneStart = (index: number) => scenes.slice(0, index).reduce((sum, scene) => sum + sceneFrames(scene), 0);

export const Haklar: React.FC = () => <AbsoluteFill style={{background: '#FFFFFF'}}>
  {scenes.map((scene, index) => <Sequence key={scene.id} from={sceneStart(index)} durationInFrames={sceneFrames(scene)}><Scene scene={scene} index={index}/></Sequence>)}
</AbsoluteFill>;

export const HaklarConfig = {
  id: 'Haklar',
  fps: 30,
  width: 960,
  height: 540,
  durationInFrames: scenes.reduce((sum, scene) => sum + sceneFrames(scene), 0),
};
