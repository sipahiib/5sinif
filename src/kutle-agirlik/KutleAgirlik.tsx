import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Easing,
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
type Kind = "gravity" | "meter" | "mass" | "earth" | "space" | "compare";
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
  blue: "#2877C7",
  red: "#E55461",
  amber: "#F6BC46",
  mint: "#34A985",
  ink: "#18283A",
  space: "#0B1033",
  violet: "#6C4DFF",
  cyan: "#43D6D1",
};
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const main: Scene[] = [
  {
    id: "01",
    speaker: "filiz",
    title: "AĞIRLIK NEDİR?",
    lead: "Dünya cisimleri merkezine doğru çeker",
    facts: ["Ağırlık bir kuvvettir", "Yönü Dünya’nın merkezinedir"],
    kind: "gravity",
    frames: 305,
  },
  {
    id: "02",
    speaker: "ibrahim",
    title: "AĞIRLIK NASIL ÖLÇÜLÜR?",
    lead: "Dinamometre yer çekimi kuvvetini ölçer",
    facts: ["Birimi Newton’dur", "N sembolüyle gösterilir"],
    kind: "meter",
    frames: 395,
  },
  {
    id: "03",
    speaker: "filiz",
    title: "KÜTLE NEDİR?",
    lead: "Cismin değişmeyen madde miktarıdır",
    facts: ["Eşit kollu teraziyle ölçülür", "Birimi gram veya kilogramdır"],
    kind: "mass",
    frames: 340,
  },
  {
    id: "04",
    speaker: "ibrahim",
    title: "KONUM AĞIRLIĞI DEĞİŞTİRİR",
    lead: "Merkezden uzaklaştıkça çekim azalır",
    facts: ["Kutuplarda daha fazladır", "Yüksek dağlarda daha azdır"],
    kind: "earth",
    frames: 395,
  },
  {
    id: "05",
    speaker: "filiz",
    title: "GÖK CİSİMLERİNDE AĞIRLIK",
    lead: "Her gök cisminin çekim kuvveti farklıdır",
    facts: ["Kütle aynı kalır", "Ağırlık bulunduğun yere bağlıdır"],
    kind: "space",
    frames: 330,
  },
  {
    id: "06",
    speaker: "ibrahim",
    title: "DÜNYA VE AY",
    lead: "Ay’ın çekimi Dünya’nın yaklaşık altıda biridir",
    facts: ["60 kg kütle değişmez", "600 N → 100 N"],
    kind: "compare",
    frames: 395,
  },
];
const kurz: Scene[] = [
  {
    id: "01",
    speaker: "filiz",
    title: "BIRAKINCA NEDEN DÜŞER?",
    lead: "Dünya topu görünmez bir kuvvetle merkezine çeker.",
    facts: ["Dinamometre bu çekimi ölçer", "Ölçülen değer ağırlıktır"],
    kind: "gravity",
    frames: 410,
  },
  {
    id: "02",
    speaker: "ibrahim",
    title: "AYNI ÇANTA, FARKLI DAĞ",
    lead: "Çantadaki madde aynı; merkeze olan uzaklık farklı.",
    facts: ["Kütle değişmez", "Yüksekte ağırlık biraz azalır"],
    kind: "earth",
    frames: 445,
  },
  {
    id: "03",
    speaker: "filiz",
    title: "ÇANTAYI AY’A GÖTÜRÜRSEK",
    lead: "Çanta aynı çanta, fakat Ay daha zayıf çeker.",
    facts: ["Kütle cismin özelliğidir", "Ağırlık ortamın etkisidir"],
    kind: "compare",
    frames: 450,
  },
];

const Planet: React.FC<{ moon?: boolean; size?: number }> = ({
  moon = false,
  size = 180,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: moon ? "#ECE8D7" : "#43A5ED",
      border: `${size * 0.035}px solid ${C.ink}`,
      boxShadow: moon
        ? "inset -18px -12px #CFC9B4"
        : "inset -20px -12px #2877C7",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {!moon && (
      <>
        <div
          style={{
            position: "absolute",
            left: "8%",
            top: "18%",
            width: "53%",
            height: "25%",
            borderRadius: "60%",
            background: "#62CE88",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-5%",
            bottom: "20%",
            width: "48%",
            height: "26%",
            borderRadius: "55%",
            background: "#62CE88",
          }}
        />
      </>
    )}
  </div>
);
const Visual: React.FC<{ kind: Kind; dark: boolean }> = ({ kind, dark }) => {
  const f = useCurrentFrame();
  const p = spring({
    frame: f - 6,
    fps: 30,
    config: { damping: 13, stiffness: 100 },
  });
  const down = interpolate(f, [10, 75], [0, 130], {
    ...clamp,
    easing: Easing.in(Easing.quad),
  });
  if (kind === "gravity")
    return (
      <div style={{ position: "relative", width: 360, height: 310 }}>
        <div style={{ position: "absolute", left: 90, top: 125 }}>
          <Planet size={185} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 164,
            top: 20 + down,
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: C.amber,
            border: `6px solid ${C.ink}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 72,
            width: 10,
            height: 95,
            background: C.red,
            clipPath:
              "polygon(0 0,100% 0,100% 75%,180% 75%,50% 100%,-80% 75%,0 75%)",
          }}
        />
      </div>
    );
  if (kind === "meter")
    return (
      <div
        style={{
          width: 190,
          height: 300,
          borderRadius: 28,
          background: dark ? "#24275F" : "#EDF6FD",
          border: `7px solid ${dark ? "#fff" : C.navy}`,
          position: "relative",
          transform: `scale(${0.85 + p * 0.15})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 84,
            top: 20,
            width: 12,
            height: 145,
            background: C.cyan,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 38,
            top: 55,
            right: 38,
            height: 6,
            background: C.red,
            transform: `rotate(${Math.sin(f / 18) * 18}deg)`,
            transformOrigin: "right",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 55,
            bottom: 35,
            fontSize: 54,
            fontWeight: 950,
            color: dark ? "#fff" : C.navy,
          }}
        >
          N
        </div>
      </div>
    );
  if (kind === "mass")
    return (
      <div style={{ position: "relative", width: 390, height: 270 }}>
        <div
          style={{
            position: "absolute",
            left: 180,
            top: 30,
            width: 18,
            height: 175,
            background: C.navy,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 80,
            width: 240,
            height: 12,
            background: C.amber,
            transform: `rotate(${Math.sin(f / 14) * 2}deg)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 35,
            top: 98,
            width: 110,
            height: 60,
            borderRadius: "0 0 55px 55px",
            background: C.cyan,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 35,
            top: 98,
            width: 110,
            height: 60,
            borderRadius: "0 0 55px 55px",
            background: C.red,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 135,
            bottom: 10,
            fontSize: 42,
            fontWeight: 950,
            color: dark ? "#fff" : C.navy,
          }}
        >
          5 kg
        </div>
      </div>
    );
  if (kind === "earth")
    return (
      <div
        style={{
          position: "relative",
          width: 390,
          height: 320,
          transform: `scale(${0.9 + p * 0.1})`,
        }}
      >
        <div style={{ position: "absolute", left: 95, top: 55 }}>
          <Planet size={210} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 188,
            top: 5,
            width: 24,
            height: 105,
            background: C.red,
            clipPath:
              "polygon(50% 0,100% 28%,68% 28%,68% 100%,32% 100%,32% 28%,0 28%)",
          }}
        />
      </div>
    );
  if (kind === "space")
    return (
      <div style={{ position: "relative", width: 420, height: 300 }}>
        <div style={{ position: "absolute", left: 15, top: 70 }}>
          <Planet size={170} />
        </div>
        <div style={{ position: "absolute", right: 35, top: 95 }}>
          <Planet moon size={120} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 190,
            top: 130,
            fontSize: 55,
            color: C.amber,
            transform: `scale(${0.8 + p * 0.2})`,
          }}
        >
          →
        </div>
      </div>
    );
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 45,
        transform: `scale(${0.88 + p * 0.12})`,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Planet size={175} />
        <b style={{ fontSize: 30, color: dark ? "#fff" : C.navy }}>600 N</b>
      </div>
      <div style={{ fontSize: 70, color: C.amber, fontWeight: 950 }}>÷6</div>
      <div style={{ textAlign: "center" }}>
        <Planet moon size={125} />
        <b style={{ fontSize: 30, color: dark ? "#fff" : C.navy }}>100 N</b>
      </div>
    </div>
  );
};

const SceneView: React.FC<{ s: Scene; dark: boolean; index: number }> = ({
  s,
  dark,
  index,
}) => {
  const f = useCurrentFrame();
  const left = s.speaker === "filiz";
  const enter = spring({
    frame: f,
    fps: 30,
    config: { damping: 15, stiffness: 95 },
  });
  return (
    <AbsoluteFill
      style={{
        background: dark
          ? `radial-gradient(circle at ${left ? "75%" : "25%"} 50%,#292664,${C.space} 66%)`
          : "linear-gradient(145deg,#F0F8FF,#fff 56%,#FFF6ED)",
        fontFamily: "Trebuchet MS,Arial",
        overflow: "hidden",
        color: dark ? "#fff" : C.ink,
      }}
    >
      {Array.from({ length: dark ? 34 : 12 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (i * 163 + f * 0.15) % 980,
            top: (i * 97) % 530,
            width: 3 + (i % 4),
            height: 3 + (i % 4),
            borderRadius: "50%",
            background: dark ? "#fff" : C.blue,
            opacity: 0.12 + (i % 4) * 0.08,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 36,
          right: 36,
          top: 28,
          height: 66,
          borderRadius: 22,
          background: dark ? "rgba(255,255,255,.08)" : "#fff",
          boxShadow: "0 12px 30px rgba(10,25,55,.12)",
          display: "flex",
          alignItems: "center",
          padding: "0 22px",
        }}
      >
        <b
          style={{
            fontSize: 13,
            color: dark ? C.cyan : C.red,
            letterSpacing: 2,
          }}
        >
          {dark ? "BİLİM YOLCULUĞU" : "5. SINIF FEN BİLİMLERİ"}
        </b>
        <b style={{ marginLeft: "auto", fontSize: 14, opacity: 0.65 }}>
          {index + 1}
        </b>
      </div>
      <div
        style={{
          position: "absolute",
          left: left ? 205 : 55,
          top: 125,
          width: dark ? 520 : 470,
          opacity: enter,
          transform: `translateY(${(1 - enter) * 18}px)`,
        }}
      >
        <div
          style={{
            fontSize: dark ? 41 : 34,
            lineHeight: 1.05,
            fontWeight: 950,
            color: dark ? "#fff" : C.navy,
          }}
        >
          {s.title}
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: dark ? 20 : 18,
            lineHeight: 1.25,
            fontWeight: 800,
            color: dark ? "#DCD9FF" : C.ink,
          }}
        >
          {s.lead}
        </div>
        <div style={{ marginTop: 22, display: "grid", gap: 11 }}>
          {s.facts.map((x, i) => (
            <div
              key={x}
              style={{
                padding: "12px 15px",
                borderRadius: 15,
                background: dark
                  ? "rgba(255,255,255,.09)"
                  : ["#FFF0F1", "#ECF7FF"][i],
                borderLeft: `7px solid ${i ? C.cyan : C.red}`,
                fontSize: 16,
                fontWeight: 850,
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
          left: s.kind === "compare" ? (left ? 535 : 370) : left ? 570 : 430,
          top: s.kind === "compare" ? 190 : 175,
          width: 450,
          height: 310,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${s.kind === "compare" ? 0.74 : s.kind === "earth" && dark ? 0.78 : 1})`,
          transformOrigin: "center",
        }}
      >
        <Visual kind={s.kind} dark={dark} />
      </div>
      <GifCharacter
        name={s.speaker}
        x={left ? 110 : 850}
        y={130}
        scale={1.03}
        flip={!left}
        animate
      />
      <div
        style={{
          position: "absolute",
          left: left ? 45 : undefined,
          right: left ? undefined : 45,
          bottom: 66,
          width: 130,
          textAlign: "center",
          padding: "8px",
          borderRadius: 12,
          background: left ? C.red : C.blue,
          color: "#fff",
          fontWeight: 950,
        }}
      >
        {left ? "Filiz" : "İbrahim"}
      </div>
      <Audio
        src={staticFile(
          `audio/fen/kutle-agirlik/${dark ? "kurz" : "main"}/${s.id}.mp3`,
        )}
      />
    </AbsoluteFill>
  );
};

const total = (a: Scene[]) => a.reduce((n, s) => n + s.frames, 0);
const starts = (a: Scene[], i: number) =>
  a.slice(0, i).reduce((n, s) => n + s.frames, 0);
const Video: React.FC<{ dark: boolean }> = ({ dark }) => {
  const a = dark ? kurz : main;
  const lesson = total(a);
  return (
    <AbsoluteFill>
      {a.map((s, i) => (
        <Sequence key={s.id} from={starts(a, i)} durationInFrames={s.frames}>
          <SceneView s={s} dark={dark} index={i} />
        </Sequence>
      ))}
      {lesson > 900 && (
        <Sequence from={900} durationInFrames={180}>
          <ChannelLowerThird />
        </Sequence>
      )}
      <Sequence from={lesson} durationInFrames={210}>
        <CtaOptionOne />
      </Sequence>
    </AbsoluteFill>
  );
};
export const KutleAgirlik = () => <Video dark={false} />;
export const KutleAgirlikKurz = () => <Video dark />;
export const KutleAgirlikConfig = {
  id: "KutleAgirlik",
  fps: 30,
  width: 960,
  height: 540,
  durationInFrames: total(main) + 210,
};
export const KutleAgirlikKurzConfig = {
  id: "KutleAgirlikKurz",
  fps: 30,
  width: 960,
  height: 540,
  durationInFrames: total(kurz) + 210,
};
