import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import data from "../../content/mezopotamya.json";
import timings from "./timings.json";
import { GifCharacter } from "../GifCharacter";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";
import { CtaOptionOne } from "../previews/cta-option-1/CtaOptionOne";

const C = {
  ink: "#101820",
  turquoise: "#3AD6C5",
  amber: "#FFB454",
  white: "#FFFFFF",
  coral: "#EF6A63",
  blue: "#3979B8",
  muted: "#607080",
};
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const sum = (items: { frames: number }[], until = items.length) =>
  items.slice(0, until).reduce((n, x) => n + x.frames, 0);
export const mainDuration = () => sum(timings.main) + 210;
export const kurzDuration = () => sum(timings.kurz);

const Pop = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig();
  const p = spring({
    frame: f - delay,
    fps,
    config: { damping: 16, stiffness: 105, mass: 0.8 },
  });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 18}px) scale(${0.96 + 0.04 * p})`,
      }}
    >
      {children}
    </div>
  );
};
const Header = ({ title }: { title: string }) => (
  <div
    style={{
      position: "absolute",
      top: 28,
      left: 34,
      right: 34,
      height: 64,
      display: "flex",
      alignItems: "center",
      borderBottom: `3px solid ${C.turquoise}`,
    }}
  >
    <div
      style={{
        fontSize: 13,
        fontWeight: 900,
        letterSpacing: 1.5,
        color: C.coral,
      }}
    >
      5. SINIF • SOSYAL BİLGİLER
    </div>
    <div
      style={{ marginLeft: 18, fontSize: 27, fontWeight: 950, color: C.ink }}
    >
      {title}
    </div>
  </div>
);
const River = () => {
  const f = useCurrentFrame();
  const x = interpolate(f, [0, 120], [0, 18], clamp);
  return (
    <svg width="100%" height="100%" viewBox="0 0 500 260">
      <path
        d={`M70 0C${175 + x} 55 ${80 - x} 115 225 170S355 225 430 260`}
        fill="none"
        stroke="#5CC8E8"
        strokeWidth="34"
        strokeLinecap="round"
      />
      <path
        d={`M415 0C${330 - x} 58 ${430 + x} 120 290 260`}
        fill="none"
        stroke="#64B9E0"
        strokeWidth="32"
        strokeLinecap="round"
      />
      <circle cx="245" cy="132" r="62" fill="#D8F2C0" />
      <text
        x="245"
        y="130"
        textAnchor="middle"
        fontSize="25"
        fontWeight="900"
        fill={C.ink}
      >
        MÜNBİT
      </text>
      <text
        x="245"
        y="158"
        textAnchor="middle"
        fontSize="25"
        fontWeight="900"
        fill={C.ink}
      >
        HİLAL
      </text>
      <text x="100" y="56" fontSize="21" fontWeight="900" fill={C.blue}>
        FIRAT
      </text>
      <text x="350" y="58" fontSize="21" fontWeight="900" fill={C.blue}>
        DİCLE
      </text>
    </svg>
  );
};
const Tablet = () => {
  const f = useCurrentFrame();
  return (
    <svg width="100%" height="100%" viewBox="0 0 500 260">
      <rect
        x="125"
        y="20"
        width="250"
        height="218"
        rx="28"
        fill="#D7A56A"
        stroke={C.ink}
        strokeWidth="7"
      />
      <g stroke={C.ink} strokeWidth="7" strokeLinecap="round">
        {Array.from({ length: 5 }, (_, i) => (
          <path
            key={i}
            d={`M165 ${65 + i * 30}l45 12m20-12 44 12m-105 8 25 10m75 0 27 10`}
          />
        ))}
      </g>
      <circle
        cx="250"
        cy="130"
        r={interpolate(f, [0, 55], [8, 28], clamp)}
        fill={C.turquoise}
        opacity=".85"
      />
    </svg>
  );
};
const Visual = ({ kind }: { kind: string }) => {
  const f = useCurrentFrame();
  if (kind === "nehir") return <River />;
  if (kind === "sumer") return <Tablet />;
  if (kind === "sumerKatki")
    return (
      <div
        style={{
          display: "flex",
          gap: 22,
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {["◷\nTAKVİM", "◉\nTEKERLEK", "+ − × ÷\nMATEMATİK"].map((x, i) => (
          <Pop key={x} delay={i * 10}>
            <div
              style={{
                whiteSpace: "pre-line",
                width: 128,
                height: 128,
                borderRadius: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontWeight: 950,
                fontSize: 20,
                color: C.ink,
                background: ["#FFF0CE", "#DDF7F3", "#E6EFFD"][i],
              }}
            >
              {x}
            </div>
          </Pop>
        ))}
      </div>
    );
  if (kind === "babil")
    return (
      <svg width="100%" height="100%" viewBox="0 0 500 260">
        <path
          d="M70 225h360L350 72H150Z"
          fill="#E7A85D"
          stroke={C.ink}
          strokeWidth="7"
        />
        <path
          d="M205 225V126h90v99"
          fill="#315FAD"
          stroke={C.ink}
          strokeWidth="7"
        />
        <path d="M150 72h200" stroke={C.coral} strokeWidth="18" />
        <path d="M92 55h316" stroke={C.turquoise} strokeWidth="15" />
        <path
          d="M100 45q20-35 40 0t40 0t40 0t40 0t40 0t40 0"
          fill="none"
          stroke="#3B9A55"
          strokeWidth="10"
        />
      </svg>
    );
  if (kind === "asur")
    return (
      <svg width="100%" height="100%" viewBox="0 0 500 260">
        <path
          d="M90 200C145 165 170 115 255 120S345 98 416 52"
          fill="none"
          stroke={C.coral}
          strokeWidth="12"
          strokeDasharray="18 12"
        />
        <path
          d="M72 172h80v56H72zM348 30h90v84h-90z"
          fill="#FFE0A9"
          stroke={C.ink}
          strokeWidth="6"
        />
        <text
          x="112"
          y="205"
          textAnchor="middle"
          fontSize="18"
          fontWeight="900"
        >
          KÜLTEPE
        </text>
        <text x="393" y="82" textAnchor="middle" fontSize="18" fontWeight="900">
          NİNOVA
        </text>
        <g fill={C.blue}>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={190 + i * 43} cy={145 - i * 8} r="18" />
          ))}
        </g>
      </svg>
    );
  if (kind === "miras")
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 18,
        }}
      >
        {["YAZI", "HUKUK", "BİLGİ"].map((t, i) => (
          <Pop key={t} delay={i * 12}>
            <div
              style={{
                width: 128,
                height: 128,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: [C.turquoise, C.amber, C.coral][i],
                color: C.ink,
                fontWeight: 950,
                fontSize: 22,
              }}
            >
              {t}
            </div>
          </Pop>
        ))}
      </div>
    );
  return (
    <svg width="100%" height="100%" viewBox="0 0 500 260">
      <path
        d="M105 210V75l68-45 68 45v135M270 210V92l64-42 64 42v118"
        fill="#DCEEFF"
        stroke={C.ink}
        strokeWidth="7"
      />
      <path d="M70 218h360" stroke={C.turquoise} strokeWidth="15" />
      <text x="250" y="245" textAnchor="middle" fontSize="24" fontWeight="900">
        ANADOLU ↔ MEZOPOTAMYA
      </text>
    </svg>
  );
};
const MainScene = ({ index }: { index: number }) => {
  const s = data.main[index],
    f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    left = s.speaker === "filiz",
    t = timings.main[index],
    talking = f < t.audioFrames;
  return (
    <AbsoluteFill
      style={{
        background: C.white,
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <Header title={s.title} />
      <div
        style={{
          position: "absolute",
          left: left ? 230 : 52,
          top: 118,
          width: 470,
        }}
      >
        <Pop delay={4}>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.12,
              fontWeight: 950,
              color: C.ink,
            }}
          >
            {s.lead}
          </div>
        </Pop>
        <div
          style={{
            marginTop: 24,
            padding: "15px 18px",
            borderLeft: `8px solid ${C.amber}`,
            background: "#FFF9EC",
            fontSize: 19,
            lineHeight: 1.32,
            fontWeight: 750,
            color: C.ink,
          }}
        >
          {index === 0
            ? "Hitit • Frig • İyon • Urartu • Lidya | Sümer • Babil • Asur"
            : index === 2
              ? "Şehir devletleri • ensi/patesi • ziggurat"
              : index === 3
                ? "Ay yılı • Urgakina • tekerlek • geometri"
                : index === 4
                  ? "Hammurabi • İştar Kapısı • Asma Bahçeler"
                  : index === 5
                    ? "Kültepe/Kaniş Karumu • Ninova Kütüphanesi"
                    : "Neden–sonuç ilişkisini haritada izle."}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: left ? 250 : 70,
          top: 315,
          width: 560,
          height: 185,
        }}
      >
        <Visual kind={s.kind} />
      </div>
      <GifCharacter
        name={s.speaker as "filiz" | "ibrahim"}
        x={left ? 106 : 856}
        y={156}
        scale={1.04}
        flip={!left}
        animate={talking}
      />
      <Audio src={staticFile(`audio/sosyal/mezopotamya/main/${s.id}.mp3`)} />
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          bottom: 25,
          height: 7,
          borderRadius: 6,
          background: "#DDE5E7",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 6,
            width: `${interpolate(f, [0, t.frames], [0, 100], clamp)}%`,
            background: C.turquoise,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
export const Main = () => (
  <AbsoluteFill>
    {timings.main.map((_, i) => (
      <Sequence
        key={i}
        from={sum(timings.main, i)}
        durationInFrames={timings.main[i].frames}
        premountFor={30}
      >
        <MainScene index={i} />
      </Sequence>
    ))}
      <Sequence from={870} durationInFrames={210}>
        <ChannelLowerThird />
      </Sequence>
    <Sequence from={sum(timings.main)} durationInFrames={210} premountFor={30}>
        <CtaOptionOne whiteBackground safeCharacters />
    </Sequence>
  </AbsoluteFill>
);

const Lumi = ({side = "right"}: {side?: "left" | "right"}) => {
  const f = useCurrentFrame();
  return (
    <svg width="190" height="290" viewBox="0 0 240 360" style={{position:"absolute",[side]:42,bottom:35,translate:`0 ${Math.sin(f/14)*6}px`,filter:"drop-shadow(0 18px 0 #08052A55)"}}>
      <path d="M120 42V12" stroke="#00E5FF" strokeWidth="11" strokeLinecap="round"/><circle cx="120" cy="15" r="14" fill="#FFE600"/>
      <rect x="35" y="50" width="170" height="138" rx="54" fill="#00E5FF" stroke="#FFF7D6" strokeWidth="10"/><rect x="62" y="88" width="116" height="62" rx="23" fill="#110B45"/>
      <circle cx="94" cy="118" r="14" fill="#FFE600"/><circle cx="147" cy="118" r="14" fill="#FFE600"/><rect x="70" y="202" width="100" height="105" rx="35" fill="#6B14D9" stroke="#00E5FF" strokeWidth="9"/>
      <path d="M67 222L22 266M173 222l45 44M91 302l-13 42m71-42 13 42" stroke="#00E5FF" strokeWidth="22" strokeLinecap="round"/><circle cx="22" cy="266" r="18" fill="#FFE600"/><circle cx="218" cy="266" r="18" fill="#FFE600"/>
    </svg>
  );
};
const KurzEvent=({index}:{index:number})=>{const f=useCurrentFrame();const p=interpolate(f,[0,120],[0,1],clamp);const labels=["DİCLE  +  FIRAT","TABLET → YAZI","KURAL → DENGE","KÜLTEPE → ANADOLU","ORTAK MİRAS"];return <svg width="620" height="360" viewBox="0 0 620 360" style={{position:"absolute",left:150,top:125}}>{index===0&&<><path d="M80 20Q250 130 175 330M540 20Q370 130 445 330" fill="none" stroke="#00E5FF" strokeWidth="46"/><circle cx="310" cy="205" r={90*p} fill="#65F23A"/><text x="310" y="215" textAnchor="middle" fontSize="28" fontWeight="900" fill="#110B45">MÜNBİT HİLAL</text></>}{index===1&&<><rect x="185" y="38" width="250" height="275" rx="32" fill="#FFB454" stroke="#FFF7D6" strokeWidth="10"/>{Array.from({length:6},(_,i)=><path key={i} d={`M230 ${92+i*31}l55 12m34-12 55 12`} stroke="#110B45" strokeWidth="9" strokeLinecap="round"/>)}<circle cx="310" cy="172" r={32*p} fill="#00E5FF"/></>}{index===2&&<><path d="M310 45v230M175 118h270" stroke="#FFE600" strokeWidth="20"/><circle cx={310-120*p} cy="118" r="54" fill="#FF247D"/><circle cx={310+120*p} cy="118" r="54" fill="#00E5FF"/><path d="M165 280h290" stroke="#FF6B00" strokeWidth="42"/></>}{index===3&&<><path d={`M80 270Q${310*p} 75 540 115`} fill="none" stroke="#FFE600" strokeWidth="20" strokeDasharray="26 15"/><rect x="55" y="240" width="115" height="70" rx="16" fill="#FF6B00"/><rect x="445" y="75" width="115" height="70" rx="16" fill="#00E5FF"/><text x="113" y="284" textAnchor="middle" fontSize="19" fontWeight="900" fill="#110B45">KÜLTEPE</text><text x="502" y="119" textAnchor="middle" fontSize="19" fontWeight="900" fill="#110B45">NİNOVA</text></>}{index===4&&["YAZI","HUKUK","BİLGİ"].map((x,i)=><g key={x} transform={`translate(${130+i*180} 175) scale(${p})`}><circle r="70" fill={["#00E5FF","#FF247D","#FFE600"][i]}/><text y="8" textAnchor="middle" fontSize="23" fontWeight="900" fill="#110B45">{x}</text></g>)}<text x="310" y="345" textAnchor="middle" fill="#FFF7D6" fontSize="34" fontWeight="950">{labels[index]}</text></svg>};
const KurzScene = ({ index }: { index: number }) => {
  const s = data.kurz[index],
    f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    colors = ["#102B58", "#5B236D", "#00706E", "#A83D52", "#1B5D8C"],
    icons = [
      "DİCLE + FIRAT",
      "ÇİVİ YAZISI",
      "HUKUK + YAPI",
      "TİCARET + KÜTÜPHANE",
      "ORTAK MİRAS",
    ];
  return (
    <AbsoluteFill
      style={{
        background: colors[index],
        fontFamily: "Arial, sans-serif",
        color: "white",
        overflow: "hidden",
      }}
    >
      <KurzEvent index={index}/>
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 65,
          width: 760,
          fontSize: 52,
          lineHeight: 1.12,
          fontWeight: 950,
        }}
      >
        {icons[index]}
      </div>
      <div
        style={{
          position: "absolute",
          display: "none",
          left: 72,
          top: 462,
          width: 650,
          fontSize: 16,
          lineHeight: 1.25,
          fontWeight: 750,
          opacity:.88,
        }}
      >
        {s.text}
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          bottom: 68,
          width: 610,
          height: 16,
          borderRadius: 12,
          background: "rgba(255,255,255,.25)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${interpolate(f, [0, timings.kurz[index].frames], [0, 100], clamp)}%`,
            background: "#FFDC53",
            borderRadius: 12,
          }}
        />
      </div>
      <Lumi side={index % 2 ? "left" : "right"}/>
      <Audio src={staticFile(`audio/sosyal/mezopotamya/kurz/${s.id}.mp3`)} />
    </AbsoluteFill>
  );
};
export const Kurz = () => (
  <AbsoluteFill>
    {timings.kurz.map((_, i) => (
      <Sequence
        key={i}
        from={sum(timings.kurz, i)}
        durationInFrames={timings.kurz[i].frames}
        premountFor={30}
      >
        <KurzScene index={i} />
      </Sequence>
    ))}
      <Sequence from={870} durationInFrames={210}>
        <ChannelLowerThird />
      </Sequence>
  </AbsoluteFill>
);

export const Short = () => {
  const f = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = timings.shorts[0],
    spec = data.shorts[0],
    choices = f >= t.qEnd,
    reveal = f >= t.reveal,
    congrats = f >= t.congrats;
  const remain = Math.max(1, Math.ceil((t.reveal - f) / 30));
  return (
    <AbsoluteFill
      style={{
        background: "#fff",
        fontFamily: "Arial, sans-serif",
        color: C.ink,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 46,
          right: 46,
          borderBottom: `5px solid ${C.turquoise}`,
          paddingBottom: 25,
        }}
      >
        <b style={{ fontSize: 30, color: C.coral }}>5. SINIF</b>
        <b style={{ fontSize: 30, marginLeft: 24 }}>SOSYAL BİLGİLER</b>
      </div>
      <div
        style={{
          position: "absolute",
          left: 46,
          right: 46,
          top: 188,
          padding: 35,
          borderRadius: 34,
          background: "#F5FAFF",
          boxShadow: "0 14px 32px #18315320",
        }}
      >
        <div style={{ fontWeight: 950, color: C.coral, fontSize: 28 }}>
          HIZLI SORU • MEZOPOTAMYA
        </div>
        <div
          style={{
            marginTop: 25,
            fontSize: 49,
            lineHeight: 1.15,
            fontWeight: 950,
          }}
        >
          {spec.question}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 550,
          left: 120,
          width: 510,
          height: 290,
          borderRadius: 40,
          background: "#DDF7F3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 70,
          fontWeight: 950,
          color: C.blue,
        }}
      >
        𒀀 → ANADOLU
      </div>
      {choices && (
        <div style={{ position: "absolute", left: 48, right: 48, top: 900 }}>
          {spec.options.map((x, i) => (
            <div
              key={x}
              style={{
                marginBottom: 16,
                padding: "21px 25px",
                borderRadius: 24,
                background:
                  reveal && i === spec.correct ? "#D9F6DE" : "#F3F6F8",
                border: `4px solid ${reveal && i === spec.correct ? "#39A852" : "#D5E0E6"}`,
                fontSize: 31,
                fontWeight: 900,
              }}
            >
              {"ABCD"[i]}. {x}
            </div>
          ))}
        </div>
      )}
      {choices && !reveal && (
        <div
          style={{
            position: "absolute",
            left: 58,
            top: 1630,
            width: 290,
            height: 150,
            borderRadius: "50%",
            background: C.amber,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 70,
            fontWeight: 950,
          }}
        >
          {remain}
        </div>
      )}
      <GifCharacter
        name="ibrahim"
        x={890}
        y={1510}
        scale={1.86}
        flip
        animate={f < t.aEnd}
      />
      {congrats && (
        <div
          style={{
            position: "absolute",
            left: 46,
            right: 46,
            bottom: 80,
            padding: 28,
            borderRadius: 28,
            background: "#D9F6DE",
            fontSize: 44,
            fontWeight: 950,
            textAlign: "center",
          }}
        >
          Tebrikler!
        </div>
      )}
      <Audio src={staticFile("audio/sosyal/mezopotamya/shorts/question.mp3")} />
      <Sequence from={t.reveal}>
        <Audio src={staticFile("audio/sosyal/mezopotamya/shorts/answer.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
