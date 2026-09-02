import { processSteps, processAxis } from "@/content/site";

/**
 * התהליך — תרשים גאנט.
 *
 * כל שלב הוא פס מעוגל שמדורג באלכסון על ציר זמן אמיתי:
 * המיקום והאורך שלו נגזרים מלוחות הזמנים בפועל, לא מהעיצוב.
 * מגדל פיקוד קטן וסנפיר בקצה נותנים את הרמז הימי בלי להפוך
 * את זה לאיור.
 *
 * ב-RTL ההתקדמות היא מימין לשמאל: יום 0 בימין, המחסן בשמאל.
 */
export default function Voyage() {
  return (
    <div className="mt-14 overflow-x-auto pb-2">
      <div className="relative min-w-[820px]">
        {/* קווי הרשת */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex">
          {processAxis.map((_, i) => (
            <span
              key={i}
              className="flex-1 border-l border-dashed border-white/[.09] first:border-r first:border-dashed first:border-white/[.09]"
            />
          ))}
        </div>

        <ol className="relative space-y-4 pb-8">
          {processSteps.map((step, i) => {
            const free = step.cost === "ללא עלות";
            return (
              <li
                key={step.n}
                className="reveal group relative"
                style={{
                  ["--reveal-delay" as string]: `${i * 110}ms`,
                  marginInlineStart: `${step.start}%`,
                  width: `${step.span}%`,
                  minWidth: "13rem",
                }}
              >
                {/* מגדל הפיקוד */}
                <span
                  aria-hidden="true"
                  className="absolute -top-[9px] right-8 h-[9px] w-9 rounded-t-[4px] bg-white/25"
                />
                {/* גוף הצוללת */}
                <div
                  className={`relative flex h-[54px] items-center gap-3 rounded-full pl-5 pr-2 backdrop-blur-sm transition-colors duration-300 ${
                    free
                      ? "bg-white/[.13] group-hover:bg-white/[.19]"
                      : "bg-red/25 group-hover:bg-red/35"
                  }`}
                >
                  <span
                    className={`flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full font-display text-[0.85rem] ${
                      free ? "bg-white/85 text-ink" : "bg-red text-white"
                    }`}
                  >
                    {step.n}
                  </span>
                  <h3 className="truncate text-[0.94rem] leading-none text-white md:text-[1.02rem]">
                    <span className="sr-only">שלב {step.n}: </span>
                    {step.title}
                  </h3>
                </div>
                {/* סנפיר */}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-[7px] right-12 h-[7px] w-6 rounded-b-[4px] bg-white/15"
                />

                {/* התיאור נחשף בהרחפה, כדי שהתרשים יישאר נקי */}
                <p className="pointer-events-none absolute right-0 top-[62px] z-10 w-[22rem] max-w-[80vw] rounded-[var(--radius-sm)] border border-white/12 bg-night/95 p-4 text-[0.86rem] leading-relaxed text-white/70 opacity-0 shadow-deep transition-opacity duration-300 group-hover:opacity-100">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>

        {/* ציר הזמן */}
        <div className="flex border-t border-white/15 pt-3">
          {processAxis.map((label) => (
            <span key={label} className="flex-1 text-[0.72rem] font-semibold text-white/40">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
