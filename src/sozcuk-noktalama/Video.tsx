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
import data from "../../content/sozcuk-noktalama.json";
import timings from "./timings.json";
import { GifCharacter } from "../GifCharacter";
import { CtaOptionOne } from "../previews/cta-option-1/CtaOptionOne";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const blue = "#236CB7",
  red = "#DF5165",
  mint = "#209B82",
  navy = "#173B66";
const start = (group: "main" | "kurz", i: number) =>
  timings[group].slice(0, i).reduce((a, b) => a + b.frames, 0);
export const mainDuration = () => start("main", timings.main.length) + 210;
export const kurzDuration = () => start("kurz", timings.kurz.length);
const pop = (f: number, delay = 0) =>
  spring({
    frame: f - delay,
    fps: 30,
    config: { damping: 22, stiffness: 115, mass: 0.8 },
  });

const Lumi = () => {
  const f = useCurrentFrame();
  return (
    <svg
      width="150"
      height="165"
      viewBox="0 0 180 180"
      style={{ transform: `translateY(${Math.sin(f / 21) * 3}px)` }}
    >
      <ellipse cx="90" cy="168" rx="51" ry="7" fill="#0003" />
      <path
        d="M47 82 16 61v48l31-12M133 82l31-21v48l-31-12"
        fill="#51D6D0"
        stroke="#171831"
        strokeWidth="6"
      />
      <rect
        x="39"
        y="43"
        width="102"
        height="104"
        rx="45"
        fill="#7257E8"
        stroke="#171831"
        strokeWidth="7"
      />
      <path d="M43 79Q90 9 138 79" fill="#A392FF" />
      <rect
        x="54"
        y="69"
        width="72"
        height="54"
        rx="23"
        fill="#EFFFFE"
        stroke="#171831"
        strokeWidth="6"
      />
      <ellipse
        cx="75"
        cy="94"
        rx="7"
        ry={f % 143 < 4 ? 2 : 12}
        fill="#171831"
      />
      <ellipse
        cx="106"
        cy="94"
        rx="7"
        ry={f % 143 < 4 ? 2 : 12}
        fill="#171831"
      />
      <path
        d="M78 110q12 8 24 0M90 43V24"
        fill="none"
        stroke="#171831"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="90" cy="18" r="9" fill="#FF6B6B" />
      <circle cx="57" cy="142" r="9" fill="#FFD166" />
      <circle cx="123" cy="142" r="9" fill="#FFD166" />
    </svg>
  );
};

const Diagram = ({ kind, dark }: { kind: string; dark: boolean }) => {
  const f = useCurrentFrame();
  const fg = dark ? "#A9FAE9" : blue,
    alt = dark ? "#FFCB78" : red;
  const draw = interpolate(f, [10, 80], [0, 1], clamp);
  return (
    <svg viewBox="0 0 620 70" width="100%" height="65" aria-hidden="true">
      {kind === "compare" && (
        <>
          <circle
            cx="120"
            cy="30"
            r="23"
            fill="none"
            stroke={alt}
            strokeWidth="3"
          />
          <path d="M135 48l17 17" stroke={alt} strokeWidth="6" />
          <circle
            cx="460"
            cy="30"
            r="23"
            fill="none"
            stroke={fg}
            strokeWidth="3"
          />
          <path
            d="M475 48l17 17M170 33H400"
            stroke={fg}
            strokeWidth="3"
            strokeDasharray="8 6"
            strokeDashoffset={-f * 0.2}
          />
          <text x="310" y="40" textAnchor="middle" fill={fg} fontSize="27">
            ?
          </text>
        </>
      )}
      {kind === "split" && (
        <>
          <path d="M100 40H255M365 40H520" stroke={fg} strokeWidth="4" />
          <rect
            x="275"
            y="7"
            width="65"
            height="58"
            rx="12"
            fill="none"
            stroke={alt}
            strokeWidth="3"
          />
          <path
            d="M286 45l12 11 29-32"
            fill="none"
            stroke={fg}
            strokeWidth="4"
            strokeDasharray="70"
            strokeDashoffset={70 * (1 - draw)}
          />
        </>
      )}
      {kind === "keys" && (
        <>
          {[70, 190, 310, 430, 550].map((x, i) => (
            <g key={x}>
              <path
                d={`M310 35L${x} ${i % 2 ? 15 : 52}`}
                stroke={fg}
                strokeWidth="2"
                opacity={draw}
              />
              <circle
                cx={x}
                cy={i % 2 ? 15 : 52}
                r={9 + 2 * Math.sin(f / 24 + i)}
                fill={i % 2 ? alt : fg}
              />
            </g>
          ))}
        </>
      )}
      {kind === "analogy" && (
        <>
          <path
            d="M95 57Q310 -33 525 57"
            stroke={fg}
            strokeWidth="5"
            fill="none"
            strokeDasharray="470"
            strokeDashoffset={470 * (1 - draw)}
          />
          <circle cx="95" cy="55" r="10" fill={alt} />
          <circle cx="525" cy="55" r="10" fill={fg} />
          <text x="310" y="56" textAnchor="middle" fill={fg} fontSize="18">
            ORTAK ÖZELLİK
          </text>
        </>
      )}
      {kind === "speech" && (
        <>
          <rect
            x="150"
            y="8"
            width="320"
            height="46"
            rx="17"
            fill="none"
            stroke={fg}
            strokeWidth="3"
          />
          <path d="M180 53v14l20-14" fill="none" stroke={fg} strokeWidth="3" />
          {[280, 310, 340].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={31 + Math.sin(f / 12 + i) * 3}
              r="5"
              fill={alt}
            />
          ))}
        </>
      )}
      {["punct", "capital", "note"].includes(kind) && (
        <>
          {(kind === "punct"
            ? [".", ","]
            : kind === "note"
              ? ["!", "NOT", "!"]
              : ["a", "→", "A"]
          ).map((s, i) => (
            <g
              key={i}
              transform={`translate(${kind === "punct" ? 245 + i * 130 : 180 + i * 130},36)`}
            >
              <circle r="29" fill={i === 1 ? alt : fg} opacity=".10" />
              <text
                textAnchor="middle"
                y="11"
                fontSize={s === "NOT" ? 19 : 36}
                fill={i === 1 ? alt : fg}
                fontWeight="bold"
              >
                {s}
              </text>
            </g>
          ))}
        </>
      )}
    </svg>
  );
};

const Example = ({
  text,
  index,
  dark,
  kind,
}: {
  text: string;
  index: number;
  dark: boolean;
  kind: string;
}) => {
  const f = useCurrentFrame(),
    p = pop(f, 14 + index * 16);
  const parts = text.split(/([.,·]|→|“|”)/g);
  return (
    <div
      data-qa="example"
      style={{
        position: "relative",
        minHeight: 66,
        boxSizing: "border-box",
        padding: "13px 21px",
        background: dark ? "#FFFFFF0D" : "#F3F8FD",
        border: `1.5px solid ${dark ? "#FFFFFF25" : "#DBE7F2"}`,
        borderRadius: 17,
        opacity: p,
        transform: `translateY(${(1 - p) * 12}px)`,
        fontSize: text.length > 58 ? 19 : 24,
        lineHeight: 1.4,
        fontWeight: 800,
        color: dark ? "#F4F8FF" : navy,
      }}
    >
      {parts.map((s, i) => (
        <span
          key={i}
          style={{
            color: /^[.,·→“”]$/.test(s) ? (dark ? "#FFD166" : red) : undefined,
            background:
              /^[.,·]$/.test(s) && kind === "punct"
                ? dark
                  ? "#FFD16622"
                  : "#FFD16644"
                : undefined,
            borderRadius: 3,
          }}
        >
          {s}
        </span>
      ))}
    </div>
  );
};

const Scene = ({ index, dark = false }: { index: number; dark?: boolean }) => {
  const f = useCurrentFrame(),
    group = dark ? "kurz" : "main";
  const s = data[group][index],
    t = timings[group][index],
    left = s.speaker === "filiz";
  const cardX = dark ? 45 : left ? 223 : 32;
  const cardW = dark ? 704 : 705;
  return (
    <AbsoluteFill
      style={{
        fontFamily: "Trebuchet MS,Arial,sans-serif",
        background: dark
          ? "radial-gradient(ellipse at 75% 25%,#282D63,#10172E 72%)"
          : "linear-gradient(135deg,#E8F4FF,#FAFCFF 55%,#FFF0ED)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: dark ? 0.2 : 0.1,
          backgroundImage: `radial-gradient(${dark ? "#A6BDFB" : blue} 1px,transparent 1px)`,
          backgroundSize: "33px 33px",
          transform: `translateY(${Math.sin(f / 45) * 2}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 32,
          right: 32,
          top: 22,
          height: 53,
          display: "flex",
          alignItems: "center",
          gap: 14,
          color: dark ? "#D8F9F3" : navy,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: 1.2 }}>
          5. SINIF TÜRKÇE
        </div>
        <div
          style={{
            height: 20,
            width: 1,
            background: dark ? "#FFFFFF44" : "#AAC4DD",
          }}
        />
        <div style={{ fontSize: 15, fontWeight: 800 }}>
          {dark ? "LUMİ İLE ANLAM ATÖLYESİ" : "SÖZCÜK, ANLAM VE NOKTALAMA"}
        </div>
        <div style={{ marginLeft: "auto", fontSize: 12, fontWeight: 800 }}>
          {String(index + 1).padStart(2, "0")} / {data[group].length}
        </div>
      </div>
      <div
        data-qa="lesson-card"
        style={{
          position: "absolute",
          left: cardX,
          width: cardW,
          top: 91,
          height: 380,
          boxSizing: "border-box",
          borderRadius: 25,
          padding: "22px 26px",
          background: dark ? "#192343EE" : "#FFFFFFF5",
          border: `1px solid ${dark ? "#53639866" : "#CFDFEE"}`,
          boxShadow: "0 16px 32px #0E284F14",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: 1.4,
            color: dark ? "#57DBC2" : red,
            marginBottom: 7,
          }}
        >
          {s.title.toLocaleUpperCase("tr-TR")}
        </div>
        <div
          data-qa="heading"
          style={{
            fontSize: s.lead.length > 59 ? 24 : 28,
            lineHeight: 1.2,
            fontWeight: 900,
            color: dark ? "white" : navy,
            marginBottom: 6,
          }}
        >
          {s.lead}
        </div>
        <Diagram kind={s.kind} dark={dark} />
        <div style={{ display: "grid", gap: 11 }}>
          {s.examples.map((text, i) => (
            <Example
              key={text}
              text={text}
              index={i}
              dark={dark}
              kind={s.kind}
            />
          ))}
        </div>
        <div
          data-qa="facts"
          style={{
            marginTop: 13,
            display: "grid",
            gap: 5,
            fontSize: 13.5,
            lineHeight: 1.25,
            color: dark ? "#D8E4FC" : "#325375",
            fontWeight: 700,
          }}
        >
          {s.facts.map((x, i) => (
            <div key={x} style={{ opacity: pop(f, 40 + i * 8) }}>
              <span style={{ color: dark ? "#57DBC2" : mint, marginRight: 7 }}>
                ✓
              </span>
              {x}
            </div>
          ))}
        </div>
        {s.kind === "note" && (
          <div
            style={{
              position: "absolute",
              right: 22,
              top: -13,
              padding: "6px 15px",
              borderRadius: 10,
              background: "#FFD166",
              color: "#513D08",
              fontSize: 13,
              fontWeight: 950,
              boxShadow: "0 6px 18px #DE9B2322",
            }}
          >
            NOT • KAYNAKTAKİ UYARI
          </div>
        )}
      </div>
      {dark ? (
        <div style={{ position: "absolute", right: 32, top: 243 }}>
          <Lumi />
        </div>
      ) : (
        <>
          <GifCharacter
            name={s.speaker as "filiz" | "ibrahim"}
            x={left ? 112 : 848}
            y={162}
            scale={1.3}
            flip={!left}
            animate={f < t.audioFrames}
          />
          <div
            style={{
              position: "absolute",
              left: left ? 55 : 791,
              top: 454,
              width: 114,
              height: 28,
              borderRadius: 9,
              background: left ? red : blue,
              color: "white",
              fontWeight: 900,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {left ? "Filiz" : "İbrahim"}
          </div>
        </>
      )}
      <div
        style={{
          position: "absolute",
          left: cardX,
          right: dark ? 212 : left ? 32 : 223,
          bottom: 23,
          height: 3,
          background: dark ? "#FFFFFF17" : "#CADAE8",
          borderRadius: 3,
        }}
      >
        <div
          style={{
            width: `${(100 * f) / t.frames}%`,
            height: "100%",
            borderRadius: 3,
            background: dark ? "#57DBC2" : blue,
          }}
        />
      </div>
      <Audio
        src={staticFile(`audio/turkce/sozcuk-noktalama/${group}/${s.id}.mp3`)}
      />
    </AbsoluteFill>
  );
};

// Work in a fixed 960×540 layout and render natively at 1920×1080.
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
export const Lesson = ({ dark = false }: { dark?: boolean }) => {
  const group = dark ? "kurz" : "main";
  return (
    <AbsoluteFill>
      <Canvas>
        {data[group].map((_, i) => (
          <Sequence
            key={i}
            from={start(group, i)}
            durationInFrames={timings[group][i].frames}
          >
            {dark ? <Infographic index={i} /> : <Scene index={i} />}
          </Sequence>
        ))}
        <Sequence from={870} durationInFrames={180}>
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
        {!dark && (
          <Sequence
            from={start("main", data.main.length)}
            durationInFrames={210}
          >
            <CtaOptionOne />
          </Sequence>
        )}
      </Canvas>
    </AbsoluteFill>
  );
};
export const Main = () => <Lesson />;
export const Kurz = () => <Lesson dark />;

const KurzVisual = ({ index, kind }: { index: number; kind: string }) => {
  const f = useCurrentFrame();
  const arrive = spring({
    frame: f,
    fps: 30,
    config: { damping: 18, stiffness: 70, mass: 1.1 },
  });
  const draw = interpolate(f, [5, 48], [0, 1], clamp);
  const orbit = f * 0.75;
  const pulse = 1 + Math.sin(f / 13) * 0.045;
  const foreground = "#A8FFEA";
  const warm = "#FFB769";
  const coral = "#FF6F78";
  const common = {
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 570 105" width="570" height="105" aria-hidden="true">
      <defs>
        <linearGradient id={`beam-${index}`} x1="0" x2="1">
          <stop stopColor={warm} />
          <stop offset="1" stopColor={foreground} />
        </linearGradient>
        <filter
          id={`glow-${index}`}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {kind === "compare" && (
        <g transform={`translate(${(1 - arrive) * -35} 0)`}>
          <circle
            cx="118"
            cy="52"
            r="31"
            fill="#FFB76922"
            stroke={warm}
            strokeWidth="4"
          />
          <circle
            cx="452"
            cy="52"
            r="31"
            fill="#A8FFEA22"
            stroke={foreground}
            strokeWidth="4"
          />
          <path
            d="M151 52H419"
            stroke={`url(#beam-${index})`}
            strokeWidth="6"
            strokeDasharray="268"
            strokeDashoffset={268 * (1 - draw)}
            {...common}
          />
          <circle
            cx={151 + 268 * ((orbit % 100) / 100)}
            cy="52"
            r="7"
            fill={coral}
            filter={`url(#glow-${index})`}
          />
          <path
            d="m105 50 10 10 18-24M439 52h26M452 39v26"
            stroke="white"
            strokeWidth="5"
            {...common}
          />
        </g>
      )}
      {kind === "split" && (
        <g opacity={arrive} transform={`translate(0 ${(1 - arrive) * 25})`}>
          <circle
            cx="285"
            cy="51"
            r={34 * pulse}
            fill="#222E58"
            stroke={warm}
            strokeWidth="4"
          />
          <path
            d="M285 18V4M285 98V84M251 51H72M319 51H498"
            stroke={foreground}
            strokeWidth="4"
            strokeDasharray="10 9"
            strokeDashoffset={-orbit}
            {...common}
          />
          <path
            d="m270 51 12 12 22-27"
            stroke="white"
            strokeWidth="6"
            strokeDasharray="70"
            strokeDashoffset={70 * (1 - draw)}
            {...common}
          />
          <circle cx="71" cy="51" r="13" fill={coral} />
          <circle cx="499" cy="51" r="13" fill={foreground} />
        </g>
      )}
      {kind === "keys" && (
        <g transform={`rotate(${Math.sin(f / 45) * 2} 285 52)`}>
          {[0, 1, 2, 3, 4, 5].map((n) => {
            const a = (n * Math.PI) / 3 + (orbit * Math.PI) / 180;
            const x = 285 + Math.cos(a) * 170,
              y = 52 + Math.sin(a) * 38;
            return (
              <g key={n}>
                <path
                  d={`M285 52L${x} ${y}`}
                  stroke={n % 2 ? warm : foreground}
                  strokeWidth="2"
                  opacity={draw * 0.75}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={8 + (n % 2) * 3}
                  fill={n % 2 ? warm : foreground}
                  transform={`scale(${arrive})`}
                  transformOrigin={`${x}px ${y}px`}
                />
              </g>
            );
          })}
          <circle
            cx="285"
            cy="52"
            r={24 * pulse}
            fill="#7257E8"
            stroke="white"
            strokeWidth="4"
          />
          <circle cx="285" cy="52" r="7" fill="white" />
        </g>
      )}
      {kind === "analogy" && (
        <g opacity={arrive}>
          <path
            d="M77 79Q285 -42 493 79"
            stroke={`url(#beam-${index})`}
            strokeWidth="8"
            strokeDasharray="500"
            strokeDashoffset={500 * (1 - draw)}
            {...common}
          />
          <circle cx="77" cy="79" r="18" fill={warm} />
          <circle cx="493" cy="79" r="18" fill={foreground} />
          <circle
            cx={285 + Math.cos(orbit / 18) * 13}
            cy={32 + Math.sin(orbit / 18) * 6}
            r="15"
            fill={coral}
            filter={`url(#glow-${index})`}
          />
          <path
            d="M77 79h416"
            stroke="#8395CD55"
            strokeWidth="2"
            strokeDasharray="7 10"
            {...common}
          />
        </g>
      )}
      {kind === "speech" && (
        <g
          transform={`scale(${0.8 + 0.2 * arrive})`}
          transformOrigin="285px 52px"
        >
          <path
            d="M95 16H475Q500 16 500 40V62Q500 86 475 86H220L183 101l9-15H95Q70 86 70 62V40Q70 16 95 16Z"
            fill="#222E58"
            stroke={foreground}
            strokeWidth="4"
          />
          {Array.from({ length: 13 }, (_, n) => {
            const h = 12 + Math.abs(Math.sin(f / 7 + n * 0.8)) * 38;
            return (
              <rect
                key={n}
                x={133 + n * 24}
                y={51 - h / 2}
                width="10"
                height={h}
                rx="5"
                fill={n % 3 === 0 ? warm : foreground}
                opacity={0.75 + 0.25 * Math.sin(f / 11 + n)}
              />
            );
          })}
        </g>
      )}
      {kind === "punct" && (
        <g>
          <ellipse
            cx="285"
            cy="53"
            rx="205"
            ry="38"
            fill="none"
            stroke="#8395CD66"
            strokeWidth="2"
            strokeDasharray="6 10"
            strokeDashoffset={-orbit}
          />
          <circle cx="285" cy="53" r={27 * pulse} fill="#7257E8" opacity=".8" />
          <text
            x="285"
            y="67"
            textAnchor="middle"
            fill="white"
            fontSize="43"
            fontWeight="900"
          >
            {index === 5 ? "." : ","}
          </text>
          {[0, 1, 2].map((n) => {
            const a = ((orbit + n * 120) * Math.PI) / 180;
            return (
              <circle
                key={n}
                cx={285 + Math.cos(a) * 205}
                cy={53 + Math.sin(a) * 38}
                r={9 + n * 2}
                fill={[warm, foreground, coral][n]}
              />
            );
          })}
        </g>
      )}
      {kind === "capital" && (
        <g opacity={arrive}>
          <circle
            cx="170"
            cy="53"
            r="37"
            fill="#28345F"
            stroke={foreground}
            strokeWidth="3"
          />
          <circle
            cx="400"
            cy="53"
            r="37"
            fill="#3D304C"
            stroke={warm}
            strokeWidth="3"
          />
          <text
            x="170"
            y="69"
            textAnchor="middle"
            fill={foreground}
            fontSize="47"
            fontWeight="900"
          >
            a
          </text>
          <text
            x="400"
            y="69"
            textAnchor="middle"
            fill={warm}
            fontSize="47"
            fontWeight="900"
          >
            A
          </text>
          <path
            d="M218 53H348"
            stroke="white"
            strokeWidth="5"
            strokeDasharray="130"
            strokeDashoffset={130 * (1 - draw)}
            {...common}
          />
          <path
            d="m333 39 17 14-17 14"
            stroke="white"
            strokeWidth="5"
            {...common}
          />
          <circle
            cx={230 + (orbit % 105)}
            cy="53"
            r="6"
            fill={coral}
            filter={`url(#glow-${index})`}
          />
        </g>
      )}
    </svg>
  );
};

const Infographic = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    s = data.kurz[index],
    t = timings.kurz[index];
  const colors = ["#FFB06C", "#72E5CB"];
  const camera = interpolate(
    f,
    [0, Math.min(90, t.frames - 1)],
    [1.035, 1],
    clamp,
  );
  const focus = interpolate(
    f,
    [t.frames * 0.35, t.frames * 0.45],
    [0, 1],
    clamp,
  );
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 25% 25%,#303460,#11182F 70%)",
        fontFamily: "Trebuchet MS,Arial",
        color: "white",
        overflow: "hidden",
        transform: `scale(${camera})`,
      }}
    >
      <svg
        width="960"
        height="540"
        style={{ position: "absolute", opacity: 0.2 }}
      >
        {Array.from({ length: 45 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 173) % 960}
            cy={(i * 97) % 540}
            r={1 + (i % 2)}
            fill="#B6CFED"
          />
        ))}
        <ellipse
          cx="450"
          cy="280"
          rx="430"
          ry="200"
          fill="none"
          stroke="#7897D7"
          strokeWidth="1"
          strokeDasharray="4 12"
          strokeDashoffset={f * 0.15}
        />
        <circle
          cx={110 + ((f * 1.4 + index * 80) % 820)}
          cy={155 + Math.sin(f / 28 + index) * 18}
          r="3"
          fill="#FFB769"
          opacity=".65"
        />
        <circle
          cx={850 - ((f * 0.8 + index * 60) % 760)}
          cy={455 + Math.cos(f / 32 + index) * 15}
          r="2.5"
          fill="#72E5CB"
          opacity=".7"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 38,
          top: 27,
          fontSize: 12,
          color: "#72E5CB",
          letterSpacing: 2,
          fontWeight: 900,
        }}
      >
        LUMİ • ANLAM ATÖLYESİ • {index + 1}/8
      </div>
      <div
        style={{
          position: "absolute",
          left: 38,
          top: 65,
          right: 50,
          fontSize: 31,
          fontWeight: 900,
          lineHeight: 1.12,
        }}
      >
        {s.title}
      </div>
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 112,
          right: 45,
          fontSize: 16,
          color: "#C2D5ED",
        }}
      >
        {s.lead}
      </div>
      <div style={{ position: "absolute", left: 0, top: 159, width: 570 }}>
        <KurzVisual index={index} kind={s.kind} />
      </div>
      {s.examples.map((x, i) => (
        <div
          key={x}
          style={{
            position: "absolute",
            left: 40,
            top: 270 + i * 82,
            width: 535,
            minHeight: 66,
            boxSizing: "border-box",
            padding: "17px 22px",
            borderRadius: 16,
            background: i ? "#1B4145" : "#463A44",
            border: `2px solid ${colors[i]}`,
            fontSize: x.length > 48 ? 19 : 23,
            fontWeight: 900,
            lineHeight: 1.2,
            transform: `translateX(${(1 - pop(f, 10 + i * 20)) * (i ? -28 : 28)}px) rotate(${(1 - pop(f, 10 + i * 20)) * (i ? -1.4 : 1.4)}deg)`,
            opacity: pop(f, 10 + i * 20),
            clipPath: `inset(0 ${(1 - pop(f, 10 + i * 20)) * 100}% 0 0 round 16px)`,
            boxShadow: `0 10px 28px #0003`,
          }}
        >
          {x}
        </div>
      ))}
      <svg
        width="75"
        height="148"
        viewBox="0 0 75 148"
        style={{ position: "absolute", left: 575, top: 270 }}
      >
        <path
          d="M0 33C25 33 50 33 75 33M0 115C25 115 50 115 75 115"
          fill="none"
          stroke="#72E5CB"
          strokeWidth="3"
          strokeDasharray="8 6"
          strokeDashoffset={-f * 0.3}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 650,
          top: 270,
          right: 35,
          display: "grid",
          gap: 16,
        }}
      >
        {s.facts.map((x, i) => (
          <div
            key={x}
            style={{
              height: 66,
              boxSizing: "border-box",
              padding: "10px 18px",
              borderRadius: 15,
              background: "#FFFFFF09",
              borderLeft: `4px solid ${colors[i]}`,
              fontSize: 15,
              lineHeight: 1.3,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              opacity: pop(f, 38 + i * 15),
              color: colors[i],
              transform: `translateY(${i ? -focus * 2 : focus * 2}px) scaleX(${pop(f, 38 + i * 15)})`,
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
          right: 77,
          bottom: 13,
          transform: "scale(.76)",
          transformOrigin: "bottom center",
        }}
      >
        <Lumi />
      </div>
      <Audio
        src={staticFile(`audio/turkce/sozcuk-noktalama/kurz/${s.id}.mp3`)}
      />
    </AbsoluteFill>
  );
};

export const Short = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    s = data.shorts[index],
    t = timings.shorts[index],
    revealed = f >= t.reveal;
  const speaking = f < t.qEnd || (f >= t.reveal && f < t.aEnd);
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(155deg,#E9F5FF,#FFFFFF 55%,#FFF0ED)",
        fontFamily: "Trebuchet MS,Arial",
        color: navy,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 54,
          right: 54,
          top: 55,
          height: 80,
          borderRadius: 25,
          background: navy,
          color: "white",
          display: "flex",
          alignItems: "center",
          padding: "0 30px",
          fontSize: 27,
          fontWeight: 900,
        }}
      >
        TÜRKÇE • DÜŞÜN VE BUL
        <span style={{ marginLeft: "auto", color: "#FFD166" }}>
          {index + 1}/3
        </span>
      </div>
      <div
        data-qa="short-question"
        style={{
          position: "absolute",
          left: 65,
          right: 65,
          top: 183,
          height: 380,
          boxSizing: "border-box",
          borderRadius: 36,
          background: "white",
          boxShadow: "0 20px 50px #173B6618",
          border: "3px solid #D8E6F2",
          padding: "35px 35px",
          fontSize: index === 1 ? 35 : 37,
          lineHeight: 1.34,
          fontWeight: 850,
          whiteSpace: "pre-line",
          display: "flex",
          alignItems: "center",
        }}
      >
        {s.display}
      </div>
      {f >= t.qEnd && (
        <div
          style={{
            position: "absolute",
            left: 70,
            right: 70,
            top: 606,
            display: "grid",
            gap: 20,
          }}
        >
          {s.choices.map((c, i) => {
            const ok = revealed && s.correct === i;
            return (
              <div
                data-qa="short-choice"
                key={c}
                style={{
                  height: 132,
                  boxSizing: "border-box",
                  borderRadius: 26,
                  background: ok ? "#E1F8EF" : "white",
                  border: `4px solid ${ok ? mint : "#D8E6F2"}`,
                  boxShadow: "0 10px 25px #173B660C",
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  padding: "0 24px",
                  fontSize: c.length > 38 ? 29 : 33,
                  fontWeight: 800,
                }}
              >
                <div
                  style={{
                    flex: "0 0 65px",
                    height: 65,
                    borderRadius: 19,
                    background: ok ? mint : red,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </div>
                <div style={{ flex: 1 }}>{c}</div>
                {ok && <span style={{ color: mint, fontSize: 43 }}>✓</span>}
              </div>
            );
          })}
        </div>
      )}
      {f >= t.qEnd && !revealed && (
        <div
          data-qa="timer"
          style={{
            position: "absolute",
            left: 180,
            top: 1330,
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: "white",
            boxShadow: "0 16px 35px #173B6620",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="240"
            height="240"
            style={{ position: "absolute", transform: "rotate(-90deg)" }}
          >
            <circle
              cx="120"
              cy="120"
              r="102"
              fill="none"
              stroke="#E4EDF6"
              strokeWidth="13"
            />
            <circle
              cx="120"
              cy="120"
              r="102"
              fill="none"
              stroke="#F6BC46"
              strokeWidth="13"
              strokeDasharray={Math.PI * 204}
              strokeDashoffset={(Math.PI * 204 * (f - t.qEnd)) / 150}
            />
          </svg>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 83, fontWeight: 950, lineHeight: 1 }}>
              {Math.ceil((t.reveal - f) / 30)}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: red,
                marginTop: 9,
              }}
            >
              DÜŞÜN!
            </div>
          </div>
        </div>
      )}
      <GifCharacter
        name="ibrahim"
        x={810}
        y={1440}
        scale={1.72}
        flip
        animate={speaking}
      />
      {f >= t.congrats && (
        <div
          style={{
            position: "absolute",
            left: 85,
            top: 1370,
            fontSize: 65,
            fontWeight: 950,
            color: red,
            transform: `scale(${0.96 + 0.04 * pop(f - t.congrats)})`,
          }}
        >
          Tebrikler!
        </div>
      )}
      <Audio
        src={staticFile(
          `audio/turkce/sozcuk-noktalama/shorts/${index + 1}/question.mp3`,
        )}
      />
      <Sequence from={t.reveal}>
        <Audio
          src={staticFile(
            `audio/turkce/sozcuk-noktalama/shorts/${index + 1}/answer.mp3`,
          )}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
