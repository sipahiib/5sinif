import React from 'react';
import {Easing, interpolate} from 'remotion';

const ease = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const, easing: Easing.out(Easing.cubic)};
const reveal = (frame: number, start: number) => interpolate(frame, [start, start + 24], [0, 1], ease);

/** Scene-local artwork; the surrounding composition supplies the background and Lumi. */
export const KurzVisual: React.FC<{index: number; frame: number}> = ({index, frame}) => {
  if (index === 0) {
    return <svg width="850" height="350" viewBox="0 0 850 350">
      <rect x="20" y="25" width="370" height="300" rx="36" fill="#762CF0" />
      <text x="205" y="95" textAnchor="middle" fill="#fff" fontSize="29" fontWeight="800">Sepette meyveler var</text>
      <g transform={`translate(205 190) scale(${0.8 + 0.2 * reveal(frame, 8)})`}>
        <circle cy="-31" r="18" fill="#FFDA28" /><circle cy="31" r="18" fill="#FFDA28" />
      </g>
      {['elma', 'armut', 'erik'].map((word, i) => {
        const p = reveal(frame, 25 + i * 18);
        return <g key={word} transform={`translate(${440 + (1 - p) * 35} ${35 + i * 100})`} opacity={p}>
          <rect width="365" height="78" rx="24" fill={['#FF6B38', '#00CFC1', '#F73F83'][i]} />
          <circle cx="42" cy="39" r="15" fill="#FFDB27" />
          <text x="88" y="50" fill="#fff" fontSize="34" fontWeight="800">{word}</text>
        </g>;
      })}
    </svg>;
  }
  if (index === 1) {
    const p = reveal(frame, 8);
    return <svg width="850" height="350" viewBox="0 0 850 350">
      <circle cx="115" cy="175" r="88" fill="#FFBD28" />
      <circle cx="115" cy="151" r="37" fill="#F36C47" />
      <path d="M52 226Q115 157 178 226" fill="#F36C47" />
      <g transform={`translate(${(1 - p) * 30} 0)`} opacity={p}>
        <path d="M252 48H782Q817 48 817 83V221Q817 256 782 256H346L288 300V256H252Q217 256 217 221V83Q217 48 252 48Z" fill="#06C9B5" />
        <rect x="254" y="137" width="56" height="12" rx="6" fill="#FFDA28" />
        <text x="334" y="155" fill="#fff" fontSize="38" fontWeight="800">Bugün kitap okuyalım.</text>
      </g>
      <text x="515" y="327" textAnchor="middle" fill="#fff" fontSize="27" fontWeight="700">Konuşma çizgisi</text>
    </svg>;
  }
  if (index === 3) {
    const p = reveal(frame, 8);
    return <svg width="850" height="350" viewBox="0 0 850 350">
      <circle cx="140" cy="175" r="102" fill="#8C35E8" />
      <circle cx="140" cy="175" r="70" fill="#14CEB5" />
      <path d="M140 112L163 175L140 238L117 175Z" fill="#FFDA28" transform={`rotate(${(1 - p) * -65} 140 175)`} />
      <circle cx="140" cy="175" r="12" fill="#762CF0" />
      <text x="140" y="318" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="800">ANLAM</text>
      {[
        {mark: ':', label: 'AÇIKLAMA', color: '#FF6B38'},
        {mark: '—', label: 'KONUŞMA', color: '#00CDB9'},
        {mark: '…', label: 'EKSİK SÖZ', color: '#F73F83'},
      ].map((item, i) => {
        const appear = reveal(frame, 20 + i * 16);
        return <g key={item.mark} transform={`translate(${310 + (1 - appear) * 35} ${20 + i * 107})`} opacity={appear}>
          <rect width="490" height="85" rx="25" fill={item.color} />
          <circle cx="47" cy="42" r="30" fill="#FFDA28" />
          <text x="47" y="55" textAnchor="middle" fill="#6020BD" fontSize="40" fontWeight="900">{item.mark}</text>
          <text x="105" y="53" fill="#fff" fontSize="29" fontWeight="800">{item.label}</text>
        </g>;
      })}
    </svg>;
  }
  if (index === 4) {
    return <svg width="850" height="350" viewBox="0 0 850 350">
      {[
        {mark: '...', label: 'EKSİK SÖZ', color: '#00CBB7'},
        {mark: '?..', label: 'SORU + İKİ NOKTA', color: '#F94B78'},
        {mark: '!..', label: 'ÜNLEM + İKİ NOKTA', color: '#8B3CF0'},
      ].map((item, i) => {
        const p = reveal(frame, 8 + i * 19);
        return <g key={item.mark} transform={`translate(${30 + i * 275} ${25 + (1 - p) * 25})`} opacity={p}>
          <rect width="240" height="295" rx="38" fill={item.color} />
          <circle cx="120" cy="117" r="77" fill="#FFDB27" />
          <text x="120" y="148" textAnchor="middle" fill="#6020BD" fontSize={78} fontWeight="900">{item.mark}</text>
          <text x="120" y="257" textAnchor="middle" fill="#fff" fontSize="19" fontWeight="800">{item.label}</text>
        </g>;
      })}
    </svg>;
  }
  return <svg width="850" height="350" viewBox="0 0 850 350">
    <path d="M70 45H610Q645 45 645 80V222Q645 257 610 257H208L145 303V257H70Q35 257 35 222V80Q35 45 70 45Z" fill="#F94783" />
    <text x="91" y="142" fill="#fff" fontSize="38" fontWeight="800">Keşke şimdi orada</text>
    <text x="91" y="198" fill="#fff" fontSize="38" fontWeight="800">olsaydım</text>
    {[0, 1, 2].map(i => {
      const p = reveal(frame, 20 + i * 14);
      return <circle key={i} cx={322 + i * 35} cy="188" r={10 * p} fill="#FFDA28" />;
    })}
    <g transform={`translate(748 ${160 + Math.sin(frame / 22) * 5})`}>
      <circle r="70" fill="#8B40ED" /><path d="M-29 2Q0-30 29 2Q0 34-29 2Z" fill="#FFCB2B" /><circle cy="2" r="10" fill="#6020BD" />
    </g>
    <text x="336" y="330" textAnchor="middle" fill="#fff" fontSize="27" fontWeight="700">Tamamlanmamış söz</text>
  </svg>;
};
