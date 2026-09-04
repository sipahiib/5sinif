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

const choices = [
  ["A", "50 N"],
  ["B", "100 N"],
  ["C", "600 N"],
];
const Countdown = () => {
  const f = useCurrentFrame();
  const progress = interpolate(f, [188, 338], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const remaining = Math.max(1, Math.ceil(5 - progress * 5));
  const circumference = 2 * Math.PI * 92;
  return (
    <div style={{position:"absolute",left:320,top:1225,width:350,height:350,borderRadius:"50%",background:"#FFFFFF",boxShadow:"0 25px 60px rgba(23,59,102,.18)",display:"flex",alignItems:"center",justifyContent:"center",transform:`scale(${1+Math.sin(f/4)*.035})`,zIndex:30}}>
      <svg width="270" height="270" viewBox="0 0 220 220" style={{position:"absolute",transform:"rotate(-90deg)"}}>
        <circle cx="110" cy="110" r="92" fill="none" stroke="#E7EEF5" strokeWidth="15"/>
        <circle cx="110" cy="110" r="92" fill="none" stroke="#F6BC46" strokeWidth="15" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference*progress}/>
      </svg>
      <div style={{textAlign:"center"}}><div style={{fontSize:112,lineHeight:.9,color:"#173B66",fontWeight:950}}>{remaining}</div><div style={{fontSize:22,color:"#D8505B",fontWeight:950,marginTop:16,letterSpacing:2}}>DÜŞÜN!</div></div>
    </div>
  );
};
const Character = () => {
  const f = useCurrentFrame();
  const n = Math.floor((f * 11) / 30) % 22,
    w = 187;
  return (
    <div
      style={{
        position: "absolute",
        left: 875,
        top: 1500,
        width: w,
        height: 280,
        overflow: "hidden",
        transform: "translateX(-50%) scale(1.85)",
        transformOrigin: "top center",
        filter: "drop-shadow(0 20px 22px rgba(0,0,0,.3))",
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
export const KutleAgirlikShorts = () => {
  const f = useCurrentFrame();
  const options = f >= 188 && f < 338,
    reveal = f >= 338,
    congrats = f >= 600;
  const pop = spring({
    frame: f - (congrats ? 600 : 188),
    fps: 30,
    config: { damping: 12, stiffness: 110 },
  });
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(165deg,#EAF5FF 0%,#FFFFFF 46%,#FFF3EF 100%)",
        fontFamily: "Verdana,Arial",
        color: "#172638",
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
            width: 3 + (i % 5),
            height: 3 + (i % 5),
            borderRadius: "50%",
            background: i % 2 ? "#2877C7" : "#F6BC46",
            opacity: 0.08 + (i % 4) * 0.035,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          left: 55,
          right: 55,
          top: 48,
          height: 72,
          borderRadius: 28,
          background: "#173B66",
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          fontSize: 24,
          fontWeight: 900,
          letterSpacing: 3,
          color: "#FFFFFF",
        }}
      >
        KÜTLE VE AĞIRLIK
      </div>
      <Character />
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 185,
          height: 355,
          borderRadius: 42,
          background: "#FFFFFF",
          border: "4px solid #D4E5F5",
          boxShadow: "0 26px 70px rgba(23,59,102,.16)",
          padding: "105px 35px 0",
          textAlign: "center",
          fontSize: 52,
          lineHeight: 1.12,
          fontWeight: 950,
        }}
      >
        Dünya’da 600 N gelen bir cisim Ay’da yaklaşık kaç N gelir?
      </div>
      {options && (
        <div
          style={{
            position: "absolute",
            left: 90,
            right: 90,
            top: 650,
            display: "grid",
            gap: 30,
            transform: `scale(${0.92 + pop * 0.08})`,
          }}
        >
          {choices.map(([k, v]) => (
            <div
              key={k}
              style={{
                height: 150,
                borderRadius: 36,
                background: "#FFFFFF",
                border: "4px solid #D4E5F5",
                boxShadow: "0 18px 42px rgba(23,59,102,.12)",
                display: "flex",
                alignItems: "center",
                padding: "0 32px",
                fontSize: 48,
                fontWeight: 950,
              }}
            >
              <span
                style={{
                  width: 82,
                  height: 82,
                  borderRadius: 26,
                  background: "#D8505B",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 35,
                }}
              >
                {k}
              </span>
              {v}
            </div>
          ))}
        </div>
      )}
      {options && <Countdown />}
      {reveal && !congrats && (
        <div
          style={{
            position: "absolute",
            left: 85,
            right: 85,
            top: 680,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 34,
              color: "#D8505B",
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            DOĞRU CEVAP
          </div>
          <div
            style={{
              margin: "26px auto",
              width: 520,
              height: 190,
              borderRadius: 48,
              background: "linear-gradient(145deg,#173B66,#2877C7)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 74,
              fontWeight: 950,
              boxShadow: "0 25px 60px rgba(67,214,209,.35)",
              transform: `scale(${0.86 + spring({ frame: f - 338, fps: 30, config: { damping: 10 } }) * 0.14})`,
            }}
          >
            B · 100 N
          </div>
          <div
            style={{
              fontSize: 37,
              lineHeight: 1.25,
              fontWeight: 800,
              color: "#173B66",
            }}
          >
            Ay’ın çekimi Dünya’nın yaklaşık altıda biridir.
          </div>
        </div>
      )}
      {congrats && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(255,255,255,.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 98,
            fontWeight: 950,
            color: "#D8505B",
            transform: `scale(${0.8 + pop * 0.2})`,
          }}
        >
          Tebrikler!
        </div>
      )}
      <Audio src={staticFile("audio/fen/kutle-agirlik/shorts/question.mp3")} />
      <Sequence from={338}>
        <Audio src={staticFile("audio/fen/kutle-agirlik/shorts/answer.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
export const KutleAgirlikShortsConfig = {
  id: "KutleAgirlikShorts",
  fps: 30,
  width: 1080,
  height: 1920,
  durationInFrames: 720,
};
