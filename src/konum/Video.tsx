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
import data from "../../content/konum.json";
import timings from "./timings.json";
import { GifCharacter } from "../GifCharacter";
import { CtaOptionOne } from "../previews/cta-option-1/CtaOptionOne";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";

const navy = "#173B66",
  blue = "#2876C7",
  violet = "#7456B8",
  coral = "#E65068",
  mint = "#25A98E",
  amber = "#F6BC46",
  ink = "#172638";
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const pop = (f: number, d = 0) =>
  spring({
    frame: f - d,
    fps: 30,
    config: { damping: 18, stiffness: 110, mass: 0.8 },
  });
const start = (arr: { frames: number }[], i: number) =>
  arr.slice(0, i).reduce((n, x) => n + x.frames, 0);
export const mainDuration = () =>
  start(timings.main, timings.main.length) + 210;
const KURZ_RATE = 0.9775;
const kurzFrames = (i: number) =>
  Math.round(timings.kurz[i].frames / KURZ_RATE);
const kurzStart = (i: number) =>
  timings.kurz.slice(0, i).reduce((n, _, k) => n + kurzFrames(k), 0);
export const kurzDuration = () => kurzStart(timings.kurz.length);
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

const MainBg = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(145deg,#EEF8FF,#FFFFFF 52%,#FFF1ED)",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 18 }).map((_, i) => (
        <i
          key={i}
          style={{
            position: "absolute",
            left: (i * 163) % 940,
            top: (i * 97) % 520,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: i % 2 ? blue : coral,
            opacity: 0.12,
            transform: `translateY(${Math.sin(f / 19 + i) * 5}px)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
const Label = ({
  children,
  color = blue,
}: {
  children: React.ReactNode;
  color?: string;
}) => (
  <span
    style={{
      display: "inline-flex",
      padding: "7px 12px",
      borderRadius: 999,
      background: color,
      color: "white",
      fontSize: 12,
      fontWeight: 950,
      letterSpacing: 0.7,
    }}
  >
    {children}
  </span>
);
const CharacterName = ({
  name,
  x,
  top,
}: {
  name: string;
  x: number;
  top: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: x - 47,
      top,
      width: 94,
      height: 28,
      borderRadius: 999,
      background: "#D94F66",
      border: "2px solid white",
      boxShadow: "0 5px 12px #173B6630",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      color: "white",
      fontSize: 14,
      fontWeight: 950,
      zIndex: 15,
    }}
  >
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: "white",
        boxShadow: "0 0 0 3px #FFFFFF44",
      }}
    />
    {name}
  </div>
);

const LocationLayers = () => {
  const f = useCurrentFrame();
  const rings = [
    { r: 38, t: "EV", c: coral, y: 137 },
    { r: 72, t: "ŞEHİR", c: amber, y: 77 },
    { r: 108, t: "TÜRKİYE", c: mint, y: 42 },
  ];
  return (
    <svg viewBox="0 0 700 250" width="700" height="250">
      <path
        d="M350 36c-48 0-87 38-87 86 0 68 87 119 87 119s87-51 87-119c0-48-39-86-87-86Z"
        fill="#2876C71A"
        stroke={blue}
        strokeWidth="5"
      />
      {rings.map((x, i) => (
        <g key={x.t} opacity={pop(f, i * 9)}>
          <circle
            cx="350"
            cy="132"
            r={x.r + Math.sin(f / 22 + i) * 3}
            fill="none"
            stroke={x.c}
            strokeWidth="4"
            strokeDasharray="9 8"
          />
          <rect
            x="300"
            y={x.y - 18}
            width="100"
            height="25"
            rx="12"
            fill="white"
            stroke={x.c}
            strokeWidth="1.5"
          />
          <text
            x="350"
            y={x.y}
            textAnchor="middle"
            fill={x.c}
            fontSize="15"
            fontWeight="900"
          >
            {x.t}
          </text>
        </g>
      ))}
      {["DENİZ", "DAĞ", "YOL", "KAYNAK"].map((t, i) => (
        <text
          key={t}
          x={85 + i * 170}
          y="238"
          textAnchor="middle"
          fill={navy}
          fontSize="17"
          fontWeight="900"
          opacity={pop(f, 30 + i * 5)}
        >
          {t}
        </text>
      ))}
    </svg>
  );
};
const Bridge = () => {
  const f = useCurrentFrame(),
    ship = 310 + 275 * Math.sin(f / 85);
  return (
    <svg viewBox="0 0 700 250" width="700" height="250">
      <path
        d="M30 205Q180 90 330 180T670 70"
        fill="none"
        stroke="#78BFF0"
        strokeWidth="52"
      />
      <path
        d="M55 140Q210 25 360 135T650 40"
        fill="none"
        stroke="#F5C978"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <text x="70" y="55" fill={violet} fontSize="25" fontWeight="950">
        AVRUPA
      </text>
      <text x="515" y="210" fill={mint} fontSize="25" fontWeight="950">
        ASYA
      </text>
      <text x="290" y="153" fill={navy} fontSize="19" fontWeight="950">
        TÜRKİYE
      </text>
      <g transform={`translate(${ship} 185)`}>
        <path d="M0 0h42l-8 15H8Z" fill="white" stroke={navy} strokeWidth="3" />
      </g>
      <path
        d="M250 194h42M395 144h42"
        stroke="white"
        strokeWidth="5"
        strokeDasharray="7 5"
      />
      <text x="252" y="225" fill={navy} fontSize="13" fontWeight="900">
        İSTANBUL • ÇANAKKALE BOĞAZLARI
      </text>
    </svg>
  );
};
const MountainClimate = () => {
  const f = useCurrentFrame(),
    wind = (f * 2) % 220;
  return (
    <svg viewBox="0 0 700 250" width="700" height="250">
      <rect x="25" y="25" width="650" height="195" rx="28" fill="#DDF3FF" />
      <path
        d="M50 202 170 80l70 75 100-125 125 155 80-105 110 122Z"
        fill="#769A77"
        stroke="#456A59"
        strokeWidth="4"
      />
      <path d="M50 202h605" stroke="#47A7DC" strokeWidth="18" />
      <g
        stroke="#FFFFFF"
        strokeWidth="6"
        strokeDasharray="13 11"
        strokeDashoffset={-wind}
      >
        <path d="M65 185h180" />
        <path d="M470 185h175" />
      </g>
      <text x="72" y="48" fill={navy} fontSize="16" fontWeight="900">
        KIYIYA PARALEL: GEÇİT GEREKİR
      </text>
      <text x="412" y="238" fill={navy} fontSize="15" fontWeight="900">
        EGE: VADİLER İÇERİ AÇILIR
      </text>
      <circle cx={510 + Math.sin(f / 20) * 12} cy="60" r="25" fill={amber} />
    </svg>
  );
};
const TerrainMorph = () => {
  const f = useCurrentFrame();
  const p = (Math.sin(f / 35) + 1) / 2;
  return (
    <svg viewBox="0 0 700 250" width="700" height="250">
      <path
        d={`M20 210Q90 ${170 - p * 90} 155 205Q225 ${205 - p * 120} 290 205Q370 ${125 + p * 55} 445 205Q530 ${190 - p * 100} 680 205V245H20Z`}
        fill="#70B57B"
        stroke="#35705A"
        strokeWidth="5"
      />
      <path
        d="M15 215Q150 180 300 215T685 190"
        fill="none"
        stroke="#54B9F0"
        strokeWidth="13"
        strokeLinecap="round"
        strokeDasharray="20 12"
        strokeDashoffset={-f}
      />
      {["DAĞ", "OVA", "PLATO", "VADİ", "AKARSU"].map((t, i) => (
        <g key={t} opacity={pop(f, 5 + i * 6)}>
          <circle
            cx={75 + i * 135}
            cy="55"
            r="28"
            fill={[violet, amber, mint, coral, blue][i]}
          />
          <text
            x={75 + i * 135}
            y="60"
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="950"
          >
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
};
const CoastMorph = () => {
  const f = useCurrentFrame(),
    wave = Math.sin(f / 20) * 3;
  const cards = [
    {
      x: 8,
      y: 8,
      t: "KÖRFEZ",
      shape: (
        <>
          <rect x="8" y="35" width="204" height="62" rx="12" fill="#E8C76A" />
          <path
            d={`M212 44Q${145 + wave} 44 ${105 + wave} 66Q${145 + wave} 88 212 88Z`}
            fill="#63BCEB"
          />
        </>
      ),
    },
    {
      x: 238,
      y: 8,
      t: "KOY",
      shape: (
        <>
          <rect x="8" y="35" width="204" height="62" rx="12" fill="#E8C76A" />
          <path
            d={`M212 51Q${170 + wave} 51 ${146 + wave} 66Q${170 + wave} 81 212 81Z`}
            fill="#63BCEB"
          />
        </>
      ),
    },
    {
      x: 468,
      y: 8,
      t: "YARIMADA",
      shape: (
        <>
          <rect x="8" y="35" width="48" height="62" fill="#E8C76A" />
          <path d="M48 66q42-42 82 0-40 42-82 0Z" fill="#E8C76A" />
        </>
      ),
    },
    {
      x: 8,
      y: 132,
      t: "ADA",
      shape: <ellipse cx="110" cy="67" rx="53" ry="28" fill="#E8C76A" />,
    },
    {
      x: 238,
      y: 132,
      t: "BOĞAZ",
      shape: (
        <>
          <path d="M8 35h75q30 20 0 62H8Z" fill="#E8C76A" />
          <path d="M212 35h-75q-30 20 0 62h75Z" fill="#E8C76A" />
          <path
            d={`M102 ${32 + wave}v68`}
            stroke="#BCEAFF"
            strokeWidth="15"
            strokeLinecap="round"
          />
        </>
      ),
    },
    {
      x: 468,
      y: 132,
      t: "GÖL",
      shape: (
        <>
          <rect x="8" y="35" width="204" height="62" rx="16" fill="#E8C76A" />
          <ellipse cx="110" cy="68" rx="50" ry="23" fill="#63BCEB" />
        </>
      ),
    },
  ];
  return (
    <svg viewBox="0 0 700 250" width="700" height="250">
      {cards.map((c, i) => (
        <g
          key={c.t}
          transform={`translate(${c.x} ${c.y + Math.sin(f / 24 + i) * 2})`}
          opacity={pop(f, i * 5)}
        >
          <rect
            width="224"
            height="110"
            rx="18"
            fill="#63BCEB"
            stroke="#D5E9F5"
            strokeWidth="3"
          />
          <text
            x="112"
            y="24"
            textAnchor="middle"
            fill={navy}
            fontSize="14"
            fontWeight="950"
          >
            {c.t}
          </text>
          <g transform="translate(32 3) scale(.72)">{c.shape}</g>
        </g>
      ))}
    </svg>
  );
};
const Network = () => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 700 250" width="700" height="250">
      <path
        d="M55 195 180 75 300 190 440 55 650 190"
        fill="none"
        stroke="#708C73"
        strokeWidth="45"
        strokeLinejoin="round"
      />
      <path
        d="M45 205C190 140 315 240 655 100"
        fill="none"
        stroke="#EDEFF2"
        strokeWidth="20"
      />
      <path
        d="M45 205C190 140 315 240 655 100"
        fill="none"
        stroke={blue}
        strokeWidth="4"
        strokeDasharray="18 13"
        strokeDashoffset={-f * 1.4}
      />
      {[65, 220, 405, 595].map((x, i) => (
        <g
          key={x}
          transform={`translate(${x} ${190 - i * 25 + Math.sin(f / 15 + i) * 3})`}
        >
          <circle r="24" fill={[amber, mint, violet, coral][i]} />
          <text
            y="5"
            textAnchor="middle"
            fill="white"
            fontSize="13"
            fontWeight="950"
          >
            {["KÖPRÜ", "GEÇİT", "METRO", "SU"][i]}
          </text>
        </g>
      ))}
    </svg>
  );
};
const Resources = () => {
  const f = useCurrentFrame();
  const rows = [
    "DEMİR • BALIKESİR / SAKARYA / KOCAELİ",
    "BOR • BİGADİÇ / SUSURLUK / EMET",
    "LİNYİT • ÇANAKKALE / BURSA / EDİRNE",
    "DOĞAL GAZ • LÜLEBURGAZ / HAMİTABAT",
    "KROM • KÜTAHYA / MUĞLA",
    "KURŞUN-BAKIR • KEBAN",
    "OLTU TAŞI • ERZURUM",
    "KAYA TUZU • KARS / AĞRI / IĞDIR / ERZİNCAN",
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 7,
        width: 650,
      }}
    >
      {rows.map((x, i) => (
        <div
          key={x}
          style={{
            height: 43,
            borderRadius: 12,
            background: "white",
            border: `2px solid ${i % 2 ? mint : violet}`,
            display: "flex",
            alignItems: "center",
            padding: "0 13px",
            fontSize: 12,
            fontWeight: 900,
            color: navy,
            opacity: pop(f, i * 4),
            transform: `translateX(${(1 - pop(f, i * 4)) * (i % 2 ? 15 : -15)}px)`,
          }}
        >
          {x}
        </div>
      ))}
    </div>
  );
};
const Summary = () => {
  const f = useCurrentFrame();
  return (
    <svg viewBox="0 0 700 250" width="700" height="250">
      <path
        d="M350 38 500 98 470 210H230L200 98Z"
        fill="#2876C720"
        stroke={blue}
        strokeWidth="5"
      />
      <text
        x="350"
        y="137"
        textAnchor="middle"
        fill={navy}
        fontSize="28"
        fontWeight="950"
      >
        TÜRKİYE
      </text>
      {["KITALAR", "DENİZLER", "YER ŞEKİLLERİ", "ULAŞIM", "KAYNAKLAR"].map(
        (t, i) => {
          const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
          return (
            <g
              key={t}
              opacity={pop(f, i * 7)}
              transform={`translate(${350 + 250 * Math.cos(a)} ${130 + 100 * Math.sin(a)})`}
            >
              <circle
                r={30 + Math.sin(f / 18 + i) * 2}
                fill={[violet, blue, mint, amber, coral][i]}
              />
              <text
                textAnchor="middle"
                y="5"
                fill="white"
                fontSize="11"
                fontWeight="950"
              >
                {t}
              </text>
            </g>
          );
        },
      )}
    </svg>
  );
};
const MainVisual = ({ kind }: { kind: string }) =>
  kind === "locationLayers" ? (
    <LocationLayers />
  ) : kind === "bridge" ? (
    <Bridge />
  ) : kind === "mountainClimate" ? (
    <MountainClimate />
  ) : kind === "terrainMorph" ? (
    <TerrainMorph />
  ) : kind === "coastMorph" ? (
    <CoastMorph />
  ) : kind === "network" ? (
    <Network />
  ) : kind === "resources" ? (
    <Resources />
  ) : (
    <Summary />
  );

const MainScene = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    s = data.main[index],
    right = index % 2 === 0,
    last = index === data.main.length - 1,
    e = interpolate(f, [0, 18], [0, 1], {
      ...clamp,
      easing: Easing.out(Easing.cubic),
    });
  return (
    <AbsoluteFill style={{ fontFamily: "Trebuchet MS,Arial", color: ink }}>
      <MainBg />
      <div
        style={{
          position: "absolute",
          left: last ? 115 : right ? 205 : 25,
          top: 45,
          width: 730,
          height: 455,
          borderRadius: 30,
          background: "#FFFFFFF2",
          border: "2px solid #D7E6F2",
          boxShadow: "0 20px 55px #173B6620",
          overflow: "hidden",
          opacity: e,
          transform: `translateY(${(1 - e) * 17}px)`,
        }}
      >
        <div style={{ position: "absolute", left: 28, top: 22 }}>
          <Label color={index % 2 ? violet : blue}>
            5. SINIF • SOSYAL BİLGİLER
          </Label>
        </div>
        <div
          style={{
            position: "absolute",
            left: 28,
            right: 24,
            top: 66,
            fontSize: 28,
            fontWeight: 950,
            color: navy,
          }}
        >
          {s.title}
        </div>
        <div
          style={{
            position: "absolute",
            left: 29,
            right: 24,
            top: 105,
            fontSize: 15,
            fontWeight: 750,
            color: "#64778A",
          }}
        >
          {s.lead}
        </div>
        <div
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            top: 145,
            height: 285,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MainVisual kind={s.kind} />
        </div>
      </div>
      {!last && (
        <>
          <GifCharacter
            name={s.speaker as "filiz" | "ibrahim"}
            x={right ? 105 : 857}
            y={210}
            scale={1.02}
            flip={!right}
            animate
          />
          <CharacterName
            name={s.speaker === "filiz" ? "Filiz" : "İbrahim"}
            x={right ? 105 : 857}
            top={494}
          />
        </>
      )}
      {last && (
        <>
          <GifCharacter
            name="filiz"
            x={72}
            y={218}
            scale={0.72}
            animate={false}
          />
          <CharacterName name="Filiz" x={72} top={500} />
          <GifCharacter
            name="ibrahim"
            x={885}
            y={218}
            scale={0.72}
            flip
            animate
          />
          <CharacterName name="İbrahim" x={885} top={500} />
        </>
      )}
      <Audio src={staticFile(`audio/sosyal/konum/main/${s.id}.mp3`)} />
    </AbsoluteFill>
  );
};
const Channel = () => (
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
          from={start(timings.main, i)}
          durationInFrames={timings.main[i].frames}
        >
          <MainScene index={i} />
        </Sequence>
      ))}
      <Channel />
      <Sequence
        from={start(timings.main, timings.main.length)}
        durationInFrames={210}
      >
        <CtaOptionOne />
      </Sequence>
    </Canvas>
  </AbsoluteFill>
);

const Lumi = () => {
  const f = useCurrentFrame(),
    y = Math.sin(f / 15) * 4;
  return (
    <svg
      width="145"
      height="160"
      viewBox="0 0 180 180"
      style={{
        filter: "drop-shadow(0 18px 22px #02050A99)",
        transform: `translateY(${y}px)`,
      }}
    >
      <ellipse cx="90" cy="169" rx="49" ry="7" fill="#0006" />
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
      <circle cx="57" cy="142" r="9" fill="#FFD166" />
      <circle cx="123" cy="142" r="9" fill="#FFD166" />
    </svg>
  );
};
const KurzGraphic = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame(),
    scan = 340 + 280 * Math.sin(f / 66);
  return (
    <svg viewBox="0 0 760 300" width="760" height="300">
      <defs>
        <linearGradient id="kg" x1="0" x2="1">
          <stop stopColor="#7257E8" />
          <stop offset="1" stopColor="#25A98E" />
        </linearGradient>
      </defs>
      <path
        d={`M35 235Q150 ${70 + Math.sin(f / 25) * 25} 285 220T725 ${80 + Math.cos(f / 29) * 30}`}
        fill="none"
        stroke="url(#kg)"
        strokeWidth="42"
        strokeLinecap="round"
      />
      <path
        d={`M45 235Q180 145 330 225T715 95`}
        fill="none"
        stroke="#FFFFFF44"
        strokeWidth="4"
        strokeDasharray="16 12"
        strokeDashoffset={-f}
      />
      {kind === "foldingPin" && (
        <>
          <path
            d="M365 35c-55 0-100 43-100 96 0 76 100 132 100 132s100-56 100-132c0-53-45-96-100-96Z"
            fill="#7257E8CC"
          />
          <text
            x="365"
            y="145"
            textAnchor="middle"
            fill="white"
            fontSize="25"
            fontWeight="950"
          >
            KONUM
          </text>
        </>
      )}
      {kind === "continentBridge" && (
        <>
          <text x="85" y="65" fill="#A897FF" fontSize="26" fontWeight="950">
            AVRUPA
          </text>
          <text x="570" y="248" fill="#6CE5D0" fontSize="26" fontWeight="950">
            ASYA
          </text>
          <rect x={scan} y="150" width="40" height="24" rx="8" fill="#FFD166" />
        </>
      )}
      {kind === "terrainMachine" && (
        <>
          {["DAĞ", "OVA", "PLATO", "VADİ"].map((x, i) => (
            <g
              key={x}
              transform={`translate(${100 + i * 170} ${80 + Math.sin(f / 22 + i) * 45})`}
            >
              <circle
                r="45"
                fill={["#A897FF", "#FFD166", "#6CE5D0", "#FF6F78"][i]}
              />
              <text
                y="6"
                textAnchor="middle"
                fill="#11182C"
                fontSize="18"
                fontWeight="950"
              >
                {x}
              </text>
            </g>
          ))}
        </>
      )}
      {kind === "liquidCoast" && (
        <>
          <path
            d={`M90 70H400Q${470 + Math.sin(f / 22) * 35} 145 390 230H90Z`}
            fill="#EBCB72"
          />
          <ellipse cx="590" cy="105" rx="65" ry="42" fill="#EBCB72" />
          <circle
            cx="585"
            cy="225"
            r="42"
            fill="#62BCEB"
            stroke="#EBCB72"
            strokeWidth="20"
          />
        </>
      )}
      {kind === "isometricNetwork" && (
        <>
          {[100, 270, 450, 625].map((x, i) => (
            <g key={x} transform={`translate(${x} ${205 - i * 30})`}>
              <path
                d="m0 0 55-32 55 32-55 32Z"
                fill={["#7257E8", "#25A98E", "#F6BC46", "#E65068"][i]}
              />
              <circle cx="55" cy="-5" r="14" fill="white" />
            </g>
          ))}
        </>
      )}
      {kind === "resultScanner" && (
        <>
          <circle
            cx="380"
            cy="145"
            r="105"
            fill="#7257E844"
            stroke="#6CE5D0"
            strokeWidth="5"
          />
          <path
            d={`M${scan} 35v220`}
            stroke="#B7FFF8"
            strokeWidth="8"
            opacity=".8"
          />
          <text
            x="380"
            y="135"
            textAnchor="middle"
            fill="white"
            fontSize="23"
            fontWeight="950"
          >
            ÇEVRE → BAĞLANTI
          </text>
          <text
            x="380"
            y="175"
            textAnchor="middle"
            fill="#FFD166"
            fontSize="28"
            fontWeight="950"
          >
            SONUÇ
          </text>
        </>
      )}
    </svg>
  );
};
const KurzBg = ({ i }: { i: number }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${20 + i * 11}% 15%,#7257E833,transparent 33%),linear-gradient(145deg,#09152F,#050914)`,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 28 }).map((_, k) => (
        <i
          key={k}
          style={{
            position: "absolute",
            left: (k * 173 + i * 53) % 950,
            top: (k * 97) % 530,
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: k % 2 ? "white" : "#6CE5D0",
            opacity: 0.16,
            transform: `translateY(${Math.sin(f / 25 + k) * 5}px)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
const KurzScene = ({ index }: { index: number }) => {
  const f = useCurrentFrame(),
    s = data.kurz[index],
    e = pop(f);
  return (
    <AbsoluteFill style={{ fontFamily: "Trebuchet MS,Arial", color: "white" }}>
      <KurzBg i={index} />
      <div style={{ position: "absolute", left: 46, top: 38 }}>
        <Label color={index % 2 ? mint : violet}>
          5. SINIF • SOSYAL • KONUM LABORATUVARI
        </Label>
      </div>
      <div
        style={{
          position: "absolute",
          left: 46,
          top: 86,
          fontSize: 32,
          fontWeight: 950,
          opacity: e,
        }}
      >
        {s.title}
      </div>
      <div
        style={{
          position: "absolute",
          left: 47,
          top: 127,
          fontSize: 16,
          fontWeight: 750,
          color: "#BFD0E8",
        }}
      >
        {s.lead}
      </div>
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 178,
          width: 790,
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <KurzGraphic kind={s.kind} />
      </div>
      <div
        style={{
          position: "absolute",
          right: 20,
          bottom: 15,
          transform: "scale(.72)",
          transformOrigin: "bottom right",
        }}
      >
        <Lumi />
      </div>
      <div
        style={{
          position: "absolute",
          left: 47,
          bottom: 24,
          width: 170,
          height: 4,
          borderRadius: 4,
          background: "#FFFFFF1A",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${interpolate(f, [0, kurzFrames(index)], [0, 100], clamp)}%`,
            background: index % 2 ? "#6CE5D0" : "#A897FF",
          }}
        />
      </div>
      <Audio
        playbackRate={KURZ_RATE}
        src={staticFile(`audio/sosyal/konum/kurz/${s.id}.mp3`)}
      />
    </AbsoluteFill>
  );
};
export const Kurz = () => (
  <AbsoluteFill>
    <Canvas>
      {data.kurz.map((_, i) => (
        <Sequence key={i} from={kurzStart(i)} durationInFrames={kurzFrames(i)}>
          <KurzScene index={i} />
        </Sequence>
      ))}
      <Channel />
    </Canvas>
  </AbsoluteFill>
);

const Choice = ({
  text,
  i,
  correct,
  reveal,
}: {
  text: string;
  i: number;
  correct: boolean;
  reveal: boolean;
}) => (
  <div
    style={{
      height: 104,
      borderRadius: 24,
      background: reveal && correct ? "#DDF8EE" : "white",
      border: `4px solid ${reveal && correct ? mint : "#E9B7C1"}`,
      display: "flex",
      alignItems: "center",
      padding: "0 22px",
      boxSizing: "border-box",
      fontSize: 25,
      fontWeight: 900,
      color: navy,
      boxShadow: "0 10px 22px #173B6612",
    }}
  >
    <span
      style={{
        width: 55,
        height: 55,
        borderRadius: 16,
        background: reveal && correct ? mint : coral,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 18,
      }}
    >
      {"ABCD"[i]}
    </span>
    {text}
    {reveal && correct && (
      <b style={{ marginLeft: "auto", fontSize: 50, color: mint }}>✓</b>
    )}
  </div>
);
export const Short = ({ index = 0 }: { index?: number }) => {
  const f = useCurrentFrame(),
    s = data.shorts[index],
    t = timings.shorts[index],
    choices = f >= t.qEnd,
    reveal = f >= t.reveal,
    congrats = f >= t.congrats,
    count = Math.max(1, 5 - Math.floor((f - t.qEnd) / 30));
  return (
    <AbsoluteFill
      style={{
        fontFamily: "Trebuchet MS,Arial",
        background: "linear-gradient(155deg,#EDF8FF,#FFF 57%,#FFF0ED)",
        color: navy,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 38,
          top: 42,
          display: "flex",
          gap: 14,
          alignItems: "center",
        }}
      >
        <Label>5. SINIF</Label>
        <Label color={violet}>SOSYAL BİLGİLER</Label>
        <span style={{ width: 390, height: 3, background: "#C7DBEA" }} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 28,
          right: 28,
          top: 130,
          height: 390,
          borderRadius: 34,
          background: "white",
          border: "3px solid #D6E6F2",
          boxShadow: "0 18px 40px #173B6618",
          padding: "38px 42px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: 23,
            fontWeight: 950,
            color: violet,
            letterSpacing: 1,
          }}
        >
          HIZLI SORU • GÖRECELİ KONUM
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 37,
            lineHeight: 1.15,
            fontWeight: 950,
          }}
        >
          {s.question}
        </div>
        <div
          style={{
            position: "absolute",
            left: 42,
            bottom: 28,
            padding: "10px 16px",
            borderRadius: 14,
            background: "#EEF6FB",
            fontSize: 17,
            fontWeight: 900,
          }}
        >
          {s.strip}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 555,
          width: 960,
          height: 300,
        }}
      >
        <svg width="960" height="300" viewBox="0 0 960 300">
          <rect x="0" y="55" width="430" height="190" rx="30" fill="#DFF4FF" />
          <rect
            x="530"
            y="55"
            width="430"
            height="190"
            rx="30"
            fill="#DFF4FF"
          />
          <path d="M0 245H430M530 245H960" stroke="#42A9D6" strokeWidth="20" />
          <path
            d="M60 240q70-145 140 0t150 0"
            fill="none"
            stroke="#54765A"
            strokeWidth="38"
          />
          <path
            d="M585 240 650 90l65 150 70-150 80 150"
            fill="none"
            stroke="#54765A"
            strokeWidth="38"
          />
          <g transform={`translate(${210 + 120 * Math.sin(f / 42)} 220)`}>
            <rect width="50" height="24" rx="8" fill={coral} />
            <circle cx="12" cy="25" r="8" fill={navy} />
            <circle cx="39" cy="25" r="8" fill={navy} />
          </g>
          <g transform={`translate(${735 + 125 * Math.sin(f / 45 + 1)} 220)`}>
            <rect width="50" height="24" rx="8" fill={amber} />
            <circle cx="12" cy="25" r="8" fill={navy} />
            <circle cx="39" cy="25" r="8" fill={navy} />
          </g>
          <text
            x="215"
            y="35"
            textAnchor="middle"
            fontSize="26"
            fontWeight="950"
            fill={navy}
          >
            A KIYISI
          </text>
          <text
            x="745"
            y="35"
            textAnchor="middle"
            fontSize="26"
            fontWeight="950"
            fill={navy}
          >
            B KIYISI
          </text>
        </svg>
      </div>
      {choices && (
        <>
          <div
            style={{
              position: "absolute",
              left: 32,
              top: 875,
              width: 745,
              display: "grid",
              gap: 16,
            }}
          >
            {s.choices.map((x, i) => (
              <Choice
                key={x}
                text={x}
                i={i}
                correct={i === s.correct}
                reveal={reveal}
              />
            ))}
          </div>
          <GifCharacter name="ibrahim" x={950} y={1110} scale={1.12} animate />
          {!reveal && (
            <div
              style={{
                position: "absolute",
                left: 300,
                top: 1370,
                width: 190,
                height: 190,
                borderRadius: "50%",
                border: `14px solid ${blue}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: blue,
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: 78, lineHeight: 0.86, fontWeight: 950 }}>
                {count}
              </div>
              <div
                style={{
                  marginTop: 15,
                  fontSize: 21,
                  lineHeight: 1,
                  fontWeight: 950,
                  letterSpacing: 2,
                  color: coral,
                }}
              >
                DÜŞÜN!
              </div>
            </div>
          )}
        </>
      )}
      {congrats && (
        <div
          style={{
            position: "absolute",
            left: 40,
            right: 40,
            bottom: 90,
            height: 190,
            borderRadius: 34,
            background: "#FFF",
            border: `5px solid ${coral}`,
            boxShadow: "0 18px 40px #E6506830",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 72,
            fontWeight: 950,
            color: coral,
          }}
        >
          Tebrikler!
        </div>
      )}
      <Audio
        src={staticFile(`audio/sosyal/konum/shorts/${index + 1}/question.mp3`)}
      />
      <Sequence from={t.reveal} durationInFrames={t.aEnd - t.reveal}>
        <Audio
          src={staticFile(`audio/sosyal/konum/shorts/${index + 1}/answer.mp3`)}
          startFrom={12}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
