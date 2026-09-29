import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import data from "../../content/anadoluda_ilkhayat.json";
import timings from "./timings.json";
import { GifCharacter } from "../GifCharacter";
import { CtaOptionOne } from "../previews/cta-option-1/CtaOptionOne";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";
const C = {
  navy: "#173B66",
  blue: "#2876C7",
  red: "#E65068",
  mint: "#25A98E",
  gold: "#F4BA47",
  ink: "#172638",
};
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const start = (g: "main" | "kurz", i: number) =>
  timings[g].slice(0, i).reduce((n, x) => n + x.frames, 0);
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
      transform: "scale(2)",
      transformOrigin: "top left",
    }}
  >
    {children}
  </div>
);
const VCanvas = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: "absolute",
      width: 540,
      height: 960,
      transform: "scale(2)",
      transformOrigin: "top left",
    }}
  >
    {children}
  </div>
);
const Bg = ({ dark = false }: { dark?: boolean }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: dark
          ? "radial-gradient(circle at 50% 40%,#193A60,#0B1B34 72%)"
          : "linear-gradient(145deg,#EAF7FF,#FFFFFF 50%,#FFF1EA)",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 20 }, (_, i) => (
        <i
          key={i}
          style={{
            position: "absolute",
            left: (i * 157) % 950,
            top: (i * 89) % 530,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: i % 2 ? C.mint : C.red,
            opacity: 0.17,
            transform: `translateY(${Math.sin(f / 22 + i) * 5}px)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
const box = (
  x: number,
  y: number,
  w: number,
  h: number,
  t: string,
  c = C.blue,
) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={13}
      fill="white"
      stroke={c}
      strokeWidth={3}
    />
    <text
      x={x + w / 2}
      y={y + h / 2 + 6}
      textAnchor="middle"
      fontSize="17"
      fontWeight="900"
      fill={C.navy}
    >
      {t}
    </text>
  </g>
);
const Visual = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame(),
    bob = Math.sin(f / 17) * 3,
    p = interpolate(f, [0, 55], [0, 1], clamp);
  return (
    <svg
      width="670"
      height="200"
      viewBox="0 0 670 200"
      style={{ overflow: "visible" }}
    >
      {kind === "dig" && (
        <>
          <path
            d="M25 104Q180 75 335 108T645 104M25 143Q180 119 335 145T645 143"
            fill="none"
            stroke="#C39163"
            strokeWidth="12"
          />
          <g transform={`translate(0 ${bob})`}>
            {box(50, 25, 170, 60, "TAŞ ALET", C.gold)}
            {box(250, 25, 170, 60, "ÇANAK", C.red)}
            {box(450, 25, 170, 60, "YAPI İZİ", C.mint)}
          </g>
          <text
            x="335"
            y="185"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fill={C.navy}
          >
            KAZI → BULUNTU → YORUM
          </text>
        </>
      )}
      {kind === "timeline" && (
        <>
          <path d="M50 104H620" stroke={C.navy} strokeWidth="5" />
          <circle
            cx="335"
            cy="104"
            r={18 + Math.sin(f / 13) * 3}
            fill={C.gold}
          />
          <text
            x="335"
            y="53"
            textAnchor="middle"
            fontSize="21"
            fontWeight="900"
            fill={C.red}
          >
            YAZININ İCADI • MÖ 3200
          </text>
          {box(62, 125, 225, 55, "TARİH ÖNCESİ", C.mint)}
          {box(383, 125, 225, 55, "TARİHÎ ÇAĞLAR")}
        </>
      )}
      {kind === "eras" && (
        <>
          <text
            x="335"
            y="55"
            textAnchor="middle"
            fontSize="22"
            fontWeight="900"
            fill={C.navy}
          >
            MÖ ← MİLAT → MS
          </text>
          <path d="M35 100H635" stroke={C.navy} strokeWidth="5" />
          {["İLK ÇAĞ", "ORTA ÇAĞ", "YENİ ÇAĞ", "YAKIN ÇAĞ"].map((x, i) => (
            <g key={i}>
              {box(
                22 + i * 164,
                118,
                140,
                55,
                x,
                [C.blue, C.mint, C.gold, C.red][i],
              )}
            </g>
          ))}
        </>
      )}
      {kind === "settle" && (
        <>
          {box(10, 65, 205, 85, "AVCI-TOPLAYICI", C.red)}
          {box(235, 45, 200, 105, "TARIM + SU", C.mint)}
          {box(455, 65, 205, 85, "KÖY / TİCARET")}
          <path
            d={`M215 109h${20 * p}M435 109h${20 * p}`}
            stroke={C.gold}
            strokeWidth="5"
          />
          <text
            x="335"
            y="188"
            textAnchor="middle"
            fontSize="17"
            fontWeight="900"
            fill={C.navy}
          >
            YERLEŞİK YAŞAMA GEÇİŞ
          </text>
        </>
      )}
      {kind === "layers" && (
        <>
          <path
            d="M80 157Q335 175 590 157M120 129Q335 147 550 129M175 100Q335 117 495 100M230 70Q335 87 440 70"
            fill="none"
            stroke="#C18A55"
            strokeWidth="20"
          />
          <text
            x="335"
            y="48"
            textAnchor="middle"
            fontSize="23"
            fontWeight="900"
            fill={C.navy}
          >
            HÖYÜK
          </text>
          <text
            x="335"
            y="191"
            textAnchor="middle"
            fontSize="17"
            fontWeight="900"
            fill={C.red}
          >
            ÜST ÜSTE YERLEŞİM KATMANLARI
          </text>
        </>
      )}
      {kind === "cayonu" && (
        <>
          <g transform={`translate(0 ${bob})`}>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect
                  x={55 + i * 150}
                  y="55"
                  width="128"
                  height="100"
                  rx="8"
                  fill="#EAD5B8"
                  stroke="#A67953"
                  strokeWidth="5"
                />
                {[0, 1, 2].map((j) => (
                  <path
                    key={j}
                    d={`M${77 + i * 150 + j * 35} 61v88`}
                    stroke="#A67953"
                    strokeWidth="3"
                  />
                ))}
              </g>
            ))}
          </g>
          <text
            x="335"
            y="188"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fill={C.navy}
          >
            IZGARA PLAN • TARIM • HAYVANCILIK
          </text>
        </>
      )}
      {kind === "catalhoyuk" && (
        <>
          <g transform={`translate(0 ${bob})`}>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect
                  x={90 + i * 164}
                  y="82"
                  width="164"
                  height="93"
                  fill="#D8A873"
                  stroke="#916043"
                  strokeWidth="4"
                />
                <path
                  d={`M${90 + i * 164} 82h164`}
                  stroke={C.navy}
                  strokeWidth="8"
                />
                <rect
                  x={155 + i * 164}
                  y="73"
                  width="32"
                  height="14"
                  fill="#47372E"
                />
              </g>
            ))}
          </g>
          <text
            x="335"
            y="45"
            textAnchor="middle"
            fontSize="22"
            fontWeight="900"
            fill={C.navy}
          >
            ÇATIDAN MERDİVENLE GİRİŞ
          </text>
        </>
      )}
      {kind === "hacilar" && (
        <>
          <g transform={`translate(0 ${bob})`}>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <path
                  d={`M${110 + i * 160} 55q-16 32 0 55l5 45q43 26 85 0l5-45q16-23 0-55Z`}
                  fill="#F4C894"
                  stroke="#9C5B46"
                  strokeWidth="5"
                />
                <path
                  d={`M${123 + i * 160} 104l68 42m0-42-68 42`}
                  stroke={C.red}
                  strokeWidth="5"
                />
              </g>
            ))}
          </g>
          <text
            x="335"
            y="191"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fill={C.navy}
          >
            EL YAPIMI BOYALI SERAMİK
          </text>
        </>
      )}
      {kind === "gobekli" && (
        <>
          <g transform={`translate(0 ${bob})`}>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect
                  x={122 + i * 163}
                  y="65"
                  width="38"
                  height="110"
                  rx="5"
                  fill="#D8C19B"
                  stroke="#8B775A"
                  strokeWidth="4"
                />
                <rect
                  x={108 + i * 163}
                  y="52"
                  width="66"
                  height="26"
                  rx="4"
                  fill="#E7D5B1"
                  stroke="#8B775A"
                  strokeWidth="4"
                />
              </g>
            ))}
          </g>
          <text
            x="335"
            y="35"
            textAnchor="middle"
            fontSize="21"
            fontWeight="900"
            fill={C.navy}
          >
            T BİÇİMLİ ANITSAL DİKİLİTAŞLAR
          </text>
        </>
      )}
    </svg>
  );
};
const MainScene = ({ i }: { i: number }) => {
  const s = data.main[i],
    f = useCurrentFrame(),
    left = s.speaker === "filiz";
  return (
    <AbsoluteFill>
      <Bg />
      <Canvas>
        <section
          style={{
            position: "absolute",
            left: left ? 205 : 30,
            top: 33,
            width: 725,
            height: 474,
            padding: "23px 28px",
            boxSizing: "border-box",
            background: "#FFFFFFF4",
            border: "1px solid #CEE1EC",
            borderRadius: 28,
            boxShadow: "0 14px 38px #173B6628",
            opacity: interpolate(f, [0, 9], [0.92, 1], clamp),
          }}
        >
          <b style={{ fontSize: 13, letterSpacing: 1.1, color: C.red }}>
            ANADOLU’NUN İLK YERLEŞMELERİNDE SOSYAL HAYAT
          </b>
          <h1
            style={{
              fontSize: 30,
              lineHeight: 1.08,
              color: C.navy,
              margin: "7px 0 5px",
            }}
          >
            {s.title}
          </h1>
          <p
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: C.ink,
              margin: "0 0 5px",
            }}
          >
            {s.lead}
          </p>
          <div style={{ height: 202, display: "grid", placeItems: "center" }}>
            <Visual kind={s.kind} />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}
          >
            {s.points.map((x, j) => (
              <div
                key={j}
                style={{
                  borderLeft: `5px solid ${j ? C.red : C.mint}`,
                  borderRadius: 9,
                  background: j ? "#FFF2E9" : "#E9F7F3",
                  padding: "8px 10px",
                  fontSize: 12.5,
                  fontWeight: 850,
                  lineHeight: 1.18,
                  color: C.ink,
                }}
              >
                {x}
              </div>
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              left: 28,
              right: 28,
              bottom: 12,
              background: "#FFF2D4",
              border: "2px solid #E7BB55",
              borderRadius: 10,
              padding: "7px 10px",
              fontSize: 12.3,
              fontWeight: 850,
              lineHeight: 1.15,
              color: C.ink,
              opacity: interpolate(
                f,
                [
                  Math.round(timings.main[i].audioFrames * 0.68),
                  Math.round(timings.main[i].audioFrames * 0.68) + 12,
                ],
                [0, 1],
                clamp,
              ),
            }}
          >
            <span style={{ color: C.red }}>NOT • </span>
            {s.note}
          </div>
        </section>
        <GifCharacter
          name={s.speaker as "filiz" | "ibrahim"}
          x={left ? 100 : 850}
          y={205}
          scale={1.05}
          animate
        />
      </Canvas>
      <Audio
        src={staticFile(
          `audio/sosyal/anadoluda_ilkhayat/main/${String(i + 1).padStart(2, "0")}.mp3`,
        )}
      />
    </AbsoluteFill>
  );
};
const Channel = () => (
  <div
    style={{
      position: "absolute",
      left: 40,
      top: 380,
      width: 960,
      height: 540,
      scale: 1.25,
      transformOrigin: "top left",
      zIndex: 90,
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
const Lumi = ({ i }: { i: number }) => {
  const f = useCurrentFrame(),
    x = i % 2 ? 890 : 75,
    y = 300 + Math.sin(f / 15) * 5;
  return (
    <svg
      style={{
        position: "absolute",
        left: x - 55,
        top: y - 88,
        filter: "drop-shadow(0 12px 12px #0008)",
      }}
      width="110"
      height="178"
      viewBox="0 0 110 178"
    >
      <path d="M55 16V2" stroke="#89F7E0" strokeWidth="5" />
      <circle cx="55" cy="6" r="7" fill="#FDCB60" />
      <rect
        x="13"
        y="20"
        width="84"
        height="75"
        rx="28"
        fill="#4BD5C6"
        stroke="#B7FFF1"
        strokeWidth="5"
      />
      <rect x="28" y="43" width="54" height="29" rx="11" fill="#173B66" />
      <circle cx="43" cy="57" r="7" fill="#FFE377" />
      <circle cx="68" cy="57" r="7" fill="#FFE377" />
      <rect
        x="30"
        y="100"
        width="50"
        height="54"
        rx="18"
        fill="#2DA8C8"
        stroke="#A2F4EE"
        strokeWidth="4"
      />
      <path
        d="M30 112L8 133M80 112l22 21M40 152l-5 19m33-19 5 19"
        stroke="#83F2DE"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <circle cx="8" cy="133" r="9" fill="#FFE377" />
      <circle cx="102" cy="133" r="9" fill="#FFE377" />
    </svg>
  );
};
const KurzArt = ({ i }: { i: number }) => {
  const f = useCurrentFrame(),
    p = interpolate(f, [0, 80], [0, 1], clamp),
    wave = Math.sin(f / 18) * 5;
  return (
    <svg width="670" height="200" viewBox="0 0 670 200">
      {i === 0 && (
        <>
          <path
            d="M25 156Q335 120 645 156"
            fill="none"
            stroke="#C28A5D"
            strokeWidth="25"
          />
          <path
            d="M25 110Q335 75 645 110"
            fill="none"
            stroke="#D9AA75"
            strokeWidth="22"
          />
          <path
            d="M25 64Q335 30 645 64"
            fill="none"
            stroke="#EDC791"
            strokeWidth="19"
          />
          <rect
            x={45 + p * 540}
            y="24"
            width="6"
            height="145"
            rx="3"
            fill={C.mint}
          />
          <circle cx={48 + p * 540} cy="171" r="15" fill={C.gold} />
          <text
            x="335"
            y="194"
            textAnchor="middle"
            fill={C.navy}
            fontWeight="900"
            fontSize="17"
          >
            KATMANLARI TARA • İZİ YORU
          </text>
        </>
      )}
      {i === 1 && (
        <>
          <circle cx="75" cy="120" r="48" fill="#E9D6B2" />
          <path
            d="M75 122v-30m0 20q-35-40-39-17m39 17q35-40 39-17"
            stroke={C.mint}
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M130 118h${75 * p}M350 118h${75 * p}`}
            stroke={C.gold}
            strokeWidth="8"
            strokeLinecap="round"
          />
          <g transform={`translate(0 ${wave})`}>
            <path
              d="M220 108l75-62 75 62v70H220Z"
              fill="#F5CC94"
              stroke={C.navy}
              strokeWidth="5"
            />
            <rect x="277" y="128" width="35" height="50" fill="#B27F54" />
          </g>
          <circle
            cx="540"
            cy="116"
            r="62"
            fill="#DDF7ED"
            stroke={C.mint}
            strokeWidth="5"
          />
          <text
            x="540"
            y="125"
            textAnchor="middle"
            fill={C.navy}
            fontWeight="900"
            fontSize="26"
          >
            KÖY
          </text>
        </>
      )}
      {i === 2 && (
        <>
          <rect
            x="50"
            y="45"
            width="250"
            height="120"
            rx="18"
            fill="#E9D6B2"
            stroke={C.gold}
            strokeWidth="5"
          />
          <path
            d="M80 70h188M80 100h188M80 130h188M112 60v100m65-100v100m65-100v100"
            stroke="#A47C55"
            strokeWidth="5"
          />
          <rect
            x="365"
            y="45"
            width="250"
            height="120"
            rx="18"
            fill="#D5A36D"
            stroke={C.blue}
            strokeWidth="5"
          />
          <path d="M370 65h240" stroke={C.navy} strokeWidth="7" />
          <rect x="475" y="56" width="35" height="18" fill="#4B463F" />
          <path
            d={`M492 78v${70 * p}`}
            stroke={C.gold}
            strokeWidth="5"
            strokeDasharray="8 6"
          />
          <text
            x="175"
            y="191"
            textAnchor="middle"
            fill={C.navy}
            fontWeight="900"
            fontSize="17"
          >
            ÇAYÖNÜ • IZGARA
          </text>
          <text
            x="490"
            y="191"
            textAnchor="middle"
            fill={C.navy}
            fontWeight="900"
            fontSize="17"
          >
            ÇATALHÖYÜK • ÇATI
          </text>
        </>
      )}
      {i === 3 && (
        <>
          <path
            d="M95 48q-20 30 0 55l8 53q48 25 95 0l8-53q20-25 0-55Z"
            fill="#F4C894"
            stroke="#995F46"
            strokeWidth="6"
          />
          <path d="M105 105l90 43m0-43-90 43" stroke={C.red} strokeWidth="7" />
          <rect
            x="452"
            y="62"
            width="50"
            height="110"
            rx="6"
            fill="#D8C19B"
            stroke="#8B775A"
            strokeWidth="5"
          />
          <rect
            x="430"
            y="47"
            width="94"
            height="31"
            rx="5"
            fill="#E7D5B1"
            stroke="#8B775A"
            strokeWidth="5"
          />
          <path
            d={`M238 108h${168 * p}`}
            stroke={C.mint}
            strokeWidth="7"
            strokeDasharray="10 8"
          />
          <text
            x="155"
            y="191"
            textAnchor="middle"
            fill={C.navy}
            fontWeight="900"
            fontSize="17"
          >
            HACILAR • SERAMİK
          </text>
          <text
            x="477"
            y="191"
            textAnchor="middle"
            fill={C.navy}
            fontWeight="900"
            fontSize="17"
          >
            GÖBEKLİTEPE • RİTÜEL
          </text>
        </>
      )}
    </svg>
  );
};
const KurzScene = ({ i }: { i: number }) => {
  const s = data.kurz[i],
    f = useCurrentFrame(),
    kind =
      s.kind === "compare1"
        ? "catalhoyuk"
        : s.kind === "compare2"
          ? "gobekli"
          : s.kind;
  return (
    <AbsoluteFill>
      <Bg dark />
      <Canvas>
        <div
          style={{
            position: "absolute",
            left: 160,
            top: 45,
            width: 640,
            textAlign: "center",
            color: "white",
            opacity: interpolate(f, [0, 12], [0, 1], clamp),
          }}
        >
          <b style={{ fontSize: 15, letterSpacing: 3, color: "#66E2D3" }}>
            LUMI İLE HIZLI KEŞİF
          </b>
          <h1 style={{ fontSize: 39, margin: "10px 0" }}>{s.title}</h1>
        </div>
        <div
          style={{
            position: "absolute",
            left: 145,
            top: 175,
            width: 670,
            height: 205,
            background: "#FFFFFFE8",
            border: "2px solid #86EBD3",
            borderRadius: 28,
            display: "grid",
            placeItems: "center",
            boxShadow: "0 22px 45px #0005",
          }}
        >
          <KurzArt i={i} />
        </div>
        <Lumi i={i} />
        <div
          style={{
            position: "absolute",
            left: 190,
            top: 402,
            width: 580,
            display: "flex",
            justifyContent: "center",
            gap: 12,
          }}
        >
          {s.facts.map((x, j) => (
            <div
              key={j}
              style={{
                borderRadius: 14,
                background: j ? "#F7C565" : "#66E2D3",
                color: C.navy,
                padding: "11px 15px",
                fontSize: 15,
                fontWeight: 900,
                opacity: pop(f, 15 + j * 8),
              }}
            >
              {x}
            </div>
          ))}
        </div>
      </Canvas>
      <Audio
        src={staticFile(
          `audio/sosyal/anadoluda_ilkhayat/kurz/${String(i + 1).padStart(2, "0")}.mp3`,
        )}
      />
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
    {kurzDuration() >= 1050 && (
      <Sequence from={900} durationInFrames={150}>
        <Channel />
      </Sequence>
    )}
  </AbsoluteFill>
);
const ShortArt = ({ index }: { index: number }) => {
  const f = useCurrentFrame();
  if (index === 1) {
    return (
      <svg width="475" height="184" viewBox="0 0 475 184">
        <path d="M20 68Q237 42 455 68M20 108Q237 82 455 108M20 148Q237 122 455 148" stroke="#C99463" strokeWidth="18" fill="none" />
        <g transform={`translate(${75 + Math.sin(f / 18) * 12} 18) rotate(-18 35 70)`}>
          <rect x="29" y="5" width="12" height="105" rx="6" fill={C.navy} />
          <path d="M4 98h62l-12 34H16Z" fill={C.gold} stroke={C.navy} strokeWidth="4" />
        </g>
        <g transform={`translate(${330 - Math.sin(f / 20) * 10} 30)`}>
          <circle cx="44" cy="40" r="33" fill="#E9D6B2" stroke={C.mint} strokeWidth="5" />
          <path d="M25 44q19-24 38 0M31 57h26" fill="none" stroke={C.red} strokeWidth="5" strokeLinecap="round" />
        </g>
        <text x="237" y="179" textAnchor="middle" fill={C.navy} fontWeight="900" fontSize="16">ARKEOLOJİK KAZI • GEÇMİŞİN İZLERİ</text>
      </svg>
    );
  }
  return (
    <svg width="475" height="184" viewBox="0 0 475 184">
      <path
        d="M10 147Q237 126 465 147"
        stroke="#D9B48B"
        strokeWidth="11"
        fill="none"
      />
      <g transform={`translate(0 ${Math.sin(f / 16) * 3})`}>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x={28 + i * 145}
              y="62"
              width="145"
              height="82"
              fill="#DFB687"
              stroke="#B88157"
              strokeWidth="4"
            />
            <path
              d={`M${28 + i * 145} 62h145`}
              stroke={C.navy}
              strokeWidth="7"
            />
            <rect
              x={82 + i * 145}
              y="53"
              width="31"
              height="13"
              fill="#776D64"
            />
          </g>
        ))}
      </g>
      <text
        x="237"
        y="179"
        textAnchor="middle"
        fill={C.navy}
        fontWeight="900"
        fontSize="16"
      >
        ANADOLU’DA İLK YERLEŞMELER
      </text>
    </svg>
  );
};
export const Short = ({ index = 0 }: { index?: number }) => {
  const q = data.shorts[index],
    t = timings.shorts[index],
    f = useCurrentFrame(),
    show = f >= t.qEnd,
    reveal = f >= t.reveal,
    count = Math.max(1, 5 - Math.floor((f - t.qEnd) / 30));
  return (
    <AbsoluteFill>
      <Bg />
      <VCanvas>
        <div
          style={{
            position: "absolute",
            left: 17,
            top: 13,
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          <b
            style={{
              padding: "8px 13px",
              borderRadius: 15,
              background: C.navy,
              color: "white",
              fontSize: 13,
            }}
          >
            5. SINIF
          </b>
          <b
            style={{
              padding: "8px 13px",
              borderRadius: 15,
              background: "#7553B8",
              color: "white",
              fontSize: 13,
            }}
          >
            SOSYAL BİLGİLER
          </b>
          <i style={{ width: 148, height: 2, background: "#BED6E8" }} />
        </div>
        <section
          style={{
            position: "absolute",
            left: 16,
            top: 54,
            width: 508,
            height: 209,
            borderRadius: 23,
            background: "#FFFFFFF5",
            boxShadow: "0 10px 25px #173B6620",
            border: "1px solid #D2E3EF",
            padding: "21px 20px 16px 71px",
            boxSizing: "border-box",
          }}
        >
          <b
            style={{
              position: "absolute",
              left: 18,
              top: 24,
              width: 42,
              height: 42,
              borderRadius: 13,
              background: C.gold,
              color: C.navy,
              fontSize: 29,
              display: "grid",
              placeItems: "center",
            }}
          >
            ?
          </b>
          <b style={{ fontSize: 12, letterSpacing: 0.8, color: "#7553B8" }}>
            HIZLI SORU • İLK YERLEŞMELER
          </b>
          <div
            style={{
              fontSize: 19,
              lineHeight: 1.16,
              fontWeight: 900,
              color: C.ink,
              marginTop: 10,
            }}
          >
            {q.question}
          </div>
          <b
            style={{
              position: "absolute",
              left: 71,
              bottom: 16,
              padding: "7px 10px",
              borderRadius: 8,
              background: "#EAF4FA",
              fontSize: 11,
              color: C.navy,
            }}
          >
            {q.strip}
          </b>
        </section>
        <div
          style={{
            position: "absolute",
            left: 27,
            top: 276,
            width: 486,
            height: 185,
          }}
        >
          <ShortArt index={index} />
        </div>
        {show && (
          <div
            style={{
              position: "absolute",
              left: 18,
              top: 471,
              width: 342,
              display: "grid",
              gap: 8,
            }}
          >
            {q.choices.map((x, i) => (
              <div
                key={x}
                style={{
                  height: 58,
                  borderRadius: 13,
                  background: reveal && i === q.correct ? "#DCF8E9" : "#FFFFFF",
                  border: `2px solid ${reveal && i === q.correct ? C.mint : "#C7DDE9"}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "0 6px 14px #173B6618",
                  padding: "0 12px",
                  boxSizing: "border-box",
                  color: C.navy,
                  fontSize: 18,
                  fontWeight: 900,
                }}
              >
                <b
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: reveal && i === q.correct ? C.mint : C.blue,
                    color: "white",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </b>
                {x}
                {reveal && i === q.correct && (
                  <span
                    style={{ marginLeft: "auto", color: C.mint, fontSize: 25 }}
                  >
                    ✓
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        <GifCharacter name="ibrahim" x={454} y={483} scale={1.02} animate />
        {!show && (
          <div
            style={{
              position: "absolute",
              left: 27,
              top: 791,
              width: 486,
              height: 88,
              background: "#FFFFFFE8",
              border: "2px solid #D5E6EF",
              borderRadius: 18,
              display: "grid",
              placeItems: "center",
              fontSize: 18,
              fontWeight: 900,
              color: C.navy,
            }}
          >
            Soruyu dikkatle incele
          </div>
        )}
        {show && !reveal && (
          <div
            style={{
              position: "absolute",
              left: 208,
              top: 770,
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: `conic-gradient(${C.blue} ${Math.max(0, 360 - ((f - t.qEnd) * 360) / 150)}deg,#DCEBF3 0)`,
              display: "grid",
              placeItems: "center",
              boxShadow: "0 8px 20px #173B6630",
              boxSizing: "border-box",
              color: C.navy,
              fontWeight: 900,
              fontSize: 31,
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 78,
                height: 78,
                borderRadius: "50%",
                background: "white",
                display: "grid",
                placeItems: "center",
                lineHeight: 1,
              }}
            >
              {count}
              <small
                style={{
                  display: "block",
                  fontSize: 10,
                  color: C.red,
                  marginTop: -15,
                }}
              >
                DÜŞÜN!
              </small>
            </div>
          </div>
        )}
        {reveal && f < t.congrats && (
          <div
            style={{
              position: "absolute",
              left: 27,
              top: 791,
              width: 486,
              height: 88,
              background: "#E8F8F3",
              border: `2px solid ${C.mint}`,
              borderRadius: 18,
              display: "grid",
              placeItems: "center",
              fontSize: 18,
              fontWeight: 900,
              color: C.navy,
            }}
          >
            ✓ Doğru seçeneği incele
          </div>
        )}
        {f >= t.congrats && (
          <div
            style={{
              position: "absolute",
              left: 26,
              top: 850,
              width: 488,
              height: 79,
              borderRadius: 20,
              background: "linear-gradient(90deg,#EC526A,#FF826E)",
              color: "white",
              display: "grid",
              placeItems: "center",
              fontSize: 35,
              fontWeight: 900,
              scale: pop(f, t.congrats),
            }}
          >
            Tebrikler!
          </div>
        )}
      </VCanvas>
      <Audio
        src={staticFile(
          `audio/sosyal/anadoluda_ilkhayat/shorts/${index + 1}/question.mp3`,
        )}
      />
      <Sequence from={t.reveal}>
        <Audio
          src={staticFile(
            `audio/sosyal/anadoluda_ilkhayat/shorts/${index + 1}/answer.mp3`,
          )}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
