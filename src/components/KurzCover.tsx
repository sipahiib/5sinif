import React from "react";
import {AbsoluteFill} from "remotion";

type KurzCoverProps = {
  subject: string;
  title: string;
  accent: string;
  secondary: string;
};

export const KurzCover: React.FC<KurzCoverProps> = ({
  subject,
  title,
  accent,
  secondary,
}) => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(circle at 78% 22%, #29366f 0, #111a3c 34%, #070c20 76%)",
      color: "white",
      fontFamily: "Trebuchet MS, Arial, sans-serif",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 34,
        border: `3px solid ${accent}88`,
        borderRadius: 32,
        boxShadow: `inset 0 0 60px ${accent}18`,
      }}
    />
    <div
      style={{
        position: "absolute",
        left: 76,
        top: 64,
        padding: "12px 22px",
        borderRadius: 999,
        background: accent,
        color: "#081126",
        fontSize: 24,
        fontWeight: 950,
        letterSpacing: 1.8,
      }}
    >
      5. SINIF • {subject}
    </div>
    <div
      style={{
        position: "absolute",
        left: 76,
        top: 168,
        width: 720,
        fontSize: title.length > 28 ? 62 : 72,
        fontWeight: 950,
        lineHeight: 1.04,
        letterSpacing: -1.8,
        textShadow: "0 10px 34px #0008",
      }}
    >
      {title}
    </div>
    <div
      style={{
        position: "absolute",
        left: 78,
        bottom: 82,
        display: "flex",
        alignItems: "center",
        gap: 16,
        color: "#c8d6f3",
        fontSize: 27,
        fontWeight: 850,
      }}
    >
      <span style={{color: secondary, fontSize: 34}}>●</span>
      <span>LUMİ İLE KISA VE GÖRSEL ANLATIM</span>
    </div>
    <svg
      width="410"
      height="410"
      viewBox="0 0 410 410"
      style={{position: "absolute", right: 58, top: 140}}
    >
      <circle cx="205" cy="205" r="176" fill={`${accent}18`} stroke={`${accent}66`} strokeWidth="3" />
      <circle cx="205" cy="205" r="135" fill={`${secondary}16`} stroke={`${secondary}55`} strokeWidth="3" strokeDasharray="12 14" />
      <ellipse cx="205" cy="330" rx="102" ry="23" fill="#0007" />
      <path d="M110 192 48 150v98l62-24M300 192l62-42v98l-62-24" fill={accent} stroke="#090f26" strokeWidth="12" strokeLinejoin="round" />
      <rect x="105" y="100" width="200" height="210" rx="82" fill={secondary} stroke="#090f26" strokeWidth="14" />
      <rect x="137" y="147" width="136" height="100" rx="46" fill="#effcff" stroke="#090f26" strokeWidth="10" />
      <circle cx="178" cy="194" r="13" fill="#090f26" />
      <circle cx="232" cy="194" r="13" fill="#090f26" />
      <path d="M174 220q31 25 62 0" fill="none" stroke="#090f26" strokeWidth="8" strokeLinecap="round" />
      <path d="M205 100V63" stroke="#090f26" strokeWidth="10" strokeLinecap="round" />
      <circle cx="205" cy="50" r="17" fill={accent} stroke="#090f26" strokeWidth="8" />
      <circle cx="143" cy="276" r="17" fill={accent} />
      <circle cx="267" cy="276" r="17" fill={accent} />
    </svg>
  </AbsoluteFill>
);
