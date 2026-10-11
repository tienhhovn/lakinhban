import { memo, useMemo } from "react";
import {
  DIRECTIONS,
  MINI_FORTUNES,
  MINI_STEP,
  MOUNTAINS,
  STARS_BY_KUA,
  TRIGRAM_LINES,
  normalizeDeg,
} from "../lib/fengshui";
import { STARS, type StarKey } from "../lib/stars";

/* ---------------------- hệ toạ độ cực ---------------------- */
const SIZE = 470;
const C = 235;

const polar = (deg: number, r: number) => ({
  x: C + r * Math.sin((deg * Math.PI) / 180),
  y: C - r * Math.cos((deg * Math.PI) / 180),
});

function arcPath(r1: number, r2: number, a1: number, a2: number) {
  const p1 = polar(a1, r2);
  const p2 = polar(a2, r2);
  const p3 = polar(a2, r1);
  const p4 = polar(a1, r1);
  const large = a2 - a1 > 180 ? 1 : 0;
  return [
    `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
    `A ${r2} ${r2} 0 ${large} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
    `A ${r1} ${r1} 0 ${large} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
    "Z",
  ].join(" ");
}

/* Bán kính các vòng, tính từ ngoài vào trong */
const R = {
  bezelOut: 232,
  bezelIn: 224,
  letters: 215,
  tickOut: 206,
  tickMajor: 192,
  tickMid: 199,
  tickMin: 203,
  numbers: 183,
  miniOut: 178,
  miniIn: 149,
  miniText: 163,
  m24Out: 147,
  m24In: 119,
  m24Text: 133,
  guaOut: 117,
  guaIn: 81,
  guaDir: 107,
  guaName: 95,
  guaStar: 85,
  lineOut: 79,
  lineIn: 57,
  center: 53,
  taiji: 40,
};

const LABEL_COLOR: Record<StarKey, string> = {
  sinh_khi: "#ff9b9b",
  thien_y: "#ffbd85",
  dien_nien: "#ffd871",
  phuc_vi: "#ffeeb0",
  hoa_hai: "#c9b6f5",
  luc_sat: "#a9c9f7",
  ngu_quy: "#f4a9c4",
  tuyet_menh: "#9db6e8",
};

const GOLD_SOFT = "#a9852c";

/* ---------------------- mặt la bàn ---------------------- */
interface RoseProps {
  kua: number;
}

const CompassRoseBase = ({ kua }: RoseProps) => {
  const nodes = useMemo(() => {
    const starKeys = STARS_BY_KUA[kua] ?? STARS_BY_KUA[1];

    /* --- vạch chia độ: 2°, 5°, 15° --- */
    const ticks: React.ReactNode[] = [];
    for (let d = 0; d < 360; d += 2) {
      const major = d % 15 === 0;
      const mid = d % 5 === 0;
      const p1 = polar(d, R.tickOut);
      const p2 = polar(d, major ? R.tickMajor : mid ? R.tickMid : R.tickMin);
      ticks.push(
        <line
          key={`t${d}`}
          x1={p1.x}
          y1={p1.y}
          x2={p2.x}
          y2={p2.y}
          stroke={major ? "#f3dc9a" : mid ? GOLD_SOFT : "#6d6a45"}
          strokeWidth={major ? 2.4 : mid ? 1.5 : 0.9}
          strokeLinecap="round"
        />,
      );
    }

    /* --- số độ 0 → 345, mỗi 15° --- */
    const numbers: React.ReactNode[] = [];
    for (let d = 0; d < 360; d += 15) {
      const cardinal = d % 90 === 0;
      const p = polar(d, R.numbers);
      numbers.push(
        <text
          key={`n${d}`}
          x={p.x}
          y={p.y}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={cardinal ? 11 : 9.5}
          fontWeight={cardinal ? 700 : 500}
          fill={cardinal ? "#ffe9a8" : "#9fb3a4"}
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {d === 0 ? "360" : d}
        </text>,
      );
    }

    /* --- chữ hướng B, ĐB, Đ, ĐN, N, TN, T, TB --- */
    const letters = DIRECTIONS.map((d) => {
      const p = polar(d.center, R.letters);
      return (
        <g key={`L${d.key}`}>
          <circle cx={p.x} cy={p.y} r={9} fill={d.index === 0 ? "#b91c1c" : "rgba(212,175,55,0.16)"} stroke={GOLD_SOFT} strokeWidth={0.7} />
          <text
            x={p.x}
            y={p.y + 0.5}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={d.letter.length > 1 ? 8.5 : 11}
            fontWeight={700}
            fill={d.index === 0 ? "#fff4f4" : "#f0d98a"}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {d.letter}
          </text>
        </g>
      );
    });

    /* --- vòng 64 cung tiểu cát / tiểu hung --- */
    const minis: React.ReactNode[] = [];
    for (let i = 0; i < 64; i++) {
      const m = MINI_FORTUNES[i];
      const a1 = i * MINI_STEP - MINI_STEP / 2;
      const a2 = a1 + MINI_STEP;
      const cat = m.type === "cat";
      minis.push(
        <path
          key={`ma${i}`}
          d={arcPath(R.miniIn, R.miniOut, a1, a2)}
          fill={cat ? "#c62828" : "#15203d"}
          fillOpacity={cat ? 0.62 : 0.72}
          stroke={cat ? "#f0a8a8" : "#4a5c8a"}
          strokeOpacity={0.35}
          strokeWidth={0.4}
        />,
      );
      const anchor = polar(0, R.miniText);
      minis.push(
        <g key={`mt${i}`} transform={`rotate(${i * MINI_STEP} ${C} ${C})`}>
          <text
            x={anchor.x}
            y={anchor.y}
            textAnchor="middle"
            dominantBaseline="central"
            transform={`rotate(90 ${anchor.x} ${anchor.y})`}
            fontSize={6.2}
            fontWeight={600}
            fill={cat ? "#ffe1e1" : "#cdd8f2"}
            letterSpacing="-0.15"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {m.name}
          </text>
        </g>,
      );
    }

    /* --- vòng 24 sơn --- */
    const m24: React.ReactNode[] = [];
    for (let i = 0; i < 24; i++) {
      const m = MOUNTAINS[i];
      const a = i * 15;
      const p1 = polar(a - 7.5, R.m24In);
      const p2 = polar(a - 7.5, R.m24Out);
      const trigramLike = ["Càn", "Khôn", "Cấn", "Tốn", "Tý", "Ngọ", "Mão", "Dậu"].includes(m.name);
      m24.push(
        <line
          key={`s${i}`}
          x1={p1.x}
          y1={p1.y}
          x2={p2.x}
          y2={p2.y}
          stroke="rgba(212,175,55,0.35)"
          strokeWidth={0.6}
        />,
      );
      const tp = polar(a, R.m24Text);
      m24.push(
        <g key={`mt24${i}`} transform={`rotate(${a} ${C} ${C})`}>
          <text
            x={tp.x}
            y={tp.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={m.name.length > 2 ? 11 : 13}
            fontWeight={700}
            fill={trigramLike ? "#ffe9a8" : "#dfeee5"}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {m.name}
          </text>
        </g>,
      );
    }

    /* --- vòng Bát Quái & tên hướng + sao cát hung của gia chủ --- */
    const gua: React.ReactNode[] = [];
    DIRECTIONS.forEach((d) => {
      const a1 = d.center - 22.5;
      const a2 = d.center + 22.5;
      const sk = starKeys[d.index];
      const st = STARS[sk];
      gua.push(
        <path
          key={`g${d.key}`}
          d={arcPath(R.guaIn, R.guaOut, a1, a2)}
          fill={st.ringColor}
          fillOpacity={st.quality === "cat" ? 0.34 : 0.46}
          stroke={st.ringColor2}
          strokeOpacity={0.85}
          strokeWidth={1.1}
        />,
      );
      gua.push(
        <line
          key={`gl${d.key}`}
          x1={polar(a1, R.guaIn).x}
          y1={polar(a1, R.guaIn).y}
          x2={polar(a1, R.guaOut).x}
          y2={polar(a1, R.guaOut).y}
          stroke="rgba(212,175,55,0.4)"
          strokeWidth={0.8}
        />,
      );
      const pDir = polar(d.center, R.guaDir);
      const pName = polar(d.center, R.guaName);
      const pStar = polar(d.center, R.guaStar);
      gua.push(
        <g key={`gt${d.key}`} transform={`rotate(${d.center} ${C} ${C})`}>
          <text
            x={pDir.x}
            y={pDir.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={d.name.length > 6 ? 11 : 12.5}
            fontWeight={800}
            fill="#fffdf3"
            letterSpacing="-0.3"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {d.name.toUpperCase()}
          </text>
          <text
            x={pName.x}
            y={pName.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={9.5}
            fontWeight={600}
            fill="#dff0e5"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {d.trigram}
          </text>
          <text
            x={pStar.x}
            y={pStar.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={8.2}
            fontWeight={700}
            fill={LABEL_COLOR[sk]}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {st.name}
          </text>
        </g>,
      );
    });

    /* --- vòng hào quẻ (vạch âm dương của 8 quẻ) --- */
    const lines: React.ReactNode[] = [];
    DIRECTIONS.forEach((d) => {
      const bars = TRIGRAM_LINES[d.trigram];
      bars.forEach((yang, i) => {
        const y = C - R.lineIn - 5 - i * 6;
        const key = `h${d.key}${i}`;
        if (yang) {
          lines.push(
            <g key={key} transform={`rotate(${d.center} ${C} ${C})`}>
              <rect x={C - 13} y={y} width={26} height={4} rx={1.2} fill="#f0d98a" />
            </g>,
          );
        } else {
          lines.push(
            <g key={key} transform={`rotate(${d.center} ${C} ${C})`}>
              <rect x={C - 13} y={y} width={10} height={4} rx={1.2} fill="#f0d98a" />
              <rect x={C + 3} y={y} width={10} height={4} rx={1.2} fill="#f0d98a" />
            </g>,
          );
        }
      });
    });

    return { ticks, numbers, letters, minis, m24, gua, lines };
  }, [kua]);

  const t = nodes;

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full" aria-label="La bàn phong thủy">
      <defs>
        <radialGradient id="disc" cx="50%" cy="42%" r="72%">
          <stop offset="0%" stopColor="#0d5e46" />
          <stop offset="55%" stopColor="#064e3b" />
          <stop offset="100%" stopColor="#022c22" />
        </radialGradient>
        <linearGradient id="goldRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f7e7ae" />
          <stop offset="35%" stopColor="#d4af37" />
          <stop offset="65%" stopColor="#8a6c14" />
          <stop offset="100%" stopColor="#f2d489" />
        </linearGradient>
        <radialGradient id="centerGrad" cx="40%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#0f6b4f" />
          <stop offset="100%" stopColor="#012a20" />
        </radialGradient>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* đĩa nền */}
      <circle cx={C} cy={C} r={R.bezelOut} fill="url(#disc)" />
      <circle cx={C} cy={C} r={R.bezelOut - 2} fill="none" stroke="url(#goldRing)" strokeWidth={4.5} />
      <circle cx={C} cy={C} r={R.bezelIn} fill="none" stroke="rgba(212,175,55,0.45)" strokeWidth={0.9} />

      {/* các vòng phân cách */}
      {[
        R.miniOut,
        R.miniIn,
        R.m24Out,
        R.m24In,
        R.guaOut,
        R.guaIn,
        R.lineOut,
        R.lineIn,
      ].map((r, i) => (
        <circle key={`c${i}`} cx={C} cy={C} r={r} fill="none" stroke="rgba(212,175,55,0.28)" strokeWidth={0.7} />
      ))}

      {t.ticks}
      {t.numbers}
      {t.letters}
      {t.minis}
      {t.m24}
      {t.gua}
      {t.lines}

      {/* tâm la bàn: Thái Cực Đồ */}
      <circle cx={C} cy={C} r={R.center} fill="url(#centerGrad)" stroke="url(#goldRing)" strokeWidth={2.4} />
      <g transform={`rotate(-24 ${C} ${C})`} filter="url(#softGlow)">
        <circle cx={C} cy={C} r={R.taiji} fill="#f6efdc" />
        <path
          d={`M ${C} ${C - R.taiji} A ${R.taiji} ${R.taiji} 0 0 1 ${C} ${C + R.taiji} A ${R.taiji / 2} ${R.taiji / 2} 0 0 1 ${C} ${C} A ${R.taiji / 2} ${R.taiji / 2} 0 0 0 ${C} ${C - R.taiji} Z`}
          fill="#03372a"
        />
        <circle cx={C} cy={C - R.taiji / 2} r={R.taiji / 7} fill="#03372a" />
        <circle cx={C} cy={C + R.taiji / 2} r={R.taiji / 7} fill="#f6efdc" />
        <circle cx={C} cy={C} r={R.taiji} fill="none" stroke="url(#goldRing)" strokeWidth={1.4} />
      </g>
    </svg>
  );
};

export const CompassRose = memo(CompassRoseBase);

/* ---------------------- lớp phủ cố định (kim chỉ + khoanh vùng) ---------------------- */
export const CompassOverlay = memo(function CompassOverlay() {
  const wedge = `M ${C} ${C} L ${polar(-22.5, R.bezelOut - 3).x} ${polar(-22.5, R.bezelOut - 3).y} A ${R.bezelOut - 3} ${R.bezelOut - 3} 0 0 1 ${polar(22.5, R.bezelOut - 3).x} ${polar(22.5, R.bezelOut - 3).y} Z`;
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="needleGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="55%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#b3241f" />
        </linearGradient>
        <linearGradient id="wedgeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe9a8" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#ffe9a8" stopOpacity="0" />
        </linearGradient>
        <filter id="needleGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* khoanh vùng 45° đang chiếu */}
      <path d={wedge} fill="url(#wedgeGrad)" />
      <line x1={C} y1={C} x2={polar(-22.5, R.bezelOut - 3).x} y2={polar(-22.5, R.bezelOut - 3).y} stroke="rgba(255,233,168,0.5)" strokeWidth={0.9} strokeDasharray="5 5" />
      <line x1={C} y1={C} x2={polar(22.5, R.bezelOut - 3).x} y2={polar(22.5, R.bezelOut - 3).y} stroke="rgba(255,233,168,0.5)" strokeWidth={0.9} strokeDasharray="5 5" />

      {/* kim chỉ hướng cố định */}
      <g filter="url(#needleGlow)">
        <path d={`M ${C - 12} 2 L ${C + 12} 2 L ${C} 36 Z`} fill="url(#needleGrad)" stroke="#fff6d5" strokeWidth={0.8} />
        <path d={`M ${C - 4.5} 9 L ${C + 4.5} 9 L ${C} 27 Z`} fill="#7f1d1d" opacity={0.85} />
      </g>
      <circle cx={C} cy={C} r={4.5} fill="#f2d489" stroke="#022c22" strokeWidth={1.4} />
    </svg>
  );
});

export const COMPASS_SIZE = SIZE;
export const headingToXY = (deg: number, r: number) => polar(normalizeDeg(deg), r);
