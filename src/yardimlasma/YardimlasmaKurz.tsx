import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";

const P = {
  deep: "#101433",
  indigo: "#25225C",
  purple: "#7257E8",
  cyan: "#51D6D0",
  yellow: "#FFD166",
  coral: "#FF6B6B",
  green: "#62D39A",
  paper: "#F5F6FF",
  ink: "#171831",
};
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const sceneFrames = [482, 567, 506, 516, 543, 555];
const starts = sceneFrames.map((_, i) =>
  sceneFrames.slice(0, i).reduce((a, b) => a + b, 0),
);
const lesson = sceneFrames.reduce((a, b) => a + b, 0);
const meta = [
  [
    "01",
    "GÖRÜNMEZ TOPLUM AĞI",
    "Bir kişinin yükü, güven bağlarıyla paylaşılır.",
  ],
  ["02", "YARDIM DÖNGÜSÜ", "Bugün veren, yarın destek alabilir."],
  [
    "03",
    "İMECE BİR GÜÇ ÇARPANIDIR",
    "Küçük katkılar, büyük bir sonucu mümkün kılar.",
  ],
  ["04", "DAYANIŞMANIN SINIRI YOK", "Yardım kimliğe değil, ihtiyaca gider."],
  [
    "05",
    "İYİ NİYETTEN SİSTEME",
    "Sivil toplum desteği düzenler ve sürdürülebilir kılar.",
  ],
  [
    "06",
    "AYNI AĞIN FARKLI UZMANLARI",
    "Sağlık, eğitim ve afet desteği toplumu güçlendirir.",
  ],
] as const;

const Stars = () => {
  const f = useCurrentFrame();
  return (
    <>
      {Array.from({ length: 70 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: ((i * 173 - f * 0.12) % 1980) - 30,
            top: (i * 97) % 1080,
            width: 3 + (i % 6),
            height: 3 + (i % 6),
            borderRadius: "50%",
            background: i % 7 ? "#fff" : P.yellow,
            opacity: 0.12 + (i % 5) * 0.07,
            transform: `scale(${1 + Math.sin(f / 17 + i) * 0.25})`,
          }}
        />
      ))}
    </>
  );
};
const Lumi = ({
  x = 1450,
  y = 650,
  flip = false,
}: {
  x?: number;
  y?: number;
  flip?: boolean;
}) => {
  const f = useCurrentFrame();
  const blink = f % 93 < 6 ? 3 : 18;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translateY(${Math.sin(f / 13) * 10}px) scaleX(${flip ? -1 : 1})`,
        filter: "drop-shadow(0 28px 30px rgba(0,0,0,.35))",
      }}
    >
      <svg width="260" height="260" viewBox="0 0 180 180">
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
          fill="#9E8BFF"
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
const Node = ({
  x,
  y,
  color,
  delay = 0,
  label,
}: {
  x: number;
  y: number;
  color: string;
  delay?: number;
  label: string;
}) => {
  const f = useCurrentFrame();
  const p = spring({
    frame: f - delay,
    fps: 30,
    config: { damping: 12, stiffness: 100 },
  });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 150,
        height: 150,
        borderRadius: "50%",
        background: color,
        border: `8px solid ${P.ink}`,
        boxShadow: `0 0 35px ${color}77`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 62,
        transform: `translate(-50%,-50%) scale(${p})`,
      }}
    >
      {label}
    </div>
  );
};
const Network = () => {
  const f = useCurrentFrame();
  const draw = interpolate(f, [10, 100], [0, 1], clamp);
  return (
    <div style={{ position: "relative", width: 1050, height: 580 }}>
      <svg width="1050" height="580" style={{ position: "absolute" }}>
        <path
          d="M180 290 430 110 760 165 875 420 500 490 180 290 760 165 500 490 430 110"
          fill="none"
          stroke={P.cyan}
          strokeWidth="13"
          strokeDasharray="1600"
          strokeDashoffset={1600 * (1 - draw)}
          strokeLinecap="round"
          opacity=".85"
        />
      </svg>
      <Node x={180} y={290} color={P.coral} label="👧" />
      <Node x={430} y={110} color={P.yellow} label="👦" delay={8} />
      <Node x={760} y={165} color={P.green} label="👩" delay={16} />
      <Node x={875} y={420} color={P.purple} label="👨" delay={24} />
      <Node x={500} y={490} color={P.cyan} label="👵" delay={32} />
    </div>
  );
};
const Cycle = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "relative", width: 1050, height: 580 }}>
      <svg width="1050" height="580">
        <circle
          cx="525"
          cy="290"
          r="210"
          fill="none"
          stroke={P.cyan}
          strokeWidth="18"
          strokeDasharray="30 18"
          strokeDashoffset={-f}
        />
        <path d="M680 120l70 15-40 60" fill={P.cyan} />
        <path d="M370 460l-70-15 40-60" fill={P.cyan} />
      </svg>
      <Node x={340} y={290} color={P.coral} label="🤲" />
      <Node x={710} y={290} color={P.yellow} label="🎁" delay={10} />
      <div
        style={{
          position: "absolute",
          left: 450,
          top: 215,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: P.paper,
          color: P.indigo,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 68,
          fontWeight: 950,
          transform: `scale(${1 + Math.sin(f / 10) * 0.05})`,
        }}
      >
        ↔
      </div>
    </div>
  );
};
const Multiplier = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "relative", width: 1050, height: 580 }}>
      <div
        style={{
          position: "absolute",
          left: 55,
          top: 80,
          display: "flex",
          gap: 20,
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 62,
              height: 170,
              borderRadius: 30,
              background: [P.coral, P.yellow, P.cyan, P.green][i % 4],
              border: `7px solid ${P.ink}`,
              transform: `translateY(${Math.sin(f / 8 + i) * 12}px)`,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 330,
          fontSize: 52,
          fontWeight: 950,
          color: P.paper,
        }}
      >
        10 küçük katkı
      </div>
      <div
        style={{
          position: "absolute",
          left: 515,
          top: 205,
          fontSize: 100,
          color: P.yellow,
        }}
      >
        →
      </div>
      <div
        style={{
          position: "absolute",
          right: 20,
          top: 80,
          fontSize: 270,
          filter: "drop-shadow(0 25px 25px rgba(0,0,0,.3))",
        }}
      >
        🏠
      </div>
    </div>
  );
};
const Globe = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "relative", width: 1050, height: 580 }}>
      <div
        style={{
          position: "absolute",
          left: 310,
          top: 50,
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "#3D91EC",
          border: `13px solid ${P.ink}`,
          boxShadow: "inset -45px -25px #2457A2,0 0 70px rgba(81,214,208,.25)",
          overflow: "hidden",
          transform: `rotate(${f * 0.04}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 40,
            top: 85,
            width: 190,
            height: 110,
            borderRadius: "55%",
            background: P.green,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -20,
            bottom: 75,
            width: 220,
            height: 120,
            borderRadius: "55%",
            background: P.green,
          }}
        />
      </div>
      {[
        ["💧", 120, 160],
        ["⛺", 770, 130],
        ["📚", 120, 390],
        ["🩺", 820, 390],
      ].map(([a, x, y], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: x as number,
            top: y as number,
            fontSize: 86,
            transform: `scale(${0.9 + spring({ frame: f - i * 8, fps: 30 }) * 0.1})`,
          }}
        >
          {a}
        </div>
      ))}
    </div>
  );
};
const System = () => {
  const f = useCurrentFrame();
  const flow = interpolate(f, [20, 130], [0, 1], clamp);
  return (
    <div style={{ position: "relative", width: 1050, height: 580 }}>
      <svg width="1050" height="580">
        <path
          d="M170 290H870"
          stroke={P.cyan}
          strokeWidth="17"
          strokeLinecap="round"
        />
        <path
          d="M170 290H870"
          stroke={P.yellow}
          strokeWidth="17"
          strokeLinecap="round"
          strokeDasharray="700"
          strokeDashoffset={700 * (1 - flow)}
        />
      </svg>
      {[
        ["💡", "İYİ NİYET", 170, P.yellow],
        ["⚙️", "DÜZEN", 520, P.purple],
        ["🎯", "ETKİ", 870, P.coral],
      ].map((a, i) => (
        <div
          key={a[1] as string}
          style={{
            position: "absolute",
            left: a[2] as number,
            top: 290,
            transform: "translate(-50%,-50%)",
          }}
        >
          <Node
            x={0}
            y={0}
            color={a[3] as string}
            label={a[0] as string}
            delay={i * 14}
          />
          <div
            style={{
              position: "absolute",
              top: 115,
              left: -100,
              width: 200,
              textAlign: "center",
              fontSize: 29,
              color: P.paper,
              fontWeight: 950,
            }}
          >
            {a[1]}
          </div>
        </div>
      ))}
    </div>
  );
};
const Organizations = () => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "relative", width: 1050, height: 580 }}>
      {[
        ["LÖSEV", "🩺", P.coral],
        ["DARÜŞŞAFAKA", "🎓", P.cyan],
        ["KIZILAY", "⛑️", P.yellow],
      ].map((a, i) => {
        const p = spring({
          frame: f - i * 12,
          fps: 30,
          config: { damping: 14 },
        });
        return (
          <div
            key={a[0]}
            style={{
              position: "absolute",
              left: 45 + i * 340,
              top: 115,
              width: 280,
              height: 300,
              borderRadius: 48,
              background: a[2],
              border: `9px solid ${P.ink}`,
              boxShadow: `0 28px 50px ${a[2]}55`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: `translateY(${(1 - p) * 45}px) scale(${0.92 + p * 0.08})`,
              opacity: p,
            }}
          >
            <div style={{ fontSize: 100 }}>{a[1]}</div>
            <div
              style={{
                fontSize: a[0] === "DARÜŞŞAFAKA" ? 27 : 35,
                fontWeight: 950,
                color: P.ink,
                marginTop: 22,
              }}
            >
              {a[0]}
            </div>
          </div>
        );
      })}
    </div>
  );
};
const visuals = [Network, Cycle, Multiplier, Globe, System, Organizations];
const KurzScene = ({ index }: { index: number }) => {
  const f = useCurrentFrame();
  const V = visuals[index];
  const enter = spring({
    frame: f,
    fps: 30,
    config: { damping: 16, stiffness: 85 },
  });
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${index % 2 ? 25 : 75}% 20%,${P.indigo},${P.deep} 62%,#080A22)`,
        fontFamily: "Arial Rounded MT Bold,Trebuchet MS,Arial",
        overflow: "hidden",
      }}
    >
      <Stars />
      <div
        style={{
          position: "absolute",
          left: 85,
          top: 65,
          color: P.cyan,
          fontSize: 20,
          fontWeight: 950,
          letterSpacing: 5,
        }}
      >
        YARDIMLAŞMA LABORATUVARI • {index + 1}/6
      </div>
      <div
        style={{
          position: "absolute",
          left: 85,
          top: 125,
          width: 1180,
          color: "#fff",
          transform: `translateY(${(1 - enter) * 25}px)`,
          opacity: enter,
        }}
      >
        <div style={{ fontSize: 68, lineHeight: 1, fontWeight: 950 }}>
          {meta[index][1]}
        </div>
        <div
          style={{
            fontSize: 31,
            lineHeight: 1.3,
            color: "#CFD5FF",
            marginTop: 22,
          }}
        >
          {meta[index][2]}
        </div>
      </div>
      <div style={{ position: "absolute", left: 120, top: 340 }}>
        <V />
      </div>
      <Lumi x={1510} y={650} flip={index % 2 === 1} />
      <Audio
        src={staticFile(`audio/sosyal/yardimlasma/kurz/${meta[index][0]}.mp3`)}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 18,
          background: `linear-gradient(90deg,${P.coral},${P.yellow},${P.cyan},${P.purple})`,
        }}
      />
    </AbsoluteFill>
  );
};
export const YardimlasmaKurz = () => (
  <AbsoluteFill>
    {sceneFrames.map((d, i) => (
      <Sequence key={i} from={starts[i]} durationInFrames={d}>
        <KurzScene index={i} />
      </Sequence>
    ))}
      <Sequence from={870} durationInFrames={180}>
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
export const YardimlasmaKurzConfig = {
  id: "YardimlasmaKurz",
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: lesson,
};
