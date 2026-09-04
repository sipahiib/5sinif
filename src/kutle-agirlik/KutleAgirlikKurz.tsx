import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";

const P = {
  space: "#090B2B",
  deep: "#19164D",
  purple: "#6C4DFF",
  cyan: "#43D6D1",
  yellow: "#FFD166",
  coral: "#FF6B6B",
  earth: "#42A5F5",
  green: "#61D18A",
  ink: "#17172F",
};
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const Stars = () => {
  const f = useCurrentFrame();
  return (
    <>
      {Array.from({ length: 55 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (i * 157 - f * 0.08) % 1980,
            top: (i * 89) % 1080,
            width: 2 + (i % 4),
            height: 2 + (i % 4),
            borderRadius: "50%",
            background: i % 8 ? "#fff" : P.yellow,
            opacity: 0.18 + (i % 5) * 0.1,
            transform: `scale(${1 + Math.sin(f / 14 + i) * 0.25})`,
          }}
        />
      ))}
    </>
  );
};
const Lumi: React.FC<{
  x: number;
  y: number;
  flip?: boolean;
  scale?: number;
}> = ({ x, y, flip = false, scale = 1 }) => {
  const f = useCurrentFrame(),
    blink = f % 91 < 6 ? 2 : 18;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translateY(${Math.sin(f / 12) * 8}px) scale(${flip ? -scale : scale},${scale})`,
      }}
    >
      <svg width="180" height="180" viewBox="0 0 180 180">
        <ellipse cx="90" cy="159" rx="55" ry="11" fill="#000" opacity=".22" />
        <path
          d="M47 82 16 61v48l31-12M133 82l31-21v48l-31-12"
          fill={P.cyan}
          stroke={P.ink}
          strokeWidth="7"
        />
        <rect
          x="39"
          y="43"
          width="102"
          height="104"
          rx="45"
          fill={P.purple}
          stroke={P.ink}
          strokeWidth="8"
        />
        <path
          d="M91 44c30 0 48 17 49 48-21-18-59-25-98-5 4-27 20-43 49-43Z"
          fill="#967CFF"
        />
        <rect
          x="57"
          y="69"
          width="67"
          height="52"
          rx="24"
          fill="#EFFFFE"
          stroke={P.ink}
          strokeWidth="7"
        />
        <ellipse cx="76" cy="94" rx="8" ry={blink} fill={P.ink} />
        <ellipse cx="105" cy="94" rx="8" ry={blink} fill={P.ink} />
        <path
          d="M78 113q13 12 26 0"
          fill="none"
          stroke={P.ink}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M90 43V24" stroke={P.ink} strokeWidth="7" />
        <circle
          cx="90"
          cy="18"
          r="10"
          fill={P.coral}
          stroke={P.ink}
          strokeWidth="6"
        />
        <circle cx="57" cy="140" r="10" fill={P.yellow} />
        <circle cx="123" cy="140" r="10" fill={P.yellow} />
      </svg>
    </div>
  );
};
const Planet: React.FC<{ moon?: boolean; size: number }> = ({
  moon = false,
  size,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: moon ? "#F3EFD9" : P.earth,
      border: `${size * 0.03}px solid ${P.ink}`,
      boxShadow: moon
        ? "inset -28px -20px #CDC7AF,0 0 35px rgba(255,209,102,.3)"
        : "inset -30px -22px #2875C4,0 0 35px rgba(67,214,209,.3)",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {!moon && (
      <>
        <div
          style={{
            position: "absolute",
            left: "8%",
            top: "17%",
            width: "54%",
            height: "25%",
            borderRadius: "60%",
            background: P.green,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-5%",
            bottom: "20%",
            width: "48%",
            height: "28%",
            borderRadius: "55%",
            background: P.green,
          }}
        />
      </>
    )}
  </div>
);
const Heading: React.FC<{ tag: string; title: string }> = ({ tag, title }) => {
  const f = useCurrentFrame(),
    p = spring({ frame: f, fps: 30, config: { damping: 15, stiffness: 100 } });
  return (
    <div
      style={{
        position: "absolute",
        left: 120,
        top: 80,
        opacity: p,
        transform: `translateY(${(1 - p) * 32}px)`,
      }}
    >
      <div
        style={{
          fontSize: 25,
          fontWeight: 950,
          letterSpacing: 4,
          color: P.cyan,
        }}
      >
        {tag}
      </div>
      <div
        style={{
          marginTop: 14,
          fontSize: 72,
          lineHeight: 1.02,
          fontWeight: 950,
          color: "#fff",
          maxWidth: 1300,
        }}
      >
        {title}
      </div>
    </div>
  );
};
const Falling = () => {
  const f = useCurrentFrame(),
    drop = interpolate(f, [35, 260], [0, 390], {
      ...clamp,
      easing: Easing.in(Easing.quad),
    });
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 72% 65%,#29236B,${P.space} 65%)`,
        overflow: "hidden",
      }}
    >
      <Stars />
      <Heading
        tag="GÖRÜNMEZ ÇEKİM"
        title="Bir topu bırakınca neden aşağı düşer?"
      />
      <div style={{ position: "absolute", left: 1150, top: 560 }}>
        <Planet size={360} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 1290,
          top: 315 + drop,
          width: 82,
          height: 82,
          borderRadius: "50%",
          background: P.yellow,
          border: `8px solid ${P.ink}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 1318,
          top: 420,
          width: 24,
          height: 220,
          background: P.coral,
          clipPath:
            "polygon(0 0,100% 0,100% 78%,145% 78%,50% 100%,-45% 78%,0 78%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 470,
          width: 710,
          fontSize: 42,
          lineHeight: 1.25,
          color: "#DCD9FF",
          fontWeight: 800,
        }}
      >
        Dünya, cisimleri merkezine çeker. Dinamometrenin ölçtüğü bu kuvvete{" "}
        <span style={{ color: P.yellow }}>ağırlık</span> deriz.
      </div>
      <Lumi x={520} y={760} scale={1.15} />
      <Audio src={staticFile("audio/fen/kutle-agirlik/kurz/01.mp3")} />
    </AbsoluteFill>
  );
};
const Mountain = () => {
  const f = useCurrentFrame(),
    rise = interpolate(f, [20, 220], [0, 1], clamp);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg,#17164F,${P.space})`,
        overflow: "hidden",
      }}
    >
      <Stars />
      <Heading
        tag="AYNI ÇANTA • FARKLI YÜKSEKLİK"
        title="Kütle sabit kalır, ağırlık biraz değişir."
      />
      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 0,
          width: 1150,
          height: 560,
          clipPath: "polygon(0 100%,22% 58%,38% 76%,61% 12%,100% 100%)",
          background: "linear-gradient(155deg,#43D6D1,#255C80)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 645,
          top: 530 - rise * 190,
          width: 115,
          height: 140,
          borderRadius: 24,
          background: P.coral,
          border: `7px solid ${P.ink}`,
          boxShadow: "0 18px 25px rgba(0,0,0,.25)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 180,
          top: 470,
          width: 560,
          fontSize: 40,
          lineHeight: 1.3,
          color: "#E0DEFF",
          fontWeight: 800,
        }}
      >
        Çantadaki madde değişmez. Dünya’nın merkezinden uzaklaşınca çekim çok az
        zayıflar.
      </div>
      <div
        style={{
          position: "absolute",
          right: 310,
          top: 720,
          padding: "22px 35px",
          borderRadius: 25,
          background: "rgba(255,255,255,.1)",
          fontSize: 38,
          color: "#fff",
          fontWeight: 950,
        }}
      >
        KÜTLE: AYNI ✓
      </div>
      <Lumi x={1450} y={780} flip scale={1.1} />
      <Audio src={staticFile("audio/fen/kutle-agirlik/kurz/02.mp3")} />
    </AbsoluteFill>
  );
};
const MoonTrip = () => {
  const f = useCurrentFrame(),
    p = spring({
      frame: f - 18,
      fps: 30,
      config: { damping: 12, stiffness: 90 },
    });
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 60% 60%,#302775,${P.space} 68%)`,
        overflow: "hidden",
      }}
    >
      <Stars />
      <Heading
        tag="AYNI CİSİM • FARKLI DÜNYA"
        title="Ay’da ağırlık neden altıda bire iner?"
      />
      <div style={{ position: "absolute", left: 190, top: 470 }}>
        <Planet size={330} />
        <div
          style={{
            textAlign: "center",
            fontSize: 48,
            color: "#fff",
            fontWeight: 950,
            marginTop: 18,
          }}
        >
          600 N
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 780,
          top: 610,
          fontSize: 105,
          color: P.yellow,
          fontWeight: 950,
          transform: `scale(${0.8 + p * 0.2})`,
        }}
      >
        ÷ 6
      </div>
      <div style={{ position: "absolute", right: 210, top: 520 }}>
        <Planet moon size={240} />
        <div
          style={{
            textAlign: "center",
            fontSize: 48,
            color: "#fff",
            fontWeight: 950,
            marginTop: 18,
          }}
        >
          100 N
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 500,
          bottom: 190,
          fontSize: 38,
          color: "#DCD9FF",
          fontWeight: 850,
        }}
      >
        Kütle cismin, ağırlık bulunduğu ortamın özelliğidir.
      </div>
      <Lumi x={850} y={690} scale={1.05} />
      <Audio src={staticFile("audio/fen/kutle-agirlik/kurz/03.mp3")} />
    </AbsoluteFill>
  );
};
const Final = () => {
  const f = useCurrentFrame(),
    p = spring({ frame: f, fps: 30, config: { damping: 13 } });
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle,#302775,${P.space} 68%)`,
        overflow: "hidden",
      }}
    >
      <Stars />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#fff",
          transform: `scale(${0.85 + p * 0.15})`,
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: P.cyan,
            fontWeight: 950,
            letterSpacing: 5,
          }}
        >
          AKLINDA KALSIN
        </div>
        <div style={{ fontSize: 86, fontWeight: 950, marginTop: 25 }}>
          Kütle sabit, ağırlık değişken.
        </div>
      </div>
      <Lumi x={250} y={760} scale={1.15} />
      <Lumi x={1480} y={760} flip scale={1.15} />
    </AbsoluteFill>
  );
};
export const KutleAgirlikKurz = () => (
  <AbsoluteFill
    style={{ fontFamily: "Arial Rounded MT Bold,Trebuchet MS,Arial" }}
  >
    <Sequence from={0} durationInFrames={410}>
      <Falling />
    </Sequence>
    <Sequence from={410} durationInFrames={445}>
      <Mountain />
    </Sequence>
    <Sequence from={855} durationInFrames={450}>
      <MoonTrip />
    </Sequence>
    <Sequence from={1305} durationInFrames={210}>
      <Final />
    </Sequence>
    <Sequence from={870} durationInFrames={183}>
      <div
        style={{
          position: "absolute",
          left: 480,
          top: 540,
          width: 960,
          height: 540,
        }}
      >
        <ChannelLowerThird />
      </div>
    </Sequence>
  </AbsoluteFill>
);
export const KutleAgirlikKurzConfig = {
  id: "KutleAgirlikKurz",
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: 1515,
};
