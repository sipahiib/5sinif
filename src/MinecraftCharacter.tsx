import React from 'react';
import { useCurrentFrame } from 'remotion';

interface CharacterProps {
  x: number;
  y?: number;
  scale?: number;
  flip?: boolean;
  isTalking?: boolean;
}

export const Minecraftfiliz: React.FC<CharacterProps> = ({
  x,
  y = 200,
  scale = 0.72,
  flip = false,
  isTalking = false,
}) => {
  const frame = useCurrentFrame();
  const breath = Math.sin(frame / 12) * 3;
  const armSwing = Math.sin(frame / 10) * 4;
  const blink = Math.floor(frame / 45) % 6 === 0;
  const talkMouth = isTalking ? (Math.floor(frame / 4) % 2 === 0 ? 2 : 0) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + breath,
        transform: `translateX(-50%) scaleX(${flip ? -1 : 1}) scale(${scale})`,
        transformOrigin: '50% 100%',
        width: 160,
        height: 280,
        filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.18))',
        zIndex: 5,
      }}
    >
      {/* Ground Shadow */}
      <div
        style={{
          position: 'absolute',
          bottom: -10,
          left: 10,
          width: 140,
          height: 18,
          borderRadius: '50%',
          background: 'rgba(24, 50, 59, 0.22)',
        }}
      />

      <svg width="160" height="280" viewBox="0 0 160 280" style={{ overflow: 'visible' }}>
        {/* === LEGS === */}
        {/* Left Leg */}
        <g transform="translate(48, 176)">
          <rect x="0" y="0" width="32" height="64" fill="#664426" />
          <rect x="0" y="0" width="16" height="64" fill="#755030" />
          <rect x="8" y="16" width="16" height="16" fill="#58391E" />
          {/* Boots */}
          <rect x="0" y="64" width="32" height="32" fill="#3D3B38" />
          <rect x="0" y="64" width="16" height="32" fill="#4D4A47" />
          <rect x="0" y="88" width="32" height="8" fill="#292826" />
        </g>
        {/* Right Leg */}
        <g transform="translate(80, 176)">
          <rect x="0" y="0" width="32" height="64" fill="#58391E" />
          <rect x="0" y="0" width="16" height="64" fill="#664426" />
          <rect x="8" y="24" width="16" height="16" fill="#4B2F16" />
          {/* Boots */}
          <rect x="0" y="64" width="32" height="32" fill="#33312F" />
          <rect x="0" y="64" width="16" height="32" fill="#44413E" />
          <rect x="0" y="88" width="32" height="8" fill="#22201F" />
        </g>

        {/* === TORSO === */}
        <g transform="translate(48, 80)">
          {/* Tunic Green */}
          <rect x="0" y="0" width="64" height="96" fill="#557A3C" />
          <rect x="0" y="0" width="32" height="96" fill="#628B47" />
          <rect x="16" y="8" width="32" height="40" fill="#6E9B50" />
          <rect x="0" y="48" width="64" height="8" fill="#486932" />
          {/* Neck skin */}
          <rect x="24" y="0" width="16" height="12" fill="#F7CFAB" />
          {/* Belt */}
          <rect x="0" y="72" width="64" height="16" fill="#3E2B1A" />
          <rect x="24" y="72" width="16" height="16" fill="#D4AF37" />
          <rect x="28" y="76" width="8" height="8" fill="#5A4016" />
        </g>

        {/* === LEFT ARM === */}
        <g transform={`translate(24, ${80 + armSwing})`}>
          <rect x="0" y="0" width="24" height="32" fill="#628B47" />
          <rect x="0" y="0" width="12" height="32" fill="#6E9B50" />
          <rect x="0" y="32" width="24" height="64" fill="#F7CFAB" />
          <rect x="0" y="32" width="12" height="64" fill="#FFE0C2" />
          <rect x="0" y="80" width="24" height="16" fill="#E8BD95" />
        </g>

        {/* === RIGHT ARM === */}
        <g transform={`translate(112, ${80 - armSwing})`}>
          <rect x="0" y="0" width="24" height="32" fill="#557A3C" />
          <rect x="12" y="0" width="12" height="32" fill="#486932" />
          <rect x="0" y="32" width="24" height="64" fill="#E8BD95" />
          <rect x="0" y="32" width="12" height="64" fill="#F7CFAB" />
          <rect x="0" y="80" width="24" height="16" fill="#D9AC82" />
        </g>

        {/* === HEAD === */}
        <g transform="translate(40, 0)">
          {/* Base Head */}
          <rect x="0" y="0" width="80" height="80" fill="#F7CFAB" />
          <rect x="0" y="0" width="40" height="80" fill="#FFE0C2" />

          {/* Alex Orange Hair Top & Fringe */}
          <rect x="0" y="0" width="80" height="28" fill="#C25A23" />
          <rect x="0" y="0" width="40" height="24" fill="#D96A2D" />
          <rect x="16" y="24" width="20" height="12" fill="#E87B3D" />
          <rect x="0" y="24" width="16" height="36" fill="#B04E1D" />
          <rect x="64" y="24" width="16" height="40" fill="#9C4215" />
          {/* Hair strand */}
          <rect x="4" y="60" width="12" height="20" fill="#9C4215" />

          {/* Eyes (Emerald Green) */}
          {!blink ? (
            <>
              <rect x="16" y="40" width="16" height="10" fill="#FFFFFF" />
              <rect x="24" y="40" width="8" height="10" fill="#2E7D32" />
              <rect x="24" y="40" width="4" height="6" fill="#4CAF50" />
              <rect x="48" y="40" width="16" height="10" fill="#FFFFFF" />
              <rect x="48" y="40" width="8" height="10" fill="#2E7D32" />
              <rect x="48" y="40" width="4" height="6" fill="#4CAF50" />
            </>
          ) : (
            <>
              <rect x="16" y="44" width="16" height="4" fill="#C25A23" />
              <rect x="48" y="44" width="16" height="4" fill="#C25A23" />
            </>
          )}

          {/* Cheeks Blush */}
          <rect x="12" y="52" width="10" height="6" fill="#FFAAA6" opacity="0.6" />
          <rect x="58" y="52" width="10" height="6" fill="#FFAAA6" opacity="0.6" />

          {/* Smile / Mouth */}
          <rect x="34" y={58 + talkMouth} width="14" height={6 + talkMouth} fill="#B85547" />
          <rect x="36" y={58} width="10" height="3" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

export const Minecraftibrahim: React.FC<CharacterProps> = ({
  x,
  y = 200,
  scale = 0.72,
  flip = false,
  isTalking = false,
}) => {
  const frame = useCurrentFrame();
  const breath = Math.sin(frame / 12 + 1) * 3;
  const armSwing = Math.sin(frame / 10 + 1) * 4;
  const blink = Math.floor(frame / 50) % 6 === 0;
  const talkMouth = isTalking ? (Math.floor(frame / 4) % 2 === 0 ? 2 : 0) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + breath,
        transform: `translateX(-50%) scaleX(${flip ? -1 : 1}) scale(${scale})`,
        transformOrigin: '50% 100%',
        width: 160,
        height: 280,
        filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.18))',
        zIndex: 5,
      }}
    >
      {/* Ground Shadow */}
      <div
        style={{
          position: 'absolute',
          bottom: -10,
          left: 10,
          width: 140,
          height: 18,
          borderRadius: '50%',
          background: 'rgba(24, 50, 59, 0.22)',
        }}
      />

      <svg width="160" height="280" viewBox="0 0 160 280" style={{ overflow: 'visible' }}>
        {/* === LEGS === */}
        {/* Left Leg */}
        <g transform="translate(48, 176)">
          <rect x="0" y="0" width="32" height="64" fill="#2B308C" />
          <rect x="0" y="0" width="16" height="64" fill="#3A40A8" />
          <rect x="8" y="20" width="16" height="16" fill="#20246D" />
          {/* Shoes */}
          <rect x="0" y="64" width="32" height="32" fill="#595959" />
          <rect x="0" y="64" width="16" height="32" fill="#737373" />
          <rect x="0" y="88" width="32" height="8" fill="#3D3D3D" />
        </g>
        {/* Right Leg */}
        <g transform="translate(80, 176)">
          <rect x="0" y="0" width="32" height="64" fill="#20246D" />
          <rect x="0" y="0" width="16" height="64" fill="#2B308C" />
          <rect x="8" y="28" width="16" height="16" fill="#181B52" />
          {/* Shoes */}
          <rect x="0" y="64" width="32" height="32" fill="#474747" />
          <rect x="0" y="64" width="16" height="32" fill="#595959" />
          <rect x="0" y="88" width="32" height="8" fill="#333333" />
        </g>

        {/* === TORSO === */}
        <g transform="translate(48, 80)">
          {/* Cyan Shirt (Steve) */}
          <rect x="0" y="0" width="64" height="96" fill="#00A2A8" />
          <rect x="0" y="0" width="32" height="96" fill="#00B8BF" />
          <rect x="16" y="16" width="32" height="48" fill="#17CAD1" />
          <rect x="0" y="60" width="64" height="12" fill="#008387" />
          {/* Neck V-Cut skin */}
          <polygon points="20,0 44,0 32,18" fill="#D99B75" />
          <polygon points="24,0 40,0 32,12" fill="#F0B58F" />
          {/* Bottom untucked shirt */}
          <rect x="0" y="84" width="64" height="12" fill="#007277" />
        </g>

        {/* === LEFT ARM === */}
        <g transform={`translate(16, ${80 + armSwing})`}>
          <rect x="0" y="0" width="32" height="32" fill="#00B8BF" />
          <rect x="0" y="0" width="16" height="32" fill="#17CAD1" />
          <rect x="0" y="32" width="32" height="64" fill="#E6A881" />
          <rect x="0" y="32" width="16" height="64" fill="#F7BE99" />
          <rect x="0" y="80" width="32" height="16" fill="#D4946D" />
        </g>

        {/* === RIGHT ARM === */}
        <g transform={`translate(112, ${80 - armSwing})`}>
          <rect x="0" y="0" width="32" height="32" fill="#008387" />
          <rect x="16" y="0" width="16" height="32" fill="#007277" />
          <rect x="0" y="32" width="32" height="64" fill="#D4946D" />
          <rect x="0" y="32" width="16" height="64" fill="#E6A881" />
          <rect x="0" y="80" width="32" height="16" fill="#C2825C" />
        </g>

        {/* === HEAD === */}
        <g transform="translate(40, 0)">
          {/* Base Head skin */}
          <rect x="0" y="0" width="80" height="80" fill="#E6A881" />
          <rect x="0" y="0" width="40" height="80" fill="#F7BE99" />

          {/* Steve Dark Brown Hair */}
          <rect x="0" y="0" width="80" height="24" fill="#422513" />
          <rect x="0" y="0" width="40" height="20" fill="#54311C" />
          <rect x="0" y="20" width="12" height="24" fill="#422513" />
          <rect x="68" y="20" width="12" height="24" fill="#331A0B" />
          <rect x="12" y="20" width="16" height="10" fill="#54311C" />

          {/* Eyes (Indigo/Blue) */}
          {!blink ? (
            <>
              <rect x="16" y="38" width="16" height="10" fill="#FFFFFF" />
              <rect x="24" y="38" width="8" height="10" fill="#303894" />
              <rect x="24" y="38" width="4" height="6" fill="#4D56C9" />
              <rect x="48" y="38" width="16" height="10" fill="#FFFFFF" />
              <rect x="48" y="38" width="8" height="10" fill="#303894" />
              <rect x="48" y="38" width="4" height="6" fill="#4D56C9" />
            </>
          ) : (
            <>
              <rect x="16" y="42" width="16" height="4" fill="#422513" />
              <rect x="48" y="42" width="16" height="4" fill="#422513" />
            </>
          )}

          {/* Nose */}
          <rect x="34" y="48" width="12" height="8" fill="#C98661" />

          {/* Steve Beard / Smile */}
          <rect x="26" y={58 + talkMouth} width="28" height={8 + talkMouth} fill="#54311C" />
          <rect x="30" y={58} width="20" height="4" fill="#A86244" />
          <rect x="32" y={59} width="16" height="2" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};
