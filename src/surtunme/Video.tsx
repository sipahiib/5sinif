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
import data from "../../content/surtunme.json";
import timings from "./timings.json";
import { GifCharacter } from "../GifCharacter";
import { CtaOptionOne } from "../previews/cta-option-1/CtaOptionOne";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const navy = "#173B66",
  blue = "#2876C7",
  coral = "#E65068",
  mint = "#25A98E",
  yellow = "#FFD166";
const pop = (f: number, d = 0, k = 110) =>
  spring({
    frame: f - d,
    fps: 30,
    config: { damping: 20, stiffness: k, mass: 0.85 },
  });
const start = (g: "main" | "kurz", i: number) =>
  timings[g].slice(0, i).reduce((a, b) => a + b.frames, 0);
export const mainDuration = () => start("main", timings.main.length) + 210;
export const kurzDuration = () => start("kurz", timings.kurz.length);
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

const Lumi = () => {
  const f = useCurrentFrame();
  return (
    <svg
      width="142"
      height="158"
      viewBox="0 0 180 180"
      style={{
        transform: `translateY(${Math.sin(f / 18) * 4}px) rotate(${Math.sin(f / 34) * 1.5}deg)`,
      }}
    >
      <ellipse cx="90" cy="169" rx="49" ry="7" fill="#0004" />
      <path
        d="M47 82 16 61v48l31-12M133 82l31-21v48l-31-12"
        fill="#56D8D2"
        stroke="#15172F"
        strokeWidth="6"
      />
      <rect
        x="39"
        y="43"
        width="102"
        height="104"
        rx="45"
        fill="#7257E8"
        stroke="#15172F"
        strokeWidth="7"
      />
      <path d="M43 79Q90 9 138 79" fill="#A897FF" />
      <rect
        x="54"
        y="69"
        width="72"
        height="54"
        rx="23"
        fill="#EFFFFE"
        stroke="#15172F"
        strokeWidth="6"
      />
      <ellipse
        cx="75"
        cy="94"
        rx="7"
        ry={f % 137 < 4 ? 2 : 12}
        fill="#15172F"
      />
      <ellipse
        cx="106"
        cy="94"
        rx="7"
        ry={f % 137 < 4 ? 2 : 12}
        fill="#15172F"
      />
      <path
        d="M78 110q12 8 24 0M90 43V24"
        fill="none"
        stroke="#15172F"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="90" cy="18" r="9" fill="#FF6B6B" />
      <circle cx="57" cy="142" r="9" fill={yellow} />
      <circle cx="123" cy="142" r="9" fill={yellow} />
    </svg>
  );
};

const Arrow = ({
  x1,
  y1,
  x2,
  y2,
  color,
  label,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  label?: string;
}) => (
  <g>
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth="7"
      strokeLinecap="round"
    />
    <path d={`M${x2} ${y2}l-18 -11v22Z`} fill={color} />
    {label && (
      <text
        x={(x1 + x2) / 2}
        y={y1 - 12}
        textAnchor="middle"
        fill={color}
        fontSize="20"
        fontWeight="900"
      >
        {label}
      </text>
    )}
  </g>
);
const MainDiagram = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame(),
    draw = interpolate(f, [7, 50], [0, 1], clamp),
    move = (f * 1.4) % 110;
  if (["contact", "direction", "threshold"].includes(kind))
    return (
      <svg viewBox="0 0 640 165" width="100%" height="135">
        <path d="M55 127H585" stroke={navy} strokeWidth="8" />
        <rect
          x="258"
          y="62"
          width="124"
          height="65"
          rx="12"
          fill="#F4C46E"
          stroke={navy}
          strokeWidth="5"
        />
        <Arrow
          x1={320}
          y1={48}
          x2={510}
          y2={48}
          color={blue}
          label={kind === "threshold" ? "UYGULANAN KUVVET" : "HAREKET"}
        />
        <Arrow
          x1={315}
          y1={145}
          x2={145}
          y2={145}
          color={coral}
          label="SÜRTÜNME"
        />
        {kind === "threshold" && (
          <text
            x="320"
            y="98"
            textAnchor="middle"
            fill={navy}
            fontSize="23"
            fontWeight="900"
          >
            F &gt; Fs
          </text>
        )}
      </svg>
    );
  if (["surfaces", "noteSurface"].includes(kind))
    return (
      <svg viewBox="0 0 640 165" width="100%" height="135">
        <path d="M50 125H295" stroke={blue} strokeWidth="7" />
        <path
          d="M345 125q18-28 36 0t36 0t36 0t36 0t36 0t36 0"
          fill="none"
          stroke={coral}
          strokeWidth="8"
        />
        <rect
          x="118"
          y="70"
          width="92"
          height="55"
          rx="10"
          fill="#75D8C5"
          stroke={navy}
          strokeWidth="4"
        />
        <rect
          x="430"
          y="70"
          width="92"
          height="55"
          rx="10"
          fill="#F4C46E"
          stroke={navy}
          strokeWidth="4"
        />
        <text
          x="170"
          y="154"
          textAnchor="middle"
          fill={blue}
          fontSize="19"
          fontWeight="900"
        >
          AZ PÜRÜZLÜ
        </text>
        <text
          x="465"
          y="154"
          textAnchor="middle"
          fill={coral}
          fontSize="19"
          fontWeight="900"
        >
          ÇOK PÜRÜZLÜ
        </text>
      </svg>
    );
  if (["weight", "noteWeight"].includes(kind))
    return (
      <svg viewBox="0 0 640 165" width="100%" height="135">
        <path d="M45 130H595" stroke={navy} strokeWidth="7" />
        <rect
          x="105"
          y="82"
          width="110"
          height="48"
          rx="9"
          fill="#88DCCB"
          stroke={blue}
          strokeWidth="5"
        />
        <rect
          x="385"
          y="42"
          width="125"
          height="88"
          rx="9"
          fill="#F3BD69"
          stroke={coral}
          strokeWidth="5"
        />
        <text
          x="160"
          y="114"
          textAnchor="middle"
          fill={navy}
          fontSize="22"
          fontWeight="900"
        >
          10 N
        </text>
        <text
          x="448"
          y="94"
          textAnchor="middle"
          fill={navy}
          fontSize="24"
          fontWeight="900"
        >
          30 N
        </text>
        <Arrow x1={105} y1={148} x2={65} y2={148} color={mint} />
        <Arrow x1={385} y1={148} x2={290} y2={148} color={coral} />
      </svg>
    );
  if (kind === "area")
    return (
      <svg viewBox="0 0 640 165" width="100%" height="135">
        <path d="M55 132H585" stroke={navy} strokeWidth="7" />
        <rect
          x="95"
          y="79"
          width="180"
          height="53"
          rx="8"
          fill="#7ADCC9"
          stroke={blue}
          strokeWidth="5"
        />
        <rect
          x="405"
          y="37"
          width="72"
          height="95"
          rx="8"
          fill="#7ADCC9"
          stroke={blue}
          strokeWidth="5"
        />
        <text
          x="320"
          y="160"
          textAnchor="middle"
          fill={mint}
          fontSize="22"
          fontWeight="900"
        >
          AYNI AĞIRLIK • AYNI SÜRTÜNME
        </text>
      </svg>
    );
  if (kind === "snow")
    return (
      <svg viewBox="0 0 640 165" width="100%" height="135">
        <path d="M45 130H595" stroke="#A5C9EA" strokeWidth="12" />
        <circle
          cx="250"
          cy="99"
          r="45"
          fill="#273C55"
          stroke={navy}
          strokeWidth="6"
        />
        <circle
          cx="390"
          cy="99"
          r="45"
          fill="#273C55"
          stroke={navy}
          strokeWidth="6"
        />
        {[210, 230, 250, 270, 290, 350, 370, 390, 410, 430].map((x) => (
          <path key={x} d={`M${x} 64l12 70`} stroke={yellow} strokeWidth="5" />
        ))}
        <path d="M210 70h220l-35-38H265Z" fill={coral} />
        <text
          x="320"
          y="158"
          textAnchor="middle"
          fill={blue}
          fontSize="20"
          fontWeight="900"
        >
          ZİNCİR → DAHA FAZLA TUTUNMA
        </text>
      </svg>
    );
  if (kind === "wheels")
    return (
      <svg viewBox="0 0 640 165" width="100%" height="135">
        <path d="M45 130H595" stroke={navy} strokeWidth="7" />
        <rect
          x={95 + move}
          y="54"
          width="180"
          height="66"
          rx="10"
          fill="#F2BC68"
          stroke={navy}
          strokeWidth="5"
        />
        <circle cx={130 + move} cy="130" r="22" fill={blue} />
        <circle cx={240 + move} cy="130" r="22" fill={blue} />
        <text x="420" y="93" fill={mint} fontSize="25" fontWeight="900">
          YUVARLANMA
        </text>
      </svg>
    );
  if (kind === "brake")
    return (
      <svg viewBox="0 0 640 165" width="100%" height="135">
        <circle
          cx="320"
          cy="88"
          r="64"
          fill="none"
          stroke={blue}
          strokeWidth="12"
        />
        <circle cx="320" cy="88" r="10" fill={navy} />
        <path
          d="M240 25 285 57M400 25 355 57"
          stroke={coral}
          strokeWidth="15"
          strokeLinecap="round"
        />
        <path d="M250 18h140" stroke={navy} strokeWidth="7" />
        <text
          x="320"
          y="158"
          textAnchor="middle"
          fill={coral}
          fontSize="22"
          fontWeight="900"
        >
          FREN → SÜRTÜNME ARTAR
        </text>
      </svg>
    );
  if (kind === "lubrication")
    return (
      <svg viewBox="0 0 640 165" width="100%" height="135">
        {[215, 320, 425].map((x, i) => (
          <g key={x} transform={`rotate(${f * (i % 2 ? 1 : -1)} ${x} 90)`}>
            <circle
              cx={x}
              cy="90"
              r="47"
              fill="#EAF3FB"
              stroke={blue}
              strokeWidth="6"
            />
            {Array.from({ length: 8 }, (_, j) => (
              <rect
                key={j}
                x={x - 7}
                y="28"
                width="14"
                height="24"
                fill={navy}
                transform={`rotate(${j * 45} ${x} 90)`}
              />
            ))}
          </g>
        ))}
        <path d="M320 15q-24 30 0 44q24-14 0-44" fill={yellow} />
        <text
          x="320"
          y="158"
          textAnchor="middle"
          fill={mint}
          fontSize="21"
          fontWeight="900"
        >
          YAĞ → AŞINMA VE SES AZALIR
        </text>
      </svg>
    );
  if (["air", "airFactors", "aero"].includes(kind))
    return (
      <svg viewBox="0 0 640 165" width="100%" height="135">
        {Array.from({ length: 6 }, (_, i) => (
          <path
            key={i}
            d={`M40 ${30 + i * 21}C180 ${18 + i * 22} 390 ${45 + i * 16} 600 ${27 + i * 20}`}
            fill="none"
            stroke={i % 2 ? "#91C9F0" : "#C7E7FB"}
            strokeWidth="5"
            strokeDasharray="18 14"
            strokeDashoffset={-f * (1 + i * 0.15)}
          />
        ))}
        {kind === "air" ? (
          <path
            d="M270 42q50-48 100 0l-18 28H288Z M320 70v55"
            fill="#F1A65E"
            stroke={coral}
            strokeWidth="5"
          />
        ) : (
          <path
            d="M210 84q105-72 225 0q-120 42-225 0"
            fill="#6DDAC7"
            stroke={navy}
            strokeWidth="6"
          />
        )}
        <Arrow
          x1={500}
          y1={135}
          x2={390}
          y2={135}
          color={coral}
          label="DİRENÇ"
        />
      </svg>
    );
  if (kind === "water")
    return (
      <svg viewBox="0 0 640 165" width="100%" height="135">
        <rect x="35" y="28" width="570" height="124" rx="22" fill="#BDE9FA" />
        <path
          d="M35 57q35-15 70 0t70 0t70 0t70 0t70 0t70 0t70 0t70 0"
          fill="none"
          stroke={blue}
          strokeWidth="6"
        />
        <path
          d="M195 96q100-65 220 0q-120 52-220 0M195 96l-50-35v70Z"
          fill="#6AD5C4"
          stroke={navy}
          strokeWidth="5"
        />
        <Arrow x1={520} y1={125} x2={420} y2={125} color={coral} />
      </svg>
    );
  return (
    <svg viewBox="0 0 640 165" width="100%" height="135">
      <path d="M50 130H590" stroke={navy} strokeWidth="7" />
      <rect x="100" y="70" width="105" height="60" rx="10" fill="#7ADBC8" />
      <circle
        cx="320"
        cy="90"
        r="52"
        fill="none"
        stroke={blue}
        strokeWidth="9"
      />
      <path
        d="M440 130q60-110 120 0"
        fill="#F1BD68"
        stroke={coral}
        strokeWidth="6"
      />
    </svg>
  );
};

const MainScene = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    s = data.main[index],
    t = timings.main[index],
    final = index === data.main.length - 1,
    left = s.speaker === "filiz",
    cardLeft = final ? 196 : left ? 220 : 34,
    cardWidth = final ? 568 : 706;
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(140deg,#EAF5FF,#FFFFFF 52%,#FFF0ED)",
        fontFamily: "Trebuchet MS,Arial",
        color: navy,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage: `radial-gradient(${blue} 1px,transparent 1px)`,
          backgroundSize: "34px 34px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 34,
          right: 34,
          top: 22,
          height: 48,
          display: "flex",
          alignItems: "center",
          fontWeight: 900,
          letterSpacing: 1,
        }}
      >
        <span>5. SINIF FEN BİLİMLERİ</span>
        <span style={{ margin: "0 17px", color: "#AFC4D8" }}>|</span>
        <span>SÜRTÜNME KUVVETİ</span>
        <span style={{ marginLeft: "auto" }}>
          {String(index + 1).padStart(2, "0")} / {data.main.length}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: cardLeft,
          top: 87,
          width: cardWidth,
          height: 392,
          boxSizing: "border-box",
          padding: "20px 25px",
          borderRadius: 26,
          background: "#FFFFFFF4",
          border: "1px solid #CFDFEE",
          boxShadow: "0 18px 40px #173B6618",
        }}
      >
        <div
          style={{
            color: coral,
            fontSize: 13,
            fontWeight: 950,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            opacity: pop(f),
          }}
        >
          {s.title}
        </div>
        <div
          style={{
            fontSize: s.lead.length > 61 ? 23 : 27,
            lineHeight: 1.16,
            fontWeight: 950,
            marginTop: 5,
            minHeight: 58,
          }}
        >
          {s.lead}
        </div>
        <MainDiagram kind={s.kind} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 11,
            marginTop: 2,
          }}
        >
          {s.points.map((p, i) => (
            <div
              key={p}
              style={{
                minHeight: 56,
                boxSizing: "border-box",
                padding: "10px 13px",
                borderRadius: 14,
                background: i ? "#EEF9F6" : "#EEF5FC",
                border: `1.5px solid ${i ? "#BCE8DE" : "#CFE1F2"}`,
                color: i ? "#176C5B" : navy,
                fontSize: 14.5,
                lineHeight: 1.25,
                fontWeight: 850,
                opacity: pop(f, 28 + i * 12),
              }}
            >
              <span style={{ color: i ? mint : blue, marginRight: 6 }}>✓</span>
              {p}
            </div>
          ))}
        </div>
        {s.note && (
          <div
            style={{
              position: "absolute",
              right: 18,
              top: -14,
              padding: "6px 14px",
              borderRadius: 10,
              background: yellow,
              color: "#553E08",
              fontSize: 12,
              fontWeight: 950,
              boxShadow: "0 7px 18px #C28B2433",
            }}
          >
            NOT • ÖNEMLİ
          </div>
        )}
      </div>
      {final ? (
        <>
          <GifCharacter
            name="filiz"
            x={88}
            y={172}
            scale={1.17}
            animate={false}
          />
          <GifCharacter
            name="ibrahim"
            x={870}
            y={172}
            scale={1.17}
            flip
            animate={f < t.audioFrames}
          />
        </>
      ) : (
        <GifCharacter
          name={s.speaker as "filiz" | "ibrahim"}
          x={left ? 110 : 850}
          y={166}
          scale={1.3}
          flip={!left}
          animate={f < t.audioFrames}
        />
      )}{" "}
      {!final && (
        <div
          style={{
            position: "absolute",
            left: left ? 53 : 793,
            top: 457,
            width: 114,
            height: 28,
            borderRadius: 9,
            background: left ? coral : blue,
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
          }}
        >
          {left ? "Filiz" : "İbrahim"}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          left: cardLeft,
          width: cardWidth,
          bottom: 25,
          height: 4,
          borderRadius: 4,
          background: "#D4E1EC",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(100 * f) / t.frames}%`,
            borderRadius: 4,
            background: blue,
          }}
        />
      </div>
      <Audio src={staticFile(`audio/fen/kuvvet/surtunme/main/${s.id}.mp3`)} />
    </AbsoluteFill>
  );
};

const KurzVisual = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame(),
    p = pop(f, 2, 70),
    d = interpolate(f, [8, 65], [0, 1], clamp);
  if (kind === "micro")
    return (
      <svg viewBox="0 0 540 160" width="540" height="160">
        <path
          d="M35 72q25-42 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0"
          fill="none"
          stroke="#FFB36B"
          strokeWidth="8"
        />
        <path
          d="M35 105q25 42 50 0t50 0t50 0t50 0t50 0t50 0t50 0t50 0"
          fill="none"
          stroke="#6CE5D0"
          strokeWidth="8"
        />
        <g transform={`translate(${Math.sin(f / 18) * 18} 0)`}>
          <path d="M260 42v92" stroke="#FF6F78" strokeWidth="5" />
          <circle cx="260" cy="88" r="11" fill="white" />
        </g>
      </svg>
    );
  if (kind === "energy")
    return (
      <svg viewBox="0 0 540 160" width="540" height="160">
        <rect x="40" y="116" width="460" height="16" rx="8" fill="#7892C8" />
        <circle
          cx={100 + ((f * 2.1) % 340)}
          cy="91"
          r="25"
          fill="#7257E8"
          stroke="white"
          strokeWidth="4"
        />
        <path
          d="M80 143h380"
          stroke="#FFB36B"
          strokeWidth="7"
          strokeDasharray="10 14"
          strokeDashoffset={-f}
        />
        {Array.from({ length: 8 }, (_, i) => (
          <path
            key={i}
            d={`M${210 + i * 24} 75q8-18 16 0`}
            fill="none"
            stroke="#FF6F78"
            strokeWidth="3"
            opacity={0.3 + 0.7 * Math.sin(f / 12 + i) ** 2}
          />
        ))}
      </svg>
    );
  if (kind === "grip")
    return (
      <svg viewBox="0 0 540 160" width="540" height="160">
        <path d="M72 125V42M468 125V42" stroke="#7892C8" strokeWidth="9" />
        <path
          d="M72 52h145v65H72M468 52H323v65h145"
          fill="#FFFFFF08"
          stroke="#FFB36B"
          strokeWidth="5"
        />
        <circle
          cx="270"
          cy="84"
          r="36"
          fill="#7257E8"
          stroke="white"
          strokeWidth="5"
        />
        <path
          d={`M270 84L${270 + 30 * Math.cos(f / 25)} ${84 + 30 * Math.sin(f / 25)}`}
          stroke="#6CE5D0"
          strokeWidth="7"
        />
        <text
          x="144"
          y="92"
          textAnchor="middle"
          fill="#FFB36B"
          fontSize="19"
          fontWeight="900"
        >
          TUTUN
        </text>
        <text
          x="396"
          y="92"
          textAnchor="middle"
          fill="#6CE5D0"
          fontSize="19"
          fontWeight="900"
        >
          KAY
        </text>
      </svg>
    );
  if (kind === "bearing")
    return (
      <svg viewBox="0 0 540 160" width="540" height="160">
        <circle
          cx="270"
          cy="80"
          r="67"
          fill="none"
          stroke="#7892C8"
          strokeWidth="16"
        />
        <circle
          cx="270"
          cy="80"
          r="34"
          fill="#7257E8"
          stroke="white"
          strokeWidth="5"
        />
        {Array.from({ length: 9 }, (_, i) => {
          const a = (i * Math.PI * 2) / 9 + f / 22;
          return (
            <circle
              key={i}
              cx={270 + Math.cos(a) * 51}
              cy={80 + Math.sin(a) * 51}
              r="9"
              fill={i % 2 ? "#FFB36B" : "#6CE5D0"}
              stroke="#15172F"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    );
  if (kind === "stream")
    return (
      <svg viewBox="0 0 540 160" width="540" height="160">
        {[25, 50, 75, 100, 125].map((y, i) => (
          <path
            key={y}
            d={
              i === 2
                ? `M30 ${y}C170 ${y} 170 35 275 35S380 ${y} 510 ${y}`
                : `M30 ${y}C190 ${y} 170 ${y + (i - 2) * 18} 285 ${y + (i - 2) * 18}S380 ${y} 510 ${y}`
            }
            fill="none"
            stroke={i % 2 ? "#6CE5D0" : "#7892C8"}
            strokeWidth="4"
            strokeDasharray="13 10"
            strokeDashoffset={-f * (0.7 + i * 0.12)}
          />
        ))}
        <path
          d="M210 80q80-75 165 0q-85 70-165 0"
          fill="#FFB36B"
          stroke="white"
          strokeWidth="4"
        />
      </svg>
    );
  if (kind === "parachute")
    return (
      <svg viewBox="0 0 540 160" width="540" height="160">
        <path
          d="M130 58Q270-55 410 58Z"
          fill="#FFB36B"
          stroke="white"
          strokeWidth="5"
        />
        <path
          d="M130 58 270 135M410 58 270 135M200 40l70 95M340 40l-70 95"
          stroke="#6CE5D0"
          strokeWidth="3"
        />
        <circle cx="270" cy="140" r="14" fill="#7257E8" />
        {[165, 215, 325, 375].map((x) => (
          <path
            key={x}
            d={`M${x} 145v-45`}
            stroke="#FF6F78"
            strokeWidth="5"
            strokeDasharray="7 7"
            strokeDashoffset={-f}
          />
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 540 160" width="540" height="160">
      <rect
        x="45"
        y="55"
        width="190"
        height="75"
        rx="18"
        fill="#FFB36B22"
        stroke="#FFB36B"
        strokeWidth="5"
      />
      <rect
        x="305"
        y="55"
        width="190"
        height="75"
        rx="18"
        fill="#6CE5D022"
        stroke="#6CE5D0"
        strokeWidth="5"
      />
      <text
        x="140"
        y="100"
        textAnchor="middle"
        fill="#FFB36B"
        fontSize="22"
        fontWeight="900"
      >
        FREN
      </text>
      <text
        x="400"
        y="100"
        textAnchor="middle"
        fill="#6CE5D0"
        fontSize="22"
        fontWeight="900"
      >
        YAĞLAMA
      </text>
      <circle cx={270 + Math.sin(f / 16) * 18} cy="92" r="14" fill="#FF6F78" />
    </svg>
  );
};

const KurzScene = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    s = data.kurz[index],
    t = timings.kurz[index],
    camera = interpolate(f, [0, 80], [1.04, 1], clamp),
    colors = ["#FFB36B", "#6CE5D0"];
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 25% 20%,#30345F,#10172D 72%)",
        fontFamily: "Trebuchet MS,Arial",
        color: "white",
        overflow: "hidden",
        transform: `scale(${camera})`,
      }}
    >
      <svg
        width="960"
        height="540"
        style={{ position: "absolute", opacity: 0.25 }}
      >
        {Array.from({ length: 46 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 191) % 960}
            cy={(i * 107) % 540}
            r={1 + (i % 2)}
            fill="#B5CDEF"
          />
        ))}
        <ellipse
          cx="465"
          cy="290"
          rx="430"
          ry="205"
          fill="none"
          stroke="#718BD0"
          strokeDasharray="5 13"
          strokeDashoffset={f * 0.2}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 38,
          top: 27,
          color: "#6CE5D0",
          fontSize: 12,
          fontWeight: 950,
          letterSpacing: 2,
        }}
      >
        LUMİ • KUVVET LABORATUVARI • {index + 1}/7
      </div>
      <div
        style={{
          position: "absolute",
          left: 38,
          top: 63,
          fontSize: 31,
          fontWeight: 950,
        }}
      >
        {s.title}
      </div>
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 108,
          fontSize: 16,
          color: "#C3D5ED",
        }}
      >
        {s.lead}
      </div>
      <div style={{ position: "absolute", left: 35, top: 142 }}>
        <KurzVisual kind={s.kind} />
      </div>
      {s.examples.map((x, i) => (
        <div
          key={x}
          style={{
            position: "absolute",
            left: 40,
            top: 306 + i * 78,
            width: 535,
            height: 62,
            boxSizing: "border-box",
            padding: "13px 20px",
            display: "flex",
            alignItems: "center",
            borderRadius: 16,
            background: i ? "#194044" : "#443841",
            border: `2px solid ${colors[i]}`,
            fontSize: x.length > 43 ? 17 : 20,
            fontWeight: 900,
            opacity: pop(f, 14 + i * 16),
            transform: `translateX(${(1 - pop(f, 14 + i * 16)) * (i ? -28 : 28)}px)`,
          }}
        >
          {x}
        </div>
      ))}
      <svg
        width="75"
        height="140"
        viewBox="0 0 75 140"
        style={{ position: "absolute", left: 575, top: 306 }}
      >
        <path
          d="M0 31H75M0 109H75"
          stroke="#6CE5D0"
          strokeWidth="3"
          strokeDasharray="8 6"
          strokeDashoffset={-f * 0.3}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 650,
          top: 306,
          right: 35,
          display: "grid",
          gap: 16,
        }}
      >
        {s.facts.map((x, i) => (
          <div
            key={x}
            style={{
              height: 62,
              boxSizing: "border-box",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              borderRadius: 14,
              background: "#FFFFFF0A",
              borderLeft: `4px solid ${colors[i]}`,
              color: colors[i],
              fontSize: 15,
              fontWeight: 850,
              opacity: pop(f, 38 + i * 14),
              transform: `scaleX(${pop(f, 38 + i * 14)})`,
              transformOrigin: "left center",
            }}
          >
            {x}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          right: 70,
          bottom: 8,
          transform: "scale(.72)",
          transformOrigin: "bottom center",
        }}
      >
        <Lumi />
      </div>
      <Audio src={staticFile(`audio/fen/kuvvet/surtunme/kurz/${s.id}.mp3`)} />
    </AbsoluteFill>
  );
};

const ChannelCard = () => (
  <Sequence from={900} durationInFrames={150}>
    <div
      style={{
        position: "absolute",
        width: 960,
        height: 540,
        transform: "translate(-200px,10px) scale(.65)",
        transformOrigin: "bottom right",
      }}
    >
      <ChannelLowerThird />
    </div>
  </Sequence>
);
export const Main = () => (
  <AbsoluteFill>
    <Canvas>
      {data.main.map((_, i) => (
        <Sequence
          key={i}
          from={start("main", i)}
          durationInFrames={timings.main[i].frames}
        >
          <MainScene index={i} />
        </Sequence>
      ))}
      <ChannelCard />
      <Sequence from={start("main", data.main.length)} durationInFrames={210}>
        <CtaOptionOne />
      </Sequence>
    </Canvas>
  </AbsoluteFill>
);
export const Kurz = () => (
  <AbsoluteFill>
    <Canvas>
      {data.kurz.map((_, i) => (
        <Sequence
          key={i}
          from={start("kurz", i)}
          durationInFrames={timings.kurz[i].frames}
        >
          <KurzScene index={i} />
        </Sequence>
      ))}
      <ChannelCard />
    </Canvas>
  </AbsoluteFill>
);

const ShortVisual = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    d = interpolate(f, [8, 42], [0, 1], clamp);
  if (index === 0)
    return (
      <svg viewBox="0 0 850 125" width="100%" height="145">
        <path d="M55 100H795" stroke={navy} strokeWidth="6" />
        {[
          { x: 185, n: "2 N", c: blue, s: "CAM" },
          { x: 425, n: "4 N", c: mint, s: "TAHTA" },
          { x: 665, n: "7 N", c: coral, s: "HALI" },
        ].map((o) => (
          <g key={o.x} opacity={d}>
            <path
              d={`M${o.x - 80} 100q15-${o.s === "HALI" ? 22 : 8} 30 0t30 0t30 0t30 0`}
              fill="none"
              stroke={o.c}
              strokeWidth="5"
            />
            <rect
              x={o.x - 43}
              y="20"
              width="86"
              height="50"
              rx="12"
              fill="white"
              stroke={o.c}
              strokeWidth="3"
            />
            <text
              x={o.x}
              y="52"
              textAnchor="middle"
              fill={o.c}
              fontSize="21"
              fontWeight="900"
            >
              {o.n}
            </text>
            <text
              x={o.x}
              y="122"
              textAnchor="middle"
              fill={o.c}
              fontSize="17"
              fontWeight="900"
            >
              {o.s}
            </text>
          </g>
        ))}
      </svg>
    );
  if (index === 1)
    return (
      <svg viewBox="0 0 850 125" width="100%" height="145">
        <path d="M60 104H790" stroke={navy} strokeWidth="7" />
        <rect
          x="125"
          y="48"
          width="230"
          height="56"
          rx="10"
          fill="#83DECC"
          stroke={blue}
          strokeWidth="4"
        />
        <rect
          x="570"
          y="14"
          width="78"
          height="90"
          rx="10"
          fill="#83DECC"
          stroke={blue}
          strokeWidth="4"
        />
        <text
          x="240"
          y="38"
          textAnchor="middle"
          fill={mint}
          fontSize="19"
          fontWeight="900"
        >
          AYNI KUTU
        </text>
        <text
          x="610"
          y="122"
          textAnchor="middle"
          fill={mint}
          fontSize="18"
          fontWeight="900"
        >
          AYNI HALI
        </text>
      </svg>
    );
  return (
    <svg viewBox="0 0 850 125" width="100%" height="145">
      <path
        d="M255 22v90M595 22v90"
        stroke="#AAC5DD"
        strokeWidth="3"
        strokeDasharray="7 8"
      />
      <path
        d="M175 32h160v66H175Z"
        fill="white"
        stroke={blue}
        strokeWidth="4"
      />
      <path
        d="M535 33q60-30 120 0q-55 48-120 0"
        fill="#EEF4F8"
        stroke={coral}
        strokeWidth="4"
      />
      <g>
        <line x1="365" y1="26" x2="365" y2="82" stroke={blue} strokeWidth="7" strokeLinecap="round" />
        <path d="M350 80L365 101L380 80Z" fill={blue} />
      </g>
      <g>
        <line x1="705" y1="26" x2="705" y2="82" stroke={coral} strokeWidth="7" strokeLinecap="round" />
        <path d="M690 80L705 101L720 80Z" fill={coral} />
      </g>
      <text
        x="255"
        y="120"
        textAnchor="middle"
        fill={blue}
        fontSize="16"
        fontWeight="900"
      >
        DÜZ
      </text>
      <text
        x="595"
        y="120"
        textAnchor="middle"
        fill={coral}
        fontSize="16"
        fontWeight="900"
      >
        BURUŞUK
      </text>
    </svg>
  );
};

export const Short = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    s = data.shorts[index],
    t = timings.shorts[index],
    choices = f >= t.qEnd,
    revealed = f >= t.reveal,
    speaking = f < t.qEnd || (f >= t.reveal && f < t.aEnd),
    elapsed = Math.max(0, f - t.qEnd),
    count = Math.max(1, 5 - Math.floor(elapsed / 30));
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(155deg,#E8F5FF,#FFFFFF 54%,#FFF0ED)",
        fontFamily: "Trebuchet MS,Arial",
        color: navy,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage: `radial-gradient(${blue} 2px,transparent 2px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 54,
          right: 54,
          top: 54,
          height: 82,
          borderRadius: 25,
          background: navy,
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 30px",
          fontSize: 27,
          fontWeight: 950,
        }}
      >
        FEN • {s.topic}
        <span style={{ marginLeft: "auto", color: yellow }}>{index + 1}/3</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 38,
          right: 38,
          top: 165,
          height: 430,
          boxSizing: "border-box",
          padding: "27px 40px 18px",
          borderRadius: 34,
          background: "#FFFFFFF5",
          border: "2px solid #D4E4F2",
          boxShadow: "0 22px 55px #173B6620",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontSize: s.question.length > 170 ? 31 : 34,
          lineHeight: 1.2,
          fontWeight: 950,
        }}
      >
        <div>{s.question}</div>
        <ShortVisual index={index} />
      </div>
      {choices && (
        <div
          style={{
            position: "absolute",
            left: 90,
            right: 90,
            top: 625,
            display: "grid",
            gap: 15,
          }}
        >
          {s.choices.map((c, i) => {
            const correct = revealed && i === s.correct;
            return (
              <div
                key={c}
                style={{
                  height: 110,
                  boxSizing: "border-box",
                  padding: "16px 22px",
                  borderRadius: 22,
                  background: correct ? "#DDF8ED" : "white",
                  border: `4px solid ${correct ? mint : i % 2 ? "#C9E0F3" : "#F3CBD2"}`,
                  boxShadow: "0 12px 28px #173B6615",
                  display: "flex",
                  alignItems: "center",
                  fontSize: c.length > 42 ? 24 : 27,
                  lineHeight: 1.18,
                  fontWeight: 900,
                  transform: `scale(${correct ? 1.025 : 1})`,
                }}
              >
                <span
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 17,
                    background: correct ? mint : i % 2 ? blue : coral,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 20,
                    flexShrink: 0,
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {c}
                {correct && (
                  <span
                    style={{ marginLeft: "auto", color: mint, fontSize: 42 }}
                  >
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
      {choices && !revealed && (
        <div
          style={{
            position: "absolute",
            left: 155,
            top: 1275,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "white",
            border: "3px solid #D7E6F2",
            boxShadow: "0 18px 40px #173B6618",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="252"
            height="252"
            style={{ position: "absolute", transform: "rotate(-90deg)" }}
          >
            <circle
              cx="126"
              cy="126"
              r="105"
              fill="none"
              stroke="#E2EDF5"
              strokeWidth="16"
            />
            <circle
              cx="126"
              cy="126"
              r="105"
              fill="none"
              stroke={coral}
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={660}
              strokeDashoffset={660 * Math.min(1, elapsed / 150)}
            />
          </svg>
          <div style={{ fontSize: 92, fontWeight: 950, color: coral }}>
            {count}
          </div>
          <div style={{ fontSize: 25, fontWeight: 950, letterSpacing: 2 }}>
            DÜŞÜN!
          </div>
        </div>
      )}
      <GifCharacter
        name="ibrahim"
        x={820}
        y={1450}
        scale={1.7}
        flip
        animate={speaking}
      />
      {revealed && f >= t.congrats && (
        <div
          style={{
            position: "absolute",
            left: 85,
            top: 1390,
            fontSize: 62,
            fontWeight: 950,
            color: coral,
            textShadow: "0 5px 0 white",
          }}
        >
          Tebrikler!
        </div>
      )}
      <Sequence from={0} durationInFrames={t.qEnd}>
        <Audio
          src={staticFile(
            `audio/fen/kuvvet/surtunme/shorts/${index + 1}/question.mp3`,
          )}
        />
      </Sequence>
      <Sequence from={t.reveal} durationInFrames={t.aEnd - t.reveal}>
        <Audio
          src={staticFile(
            `audio/fen/kuvvet/surtunme/shorts/${index + 1}/answer.mp3`,
          )}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
