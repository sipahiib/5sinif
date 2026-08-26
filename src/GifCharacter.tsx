import React from 'react';
import {staticFile, useCurrentFrame} from 'remotion';

type CharacterName = 'filiz' | 'ibrahim';

export const GifCharacter: React.FC<{
  name: CharacterName;
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
  animate?: boolean;
}> = ({name, x, y, scale = 0.78, flip = false, animate = false}) => {
  const frame = useCurrentFrame();
  const breath = Math.sin(frame / 12 + (name === 'ibrahim' ? 1 : 0)) * 3;
  const sourceWidth = name === 'filiz' ? 200 : 187;
  const gifFrame = animate ? Math.floor(frame * 11 / 30) % 22 : 0;
  const spriteColumn = gifFrame % 5;
  const spriteRow = Math.floor(gifFrame / 5);

  return <div style={{position: 'absolute', left: x, top: y + breath, width: 160, height: 280, transform: `translateX(-50%) scaleX(${flip ? -1 : 1}) scale(${scale})`, transformOrigin: '50% 100%', zIndex: 12}}>
    <div style={{position: 'absolute', bottom: -10, left: 10, width: 140, height: 18, borderRadius: '50%', background: 'rgba(24, 50, 59, 0.22)'}}/>
    <div style={{position: 'absolute', left: '50%', top: 0, width: sourceWidth, height: 280, transform: 'translateX(-50%)', backgroundImage: `url(${staticFile(`images/${name}_2_sprite.png`)})`, backgroundRepeat: 'no-repeat', backgroundSize: `${sourceWidth * 5}px ${280 * 5}px`, backgroundPosition: `${-spriteColumn * sourceWidth}px ${-spriteRow * 280}px`, filter: 'drop-shadow(0 14px 18px rgba(0,0,0,0.18))'}}/>
  </div>;
};
