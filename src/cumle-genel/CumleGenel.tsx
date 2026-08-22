import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {Minecraftfiliz, Minecraftibrahim} from '../MinecraftCharacter';
import timings from './cumle_genel_timings.json';

type Scene = {
  id: string;
  title: string;
  image: string;
  firstSpeaker: 'filiz' | 'ibrahim';
  splitSec: number;
  totalSec: number;
  audio: string;
  focus: string;
  points: string[];
};

const sceneTexts = [
  {id: '01', title: 'Cümle nedir?', image: 'cumle-genel.jpg', focus: 'Cümle', points: ['Bir düşünceyi, duyguyu, dileği veya haberi anlatır.', 'Anlamlı ve kurallı bir sözcük dizisidir.']},
  {id: '02', title: 'Cümlenin konusu', image: 'cumle-genel.jpg', focus: 'Konu', points: ['Cümlenin genelinde üzerinde durulan düşünce veya duygudur.', '“Bu cümlede neyden söz ediliyor?” sorusunu sorarız.']},
  {id: '03', title: 'Ana düşünceyi bulalım', image: 'cumle-genel.jpg', focus: 'Ana düşünce', points: ['Cümlede verilmek istenen mesajdır.', '“Konuyla ilgili vurgulanmak istenen nedir?” diye sorarız.']},
  {id: '04', title: 'Cümle tamamlama', image: 'cumle-olustur.jpg', focus: 'Boşluğu tamamla', points: ['Eksik bölüm anlam ve yapı bakımından cümleye uymalıdır.', 'Sözcük veya sözcük öbeği cümlenin başına, ortasına ya da sonuna gelebilir.']},
  {id: '05', title: 'Cümle tamamlama örnekleri', image: 'cumle-olustur.jpg', focus: 'Boşlukları anlamına uygun doldur', points: ['1. .................... yeni nesillerin yetişmesinde en önemli görevi üstlenir.', '2. Ampulü bulan ........................ o zamanlar oldukça gençti.', '3. Ressamın bu resminde âdeta bir ........................ cümbüşü yaşanıyor.', '4. Başarmanın tek yolu ........................', '5. ........................ şiirinde hüzünlü bir tablo çizer.']},
  {id: '06', title: 'Sözcükleri doğru sıralayalım', image: 'cumle-olustur.jpg', focus: 'Birinci uygulama', points: ['Karışık sözcükleri anlamlı ve kurallı cümleye dönüştürürüz.', 'göstergesidir / mutluluğun / gülümsemek / en / çok', 'Gülümsemek mutluluğun en çok göstergesidir.']},
  {id: '07', title: 'Cümle oluşturma uygulaması', image: 'cumle-olustur.jpg', focus: 'Diğer örnekler', points: ['saygı / sağlıklı / iletişimin / vazgeçilmez / unsurudur', 'Saygı sağlıklı iletişimin vazgeçilmez unsurudur.', 'toplumsal / yardımlaşma / huzuru / artırır', 'Toplumsal yardımlaşma huzuru artırır.']},
  {id: '08', title: 'Tebrikler!', image: 'cumle-olustur.jpg', focus: 'Dersi tamamladın', points: ['Cümlenin konusunu ve ana düşüncesini bulabilirsin.', 'Eksik cümleleri anlam ve yapıya uygun tamamlayabilirsin.', 'Karışık sözcüklerle anlamlı ve kurallı cümleler oluşturabilirsin.']},
].map((scene) => ({...scene, audio: `cumle_${scene.id}`, firstSpeaker: scene.id === '02' || scene.id === '04' || scene.id === '06' ? 'ibrahim' as const : 'filiz' as const, splitSec: timings[scene.id].split_sec, totalSec: timings[scene.id].total_sec}));

const Scene: React.FC<{scene: Scene}> = ({scene}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const splitFrame = Math.round(scene.splitSec * fps);
  const firstActive = frame < splitFrame;
  const filizTalking = scene.firstSpeaker === 'filiz' ? firstActive : !firstActive;
  const ibrahimTalking = scene.firstSpeaker === 'ibrahim' ? firstActive : !firstActive;
  const entrance = spring({frame, fps, config: {damping: 16, stiffness: 100}});
  const imageScale = interpolate(frame, [0, scene.totalSec * fps], [1.03, 1.08], {extrapolateRight: 'clamp'});

  return <AbsoluteFill style={{background: '#EAF4F3', overflow: 'hidden', fontFamily: 'Trebuchet MS, sans-serif'}}>
    <div style={{height: 76, background: '#0F766E', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 30px', fontWeight: 900, zIndex: 5}}>
      <span style={{fontSize: 20}}>5. SINIF TÜRKÇE</span>
      <span style={{fontSize: 25}}>{scene.title}</span>
    </div>
    <div style={{position: 'absolute', inset: '92px 22px 18px', borderRadius: 20, background: '#FFFFFF', overflow: 'hidden', boxShadow: '0 8px 24px rgba(15, 118, 110, 0.16)'}}>
      <Img src={staticFile(`pages/turkce/cumle-genel/${scene.image}`)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: scene.image === 'cumle-olustur.jpg' ? 'center 28%' : 'center 26%', transform: `scale(${imageScale})`, opacity: 0.23}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 65%, rgba(255,255,255,0.62) 100%)'}} />
    </div>
    <div style={{position: 'absolute', left: 214, right: 214, top: 124, bottom: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2}}>
      <div style={{width: 550, transform: `translateY(${(1 - entrance) * 22}px) scale(${0.96 + entrance * 0.04})`, background: 'rgba(255,255,255,0.97)', border: '3px solid #F59E0B', borderRadius: 16, padding: '20px 24px', boxShadow: '0 12px 28px rgba(15, 23, 42, 0.14)'}}>
        <div style={{fontSize: 25, fontWeight: 900, color: '#0F766E', marginBottom: 14}}>{scene.focus}</div>
        <div style={{display: 'grid', gap: 12}}>{scene.points.map((point, index) => <div key={point} style={{fontSize: scene.id === '05' ? 13.5 : scene.id === '07' ? 15.5 : index === 1 && scene.id === '06' ? 15.5 : 18, lineHeight: 1.35, fontWeight: 800, color: '#243B53', background: index % 2 === 0 ? '#F0FDFA' : '#FFF7ED', borderLeft: `6px solid ${index % 2 === 0 ? '#0D9488' : '#F59E0B'}`, padding: '8px 10px'}}>{point}</div>)}</div>
      </div>
    </div>
    <Minecraftfiliz x={112} y={150} scale={0.78} isTalking={filizTalking}/>
    <Minecraftibrahim x={848} y={150} scale={0.78} flip isTalking={ibrahimTalking}/>
    <div style={{position: 'absolute', left: 57, top: 394, minWidth: 110, textAlign: 'center', background: filizTalking ? '#0F766E' : '#334155', color: '#FFFFFF', padding: '6px 12px', borderRadius: 9, border: '2px solid #FFFFFF', fontWeight: 900, zIndex: 10}}>Filiz</div>
    <div style={{position: 'absolute', right: 57, top: 394, minWidth: 110, textAlign: 'center', background: ibrahimTalking ? '#B45309' : '#334155', color: '#FFFFFF', padding: '6px 12px', borderRadius: 9, border: '2px solid #FFFFFF', fontWeight: 900, zIndex: 10}}>İbrahim</div>
    <Audio src={staticFile(`audio/${scene.audio}_1.mp3`)}/>
    <Sequence from={splitFrame}><Audio src={staticFile(`audio/${scene.audio}_2.mp3`)}/></Sequence>
  </AbsoluteFill>;
};

export const CumleGenel: React.FC = () => <AbsoluteFill>{sceneTexts.map((scene) => <Sequence key={scene.id} from={Math.round((sceneTexts.slice(0, Number(scene.id) - 1).reduce((sum, previous) => sum + previous.totalSec, 0)) * 30)} durationInFrames={Math.round(scene.totalSec * 30)}><Scene scene={scene}/></Sequence>)}</AbsoluteFill>;

export const CumleGenelConfig = {id: 'CumleGenel', fps: 30, width: 960, height: 540, durationInFrames: Math.round(sceneTexts.reduce((sum, scene) => sum + scene.totalSec, 0) * 30)};