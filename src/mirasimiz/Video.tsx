import React from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import data from "../../content/mirasimiz.json";
import timings from "./timings.json";
import { GifCharacter } from "../GifCharacter";
import { CtaOptionOne } from "../previews/cta-option-1/CtaOptionOne";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";

const C = {
  navy: "#183153",
  blue: "#2D79B8",
  coral: "#E65C66",
  gold: "#E9B44C",
  cream: "#FFF9EC",
  mint: "#45A88B",
  ink: "#13283F",
};
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const start = (g: "main" | "kurz", i: number) =>
  timings[g].slice(0, i).reduce((n, t) => n + t.frames, 0);
export const mainDuration = () => start("main", timings.main.length) + 210;
export const kurzDuration = () => start("kurz", timings.kurz.length);
const pop = (f: number, d = 0) =>
  spring({
    frame: f - d,
    fps: 30,
    config: { damping: 18, stiffness: 110, mass: 0.8 },
  });
const Canvas = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: "absolute",
      width: 960,
      height: 540,
      scale: 2,
      transformOrigin: "top left",
      fontFamily: "Arial, sans-serif",
    }}
  >
    {children}
  </div>
);

const Bg = () => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(135deg,#F5FBFF,#FFF8EE)",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(#2D79B822 1px,transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 330,
        height: 330,
        borderRadius: "50%",
        left: -140,
        top: -180,
        background: "#DFF4EE",
      }}
    />
    <div
      style={{
        position: "absolute",
        width: 290,
        height: 290,
        borderRadius: "50%",
        right: -100,
        bottom: -155,
        background: "#FFE3D9",
      }}
    />
  </AbsoluteFill>
);
const Header = () => (
  <>
    <div
      style={{
        position: "absolute",
        left: 28,
        top: 18,
        display: "flex",
        gap: 8,
      }}
    >
      <b
        style={{
          padding: "8px 14px",
          borderRadius: 18,
          background: C.navy,
          color: "white",
          fontSize: 14,
        }}
      >
        5. SINIF
      </b>
      <b
        style={{
          padding: "8px 14px",
          borderRadius: 18,
          background: C.coral,
          color: "white",
          fontSize: 14,
        }}
      >
        SOSYAL BİLGİLER
      </b>
    </div>
  </>
);

const Icon = ({
  kind,
  x,
  y,
  color = C.blue,
  label,
}: {
  kind: string;
  x: number;
  y: number;
  color?: string;
  label?: string;
}) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 14 + x) * 3;
  return (
    <>
      <g transform={`translate(${x} ${y + bob})`}>
        <circle r="46" fill="white" stroke={color} strokeWidth="5" />
        {kind === "building" ? (
          <>
            <path
              d="M-28-13 0-31l28 18M-25-9v35m16-35v35m18-35v35m16-35v35M-32 28h64"
              fill="none"
              stroke={color}
              strokeWidth="6"
            />
          </>
        ) : kind === "voice" ? (
          <>
            <path d="M-26 4h13L7-14v42L-13 10h-13Z" fill={color} />
            <path
              d="M18-12q22 18 0 37M10-4q12 10 0 21"
              fill="none"
              stroke={C.gold}
              strokeWidth="5"
            />
          </>
        ) : kind === "globe" ? (
          <>
            <circle r="27" fill="#B9E6F5" stroke={color} strokeWidth="4" />
            <path
              d="M-27 0h54M0-27q-18 27 0 54M0-27q18 27 0 54"
              fill="none"
              stroke={color}
              strokeWidth="3"
            />
          </>
        ) : kind === "hand" ? (
          <>
            <path
              d="M-28 14q19 20 39 5l19-17q7-7-1-14-5-4-10 1L8-2V-24q0-8-8-8t-8 8v19l-7-8q-6-6-12 0-5 5-1 12Z"
              fill="#FFD1B3"
              stroke={color}
              strokeWidth="4"
            />
          </>
        ) : (
          <>
            <path
              d="M-24 20V-15l24-15 24 15v35Z"
              fill="#F4D68B"
              stroke={color}
              strokeWidth="5"
            />
            <path
              d="M-7 20V2H7v18"
              fill="none"
              stroke={color}
              strokeWidth="5"
            />
          </>
        )}
      </g>
      {label && (
        <text
          x={x}
          y={y + 72}
          textAnchor="middle"
          fontSize="15"
          fontWeight="900"
          fill={C.navy}
        >
          {label}
        </text>
      )}
    </>
  );
};

const Diagram = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame();
  const s = pop(f, 6);
  const kinds =
    kind === "types"
      ? [
          ["building", "SOMUT"],
          ["voice", "SOMUT OLMAYAN"],
        ]
      : kind === "protect"
        ? [
            ["globe", "UNESCO"],
            ["hand", "TOPLUM"],
          ]
        : kind === "living"
          ? [
              ["voice", "KUŞ DİLİ"],
              ["hand", "GELENEK"],
            ]
          : kind === "world"
            ? [
                ["building", "ANADOLU"],
                ["globe", "DÜNYA"],
              ]
            : kind === "turkiye"
              ? [
                  ["building", "YAPI"],
                  ["globe", "DOĞA"],
                ]
              : kind === "timeline"
                ? [
                    ["building", "GEÇMİŞ"],
                    ["hand", "GELECEK"],
                  ]
                : kind === "unesco"
                  ? [
                      ["globe", "EVRENSEL"],
                      ["hand", "KORUMA"],
                    ]
                  : [
                      ["building", "MADDİ"],
                      ["voice", "MANEVİ"],
                    ];
  return (
    <svg viewBox="0 0 600 180" width="100%" height="180" style={{ scale: s }}>
      <path
        d="M180 85H420"
        stroke={C.gold}
        strokeWidth="6"
        strokeDasharray="12 9"
        strokeDashoffset={-f}
      />
      <Icon
        kind={kinds[0][0]}
        label={kinds[0][1]}
        x={150}
        y={82}
        color={C.blue}
      />
      <Icon
        kind={kinds[1][0]}
        label={kinds[1][1]}
        x={450}
        y={82}
        color={C.coral}
      />
      <circle cx="300" cy="85" r="34" fill={C.navy} />
      <path
        d="m285 85 10 10 21-24"
        fill="none"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
};

const MainScene = ({ i }: { i: number }) => {
  const scene = data.main[i];
  const f = useCurrentFrame();
  const left = scene.speaker === "filiz";
  return (
    <AbsoluteFill>
      <Bg />
      <Canvas>
        <Header />
        <div
          style={{
            position: "absolute",
            left: left ? 198 : 38,
            top: 65,
            width: 724,
            height: 430,
            borderRadius: 26,
            background: "rgba(255,255,255,.96)",
            padding: "25px 30px",
            boxSizing: "border-box",
            boxShadow: "0 14px 35px #18315325",
            border: "1px solid #D7E6EF",
            opacity: interpolate(f, [0, 10], [0.3, 1], clamp),
            translate: `0 ${interpolate(f, [0, 14], [8, 0], clamp)}px`,
          }}
        >
          <b style={{ color: C.coral, fontSize: 13, letterSpacing: 1.5 }}>
            ORTAK MİRASIMIZ
          </b>
          <div
            style={{
              fontSize: 31,
              fontWeight: 900,
              color: C.navy,
              lineHeight: 1.05,
              marginTop: 6,
            }}
          >
            {scene.title}
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: C.ink,
              lineHeight: 1.3,
              marginTop: 9,
            }}
          >
            {scene.lead}
          </div>
          <Diagram kind={scene.kind} />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {scene.points.map((p, j) => (
              <div
                key={p}
                style={{
                  background: j ? "#FFF2E9" : "#EAF7F3",
                  borderLeft: `5px solid ${j ? C.coral : C.mint}`,
                  borderRadius: 11,
                  padding: "10px 12px",
                  fontSize: 13,
                  lineHeight: 1.2,
                  fontWeight: 800,
                  color: C.ink,
                }}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
        <GifCharacter
          name={scene.speaker as "filiz" | "ibrahim"}
          x={left ? 102 : 858}
          y={205}
          scale={0.9}
          animate
        />
      </Canvas>
      <Audio src={staticFile(`audio/sosyal/mirasimiz/main/${scene.id}.mp3`)} />
    </AbsoluteFill>
  );
};
const Channel = () => (
  <div
    style={{
      position: "absolute",
      left: 700,
      top: 380,
      width: 960,
      height: 540,
      scale: 1.25,
      transformOrigin: "top left",
      zIndex: 50,
    }}
  >
    <ChannelLowerThird />
  </div>
);
export const Main = () => (
  <AbsoluteFill>
    {data.main.map((_, i) => (
      <Sequence
        key={i}
        from={start("main", i)}
        durationInFrames={timings.main[i].frames}
      >
        <MainScene i={i} />
      </Sequence>
    ))}
    <Sequence from={900} durationInFrames={150}>
      <Channel />
    </Sequence>
    <Sequence from={start("main", timings.main.length)} durationInFrames={210}>
      <Canvas>
        <CtaOptionOne />
      </Canvas>
    </Sequence>
  </AbsoluteFill>
);

const LumiRobot = ({ i, frames }: { i: number; frames: number }) => {
  const f = useCurrentFrame();
  const routes = [
    [
      [90, 830],
      [1580, 830],
    ],
    [
      [1720, 90],
      [1720, 760],
    ],
    [
      [70, 130],
      [70, 750],
    ],
    [
      [140, 45],
      [1570, 45],
    ],
    [
      [1720, 760],
      [1720, 100],
    ],
    [
      [1580, 830],
      [100, 830],
    ],
  ] as const;
  const [[sx, sy], [ex, ey]] = routes[i];
  const travelEnd = Math.max(42, 8 + (frames - 30) / 2);
  const progress = interpolate(f, [8, travelEnd], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const x = interpolate(progress, [0, 1], [sx, ex]);
  const y = interpolate(progress, [0, 1], [sy, ey]) + Math.sin(f / 4.5) * 5;
  const wave = Math.sin(f / 5) * 7;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 124,
        height: 154,
        filter: "drop-shadow(0 0 24px #62E8D899)",
        zIndex: 35,
      }}
    >
      <svg viewBox="0 0 124 154" width="124" height="154">
        <ellipse cx="62" cy="147" rx="42" ry="7" fill="#020B1266" />
        <path d="M62 18V5" stroke="#82F7EA" strokeWidth="5" />
        <circle cx="62" cy="4" r="5" fill={C.gold} />
        <rect
          x="19"
          y="17"
          width="86"
          height="59"
          rx="25"
          fill="#F2FBFF"
          stroke="#69E6D7"
          strokeWidth="5"
        />
        <rect x="28" y="26" width="68" height="41" rx="18" fill="#09283C" />
        <path
          d="M41 46q8-13 16 0M68 46q8-13 16 0"
          fill="none"
          stroke="#6EF5E6"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <rect
          x="30"
          y="75"
          width="64"
          height="58"
          rx="19"
          fill="#F2FBFF"
          stroke="#69E6D7"
          strokeWidth="5"
        />
        <circle
          cx="62"
          cy="101"
          r="15"
          fill="#123B55"
          stroke={C.gold}
          strokeWidth="5"
        />
        <path
          d="m55 101 5 5 10-13"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d={`M30 87 13 ${99 + wave / 3}M94 87l17 ${12 + wave / 3}`}
          stroke="#F2FBFF"
          strokeWidth="13"
          strokeLinecap="round"
        />
        <circle
          cx="11"
          cy={102 + wave / 3}
          r="8"
          fill={C.gold}
          stroke="#EFFFFB"
          strokeWidth="4"
        />
        <circle
          cx="113"
          cy={99 + wave / 3}
          r="8"
          fill={C.gold}
          stroke="#EFFFFB"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

const KurzVisual = ({ i }: { i: number }) => {
  const f = useCurrentFrame();
  const enter = pop(f, 8);
  const draw = interpolate(f, [10, 55], [1, 0], clamp);
  const stagger = (n: number) =>
    spring({
      frame: f - 10 - n * 5,
      fps: 30,
      config: { damping: 17, stiffness: 105 },
    });
  const common: React.CSSProperties = {
    position: "absolute",
    left: 170,
    top: 175,
    width: 620,
    height: 275,
    scale: 0.75 + enter * 0.25,
  };
  if (i === 0)
    return (
      <svg viewBox="0 0 620 275" style={common}>
        <defs>
          <radialGradient id="chest" cx="50%" cy="10%">
            <stop stopColor="#FFD978" />
            <stop offset="1" stopColor="#B87520" />
          </radialGradient>
        </defs>
        <path
          d="M190 198h240l-20 55H210Z"
          fill="#85512B"
          stroke="#F5C76D"
          strokeWidth="5"
        />
        <path
          d="M205 196 250 90h120l45 106Z"
          fill="url(#chest)"
          stroke="#F5C76D"
          strokeWidth="6"
          style={{
            transformOrigin: "310px 196px",
            rotate: `${interpolate(f, [8, 42], [0, -12], clamp)}deg`,
          }}
        />
        <ellipse
          cx="310"
          cy="205"
          rx="105"
          ry="28"
          fill="#FFF1A0"
          opacity=".25"
        />
        {[
          [250, 120, "YAPI"],
          [310, 75, "FİKİR"],
          [370, 120, "GELENEK"],
        ].map(([x, y, t], n) => (
          <g
            key={t as string}
            style={{
              opacity: stagger(n),
              translate: `0 ${interpolate(stagger(n), [0, 1], [35, 0])}px`,
            }}
          >
            <circle
              cx={x as number}
              cy={y as number}
              r="34"
              fill={[C.coral, C.blue, C.mint][n]}
              stroke="white"
              strokeWidth="4"
            />
            <text
              x={x as number}
              y={(y as number) + 6}
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontWeight="900"
            >
              {t}
            </text>
          </g>
        ))}
      </svg>
    );
  if (i === 1)
    return (
      <svg viewBox="0 0 620 275" style={common}>
        <path
          d="M310 40V235"
          stroke="#6FE8DA55"
          strokeWidth="3"
          strokeDasharray="9 8"
        />
        <g style={{ opacity: stagger(0) }}>
          <rect
            x="48"
            y="55"
            width="220"
            height="170"
            rx="28"
            fill="#102F45"
            stroke="#63D8EE"
            strokeWidth="5"
          />
          <path
            d="M91 183V94l44-28 44 28v89M73 187h140"
            fill="none"
            stroke="#A5E9FF"
            strokeWidth="10"
          />
          <text
            x="158"
            y="215"
            textAnchor="middle"
            fill="white"
            fontSize="17"
            fontWeight="900"
          >
            SOMUT
          </text>
        </g>
        <g style={{ opacity: stagger(1) }}>
          <rect
            x="352"
            y="55"
            width="220"
            height="170"
            rx="28"
            fill="#102F45"
            stroke="#F6C85F"
            strokeWidth="5"
          />
          <path d="M398 145h31l42-37v77l-42-31h-31Z" fill="#FFD66E" />
          <path
            d="M491 119q32 28 0 58M483 132q16 14 0 30"
            fill="none"
            stroke="#6FE8DA"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <text
            x="462"
            y="215"
            textAnchor="middle"
            fill="white"
            fontSize="17"
            fontWeight="900"
          >
            SOMUT OLMAYAN
          </text>
        </g>
        <circle
          cx="310"
          cy="140"
          r="29"
          fill={C.coral}
          style={{ scale: stagger(2), transformOrigin: "310px 140px" }}
        />
        <path
          d="m296 140 10 10 21-27"
          stroke="white"
          strokeWidth="7"
          fill="none"
        />
      </svg>
    );
  if (i === 2)
    return (
      <svg viewBox="0 0 620 275" style={common}>
        <defs>
          <filter id="uGlow">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="networkArrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0 0 10 5 0 10Z" fill="#76EBDD" />
          </marker>
        </defs>
        <g
          fill="none"
          stroke="#76EBDD"
          strokeWidth="4"
          strokeDasharray="8 8"
          markerEnd="url(#networkArrow)"
        >
          <path d="M120 76 C168 79 197 94 229 111" />
          <path d="M495 78 C452 81 425 95 391 111" />
          <path d="M105 201 C160 198 197 184 231 166" />
          <path d="M510 198 C458 195 424 182 389 165" />
        </g>
        <circle
          cx="310"
          cy="137"
          r="86"
          fill="#173F5A"
          stroke="#65E1D2"
          strokeWidth="6"
          strokeDasharray="14 10"
          strokeDashoffset={-f}
        />
        <path
          d="M224 137h172M310 51q-58 86 0 172M310 51q58 86 0 172"
          stroke="#77DDE8"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M310 89 360 108v43q0 48-50 69-50-21-50-69v-43Z"
          fill="#E9B44C"
          stroke="#FFF2B8"
          strokeWidth="5"
        />
        <path
          d="m286 145 17 17 34-43"
          fill="none"
          stroke="#173153"
          strokeWidth="9"
          strokeLinecap="round"
        />
        {[
          [95, 70],
          [520, 72],
          [80, 210],
          [535, 205],
        ].map(([x, y], n) => (
          <g key={n} style={{ opacity: stagger(n) }}>
            <circle
              cx={x}
              cy={y}
              r="25"
              fill={[C.coral, C.blue, C.mint, "#B77DE4"][n]}
              filter="url(#uGlow)"
            />
          </g>
        ))}
      </svg>
    );
  if (i === 3)
    return (
      <svg viewBox="0 0 620 275" style={common}>
        <path
          d="M70 172 122 92l90-12 54-37 89 24 63-17 61 43 80 6-31 83-92 32-82-14-82 30-73-34-70 18Z"
          fill="#174A62"
          stroke="#6FE8DA"
          strokeWidth="5"
        />
        <path
          d="M130 172Q255 65 470 160"
          fill="none"
          stroke={C.gold}
          strokeWidth="6"
          strokeDasharray="12 10"
          strokeDashoffset={draw * 260}
        />
        {[
          [138, 165, "P"],
          [255, 96, "S"],
          [362, 112, "K"],
          [468, 159, "O"],
        ].map(([x, y, t], n) => (
          <g
            key={t as string}
            style={{ scale: stagger(n), transformOrigin: `${x}px ${y}px` }}
          >
            <circle
              cx={x as number}
              cy={y as number}
              r="27"
              fill={[C.blue, C.coral, C.mint, "#B77DE4"][n]}
              stroke="white"
              strokeWidth="4"
            />
            <text
              x={x as number}
              y={(y as number) + 7}
              textAnchor="middle"
              fill="white"
              fontSize="18"
              fontWeight="900"
            >
              {t}
            </text>
          </g>
        ))}
      </svg>
    );
  if (i === 4)
    return (
      <svg viewBox="0 0 620 275" style={common}>
        {[
          [105, "ISLIK"],
          [245, "EBRU"],
          [385, "MEDDAH"],
          [525, "TÖREN"],
        ].map(([x, t], n) => (
          <g
            key={t as string}
            style={{
              opacity: stagger(n),
              translate: `0 ${Math.sin(f / 11 + n) * 5}px`,
            }}
          >
            <circle
              cx={x as number}
              cy="125"
              r="55"
              fill={["#1C6B83", "#7B4AA5", "#B05D50", "#89712E"][n]}
              stroke={["#69E6D7", "#D7A8FF", "#FF9D92", "#FFE083"][n]}
              strokeWidth="5"
            />
            {n === 0 ? (
              <path
                d={`M${(x as number) - 29} 125h20l27-24v48l-27-18h-20Z`}
                fill="#BFFFF7"
              />
            ) : n === 1 ? (
              <path
                d={`M${(x as number) - 29} 126q28-48 56 0-28 48-56 0m12 0q16-24 31 0-16 24-31 0`}
                fill="none"
                stroke="#F0C9FF"
                strokeWidth="7"
              />
            ) : n === 2 ? (
              <path
                d={`M${(x as number) - 25} 154v-56h50v56m-39-42h28`}
                fill="none"
                stroke="#FFD0CA"
                strokeWidth="8"
              />
            ) : (
              <path
                d={`M${(x as number) - 30} 151q30-58 60 0m-72 0h84`}
                fill="none"
                stroke="#FFF0A8"
                strokeWidth="8"
              />
            )}
            <text
              x={x as number}
              y="211"
              textAnchor="middle"
              fill="white"
              fontSize="15"
              fontWeight="900"
            >
              {t}
            </text>
            {n < 3 && (
              <path
                d={`M${(x as number) + 62} 125h16`}
                stroke={C.gold}
                strokeWidth="6"
              />
            )}
          </g>
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 620 275" style={common}>
      {[
        [150, 95, "KURUM"],
        [310, 188, "UZMAN"],
        [470, 95, "TOPLUM"],
      ].map(([x, y, t], n) => (
        <g
          key={t as string}
          style={{
            scale: stagger(n),
            transformOrigin: `${x}px ${y}px`,
            rotate: `${f * (n % 2 ? -0.15 : 0.15)}deg`,
          }}
        >
          <circle
            cx={x as number}
            cy={y as number}
            r="58"
            fill="#173F5A"
            stroke={[C.blue, C.gold, C.mint][n]}
            strokeWidth="10"
            strokeDasharray="16 8"
          />
          <text
            x={x as number}
            y={(y as number) + 6}
            textAnchor="middle"
            fill="white"
            fontSize="16"
            fontWeight="900"
            style={{
              rotate: `${-f * (n % 2 ? -0.15 : 0.15)}deg`,
              transformOrigin: `${x}px ${y}px`,
            }}
          >
            {t}
          </text>
        </g>
      ))}
      <path
        d="M202 119 271 166M349 166l69-47"
        stroke="#70E7D9"
        strokeWidth="7"
        strokeDasharray="11 9"
        strokeDashoffset={-f / 2}
      />
      <path
        d="M310 55 348 70v34q0 36-38 52-38-16-38-52V70Z"
        fill={C.coral}
        stroke="#FFD5D8"
        strokeWidth="5"
      />
      <path
        d="m294 103 11 11 22-29"
        fill="none"
        stroke="white"
        strokeWidth="7"
      />
    </svg>
  );
};
const KurzScene = ({ i }: { i: number }) => {
  const s = data.kurz[i];
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${i % 2 ? 75 : 25}% 20%,#234A62,#071522 65%)`,
        overflow: "hidden",
        fontFamily: "Arial,sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          backgroundImage: "radial-gradient(#69E2D4 1.5px,transparent 2px)",
          backgroundSize: "62px 62px",
          translate: `${Math.sin(f / 80) * 10}px 0`,
        }}
      />
      <Canvas>
        <b
          style={{
            position: "absolute",
            left: 44,
            top: 35,
            color: "#6DE3D5",
            letterSpacing: 2,
            fontSize: 14,
          }}
        >
          ORTAK MİRAS • HIZLI KEŞİF
        </b>
        <div
          style={{
            position: "absolute",
            left: 92,
            top: 96,
            width: 776,
            textAlign: "center",
            color: "white",
            fontSize: 38,
            fontWeight: 900,
          }}
        >
          {s.title}
        </div>
        <KurzVisual i={i} />
        <div
          style={{
            position: "absolute",
            left: 190,
            top: 425,
            width: 580,
            height: 3,
            background:
              "linear-gradient(90deg,transparent,#65E1D2,transparent)",
          }}
        />
      </Canvas>
      <LumiRobot i={i} frames={timings.kurz[i].frames} />
      <Audio src={staticFile(`audio/sosyal/mirasimiz/kurz/${s.id}.mp3`)} />
    </AbsoluteFill>
  );
};
export const Kurz = () => (
  <AbsoluteFill>
    {data.kurz.map((_, i) => (
      <Sequence
        key={i}
        from={start("kurz", i)}
        durationInFrames={timings.kurz[i].frames}
      >
        <KurzScene i={i} />
      </Sequence>
    ))}
    <Sequence from={900} durationInFrames={150}>
      <Channel />
    </Sequence>
  </AbsoluteFill>
);
export const KurzCover = () => (
  <AbsoluteFill
    style={{
      background: "radial-gradient(circle at 76% 38%,#245D72,#061522 68%)",
      fontFamily: "Arial,sans-serif",
      overflow: "hidden",
    }}
  >
    <Img
      src={staticFile("images/mirasimiz_kurz_kapak_source.png")}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 100,
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: 0.18,
        backgroundImage: "radial-gradient(#72E7DA 1.5px,transparent 2px)",
        backgroundSize: "46px 46px",
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 62,
        top: 48,
        color: "#73EBDD",
        fontSize: 22,
        fontWeight: 900,
        letterSpacing: 4,
      }}
    >
      LUMİ DOSYASI • 5. SINIF
    </div>
    <div
      style={{
        position: "absolute",
        left: 58,
        top: 128,
        width: 590,
        color: "white",
        fontWeight: 950,
        fontSize: 82,
        lineHeight: 0.9,
        letterSpacing: -2,
      }}
    >
      ORTAK
      <br />
      <span style={{ color: C.gold }}>MİRASIMIZ</span>
    </div>
    <div
      style={{
        position: "absolute",
        left: 63,
        top: 315,
        width: 520,
        color: "#D9F5F2",
        fontSize: 28,
        lineHeight: 1.18,
        fontWeight: 750,
      }}
    >
      Taştan ıslık diline,
      <br />
      insanlığın ortak hafızası
    </div>
    <div
      style={{
        position: "absolute",
        left: 60,
        bottom: 62,
        display: "flex",
        gap: 12,
      }}
    >
      {["UNESCO", "SOMUT", "YAŞAYAN MİRAS"].map((x, i) => (
        <div
          key={x}
          style={{
            padding: "12px 18px",
            borderRadius: 16,
            background: "#0D2B40E8",
            border: `2px solid ${["#66E2D4", C.gold, C.coral][i]}`,
            color: "white",
            fontSize: 17,
            fontWeight: 900,
          }}
        >
          {x}
        </div>
      ))}
    </div>
    <svg
      viewBox="0 0 1280 720"
      width="1280"
      height="720"
      style={{ position: "absolute", inset: 0 }}
    >
      <defs>
        <filter id="coverGlow">
          <feGaussianBlur stdDeviation="9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="robotBody" x1="0" x2="1">
          <stop stopColor="#79F0E1" />
          <stop offset="1" stopColor="#35AFCB" />
        </linearGradient>
      </defs>
      <path
        d="M705 370C760 215 1010 160 1175 290M690 420c120 160 340 180 492 42"
        fill="none"
        stroke="#65E1D244"
        strokeWidth="4"
        strokeDasharray="13 14"
      />
      {/* Pamukkale */}
      <g transform="translate(700 105)">
        <circle r="78" fill="#102F45" stroke="#65E1D2" strokeWidth="5" />
        <path
          d="M-54 31q34-32 69-12t44-16M-47 5q31-27 60-8t40-14M-34-20q25-19 47-2t32-11"
          fill="none"
          stroke="#D8FFFF"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <text
          y="105"
          textAnchor="middle"
          fill="white"
          fontSize="17"
          fontWeight="900"
        >
          PAMUKKALE
        </text>
      </g>
      {/* Selimiye */}
      <g transform="translate(1115 120)">
        <circle r="78" fill="#102F45" stroke="#E9B44C" strokeWidth="5" />
        <path
          d="M-46 38V-8h92v46M-34-8q34-56 68 0M-56 39h112M-50-18v-46m100 46v-46M-55-64h10m90 0h10"
          fill="none"
          stroke="#FFE3A0"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <text
          y="105"
          textAnchor="middle"
          fill="white"
          fontSize="17"
          fontWeight="900"
        >
          SELİMİYE
        </text>
      </g>
      {/* Gobeklitepe */}
      <g transform="translate(696 595)">
        <circle r="78" fill="#102F45" stroke="#E65C66" strokeWidth="5" />
        <path
          d="M-48 40V-42h38v82M12 40V-42h38v82M-60 42h122"
          fill="none"
          stroke="#F1B795"
          strokeWidth="10"
          strokeLinejoin="round"
        />
        <circle cx="-29" cy="-12" r="6" fill="#173153" />
        <path d="M31-25v34M22-8h18" stroke="#173153" strokeWidth="5" />
        <text
          y="105"
          textAnchor="middle"
          fill="white"
          fontSize="17"
          fontWeight="900"
        >
          GÖBEKLİTEPE
        </text>
      </g>
      {/* Kus dili */}
      <g transform="translate(1116 602)">
        <circle r="78" fill="#102F45" stroke="#65E1D2" strokeWidth="5" />
        <path d="M-54 10h28L7-22v64l-33-23h-28Z" fill="#72E7DA" />
        <path
          d="M24-24q37 32 0 66M15-9q20 18 0 38"
          fill="none"
          stroke="#E9B44C"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <text
          y="105"
          textAnchor="middle"
          fill="white"
          fontSize="17"
          fontWeight="900"
        >
          KUŞ DİLİ
        </text>
      </g>
      {/* Ebru */}
      <g transform="translate(1210 355)">
        <circle r="63" fill="#102F45" stroke="#B77DE4" strokeWidth="5" />
        <path
          d="M-35 6c16-48 65-42 66-5 0 35-48 43-60 13-10-26 27-39 43-17 12 17-13 32-26 17"
          fill="none"
          stroke="#D9A6FF"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <text
          y="88"
          textAnchor="middle"
          fill="white"
          fontSize="16"
          fontWeight="900"
        >
          EBRU
        </text>
      </g>
      {/* Lumi robot */}
      <g transform="translate(930 365)" filter="url(#coverGlow)">
        <ellipse cy="155" rx="105" ry="25" fill="#020B1266" />
        <path
          d="M-92 35l-58 45m242-45 58 45"
          stroke="#77ECDD"
          strokeWidth="22"
          strokeLinecap="round"
        />
        <circle
          cx="-158"
          cy="85"
          r="19"
          fill="#E9B44C"
          stroke="#EFFFFB"
          strokeWidth="6"
        />
        <circle
          cx="158"
          cy="85"
          r="19"
          fill="#E9B44C"
          stroke="#EFFFFB"
          strokeWidth="6"
        />
        <rect
          x="-94"
          y="20"
          width="188"
          height="150"
          rx="42"
          fill="url(#robotBody)"
          stroke="#EFFFFB"
          strokeWidth="9"
        />
        <rect
          x="-118"
          y="-105"
          width="236"
          height="145"
          rx="58"
          fill="url(#robotBody)"
          stroke="#EFFFFB"
          strokeWidth="10"
        />
        <path d="M0-105v-38" stroke="#73EBDD" strokeWidth="9" />
        <circle
          cy="-155"
          r="15"
          fill="#E9B44C"
          stroke="#FFF2C3"
          strokeWidth="5"
        />
        <circle cx="-48" cy="-38" r="16" fill="#102E50" />
        <circle cx="48" cy="-38" r="16" fill="#102E50" />
        <circle cx="-43" cy="-43" r="5" fill="white" />
        <circle cx="53" cy="-43" r="5" fill="white" />
        <path
          d="M-38 1q38 30 76 0"
          fill="none"
          stroke="#102E50"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <circle
          cy="92"
          r="34"
          fill="#143B54"
          stroke="#E9B44C"
          strokeWidth="8"
        />
        <path
          d="m-15 92 11 11 22-27"
          fill="none"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  </AbsoluteFill>
);

const ShortIcon = ({ index }: { index: number }) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 760 360" width="760" height="360">
      <path
        d={
          index === 0
            ? "M90 270q120-180 240 0M430 270V95l95-55 95 55v175"
            : "M100 260h560M170 230V90h150v140M440 230V120h130v110"
        }
        fill="none"
        stroke={C.blue}
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={index === 0 ? 240 : 380}
        cy={index === 0 ? 130 : 150}
        r="48"
        fill={C.gold}
        style={{ translate: `0 ${Math.sin(f / 10) * 8}px` }}
      />
      <path
        d="M240 105v52m0 22v2"
        stroke={C.navy}
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M70 300q310 35 620 0"
        fill="none"
        stroke={C.coral}
        strokeWidth="10"
        strokeDasharray="18 14"
        strokeDashoffset={-f}
      />
    </svg>
  );
};
const Short = ({ index }: { index: number }) => {
  const item = data.shorts[index];
  const t = timings.shorts[index];
  const f = useCurrentFrame();
  const choices = f >= t.qEnd;
  const reveal = f >= t.reveal;
  const congrats = f >= t.congrats;
  const left = Math.max(0, Math.ceil((t.reveal - f) / 30));
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(#EAF7FF,#FFF6F0)",
        fontFamily: "Arial,sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#2D79B819 2px,transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 55,
          display: "flex",
          gap: 18,
        }}
      >
        <b
          style={{
            background: C.navy,
            color: "white",
            borderRadius: 30,
            padding: "15px 25px",
            fontSize: 28,
          }}
        >
          5. SINIF
        </b>
        <b
          style={{
            background: C.coral,
            color: "white",
            borderRadius: 30,
            padding: "15px 25px",
            fontSize: 28,
          }}
        >
          SOSYAL BİLGİLER
        </b>
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 135,
          height: 3,
          background: "#8EBBD6",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 178,
          height: 420,
          background: "white",
          borderRadius: 38,
          boxShadow: "0 18px 45px #18315325",
          padding: "45px 50px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <b
            style={{
              width: 74,
              height: 74,
              borderRadius: 24,
              background: C.gold,
              color: C.navy,
              fontSize: 55,
              display: "grid",
              placeItems: "center",
            }}
          >
            ?
          </b>
          <b style={{ fontSize: 27, color: C.coral }}>
            HIZLI SORU • {item.topic}
          </b>
        </div>
        <div
          style={{
            fontSize: 45,
            lineHeight: 1.15,
            fontWeight: 900,
            color: C.navy,
            marginTop: 32,
          }}
        >
          {item.question}
        </div>
        <div
          style={{
            position: "absolute",
            left: 50,
            right: 50,
            bottom: 35,
            borderRadius: 18,
            background: "#EDF6FA",
            padding: "15px 22px",
            fontSize: 23,
            color: "#476275",
            fontWeight: 700,
          }}
        >
          Bilgini kullan, en uygun seçeneği bul.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 620,
          width: 760,
          height: 360,
        }}
      >
        <ShortIcon index={index} />
      </div>
      {choices && (
        <>
          <div
            style={{
              position: "absolute",
              left: 72,
              top: 990,
              width: 680,
              display: "grid",
              gap: 18,
            }}
          >
            {item.options.map((o, j) => (
              <div
                key={o}
                style={{
                  height: 102,
                  borderRadius: 25,
                  background:
                    reveal && j === item.correct ? "#DDF6E9" : "white",
                  border: `5px solid ${reveal && j === item.correct ? C.mint : "#C9DCE7"}`,
                  boxShadow: "0 9px 22px #1831531F",
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  padding: "0 24px",
                  boxSizing: "border-box",
                  fontSize: 30,
                  fontWeight: 850,
                  color: C.navy,
                }}
              >
                <b
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 17,
                    display: "grid",
                    placeItems: "center",
                    background: reveal && j === item.correct ? C.mint : C.navy,
                    color: "white",
                  }}
                >
                  {"ABCD"[j]}
                </b>
                {o}
                {reveal && j === item.correct && (
                  <b
                    style={{ marginLeft: "auto", fontSize: 38, color: C.mint }}
                  >
                    ✓
                  </b>
                )}
              </div>
            ))}
          </div>
          {!reveal && (
            <div
              style={{
                position: "absolute",
                left: 300,
                top: 1490,
                width: 190,
                height: 190,
                borderRadius: "50%",
                background: "white",
                border: `16px solid ${C.gold}`,
                display: "grid",
                placeItems: "center",
                boxShadow: "0 10px 30px #18315325",
              }}
            >
              <b style={{ fontSize: 76, color: C.navy }}>{left}</b>
              <span
                style={{
                  position: "absolute",
                  bottom: 22,
                  fontSize: 22,
                  fontWeight: 900,
                  color: C.coral,
                }}
              >
                DÜŞÜN!
              </span>
            </div>
          )}
        </>
      )}
      {reveal && (
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 1510,
            width: 760,
            borderRadius: 28,
            background: "#FFF1D4",
            border: `4px solid ${C.gold}`,
            padding: "22px 28px",
            boxSizing: "border-box",
            fontSize: 25,
            lineHeight: 1.28,
            fontWeight: 750,
            color: C.ink,
          }}
        >
          Cevabı birlikte açıklayalım.
        </div>
      )}
      <div style={{ position: "absolute", right: 110, top: 1125 }}>
        <GifCharacter name="ibrahim" x={0} y={0} scale={1.18} animate />
      </div>
      {congrats && (
        <div
          style={{
            position: "absolute",
            left: 120,
            right: 120,
            bottom: 65,
            height: 165,
            borderRadius: 38,
            background: C.mint,
            color: "white",
            display: "grid",
            placeItems: "center",
            fontSize: 60,
            fontWeight: 900,
            boxShadow: "0 16px 40px #18315338",
          }}
        >
          Tebrikler!
        </div>
      )}
      <Audio
        src={staticFile(
          `audio/sosyal/mirasimiz/shorts/${index + 1}/question.mp3`,
        )}
      />
      <Sequence from={t.reveal}>
        <Audio
          src={staticFile(
            `audio/sosyal/mirasimiz/shorts/${index + 1}/answer.mp3`,
          )}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
export const Shorts1 = () => <Short index={0} />;
export const Shorts2 = () => <Short index={1} />;
