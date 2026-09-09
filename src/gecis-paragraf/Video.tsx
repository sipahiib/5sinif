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
import data from "../../content/gecis-paragraf.json";
import timings from "./timings.json";
import { GifCharacter } from "../GifCharacter";
import { CtaOptionOne } from "../previews/cta-option-1/CtaOptionOne";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";

const navy = "#173B66",
  blue = "#2878C8",
  coral = "#E95370",
  mint = "#25AA8E",
  yellow = "#FFC857",
  violet = "#7C5BC5";
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const pop = (f: number, d = 0) =>
  spring({
    frame: f - d,
    fps: 30,
    config: { damping: 18, stiffness: 115, mass: 0.8 },
  });
const start = (group: "main" | "kurz", i: number) =>
  timings[group].slice(0, i).reduce((a, b) => a + b.frames, 0);
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

const Name = ({ name, x, y }: { name: string; x: number; y: number }) => (
  <div
    style={{
      position: "absolute",
      left: x - 48,
      top: y,
      width: 96,
      height: 28,
      borderRadius: 10,
      background: coral,
      border: "2px solid white",
      boxShadow: "0 4px 10px #173B6640",
      color: "white",
      fontSize: 14,
      fontWeight: 900,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
    }}
  >
    <i style={{ width: 8, height: 8, borderRadius: 8, background: "white" }} />
    {name}
  </div>
);

const LinkDiagram = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame(),
    p = pop(f, 8),
    pulse = 1 + 0.025 * Math.sin(f / 12);
  const Pill = ({
    x,
    y,
    text,
    color,
  }: {
    x: number;
    y: number;
    text: string;
    color: string;
  }) => (
    <g transform={`translate(${x} ${y}) scale(${pulse})`}>
      <rect
        x="-76"
        y="-25"
        width="152"
        height="50"
        rx="18"
        fill={color}
        opacity=".14"
        stroke={color}
        strokeWidth="3"
      />
      <text
        y="7"
        textAnchor="middle"
        fill={color}
        fontSize="19"
        fontWeight="900"
      >
        {text}
      </text>
    </g>
  );
  if (kind === "flow")
    return (
      <svg viewBox="0 0 640 190" width="100%" height="190">
        <path
          d="M70 95H570"
          stroke="#D7E5F2"
          strokeWidth="16"
          strokeLinecap="round"
        />
        <path
          d="M70 95H560"
          stroke={blue}
          strokeWidth="7"
          strokeDasharray="18 12"
          strokeDashoffset={-f * 2}
        />
        {[110, 260, 410, 550].map((x, i) => (
          <g key={x} transform={`translate(${x} 95) scale(${p})`}>
            <circle
              r="28"
              fill={[mint, yellow, coral, violet][i]}
              stroke="white"
              strokeWidth="7"
            />
            <text
              y="7"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="900"
            >
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
    );
  if (kind === "choice-add")
    return (
      <svg viewBox="0 0 640 190" width="100%" height="190">
        <path
          d="M80 95H245M245 95Q310 95 350 48M245 95Q310 95 350 142"
          fill="none"
          stroke={blue}
          strokeWidth="8"
        />
        <Pill x={440} y={48} text="VEYA" color={blue} />
        <Pill x={440} y={142} text="YA DA" color={violet} />
        <g transform="translate(95 45)">
          <rect
            width="150"
            height="42"
            rx="15"
            fill="#E7F8F3"
            stroke={mint}
            strokeWidth="3"
          />
          <text x="75" y="27" textAnchor="middle" fill={mint} fontWeight="900">
            + AYRICA
          </text>
        </g>
      </svg>
    );
  if (kind === "contrast-result")
    return (
      <svg viewBox="0 0 640 190" width="100%" height="190">
        <path
          d="M55 52H275L360 95 275 138H55"
          fill="none"
          stroke={coral}
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <Pill x={165} y={95} text="FAKAT" color={coral} />
        <path d="M380 95H565" stroke={mint} strokeWidth="9" />
        <path d="m565 95-30-19v38z" fill={mint} />
        <text
          x="470"
          y="62"
          textAnchor="middle"
          fill={mint}
          fontSize="20"
          fontWeight="900"
        >
          BU NEDENLE
        </text>
      </svg>
    );
  if (kind === "example-summary")
    return (
      <svg viewBox="0 0 640 190" width="100%" height="190">
        <g transform="translate(55 32)">
          <circle
            cx="85"
            cy="63"
            r="57"
            fill="#E9F4FF"
            stroke={blue}
            strokeWidth="7"
          />
          <circle cx="85" cy="63" r="18" fill={yellow} />
          <path
            d="M128 106l66 56"
            stroke={navy}
            strokeWidth="14"
            strokeLinecap="round"
          />
          <text x="260" y="42" fill={blue} fontSize="20" fontWeight="900">
            ÖRNEĞİN
          </text>
          <path d="M260 65H520" stroke="#D6E3EF" strokeWidth="12" />
          <path d="M260 105H475" stroke="#D6E3EF" strokeWidth="12" />
          <rect x="260" y="127" width="190" height="40" rx="14" fill={yellow} />
          <text
            x="355"
            y="153"
            textAnchor="middle"
            fill={navy}
            fontWeight="900"
          >
            KISACASI
          </text>
        </g>
      </svg>
    );
  if (kind === "emphasis-cause")
    return (
      <svg viewBox="0 0 640 190" width="100%" height="190">
        <path d="M150 20 65 170h170z" fill="#FFD16622" />
        <circle cx="150" cy="112" r="42" fill={yellow} />
        <text
          x="150"
          y="119"
          textAnchor="middle"
          fill={navy}
          fontSize="18"
          fontWeight="900"
        >
          ÖZELLİKLE
        </text>
        <g transform="translate(330 28)">
          <rect
            width="245"
            height="130"
            rx="24"
            fill="#E7F8F3"
            stroke={mint}
            strokeWidth="5"
          />
          <text
            x="122"
            y="48"
            textAnchor="middle"
            fill={mint}
            fontSize="24"
            fontWeight="900"
          >
            ÇÜNKÜ
          </text>
          <path d="M45 82H200" stroke={mint} strokeWidth="7" />
          <path d="m200 82-22-14v28z" fill={mint} />
          <text
            x="122"
            y="115"
            textAnchor="middle"
            fill={navy}
            fontWeight="800"
          >
            NEDEN
          </text>
        </g>
      </svg>
    );
  if (kind === "main-support")
    return (
      <svg viewBox="0 0 640 190" width="100%" height="190">
        <circle
          cx="320"
          cy="95"
          r="55"
          fill={yellow}
          stroke={navy}
          strokeWidth="5"
        />
        <text x="320" y="88" textAnchor="middle" fill={navy} fontWeight="900">
          ANA
        </text>
        <text x="320" y="111" textAnchor="middle" fill={navy} fontWeight="900">
          DÜŞÜNCE
        </text>
        {[
          [115, 45],
          [115, 145],
          [525, 45],
          [525, 145],
        ].map(([x, y], i) => (
          <g key={i}>
            <path
              d={`M${x < 320 ? x + 72 : x - 72} ${y}L${x < 320 ? 268 : 372} 95`}
              stroke={blue}
              strokeWidth="4"
              strokeDasharray="8 6"
            />
            <rect
              x={x - 72}
              y={y - 25}
              width="144"
              height="50"
              rx="16"
              fill="#E9F4FF"
              stroke={blue}
              strokeWidth="3"
            />
            <text
              x={x}
              y={y + 6}
              textAnchor="middle"
              fill={blue}
              fontSize="16"
              fontWeight="900"
            >
              YARDIMCI {i + 1}
            </text>
          </g>
        ))}
      </svg>
    );
  if (kind === "negative")
    return (
      <svg viewBox="0 0 640 190" width="100%" height="190">
        <g transform="translate(45 20)">
          {["ÇIKARILAMAZ", "DEĞİNİLMEMİŞTİR", "ULAŞILAMAZ"].map((t, i) => (
            <g key={t} transform={`translate(0 ${i * 52})`}>
              <rect
                width="360"
                height="42"
                rx="14"
                fill={i === 2 ? "#FFF0F3" : "#EDF5FC"}
                stroke={i === 2 ? coral : blue}
                strokeWidth="3"
              />
              <text
                x="20"
                y="27"
                fill={i === 2 ? coral : navy}
                fontSize="18"
                fontWeight="900"
              >
                {t}
              </text>
              <circle cx="330" cy="21" r="11" fill={i === 2 ? coral : mint} />
            </g>
          ))}
          <path
            d="M400 18h150v135H400z"
            fill="#FFF6DA"
            stroke={yellow}
            strokeWidth="5"
          />
          <text
            x="475"
            y="72"
            textAnchor="middle"
            fill={navy}
            fontSize="22"
            fontWeight="900"
          >
            METİNDE
          </text>
          <text
            x="475"
            y="102"
            textAnchor="middle"
            fill={coral}
            fontSize="22"
            fontWeight="900"
          >
            YOK!
          </text>
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 640 190" width="100%" height="190">
      <g transform={`translate(90 32) scale(${pulse})`}>
        <rect
          width="460"
          height="126"
          rx="26"
          fill="#E8F4FF"
          stroke={blue}
          strokeWidth="6"
        />
        <rect x="42" y="24" width="376" height="50" rx="16" fill="white" />
        <text
          x="230"
          y="57"
          textAnchor="middle"
          fill={navy}
          fontSize="24"
          fontWeight="900"
        >
          PARAGRAFIN BÜTÜNÜ
        </text>
        <rect x="128" y="88" width="204" height="28" rx="12" fill={yellow} />
        <text
          x="230"
          y="108"
          textAnchor="middle"
          fill={navy}
          fontSize="16"
          fontWeight="900"
        >
          KISA + KAPSAYICI
        </text>
      </g>
    </svg>
  );
};

const MainScene = ({ index }: { index: number }) => {
  const s = data.main[index],
    f = useCurrentFrame(),
    left = s.speaker === "filiz",
    final = index === data.main.length - 1,
    cardLeft = final ? 270 : left ? 175 : 34,
    cardWidth = final ? 540 : 751;
  return (
    <AbsoluteFill
      style={{
        fontFamily: "Arial,sans-serif",
        color: navy,
        background: "linear-gradient(145deg,#F4FAFF,#FFF9F7)",
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
        }}
      >
        <span>5. SINIF TÜRKÇE</span>
        <span style={{ margin: "0 17px", color: "#AFC4D8" }}>|</span>
        <span>GEÇİŞ İFADELERİ VE PARAGRAF</span>
        <span style={{ marginLeft: "auto" }}>
          {String(index + 1).padStart(2, "0")} / 08
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: cardLeft,
          top: 87,
          width: cardWidth,
          height: 392,
          padding: "22px 26px",
          boxSizing: "border-box",
          borderRadius: 26,
          background: "#FFFFFFF5",
          border: "1px solid #CFDFEE",
          boxShadow: "0 18px 40px #173B6618",
        }}
      >
        <div
          style={{
            color: coral,
            fontSize: 14,
            fontWeight: 950,
            letterSpacing: 1.5,
            opacity: pop(f),
          }}
        >
          {s.title.toUpperCase()}
        </div>
        <div
          style={{
            fontSize: final ? 20 : s.lead.length > 78 ? 23 : 27,
            lineHeight: 1.15,
            fontWeight: 950,
            marginTop: 7,
            minHeight: final ? 78 : 60,
          }}
        >
          {s.lead}
        </div>
        <LinkDiagram kind={s.kind} />
        <div style={{ display: "flex", gap: 10 }}>
          {s.chips.map((c, i) => (
            <div
              key={c}
              style={{
                flex: 1,
                borderRadius: 12,
                padding: "9px 12px",
                fontSize: 15,
                fontWeight: 800,
                background: i ? "#FFF3D8" : "#E5F8F3",
                border: `1px solid ${i ? yellow : mint}`,
              }}
            >
              {c}
            </div>
          ))}
        </div>
        {s.note && (
          <div
            style={{
              marginTop: 7,
              border: `2px solid ${coral}`,
              background: "#FFF0F3",
              borderRadius: 10,
              padding: "7px 10px",
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            <b style={{ color: coral }}>NOT • </b>
            {s.note}
          </div>
        )}
      </div>
      {!final ? (
        <>
          <GifCharacter
            name={left ? "filiz" : "ibrahim"}
            x={left ? 104 : 850}
            y={208}
            scale={1.02}
            animate
          />
          <Name
            name={left ? "Filiz" : "İbrahim"}
            x={left ? 104 : 850}
            y={493}
          />
        </>
      ) : (
        <>
          <GifCharacter
            name="filiz"
            x={95}
            y={216}
            scale={1.02}
            animate={false}
          />
          <Name name="Filiz" x={95} y={500} />
          <GifCharacter name="ibrahim" x={870} y={216} scale={1.02} animate />
          <Name name="İbrahim" x={870} y={500} />
        </>
      )}
      <Audio
        src={staticFile(`/audio/turkce/gecis-paragraf/main/${s.id}.mp3`)}
      />
    </AbsoluteFill>
  );
};

const Lumi = () => {
  const f = useCurrentFrame();
  return (
    <svg width="112" height="124" viewBox="0 0 180 180">
      <ellipse cx="90" cy="169" rx="49" ry="7" fill="#0005" />
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
      />
      <circle cx="90" cy="18" r="9" fill="#FF6B6B" />
    </svg>
  );
};

const KurzArt = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame(),
    move = interpolate(f, [0, 90], [0, 1], clamp),
    nodes = kind === "orbit" ? 6 : 4;
  if (kind === "fork") {
    const glow = 0.65 + 0.25 * Math.sin(f / 12);
    return (
      <svg viewBox="0 0 650 310" width="650" height="310">
        <g transform="translate(70 155)">
          <circle r="34" fill="#FFD166" stroke="white" strokeWidth="7" />
          <path
            d="M34 0H190M190 0 390-105M190 0 390 105"
            fill="none"
            stroke="#5CE0D1"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m440-105-45-27v54zM440 105l-45-27v54z"
            fill="#A897FF"
            opacity={glow}
          />
          <circle
            cx="190"
            r="25"
            fill="#FF6381"
            stroke="#EFF8FF"
            strokeWidth="7"
          />
          <g transform={`translate(${120 + move * 280} ${-move * 95})`}>
            <rect
              x="-24"
              y="-17"
              width="48"
              height="34"
              rx="9"
              fill="white"
              stroke="#FFD166"
              strokeWidth="6"
            />
          </g>
        </g>
      </svg>
    );
  }
  if (kind === "turn") {
    const fall = interpolate(f % 80, [0, 65], [0, 1], clamp);
    return (
      <svg viewBox="0 0 650 310" width="650" height="310">
        <path
          d="M55 90Q155 20 255 90T455 90"
          fill="none"
          stroke="#FF6381"
          strokeWidth="16"
        />
        <path
          d="M55 215Q155 285 255 215T455 215"
          fill="none"
          stroke="#5CE0D1"
          strokeWidth="16"
        />
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={485 + i * 30}
            y={70 + fall * i * 32}
            width="18"
            height="90"
            rx="8"
            fill={["#FFD166", "#A897FF", "#5CE0D1", "#FF6381"][i]}
            transform={`rotate(${fall * (i + 1) * 12} ${494 + i * 30} ${115 + fall * i * 32})`}
          />
        ))}
        <circle
          cx="555"
          cy="250"
          r="38"
          fill="#26385D"
          stroke="#FFD166"
          strokeWidth="8"
        />
        <circle
          cx="555"
          cy="250"
          r={10 + 8 * Math.sin(f / 14)}
          fill="#FFD166"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 650 310" width="650" height="310">
      <defs>
        <linearGradient id="rail" x1="0" x2="1">
          <stop stopColor="#5CE0D1" />
          <stop offset="1" stopColor="#A897FF" />
        </linearGradient>
      </defs>
      {kind === "orbit" ? (
        <>
          <circle cx="330" cy="155" r="65" fill="#FFD166" />
          <circle
            cx="330"
            cy="155"
            r="130"
            fill="none"
            stroke="#5CE0D1"
            strokeWidth="5"
            strokeDasharray="10 10"
          />
        </>
      ) : (
        <>
          <path
            d="M55 180C160 40 260 260 370 105S555 80 605 170"
            fill="none"
            stroke="#27385D"
            strokeWidth="42"
            strokeLinecap="round"
          />
          <path
            d="M55 180C160 40 260 260 370 105S555 80 605 170"
            fill="none"
            stroke="url(#rail)"
            strokeWidth="8"
            strokeDasharray="18 12"
            strokeDashoffset={-f * 2}
          />
        </>
      )}
      {Array.from({ length: nodes }).map((_, i) => {
        const a = (i / nodes) * Math.PI * 2;
        const x = kind === "orbit" ? 330 + 130 * Math.cos(a) : 100 + i * 150;
        const y =
          kind === "orbit"
            ? 155 + 130 * Math.sin(a)
            : 155 + 45 * Math.sin(i * 1.8);
        return (
          <g
            key={i}
            transform={`translate(${x} ${y}) scale(${0.85 + 0.12 * Math.sin(f / 13 + i)})`}
          >
            <circle
              r="30"
              fill={["#FF6381", "#FFD166", "#5CE0D1", "#A897FF"][i % 4]}
              stroke="#EFF8FF"
              strokeWidth="6"
            />
            <circle r="8" fill="#15172F" />
          </g>
        );
      })}
      <g
        transform={`translate(${85 + 460 * move} ${kind === "orbit" ? 155 : 55})`}
      >
        <circle r="18" fill="#fff" stroke="#FF6381" strokeWidth="7" />
      </g>
      {kind === "lens" && (
        <circle
          cx="340"
          cy="155"
          r="88"
          fill="none"
          stroke="#FFD166"
          strokeWidth="18"
        />
      )}
      {kind === "spotlight" && (
        <path d="M160 10 60 290h280z" fill="#FFD16622" />
      )}
      {kind === "label" && (
        <g>
          <rect
            x="190"
            y="92"
            width="280"
            height="126"
            rx="28"
            fill="#26385D"
            stroke="#5CE0D1"
            strokeWidth="6"
          />
          <text
            x="330"
            y="150"
            textAnchor="middle"
            fill="white"
            fontSize="28"
            fontWeight="900"
          >
            KISA
          </text>
          <text
            x="330"
            y="188"
            textAnchor="middle"
            fill="#FFD166"
            fontSize="28"
            fontWeight="900"
          >
            KAPSAYICI
          </text>
        </g>
      )}
    </svg>
  );
};

const KurzScene = ({ index }: { index: number }) => {
  const s = data.kurz[index],
    f = useCurrentFrame(),
    duration = timings.kurz[index].frames;
  const travel = interpolate(
    f,
    [10, Math.max(40, duration - 18)],
    [0, 1],
    clamp,
  );
  // This lower corridor is empty by design. Lumi performs exactly one
  // traversal here and never crosses the copy or the main illustration.
  const pos =
    index % 2 === 0
      ? { left: 92 + travel * 650, top: 404 }
      : { left: 742 - travel * 650, top: 404 };
  const forkCardOpacity =
    index !== 1
      ? 1
      : f < 330
        ? 1
        : f < 346
          ? interpolate(f, [330, 346], [1, 0], clamp)
          : f <= 496
            ? 0
            : interpolate(f, [496, 520], [0, 1], clamp);
  const forkCardShift =
    index === 1 ? interpolate(f, [496, 520], [14, 0], clamp) : 0;
  return (
    <AbsoluteFill
      style={{
        fontFamily: "Arial,sans-serif",
        background: "radial-gradient(circle at 70% 20%,#27385D,#10152B 65%)",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.3,
          backgroundImage: "radial-gradient(#A897FF 1px,transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 42,
          width: 350,
          height: 330,
        }}
      >
        <div
          style={{
            color: "#5CE0D1",
            fontWeight: 900,
            letterSpacing: 2,
            fontSize: 15,
          }}
        >
          LUMİ İLE ANLAM LABORATUVARI • {index + 1}/7
        </div>
        <h1
          style={{
            fontSize: 38,
            lineHeight: 1.02,
            margin: "18px 0 12px",
            color: "#FFD166",
          }}
        >
          {s.title}
        </h1>
        <p
          style={{ fontSize: 23, lineHeight: 1.25, fontWeight: 700, margin: 0 }}
        >
          {s.lead}
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 30 }}>
          {s.facts.map((x, i) => (
            <div
              key={x}
              style={{
                padding: "12px 14px",
                borderRadius: 18,
                background: i ? "#A897FF22" : "#5CE0D122",
                border: `2px solid ${i ? "#A897FF" : "#5CE0D1"}`,
                fontWeight: 900,
                fontSize: 16,
              }}
            >
              {x}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 330,
          top: 96,
          width: 620,
          height: 280,
          opacity: forkCardOpacity,
          transform: `translateY(${forkCardShift}px)`,
        }}
      >
        <KurzArt kind={s.kind} />
      </div>
      <div
        style={{
          position: "absolute",
          ...pos,
          zIndex: 20,
          filter: "drop-shadow(0 8px 10px #0008)",
        }}
      >
        <Lumi />
      </div>
      <Audio
        src={staticFile(`/audio/turkce/gecis-paragraf/kurz/${s.id}.mp3`)}
      />
    </AbsoluteFill>
  );
};

const SafeChannel = () => (
  <div
    style={{
      position: "absolute",
      left: 500,
      top: -140,
      width: 960,
      height: 540,
      transform: "scale(.52)",
      transformOrigin: "top left",
      zIndex: 90,
    }}
  >
    <ChannelLowerThird />
  </div>
);
export const Main = () => (
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
    <Sequence from={900} durationInFrames={150}>
      <SafeChannel />
    </Sequence>
    <Sequence from={start("main", timings.main.length)} durationInFrames={210}>
      <CtaOptionOne />
    </Sequence>
  </Canvas>
);
export const Kurz = () => (
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
    <Sequence from={900} durationInFrames={150}>
      <SafeChannel />
    </Sequence>
  </Canvas>
);

const ShortArt = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    t = interpolate(f, [0, 50], [0, 1], clamp);
  if (index === 1) {
    return (
      <svg viewBox="0 0 940 360" width="650" height="360">
        <rect
          x="55"
          y="55"
          width="830"
          height="230"
          rx="38"
          fill="#EAF5FF"
          stroke={blue}
          strokeWidth="7"
        />
        <path
          d="M145 82v170M145 82h650v170"
          fill="none"
          stroke={navy}
          strokeWidth="13"
          strokeLinecap="round"
        />
        {[0, 1, 2].map((i) => {
          const x = 285 + i * 205;
          const lift = Math.sin(f / 13 + i) * 10;
          return (
            <g
              key={i}
              transform={`translate(${x} ${175 + lift}) scale(${0.82 + 0.18 * t})`}
            >
              <circle r="62" fill={[mint, yellow, violet][i]} opacity=".2" />
              {i === 0 && (
                <>
                  <rect
                    x="-34"
                    y="-43"
                    width="68"
                    height="86"
                    rx="8"
                    fill="white"
                    stroke={mint}
                    strokeWidth="7"
                  />
                  <path d="M0-38v76" stroke={mint} strokeWidth="5" />
                </>
              )}
              {i === 1 && (
                <>
                  <path
                    d="M-40 34 30-38l18 18-70 72z"
                    fill={yellow}
                    stroke={navy}
                    strokeWidth="6"
                  />
                  <path d="m30-38 18 18" stroke={coral} strokeWidth="8" />
                </>
              )}
              {i === 2 && (
                <>
                  <circle cx="-25" cy="-8" r="19" fill={violet} />
                  <circle cx="25" cy="-8" r="19" fill={violet} />
                  <path
                    d="M-55 42q30-55 60 0M-5 42q30-55 60 0"
                    fill="none"
                    stroke={violet}
                    strokeWidth="13"
                  />
                </>
              )}
            </g>
          );
        })}
        <text
          x="470"
          y="330"
          textAnchor="middle"
          fill={navy}
          fontSize="25"
          fontWeight="900"
        >
          KÜTÜPHANE ATÖLYESİ • ÜÇ ETKİNLİK
        </text>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 940 360" width="650" height="360">
      <rect
        x="72"
        y="55"
        width="790"
        height="230"
        rx="42"
        fill="#EAF5FF"
        stroke="#C8DCEC"
        strokeWidth="7"
      />
      {[0, 1, 2].map((i) => {
        const x = 245 + i * 225,
          bob = Math.sin(f / 14 + i) * 11;
        return (
          <g
            key={i}
            transform={`translate(${x} ${170 + bob}) scale(${0.82 + 0.18 * t})`}
          >
            <circle
              r="72"
              fill={[mint, yellow, coral][i]}
              opacity=".18"
              stroke={[mint, yellow, coral][i]}
              strokeWidth="6"
            />
            {i === 0 ? (
              <rect
                x="-36"
                y="-45"
                width="72"
                height="90"
                rx="13"
                fill="white"
                stroke={mint}
                strokeWidth="7"
              />
            ) : i === 1 ? (
              <>
                <circle r="39" fill="white" stroke={yellow} strokeWidth="8" />
                <circle r="12" fill={navy} />
              </>
            ) : (
              <path
                d="M-46 32 0-45 46 32z"
                fill="white"
                stroke={coral}
                strokeWidth="8"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

export const Short = ({ index = 0 }: { index?: number }) => {
  const item = data.shorts[index],
    tm = timings.shorts[index],
    f = useCurrentFrame(),
    show = f >= tm.qEnd,
    reveal = f >= tm.reveal,
    congrats = f >= tm.congrats;
  const remain = Math.max(1, 5 - Math.floor((f - tm.qEnd) / 30));
  return (
    <AbsoluteFill
      style={{
        fontFamily: "Arial,sans-serif",
        background:
          "linear-gradient(165deg,#EDF8FF 0%,#FFFFFF 54%,#FFF2EF 100%)",
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
          backgroundSize: "30px 30px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 34,
          top: 28,
          right: 34,
          height: 60,
          display: "flex",
          gap: 14,
          alignItems: "center",
        }}
      >
        <span
          style={{
            padding: "12px 24px",
            borderRadius: 24,
            background: navy,
            color: "white",
            fontSize: 25,
            fontWeight: 900,
          }}
        >
          5. SINIF
        </span>
        <span
          style={{
            padding: "12px 24px",
            borderRadius: 24,
            background: violet,
            color: "white",
            fontSize: 25,
            fontWeight: 900,
          }}
        >
          TÜRKÇE
        </span>
        <i
          style={{ height: 4, background: "#C9DBE9", flex: 1, borderRadius: 4 }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 28,
          top: 112,
          width: 1024,
          height: 380,
          borderRadius: 38,
          background: "white",
          border: "2px solid #D1E1EC",
          boxShadow: "0 18px 40px #173B6618",
          padding: "34px 42px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 34,
            top: 62,
            width: 72,
            height: 72,
            borderRadius: 22,
            background: yellow,
            color: navy,
            display: "grid",
            placeItems: "center",
            fontSize: 48,
            fontWeight: 950,
            boxShadow: "0 9px 20px #FFC85755",
          }}
        >
          ?
        </div>
        <div
          style={{
            color: violet,
            fontSize: 24,
            fontWeight: 900,
            letterSpacing: 1.4,
            marginLeft: 86,
          }}
        >
          HIZLI SORU • {item.topic}
        </div>
        <div
          style={{
            fontSize: index === 1 ? 34 : 37,
            lineHeight: 1.17,
            fontWeight: 950,
            marginTop: 16,
            marginLeft: 86,
            maxWidth: 815,
          }}
        >
          {item.question}
        </div>
        <div
          style={{
            position: "absolute",
            left: 42,
            bottom: 25,
            padding: "10px 20px",
            borderRadius: 15,
            background: "#EDF6FC",
            fontSize: 19,
            fontWeight: 900,
          }}
        >
          {index === 0
            ? "İFADELERİ CÜMLEDEKİ GÖREVİNE GÖRE DEĞERLENDİR"
            : "HER SEÇENEK İÇİN METİNDE KANIT ARA"}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 520,
          width: 650,
          height: 360,
        }}
      >
        <ShortArt index={index} />
      </div>
      {show && (
        <>
          <div
            style={{
              position: "absolute",
              left: 36,
              top: 930,
              width: 700,
              display: "flex",
              flexDirection: "column",
              gap: 17,
            }}
          >
            {item.choices.map((c, i) => {
              const ok = reveal && i === item.correct;
              return (
                <div
                  key={c}
                  style={{
                    height: 100,
                    borderRadius: 24,
                    background: ok ? "#DDF8EE" : "white",
                    border: `4px solid ${ok ? mint : "#F0AABB"}`,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 24px",
                    fontSize: 28,
                    fontWeight: 900,
                    boxShadow: "0 8px 18px #173B6612",
                  }}
                >
                  <b
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 16,
                      background: ok ? mint : coral,
                      color: "white",
                      display: "grid",
                      placeItems: "center",
                      marginRight: 20,
                    }}
                  >
                    {String.fromCharCode(65 + i)}
                  </b>
                  {c}
                  {ok && (
                    <span
                      style={{ marginLeft: "auto", fontSize: 48, color: mint }}
                    >
                      ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div
            style={{
              position: "absolute",
              left: 250,
              top: 1390,
              width: 190,
              height: 190,
              borderRadius: 100,
              border: `12px solid ${reveal ? mint : blue}`,
              background: "white",
              display: "grid",
              placeItems: "center",
              textAlign: "center",
              boxShadow: "0 12px 30px #173B6620",
            }}
          >
            <div>
              <div style={{ fontSize: 62, fontWeight: 950 }}>
                {reveal ? "✓" : remain}
              </div>
              <div style={{ fontSize: 22, fontWeight: 950, color: violet }}>
                {reveal ? "DOĞRU!" : "DÜŞÜN!"}
              </div>
            </div>
          </div>
        </>
      )}
      <div
        style={{
          position: "absolute",
          right: 16,
          top: 930,
          width: 315,
          height: 570,
        }}
      >
        <GifCharacter name="ibrahim" x={158} y={0} scale={1.75} animate />
      </div>
      {congrats && (
        <div
          style={{
            position: "absolute",
            left: 52,
            right: 52,
            bottom: 48,
            height: 210,
            borderRadius: 38,
            background: "linear-gradient(100deg,#E65068,#FF8D80)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 67,
            fontWeight: 950,
            boxShadow: "0 20px 45px #E6506840",
          }}
        >
          Tebrikler!
        </div>
      )}
      <Audio
        src={staticFile(
          `/audio/turkce/gecis-paragraf/shorts/${index + 1}/question.mp3`,
        )}
      />
      {f >= tm.reveal && (
        <Sequence from={tm.reveal}>
          <Audio
            src={staticFile(
              `/audio/turkce/gecis-paragraf/shorts/${index + 1}/answer.mp3`,
            )}
          />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
