import { processSteps } from "@/content/site";

/**
 * קו הייצור — אזור התהליך.
 *
 * התרגום של "הספינות בשלבי התקדמות שונים" מהרפרנס: מסוע אחד
 * עם שבע תחנות, ובכל אחת אותו פריט שלב אחד יותר מוגמר.
 * הכל HTML ו-SVG — אפס תמונות, ולכן קל לעדכן ומהיר לטעינה.
 *
 * זה הרכיב היחיד באתר שנוגע בשני קצות המסך.
 */

const ICONS = [
  // 01 אפיון — גוש חומר גלם
  <path key="a" d="M9 15h16v10H9z M9 15l4-4h16l-4 4" strokeLinejoin="round" />,
  // 02 איתור — זכוכית מגדלת
  <>
    <circle key="b1" cx="15" cy="15" r="7" />
    <path key="b2" d="M20.3 20.3L27 27" strokeLinecap="round" />
  </>,
  // 03 מפרט — מסמך עם שרטוט
  <>
    <path key="c1" d="M8 7h18v20H8z" />
    <path key="c2" d="M12 13h10M12 17h7M12 21h10" strokeLinecap="round" />
  </>,
  // 04 הצעה — מפעל
  <path key="d" d="M5 26V14l7 4V14l7 4V9l10 5v12z" strokeLinejoin="round" />,
  // 05 ייצור — גלגל שיניים
  <>
    <circle key="e1" cx="17" cy="17" r="5" />
    <path key="e2" d="M17 5v4M17 25v4M5 17h4M25 17h4M8.5 8.5l2.9 2.9M22.6 22.6l2.9 2.9M25.5 8.5l-2.9 2.9M11.4 22.6l-2.9 2.9" strokeLinecap="round" />
  </>,
  // 06 בקרת איכות — וי בתוך מסגרת
  <>
    <path key="f1" d="M6 6h22v22H6z" />
    <path key="f2" d="M11 17.5l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
  </>,
  // 07 מסירה — מחסן
  <>
    <path key="g1" d="M4 27h26" strokeLinecap="round" />
    <path key="g2" d="M7 27V14l10-6 10 6v13" strokeLinejoin="round" />
    <path key="g3" d="M13 27v-7h8v7" />
  </>,
];

export default function ProductionLine() {
  return (
    <div className="mt-14 overflow-x-auto pb-3">
      <ol className="relative flex min-w-[900px] items-start gap-0 px-1">
        {/* המסוע */}
        <span
          aria-hidden="true"
          className="absolute inset-x-1 top-[38px] h-px bg-line-2"
        />
        {processSteps.map((step, i) => {
          const free = step.cost === "ללא עלות";
          return (
            <li
              key={step.n}
              className="reveal relative flex-1 px-2 text-center"
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <span
                className={`relative z-10 mx-auto flex h-[76px] w-[76px] items-center justify-center border bg-ground ${
                  free ? "border-accent" : "border-line-2"
                }`}
              >
                <svg
                  viewBox="0 0 34 34"
                  fill="none"
                  className="h-9 w-9"
                  stroke={free ? "#FF7A46" : "#78868E"}
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  {ICONS[i]}
                </svg>
              </span>

              <h3 className="mt-4 text-[1rem] leading-tight text-paper">
                <span className="sr-only">שלב {step.n}: </span>
                {step.title}
              </h3>
              <p
                className={`mt-2 font-mono text-[0.6rem] tracking-[0.1em] ${
                  free ? "text-accent-2" : "text-steel"
                }`}
              >
                {step.cost}
              </p>
              <p className="mx-auto mt-3 max-w-[24ch] text-[0.85rem] leading-relaxed text-txt-2">
                {step.body}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
