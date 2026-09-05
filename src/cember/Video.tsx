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
import data from "../../content/cember.json";
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
const pop = (frame: number, delay = 0, stiffness = 110) =>
  spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 20, stiffness, mass: 0.85 },
  });
const start = (group: "main" | "kurz", i: number) =>
  timings[group].slice(0, i).reduce((sum, item) => sum + item.frames, 0);
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
        transform: `translateY(${Math.sin(f / 18) * 4}px) rotate(${Math.sin(f / 35) * 1.5}deg)`,
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

const MainDiagram = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame();
  const draw = interpolate(f, [8, 52], [0, 1], clamp);
  const dash = 500 * (1 - draw);
  const base = (
    <line
      x1="65"
      y1="122"
      x2="575"
      y2="122"
      stroke={navy}
      strokeWidth="8"
      strokeLinecap="round"
    />
  );
  if (["perpendicular", "shortest", "setSquare", "notation"].includes(kind))
    return (
      <svg viewBox="0 0 640 160" width="100%" height="132">
        {base}
        {kind === "perpendicular" && (
          <>
            <line
              x1="320"
              y1="18"
              x2="320"
              y2="122"
              stroke={coral}
              strokeWidth="8"
              strokeDasharray="110"
              strokeDashoffset={110 * (1 - draw)}
              strokeLinecap="round"
            />
            <path d="M320 94h28v28" fill="none" stroke={mint} strokeWidth="5" />
            <circle cx="320" cy="18" r="10" fill={yellow} />
            <text x="359" y="83" fill={mint} fontSize="24" fontWeight="900">
              90°
            </text>
          </>
        )}
        {kind === "shortest" && (
          <>
            <circle cx="320" cy="20" r="11" fill={coral} />
            <text x="340" y="28" fill={navy} fontSize="22" fontWeight="900">
              P
            </text>
            <path
              d="M320 20 175 122M320 20V122M320 20 485 122"
              fill="none"
              stroke={blue}
              strokeWidth="5"
              strokeDasharray="190"
              strokeDashoffset={dash}
            />
            <path d="M320 96h26v26" fill="none" stroke={mint} strokeWidth="5" />
            <text x="274" y="77" fill={mint} fontSize="20" fontWeight="900">
              EN KISA
            </text>
          </>
        )}
        {kind === "setSquare" && (
          <g
            transform={`translate(${interpolate(f, [0, 45], [150, 0], clamp)} 0)`}
          >
            <path
              d="M250 122V37h112v85Z"
              fill="#FFD16655"
              stroke={coral}
              strokeWidth="6"
            />
            <path d="M274 99V72h35" fill="none" stroke={navy} strokeWidth="5" />
            <circle cx="250" cy="37" r="10" fill={mint} />
          </g>
        )}
        {kind === "notation" && (
          <>
            <line
              x1="320"
              y1="20"
              x2="320"
              y2="122"
              stroke={coral}
              strokeWidth="8"
            />
            <path d="M320 94h28v28" fill="none" stroke={mint} strokeWidth="5" />
            <text x="95" y="55" fill={blue} fontSize="30" fontWeight="900">
              [AB]
            </text>
            <text x="276" y="78" fill={coral} fontSize="45" fontWeight="900">
              ⊥
            </text>
            <text x="460" y="55" fill={blue} fontSize="30" fontWeight="900">
              [CD]
            </text>
          </>
        )}
      </svg>
    );
  if (["circleTrace", "radius", "diameter", "naming"].includes(kind))
    return (
      <svg viewBox="0 0 640 170" width="100%" height="138">
        <circle
          cx="320"
          cy="85"
          r="70"
          fill="#EAF4FF"
          stroke={blue}
          strokeWidth="7"
          strokeDasharray="440"
          strokeDashoffset={440 * (1 - draw)}
        />
        <circle cx="320" cy="85" r="8" fill={coral} />
        <text x="302" y="78" fill={navy} fontSize="20" fontWeight="900">
          O
        </text>
        {kind === "circleTrace" && (
          <>
            <circle
              cx={320 + 70 * Math.cos(f / 18)}
              cy={85 + 70 * Math.sin(f / 18)}
              r="11"
              fill={yellow}
            />
            <path
              d={`M320 85L${320 + 70 * Math.cos(f / 18)} ${85 + 70 * Math.sin(f / 18)}`}
              stroke={mint}
              strokeWidth="4"
            />
          </>
        )}
        {kind === "radius" && (
          <>
            <line
              x1="320"
              y1="85"
              x2="390"
              y2="85"
              stroke={mint}
              strokeWidth="7"
            />
            <text x="351" y="76" fill={mint} fontSize="22" fontWeight="900">
              r
            </text>
            <circle cx="390" cy="85" r="7" fill={yellow} />
          </>
        )}
        {kind === "diameter" && (
          <>
            <line
              x1="250"
              y1="85"
              x2="390"
              y2="85"
              stroke={coral}
              strokeWidth="7"
            />
            <text x="281" y="75" fill={blue} fontSize="19" fontWeight="900">
              r
            </text>
            <text x="357" y="75" fill={blue} fontSize="19" fontWeight="900">
              r
            </text>
            <text x="436" y="94" fill={coral} fontSize="25" fontWeight="900">
              d = 2r
            </text>
          </>
        )}
        {kind === "naming" && (
          <>
            <line
              x1="320"
              y1="85"
              x2="380"
              y2="47"
              stroke={mint}
              strokeWidth="6"
            />
            <circle cx="380" cy="47" r="8" fill={yellow} />
            <text x="389" y="45" fill={navy} fontSize="21" fontWeight="900">
              A
            </text>
            <text x="425" y="83" fill={blue} fontSize="24" fontWeight="900">
              O merkezli çember
            </text>
          </>
        )}
      </svg>
    );
  if (kind === "circleDisk")
    return (
      <svg viewBox="0 0 640 160" width="100%" height="132">
        <circle
          cx="205"
          cy="78"
          r="63"
          fill="none"
          stroke={blue}
          strokeWidth="9"
        />
        <circle
          cx="435"
          cy="78"
          r="63"
          fill="#5CD9C766"
          stroke={mint}
          strokeWidth="7"
        />
        <text
          x="205"
          y="151"
          textAnchor="middle"
          fill={navy}
          fontSize="21"
          fontWeight="900"
        >
          ÇEMBER
        </text>
        <text
          x="435"
          y="151"
          textAnchor="middle"
          fill={navy}
          fontSize="21"
          fontWeight="900"
        >
          DAİRE
        </text>
      </svg>
    );
  if (kind === "examples")
    return (
      <svg viewBox="0 0 640 160" width="100%" height="132">
        <circle
          cx="140"
          cy="70"
          r="48"
          fill="none"
          stroke={coral}
          strokeWidth="12"
        />
        <circle
          cx="315"
          cy="70"
          r="48"
          fill="none"
          stroke={blue}
          strokeWidth="10"
        />
        <circle
          cx="500"
          cy="70"
          r="48"
          fill={yellow}
          stroke="#D69F23"
          strokeWidth="6"
        />
        <path
          d="M469 38 531 102M531 38 469 102"
          stroke="#F6B843"
          strokeWidth="3"
        />
        <text
          x="140"
          y="145"
          textAnchor="middle"
          fill={navy}
          fontSize="18"
          fontWeight="900"
        >
          YÜZÜK
        </text>
        <text
          x="315"
          y="145"
          textAnchor="middle"
          fill={navy}
          fontSize="18"
          fontWeight="900"
        >
          TEKERLEK
        </text>
        <text
          x="500"
          y="145"
          textAnchor="middle"
          fill={navy}
          fontSize="18"
          fontWeight="900"
        >
          PİZZA
        </text>
      </svg>
    );
  return (
    <svg viewBox="0 0 640 160" width="100%" height="132">
      <line x1="70" y1="115" x2="240" y2="115" stroke={navy} strokeWidth="7" />
      <line x1="155" y1="25" x2="155" y2="115" stroke={coral} strokeWidth="7" />
      <path d="M155 88h27v27" fill="none" stroke={mint} strokeWidth="5" />
      <circle
        cx="455"
        cy="75"
        r="62"
        fill="#6DDCCB44"
        stroke={blue}
        strokeWidth="7"
      />
      <line x1="393" y1="75" x2="517" y2="75" stroke={coral} strokeWidth="6" />
      <text
        x="455"
        y="150"
        textAnchor="middle"
        fill={navy}
        fontSize="21"
        fontWeight="900"
      >
        d = 2r
      </text>
    </svg>
  );
};

const MainScene = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    scene = data.main[index],
    timing = timings.main[index];
  const final = index === data.main.length - 1;
  const left = scene.speaker === "filiz";
  const cardLeft = final ? 196 : left ? 220 : 34;
  const cardWidth = final ? 568 : 706;
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
          transform: `translateY(${Math.sin(f / 40) * 2}px)`,
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
        <span>5. SINIF MATEMATİK</span>
        <span style={{ margin: "0 17px", color: "#AFC4D8" }}>|</span>
        <span>GEOMETRİK ŞEKİLLER</span>
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
          padding: "22px 26px",
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
          {scene.title}
        </div>
        <div
          style={{
            fontSize: scene.lead.length > 58 ? 24 : 28,
            lineHeight: 1.18,
            fontWeight: 950,
            marginTop: 6,
            minHeight: 62,
          }}
        >
          {scene.lead}
        </div>
        <MainDiagram kind={scene.kind} />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginTop: 3,
          }}
        >
          {scene.points.map((point, i) => (
            <div
              key={point}
              style={{
                minHeight: 59,
                boxSizing: "border-box",
                padding: "11px 14px",
                borderRadius: 15,
                background: i ? "#EEF9F6" : "#EEF5FC",
                border: `1.5px solid ${i ? "#BCE8DE" : "#CFE1F2"}`,
                color: i ? "#176C5B" : navy,
                fontSize: 16,
                lineHeight: 1.3,
                fontWeight: 850,
                opacity: pop(f, 28 + i * 12),
                transform: `translateY(${(1 - pop(f, 28 + i * 12)) * 10}px)`,
              }}
            >
              <span style={{ color: i ? mint : blue, marginRight: 7 }}>✓</span>
              {point}
            </div>
          ))}
        </div>
      </div>
      {final ? (
        <>
          <GifCharacter
            name="filiz"
            x={88}
            y={172}
            scale={1.17}
            animate={f < timing.audioFrames}
          />
          <GifCharacter
            name="ibrahim"
            x={870}
            y={172}
            scale={1.17}
            flip
            animate={false}
          />
        </>
      ) : (
        <GifCharacter
          name={scene.speaker as "filiz" | "ibrahim"}
          x={left ? 110 : 850}
          y={166}
          scale={1.3}
          flip={!left}
          animate={f < timing.audioFrames}
        />
      )}
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
            width: `${(100 * f) / timing.frames}%`,
            borderRadius: 4,
            background: blue,
          }}
        />
      </div>
      <Audio src={staticFile(`audio/matematik/cember/main/${scene.id}.mp3`)} />
    </AbsoluteFill>
  );
};

const KurzMotion = ({ kind, index }: { kind: string; index: number }) => {
  const f = useCurrentFrame(),
    appear = pop(f, 2, 70),
    draw = interpolate(f, [8, 70], [0, 1], clamp);
  const colors = ["#FFB36B", "#6CE5D0", "#FF6F78"];
  if (kind === "drone")
    return (
      <svg viewBox="0 0 540 160" width="540" height="160">
        <path
          d="M35 133Q270 110 505 133"
          fill="none"
          stroke="#7892C8"
          strokeWidth="7"
        />
        <path
          d="M65 133 92 122M145 128l24-12M375 126l24-11M455 131l22-10"
          stroke="#DDE8FF77"
          strokeWidth="4"
        />
        <g
          transform={`translate(${Math.sin(f / 24) * 18} ${Math.sin(f / 11) * 2})`}
        >
          <rect
            x="220"
            y="20"
            width="100"
            height="34"
            rx="17"
            fill="#7257E8"
            stroke="white"
            strokeWidth="4"
          />
          <path d="M220 31h-55M320 31h55" stroke={colors[1]} strokeWidth="6" />
          <ellipse
            cx="164"
            cy="31"
            rx="34"
            ry="6"
            fill={colors[0]}
            transform={`rotate(${f * 9} 164 31)`}
          />
          <ellipse
            cx="376"
            cy="31"
            rx="34"
            ry="6"
            fill={colors[0]}
            transform={`rotate(${-f * 9} 376 31)`}
          />
          <circle cx="245" cy="37" r="7" fill={colors[2]} />
          <circle cx="295" cy="37" r="7" fill={colors[1]} />
          <path
            d="M270 54V105"
            stroke={colors[0]}
            strokeWidth="5"
            strokeDasharray="55"
            strokeDashoffset={55 * (1 - draw)}
          />
          <rect
            x="251"
            y="102"
            width="38"
            height="27"
            rx="6"
            fill={colors[2]}
            stroke="white"
            strokeWidth="3"
          />
        </g>
      </svg>
    );
  if (kind === "robot")
    return (
      <svg viewBox="0 0 540 160" width="540" height="160">
        <rect x="45" y="22" width="450" height="16" rx="8" fill="#7892C8" />
        <path
          d="M65 30h410"
          stroke="white"
          strokeWidth="3"
          strokeDasharray="10 13"
          strokeDashoffset={-f * 0.8}
        />
        <g transform={`translate(${Math.sin(f / 28) * 95} 0)`}>
          <rect
            x="236"
            y="10"
            width="68"
            height="42"
            rx="10"
            fill="#FFB36B"
            stroke="#15172F"
            strokeWidth="4"
          />
          <circle
            cx="270"
            cy="64"
            r="15"
            fill="#7257E8"
            stroke="white"
            strokeWidth="4"
          />
          <path d="M270 79v38" stroke="#6CE5D0" strokeWidth="12" />
          <circle cx="270" cy="120" r="12" fill="#FF6F78" />
          <path
            d="M258 130l-16 18M282 130l16 18"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </g>
        <path d="M82 145H458" stroke="#6CE5D0" strokeWidth="5" />
        <g opacity={appear}>
          <path
            d="M95 119v26h26"
            fill="none"
            stroke="#FFB36B"
            strokeWidth="5"
          />
          <text x="128" y="141" fill="#FFB36B" fontSize="22" fontWeight="900">
            90° KİLİTLİ
          </text>
        </g>
      </svg>
    );
  if (kind === "ferris")
    return (
      <svg viewBox="0 0 540 160" width="540" height="160">
        <path
          d="M215 148 270 82l55 66M190 149h160"
          fill="none"
          stroke="#7892C8"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <g transform={`rotate(${f * 0.7} 270 72)`}>
          <circle
            cx="270"
            cy="72"
            r="62"
            fill="none"
            stroke="#6CE5D0"
            strokeWidth="6"
          />
          <circle
            cx="270"
            cy="72"
            r="13"
            fill="#7257E8"
            stroke="white"
            strokeWidth="4"
          />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4,
              x = 270 + Math.cos(a) * 62,
              y = 72 + Math.sin(a) * 62;
            return (
              <g key={i}>
                <line
                  x1="270"
                  y1="72"
                  x2={x}
                  y2={y}
                  stroke={i % 2 ? colors[0] : colors[1]}
                  strokeWidth="3"
                />
                <g transform={`rotate(${-f * 0.7} ${x} ${y})`}>
                  <rect
                    x={x - 11}
                    y={y - 7}
                    width="22"
                    height="18"
                    rx="5"
                    fill={i % 2 ? colors[0] : colors[2]}
                    stroke="white"
                    strokeWidth="2"
                  />
                </g>
              </g>
            );
          })}
        </g>
      </svg>
    );
  if (kind === "capsules")
    return (
      <svg viewBox="0 0 540 160" width="540" height="160">
        <g transform={`translate(${(1 - appear) * -115} 0)`}>
          <rect
            x="72"
            y="53"
            width="160"
            height="54"
            rx="27"
            fill="#FFB36B33"
            stroke="#FFB36B"
            strokeWidth="5"
          />
          <text
            x="152"
            y="89"
            textAnchor="middle"
            fill="#FFB36B"
            fontSize="28"
            fontWeight="900"
          >
            r
          </text>
        </g>
        <g transform={`translate(${(1 - appear) * 115} 0)`}>
          <rect
            x="308"
            y="53"
            width="160"
            height="54"
            rx="27"
            fill="#6CE5D033"
            stroke="#6CE5D0"
            strokeWidth="5"
          />
          <text
            x="388"
            y="89"
            textAnchor="middle"
            fill="#6CE5D0"
            fontSize="28"
            fontWeight="900"
          >
            r
          </text>
        </g>
        <path
          d="M244 80h52"
          stroke="white"
          strokeWidth="5"
          strokeDasharray="52"
          strokeDashoffset={52 * (1 - draw)}
        />
        <circle cx="270" cy="80" r={10 + Math.sin(f / 10) * 2} fill="#FF6F78" />
        <text
          x="270"
          y="143"
          textAnchor="middle"
          fill="white"
          fontSize="25"
          fontWeight="900"
          opacity={draw}
        >
          r + r = 2r
        </text>
      </svg>
    );
  if (kind === "ink")
    return (
      <svg viewBox="0 0 540 160" width="540" height="160">
        <path
          d="M95 20h145l-23 28H118Z"
          fill="#FFB36B"
          stroke="white"
          strokeWidth="4"
        />
        <path d="M168 48v18" stroke="#FFB36B" strokeWidth="6" />
        <path
          d={`M168 66Q168 ${70 + draw * 35} 168 ${78 + draw * 40}`}
          stroke="#FF6F78"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle
          cx="168"
          cy="116"
          r="38"
          fill={`rgba(255,111,120,${0.08 + 0.5 * draw})`}
          stroke="#FF6F78"
          strokeWidth="6"
          strokeDasharray="240"
          strokeDashoffset={240 * (1 - draw)}
        />
        <path
          d="M300 33h145l-20 25H320Z"
          fill="#6CE5D0"
          stroke="white"
          strokeWidth="4"
        />
        <path d="M372 58v16" stroke="#6CE5D0" strokeWidth="6" />
        <circle
          cx="372"
          cy="116"
          r={18 + draw * 27}
          fill={`rgba(108,229,208,${0.15 + 0.55 * draw})`}
          stroke="#6CE5D0"
          strokeWidth="5"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 540 160" width="540" height="160">
      <rect x="45" y="60" width="450" height="28" rx="14" fill="#7892C8" />
      <path
        d="M65 74h410"
        stroke="white"
        strokeWidth="3"
        strokeDasharray="14 18"
        strokeDashoffset={-f * 1.2}
      />
      {[125, 235, 345].map((x, i) => (
        <g
          key={x}
          transform={`translate(${((f * 1.1 + i * 150) % 500) - 90} 0)`}
        >
          <circle
            cx="0"
            cy="48"
            r="27"
            fill={i === 2 ? colors[2] : "none"}
            stroke={colors[i]}
            strokeWidth="6"
          />
          <circle cx="0" cy="48" r="5" fill={colors[i]} />
        </g>
      ))}
      <path
        d="M115 102v44h105v-44M320 102v44h105v-44"
        fill="#FFFFFF0A"
        stroke="#6CE5D0"
        strokeWidth="5"
      />
      <text
        x="168"
        y="132"
        textAnchor="middle"
        fill="#FFB36B"
        fontSize="17"
        fontWeight="900"
      >
        SINIR
      </text>
      <text
        x="372"
        y="132"
        textAnchor="middle"
        fill="#6CE5D0"
        fontSize="17"
        fontWeight="900"
      >
        YÜZEY
      </text>
    </svg>
  );
};

const KurzScene = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    scene = data.kurz[index],
    timing = timings.kurz[index];
  const camera = interpolate(f, [0, 80], [1.04, 1], clamp);
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
        LUMİ • GEOMETRİ LABORATUVARI • {index + 1}/6
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
        {scene.title}
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
        {scene.lead}
      </div>
      <div style={{ position: "absolute", left: 35, top: 142 }}>
        <KurzMotion kind={scene.kind} index={index} />
      </div>
      {scene.examples.map((x, i) => (
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
            border: `2px solid ${i ? "#6CE5D0" : "#FFB36B"}`,
            fontSize: x.length > 43 ? 18 : 21,
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
        {scene.facts.map((x, i) => (
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
              borderLeft: `4px solid ${i ? "#6CE5D0" : "#FFB36B"}`,
              color: i ? "#6CE5D0" : "#FFB36B",
              fontSize: 16,
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
      <Audio src={staticFile(`audio/matematik/cember/kurz/${scene.id}.mp3`)} />
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

const ShortQuestionVisual = ({ index }: { index: number }) => {
  const f = useCurrentFrame();
  const draw = interpolate(f, [8, 42], [0, 1], clamp);
  if (index === 0) {
    return (
      <svg viewBox="0 0 850 125" width="100%" height="145" aria-hidden="true">
        <line
          x1="42"
          y1="101"
          x2="246"
          y2="101"
          stroke={navy}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <text x="255" y="108" fill={navy} fontSize="27" fontWeight="900">
          d
        </text>
        <circle cx="145" cy="20" r="10" fill={coral} />
        <text x="164" y="28" fill={navy} fontSize="25" fontWeight="900">
          P
        </text>
        <path
          d="M145 31 85 96M145 31l0 65M145 31l64 65"
          fill="none"
          stroke="#A9BCD0"
          strokeWidth="3"
          strokeDasharray="7 7"
        />
        {[
          { x: 365, label: "6 cm", color: mint },
          { x: 550, label: "8 cm", color: blue },
          { x: 735, label: "10 cm", color: coral },
        ].map((item) => (
          <g key={item.label} opacity={draw}>
            <rect
              x={item.x - 72}
              y="28"
              width="144"
              height="70"
              rx="18"
              fill="white"
              stroke={item.color}
              strokeWidth="3"
            />
            <line
              x1={item.x - 43}
              y1="51"
              x2={item.x + 43}
              y2="51"
              stroke={item.color}
              strokeWidth="5"
              strokeLinecap="round"
            />
            <text
              x={item.x}
              y="83"
              textAnchor="middle"
              fill={item.color}
              fontSize="19"
              fontWeight="900"
            >
              {item.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 850 125" width="100%" height="145" aria-hidden="true">
      <circle
        cx="224"
        cy="63"
        r="52"
        fill="#EAF5FF"
        stroke={blue}
        strokeWidth="6"
        strokeDasharray="330"
        strokeDashoffset={330 * (1 - draw)}
      />
      <circle cx="224" cy="63" r="8" fill={coral} />
      <text x="202" y="56" fill={navy} fontSize="20" fontWeight="900">
        O
      </text>
      <line x1="224" y1="63" x2="276" y2="63" stroke={mint} strokeWidth="5" />
      <text x="239" y="52" fill={mint} fontSize="17" fontWeight="900">
        r = 5
      </text>
      {[
        { x: 405, letter: "A", value: "5 cm", color: coral },
        { x: 570, letter: "B", value: "7 cm", color: blue },
        { x: 735, letter: "C", value: "5 cm", color: mint },
      ].map((item, i) => (
        <g key={item.letter}>
          <circle
            cx={item.x}
            cy="48"
            r="27"
            fill={`${item.color}18`}
            stroke={item.color}
            strokeWidth="4"
          />
          <text
            x={item.x}
            y="57"
            textAnchor="middle"
            fill={item.color}
            fontSize="27"
            fontWeight="950"
          >
            {item.letter}
          </text>
          <rect
            x={item.x - 43}
            y="84"
            width="86"
            height="30"
            rx="11"
            fill="white"
            stroke={item.color}
            strokeWidth="2"
          />
          <text
            x={item.x}
            y="105"
            textAnchor="middle"
            fill={item.color}
            fontSize="17"
            fontWeight="900"
          >
            {item.value}
          </text>
        </g>
      ))}
    </svg>
  );
};

export const Short = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    item = data.shorts[index],
    timing = timings.shorts[index],
    choices = f >= timing.qEnd,
    revealed = f >= timing.reveal,
    speaking = f < timing.qEnd || (f >= timing.reveal && f < timing.aEnd);
  const elapsed = Math.max(0, f - timing.qEnd),
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
          fontSize: 28,
          fontWeight: 950,
        }}
      >
        MATEMATİK • {item.topic}
        <span style={{ marginLeft: "auto", color: yellow }}>{index + 1}/2</span>
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
          fontSize: item.question.length > 155 ? 33 : 36,
          lineHeight: 1.22,
          fontWeight: 950,
        }}
      >
        <div>{item.question}</div>
        <ShortQuestionVisual index={index} />
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
          {item.choices.map((choice, i) => {
            const correct = revealed && i === item.correct;
            return (
              <div
                key={choice}
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
                  fontSize: 27,
                  lineHeight: 1.2,
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
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                {choice}
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
            top: 1310,
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
      {revealed && f >= timing.congrats && (
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
      <Sequence from={0} durationInFrames={timing.qEnd}>
        <Audio
          src={staticFile(
            `audio/matematik/cember/shorts/${index + 1}/question.mp3`,
          )}
        />
      </Sequence>
      <Sequence
        from={timing.reveal}
        durationInFrames={timing.aEnd - timing.reveal}
      >
        <Audio
          src={staticFile(
            `audio/matematik/cember/shorts/${index + 1}/answer.mp3`,
          )}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
