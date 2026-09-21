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
import data from "../../content/komsularimiz.json";
import timings from "./timings.json";
import { CtaOptionOne } from "../previews/cta-option-1/CtaOptionOne";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";
import { GifCharacter } from "../GifCharacter";

const C = {
  navy: "#173B66",
  blue: "#2B7FCA",
  coral: "#ED536C",
  mint: "#28AD91",
  yellow: "#FFC857",
  ink: "#102E50",
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
    config: { damping: 18, stiffness: 105, mass: 0.8 },
  });
const Canvas = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: "absolute",
      width: 960,
      height: 540,
      scale: 2,
      transformOrigin: "top left",
      fontFamily: "Arial,sans-serif",
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
      scale: 2,
      transformOrigin: "top left",
      fontFamily: "Arial,sans-serif",
    }}
  >
    {children}
  </div>
);

const BlendFix = () => (
  <style>{`img[src*="filiz_2"],img[src*="ibrahim_2"]{mix-blend-mode:multiply}`}</style>
);
const Bg = () => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(140deg,#F5FBFF,#FFF8F2)",
      overflow: "hidden",
    }}
  >
    <BlendFix />
    <i
      style={{
        position: "absolute",
        left: -190,
        top: -230,
        width: 490,
        height: 490,
        borderRadius: "50%",
        background: "#DCEFFD",
      }}
    />
    <i
      style={{
        position: "absolute",
        right: -150,
        bottom: -170,
        width: 390,
        height: 390,
        borderRadius: "50%",
        background: "#FFE2DC",
      }}
    />
    <i
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(#2b7fca20 1px,transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />
  </AbsoluteFill>
);
const Header = ({ page }: { page: number }) => (
  <>
    <div
      style={{
        position: "absolute",
        left: 30,
        top: 18,
        display: "flex",
        gap: 8,
      }}
    >
      <b
        style={{
          padding: "8px 15px",
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
          padding: "8px 15px",
          borderRadius: 18,
          background: "#7553B8",
          color: "white",
          fontSize: 14,
        }}
      >
        SOSYAL BİLGİLER
      </b>
    </div>
    <b
      style={{
        position: "absolute",
        right: 32,
        top: 25,
        color: C.coral,
        fontSize: 13,
      }}
    >
      {page}/8
    </b>
  </>
);
const Character = ({
  name,
  x,
  animate = true,
}: {
  name: "filiz" | "ibrahim";
  x: number;
  animate?: boolean;
}) => <GifCharacter name={name} x={x} y={205} scale={1} animate={animate} />;

const Icon = ({
  type,
  x,
  y,
  color = C.blue,
}: {
  type: string;
  x: number;
  y: number;
  color?: string;
}) => (
  <g
    transform={`translate(${x} ${y})`}
    stroke={C.navy}
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {type === "cloud" && (
      <>
        <path
          d="M8 53q-6-28 20-28 8-21 29-8 14-3 20 14 18 0 16 22Z"
          fill="#B9D7E9"
        />
        <path d="M24 64l-8 18m33-18-8 18m32-18-8 18" stroke={color} />
      </>
    )}
    {type === "factory" && (
      <>
        <path d="M5 82V37l27 16V36l28 16V20h26v62Z" fill="#BFD6E6" />
        <path d="M66 20V4h14v16" />
        <path d="M72 0q12-10 21 0" stroke="#879BA8" />
      </>
    )}
    {type === "tree" && (
      <>
        <path d="M45 78V48" stroke="#86563B" strokeWidth="10" />
        <circle cx="45" cy="31" r="27" fill={color} />
      </>
    )}
    {type === "house" && (
      <>
        <path d="M8 42 45 9l37 33v41H8Z" fill="#D5E8F3" />
        <path d="M35 83V57h20v26" fill={color} />
      </>
    )}
    {type === "mountain" && (
      <>
        <path d="M1 82 31 24l17 26 13-18 31 50Z" fill="#A7C894" />
        <path
          d="M20 82q24-25 55 0"
          fill="none"
          stroke={color}
          strokeWidth="9"
        />
      </>
    )}
    {type === "fire" && (
      <path
        d="M48 84C13 67 31 41 47 18c2 18 21 19 14 40 11-7 15-14 15-25 20 32 0 58-28 51Z"
        fill={color}
      />
    )}
    {type === "bag" && (
      <>
        <rect x="12" y="28" width="68" height="58" rx="12" fill={color} />
        <path d="M31 28q0-21 15-21t15 21M33 55h26M46 42v26" stroke="white" />
      </>
    )}
    {type === "flag" && (
      <>
        <path d="M18 86V8" stroke={C.navy} strokeWidth="7" />
        <path d="M22 13h67v43H22Z" fill="#E83C4F" stroke="none" />
        <circle cx="53" cy="34" r="13" fill="white" />
        <circle cx="59" cy="34" r="10" fill="#E83C4F" />
        <path d="m71 27 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z" fill="white" stroke="none" />
      </>
    )}
    {type === "book" && (
      <>
        <path d="M8 18q24-8 38 7v58Q29 72 8 79Zm76 0q-24-8-38 7v58q17-11 38-4Z" fill="#F5F8FC" />
        <path d="M46 25v58M19 35h17M56 35h17M19 47h17M56 47h17" />
      </>
    )}
    {type === "map" && (
      <>
        <path d="M8 63 26 18l20 9 19-12 20 10-9 45-24-5-18 12Z" fill="#BFE9DB" />
        <circle cx="49" cy="46" r="9" fill={color} stroke="none" />
        <path d="M49 37v-18M49 73v-18M40 46H20M78 46H58" />
      </>
    )}
    {type === "city" && (
      <>
        <rect x="7" y="34" width="25" height="50" fill="#BFD6E6" />
        <rect x="35" y="13" width="26" height="71" fill={color} />
        <rect x="64" y="28" width="24" height="56" fill="#D9E8F1" />
        {[17,45,74].map((x)=><path key={x} d={`M${x} 45v8m0 10v8`} stroke="white" />)}
      </>
    )}
    {type === "waves" && (
      <>
        <circle cx="47" cy="30" r="20" fill={C.yellow} />
        <path d="M3 58q15-13 30 0t30 0t30 0M3 76q15-13 30 0t30 0t30 0" fill="none" stroke={color} strokeWidth="8" />
      </>
    )}
  </g>
);
const MainVisual = ({ kind, compact = false }: { kind: string; compact?: boolean }) => {
  const f = useCurrentFrame();
  const s = pop(f, 8);
  const types = kind === "independence" ? ["flag","book","map"]
    : kind === "flag" ? ["flag","flag","book"]
    : kind === "anthem" ? ["book","flag","book"]
    : kind === "map" ? ["map","city","map"]
    : kind === "sea" ? ["waves","map","waves"]
    : ["city","map","city"];
  return (
    <svg viewBox="0 0 620 195" width="100%" height={compact ? 145 : 195} style={{ scale: s }}>
      <path d="M45 154H575" stroke="#C8DCE8" strokeWidth="8" />
      <path
        d="M95 154C215 70 393 70 525 154"
        fill="none"
        stroke={C.yellow}
        strokeWidth="4"
        strokeDasharray="10 9"
        strokeDashoffset={-f * 0.5}
      />
      {types.map((t, i) => (
        <g
          key={t + i}
          style={{
            transformOrigin: `${145 + i * 165}px 110px`,
            translate: `0 ${Math.sin(f / 14 + i) * 3}px`,
          }}
        >
          <circle
            cx={145 + i * 165}
            cy="108"
            r="58"
            fill={i === 1 ? "#FFF1DC" : "#E8F7F4"}
            stroke={i === 1 ? C.yellow : C.mint}
            strokeWidth="3"
          />
          <Icon
            type={t}
            x={101 + i * 165}
            y={64}
            color={[C.coral, C.blue, C.mint][i]}
          />
        </g>
      ))}
    </svg>
  );
};
const MainScene = ({ index }: { index: number }) => {
  const s = data.main[index];
  const f = useCurrentFrame();
  const final = index === 7;
  const left = s.speaker === "filiz";
  const notes = ((s as any).notes ?? []) as {label: string; text: string}[];
  const noteEntrance = index === 1
    ? interpolate(f, [145, 160], [0, 1], clamp)
    : interpolate(f, [12, 24], [0, 1], clamp);
  const cardLeft = final ? 184 : left ? 205 : 38;
  const width = final ? 600 : 715;
  return (
    <AbsoluteFill>
      <Bg />
      <Canvas>
        <Header page={index + 1} />
        <section
          style={{
            position: "absolute",
            left: cardLeft,
            top: 62,
            width,
            height: 435,
            borderRadius: 26,
            background: "#FFFFFFF2",
            border: "1px solid #CEE2F1",
            boxShadow: "0 14px 38px #173B6628",
            padding: "26px 30px",
            boxSizing: "border-box",
            opacity: interpolate(f, [0, 10], [0, 1], clamp),
            translate: `0 ${interpolate(f, [0, 14], [14, 0], clamp)}px`,
          }}
        >
          <b style={{ fontSize: 13, letterSpacing: 1.5, color: C.coral }}>
            ÜLKEMİZE KOMŞU DEVLETLER
          </b>
          <h1
            style={{
              fontSize: 30,
              lineHeight: 1.06,
              color: C.navy,
              margin: "5px 0",
            }}
          >
            {s.title}
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.25,
              color: C.ink,
              fontWeight: 700,
              margin: "6px 0 10px",
            }}
          >
            {s.lead}
          </p>
          <MainVisual kind={s.kind} compact={notes.length > 0} />
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}
          >
            {s.points.map((p, i) => (
              <div
                key={p}
                style={{
                  padding: "9px 11px",
                  borderRadius: 11,
                  background: i ? "#FFF2E8" : "#E8F7F4",
                  borderLeft: `5px solid ${i ? C.coral : C.mint}`,
                  fontSize: 12.5,
                  fontWeight: 800,
                  color: C.ink,
                }}
              >
                {p}
              </div>
            ))}
          </div>
          {notes.length > 0 && (
            <div
              style={{
                position: "absolute",
                left: 30,
                right: 30,
                bottom: 10,
                display: "grid",
                gap: 4,
                opacity: noteEntrance,
                translate: `0 ${interpolate(noteEntrance, [0, 1], [8, 0], clamp)}px`,
              }}
            >
              {notes.map((note, noteIndex) => (
                <div
                  key={`${note.label}-${noteIndex}`}
                  style={{
                    padding: notes.length > 2 ? "5px 9px" : "7px 10px",
                    borderRadius: 9,
                    background: note.label === "NOT" ? "#FFF1D6" : "#EAF8F4",
                    border: `2px solid ${note.label === "NOT" ? "#E7B43D" : C.mint}`,
                    fontSize: notes.length > 2 ? 9.4 : 10.3,
                    lineHeight: 1.16,
                    fontWeight: 900,
                    color: C.ink,
                  }}
                >
                  <span style={{ color: note.label === "NOT" ? C.coral : C.mint }}>
                    {note.label} •{" "}
                  </span>
                  {note.text}
                </div>
              ))}
            </div>
          )}
        </section>
        {final ? (
          <>
            <Character name="filiz" x={92} />
            <Character name="ibrahim" x={852} animate={false} />
          </>
        ) : (
          <Character
            name={s.speaker as "filiz" | "ibrahim"}
            x={left ? 108 : 850}
          />
        )}
      </Canvas>
      <Audio
        src={staticFile(
          `audio/sosyal/komsularimiz/main/${s.id}.mp3`,
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
        <MainScene index={i} />
      </Sequence>
    ))}
    <Sequence from={870} durationInFrames={180}>
      <Channel />
    </Sequence>
    <Sequence from={start("main", timings.main.length)} durationInFrames={210}>
      <Canvas>
        <CtaOptionOne />
      </Canvas>
    </Sequence>
  </AbsoluteFill>
);

const Lumi = ({ i, frames }: { i: number; frames: number }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [12, Math.max(42, frames - 22)], [0, 1], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const routes = [
    [
      [50, 440],
      [155, 440],
    ],
    [
      [850, 430],
      [745, 430],
    ],
    [
      [45, 185],
      [45, 320],
    ],
    [
      [880, 160],
      [880, 300],
    ],
    [
      [55, 430],
      [165, 430],
    ],
    [
      [860, 425],
      [750, 425],
    ],
  ] as const;
  const [a, b] = routes[i];
  return (
    <div
      style={{
        position: "absolute",
        left: interpolate(p, [0, 1], [a[0], b[0]]),
        top: interpolate(p, [0, 1], [a[1], b[1]]),
        width: 64,
        height: 64,
        zIndex: 20,
        translate: `0 ${Math.sin(f / 10) * 2}px`,
      }}
    >
      <svg viewBox="0 0 64 64">
        <circle
          cx="32"
          cy="32"
          r="27"
          fill="#46CBD1"
          stroke="#E2FFFB"
          strokeWidth="4"
        />
        <circle cx="23" cy="30" r="4" fill="#09263B" />
        <circle cx="41" cy="30" r="4" fill="#09263B" />
        <path
          d="M23 43q9 8 18 0"
          fill="none"
          stroke="#09263B"
          strokeWidth="4"
        />
        <path d="M32 4V-5" stroke="#79F2E3" strokeWidth="4" />
        <circle cx="32" cy="-8" r="5" fill={C.yellow} />
      </svg>
    </div>
  );
};
const KurzGraphic = ({ i }: { i: number }) => {
  const f = useCurrentFrame(),
    ease = pop(f, 8);
  if (i === 0)
    return (
      <svg viewBox="0 0 720 300" width="720" height="300">
        <path
          d="M85 152C190 35 302 252 402 128S585 55 650 151"
          fill="none"
          stroke="#50D8CB"
          strokeWidth="6"
        />
        {["BAYRAK", "MARŞ", "ÖZGÜRLÜK", "EGEMENLİK"].map((t, j) => {
          const x = [90, 265, 455, 635][j],
            y = [150, 91, 190, 150][j];
          return (
            <g
              key={t}
              style={{
                transformOrigin: `${x}px ${y}px`,
                scale: pop(f, 8 + j * 6),
              }}
            >
              <circle
                cx={x}
                cy={y}
                r="47"
                fill={["#29496B", "#154D65", "#60462F", "#185245"][j]}
                stroke={[C.blue, "#62CDE8", C.yellow, C.mint][j]}
                strokeWidth="4"
              />
              <text
                x={x}
                y={y + 6}
                textAnchor="middle"
                fill="white"
                fontSize="15"
                fontWeight="900"
              >
                {t}
              </text>
            </g>
          );
        })}
        {Array.from({ length: 7 }).map((_, j) => (
          <circle
            key={j}
            cx={90 + ((f * 3 + j * 82) % 550)}
            cy={150 + 32 * Math.sin((f + j * 18) / 15)}
            r="6"
            fill={j % 2 ? C.yellow : "#7CF1DF"}
          />
        ))}
      </svg>
    );
  if (i === 1)
    return (
      <svg viewBox="0 0 720 300" width="720" height="300">
        <defs>
          {[
            ["mintArrow", C.mint],
            ["yellowArrow", C.yellow],
            ["coralArrow", C.coral],
          ].map(([id, color]) => (
            <marker
              key={id}
              id={id}
              markerWidth="26"
              markerHeight="26"
              refX="23"
              refY="13"
              markerUnits="userSpaceOnUse"
              orient="auto"
            >
              <path d="M0 1L25 13L0 25Z" fill={color} />
            </marker>
          ))}
        </defs>
        <g style={{ transformOrigin: "360px 150px", rotate: `${f * 0.35}deg` }}>
          <path
            d="M360 31A119 119 0 0 1 463 210"
            fill="none"
            stroke={C.mint}
            strokeWidth="18"
            markerEnd="url(#mintArrow)"
          />
          <path
            d="M463 210A119 119 0 0 1 257 210"
            fill="none"
            stroke={C.yellow}
            strokeWidth="18"
            markerEnd="url(#yellowArrow)"
          />
          <path
            d="M257 210A119 119 0 0 1 360 31"
            fill="none"
            stroke={C.coral}
            strokeWidth="18"
            markerEnd="url(#coralArrow)"
          />
        </g>
        {[
          ["ANADOLU • ASYA", 360, 60],
          ["TRAKYA • AVRUPA", 270, 225],
          ["KITALAR ARASI KÖPRÜ", 455, 225],
        ].map(([t, x, y], j) => (
          <g
            key={t as string}
            style={{
              scale: pop(f, 12 + j * 7),
              transformOrigin: `${x}px ${y}px`,
            }}
          >
            <rect
              x={(x as number) - 76}
              y={(y as number) - 19}
              width="152"
              height="38"
              rx="19"
              fill="#09263B"
            />
            <text
              x={x as number}
              y={(y as number) + 6}
              textAnchor="middle"
              fill="white"
              fontSize="13"
              fontWeight="900"
            >
              {t}
            </text>
          </g>
        ))}
      </svg>
    );
  if (i === 2) {
    const route = interpolate(f, [10, 75], [760, 0], clamp);
    const pulse = 1 + Math.sin(f / 8) * 0.05;
    return (
      <svg viewBox="0 0 720 300" width="720" height="300">
        <path d="M120 220Q245 54 365 78T610 218Q365 262 120 220Z" fill="#09263B" stroke="#284F68" strokeWidth="3" />
        <path d="M145 206Q260 58 365 84T580 205Q370 246 145 206" fill="none" stroke="#78E4D6" strokeWidth="8" strokeLinecap="round" strokeDasharray="760" strokeDashoffset={route} />
        <path d="M145 206Q260 58 365 84T580 205" fill="none" stroke="#FFFFFF44" strokeWidth="2" strokeDasharray="7 10" strokeDashoffset={-f} />
        {[
          ["SOFYA",145,206,C.coral],
          ["TİFLİS",365,84,C.yellow],
          ["BAĞDAT",580,205,C.mint],
        ].map(([label,x,y,color],j)=><g key={label as string} style={{transformOrigin:`${x}px ${y}px`,scale:j === Math.floor(f/32)%3 ? pulse : 1}}>
          <circle cx={x as number} cy={y as number} r="31" fill="#102E50" stroke={color as string} strokeWidth="7" />
          <circle cx={x as number} cy={y as number} r="8" fill={color as string} />
          <rect x={(x as number)-57} y={(y as number)+(j===1?-66:42)} width="114" height="32" rx="16" fill="#0A2A40" stroke={color as string} strokeWidth="2" />
          <text x={x as number} y={(y as number)+(j===1?-44:64)} textAnchor="middle" fill="white" fontSize="16" fontWeight="900">{label}</text>
        </g>)}
        <circle cx={145 + ((f * 5) % 430)} cy={206 - Math.sin(((f * 5) % 430) / 430 * Math.PI) * 122} r="7" fill="white" />
      </svg>
    );
  }
  if (i === 3)
    return (
      <svg viewBox="0 0 720 300" width="720" height="300">
        <rect x="55" y="89" width="235" height="132" rx="42" fill="#1D6070" stroke="#75E0D2" strokeWidth="5" />
        <path d="M92 128q42-34 83-2t76-5v62q-42 31-83 0t-76 4Z" fill="#2F8D81" />
        <rect x="386" y="111" width="116" height="88" rx="30" fill="#8E5D58" stroke={C.coral} strokeWidth="5" />
        <rect x="582" y="65" width="105" height="178" rx="34" fill="#4B3B65" stroke="#B89BE8" strokeWidth="5" />
        <path d="M290 155H386" stroke={C.yellow} strokeWidth="12" strokeLinecap="round" />
        <path d="M322 129v52M354 129v52" stroke="#EAF7FA" strokeWidth="7" />
        <circle cx={300 + ((f * 3.2) % 77)} cy="155" r="9" fill="white" stroke={C.coral} strokeWidth="4" />
        {[
          ["TÜRKİYE",173,246,"#75E0D2"],
          ["NAHÇIVAN",444,236,C.coral],
          ["AZERBAYCAN",634,270,"#B89BE8"],
        ].map(([label,x,y,color])=><g key={label as string}>
          <text x={x as number} y={y as number} textAnchor="middle" fill={color as string} fontSize="17" fontWeight="900">{label}</text>
        </g>)}
        <g style={{transformOrigin:"338px 155px",scale:1+Math.sin(f/8)*.04}}>
          <rect x="300" y="99" width="76" height="28" rx="14" fill="#0A2A40" stroke={C.yellow} strokeWidth="2" />
          <text x="338" y="119" textAnchor="middle" fill="white" fontSize="13" fontWeight="900">DİLUCU</text>
        </g>
      </svg>
    );
  if (i === 4)
    return (
      <svg viewBox="0 0 720 300" width="720" height="300">
        {[0,1,2].map((j)=><ellipse key={j} cx="345" cy="154" rx={115+j*72} ry={58+j*29} fill="none" stroke={[C.yellow,C.mint,"#56C8EC"][j]} strokeWidth="9" strokeDasharray={`${18+j*5} 13`} strokeDashoffset={-(f*(j+1))} opacity={.95-j*.12} />)}
        <path d="M272 125q74-52 147 0l-16 69q-57 35-116 0Z" fill="#243D5C" stroke="#EAF7FA" strokeWidth="4" />
        <text x="345" y="166" textAnchor="middle" fill="white" fontSize="24" fontWeight="900">TÜRKİYE</text>
        {[
          ["EGE",122,159,C.yellow],
          ["AKDENİZ",345,280,C.mint],
          ["KARADENİZ",570,92,"#56C8EC"],
        ].map(([label,x,y,color])=><g key={label as string}>
          <rect x={(x as number)-60} y={(y as number)-19} width="120" height="38" rx="19" fill="#0A2A40" stroke={color as string} strokeWidth="3" />
          <text x={x as number} y={(y as number)+6} textAnchor="middle" fill="white" fontSize="15" fontWeight="900">{label}</text>
        </g>)}
        {Array.from({length:9}).map((_,j)=><circle key={j} cx={84+((f*2+j*71)%550)} cy={35+Math.sin((f+j*13)/11)*11} r="4" fill={j%2?C.yellow:C.mint} />)}
      </svg>
    );
  return (
    <svg viewBox="0 0 720 300" width="720" height="300">
      <rect
        x="285"
        y="77"
        width="150"
        height="170"
        rx="25"
        fill="#ED536C"
        stroke="#FFD9DF"
        strokeWidth="5"
      />
      <path
        d="M322 77q0-48 38-48t38 48M325 150h70M360 115v70"
        fill="none"
        stroke="white"
        strokeWidth="10"
        strokeLinecap="round"
      />
      {[
        ["PLAN", 105, 65],
        ["İLETİŞİM", 600, 65],
        ["BULUŞMA", 105, 235],
        ["DAYANIŞMA", 600, 235],
      ].map(([t, x, y], j) => (
        <g
          key={t as string}
          style={{ transformOrigin: `${x}px ${y}px`, scale: pop(f, 8 + j * 6) }}
        >
          <circle
            cx={x as number}
            cy={y as number}
            r="51"
            fill="#133A50"
            stroke={[C.blue, C.mint, C.yellow, C.coral][j]}
            strokeWidth="4"
          />
          <text
            x={x as number}
            y={(y as number) + 5}
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="900"
          >
            {t}
          </text>
          <path
            d={`M${(x as number) + ((x as number) < 360 ? 51 : -51)} ${y}L${(x as number) < 360 ? 285 : 435} ${150 + (j > 1 ? 55 : -55)}`}
            stroke="#75DCCF"
            strokeWidth="3"
            strokeDasharray="8 7"
          />
        </g>
      ))}
    </svg>
  );
};
const KurzScene = ({ index }: { index: number }) => {
  const s = data.kurz[index];
  const f = useCurrentFrame();
  const globalFrame = start("kurz", index) + f;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${20 + index * 12}% ${20 + (index % 2) * 55}%,#174F61,#071622 68%)`,
        overflow: "hidden",
      }}
    >
      <Canvas>
        <b
          style={{
            position: "absolute",
            left: 42,
            top: 28,
            color: "#77EBDD",
            fontSize: 12,
            letterSpacing: 2.5,
          }}
        >
          LUMİ LAB • KOMŞULUK AĞI
        </b>
        <b
          style={{
            position: "absolute",
            right: 42,
            top: 28,
            color: "#7894A5",
            fontSize: 11,
          }}
        >
          {index + 1}/5
        </b>
        <div
          style={{
            position: "absolute",
            left: 130,
            top: 60,
            width: 700,
            textAlign: "center",
            opacity: interpolate(f, [0, 12], [0, 1], clamp),
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 900, color: "white" }}>
            {s.title}
          </div>
          <div style={{ fontSize: 16, color: "#BED6E2", marginTop: 7 }}>
            {s.lead}
          </div>
        </div>
        <div style={{ position: "absolute", left: 120, top: 153 }}>
          <KurzGraphic i={index} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 210,
            top: 475,
            width: 540,
            display: "flex",
            justifyContent: "center",
            gap: 14,
            opacity: globalFrame >= 900 && globalFrame < 1050 ? 0 : 1,
          }}
        >
          {s.facts.map((x) => (
            <b
              key={x}
              style={{
                padding: "8px 14px",
                borderRadius: 16,
                background: "#0A2234",
                border: `1px solid ${C.mint}`,
                color: "#EAFDFC",
                fontSize: 11,
              }}
            >
              {x}
            </b>
          ))}
        </div>
        <Lumi i={index} frames={timings.kurz[index].frames} />
      </Canvas>
      <Audio
        src={staticFile(
          `audio/sosyal/komsularimiz/kurz/${s.id}.mp3`,
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
        <KurzScene index={i} />
      </Sequence>
    ))}
    <Sequence from={870} durationInFrames={180}>
      <Channel />
    </Sequence>
  </AbsoluteFill>
);

const ShortBg = () => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(155deg,#EAF7FF,#FCFCFD 58%,#FFF0EC)",
      overflow: "hidden",
    }}
  >
    <BlendFix />
    <i
      style={{
        position: "absolute",
        left: -180,
        top: 230,
        width: 420,
        height: 420,
        borderRadius: "50%",
        background: "#DCECF7AA",
      }}
    />
    <i
      style={{
        position: "absolute",
        right: -170,
        top: 20,
        width: 360,
        height: 360,
        borderRadius: "50%",
        background: "#E8DFF4AA",
      }}
    />
    <i
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(#2b7fca20 1px,transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    />
  </AbsoluteFill>
);
const ShortArt = ({ i }: { i: number }) => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 490 180" width="490" height="180">
      {i === 0 && (
        <>
          {[82, 245, 408].map((x, n) => (
            <g key={x}>
              <rect
                x={x - 66}
                y="12"
                width="132"
                height="154"
                rx="18"
                fill="#FFFFFFE8"
                stroke="#C8DCE9"
                strokeWidth="3"
              />
              <circle cx={x - 45} cy="34" r="15" fill={C.navy} />
              <text
                x={x - 45}
                y="40"
                textAnchor="middle"
                fill="white"
                fontSize="15"
                fontWeight="900"
              >
                {n + 1}
              </text>
            </g>
          ))}
          <g transform="translate(43 58) scale(.78)">
            <Icon type="map" x={0} y={0} />
          </g>
          <g>
            <circle cx="245" cy="100" r="48" fill="#E7F4FB" stroke={C.blue} strokeWidth="5" />
            <path d="M245 48v104M193 100h104" stroke={C.navy} strokeWidth="4" />
            <path d="m245 56 10 22-10-5-10 5Z" fill={C.coral} />
            {[0, 1, 2, 3].map((n) => (
              <circle
                key={n}
                cx={214 + n * 20}
                cy={100 + Math.sin((f+n*12)/10)*25}
                r="6"
                fill={C.coral}
              />
            ))}
          </g>
          <g>
            <g transform="translate(365 55)"><Icon type="city" x={0} y={0} color={C.mint} /></g>
          </g>
        </>
      )}
      {i === 1 && (
        <>
          <path d="M24 60q68-39 151-4v82q-78 38-151 1Z" fill="#A9DED2" stroke={C.navy} strokeWidth="4" />
          <path d="M332 58q57-28 128 2v74q-57 33-128 2Z" fill="#D9C8F3" stroke={C.navy} strokeWidth="4" />
          <rect x="255" y="72" width="58" height="72" rx="19" fill="#FFD7DB" stroke={C.coral} strokeWidth="4" />
          <path d="M175 100H255M313 100h19" stroke={C.yellow} strokeWidth="8" strokeLinecap="round" strokeDasharray="10 8" strokeDashoffset={-f} />
          <path d="M218 76v49M237 76v49" stroke={C.navy} strokeWidth="5" />
          <circle cx={178+((f*3)%135)} cy="100" r="8" fill="white" stroke={C.blue} strokeWidth="4" />
          {[72,118,378,424].map((x,n)=><g key={x} style={{transformOrigin:`${x}px 96px`,scale:1+Math.sin(f/10+n)*.04}}>
            <circle cx={x} cy={96} r="24" fill="#FFFFFFDD" stroke={[C.blue,C.mint,C.coral,C.yellow][n]} strokeWidth="4" />
            <path d={`M${x} 83v26M${x-13} 96h26`} stroke={C.navy} strokeWidth="4" strokeLinecap="round" />
          </g>)}
        </>
      )}
      {i === 2 && (
        <>
          <path
            d="M30 145 190 35l270 110Z"
            fill="#A87955"
            stroke={C.navy}
            strokeWidth="4"
          />
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <path
              key={n}
              d={`M${80 + n * 65} ${10 + ((f * 2 + n * 17) % 48)}l-10 20`}
              stroke={C.blue}
              strokeWidth="5"
              strokeLinecap="round"
            />
          ))}
          <path
            d="M75 119 190 42 405 128"
            fill="none"
            stroke="#55BDE2"
            strokeWidth="7"
            strokeDasharray="12 8"
            strokeDashoffset={-f}
          />
          {[0, 1, 2, 3, 4].map((n) => (
            <circle
              key={n}
              cx={145 + n * 42 + (f % 34)}
              cy={91 + n * 8 + (f % 12)}
              r="6"
              fill="#65432F"
            />
          ))}
        </>
      )}
    </svg>
  );
};
const Choice = ({
  text,
  label,
  on,
}: {
  text: string;
  label: string;
  on: boolean;
}) => (
  <div
    style={{
      height: 55,
      borderRadius: 12,
      background: on ? "#DDF7EE" : "#FFF",
      border: `2px solid ${on ? C.mint : "#EBA3AF"}`,
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "0 11px",
      boxSizing: "border-box",
      boxShadow: "0 4px 10px #173B6614",
    }}
  >
    <b
      style={{
        width: 31,
        height: 31,
        borderRadius: 8,
        background: on ? C.mint : C.coral,
        color: "white",
        display: "grid",
        placeItems: "center",
        flex: "0 0 auto",
      }}
    >
      {label}
    </b>
    <b style={{ fontSize: 12.4, lineHeight: 1.12, color: C.navy }}>{text}</b>
    {on && <b style={{ marginLeft: "auto", fontSize: 25, color: C.mint }}>✓</b>}
  </div>
);
const Short = ({ index }: { index: number }) => {
  const item = data.shorts[index],
    t = timings.shorts[index],
    f = useCurrentFrame();
  const show = f >= t.qEnd,
    reveal = f >= t.reveal,
    count = Math.max(1, 5 - Math.floor((f - t.qEnd) / 30));
  return (
    <AbsoluteFill>
      <ShortBg />
      <VCanvas>
        <div
          style={{
            position: "absolute",
            left: 17,
            top: 13,
            display: "flex",
            gap: 7,
            alignItems: "center",
          }}
        >
          <b
            style={{
              padding: "8px 13px",
              borderRadius: 16,
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
              borderRadius: 16,
              background: "#7553B8",
              color: "white",
              fontSize: 13,
            }}
          >
            SOSYAL BİLGİLER
          </b>
          <i style={{ width: 180, height: 2, background: "#BED6E8" }} />
        </div>
        <section
          style={{
            position: "absolute",
            left: 16,
            top: 55,
            width: 508,
            height: 204,
            borderRadius: 22,
            background: "#FFFFFFF5",
            boxShadow: "0 10px 24px #173B6620",
            border: "1px solid #D2E3EF",
            padding: "18px 20px 15px 70px",
            boxSizing: "border-box",
          }}
        >
          <b
            style={{
              position: "absolute",
              left: 18,
              top: 22,
              width: 43,
              height: 43,
              borderRadius: 13,
              background: C.yellow,
              color: C.navy,
              fontSize: 29,
              display: "grid",
              placeItems: "center",
            }}
          >
            ?
          </b>
          <b style={{ fontSize: 11, letterSpacing: 0.8, color: "#7553B8" }}>
            HIZLI SORU • {item.topic}
          </b>
          <div
            style={{
              fontSize: 17.5,
              lineHeight: 1.17,
              fontWeight: 900,
              color: C.ink,
              marginTop: 7,
            }}
          >
            {item.question}
          </div>
          <b
            style={{
              position: "absolute",
              left: 70,
              bottom: 14,
              padding: "6px 10px",
              borderRadius: 8,
              background: "#EAF4FA",
              fontSize: 9.5,
              color: C.navy,
            }}
          >
            {item.strip}
          </b>
        </section>
        <div
          style={{
            position: "absolute",
            left: 25,
            top: 275,
            width: 490,
            height: 180,
          }}
        >
          <ShortArt i={index} />
        </div>
        {show && (
          <div
            style={{
              position: "absolute",
              left: 18,
              top: 475,
              width: 350,
              display: "grid",
              gap: 7,
            }}
          >
            {item.choices.map((x, i) => (
              <Choice
                key={x}
                text={x}
                label={String.fromCharCode(65 + i)}
                on={reveal && i === item.correct}
              />
            ))}
          </div>
        )}
        <GifCharacter name="ibrahim" x={460} y={478} scale={1.03} animate />
        {!show && (
          <div style={{position:"absolute",left:28,top:792,width:484,height:118,borderRadius:22,background:"#FFFFFFD9",border:"2px solid #D7E8F3",boxShadow:"0 10px 24px #173B6618",display:"flex",alignItems:"center",justifyContent:"center",gap:14,color:C.navy,fontSize:17,fontWeight:900}}>
            <span style={{display:"flex",gap:7}}>{[0,1,2].map((n)=><i key={n} style={{width:12,height:12,borderRadius:"50%",background:[C.blue,C.yellow,C.coral][n],transform:`translateY(${Math.sin((f+n*7)/8)*4}px)`}}/>)}</span>
            Soruyu dikkatle incele
          </div>
        )}
        {reveal && f < t.congrats && (
          <div style={{position:"absolute",left:28,top:792,width:484,height:118,borderRadius:22,background:"#E8F8F3",border:`2px solid ${C.mint}`,boxShadow:"0 10px 24px #173B6618",display:"flex",alignItems:"center",justifyContent:"center",gap:14,color:C.navy,fontSize:17,fontWeight:900}}>
            <span style={{fontSize:31,color:C.mint}}>✓</span>
            Doğru seçeneği incele
          </div>
        )}
        {show && !reveal && (
          <div
            style={{
              position: "absolute",
              left: 210,
              top: 758,
              width: 92,
              height: 92,
              borderRadius: "50%",
              background: "white",
              border: `8px solid ${C.blue}`,
              display: "grid",
              placeItems: "center",
              boxShadow: "0 8px 20px #173B6630",
            }}
          >
            <b
              style={{
                fontSize: 34,
                color: C.navy,
                textAlign: "center",
                lineHeight: 0.8,
              }}
            >
              {count}
              <small
                style={{
                  display: "block",
                  fontSize: 10,
                  color: C.coral,
                  marginTop: 9,
                }}
              >
                DÜŞÜN!
              </small>
            </b>
          </div>
        )}
        {f >= t.congrats && (
          <div
            style={{
              position: "absolute",
              left: 26,
              top: 852,
              width: 488,
              height: 78,
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
        <Audio
          src={staticFile(
            `audio/sosyal/komsularimiz/shorts/${index + 1}/question.mp3`,
          )}
        />
        {reveal && (
          <Sequence from={t.reveal}>
            <Audio
              src={staticFile(
                `audio/sosyal/komsularimiz/shorts/${index + 1}/answer.mp3`,
              )}
            />
          </Sequence>
        )}
      </VCanvas>
    </AbsoluteFill>
  );
};
export const Short1 = () => <Short index={0} />;
export const Short2 = () => <Short index={1} />;
