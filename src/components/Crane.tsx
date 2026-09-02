/**
 * מנוף גשר של מפעל — הציר האנכי של עמוד הבית.
 *
 * מצויר ב-SVG כדי שאפקט חציית האזורים יעבוד כבר עכשיו, לפני
 * שקיימת התמונה. כשייכנס `01-crane.png` ל-public/visuals הוא
 * מחליף את זה אוטומטית (ראה Visual.tsx).
 */
export default function Crane({ className = "" }: { className?: string }) {
  const steel = "#454E55";
  const steelLight = "#5C6870";
  const accent = "#E8541F";

  return (
    <svg
      viewBox="0 0 420 2400"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMin meet"
    >
      <defs>
        {/* חוליות שרשרת חוזרות — מרכיב את הכבל לכל אורכו */}
        <pattern id="chain" width="26" height="44" patternUnits="userSpaceOnUse">
          <ellipse cx="13" cy="11" rx="7.5" ry="11" stroke={steelLight} strokeWidth="2.6" />
          <ellipse cx="13" cy="33" rx="10.5" ry="11" stroke={steel} strokeWidth="2.6" />
        </pattern>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.06" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="chainFade">
          <rect x="0" y="0" width="420" height="2400" fill="url(#fade)" />
        </mask>
      </defs>

      {/* ── קורת הגשר ── */}
      <g stroke={steel} strokeWidth="3">
        <rect x="-40" y="46" width="500" height="30" fill="#1A1E22" />
        <path d="M-40 46h500M-40 76h500" />
        <path d="M-20 76v18M60 76v18M140 76v18M300 76v18M380 76v18" strokeWidth="2" opacity=".5" />
      </g>

      {/* ── עגלת ההרמה ── */}
      <g>
        <rect x="146" y="76" width="128" height="62" fill="#20262B" stroke={steel} strokeWidth="3" />
        <rect x="160" y="90" width="40" height="34" stroke={steelLight} strokeWidth="2" />
        <rect x="212" y="90" width="48" height="34" fill={accent} opacity=".9" />
        <circle cx="170" cy="145" r="9" fill="#1A1E22" stroke={steel} strokeWidth="3" />
        <circle cx="250" cy="145" r="9" fill="#1A1E22" stroke={steel} strokeWidth="3" />
      </g>

      {/* ── שרשרת ── */}
      <g mask="url(#chainFade)">
        <rect x="197" y="138" width="26" height="1360" fill="url(#chain)" />
      </g>

      {/* ── גוש הוו ── */}
      <g>
        <rect x="150" y="1498" width="120" height="96" fill="#20262B" stroke={accent} strokeWidth="4" />
        <path d="M150 1530h120M150 1562h120" stroke={accent} strokeWidth="2" opacity=".45" />
        <circle cx="210" cy="1546" r="20" fill="#151A1E" stroke={steelLight} strokeWidth="3" />
        <circle cx="210" cy="1546" r="5" fill={accent} />
      </g>

      {/* ── הוו ── */}
      <g stroke={accent} strokeWidth="13" strokeLinecap="round" fill="none">
        <path d="M210 1594v54" />
        <path d="M210 1648c0 62-64 74-64 16 0-30 26-40 42-24" />
      </g>

      {/* ── מתלים ── */}
      <g stroke={steelLight} strokeWidth="3">
        <path d="M186 1690L96 1856M234 1690l90 166" />
      </g>

      {/* ── צרור מוטות פלדה ── */}
      <g transform="rotate(-2 210 1930)">
        <rect x="66" y="1852" width="288" height="30" fill="#252B31" stroke={steel} strokeWidth="2.5" />
        <rect x="66" y="1886" width="288" height="30" fill="#1E2429" stroke={steel} strokeWidth="2.5" />
        <rect x="66" y="1920" width="288" height="30" fill="#252B31" stroke={steel} strokeWidth="2.5" />
        <rect x="66" y="1954" width="288" height="30" fill="#1E2429" stroke={steel} strokeWidth="2.5" />
        {/* רצועות קשירה */}
        <rect x="112" y="1844" width="16" height="148" fill={accent} opacity=".85" />
        <rect x="292" y="1844" width="16" height="148" fill={accent} opacity=".85" />
      </g>

      {/* ── רצפה ── */}
      <g opacity=".5">
        <path d="M-40 2118h500" stroke={steel} strokeWidth="3" />
        <path d="M-40 2140h500M-40 2160h500" stroke={steel} strokeWidth="1.5" opacity=".5" />
      </g>
    </svg>
  );
}
