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

const P = {
  navy: "#110B45",
  purple: "#6B14D9",
  cyan: "#00E5FF",
  pink: "#FF247D",
  orange: "#FF6B00",
  yellow: "#FFE600",
  lime: "#65F23A",
  cream: "#FFF7D6",
  ink: "#17104A",
};
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const start = (i: number) =>
  timings.kurz2.slice(0, i).reduce((n, x) => n + x.frames, 0);
const pop = (f: number, d = 0) =>
  spring({
    frame: f - d,
    fps: 30,
    config: { damping: 16, stiffness: 120, mass: 0.75 },
  });

const Lumi = ({ side }: { side: "left" | "right" }) => {
  const f = useCurrentFrame();
  const x = side === "left" ? 10 : 1645;
  const bob = Math.sin(f / 14) * 7;
  return (
    <svg
      width="240"
      height="360"
      viewBox="0 0 240 360"
      style={{
        position: "absolute",
        left: x,
        top: 610 + bob,
        filter: "drop-shadow(0 22px 0 #08052A66)",
      }}
    >
      <path
        d="M120 42V12"
        stroke={P.cyan}
        strokeWidth="11"
        strokeLinecap="round"
      />
      <circle cx="120" cy="15" r="14" fill={P.yellow} />
      <rect
        x="35"
        y="50"
        width="170"
        height="138"
        rx="54"
        fill={P.cyan}
        stroke={P.cream}
        strokeWidth="10"
      />
      <rect x="62" y="88" width="116" height="62" rx="23" fill={P.navy} />
      <circle cx="94" cy="118" r="14" fill={P.yellow} />
      <circle cx="147" cy="118" r="14" fill={P.yellow} />
      <rect
        x="70"
        y="202"
        width="100"
        height="105"
        rx="35"
        fill={P.purple}
        stroke={P.cyan}
        strokeWidth="9"
      />
      <path
        d="M67 222L22 266M173 222l45 44M91 302l-13 42m71-42 13 42"
        stroke={P.cyan}
        strokeWidth="22"
        strokeLinecap="round"
      />
      <circle cx="22" cy="266" r="18" fill={P.yellow} />
      <circle cx="218" cy="266" r="18" fill={P.yellow} />
    </svg>
  );
};

const Title = ({ children }: { children: React.ReactNode }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 300,
        right: 300,
        top: 68,
        textAlign: "center",
        color: P.cream,
        opacity: interpolate(f, [0, 8], [0.75, 1], clamp),
        scale: interpolate(pop(f), [0, 1], [0.94, 1]),
      }}
    >
      <div
        style={{
          fontSize: 25,
          fontWeight: 950,
          letterSpacing: 7,
          color: P.cyan,
        }}
      >
        ANADOLU’NUN İLK HAYATI
      </div>
      <div
        style={{
          fontSize: 76,
          fontWeight: 1000,
          letterSpacing: 1,
          marginTop: 12,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const Layers = () => {
  const f = useCurrentFrame();
  const scan = interpolate(f, [8, 120], [330, 1390], clamp);
  return (
    <>
      <svg
        width="1450"
        height="600"
        viewBox="0 0 1450 600"
        style={{ position: "absolute", left: 235, top: 270 }}
      >
        <path
          d="M45 175Q420 115 760 170T1405 175V275Q1050 215 730 275T45 275Z"
          fill={P.orange}
        />
        <path
          d="M45 285Q420 225 760 280T1405 285V385Q1050 325 730 385T45 385Z"
          fill={P.pink}
        />
        <path
          d="M45 395Q420 335 760 390T1405 395V505Q1050 445 730 505T45 505Z"
          fill={P.purple}
        />
        <g opacity={pop(f, 18)}>
          <path d="M315 225l70-42 68 42-34 65h-70Z" fill={P.yellow} />
          <circle cx="740" cy="332" r="56" fill={P.cyan} />
          <path d="M1110 395h120v92h-120Z" fill={P.lime} />
        </g>
        <g transform={`translate(${scan} 40)`}>
          <circle r="112" fill="none" stroke={P.cream} strokeWidth="22" />
          <path
            d="M80 82l105 105"
            stroke={P.cream}
            strokeWidth="32"
            strokeLinecap="round"
          />
          <circle r="82" fill={P.cyan} opacity=".2" />
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 610,
          top: 855,
          width: 700,
          textAlign: "center",
          fontSize: 34,
          fontWeight: 950,
          color: P.yellow,
        }}
      >
        TAŞ ALET • ÇANAK • DUVAR İZİ
      </div>
      <Lumi side="left" />
    </>
  );
};

const Seed = () => {
  const f = useCurrentFrame();
  const grow = pop(f, 12);
  return (
    <>
      <svg
        width="1400"
        height="650"
        viewBox="0 0 1400 650"
        style={{ position: "absolute", left: 260, top: 250 }}
      >
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx="700"
            cy="320"
            r={90 + i * 105 + Math.sin(f / 17 + i) * 8}
            fill="none"
            stroke={[P.cyan, P.pink, P.yellow][i]}
            strokeWidth="18"
            opacity={0.8 - i * 0.16}
          />
        ))}
        <g
          transform={`translate(${700 * (1 - grow)} ${220 * (1 - grow)}) scale(${grow})`}
        >
          <path
            d="M700 105C620 210 610 260 700 330C790 260 780 210 700 105Z"
            fill={P.cyan}
          />
        </g>
        <g opacity={pop(f, 28)}>
          <path d="M270 425l125-105 125 105v135H270Z" fill={P.orange} />
          <rect x="365" y="475" width="55" height="85" fill={P.navy} />
          <path d="M880 425l125-105 125 105v135H880Z" fill={P.pink} />
          <rect x="975" y="475" width="55" height="85" fill={P.navy} />
          <path d="M560 510h280v55H560Z" fill={P.lime} />
          {[590, 650, 710, 770].map((x) => (
            <path
              key={x}
              d={`M${x} 510v-90m0 20q-36-45-58-9m58 9q36-45 58-9`}
              fill="none"
              stroke={P.yellow}
              strokeWidth="16"
              strokeLinecap="round"
            />
          ))}
        </g>
      </svg>
      <div
        style={{
          position: "absolute",
          left: 470,
          top: 855,
          width: 900,
          textAlign: "center",
          fontSize: 36,
          fontWeight: 950,
          color: P.cream,
        }}
      >
        SU + TARIM + EVCİLLEŞTİRME = KALICI KÖY
      </div>
      <Lumi side="right" />
    </>
  );
};

const Sites = () => {
  const f = useCurrentFrame();
  const cards = [
    { x: 270, c: P.cyan, t: "ÇAYÖNÜ", s: "TARIM", k: "grid" },
    { x: 750, c: P.yellow, t: "HACILAR", s: "SERAMİK", k: "pot" },
    { x: 1230, c: P.pink, t: "ÇATALHÖYÜK", s: "ÇATI", k: "roof" },
  ];
  return (
    <>
      <svg
        width="1500"
        height="600"
        viewBox="0 0 1500 600"
        style={{ position: "absolute", left: 210, top: 285 }}
      >
        {cards.map((a, i) => (
          <g
            key={a.t}
            opacity={pop(f, 10 + i * 10)}
            transform={`translate(${a.x - 210} ${45 + Math.sin(f / 18 + i) * 6})`}
          >
            <rect width="410" height="450" rx="62" fill={a.c} />
            <rect
              x="24"
              y="24"
              width="362"
              height="300"
              rx="42"
              fill={P.navy}
            />
            {a.k === "grid" && (
              <>
                {[70, 145, 220, 295].map((x) => (
                  <path
                    key={x}
                    d={`M${x} 70v205`}
                    stroke={P.orange}
                    strokeWidth="16"
                  />
                ))}
                {[90, 165, 240].map((y) => (
                  <path
                    key={y}
                    d={`M55 ${y}h300`}
                    stroke={P.orange}
                    strokeWidth="16"
                  />
                ))}
              </>
            )}
            {a.k === "pot" && (
              <>
                <path
                  d="M115 82q-35 70 5 115l15 75q70 43 140 0l15-75q40-45 5-115Z"
                  fill={P.orange}
                />
                <path
                  d="M135 180l140 77m0-77-140 77"
                  stroke={P.pink}
                  strokeWidth="18"
                />
              </>
            )}
            {a.k === "roof" && (
              <>
                <rect x="68" y="145" width="274" height="130" fill={P.orange} />
                <path d="M55 145h300" stroke={P.cyan} strokeWidth="22" />
                <rect x="182" y="130" width="50" height="28" fill={P.yellow} />
                <path
                  d="M207 158v110"
                  stroke={P.yellow}
                  strokeWidth="12"
                  strokeDasharray="18 14"
                />
              </>
            )}
            <text
              x="205"
              y="370"
              textAnchor="middle"
              fill={P.ink}
              fontSize="37"
              fontWeight="1000"
            >
              {a.t}
            </text>
            <text
              x="205"
              y="416"
              textAnchor="middle"
              fill={P.ink}
              fontSize="25"
              fontWeight="950"
            >
              {a.s}
            </text>
          </g>
        ))}
      </svg>
      <Lumi side="left" />
    </>
  );
};

const Ritual = () => {
  const f = useCurrentFrame();
  const rot = interpolate(f, [0, 210], [0, 22], clamp);
  return (
    <>
      <svg
        width="1450"
        height="650"
        viewBox="0 0 1450 650"
        style={{ position: "absolute", left: 235, top: 260 }}
      >
        <circle cx="730" cy="335" r="265" fill={P.purple} />
        <circle cx="730" cy="335" r="205" fill={P.orange} />
        <circle cx="730" cy="335" r="125" fill={P.navy} />
        <g transform={`rotate(${rot} 730 335)`}>
          {[0, 60, 120, 180, 240, 300].map((a, i) => (
            <g key={a} transform={`rotate(${a} 730 335) translate(730 92)`}>
              <rect
                x="-25"
                y="0"
                width="50"
                height="130"
                rx="10"
                fill={i % 2 ? P.cyan : P.yellow}
              />
              <rect
                x="-50"
                y="-18"
                width="100"
                height="38"
                rx="10"
                fill={i % 2 ? P.cyan : P.yellow}
              />
            </g>
          ))}
        </g>
        <g opacity={pop(f, 25)}>
          <path d="M690 288h80v185h-80Z" fill={P.cream} />
          <path d="M650 270h160v58H650Z" fill={P.cream} />
        </g>
        {Array.from({ length: 14 }, (_, i) => (
          <circle
            key={i}
            cx={170 + ((i * 91) % 1100)}
            cy={90 + ((i * 67) % 470)}
            r={5 + (i % 3) * 3}
            fill={i % 2 ? P.lime : P.pink}
            opacity=".75"
          />
        ))}
      </svg>
      <div
        style={{
          position: "absolute",
          left: 520,
          top: 865,
          width: 880,
          textAlign: "center",
          fontSize: 36,
          fontWeight: 1000,
          color: P.cyan,
        }}
      >
        ORTAK RİTÜEL • ORTAK HAFIZA
      </div>
      <Lumi side="right" />
    </>
  );
};

const Scene = ({ i }: { i: number }) => {
  const f = useCurrentFrame();
  const s = data.kurz2[i];
  return (
    <AbsoluteFill
      style={{
        background: i % 2 ? P.ink : P.navy,
        overflow: "hidden",
        scale: interpolate(f, [0, timings.kurz2[i].frames], [1, 1.025], clamp),
      }}
    >
      {Array.from({ length: 24 }, (_, n) => (
        <i
          key={n}
          style={{
            position: "absolute",
            left: (n * 193) % 1900,
            top: (n * 113) % 1060,
            width: 8 + (n % 3) * 4,
            height: 8 + (n % 3) * 4,
            borderRadius: "50%",
            background: [P.pink, P.cyan, P.yellow, P.lime][n % 4],
            opacity: 0.28,
            translate: `0 ${Math.sin(f / 18 + n) * 8}px`,
          }}
        />
      ))}
      <Title>{s.title}</Title>
      {s.kind === "layers" ? (
        <Layers />
      ) : s.kind === "seed" ? (
        <Seed />
      ) : s.kind === "sites" ? (
        <Sites />
      ) : (
        <Ritual />
      )}
      <Audio
        src={staticFile(
          `audio/sosyal/anadoluda_ilkhayat/kurz2/${String(i + 1).padStart(2, "0")}.mp3`,
        )}
      />
    </AbsoluteFill>
  );
};

export const Kurz2 = () => (
  <AbsoluteFill>
    {data.kurz2.map((_, i) => (
      <Sequence
        key={i}
        from={start(i)}
        durationInFrames={timings.kurz2[i].frames}
      >
        <Scene i={i} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
