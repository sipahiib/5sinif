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

const ITEMS = [
  {
    topic: "YARDIMLAŞMA",
    question:
      "Bir köyde herkesin gönüllü olarak ortak bir işi birlikte tamamlamasına ne ad verilir?",
    choices: ["Dayanışma", "İmece", "Rekabet"],
    correct: 1,
    qEnd: 183,
    aEnd: 584,
  },
  {
    topic: "YARDIMLAŞMA",
    question:
      "Eğitim imkânı sınırlı, yetenekli öğrencilere karşılıksız eğitim desteği sunan kuruluş hangisidir?",
    choices: ["Kızılay", "LÖSEV", "Darüşşafaka"],
    correct: 2,
    qEnd: 209,
    aEnd: 652,
  },
] as const;
const C = {
  navy: "#173B66",
  blue: "#2D73C7",
  red: "#E55363",
  amber: "#F6BC46",
  mint: "#43B796",
  ink: "#20344A",
  line: "#D9E7F3",
};
const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};
const Countdown = ({ start }: { start: number }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [start, start + 150], [0, 1], clamp);
  const n = Math.max(1, Math.ceil(5 - p * 5));
  const c = 2 * Math.PI * 82;
  return (
    <div
      style={{
        position: "absolute",
        left: 390,
        top: 1330,
        width: 300,
        height: 300,
        borderRadius: "50%",
        background: "#fff",
        boxShadow: "0 24px 60px rgba(23,59,102,.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
        transform: `scale(${1 + Math.sin(f / 4) * 0.025})`,
      }}
    >
      <svg
        width="245"
        height="245"
        viewBox="0 0 220 220"
        style={{ position: "absolute", transform: "rotate(-90deg)" }}
      >
        <circle
          cx="110"
          cy="110"
          r="82"
          fill="none"
          stroke="#E6EEF6"
          strokeWidth="15"
        />
        <circle
          cx="110"
          cy="110"
          r="82"
          fill="none"
          stroke={C.amber}
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * p}
        />
      </svg>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 100,
            lineHeight: 0.9,
            color: C.navy,
            fontWeight: 950,
          }}
        >
          {n}
        </div>
        <div
          style={{
            fontSize: 22,
            color: C.red,
            fontWeight: 950,
            letterSpacing: 3,
            marginTop: 14,
          }}
        >
          DÜŞÜN!
        </div>
      </div>
    </div>
  );
};
const Ibrahim = ({ speaking }: { speaking: boolean }) => {
  const f = useCurrentFrame();
  const n = speaking ? Math.floor((f * 11) / 30) % 22 : 0,
    w = 187;
  return (
    <div
      style={{
        position: "absolute",
        left: 850,
        top: 1380,
        width: w,
        height: 280,
        overflow: "hidden",
        transform: "translateX(-50%) scale(1.75)",
        transformOrigin: "top center",
        filter: "drop-shadow(0 20px 24px rgba(0,0,0,.27))",
      }}
    >
      <Img
        src={staticFile("images/ibrahim_2_sprite.png")}
        style={{
          position: "absolute",
          left: -(n % 5) * w,
          top: -Math.floor(n / 5) * 280,
          width: w * 5,
          height: 1400,
          maxWidth: "none",
        }}
      />
    </div>
  );
};
export const YardimlasmaShorts = ({ index }: { index: 0 | 1 }) => {
  const item = ITEMS[index],
    f = useCurrentFrame();
  const choices = f >= item.qEnd;
  const reveal = f >= item.qEnd + 150;
  const congrats = f >= item.aEnd + 30;
  const pop = spring({
    frame: f - item.qEnd,
    fps: 30,
    config: { damping: 12, stiffness: 110 },
  });
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(165deg,#EAF5FF 0%,#FFFFFF 46%,#FFF0EC 100%)",
        fontFamily: "Trebuchet MS,Arial",
        color: C.ink,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 42 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: (i * 211) % 1080,
            top: (i * 137) % 1920,
            width: 4 + (i % 6),
            height: 4 + (i % 6),
            borderRadius: "50%",
            background: i % 3 === 0 ? C.red : i % 3 === 1 ? C.blue : C.amber,
            opacity: 0.08 + (i % 4) * 0.025,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 55,
          right: 55,
          top: 48,
          height: 75,
          borderRadius: 28,
          background: C.navy,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          padding: "0 30px",
          fontSize: 25,
          fontWeight: 950,
          letterSpacing: 3,
        }}
      >
        {item.topic}
        <span style={{ marginLeft: "auto", color: C.amber }}>
          MİNİ SORU {index + 1}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 175,
          minHeight: 350,
          borderRadius: 42,
          background: "#fff",
          border: `4px solid ${C.line}`,
          boxShadow: "0 25px 65px rgba(23,59,102,.15)",
          padding: "78px 38px 45px",
          textAlign: "center",
          fontSize: 47,
          lineHeight: 1.16,
          fontWeight: 950,
        }}
      >
        {item.question}
      </div>
      {choices && (
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            top: 620,
            display: "grid",
            gap: 26,
            transform: `scale(${0.94 + pop * 0.06})`,
          }}
        >
          {item.choices.map((choice, i) => {
            const ok = reveal && i === item.correct;
            return (
              <div
                key={choice}
                style={{
                  height: 150,
                  borderRadius: 36,
                  background: ok
                    ? "linear-gradient(135deg,#E5FAF2,#D6F4E9)"
                    : "#fff",
                  border: `5px solid ${ok ? C.mint : C.line}`,
                  boxShadow: ok
                    ? "0 22px 55px rgba(67,183,150,.28)"
                    : "0 16px 38px rgba(23,59,102,.11)",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 30px",
                  fontSize: 45,
                  fontWeight: 950,
                  transform: `scale(${ok ? 1 + Math.sin((f - item.qEnd - 150) / 6) * 0.012 : 1})`,
                }}
              >
                <span
                  style={{
                    width: 82,
                    height: 82,
                    borderRadius: 25,
                    background: ok ? C.mint : C.red,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 46,
                    marginRight: 32,
                  }}
                >
                  {ok ? "✓" : String.fromCharCode(65 + i)}
                </span>
                {choice}
                {ok && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: 24,
                      color: "#248568",
                      letterSpacing: 2,
                    }}
                  >
                    DOĞRU
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
      {choices && !reveal && <Countdown start={item.qEnd} />}
      <Ibrahim speaking={!congrats} />
      {congrats && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 100,
            fontWeight: 950,
            color: C.red,
            zIndex: 80,
            transform: `scale(${0.84 + spring({ frame: f - item.aEnd - 30, fps: 30, config: { damping: 10 } }) * 0.16})`,
          }}
        >
          Tebrikler!
        </div>
      )}
      <Audio
        src={staticFile(
          `audio/sosyal/yardimlasma/shorts/${index + 1 < 10 ? "0" : ""}${index + 1}/question.mp3`,
        )}
      />
      <Sequence from={item.qEnd + 150}>
        <Audio
          src={staticFile(
            `audio/sosyal/yardimlasma/shorts/${index + 1 < 10 ? "0" : ""}${index + 1}/answer.mp3`,
          )}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
export const YardimlasmaShortsOne = () => <YardimlasmaShorts index={0} />;
export const YardimlasmaShortsTwo = () => <YardimlasmaShorts index={1} />;
export const YardimlasmaShortsOneConfig = {
  id: "YardimlasmaShorts1",
  fps: 30,
  width: 1080,
  height: 1920,
  durationInFrames: 674,
};
export const YardimlasmaShortsTwoConfig = {
  id: "YardimlasmaShorts2",
  fps: 30,
  width: 1080,
  height: 1920,
  durationInFrames: 742,
};
