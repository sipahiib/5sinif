import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";
import data from "../../content/organel.json";
import timings from "./timings.json";
import { GifCharacter } from "../GifCharacter";
import { CtaOptionOne } from "../previews/cta-option-1/CtaOptionOne";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";

const navy = "#173B66",
  blue = "#2878C8",
  coral = "#E8506B",
  mint = "#24AA8D",
  yellow = "#FFC857",
  purple = "#7758D7";
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const pop = (f: number, d = 0) =>
  spring({
    frame: f - d,
    fps: 30,
    config: { damping: 17, stiffness: 120, mass: 0.75 },
  });
const start = (g: "main" | "kurz", i: number) =>
  timings[g].slice(0, i).reduce((s, t) => s + t.frames, 0);
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
const Channel = () => (
  <div
    style={{
      position: "absolute",
      left: 100,
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

const Cell = ({
  x,
  y,
  color = blue,
  scale = 1,
}: {
  x: number;
  y: number;
  color?: string;
  scale?: number;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path
      d="M-32 0C-32-25-5-38 20-28C42-20 43 17 21 30C-5 45-34 25-32 0Z"
      fill={`${color}30`}
      stroke={color}
      strokeWidth="5"
    />
    <circle cx="3" cy="0" r="10" fill={purple} />
  </g>
);
const BodyDiagram = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame(),
    p = pop(f, 5),
    bob = Math.sin(f / 15) * 3;
  if (kind === "variety")
    return (
      <svg viewBox="0 0 650 220" width="100%" height="215">
        {[
          [100, 85, blue],
          [240, 70, coral],
          [380, 100, mint],
          [525, 75, yellow],
        ].map(([x, y, c], i) => (
          <g key={i} transform={`translate(0 ${bob * (i % 2 ? 1 : -1)})`}>
            <Cell
              x={x as number}
              y={y as number}
              color={c as string}
              scale={1 + i * 0.08}
            />
            <path
              d={`M${(x as number) - 35} 160Q${x} ${130 + i * 7} ${(x as number) + 35} 160`}
              fill="none"
              stroke={c as string}
              strokeWidth="7"
            />
          </g>
        ))}
      </svg>
    );
  if (kind === "tissue")
    return (
      <svg viewBox="0 0 650 220" width="100%" height="215">
        <g transform={`translate(20 12) scale(${p})`}>
          {[0, 1, 2].flatMap((r) =>
            [0, 1, 2, 3].map((c) => (
              <Cell
                key={`${r}-${c}`}
                x={115 + c * 100}
                y={45 + r * 61}
                color={r === 1 ? coral : mint}
                scale={0.72}
              />
            )),
          )}
        </g>
        <path
          d="M80 202H555"
          stroke={navy}
          strokeWidth="9"
          strokeLinecap="round"
        />
      </svg>
    );
  if (kind === "organ")
    return (
      <svg viewBox="0 0 650 220" width="100%" height="215">
        <g transform={`translate(320 112) scale(${p})`}>
          <path
            d="M0 74C-120 5-100-100-24-70C0-58 0-25 0-12C0-25 0-58 24-70C100-100 120 5 0 74Z"
            fill={coral}
            stroke={navy}
            strokeWidth="7"
          />
          <path
            d="M0-12C-32 20-10 52 0 74M0-12C32 20 10 52 0 74"
            fill="none"
            stroke="#FF9BAC"
            strokeWidth="7"
          />
        </g>
      </svg>
    );
  if (kind === "system")
    return (
      <svg viewBox="0 0 650 220" width="100%" height="215">
        <g
          transform={`translate(325 106) scale(${p})`}
          fill="none"
          strokeLinecap="round"
        >
          <circle r="76" stroke="#D9E7F3" strokeWidth="30" />
          <path
            d="M0-75V-15M0-15L-68 58M0-15L68 58"
            stroke={blue}
            strokeWidth="15"
          />
          <circle cy="-78" r="28" fill={yellow} stroke={navy} strokeWidth="6" />
          <circle
            cx="-70"
            cy="62"
            r="28"
            fill={mint}
            stroke={navy}
            strokeWidth="6"
          />
          <circle
            cx="70"
            cy="62"
            r="28"
            fill={coral}
            stroke={navy}
            strokeWidth="6"
          />
        </g>
      </svg>
    );
  if (kind === "organism")
    return (
      <svg viewBox="0 0 650 220" width="100%" height="215">
        <g transform={`translate(325 ${105 + bob}) scale(${p})`}>
          <circle cy="-63" r="31" fill={yellow} />
          <path
            d="M0-28V78M0 5L-75 36M0 5L75 36M0 78L-52 145M0 78L52 145"
            fill="none"
            stroke={navy}
            strokeWidth="18"
            strokeLinecap="round"
          />
          <circle cy="29" r="38" fill="none" stroke={mint} strokeWidth="8" />
          <path d="M-23 21Q0-3 23 21Q15 55 0 67Q-15 55-23 21" fill={coral} />
        </g>
      </svg>
    );
  if (kind === "plant")
    return (
      <svg viewBox="0 0 650 220" width="100%" height="215">
        <g transform={`translate(320 205) scale(${p})`}>
          <path
            d="M0 0V-150M0-60C-45-95-94-80-105-42C-55-28-25-42 0-60M0-95C45-130 94-115 105-77C55-63 25-77 0-95"
            fill="#78D39A"
            stroke={mint}
            strokeWidth="8"
          />
          <circle cy="-166" r="32" fill={yellow} />
          <path
            d="M-58 0H58"
            stroke={navy}
            strokeWidth="10"
            strokeLinecap="round"
          />
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 650 220" width="100%" height="215">
      <defs>
        <marker
          id="arr"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0 0L8 4L0 8Z" fill={coral} />
        </marker>
      </defs>
      {["HÜCRE", "DOKU", "ORGAN", "SİSTEM", "ORGANİZMA"].map((t, i) => (
        <g key={t} style={{ opacity: pop(f, i * 7) }}>
          <circle
            cx={72 + i * 127}
            cy="102"
            r={30 + i * 4}
            fill={[blue, mint, yellow, coral, purple][i]}
            opacity=".9"
          />
          <text
            x={72 + i * 127}
            y="175"
            textAnchor="middle"
            fill={navy}
            fontSize="19"
            fontWeight="900"
          >
            {t}
          </text>
          {i < 4 && (
            <path
              d={`M${108 + i * 127} 102H${153 + i * 127}`}
              stroke={coral}
              strokeWidth="6"
              markerEnd="url(#arr)"
            />
          )}
        </g>
      ))}
    </svg>
  );
};

const MainScene = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    s = data.main[index],
    last = index === data.main.length - 1,
    left = s.speaker === "filiz",
    cardLeft = last ? 196 : left ? 220 : 34,
    cardWidth = last ? 568 : 706;
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(140deg,#EAF5FF,#fff 52%,#FFF0ED)",
        fontFamily: "Trebuchet MS,Arial",
        color: navy,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.11,
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
        <span>5. SINIF FEN BİLİMLERİ</span>
        <span style={{ margin: "0 17px", color: "#AFC4D8" }}>|</span>
        <span>HÜCRE • DOKU • ORGAN • SİSTEM</span>
        <span style={{ marginLeft: "auto" }}>
          {String(index + 1).padStart(2, "0")} / {data.main.length}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: cardLeft,
          top: 85,
          width: cardWidth,
          height: 410,
          padding: "22px 26px",
          boxSizing: "border-box",
          borderRadius: 26,
          background: "#FFFFFFF4",
          border: "1px solid #CFDFEE",
          boxShadow: "0 18px 40px #173B6618",
        }}
      >
        <div
          style={{
            color: coral,
            fontSize: 15,
            fontWeight: 950,
            letterSpacing: 1.4,
            opacity: pop(f),
          }}
        >
          {s.title.toUpperCase()}
        </div>
        <div
          style={{
            fontSize: s.lead.length > 73 ? 22 : 26,
            lineHeight: 1.14,
            fontWeight: 950,
            marginTop: 7,
            minHeight: 58,
          }}
        >
          {s.lead}
        </div>
        <BodyDiagram kind={s.kind} />
        <div style={{ display: "flex", gap: 10 }}>
          {s.points.map((x, i) => (
            <div
              key={x}
              style={{
                flex: 1,
                borderRadius: 12,
                padding: "9px 12px",
                fontSize: 16,
                fontWeight: 800,
                background: i ? "#FFF1D4" : "#E5F8F3",
                border: `1px solid ${i ? yellow : mint}`,
                transform: `translateY(${(1 - pop(f, 18 + i * 5)) * 12}px)`,
              }}
            >
              {x}
            </div>
          ))}
        </div>
      </div>
      {!last && (
        <GifCharacter
          name={left ? "filiz" : "ibrahim"}
          x={left ? 105 : 846}
          y={222}
          scale={1.02}
          animate
        />
      )}
      {last && (
        <>
          <GifCharacter name="filiz" x={95} y={222} scale={1.02} animate />
          <GifCharacter
            name="ibrahim"
            x={846}
            y={222}
            scale={1.02}
            animate={false}
          />
        </>
      )}
      <Audio src={staticFile(`/audio/fen/organel/main/${s.id}.mp3`)} />
    </AbsoluteFill>
  );
};

const Lumi = () => {
  const f = useCurrentFrame();
  return (
    <svg width="145" height="150" viewBox="0 0 180 180">
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
      />
      <circle cx="90" cy="18" r="9" fill="#FF6B6B" />
    </svg>
  );
};
const CityMotion = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame(),
    wave = Math.sin(f / 14) * 5,
    p = pop(f, 5);
  return (
    <svg viewBox="0 0 680 360" width="680" height="360">
      <defs>
        <marker
          id="ka"
          markerWidth="9"
          markerHeight="9"
          refX="8"
          refY="4.5"
          orient="auto"
        >
          <path d="M0 0L9 4.5L0 9Z" fill="#FFD166" />
        </marker>
      </defs>
      {kind === "workers" &&
        [0, 1, 2, 3].map((i) => (
          <g
            key={i}
            transform={`translate(${100 + i * 150} ${150 + wave * (i % 2 ? 1 : -1)})`}
          >
            <circle cy="-45" r="30" fill={[mint, coral, yellow, purple][i]} />
            <rect
              x="-42"
              y="-10"
              width="84"
              height="105"
              rx="28"
              fill="#24395E"
              stroke={[mint, coral, yellow, purple][i]}
              strokeWidth="7"
            />
            <path d={`M-22 ${25 + i * 4}H22`} stroke="white" strokeWidth="8" />
          </g>
        ))}
      {kind === "teams" &&
        [0, 1, 2].map((r) => (
          <g key={r} transform={`translate(${120 + r * 210} 180) scale(${p})`}>
            {[0, 1, 2, 3].map((c) => (
              <circle
                key={c}
                cx={(c % 2) * 58 - 29}
                cy={Math.floor(c / 2) * 58 - 29}
                r="25"
                fill={[mint, coral, purple][r]}
                stroke="white"
                strokeWidth="4"
              />
            ))}
            <circle
              r="92"
              fill="none"
              stroke={[mint, coral, purple][r]}
              strokeWidth="7"
              strokeDasharray="14 10"
            />
          </g>
        ))}
      {kind === "building" && (
        <g transform={`translate(340 185) scale(${p})`}>
          <path
            d="M-190 120V-70L0-155L190-70V120Z"
            fill="#24395E"
            stroke={mint}
            strokeWidth="10"
          />
          <path
            d="M-125 120V-35H-40V120M40 120V-35H125V120"
            fill="#FF6381"
            stroke="#FFF"
            strokeWidth="6"
          />
          <circle cy="-75" r="34" fill={yellow} />
        </g>
      )}
      {kind === "network" && (
        <g>
          {[
            [110, 95],
            [340, 55],
            [565, 120],
            [165, 285],
            [450, 280],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle
                cx={x}
                cy={y + wave * (i % 2 ? 1 : -1)}
                r="42"
                fill={[mint, coral, yellow, purple, blue][i]}
                stroke="white"
                strokeWidth="6"
              />
              <circle
                cx={x}
                cy={y + wave * (i % 2 ? 1 : -1)}
                r="15"
                fill="#101B3C"
              />
            </g>
          ))}
          <path
            d="M110 95L340 55L565 120L450 280L165 285L110 95M340 55L450 280M565 120L165 285"
            fill="none"
            stroke="#5CE0D1"
            strokeWidth="7"
            strokeDasharray="15 12"
          />
        </g>
      )}
      {kind === "city" && (
        <g transform={`scale(${p})`} style={{ transformOrigin: "340px 180px" }}>
          <circle
            cx="340"
            cy="180"
            r="160"
            fill="#5CE0D115"
            stroke="#5CE0D1"
            strokeWidth="9"
          />
          <circle
            cx="340"
            cy="180"
            r="110"
            fill="#7257E820"
            stroke="#A897FF"
            strokeWidth="7"
          />
          <circle cx="340" cy="180" r="55" fill={yellow} />
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx={340 + 135 * Math.cos(i * 1.256)}
              cy={180 + 135 * Math.sin(i * 1.256)}
              r="24"
              fill={[mint, coral, purple, blue, yellow][i]}
            />
          ))}
        </g>
      )}
      <path d="M55 332H625" stroke="#ffffff40" strokeWidth="3" />
    </svg>
  );
};
const KurzScene = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    s = data.kurz[index],
    dur = timings.kurz[index].frames,
    rev = index % 2 === 1,
    x = interpolate(
      f,
      [10, Math.max(20, dur - 20)],
      rev ? [805, 620] : [620, 805],
      clamp,
    );
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 55% 45%,#26375F,#101936 70%)",
        fontFamily: "Trebuchet MS,Arial",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(#fff2 1px,transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div style={{ position: "absolute", left: 58, top: 48, width: 820 }}>
        <div
          style={{
            color: "#5CE0D1",
            fontSize: 18,
            fontWeight: 950,
            letterSpacing: 2,
          }}
        >
          LUMİ'NİN YAŞAYAN ŞEHRİ • {index + 1}/{data.kurz.length}
        </div>
        <h1
          style={{
            fontSize: 44,
            lineHeight: 1.04,
            margin: "14px 0 8px",
            maxWidth: 760,
          }}
        >
          {s.title}
        </h1>
        <div style={{ fontSize: 23, color: "#DAE5FF", maxWidth: 760 }}>
          {s.lead}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 190,
          width: 680,
          height: 360,
          scale: 0.76,
          transformOrigin: "top left",
        }}
      >
        <CityMotion kind={s.kind} />
      </div>
      <div
        style={{
          position: "absolute",
          right: 55,
          top: 220,
          width: 275,
          display: "grid",
          gap: 12,
        }}
      >
        {s.facts.map((q, i) => (
          <div
            key={q}
            style={{
              padding: "12px 15px",
              borderRadius: 16,
              background: i ? "#FF638124" : "#5CE0D124",
              border: `2px solid ${i ? "#FF6381" : "#5CE0D1"}`,
              fontSize: 18,
              lineHeight: 1.15,
              fontWeight: 850,
              transform: `translateX(${(1 - pop(f, 18 + i * 8)) * 35}px)`,
            }}
          >
            {q}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: x, top: 378, zIndex: 5 }}>
        <Lumi />
      </div>
      <Audio src={staticFile(`/audio/fen/organel/kurz/${s.id}.mp3`)} />
    </AbsoluteFill>
  );
};

const ShortIllustration = () => {
  const f = useCurrentFrame(),
    assemble = interpolate(f, [20, 90], [0, 1], clamp),
    pulse = 1 + Math.sin(f / 12) * 0.025;
  return (
    <svg viewBox="0 0 920 400" width="920" height="400">
      <defs>
        <marker
          id="sa"
          markerWidth="9"
          markerHeight="9"
          refX="8"
          refY="4.5"
          orient="auto"
        >
          <path d="M0 0L9 4.5L0 9Z" fill={blue} />
        </marker>
      </defs>
      <g transform={`translate(185 185) scale(${pulse})`}>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = (i % 3) * 80 - 80,
            y = Math.floor(i / 3) * 75 - 38;
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <rect
                x="-24"
                y="-24"
                width="48"
                height="48"
                rx="11"
                fill="#BDEDE4"
                stroke={mint}
                strokeWidth="5"
              />
            </g>
          );
        })}
      </g>
      <path
        d="M330 185H410"
        stroke={blue}
        strokeWidth="8"
        markerEnd="url(#sa)"
      />
      <g
        transform={`translate(${500 + (1 - assemble) * 80} 185) scale(${pulse})`}
      >
        <rect
          x="-105"
          y="-88"
          width="210"
          height="176"
          rx="34"
          fill="#FFF0F3"
          stroke={coral}
          strokeWidth="8"
        />
        <g fill="none" strokeWidth="7">
          <path d="M-62-28H5V35H-62Z" stroke={mint} />
          <circle cx="48" cy="-18" r="32" stroke={purple} />
          <path d="M20 52L55 18L82 55Z" stroke={yellow} />
        </g>
        <text
          x="0"
          y="-112"
          textAnchor="middle"
          fill={navy}
          fontSize="34"
          fontWeight="900"
        >
          L
        </text>
      </g>
      <g transform="translate(185 185)">
        <text
          x="0"
          y="-130"
          textAnchor="middle"
          fill={navy}
          fontSize="34"
          fontWeight="900"
        >
          K
        </text>
        <text
          x="0"
          y="142"
          textAnchor="middle"
          fill={navy}
          fontSize="24"
          fontWeight="800"
        >
          K YAPISI
        </text>
      </g>
      <text
        x="500"
        y="327"
        textAnchor="middle"
        fill={navy}
        fontSize="24"
        fontWeight="800"
      >
        L YAPISI
      </text>
    </svg>
  );
};
export const Short = () => {
  const f = useCurrentFrame(),
    s = data.shorts[0],
    t = timings.shorts[0],
    choices = f >= t.qEnd,
    reveal = f >= t.reveal,
    congrats = f >= t.congrats,
    left = t.reveal - f,
    count = left > 0 ? Math.max(1, Math.ceil(left / 30)) : 0;
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(155deg,#EAF6FF,#fff 58%,#FFF0ED)",
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
          backgroundImage: `radial-gradient(${blue} 1.5px,transparent 1.5px)`,
          backgroundSize: "34px 34px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 42,
          right: 42,
          top: 44,
          height: 70,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <b
          style={{
            background: navy,
            color: "white",
            padding: "16px 25px",
            borderRadius: 28,
            fontSize: 26,
          }}
        >
          5. SINIF
        </b>
        <b
          style={{
            background: purple,
            color: "white",
            padding: "16px 25px",
            borderRadius: 28,
            fontSize: 26,
          }}
        >
          FEN BİLİMLERİ
        </b>
        <i
          style={{ height: 4, background: "#CADDED", flex: 1, borderRadius: 4 }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 42,
          right: 42,
          top: 140,
          height: 318,
          borderRadius: 34,
          background: "white",
          border: "2px solid #D2E3EF",
          boxShadow: "0 16px 35px #173B6618",
          padding: "34px 38px 24px 126px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 34,
            top: 40,
            width: 70,
            height: 70,
            borderRadius: 22,
            display: "grid",
            placeItems: "center",
            background: yellow,
            fontSize: 48,
            fontWeight: 950,
          }}
        >
          ?
        </div>
        <div
          style={{
            color: purple,
            fontSize: 24,
            fontWeight: 950,
            letterSpacing: 1,
          }}
        >
          HIZLI SORU • {s.topic}
        </div>
        <div
          style={{
            fontSize: 34,
            lineHeight: 1.16,
            fontWeight: 950,
            marginTop: 14,
          }}
        >
          {s.question}
        </div>
        <div
          style={{
            position: "absolute",
            left: 38,
            bottom: 22,
            padding: "10px 18px",
            borderRadius: 16,
            background: "#EAF4FB",
            fontSize: 17,
            fontWeight: 850,
          }}
        >
          YAPI DÜZEYLERİ • K VE L'Yİ BELİRLE
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          top: 470,
          width: 920,
          height: 400,
        }}
      >
        <ShortIllustration />
      </div>
      {!choices && (
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 900,
            width: 650,
            height: 850,
            opacity: 0.42,
          }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <i
              key={i}
              style={{
                position: "absolute",
                left: 70 + (i % 3) * 190,
                top: 40 + Math.floor(i / 3) * 190 + Math.sin(f / 18 + i) * 18,
                width: 78 + (i % 2) * 18,
                height: 78 + (i % 2) * 18,
                borderRadius: i % 2 ? 24 : "50%",
                border: `7px solid ${i % 3 === 0 ? mint : i % 3 === 1 ? purple : coral}`,
                rotate: `${f * 0.18 * (i % 2 ? 1 : -1)}deg`,
                boxShadow: "0 10px 24px #173B6615",
              }}
            />
          ))}
        </div>
      )}
      {choices && (
        <div
          style={{
            position: "absolute",
            left: 32,
            top: 890,
            width: 690,
            display: "grid",
            gap: 18,
          }}
        >
          {s.choices.map((q, i) => {
            const ok = reveal && i === s.correct;
            return (
              <div
                key={q}
                style={{
                  height: 106,
                  borderRadius: 22,
                  background: ok ? "#DDF7ED" : "#FFF",
                  border: `3px solid ${ok ? mint : "#F09AAF"}`,
                  boxShadow: "0 8px 20px #173B6612",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 25px",
                  fontSize: 27,
                  fontWeight: 900,
                }}
              >
                <b
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 16,
                    display: "grid",
                    placeItems: "center",
                    background: ok ? mint : coral,
                    color: "white",
                    marginRight: 20,
                  }}
                >
                  {"ABCD"[i]}
                </b>
                {q}
                {ok && (
                  <span
                    style={{ marginLeft: "auto", color: mint, fontSize: 48 }}
                  >
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          right: 24,
          top:
            1080 -
            interpolate(f, [t.congrats - 10, t.congrats], [0, 120], clamp),
          width: 315,
          height: 560,
        }}
      >
        <GifCharacter name="ibrahim" x={157} y={280} scale={1.92} animate />
      </div>
      {choices && !reveal && (
        <div
          style={{
            position: "absolute",
            left: 270,
            top: 1510,
            width: 190,
            height: 190,
            borderRadius: "50%",
            background: "white",
            border: `12px solid ${blue}`,
            display: "grid",
            placeItems: "center",
            boxShadow: "0 10px 28px #173B6625",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 75, fontWeight: 950, lineHeight: 1 }}>
              {count}
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 950,
                color: coral,
                marginTop: 7,
              }}
            >
              DÜŞÜN!
            </div>
          </div>
        </div>
      )}
      {reveal && !congrats && (
        <div
          style={{
            position: "absolute",
            left: 32,
            top: 1450,
            width: 690,
            height: 330,
            borderRadius: 30,
            background: "linear-gradient(120deg,#E7FAF4,#F3EDFF)",
            border: `4px solid ${mint}`,
            padding: "42px 45px",
            boxSizing: "border-box",
            boxShadow: "0 16px 35px #173B6618",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 950, color: mint }}>
            NEDEN B?
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.25,
              fontWeight: 900,
              marginTop: 20,
            }}
          >
            Benzer küçük birimler K'yi; farklı K türleri ise L'yi oluşturur.
          </div>
        </div>
      )}
      {congrats && (
        <div
          style={{
            position: "absolute",
            left: 46,
            right: 46,
            bottom: 55,
            height: 225,
            borderRadius: 35,
            background: "linear-gradient(120deg,#E8FFF7,#FFF2D8)",
            border: `4px solid ${mint}`,
            display: "grid",
            placeItems: "center",
            fontSize: 70,
            fontWeight: 950,
            color: coral,
            boxShadow: "0 18px 45px #173B6620",
          }}
        >
          Tebrikler!
        </div>
      )}
      <Audio src={staticFile("/audio/fen/organel/shorts/1/question.mp3")} />
      {reveal && (
        <Sequence from={t.reveal}>
          <Audio src={staticFile("/audio/fen/organel/shorts/1/answer.mp3")} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
export const Main = () => (
  <AbsoluteFill>
    {data.main.map((_, i) => (
      <Sequence
        key={i}
        from={start("main", i)}
        durationInFrames={timings.main[i].frames}
      >
        <Canvas>
          <MainScene index={i} />
        </Canvas>
      </Sequence>
    ))}
    <Sequence from={start("main", timings.main.length)} durationInFrames={210}>
      <Canvas>
        <CtaOptionOne />
      </Canvas>
    </Sequence>
    {mainDuration() > 1050 && (
      <Sequence from={870} durationInFrames={180}>
        <Channel />
      </Sequence>
    )}
  </AbsoluteFill>
);
export const Kurz = () => (
  <AbsoluteFill>
    {data.kurz.map((_, i) => (
      <Sequence
        key={i}
        from={start("kurz", i)}
        durationInFrames={timings.kurz[i].frames}
      >
        <Canvas>
          <KurzScene index={i} />
        </Canvas>
      </Sequence>
    ))}
    {kurzDuration() > 1050 && (
      <Sequence from={870} durationInFrames={180}>
        <Channel />
      </Sequence>
    )}
  </AbsoluteFill>
);
