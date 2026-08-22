import React from 'react';
import {
  AbsoluteFill,
  Audio,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  staticFile,
  registerRoot,
} from 'remotion';
import { Root } from './Root';
import { Minecraftfiliz, Minecraftibrahim } from './MinecraftCharacter';

const scenes = [
  { start: 0, dur: 14.74, chapter: 'TÜRÜ TANIYORUM', title: 'HİKÂYE (ÖYKÜ)', audio: '01.mp3', type: 'tur_definition', firstSpeaker: 'filiz', splitSec: 6.98, totalSec: 14.74 },
  { start: 14.74, dur: 15.43, chapter: 'TÜRÜ TANIYORUM', title: 'HİKÂYENİN ÖZELLİKLERİ', audio: '02.mp3', type: 'tur_features', firstSpeaker: 'ibrahim', splitSec: 8.93, totalSec: 15.43 },
  { start: 30.17, dur: 15.29, chapter: 'TÜRÜ TANIYORUM', title: 'SERİM - DÜĞÜM - ÇÖZÜM', audio: '03.mp3', type: 'tur_structure', firstSpeaker: 'filiz', splitSec: 4.92, totalSec: 15.29 },
  { start: 45.46, dur: 15.36, chapter: 'TÜRÜ TANIYORUM', title: 'KISA BİR ÖRNEK', audio: '04.mp3', type: 'tur_example', firstSpeaker: 'ibrahim', splitSec: 5.42, totalSec: 15.36 },
  { start: 60.82, dur: 14.21, chapter: 'TÜRÜ TANIYORUM', title: 'HİKÂYEYİ İNCELEYELİM', audio: '05.mp3', type: 'tur_questions', firstSpeaker: 'filiz', splitSec: 8.26, totalSec: 14.21 },
  { start: 75.03, dur: 11.95, chapter: 'TÜRÜ TANIYORUM', title: 'BİLGİLERİ PEKİŞTİRELİM', audio: '06.mp3', type: 'tur_recap', firstSpeaker: 'ibrahim', splitSec: 6.98, totalSec: 11.95 },
  { start: 86.98, dur: 16.80, chapter: 'TÜRÜ TANIYORUM', title: 'HATIRLAYALIM!', audio: '07.mp3', type: 'tur_final_review', firstSpeaker: 'filiz', splitSec: 7.46, totalSec: 16.80 },
  { start: 103.78, dur: 7.82, chapter: 'BİTİŞ', title: 'TEBRİKLER!', audio: '08.mp3', type: 'tur_finish', firstSpeaker: 'ibrahim', splitSec: 3.26, totalSec: 7.82 },
/*
  // === 1. BÖLÜM: KARŞIT (ZIT) ANLAMLI SÖZCÜKLER ===
  {
    { start: 30.17, dur: 15.29, chapter: 'TÜRÜ TANIYORUM', title: 'SERİM - DÜĞÜM - ÇÖZÜM', audio: '03.mp3', type: 'tur_structure', firstSpeaker: 'filiz', splitSec: 4.92, totalSec: 15.29 },
    { start: 45.46, dur: 15.36, chapter: 'TÜRÜ TANIYORUM', title: 'KISA BİR ÖRNEK', audio: '04.mp3', type: 'tur_example', firstSpeaker: 'ibrahim', splitSec: 5.42, totalSec: 15.36 },
    { start: 60.82, dur: 14.21, chapter: 'TÜRÜ TANIYORUM', title: 'HİKÂYEYİ İNCELEYELİM', audio: '05.mp3', type: 'tur_questions', firstSpeaker: 'filiz', splitSec: 8.26, totalSec: 14.21 },
    { start: 75.03, dur: 11.95, chapter: 'TÜRÜ TANIYORUM', title: 'BİLGİLERİ PEKİŞTİRELİM', audio: '06.mp3', type: 'tur_recap', firstSpeaker: 'ibrahim', splitSec: 6.98, totalSec: 11.95 },
    { start: 86.98, dur: 16.80, chapter: 'TÜRÜ TANIYORUM', title: 'HATIRLAYALIM!', audio: '07.mp3', type: 'tur_final_review', firstSpeaker: 'filiz', splitSec: 7.46, totalSec: 16.80 },
    audio: '01.mp3',
    type: 'zit_definition',
    firstSpeaker: 'filiz',
    splitSec: 6.62,
    totalSec: 17.50,
  },
  {
    start: 18,
    dur: 11,
    chapter: '1. BÖLÜM: ZIT ANLAM',
    title: 'ZIT ANLAMLI SÖZCÜK ÇİFTLERİ',
    audio: '02.mp3',
    type: 'zit_wordPairs',
    firstSpeaker: 'ibrahim',
    splitSec: 5.62,
    totalSec: 10.25,
  },
  {
    start: 29,
    dur: 11,
    chapter: '1. BÖLÜM: ZIT ANLAM',
    title: 'CÜMLE İÇİ KULLANIMLAR',
    audio: '03.mp3',
    type: 'zit_sentences',
    firstSpeaker: 'filiz',
    splitSec: 5.95,
    totalSec: 9.86,
  },
  {
    start: 40,
    dur: 18,
    chapter: '1. BÖLÜM: ZIT ANLAM',
    title: '⚠️ UYARI: ZIT ANLAM ≠ OLUMSUZLUK',
    audio: '04.mp3',
    type: 'zit_warningTable',
    firstSpeaker: 'ibrahim',
    splitSec: 9.72,
    totalSec: 17.11,
  },

  // === 2. BÖLÜM: EŞ ANLAMLI (ANLAMDAŞ) SÖZCÜKLER ===
  {
    start: 58,
    dur: 12,
    chapter: '2. BÖLÜM: EŞ ANLAM',
    title: 'EŞ ANLAMLI (ANLAMDAŞ) SÖZCÜKLER',
    audio: '05.mp3',
    type: 'es_definition',
    firstSpeaker: 'filiz',
    splitSec: 4.25,
    totalSec: 11.28,
  },
  {
    start: 70,
    dur: 10,
    chapter: '2. BÖLÜM: EŞ ANLAM',
    title: 'EŞ ANLAMLI ÖRNEKLER',
    audio: '06.mp3',
    type: 'es_examples',
    firstSpeaker: 'ibrahim',
    splitSec: 5.90,
    totalSec: 11.18,
  },
  {
    start: 80,
    dur: 14,
    chapter: '2. BÖLÜM: EŞ ANLAM',
    title: '⚠️ UYARI: CÜMLEDEKİ ANLAMA DİKKAT!',
    audio: '07.mp3',
    type: 'es_warning',
    firstSpeaker: 'filiz',
    splitSec: 7,
    totalSec: 14,
  },
  {
    start: 85,
    dur: 10,
    chapter: 'BULMACA',
    title: '🧩 BİLGİ BULDUM! EŞLEŞTİRME',
    type: 'bulmaca',
    firstSpeaker: 'filiz',
    splitSec: 5,
    totalSec: 10,
  },
  {
    start: 95,
    dur: 5,
    chapter: 'BİTİŞ',
    title: '🎉 TEBRİKLER!',
    audio: '08.mp3',
    type: 'tebrikler',
    firstSpeaker: 'filiz',
    splitSec: 5,
    totalSec: 10,
  },
*/
];

const Header: React.FC<{ chapter: string; title: string }> = ({ chapter, title }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 76,
      background: 'linear-gradient(90deg, #0F766E 0%, #0D9488 50%, #14B8A6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      color: '#FFFFFF',
      boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
      zIndex: 20,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          background: '#F59E0B',
          padding: '6px 14px',
          borderRadius: 10,
          fontSize: 15,
          fontWeight: 900,
          border: '2px solid #FEF3C7',
        }}
      >
        5. SINIF TÜRKÇE
      </div>
      <div style={{ fontSize: 23, fontWeight: 900, letterSpacing: '0.3px' }}>{title}</div>
    </div>

    <div
      style={{
        background: 'rgba(255, 255, 255, 0.18)',
        padding: '6px 14px',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 800,
        letterSpacing: '0.5px',
      }}
    >
      📖 {chapter}
    </div>
  </div>
);

const turCards: Record<string, { heading: string; body: string; accent: string; items?: string[] }> = {
  tur_definition: { heading: 'Hikâye (Öykü)', body: 'Olmuş ya da olabilecek olayları; zaman, yer ve kişiye bağlı olarak anlatan kısa olay yazısıdır.', accent: '#B91C1C' },
  tur_features: { heading: 'Hikâyede', body: 'Olay ve şahıs kadrosu sınırlıdır. Sayfa sayısı azdır.', accent: '#B91C1C', items: ['Kısa olay yazısıdır', 'Kişi kadrosu sınırlıdır', 'Olaylar kısa bir zamanda anlatılır'] },
  tur_elements: { heading: 'Hikâyenin başlıca unsurları', body: 'Bir hikâyeyi incelerken bu beş unsuru buluruz.', accent: '#B91C1C', items: ['Yer', 'Zaman', 'Kahramanlar', 'Olay', 'Ana fikir'] },
  tur_structure: { heading: 'Hikâyenin bölümleri', body: 'Olaylar üç temel bölümde anlatılır.', accent: '#B91C1C', items: ['1. Serim: Kişiler ve çevre tanıtılır.', '2. Düğüm: Olaylar gelişir ve karmaşıklaşır.', '3. Çözüm: Olay sonuçlandırılır.'] },
  tur_example: { heading: 'Örnek olay', body: 'Bir çocuk kaybolan kedisini arıyor.', accent: '#B91C1C', items: ['Başlangıç: Çocuk ve çevre tanıtılır.', 'Düğüm: Kedi kaybolur, arama başlar.', 'Çözüm: Çocuk kedisini bulur.'] },
  tur_questions: { heading: 'Hikâyeyi incelerken', body: 'Okurken kendimize şu soruları sorarız:', accent: '#B91C1C', items: ['Olay nerede geçiyor?', 'Ne zaman geçiyor?', 'Kahramanlar kimler?', 'Ana fikir nedir?'] },
  tur_recap: { heading: 'Unutma!', body: 'Hikâyenin temel unsurları ve bölümleri birbirini tamamlar.', accent: '#B91C1C', items: ['Yer - Zaman - Kahramanlar', 'Olay - Ana fikir', 'Serim - Düğüm - Çözüm'] },
  tur_final_review: { heading: 'Tebrikler!', body: 'Hikâyeyi okurken türünü ve temel unsurlarını fark edebilirsin.', accent: '#B91C1C', items: ['Yer, zaman, kahramanlar', 'Olay ve ana fikir', 'Serim, düğüm ve çözüm'] },
};

const SceneTurCard: React.FC<{ type: string }> = ({ type }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = turCards[type];
  const intro = spring({ frame, fps, config: { damping: 14, stiffness: 110 } });
  return (
    <div style={{ position: 'absolute', left: 245, right: 245, top: 112, bottom: 28, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 450, transform: `scale(${intro})`, background: 'rgba(255,255,255,0.96)', border: `4px solid ${card.accent}`, borderRadius: 16, padding: '18px 24px', boxShadow: '0 10px 24px rgba(15,23,42,0.16)' }}>
        <div style={{ color: card.accent, fontSize: 23, fontWeight: 900, marginBottom: 10 }}>{card.heading}</div>
        <div style={{ color: '#1E293B', fontSize: 17, lineHeight: 1.45, fontWeight: 700 }}>{card.body}</div>
        {card.items && <div style={{ marginTop: 12, display: 'grid', gap: 7 }}>{card.items.map((item, index) => <div key={index} style={{ background: index % 2 ? '#FEF2F2' : '#FFF7ED', borderLeft: `5px solid ${index % 2 ? '#DC2626' : '#EA580C'}`, padding: '7px 10px', color: '#334155', fontSize: 16, fontWeight: 800 }}>{item}</div>)}</div>}
      </div>
    </div>
  );
};

const SceneTurFinish = () => (
  <AbsoluteFill style={{ background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ position: 'absolute', inset: 24, border: '3px solid #B91C1C', borderRadius: 18, background: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: 52, fontWeight: 900, color: '#B91C1C' }}>Tebrikler!</div>
      <div style={{ marginTop: 16, fontSize: 22, fontWeight: 800, color: '#334155' }}>Hikâye türünü öğrendin.</div>
    </div>
  </AbsoluteFill>
);

// === SCENE 1: ZIT ANLAM DEFINITION ===
const SceneZitDef = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p1 = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const p2 = spring({ frame: frame - 12, fps, config: { damping: 12, stiffness: 120 } });

  return (
    <div style={{ position: 'absolute', left: 275, right: 275, top: 105, bottom: 25, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, zIndex: 10 }}>
      <div style={{ transform: `scale(${p1})`, background: '#FFFFFF', border: '3px solid #0D9488', borderRadius: 18, padding: '16px 20px', boxShadow: '0 8px 24px rgba(13, 148, 136, 0.12)' }}>
        <div style={{ fontSize: 19, fontWeight: 900, color: '#0F766E', marginBottom: 6 }}>📌 Tanım:</div>
        <div style={{ fontSize: 16.5, fontWeight: 700, color: '#1E293B', lineHeight: 1.45 }}>
          Birbirinin tersi durumları ve anlamları karşılayan sözcüklere <span style={{ color: '#E11D48', fontWeight: 900 }}>“karşıt anlamlı sözcükler”</span> denir.
        </div>
      </div>
      <div style={{ transform: `scale(${p2})`, background: '#FEF3C7', border: '3px solid #F59E0B', borderRadius: 18, padding: '16px 20px', boxShadow: '0 8px 24px rgba(245, 158, 11, 0.15)' }}>
        <div style={{ fontSize: 19, fontWeight: 900, color: '#92400E', marginBottom: 6 }}>💡 Önemli Özellik:</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#78350F', lineHeight: 1.45 }}>
          Karşıt anlamlı sözcükler yer değiştirdiğinde cümlelerin anlamları <span style={{ color: '#DC2626', fontWeight: 900 }}>tam tersi yönünde</span> değişir.
        </div>
      </div>
    </div>
  );
};

// === SCENE 2: ZIT ANLAM PAIRS ===
const zitPairs = [
  { w1: 'kalın', w2: 'ince', icon: '📏' },
  { w1: 'zayıf', w2: 'şişman', icon: '⚖️' },
  { w1: 'akıllı', w2: 'deli', icon: '🧠' },
  { w1: 'gül', w2: 'ağla', icon: '🎭' },
  { w1: 'yaz', w2: 'kış', icon: '☀️❄️' },
];

const SceneZitPairs = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ position: 'absolute', left: 270, right: 270, top: 98, bottom: 25, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 7, zIndex: 10 }}>
      <div style={{ textAlign: 'center', fontSize: 16, fontWeight: 900, color: '#0F766E', marginBottom: 2 }}>
        ✨ Zıt Anlamlı Sözcük Çiftleri:
      </div>
      {zitPairs.map((pair, idx) => {
        const p = spring({ frame: frame - idx * 4, fps, config: { damping: 12, stiffness: 140 } });
        return (
          <div key={idx} style={{ transform: `scale(${p})`, background: idx % 2 === 0 ? '#EFF6FF' : '#FFFBEB', border: `2px solid ${idx % 2 === 0 ? '#93C5FD' : '#FDE68A'}`, borderRadius: 14, padding: '7px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 21, fontWeight: 900, color: '#1E293B', width: 110, textAlign: 'right' }}>{pair.w1}</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#F43F5E', padding: '0 10px' }}>↔</div>
            <div style={{ fontSize: 21, fontWeight: 900, color: '#1E293B', width: 110, textAlign: 'left' }}>{pair.w2}</div>
            <div style={{ fontSize: 18 }}>{pair.icon}</div>
          </div>
        );
      })}
    </div>
  );
};

// === SCENE 3: ZIT ANLAM SENTENCES ===
const SceneZitSentences = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p1 = spring({ frame, fps, config: { damping: 12, stiffness: 130 } });
  const p2 = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 130 } });
  const p3 = spring({ frame: frame - 20, fps, config: { damping: 12, stiffness: 130 } });

  return (
    <div style={{ position: 'absolute', left: 255, right: 255, top: 98, bottom: 25, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, zIndex: 10 }}>
      <div style={{ transform: `scale(${p1})`, background: '#EFF6FF', border: '2px solid #60A5FA', borderRadius: 16, padding: '12px 18px' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#1E3A8A' }}>
          • Bu <span style={{ color: '#0284C7', fontWeight: 900, textDecoration: 'underline' }}>kış</span> çok <span style={{ color: '#0284C7', fontWeight: 900, textDecoration: 'underline' }}>soğuk</span> geçti.
        </div>
      </div>
      <div style={{ transform: `scale(${p2})`, background: '#FFF7ED', border: '2px solid #FB923C', borderRadius: 16, padding: '12px 18px' }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#9A3412' }}>
          • Bu <span style={{ color: '#EA580C', fontWeight: 900, textDecoration: 'underline' }}>yaz</span> çok <span style={{ color: '#EA580C', fontWeight: 900, textDecoration: 'underline' }}>sıcak</span> geçti.
        </div>
      </div>
      <div style={{ transform: `scale(${p3})`, background: '#FAF5FF', border: '2px solid #C084FC', borderRadius: 16, padding: '12px 18px' }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: '#581C87' }}>
          • <span style={{ color: '#7C3AED', fontWeight: 900, textDecoration: 'underline' }}>Akıllı</span> köprü arayıncaya dek <span style={{ color: '#7C3AED', fontWeight: 900, textDecoration: 'underline' }}>deli</span> suyu geçer.
        </div>
      </div>
    </div>
  );
};

// === SCENE 4: ZIT ANLAM UYARI TABLE ===
const zitTable = [
  { olumlu: 'Güzel', olumsuz: 'Güzel değil', zit: 'Çirkin' },
  { olumlu: 'Sulu', olumsuz: 'Susuz', zit: 'Kuru' },
  { olumlu: 'Tatlı', olumsuz: 'Tatsız', zit: 'Acı' },
  { olumlu: 'Çıkmak', olumsuz: 'Çıkmamak', zit: 'İnmek' },
  { olumlu: 'Gülmek', olumsuz: 'Gülmemek', zit: 'Ağlamak' },
];

const SceneZitWarning = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ position: 'absolute', left: 240, right: 240, top: 90, bottom: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6, zIndex: 10 }}>
      <div style={{ background: '#FEE2E2', border: '2px solid #EF4444', borderRadius: 12, padding: '6px 14px', textAlign: 'center', fontSize: 15, fontWeight: 900, color: '#991B1B' }}>
        ⚠️ Bir sözcüğün zıt anlamı ile olumsuz anlamı birbirinden farklıdır!
      </div>
      <div style={{ background: '#FFFFFF', border: '2px solid #CBD5E1', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', background: '#F1F5F9', borderBottom: '2px solid #CBD5E1', padding: '7px 12px', fontSize: 15, fontWeight: 900, textAlign: 'center' }}>
          <div style={{ color: '#0F766E' }}>Olumlu</div>
          <div style={{ color: '#DC2626' }}>Olumsuz</div>
          <div style={{ color: '#B45309' }}>Zıt Anlamlısı</div>
        </div>
        {zitTable.map((row, i) => {
          const p = spring({ frame: frame - i * 3, fps, config: { damping: 12, stiffness: 140 } });
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', padding: '5px 12px', fontSize: 15, fontWeight: 800, textAlign: 'center', background: i % 2 === 0 ? '#FFFFFF' : '#F8FAFC', borderBottom: i < 4 ? '1px solid #E2E8F0' : 'none', opacity: p }}>
              <div style={{ color: '#1E293B' }}>{row.olumlu}</div>
              <div style={{ color: '#E11D48', fontWeight: 900 }}>{row.olumsuz}</div>
              <div style={{ color: '#D97706', fontWeight: 900 }}>{row.zit}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// === SCENE 5: EŞ ANLAM DEFINITION ===
const SceneEsDef = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p1 = spring({ frame, fps, config: { damping: 12, stiffness: 120 } });
  const p2 = spring({ frame: frame - 12, fps, config: { damping: 12, stiffness: 120 } });

  return (
    <div style={{ position: 'absolute', left: 260, right: 260, top: 105, bottom: 25, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, zIndex: 10 }}>
      <div style={{ transform: `scale(${p1})`, background: '#FFFFFF', border: '3px solid #3B82F6', borderRadius: 18, padding: '16px 20px', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.12)' }}>
        <div style={{ fontSize: 19, fontWeight: 900, color: '#1D4ED8', marginBottom: 6 }}>📌 Eş Anlam (Anlamdaş) Tanımı:</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', lineHeight: 1.45 }}>
          Yazılışları ve okunuşları farklı olmasına rağmen <span style={{ color: '#2563EB', fontWeight: 900 }}>aynı anlamı taşıyan</span> sözcüklere denir. Birbirlerinin yerine kullanılabilirler.
        </div>
      </div>
      <div style={{ transform: `scale(${p2})`, background: '#F0FDF4', border: '3px solid #22C55E', borderRadius: 18, padding: '16px 20px', boxShadow: '0 8px 24px rgba(34, 197, 94, 0.12)' }}>
        <div style={{ fontSize: 19, fontWeight: 900, color: '#15803D', marginBottom: 6 }}>🌍 Köken Bilgisi:</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#14532D', lineHeight: 1.45 }}>
          Eş anlamlılık çoğunlukla <span style={{ fontWeight: 900 }}>Türkçe sözcüklerle</span> dilimize <span style={{ fontWeight: 900 }}>yabancı dillerden girmiş sözcükler</span> arasındadır.
        </div>
      </div>
    </div>
  );
};

// === SCENE 6: EŞ ANLAM EXAMPLES (3 ICONS FROM BOOK) ===
const esExamples = [
  { icon: '❤️', label: 'kalp = yürek = gönül', bg: '#FEE2E2', border: '#F87171', color: '#991B1B' },
  { icon: '🏠', label: 'ev = hane', bg: '#FEF3C7', border: '#FBBF24', color: '#92400E' },
  { icon: '👴', label: 'yaşlı = ihtiyar', bg: '#E0E7FF', border: '#818CF8', color: '#3730A3' },
];

const SceneEsExamples = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ position: 'absolute', left: 260, right: 260, top: 100, bottom: 25, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, zIndex: 10 }}>
      <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 900, color: '#0F766E' }}>
        🖼️ Kitaptaki Eş Anlamlı Örnekler:
      </div>
      {esExamples.map((item, idx) => {
        const p = spring({ frame: frame - idx * 6, fps, config: { damping: 12, stiffness: 130 } });
        return (
          <div key={idx} style={{ transform: `scale(${p})`, background: item.bg, border: `3px solid ${item.border}`, borderRadius: 18, padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 6px 16px rgba(15, 23, 42, 0.08)' }}>
            <div style={{ fontSize: 34 }}>{item.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: item.color }}>{item.label}</div>
          </div>
        );
      })}
    </div>
  );
};

// === SCENE 7: EŞ ANLAM UYARI (BEYAZ PEYNİR / KAFAM BOZULDU) ===
const SceneEsWarning = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p1 = spring({ frame, fps, config: { damping: 12, stiffness: 130 } });
  const p2 = spring({ frame: frame - 10, fps, config: { damping: 12, stiffness: 130 } });

  return (
    <div style={{ position: 'absolute', left: 220, right: 220, top: 95, bottom: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, zIndex: 10 }}>
      <div style={{ transform: `scale(${p1})`, background: '#FFFBEB', border: '3px solid #F59E0B', borderRadius: 16, padding: '16px 18px', fontSize: 17, fontWeight: 900, color: '#92400E', lineHeight: 1.5 }}>
        ⚠️ Eş anlam uyarısı! Bir kelimenin eş anlamlısı belirlenirken cümledeki anlamı dikkate alınmalıdır. Örneğin beyaz peynir yerine ak peynir veya kafam bozuldu yerine başım bozuldu diyemeyiz.
      </div>
    </div>
  );
};

// === SCENE 8: BULMACA ===
const puzzlePairs = [
  { left: 'kALIN', right: 'İNCE', color: '#38BDF8' },
  { left: 'AKILLI', right: 'DELI', color: '#F59E0B' },
  { left: 'YAZ', right: 'KIŞ', color: '#10B981' },
  { left: 'GÜL', right: 'AĞLA', color: '#F472B6' },
];

const SceneBulmaca = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #E0F2FE 0%, #F5F3FF 50%, #ECFDF5 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute',
        top: 120,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 34,
        fontWeight: 900,
        color: '#0F172A',
        background: '#FFFFFF',
        border: '3px solid #0EA5E9',
        borderRadius: 18,
        padding: '10px 22px',
        boxShadow: '0 12px 28px rgba(14,165,233,0.18)',
      }}>🧩 Zıt Anlamlı Sözcükleri Eşleştir</div>

      <div style={{
        width: 700,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 18,
        marginTop: 60,
      }}>
        {puzzlePairs.map((pair, idx) => {
          const p = spring({ frame: frame - idx * 6, fps, config: { damping: 12, stiffness: 130 } });
          return (
            <div key={idx} style={{
              transform: `scale(${p})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 22px',
              borderRadius: 18,
              background: '#FFFFFF',
              border: `3px solid ${pair.color}`,
              boxShadow: '0 8px 18px rgba(15, 23, 42, 0.08)',
            }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#1E293B' }}>{pair.left}</div>
              <div style={{ fontSize: 26, color: '#EF4444', fontWeight: 900 }}>↔</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#1E293B' }}>{pair.right}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// === SCENE 9: TEBRİKLER (HUG FINALE) ===
const CONFETTI_COLORS = ['#F43F5E', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
const confettiSeeds = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: 5 + (i * 31.7) % 90,
  delay: (i * 7) % 40,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  size: 6 + (i * 3) % 8,
  spin: i % 2 === 0,
}));

const SceneTebrikler = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Characters hug in the center and lean into each other
  const hugProgress = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const textPop = spring({ frame: frame - 25, fps, config: { damping: 10, stiffness: 200 } });
  const starPop = spring({ frame: frame - 35, fps, config: { damping: 10, stiffness: 150 } });

  // Keep the hugging pair tightly centered and close together
  const filizX = 470 + hugProgress * 8;
  const ibrahimX = 490 - hugProgress * 8;

  // Lean angles for hug feel
  const filizLean = hugProgress * 16;
  const ibrahimLean = -hugProgress * 16;

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(135deg, #FEF9C3 0%, #D1FAE5 40%, #DBEAFE 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Confetti */}
      {confettiSeeds.map((c) => {
        const fall = ((frame - c.delay) * 3.5) % 560;
        const sway = Math.sin((frame - c.delay) * 0.15) * 18;
        if (frame < c.delay) return null;
        return (
          <div key={c.id} style={{
            position: 'absolute',
            left: `${c.x}%`,
            top: fall - 20,
            width: c.size,
            height: c.size,
            background: c.color,
            borderRadius: c.spin ? '50%' : 2,
            transform: `translateX(${sway}px) rotate(${frame * (c.spin ? 4 : 3)}deg)`,
            opacity: 0.85,
          }} />
        );
      })}

      {/* Tebrikler text on the left */}
      <div style={{
        position: 'absolute',
        left: 90,
        top: 150,
        transform: `scale(${textPop})`,
        fontSize: 54,
        fontWeight: 900,
        color: '#0F766E',
        textShadow: '0 4px 18px rgba(15, 118, 110, 0.25)',
        letterSpacing: '1px',
        zIndex: 20,
        textAlign: 'left',
      }}>🎉 Tebrikler!</div>

      {/* Subtitle lower and separated from characters */}
      <div style={{
        position: 'absolute',
        left: 90,
        top: 340,
        transform: `scale(${starPop})`,
        fontSize: 22,
        fontWeight: 800,
        color: '#1E293B',
        zIndex: 20,
        textAlign: 'left',
        background: 'rgba(255,255,255,0.72)',
        padding: '8px 24px',
        borderRadius: 16,
        border: '2px solid rgba(52,211,153,0.8)',
        boxShadow: '0 10px 30px rgba(52, 211, 153, 0.18)',
      }}>Zıt ve eş anlamlı sözcükleri öğrendiniz! ⭐</div>

      {/* Filiz — central hugging pair */}
      <div style={{
        position: 'absolute',
        left: filizX,
        top: 110,
        transform: `translateX(-50%) rotate(${filizLean}deg)`,
        transformOrigin: '50% 100%',
        zIndex: 10,
      }}>
        <Minecraftfiliz x={80} y={0} scale={0.95} isTalking={false} />
      </div>

      {/* İbrahim — central hugging pair */}
      <div style={{
        position: 'absolute',
        left: ibrahimX,
        top: 110,
        transform: `translateX(-50%) scaleX(-1) rotate(${ibrahimLean}deg)`,
        transformOrigin: '50% 100%',
        zIndex: 10,
      }}>
        <Minecraftibrahim x={80} y={0} scale={0.95} isTalking={false} />
      </div>

      {/* Heart between them when close */}
      {hugProgress > 0.6 && (
        <div style={{
          position: 'absolute',
          left: 480,
          top: 200,
          fontSize: 42 * hugProgress,
          zIndex: 30,
          transform: `scale(${hugProgress}) translateX(-50%)`,
          filter: 'drop-shadow(0 4px 8px rgba(244,63,94,0.4))',
          opacity: 0.95,
        }}>❤️</div>
      )}

      {/* a subtle glow halo behind the characters */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 270,
        width: 260,
        height: 120,
        transform: 'translateX(-50%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.35) 35%, rgba(255,255,255,0) 75%)',
        zIndex: 5,
      }} />
    </AbsoluteFill>
  );
};

// === MAIN SCENE CONTAINER ===
const Scene = ({ scene, idx }: { scene: (typeof scenes)[0]; idx: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = frame / fps;

  const isFirstActive = currentSec < scene.splitSec;
  const isSecondActive = currentSec >= scene.splitSec && currentSec < scene.totalSec;

  const isTalkingfiliz = scene.firstSpeaker === 'filiz' ? isFirstActive : isSecondActive;
  const isTalkingibrahim = scene.firstSpeaker === 'ibrahim' ? isFirstActive : isSecondActive;

  const cloud1 = (frame * 0.4) % 1100 - 100;
  const cloud2 = (frame * 0.25 + 500) % 1100 - 100;

  return (
    <AbsoluteFill
      style={{
        background: '#FFFFFF',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#1E293B',
        overflow: 'hidden',
      }}
    >
      {/* Background Pixel Clouds */}
      <div style={{ position: 'absolute', top: 80, left: cloud1, width: 90, height: 30, background: 'rgba(255, 255, 255, 0.75)', borderRadius: 15, filter: 'blur(1px)' }} />
      <div style={{ position: 'absolute', top: 110, left: cloud2, width: 120, height: 34, background: 'rgba(255, 255, 255, 0.65)', borderRadius: 17, filter: 'blur(1px)' }} />

      {/* Top Header */}
      <Header title={scene.title} chapter={scene.chapter} />

      {/* Main Center Stage Board */}
      <div
        style={{
          position: 'absolute',
          left: 25,
          right: 25,
          top: 88,
          bottom: 14,
          borderRadius: 24,
          background: '#FFFFFF',
          boxShadow: '0 10px 32px rgba(15, 23, 42, 0.08)',
          border: '2px solid rgba(226, 232, 240, 0.85)',
        }}
      />

      {/* Left Character: Filiz (Jessie Style) - hidden in tebrikler */}
      {scene.type !== 'tur_finish' && (
        <>
          <Minecraftfiliz x={125} y={135} scale={0.82} isTalking={isTalkingfiliz} />
          <div
            style={{
              position: 'absolute',
              left: 45,
              top: 382,
              background: isTalkingfiliz ? '#0F766E' : '#0F172A',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 15,
              border: `2px solid ${isTalkingfiliz ? '#38BDF8' : '#475569'}`,
              boxShadow: isTalkingfiliz ? '0 0 16px rgba(56, 189, 248, 0.6)' : '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
              zIndex: 15,
            }}
          >
            Filiz
          </div>
        </>
      )}

      {/* Right Character: İbrahim (Woody Style) - hidden in tebrikler */}
      {scene.type !== 'tur_finish' && (
        <>
          <Minecraftibrahim x={835} y={135} scale={0.82} flip={true} isTalking={isTalkingibrahim} />
          <div
            style={{
              position: 'absolute',
              right: 45,
              top: 382,
              background: isTalkingibrahim ? '#991B1B' : '#0F172A',
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: 12,
              fontWeight: 800,
              fontSize: 15,
              border: `2px solid ${isTalkingibrahim ? '#F43F5E' : '#475569'}`,
              boxShadow: isTalkingibrahim ? '0 0 16px rgba(244, 63, 94, 0.6)' : '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s',
              zIndex: 15,
            }}
          >
            İbrahim
          </div>
        </>
      )}

      {/* Scene Content */}
      {scene.type.startsWith('tur_') && scene.type !== 'tur_finish' && <SceneTurCard type={scene.type} />}
      {scene.type === 'tur_finish' && <SceneTurFinish />}
      {scene.type === 'zit_definition' && <SceneZitDef />}
      {scene.type === 'zit_wordPairs' && <SceneZitPairs />}
      {scene.type === 'zit_sentences' && <SceneZitSentences />}
      {scene.type === 'zit_warningTable' && <SceneZitWarning />}
      {scene.type === 'es_definition' && <SceneEsDef />}
      {scene.type === 'es_examples' && <SceneEsExamples />}
      {scene.type === 'es_warning' && <SceneEsWarning />}
      {scene.type === 'bulmaca' && <SceneBulmaca />}
      {scene.type === 'tebrikler' && <SceneTebrikler />}

      {scene.audio && (
        <>
          <Audio src={staticFile(`audio/${scene.audio.replace('.mp3', '_1.mp3')}`)} />
          <Sequence from={Math.round(scene.splitSec * 30)}>
            <Audio src={staticFile(`audio/${scene.audio.replace('.mp3', '_2.mp3')}`)} />
          </Sequence>
        </>
      )}
    </AbsoluteFill>
  );
};

export const ZitAnlam = () => (
  <AbsoluteFill>
    {scenes.map((s, i) => (
      <Sequence key={i} from={Math.round(s.start * 30)} durationInFrames={Math.round(s.dur * 30)}>
        <Scene scene={s} idx={i} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export const RemotionVideoConfig = {
  id: 'Tur',
  fps: 30,
  width: 960,
  height: 540,
  durationInFrames: Math.round(111.60 * 30),
};

registerRoot(Root);
