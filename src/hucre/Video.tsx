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
import data from "../../content/hucre.json";
import timings from "./timings.json";
import { GifCharacter } from "../GifCharacter";
import { CtaOptionOne } from "../previews/cta-option-1/CtaOptionOne";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";

const navy = "#183B66",
  blue = "#2878C8",
  coral = "#E65068",
  mint = "#25A98E",
  yellow = "#FFD166",
  clamp = {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
  };
const pop = (f: number, d = 0) =>
  spring({
    frame: f - d,
    fps: 30,
    config: { damping: 18, stiffness: 110, mass: 0.8 },
  });
const start = (g: "main" | "kurz", i: number) =>
  timings[g].slice(0, i).reduce((s, t) => s + t.frames, 0);
export const mainDuration = () => start("main", timings.main.length) + 210;
export const kurzDuration = () => start("kurz", timings.kurz.length);
const SafeChannelCard = () => (
  <div
    style={{
      position: "absolute",
      left: 500,
      top: -140,
      width: 960,
      height: 540,
      transform: "scale(.52)",
      transformOrigin: "top left",
      zIndex: 80,
      overflow: "visible",
    }}
  >
    <ChannelLowerThird />
  </div>
);
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
      left: x - 47,
      top: y,
      width: 94,
      height: 28,
      borderRadius: 10,
      background: "#D94F66",
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
    <i style={{ width: 8, height: 8, borderRadius: 9, background: "white" }} />
    {name}
  </div>
);

const AngleSvg = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame(),
    a = interpolate(f, [8, 45], [0, 1], clamp),
    pulse = 1 + 0.025 * Math.sin(f / 9);
  const ray = (deg: number, color = blue, len = 150) => {
    const r = (deg * Math.PI) / 180;
    return (
      <line
        x1="260"
        y1="170"
        x2={260 + len * Math.cos(r)}
        y2={170 - len * Math.sin(r)}
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
      />
    );
  };
  if (kind === "types")
    return (
      <svg viewBox="0 0 640 240" width="100%" height="190">
        {[
          [45, "DAR"],
          [90, "DİK"],
          [130, "GENİŞ"],
          [180, "DOĞRU"],
          [360, "TAM"],
        ].map(([d, n], i) => (
          <g key={n} transform={`translate(${52 + i * 134} 125) scale(.39)`}>
            <line
              x1="0"
              y1="0"
              x2="200"
              y2="0"
              stroke={navy}
              strokeWidth="12"
            />
            <line
              x1="0"
              y1="0"
              x2={200 * Math.cos((Number(d) * Math.PI) / 180)}
              y2={-200 * Math.sin((Number(d) * Math.PI) / 180)}
              stroke={i % 2 ? coral : blue}
              strokeWidth="12"
            />
            {Number(d) === 360 ? (
              <circle
                cx="0"
                cy="0"
                r="55"
                fill="none"
                stroke={yellow}
                strokeWidth="10"
                strokeDasharray="18 7"
              />
            ) : (
              <path
                d={`M55 0 A55 55 0 0 0 ${55 * Math.cos((Number(d) * Math.PI) / 180)} ${-55 * Math.sin((Number(d) * Math.PI) / 180)}`}
                fill="none"
                stroke={yellow}
                strokeWidth="10"
              />
            )}
            <text
              x="0"
              y="75"
              textAnchor="middle"
              fontSize="34"
              fontWeight="900"
              fill={navy}
            >
              {n}
            </text>
          </g>
        ))}
      </svg>
    );
  if (kind === "supplementary")
    return (
      <svg viewBox="0 0 640 240" width="100%" height="190">
        <line
          x1="90"
          y1="170"
          x2="550"
          y2="170"
          stroke={navy}
          strokeWidth="9"
        />
        <line
          x1="320"
          y1="170"
          x2="269"
          y2="29"
          stroke={coral}
          strokeWidth="9"
        />
        <path
          d="M235 170A85 85 0 0 1 291 90"
          fill="none"
          stroke={mint}
          strokeWidth="13"
        />
        <path
          d="M291 90A85 85 0 0 1 405 170"
          fill="none"
          stroke={yellow}
          strokeWidth="13"
        />
        <text x="205" y="125" fill={mint} fontSize="27" fontWeight="900">
          70°
        </text>
        <text x="395" y="112" fill="#D59514" fontSize="27" fontWeight="900">
          110°
        </text>
        <text
          x="320"
          y="225"
          textAnchor="middle"
          fill={navy}
          fontSize="26"
          fontWeight="900"
        >
          70° + 110° = 180°
        </text>
      </svg>
    );
  if (kind === "complementary")
    return (
      <svg viewBox="0 0 640 240" width="100%" height="190">
        <line
          x1="190"
          y1="185"
          x2="510"
          y2="185"
          stroke={navy}
          strokeWidth="9"
        />
        <line
          x1="190"
          y1="185"
          x2="190"
          y2="25"
          stroke={navy}
          strokeWidth="9"
        />
        <line
          x1="190"
          y1="185"
          x2="335"
          y2="82"
          stroke={coral}
          strokeWidth="9"
        />
        <rect
          x="190"
          y="145"
          width="40"
          height="40"
          fill="none"
          stroke={mint}
          strokeWidth="6"
        />
        <text x="245" y="115" fill={coral} fontSize="27" fontWeight="900">
          35°
        </text>
        <text x="350" y="155" fill={blue} fontSize="27" fontWeight="900">
          55°
        </text>
        <text
          x="350"
          y="225"
          textAnchor="middle"
          fill={navy}
          fontSize="26"
          fontWeight="900"
        >
          35° + 55° = 90°
        </text>
      </svg>
    );
  const deg =
    kind === "measure"
      ? interpolate(f, [0, 90], [28, 145], { ...clamp })
      : kind === "adjacent"
        ? 125
        : 68;
  return (
    <svg viewBox="0 0 640 240" width="100%" height="190">
      <g
        style={{ transform: `scale(${pulse})`, transformOrigin: "260px 170px" }}
      >
        {ray(0, navy, 220)}
        {ray(deg, coral, 180)}
        {kind === "adjacent" && ray(55, mint, 195)}
        <path
          d={`M${260 + 55 * a} 170 A55 55 0 0 0 ${260 + 55 * Math.cos((deg * Math.PI) / 180) * a} ${170 - 55 * Math.sin((deg * Math.PI) / 180) * a}`}
          fill="none"
          stroke={yellow}
          strokeWidth="11"
        />
        <circle cx="260" cy="170" r="10" fill={navy} />
        <text x="242" y="198" fill={navy} fontSize="25" fontWeight="900">
          {kind === "naming" ? "B" : "O"}
        </text>
        {kind === "naming" && (
          <>
            <text x="464" y="198" fill={navy} fontSize="24" fontWeight="900">
              C
            </text>
            <text x="304" y="41" fill={navy} fontSize="24" fontWeight="900">
              A
            </text>
            <rect
              x="360"
              y="62"
              width="275"
              height="54"
              rx="14"
              fill="#EAF4FF"
              stroke={blue}
              strokeWidth="3"
            />
            <text
              x="497"
              y="96"
              textAnchor="middle"
              fill={blue}
              fontSize="20"
              fontWeight="900"
            >
              s(∠ABC) / m(∠ABC) = 68°
            </text>
          </>
        )}
        {kind === "adjacent" && (
          <>
            <text x="142" y="30" fill={navy} fontSize="24" fontWeight="900">
              A
            </text>
            <text x="376" y="25" fill={navy} fontSize="24" fontWeight="900">
              B
            </text>
            <text x="490" y="180" fill={navy} fontSize="24" fontWeight="900">
              C
            </text>
            <text x="376" y="102" fill={mint} fontSize="22" fontWeight="900">
              ORTAK KENAR
            </text>
            <text x="345" y="210" fill={navy} fontSize="23" fontWeight="900">
              AOB + BOC
            </text>
          </>
        )}
      </g>
    </svg>
  );
};

const CellSvg = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 14) * 3;
  const plant = ["compare", "plant", "vacuole"].includes(kind);
  const organelles = [
    [185, 116, 22, coral],
    [245, 158, 16, yellow],
    [300, 92, 20, mint],
    [350, 154, 13, blue],
    [386, 108, 17, "#9C7AEA"],
  ];
  if (kind === "microscope" || kind === "microscopeParts")
    return (
      <svg viewBox="0 0 640 190" width="100%" height="190">
        <g
          transform={`translate(${drift} 0)`}
          stroke={navy}
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M250 35h62l-14 42h-50z" fill="#91D7F2" />
          <path d="M278 76q-24 72 40 75h80" />
          <path d="M218 151h260M350 74v43h92" />
          <circle cx="442" cy="117" r="30" fill="#FFF" />
          <path d="M410 151l32-34" />
          <path d="M245 35l18-25h45" stroke={mint} />
        </g>
        {kind === "microscopeParts" && (
          <g
            fill={coral}
            fontSize="16"
            fontWeight="900"
            stroke={coral}
            strokeWidth="2"
          >
            <path d="M145 28H235" />
            <text x="62" y="33" stroke="none">
              MERCEK
            </text>
            <path d="M158 91H245" />
            <text x="78" y="96" stroke="none">
              ODAK
            </text>
            <path d="M448 113H535" />
            <text x="542" y="119" stroke="none">
              TABLA
            </text>
            <path d="M410 165H495" />
            <text x="502" y="171" stroke="none">
              IŞIK
            </text>
          </g>
        )}
      </svg>
    );
  if (["energy", "package", "division", "summary"].includes(kind))
    return (
      <svg viewBox="0 0 640 190" width="100%" height="190">
        <path
          d="M85 98C85 35 155 22 225 50C300 12 390 36 406 96C425 158 338 178 270 150C190 182 85 158 85 98Z"
          fill="#CDEFF5"
          stroke={blue}
          strokeWidth="7"
        />
        {organelles.map(([x, y, r, c], i) => (
          <g key={i} transform={`translate(0 ${Math.sin(f / 12 + i) * 3})`}>
            <circle
              cx={x as number}
              cy={y as number}
              r={r as number}
              fill={c as string}
            />
          </g>
        ))}
        <path
          d="M210 82q38-30 75 0q-38 30-75 0"
          fill="none"
          stroke={coral}
          strokeWidth="9"
        />
        <g fontSize="15" fontWeight="900" fill={navy}>
          {[68, 98, 128, 158].map((y, i) => (
            <circle
              key={y}
              cx="438"
              cy={y - 5}
              r="7"
              fill={[coral, yellow, mint, blue][i]}
            />
          ))}
          <text x="455" y="68">
            ENERJİ
          </text>
          <text x="455" y="98">
            ÜRETİM
          </text>
          <text x="455" y="128">
            TAŞIMA
          </text>
          <text x="455" y="158">
            PAKETLEME
          </text>
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 640 190" width="100%" height="190">
      <g transform={`translate(0 ${drift})`}>
        <path
          d={
            plant
              ? "M90 28H310V166H90Z"
              : "M92 98C92 34 160 24 215 43C282 28 320 65 305 121C290 170 220 171 171 158C119 168 92 145 92 98Z"
          }
          fill={plant ? "#CDEEA3" : "#BFEAF4"}
          stroke={plant ? mint : blue}
          strokeWidth="9"
        />
        {plant && (
          <path
            d="M105 43H295V151H105Z"
            fill="none"
            stroke="#78B947"
            strokeWidth="8"
          />
        )}
        <circle cx="205" cy="98" r="38" fill="#A778D1" />
        <circle cx="216" cy="88" r="14" fill="#FFD166" />
        <ellipse cx="150" cy="70" rx="20" ry="10" fill="#42B96E" />
        <ellipse cx="257" cy="130" rx="20" ry="10" fill="#E46B58" />
      </g>
      <g fontSize="17" fontWeight="900" fill={navy}>
        <text x="390" y="65">
          HÜCRE ZARI
        </text>
        <text x="390" y="100">
          SİTOPLAZMA
        </text>
        <text x="390" y="135">
          ÇEKİRDEK
        </text>
      </g>
    </svg>
  );
};

const LumiCellMotion = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 13) * 5;
  const pulse = 1 + Math.sin(f / 10) * 0.045;
  const shell = (
    <path
      d="M100 185C100 75 225 35 340 75C480 38 565 110 535 225C505 325 365 330 270 292C165 325 100 280 100 185Z"
      fill="#5CE0D118"
      stroke="#5CE0D1"
      strokeWidth="8"
    />
  );
  if (kind === "portal")
    return (
      <svg viewBox="0 0 640 360" width="640" height="360">
        <g
          transform={`translate(210 ${42 + bob})`}
          stroke="#5CE0D1"
          strokeWidth="10"
          fill="none"
        >
          <path d="M80 15h90l-20 58H98z" />
          <path d="M125 73q-35 105 65 112h95" />
          <path d="M180 185h145" />
          <circle cx="285" cy="185" r="43" />
        </g>
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={430 + i * 30}
            cy={120 + (i % 2) * 65}
            r={8 + i * 4}
            fill="#FF6381"
            transform={`scale(${Math.sin(f / 9 + i) * 8} 0)`}
          />
        ))}
        <circle
          cx="475"
          cy="225"
          r={58 * pulse}
          fill="none"
          stroke="#FFD166"
          strokeWidth="8"
          strokeDasharray="16 9"
        />
      </svg>
    );
  if (kind === "city")
    return (
      <svg viewBox="0 0 640 360" width="640" height="360">
        {shell}
        <path
          d="M100 185q60-35 0-70M535 225q-75-35 0-75"
          fill="none"
          stroke="#FFD166"
          strokeWidth="16"
        />
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={235 + i * 46}
            y={130 - i * 18 + bob}
            width="35"
            height={110 + i * 20}
            rx="12"
            fill={["#9E83FF", "#FF6381", "#FFD166"][i]}
          />
        ))}
        <path
          d="M145 245Q320 305 500 245"
          fill="none"
          stroke="#ffffff70"
          strokeWidth="5"
          strokeDasharray="12 10"
        />
      </svg>
    );
  if (kind === "factories")
    return (
      <svg viewBox="0 0 640 360" width="640" height="360">
        <path
          d="M80 245H555"
          stroke="#304363"
          strokeWidth="45"
          strokeLinecap="round"
        />
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx={((100 + f * 4 + i * 130) % 520) + 60}
            cy="245"
            r="18"
            fill="#FFD166"
          />
        ))}
        <path
          d="M110 210V100h120v110M260 210V70h120v140M410 210V120h120v90"
          fill="#5CE0D125"
          stroke="#5CE0D1"
          strokeWidth="8"
        />
        <path d="M145 100v-35h42v35M300 70V30h42v40" fill="#FF6381" />
      </svg>
    );
  if (kind === "logistics")
    return (
      <svg viewBox="0 0 640 360" width="640" height="360">
        {[0, 1, 2].map((i) => (
          <g
            key={i}
            transform={`translate(${130 + i * 175} ${95 + bob * (i % 2 ? 1 : -1)})`}
          >
            <rect
              width="120"
              height="95"
              rx="18"
              fill={["#FFD166", "#FF6381", "#9E83FF"][i]}
              stroke="white"
              strokeWidth="5"
            />
            <path d="M0 30h120M60 0v95" stroke="#142041" strokeWidth="5" />
          </g>
        ))}
        <path
          d="M90 265C210 330 420 330 550 260"
          fill="none"
          stroke="#5CE0D1"
          strokeWidth="12"
          strokeDasharray="18 12"
        />
        <g transform={`translate(320 273) rotate(${f * 2})`}>
          <path
            d="M0-45l17 28 32-2-16 28 16 28-32-2L0 63l-17-28-32 2 16-28-16-28 32 2Z"
            fill="#5CE0D1"
          />
        </g>
      </svg>
    );
  if (kind === "solar")
    return (
      <svg viewBox="0 0 640 360" width="640" height="360">
        <circle cx="95" cy="75" r={45 * pulse} fill="#FFD166" />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M130 ${90 + i * 18}L235 ${130 + i * 18}`}
            stroke="#FFD166"
            strokeWidth="8"
          />
        ))}
        <path
          d="M210 300V140l115-72 115 72v160Z"
          fill="#5CE0D122"
          stroke="#5CE0D1"
          strokeWidth="9"
        />
        <path d="M325 300V165" stroke="#5CE0D1" strokeWidth="7" />
        {[0, 1, 2, 3].map((i) => (
          <ellipse
            key={i}
            cx={260 + (i % 2) * 130}
            cy={200 + Math.floor(i / 2) * 70 + bob}
            rx="32"
            ry="17"
            fill="#58C878"
          />
        ))}
      </svg>
    );
  if (kind === "compareLab")
    return (
      <svg viewBox="0 0 640 360" width="640" height="360">
        <rect
          x="52"
          y="60"
          width="240"
          height="240"
          rx="35"
          fill="#A9DF7D35"
          stroke="#72D498"
          strokeWidth="10"
        />
        <path
          d="M360 180C360 75 555 55 575 170C595 285 382 305 360 180Z"
          fill="#6DC5F135"
          stroke="#6DC5F1"
          strokeWidth="10"
        />
        {[172, 465].map((x, i) => (
          <g key={x} transform={`translate(${x} ${180 + bob * (i ? 1 : -1)})`}>
            <circle r="46" fill="#9E83FF" />
            <circle r="17" fill="#FFD166" />
          </g>
        ))}
        <path
          d="M316 70V300"
          stroke="#ffffff60"
          strokeWidth="4"
          strokeDasharray="12 10"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 640 360" width="640" height="360">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g
          key={i}
          transform={`translate(${105 + i * 86} ${180 + Math.sin(f / 12 + i) * 75})`}
        >
          <circle r="30" fill={["#5CE0D1", "#FFD166", "#FF6381"][i % 3]} />
          <circle r={42 * pulse} fill="none" stroke="#ffffff60" />
        </g>
      ))}
      <path
        d="M105 180L191 243L277 112L363 220L449 120L535 180"
        fill="none"
        stroke="white"
        strokeWidth="8"
        strokeDasharray="15 10"
      />
    </svg>
  );
};

const MainScene = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    s = data.main[index],
    final = index === data.main.length - 1,
    left = s.speaker === "filiz",
    cardLeft = final ? 196 : left ? 220 : 34,
    cardWidth = final ? 568 : index === 1 ? 570 : 706;
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(140deg,#EAF5FF,#fff 52%,#FFF0ED)",
        fontFamily: "Trebuchet MS,Arial",
        color: navy,
        overflow: "hidden",
        isolation: "isolate",
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
        <span>5. SINIF FEN BİLİMLERİ</span>
        <span style={{ margin: "0 17px", color: "#AFC4D8" }}>|</span>
        <span>HÜCRE VE ORGANELLER</span>
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
            fontSize: s.lead.length > 60 ? 24 : 28,
            lineHeight: 1.15,
            fontWeight: 950,
            marginTop: 6,
            minHeight: 62,
          }}
        >
          {s.lead}
        </div>
        <CellSvg kind={s.kind} />
        <div style={{ display: "flex", gap: 10, marginTop: 0 }}>
          {s.points.map((p, i) => (
            <div
              key={p}
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
              {p}
            </div>
          ))}
        </div>
        {s.note && (
          <div
            style={{
              marginTop: 8,
              border: `2px solid ${coral}`,
              background: "#FFF0F3",
              borderRadius: 10,
              padding: "7px 10px",
              fontSize: 13,
              fontWeight: 900,
            }}
          >
            <b style={{ color: coral }}>ÖNEMLİ • </b>
            {s.note}
          </div>
        )}
      </div>
      {!final && (
        <>
          <GifCharacter
            name={left ? "filiz" : "ibrahim"}
            x={left ? 105 : 850}
            y={210}
            scale={1.02}
            animate
          />
          <Name
            name={left ? "Filiz" : "İbrahim"}
            x={left ? 105 : 850}
            y={494}
          />
        </>
      )}
      {final && (
        <>
          <GifCharacter
            name="filiz"
            x={95}
            y={218}
            scale={1.02}
            animate={left}
          />
          <Name name="Filiz" x={95} y={500} />
          <GifCharacter
            name="ibrahim"
            x={850}
            y={218}
            scale={1.02}
            animate={!left}
          />
          <Name name="İbrahim" x={850} y={500} />
        </>
      )}
      <Audio src={staticFile(`/audio/fen/hucre/main/${s.id}.mp3`)} />
    </AbsoluteFill>
  );
};

const Lumi = () => {
  const f = useCurrentFrame();
  return (
    <svg
      width="150"
      height="165"
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
    </svg>
  );
};

const KurzMotion = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame();
  const breathe = 1 + Math.sin(f / 18) * 0.012;
  const arm = (angle: number, length: number, color: string) => {
    const radians = (angle * Math.PI) / 180;
    return (
      <line
        x1="0"
        y1="0"
        x2={Math.cos(radians) * length}
        y2={-Math.sin(radians) * length}
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
      />
    );
  };
  if (kind === "scanner") {
    const length = 160 + 55 * (0.5 + 0.5 * Math.sin(f / 14));
    return (
      <g transform={`translate(620 292) scale(${breathe})`}>
        {arm(18, length, "#FFD166")}
        {arm(78, length * 0.88, "#5CE0D1")}
        <path
          d="M82-27A86 86 0 0 0 18-84"
          fill="none"
          stroke="#A897FF"
          strokeWidth="12"
        />
        <circle r="25" fill="#FF6381" />
        <circle
          cx={Math.cos((18 * Math.PI) / 180) * length}
          cy={-Math.sin((18 * Math.PI) / 180) * length}
          r="10"
          fill="white"
        />
        <circle
          cx={Math.cos((78 * Math.PI) / 180) * length * 0.88}
          cy={-Math.sin((78 * Math.PI) / 180) * length * 0.88}
          r="10"
          fill="white"
        />
        <text x="58" y="-65" fill="white" fontSize="24" fontWeight="900">
          60° SABİT
        </text>
      </g>
    );
  }
  if (kind === "gate") {
    const stages = [45, 90, 125, 180];
    const active = Math.min(3, Math.floor((f % 160) / 40));
    const angle = interpolate(
      f % 40,
      [0, 32],
      [stages[Math.max(0, active - 1)] ?? 45, stages[active]],
      clamp,
    );
    return (
      <g transform="translate(610 325)">
        <rect x="-245" y="18" width="490" height="28" rx="14" fill="#304363" />
        {arm(0, 220, "#FFD166")}
        {arm(angle, 220, "#5CE0D1")}
        <circle r="31" fill="#FF6381" stroke="#EFFFFE" strokeWidth="8" />
        {stages.map((n, i) => (
          <g key={n} transform={`translate(${-205 + i * 137} 95)`}>
            <circle
              r="26"
              fill={active === i ? "#FF6381" : "#263557"}
              stroke={active === i ? "#FFD166" : "#64769C"}
              strokeWidth="5"
            />
            <text
              y="8"
              textAnchor="middle"
              fill="white"
              fontSize="20"
              fontWeight="900"
            >
              {n}°
            </text>
          </g>
        ))}
      </g>
    );
  }
  if (kind === "hinge")
    return (
      <g transform={`translate(610 300) scale(${breathe})`}>
        {arm(12, 225, "#FFD166")}
        {arm(68, 210, "#5CE0D1")}
        {arm(142, 205, "#FF6381")}
        <path
          d="M94-20A96 96 0 0 0 36-89L0 0Z"
          fill="#5CE0D144"
          stroke="#5CE0D1"
          strokeWidth="5"
        />
        <path
          d="M36-89A96 96 0 0 0-76-58L0 0Z"
          fill="#A897FF44"
          stroke="#A897FF"
          strokeWidth="5"
        />
        <circle r="30" fill="#15172F" stroke="#FFD166" strokeWidth="9" />
        <text
          x="78"
          y="-220"
          textAnchor="middle"
          fill="white"
          fontSize="23"
          fontWeight="900"
        >
          ORTAK KOL
        </text>
      </g>
    );
  if (kind === "dock180") {
    const join = interpolate(f, [12, 65], [80, 0], clamp);
    return (
      <g transform="translate(610 315)">
        <line
          x1="-245"
          y1="0"
          x2="245"
          y2="0"
          stroke="#304363"
          strokeWidth="22"
          strokeLinecap="round"
        />
        {arm(110, 218, "#FFD166")}
        <path
          d="M150 0A150 150 0 0 0-51-141"
          fill="none"
          stroke="#FF6381"
          strokeWidth="25"
          strokeDasharray="300"
          strokeDashoffset={join}
        />
        <path
          d="M-51-141A150 150 0 0 0-150 0"
          fill="none"
          stroke="#5CE0D1"
          strokeWidth="25"
          strokeDasharray="190"
          strokeDashoffset={join}
        />
        <circle r="25" fill="#FFD166" stroke="#15172F" strokeWidth="7" />
        <text x="60" y="-104" fill="white" fontSize="30" fontWeight="900">
          110°
        </text>
        <text x="-150" y="-86" fill="white" fontSize="30" fontWeight="900">
          70°
        </text>
        <text
          x="0"
          y="75"
          textAnchor="middle"
          fill="#FFD166"
          fontSize="32"
          fontWeight="900"
        >
          180° TAMAMLANDI
        </text>
      </g>
    );
  }
  if (kind === "dock90")
    return (
      <g transform="translate(550 350)">
        <rect x="0" y="-235" width="28" height="235" rx="12" fill="#304363" />
        <rect x="0" y="-28" width="290" height="28" rx="12" fill="#304363" />
        {arm(55, 245, "#A897FF")}
        <path
          d="M105 0A105 105 0 0 0 60-86"
          fill="none"
          stroke="#FF6381"
          strokeWidth="22"
        />
        <path
          d="M60-86A105 105 0 0 0 0-105"
          fill="none"
          stroke="#5CE0D1"
          strokeWidth="22"
        />
        <rect
          x="0"
          y="-54"
          width="54"
          height="54"
          fill="none"
          stroke="#FFD166"
          strokeWidth="7"
        />
        <text x="96" y="-42" fill="white" fontSize="28" fontWeight="900">
          35°
        </text>
        <text x="28" y="-125" fill="white" fontSize="28" fontWeight="900">
          55°
        </text>
      </g>
    );
  const scan = (f % 120) / 120;
  return (
    <g transform="translate(400 170) scale(.75)">
      <rect
        width="250"
        height="72"
        rx="25"
        fill="#263557"
        stroke="#5CE0D1"
        strokeWidth="6"
      />
      <text
        x="125"
        y="45"
        textAnchor="middle"
        fill="white"
        fontSize="24"
        fontWeight="900"
      >
        1. ORTAKLIK?
      </text>
      <path
        d="M125 72V130H290"
        fill="none"
        stroke="#FFD166"
        strokeWidth="9"
        strokeDasharray="15 10"
        strokeDashoffset={-scan * 50}
      />
      <rect
        x="165"
        y="130"
        width="250"
        height="72"
        rx="25"
        fill="#263557"
        stroke="#A897FF"
        strokeWidth="6"
      />
      <text
        x="290"
        y="175"
        textAnchor="middle"
        fill="white"
        fontSize="24"
        fontWeight="900"
      >
        2. TOPLAM?
      </text>
      <path
        d="M290 202V255M290 255H155M290 255H425"
        fill="none"
        stroke="#FFD166"
        strokeWidth="9"
      />
      <rect
        x="45"
        y="255"
        width="220"
        height="70"
        rx="24"
        fill="#5CE0D133"
        stroke="#5CE0D1"
        strokeWidth="6"
      />
      <text
        x="155"
        y="300"
        textAnchor="middle"
        fill="white"
        fontSize="27"
        fontWeight="900"
      >
        90° TÜMLER
      </text>
      <rect
        x="315"
        y="255"
        width="220"
        height="70"
        rx="24"
        fill="#FF638133"
        stroke="#FF6381"
        strokeWidth="6"
      />
      <text
        x="425"
        y="300"
        textAnchor="middle"
        fill="white"
        fontSize="27"
        fontWeight="900"
      >
        180° BÜTÜNLER
      </text>
    </g>
  );
};

const KurzScene = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    s = data.kurz[index];
  const channelShift =
    index === 1
      ? interpolate(f, [145, 165, 295, 315], [0, 80, 80, 0], clamp)
      : 0;
  return (
    <AbsoluteFill
      style={{
        fontFamily: "Arial",
        background: "radial-gradient(circle at 35% 30%,#253C70,#11182F 68%)",
        color: "white",
        overflow: "hidden",
      }}
    >
      <svg width="960" height="540" style={{ position: "absolute" }}>
        <defs>
          <radialGradient id="glow">
            <stop stopColor="#7CF6E8" stopOpacity=".7" />
            <stop offset="1" stopColor="#7CF6E8" stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: 24 }, (_, i) => (
          <circle
            key={i}
            cx={(i * 167) % 960}
            cy={(i * 97) % 540}
            r={(i % 3) + 1}
            fill="#fff"
            opacity=".22"
          />
        ))}
        <circle cx="580" cy="280" r="210" fill="url(#glow)" opacity=".25" />
        <g transform={`translate(500 ${82 + channelShift}) scale(.66)`}>
          <LumiCellMotion kind={s.kind} />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 54, top: 45, width: 470 }}>
        <div
          style={{
            fontSize: 15,
            letterSpacing: 3,
            color: "#6EEDD9",
            fontWeight: 900,
          }}
        >
          LUMİ MİKRO YAŞAM LABORATUVARI
        </div>
        <h1 style={{ fontSize: 43, lineHeight: 1, margin: "12px 0" }}>
          {s.title}
        </h1>
        <p
          style={{
            fontSize: 23,
            lineHeight: 1.25,
            color: "#DCE6FF",
            fontWeight: 700,
          }}
        >
          {s.lead}
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
          {s.facts.map((x, i) => (
            <div
              key={x}
              style={{
                padding: "12px 15px",
                borderRadius: 14,
                background: i ? "#FF638125" : "#5CE0D125",
                border: `2px solid ${i ? "#FF6381" : "#5CE0D1"}`,
                fontSize: 17,
                fontWeight: 900,
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
          right: 24,
          bottom: 12,
          transform: "scale(.72)",
          transformOrigin: "bottom right",
        }}
      >
        <Lumi />
      </div>
      <Audio src={staticFile(`/audio/fen/hucre/kurz/${s.id}.mp3`)} />
    </AbsoluteFill>
  );
};

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
      <SafeChannelCard />
    </Sequence>
    <Sequence from={start("main", timings.main.length)} durationInFrames={210}>
      <>
        <CtaOptionOne />
        <Name name="Filiz" x={116} y={498} />
        <Name name="İbrahim" x={844} y={498} />
      </>
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
      <SafeChannelCard />
    </Sequence>
  </Canvas>
);

const ShortVisual = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    bob = Math.sin(f / 12) * 7,
    glow = 0.55 + 0.35 * Math.sin(f / 9);
  return (
    <svg viewBox="0 0 940 390" width="940" height="330">
      <defs>
        <marker
          id="softArrow"
          markerWidth="12"
          markerHeight="12"
          refX="9"
          refY="4"
          orient="auto"
        >
          <path d="M0 0L10 4L0 8Z" fill="#7EA6C8" />
        </marker>
      </defs>
      {index === 0 ? (
        <>
          <path
            d="M90 315H850"
            stroke="#D8E7F2"
            strokeWidth="28"
            strokeLinecap="round"
          />
          {[
            [220, 140],
            [710, 140],
            [465, 260],
          ].map(([x, y], i) => (
            <g
              key={x}
              transform={`translate(${x} ${y + bob * (i % 2 ? 1 : -1)})`}
            >
              <rect
                x="-105"
                y="-82"
                width="210"
                height="164"
                rx="35"
                fill={["#FFF3CA", "#DDF7F1", "#FFE6EB"][i]}
                stroke={[yellow, mint, coral][i]}
                strokeWidth="8"
              />
              {i === 0 && (
                <g fill={navy}>
                  {[
                    [-40, -20],
                    [0, 15],
                    [42, -28],
                    [45, 35],
                  ].map((p, j) => (
                    <circle key={j} cx={p[0]} cy={p[1]} r="13" />
                  ))}
                </g>
              )}
              {i === 1 && (
                <path
                  d="M-65-35q55-35 120 5q-70 25-110 70q65 28 120 0"
                  fill="none"
                  stroke={mint}
                  strokeWidth="13"
                  strokeLinecap="round"
                />
              )}
              {i === 2 && (
                <g fill={coral}>
                  {[-45, 0, 45].map((y, j) => (
                    <path
                      key={j}
                      d={`M-70 ${y - 20}Q0 ${y + 10} 70 ${y - 20}`}
                      fill="none"
                      stroke={coral}
                      strokeWidth="12"
                    />
                  ))}
                </g>
              )}
              <circle
                r={102 + 8 * glow}
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                opacity={glow}
              />
            </g>
          ))}
          <circle
            cx="465"
            cy="190"
            r={42 + 8 * glow}
            fill="#2878C820"
            stroke={blue}
            strokeWidth="6"
            strokeDasharray="10 8"
          />
          <text
            x="470"
            y="375"
            textAnchor="middle"
            fill={navy}
            fontSize="25"
            fontWeight="900"
          >
            HÜCRE İÇİ GÖREV İSTASYONLARI
          </text>
        </>
      ) : (
        <>
          <g transform="translate(470 195)">
            <ellipse
              rx={245 + 12 * Math.sin(f / 15)}
              ry={145 + 7 * Math.cos(f / 15)}
              fill="#DCEEF7"
              stroke={blue}
              strokeWidth="9"
              strokeDasharray="18 10"
            />
            <path
              d="M-135 0C-125-95 115-115 140-5C165 105-125 108-135 0Z"
              fill="#183B6640"
            />
            <circle cx={25 + bob} cy="-8" r="53" fill="#9E83FF80" />
            {[
              [-130, -76],
              [-150, 70],
              [145, -65],
              [154, 65],
            ].map((p, i) => (
              <circle
                key={i}
                cx={p[0]}
                cy={p[1]}
                r={18 + (i % 2) * 7}
                fill={i % 2 ? mint : yellow}
                opacity={glow}
              />
            ))}
            <line
              x1="-300"
              y1={-120 + bob}
              x2="300"
              y2={-120 + bob}
              stroke={coral}
              strokeWidth="7"
              opacity=".75"
            />
            <circle
              cx={-300 + ((f * 8) % 600)}
              cy={-120 + bob}
              r="14"
              fill={coral}
            />
          </g>
          <text
            x="470"
            y="372"
            textAnchor="middle"
            fill={navy}
            fontSize="25"
            fontWeight="900"
          >
            MİKROSKOP TARAMASI • GİZEMLİ HÜCRE
          </text>
        </>
      )}
    </svg>
  );
};

export const Short = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    s = data.shorts[index],
    t = timings.shorts[index],
    choices = f >= t.qEnd,
    reveal = f >= t.reveal,
    done = f >= t.congrats,
    count = Math.max(1, 5 - Math.floor((f - t.qEnd) / 30));
  return (
    <AbsoluteFill
      style={{
        fontFamily: "Trebuchet MS,Arial",
        background: "linear-gradient(155deg,#EAF6FF,#fff 57%,#FFF0ED)",
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
          backgroundSize: "34px 34px",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 36,
          right: 36,
          top: 34,
          height: 66,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <b
          style={{
            background: navy,
            color: "white",
            borderRadius: 30,
            padding: "14px 23px",
            fontSize: 27,
          }}
        >
          5. SINIF
        </b>
        <b
          style={{
            background: "#7654BD",
            color: "white",
            borderRadius: 30,
            padding: "14px 23px",
            fontSize: 27,
          }}
        >
          FEN BİLİMLERİ
        </b>
        <i style={{ height: 3, background: "#C7DAEB", flex: 1 }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 34,
          right: 34,
          top: 125,
          minHeight: 315,
          padding: "34px 34px 26px 145px",
          boxSizing: "border-box",
          borderRadius: 34,
          background: "white",
          boxShadow: "0 14px 35px #173B6622",
          border: "2px solid #D6E5F1",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 38,
            top: 42,
            width: 82,
            height: 82,
            borderRadius: 24,
            background: yellow,
            display: "grid",
            placeItems: "center",
            fontSize: 58,
            fontWeight: 950,
          }}
        >
          ?
        </div>
        <div
          style={{
            fontSize: 25,
            color: "#7654BD",
            fontWeight: 950,
            letterSpacing: 1,
          }}
        >
          HIZLI SORU • {s.topic}
        </div>
        <div
          style={{
            fontSize: s.question.length > 125 ? 36 : 41,
            lineHeight: 1.14,
            fontWeight: 950,
            marginTop: 11,
          }}
        >
          {s.question}
        </div>
        <div
          style={{
            marginTop: 18,
            display: "inline-block",
            background: "#EAF4FA",
            padding: "8px 16px",
            borderRadius: 12,
            fontSize: 19,
            fontWeight: 900,
          }}
        >
          İPUÇLARINI İNCELE • GÖREVLERİ EŞLEŞTİR
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 455,
          left: 70,
          height: 330,
          overflow: "hidden",
        }}
      >
        <ShortVisual index={index} />
      </div>
      {!choices && (
        <div
          style={{
            position: "absolute",
            left: 54,
            right: 350,
            top: 930,
            bottom: 82,
            borderRadius: 34,
            background: "linear-gradient(150deg,#FFFFFFDD,#EAF6FC)",
            border: "3px solid #CFE1EF",
            boxShadow: "0 16px 34px #173B6618",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 38,
              top: 38,
              fontSize: 27,
              fontWeight: 950,
              color: navy,
            }}
          >
            MİKRO KEŞİF DEVAM EDİYOR
          </div>
          <div
            style={{
              position: "absolute",
              left: 38,
              right: 38,
              top: 102,
              height: 3,
              background: "#CFE1EF",
            }}
          />
          {Array.from({ length: 12 }, (_, i) => (
            <i
              key={i}
              style={{
                position: "absolute",
                left: 45 + ((i * 83) % 580),
                top: 150 + ((i * 119) % 650),
                width: 18 + (i % 3) * 8,
                height: 18 + (i % 3) * 8,
                borderRadius: "50%",
                background: [blue, mint, coral, yellow][i % 4],
                opacity: 0.18 + 0.14 * Math.sin(f / 10 + i),
                transform: `translateY(${Math.sin(f / 13 + i) * 14}px)`,
              }}
            />
          ))}
          <div
            style={{
              position: "absolute",
              left: 70,
              right: 70,
              top: 330,
              height: 260,
              borderRadius: 150,
              border: `10px dashed ${blue}55`,
              transform: `rotate(${f * 0.25}deg)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 165,
              top: 415,
              width: 190,
              height: 190,
              borderRadius: "50%",
              background: "radial-gradient(circle,#FFD166,#E65068)",
              boxShadow: "0 0 0 28px #25A98E22",
              transform: `scale(${1 + 0.04 * Math.sin(f / 11)})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 42,
              right: 42,
              bottom: 42,
              padding: "22px 26px",
              borderRadius: 22,
              background: "#183B66",
              color: "white",
              fontSize: 24,
              fontWeight: 900,
              textAlign: "center",
            }}
          >
            İPUÇLARINI BİRLEŞTİR • CEVABINI HAZIRLA
          </div>
        </div>
      )}
      {choices && (
        <>
          <div
            style={{
              position: "absolute",
              left: 42,
              top: 835,
              width: 680,
              display: "flex",
              flexDirection: "column",
              gap: 15,
            }}
          >
            {s.choices.map((c, i) => {
              const right = reveal && i === s.correct;
              return (
                <div
                  key={c}
                  style={{
                    height: 102,
                    borderRadius: 23,
                    border: `4px solid ${right ? mint : "#F0A8B5"}`,
                    background: right ? "#DDF8EF" : "#FFF",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 22px",
                    fontSize: 30,
                    fontWeight: 900,
                    boxShadow: "0 7px 15px #173B6615",
                  }}
                >
                  <b
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 15,
                      background: right ? mint : coral,
                      color: "white",
                      display: "grid",
                      placeItems: "center",
                      marginRight: 18,
                    }}
                  >
                    {"ABCD"[i]}
                  </b>
                  {c}
                  {right && (
                    <span
                      style={{ marginLeft: "auto", fontSize: 52, color: mint }}
                    >
                      ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          {!reveal && (
            <div
              style={{
                position: "absolute",
                left: 220,
                top: 1530,
                width: 280,
                height: 280,
                borderRadius: 150,
                border: `14px solid ${blue}`,
                background: "white",
                display: "grid",
                placeItems: "center",
                boxShadow: "0 12px 30px #173B6630",
              }}
            >
              <b style={{ fontSize: 92, lineHeight: 0.8 }}>{count}</b>
              <span
                style={{
                  position: "absolute",
                  bottom: 25,
                  fontSize: 25,
                  fontWeight: 950,
                  color: coral,
                }}
              >
                DÜŞÜN!
              </span>
            </div>
          )}
          {reveal && !done && (
            <div
              style={{
                position: "absolute",
                left: 48,
                right: 48,
                top: 1495,
                height: 315,
                borderRadius: 28,
                border: `4px solid ${mint}`,
                background: "linear-gradient(135deg,#E7FAF5,#FFFFFF)",
                boxShadow: "0 12px 28px #173B6622",
                display: "flex",
                alignItems: "center",
                padding: "0 34px",
                color: navy,
                fontSize: 31,
                lineHeight: 1.22,
                fontWeight: 900,
              }}
            >
              <span style={{ fontSize: 55, marginRight: 24, color: mint }}>
                ✓
              </span>
              {index === 0
                ? "Ribozom → ER → Golgi: üret, taşı, paketle"
                : "Duvar + kloroplast + büyük koful → bitki hücresi"}
            </div>
          )}
        </>
      )}
      {done && (
        <div
          style={{
            position: "absolute",
            left: 70,
            right: 70,
            bottom: 75,
            height: 395,
            borderRadius: 35,
            background: "linear-gradient(135deg,#E65068,#F57D74)",
            color: "white",
            display: "grid",
            placeItems: "center",
            fontSize: 72,
            fontWeight: 950,
            boxShadow: "0 18px 36px #E6506844",
            transform: `scale(${pop(f, t.congrats)})`,
          }}
        >
          Tebrikler!
        </div>
      )}
      <GifCharacter name="ibrahim" x={918} y={900} scale={1.82} animate />
      <Audio
        src={staticFile(`/audio/fen/hucre/shorts/${index + 1}/question.mp3`)}
      />
      <Sequence from={t.reveal}>
        <Audio
          src={staticFile(`/audio/fen/hucre/shorts/${index + 1}/answer.mp3`)}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
