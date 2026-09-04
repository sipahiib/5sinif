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
  useVideoConfig,
} from "remotion";
import { GifCharacter } from "../GifCharacter";
import { ChannelLowerThird } from "../previews/channel-lower-third/ChannelLowerThirdPreview";
import { CtaOptionOne } from "../previews/cta-option-1/CtaOptionOne";

type Speaker = "filiz" | "ibrahim";
type Kind =
  | "unity"
  | "definitions"
  | "earthquake"
  | "benefits"
  | "culture"
  | "imece"
  | "history"
  | "global"
  | "losev"
  | "institutions"
  | "summary";
type Scene = {
  id: string;
  speaker: Speaker;
  title: string;
  lead: string;
  facts: string[];
  kind: Kind;
  frames: number;
};
const C = {
  navy: "#173B66",
  blue: "#2D73C7",
  red: "#E55363",
  amber: "#F6BC46",
  mint: "#43B796",
  ink: "#20344A",
  paper: "#F8FBFF",
  line: "#D9E7F3",
};
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const scenes: Scene[] = [
  {
    id: "01",
    speaker: "filiz",
    title: "YARDIMLAŞMA VE DAYANIŞMA",
    lead: "Birlikte yaşamanın temel bağı",
    facts: ["Farklı roller, ortak yaşam", "Birlikten kuvvet doğar"],
    kind: "unity",
    frames: 582,
  },
  {
    id: "02",
    speaker: "ibrahim",
    title: "İKİ KAVRAM, İKİ ANLAM",
    lead: "Destek davranışı ve insanları birleştiren bağ",
    facts: ["Yardımlaşma: birlikte destek", "Dayanışma: ortak duygu ve amaç"],
    kind: "definitions",
    frames: 625,
  },
  {
    id: "03",
    speaker: "filiz",
    title: "BİRLİK UMUT OLUŞTURUR",
    lead: "Uzaklık, dayanışmaya engel değildir",
    facts: ["İhtiyacı fark et", "Güven ve umut paylaş"],
    kind: "earthquake",
    frames: 559,
  },
  {
    id: "04",
    speaker: "ibrahim",
    title: "TOPLUMA SAĞLADIĞI FAYDALAR",
    lead: "Paylaştıkça güçlenen dört değer",
    facts: ["İhtiyaçlar karşılanır", "Sevgi, saygı ve huzur artar"],
    kind: "benefits",
    frames: 647,
  },
  {
    id: "05",
    speaker: "filiz",
    title: "TÜRK KÜLTÜRÜNDE DAYANIŞMA",
    lead: "Yardımlaşma bir yaşam biçimidir",
    facts: ["Komşuyu gözetmek", "Darda kalana el uzatmak"],
    kind: "culture",
    frames: 554,
  },
  {
    id: "06",
    speaker: "ibrahim",
    title: "İMECE: GÖNÜLLÜLERİN GÜCÜ",
    lead: "Herkes işin bir ucundan tutar",
    facts: ["Emek paylaşılır", "Zorluk azalır, bağlar güçlenir"],
    kind: "imece",
    frames: 598,
  },
  {
    id: "07",
    speaker: "filiz",
    title: "TEKÂLİF-İ MİLLİYE RUHU",
    lead: "Zor zamanda ortak amaç için fedakârlık",
    facts: ["İmkânları birleştirmek", "Sorumluluk almak"],
    kind: "history",
    frames: 563,
  },
  {
    id: "08",
    speaker: "ibrahim",
    title: "SINIR TANIMAYAN İYİLİK",
    lead: "Yardım kimliğe değil, ihtiyaca ulaşır",
    facts: ["Ayrım gözetmemek", "Evrensel dayanışma"],
    kind: "global",
    frames: 599,
  },
  {
    id: "09",
    speaker: "filiz",
    title: "SİVİL TOPLUM VE LÖSEV",
    lead: "İyi niyet, düzenli desteğe dönüşür",
    facts: ["Sağlık ve eğitim desteği", "Çocuklar ve aileler için dayanışma"],
    kind: "losev",
    frames: 605,
  },
  {
    id: "10",
    speaker: "ibrahim",
    title: "EĞİTİM, AFET VE İNSANİ YARDIM",
    lead: "Darüşşafaka ve Kızılay",
    facts: ["Karşılıksız eğitim fırsatı", "Kan bağışı ve afet desteği"],
    kind: "institutions",
    frames: 595,
  },
  {
    id: "11",
    speaker: "filiz",
    title: "AKLINDA KALSIN",
    lead: "İhtiyacı fark et, güvenle harekete geç",
    facts: ["Yardımlaşma bir davranıştır", "Dayanışma bizi birleştiren bağdır"],
    kind: "summary",
    frames: 606,
  },
];
const startAt = (i: number) =>
  scenes.slice(0, i).reduce((a, s) => a + s.frames, 0);
const lessonFrames = scenes.reduce((a, s) => a + s.frames, 0);

const FloatingDots = () => {
  const f = useCurrentFrame();
  return (
    <>
      {Array.from({ length: 34 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (i * 193) % 1920,
            top: (i * 127) % 1080,
            width: 5 + (i % 8),
            height: 5 + (i % 8),
            borderRadius: "50%",
            background: i % 3 === 0 ? C.amber : i % 3 === 1 ? C.blue : C.red,
            opacity: 0.07 + (i % 4) * 0.025,
            transform: `translateY(${Math.sin(f / 25 + i) * 8}px)`,
          }}
        />
      ))}
    </>
  );
};
const Person = ({
  x,
  y,
  color,
  delay = 0,
}: {
  x: number;
  y: number;
  color: string;
  delay?: number;
}) => {
  const f = useCurrentFrame();
  const p = spring({
    frame: f - delay,
    fps: 30,
    config: { damping: 13, stiffness: 110 },
  });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%,-50%) scale(${p})`,
      }}
    >
      <div
        style={{
          width: 62,
          height: 62,
          borderRadius: "50%",
          background: color,
          border: `7px solid ${C.ink}`,
          margin: "auto",
        }}
      />
      <div
        style={{
          width: 104,
          height: 92,
          borderRadius: "52px 52px 22px 22px",
          background: color,
          border: `7px solid ${C.ink}`,
          marginTop: 6,
        }}
      />
    </div>
  );
};
const IconCard = ({
  x,
  y,
  label,
  color,
  icon,
  delay = 0,
}: {
  x: number;
  y: number;
  label: string;
  color: string;
  icon: string;
  delay?: number;
}) => {
  const f = useCurrentFrame();
  const p = spring({
    frame: f - delay,
    fps: 30,
    config: { damping: 14, stiffness: 100 },
  });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 245,
        height: 175,
        borderRadius: 34,
        background: "#fff",
        border: `4px solid ${color}33`,
        boxShadow: "0 22px 45px rgba(23,59,102,.13)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transform: `translateY(${(1 - p) * 30}px) scale(${0.9 + p * 0.1})`,
        opacity: p,
      }}
    >
      <div style={{ fontSize: 62 }}>{icon}</div>
      <div
        style={{
          fontSize: 25,
          fontWeight: 950,
          color: C.navy,
          marginTop: 12,
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </div>
  );
};
const Visual = ({ kind }: { kind: Kind }) => {
  const f = useCurrentFrame();
  const pulse = 1 + Math.sin(f / 12) * 0.035;
  if (kind === "unity" || kind === "definitions" || kind === "summary")
    return (
      <div style={{ position: "relative", width: 650, height: 430 }}>
        <svg
          style={{ position: "absolute", inset: 0 }}
          width="650"
          height="430"
        >
          <path
            d="M150 210 C250 70 400 70 500 210 C400 360 250 360 150 210"
            fill="none"
            stroke={C.blue}
            strokeWidth="15"
            strokeDasharray="22 16"
            strokeDashoffset={-f * 0.6}
          />
          <path
            d="M150 210 C260 330 410 330 500 210"
            fill="none"
            stroke={C.red}
            strokeWidth="12"
          />
        </svg>
        <Person x={150} y={220} color={C.red} />
        <Person x={325} y={105} color={C.amber} delay={7} />
        <Person x={500} y={220} color={C.blue} delay={14} />
        <div
          style={{
            position: "absolute",
            left: 267,
            top: 225,
            fontSize: 85,
            transform: `scale(${pulse})`,
          }}
        >
          🤝
        </div>
      </div>
    );
  if (kind === "earthquake")
    return (
      <div style={{ position: "relative", width: 650, height: 430 }}>
        <div
          style={{
            position: "absolute",
            left: 210,
            top: 90,
            width: 240,
            height: 245,
            background: "#fff",
            border: `8px solid ${C.ink}`,
            borderRadius: 20,
            transform: `rotate(${Math.sin(f / 5) * 1.2}deg)`,
            boxShadow: "0 22px 40px rgba(0,0,0,.13)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 45,
              top: 65,
              width: 150,
              height: 110,
              background: "#DDF0FF",
              border: `7px solid ${C.blue}`,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 71,
                top: -7,
                width: 7,
                height: 124,
                background: C.blue,
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: -28,
              top: -80,
              width: 285,
              height: 120,
              background: C.red,
              clipPath: "polygon(50% 0,100% 100%,0 100%)",
            }}
          />
        </div>
        <div style={{ position: "absolute", left: 60, top: 275, fontSize: 70 }}>
          🧸
        </div>
        <div
          style={{ position: "absolute", right: 55, top: 265, fontSize: 70 }}
        >
          📦
        </div>
        <div
          style={{
            position: "absolute",
            left: 145,
            top: 360,
            width: 360,
            height: 12,
            borderRadius: 8,
            background: C.amber,
            transform: `scaleX(${interpolate(f, [5, 70], [0, 1], clamp)})`,
          }}
        />
      </div>
    );
  if (kind === "benefits")
    return (
      <div style={{ position: "relative", width: 650, height: 430 }}>
        {[
          ["İhtiyaç", "🎁", C.red],
          ["Sevgi", "❤️", C.blue],
          ["Güven", "🫶", C.mint],
          ["Huzur", "🏡", C.amber],
        ].map((a, i) => (
          <IconCard
            key={a[0]}
            x={(i % 2) * 285 + 50}
            y={Math.floor(i / 2) * 205 + 20}
            label={a[0]}
            icon={a[1]}
            color={a[2]}
            delay={i * 8}
          />
        ))}
      </div>
    );
  if (kind === "culture")
    return (
      <div style={{ position: "relative", width: 650, height: 430 }}>
        <div
          style={{
            position: "absolute",
            left: 55,
            top: 70,
            width: 540,
            height: 245,
            borderRadius: 55,
            background: "#FFF7E6",
            border: `7px solid ${C.amber}`,
            boxShadow: "0 25px 50px rgba(246,188,70,.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 47,
            fontWeight: 950,
            color: C.navy,
            textAlign: "center",
            padding: 35,
            transform: `scale(${0.96 + spring({ frame: f, fps: 30 }) * 0.04})`,
          }}
        >
          “Bir elin nesi var,
          <br />
          iki elin sesi var.”
        </div>
        <div
          style={{ position: "absolute", left: 210, top: 320, fontSize: 82 }}
        >
          🤲
        </div>
        <div
          style={{ position: "absolute", left: 355, top: 320, fontSize: 82 }}
        >
          ❤️
        </div>
      </div>
    );
  if (kind === "imece")
    return (
      <div style={{ position: "relative", width: 650, height: 430 }}>
        <div
          style={{
            position: "absolute",
            left: 195,
            top: 115,
            width: 270,
            height: 230,
            background: "#FFF4DE",
            border: `8px solid ${C.ink}`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -35,
              top: -105,
              width: 340,
              height: 115,
              background: C.red,
              clipPath: "polygon(50% 0,100% 100%,0 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 95,
              top: 90,
              width: 80,
              height: 140,
              background: C.blue,
            }}
          />
        </div>
        {[80, 165, 480, 565].map((x, i) => (
          <Person
            key={x}
            x={x}
            y={330}
            color={[C.blue, C.mint, C.amber, C.red][i]}
            delay={i * 7}
          />
        ))}
      </div>
    );
  if (kind === "history")
    return (
      <div style={{ position: "relative", width: 650, height: 430 }}>
        <div style={{ position: "absolute", left: 220, top: 35, fontSize: 82 }}>
          🇹🇷
        </div>
        <div
          style={{
            position: "absolute",
            left: 90,
            top: 155,
            width: 470,
            height: 180,
            borderRadius: 38,
            background: "#fff",
            border: `6px solid ${C.red}`,
            boxShadow: "0 25px 55px rgba(229,83,99,.17)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {["🥾", "🌾", "🧥", "🛞"].map((x, i) => (
            <span
              key={x}
              style={{
                fontSize: 70,
                transform: `translateY(${Math.sin(f / 10 + i) * 7}px)`,
              }}
            >
              {x}
            </span>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            left: 170,
            top: 360,
            width: 310,
            height: 13,
            borderRadius: 8,
            background: C.blue,
          }}
        />
      </div>
    );
  if (kind === "global")
    return (
      <div style={{ position: "relative", width: 650, height: 430 }}>
        <div
          style={{
            position: "absolute",
            left: 190,
            top: 55,
            width: 270,
            height: 270,
            borderRadius: "50%",
            background: C.blue,
            border: `9px solid ${C.ink}`,
            boxShadow: "inset -25px -18px #2362A3",
            transform: `rotate(${f * 0.08}deg)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 40,
              top: 55,
              width: 120,
              height: 70,
              borderRadius: "60%",
              background: C.mint,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 15,
              bottom: 60,
              width: 135,
              height: 75,
              borderRadius: "55%",
              background: C.mint,
            }}
          />
        </div>
        <div style={{ position: "absolute", left: 62, top: 135, fontSize: 72 }}>
          💧
        </div>
        <div
          style={{ position: "absolute", right: 60, top: 145, fontSize: 72 }}
        >
          ⛺
        </div>
        <div
          style={{ position: "absolute", left: 275, top: 315, fontSize: 80 }}
        >
          ❤️
        </div>
      </div>
    );
  if (kind === "losev")
    return (
      <div style={{ position: "relative", width: 650, height: 430 }}>
        <IconCard x={55} y={120} label="SAĞLIK" icon="🩺" color={C.red} />
        <IconCard
          x={350}
          y={120}
          label="EĞİTİM"
          icon="📚"
          color={C.blue}
          delay={10}
        />
        <div
          style={{
            position: "absolute",
            left: 187,
            top: 320,
            width: 280,
            height: 70,
            borderRadius: 28,
            background: C.mint,
            color: "#fff",
            fontSize: 34,
            fontWeight: 950,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          LÖSEV
        </div>
      </div>
    );
  if (kind === "institutions")
    return (
      <div style={{ position: "relative", width: 650, height: 430 }}>
        <IconCard x={55} y={70} label="DARÜŞŞAFAKA" icon="🎓" color={C.blue} />
        <IconCard
          x={350}
          y={70}
          label="KIZILAY"
          icon="⛑️"
          color={C.red}
          delay={10}
        />
        <div
          style={{
            position: "absolute",
            left: 90,
            top: 295,
            width: 470,
            height: 80,
            borderRadius: 30,
            background: "#fff",
            border: `4px solid ${C.line}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            fontSize: 33,
            fontWeight: 950,
            color: C.navy,
          }}
        >
          <span>🩸 Kan</span>
          <span>•</span>
          <span>🏕️ Afet</span>
        </div>
      </div>
    );
  return null;
};

const LessonScene = ({ scene, index }: { scene: Scene; index: number }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const card = spring({
    frame: f - 5,
    fps,
    config: { damping: 16, stiffness: 92 },
  });
  const isFiliz = scene.speaker === "filiz";
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 62% 20%,#FFFFFF 0,#F2F8FE 48%,#DFECF8 100%)",
        fontFamily: "Trebuchet MS,Arial",
        overflow: "hidden",
        color: C.ink,
      }}
    >
      <FloatingDots />
      <div
        style={{
          position: "absolute",
          left: 48,
          right: 48,
          top: 36,
          height: 92,
          borderRadius: 30,
          background: "rgba(255,255,255,.96)",
          boxShadow: "0 15px 35px rgba(23,59,102,.12)",
          display: "flex",
          alignItems: "center",
          padding: "0 34px",
          zIndex: 20,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 17,
            background: C.navy,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 950,
            fontSize: 23,
          }}
        >
          {index + 1}
        </div>
        <div style={{ marginLeft: 20 }}>
          <div
            style={{
              fontSize: 16,
              color: C.red,
              fontWeight: 950,
              letterSpacing: 2,
            }}
          >
            SOSYAL BİLGİLER • BİRLİKTE YAŞAMAK
          </div>
          <div style={{ fontSize: 32, color: C.navy, fontWeight: 950 }}>
            {scene.title}
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            fontSize: 20,
            fontWeight: 900,
            color: C.blue,
          }}
        >
          YARDIMLAŞMA
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: isFiliz ? 455 : 70,
          right: isFiliz ? 70 : 455,
          top: 165,
          bottom: 75,
          borderRadius: 48,
          background: "rgba(255,255,255,.95)",
          border: `3px solid ${C.line}`,
          boxShadow: "0 30px 70px rgba(23,59,102,.15)",
          transform: `translateY(${(1 - card) * 28}px) scale(${0.98 + card * 0.02})`,
          opacity: card,
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", left: 55, top: 50, right: 55 }}>
          <div
            style={{
              fontSize: 44,
              lineHeight: 1.08,
              fontWeight: 950,
              color: C.navy,
              maxWidth: 700,
            }}
          >
            {scene.lead}
          </div>
          <div
            style={{
              width: 150,
              height: 9,
              borderRadius: 8,
              background: `linear-gradient(90deg,${C.red},${C.amber})`,
              marginTop: 24,
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 45,
            top: 230,
            width: 690,
            height: 440,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Visual kind={scene.kind} />
        </div>
        <div
          style={{
            position: "absolute",
            right: 42,
            top: 230,
            width: 520,
            display: "grid",
            gap: 28,
          }}
        >
          {scene.facts.map((fact, i) => {
            const p = spring({
              frame: f - 22 - i * 13,
              fps,
              config: { damping: 15, stiffness: 100 },
            });
            return (
              <div
                key={fact}
                style={{
                  height: 125,
                  borderRadius: 30,
                  background: i ? "#FFF7E8" : "#EAF4FF",
                  border: `3px solid ${i ? C.amber : C.blue}33`,
                  display: "flex",
                  alignItems: "center",
                  padding: "0 30px",
                  gap: 22,
                  transform: `translateX(${(1 - p) * 35}px)`,
                  opacity: p,
                }}
              >
                <div
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: 20,
                    background: i ? C.amber : C.blue,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 30,
                    fontWeight: 950,
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontSize: 29,
                    lineHeight: 1.18,
                    fontWeight: 900,
                    color: C.ink,
                  }}
                >
                  {fact}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <GifCharacter
        name={scene.speaker}
        x={isFiliz ? 225 : 1695}
        y={610}
        scale={2.55}
        flip={!isFiliz}
        animate
      />
      <div
        style={{
          position: "absolute",
          left: isFiliz ? 105 : 1575,
          top: 900,
          width: 240,
          height: 58,
          borderRadius: 20,
          background: isFiliz ? "#E55363" : "#2D73C7",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 25,
          fontWeight: 950,
          zIndex: 25,
        }}
      >
        {isFiliz ? "Filiz" : "İbrahim"}
      </div>
      <Audio
        src={staticFile(`audio/sosyal/yardimlasma/main/${scene.id}.mp3`)}
      />
    </AbsoluteFill>
  );
};

export const Yardimlasma = () => (
  <AbsoluteFill>
    {scenes.map((s, i) => (
      <Sequence key={s.id} from={startAt(i)} durationInFrames={s.frames}>
        <LessonScene scene={s} index={i} />
      </Sequence>
    ))}
      <Sequence from={870} durationInFrames={180}>
      <div
        style={{
          position: "absolute",
          left: 480,
          top: 540,
          width: 960,
          height: 540,
        }}
      >
        <ChannelLowerThird />
      </div>
    </Sequence>
    <Sequence from={lessonFrames} durationInFrames={210}>
      <div
        style={{
          width: 960,
          height: 540,
          transform: "scale(2)",
          transformOrigin: "top left",
        }}
      >
        <CtaOptionOne />
      </div>
    </Sequence>
  </AbsoluteFill>
);
export const YardimlasmaConfig = {
  id: "Yardimlasma",
  fps: 30,
  width: 1920,
  height: 1080,
  durationInFrames: lessonFrames + 210,
};
