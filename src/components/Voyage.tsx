import { processSteps } from "@/content/site";

/**
 * המסע — אזור התהליך.
 *
 * מבט עילי: כל שלב הוא גוף ספינה מודרנית שנראית מלמעלה, עם
 * חרטום מחודד בכיוון ההתקדמות (שמאלה). כל ספינה מוסטת מעט
 * שמאלה מקודמתה, וכך ההתקדמות נקראת כמדרגות. מטען הסיפון
 * זהה בכולן — מה שמשתנה זה המרחק שעברו.
 */
export default function Voyage() {
  const total = processSteps.length;

  return (
    <div className="relative mt-16">
      {/* נתיב ההפלגה */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[3%] hidden w-px border-l border-dashed border-white/18 md:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 left-0 hidden items-center gap-2 text-[0.72rem] font-bold tracking-wide text-gold-2 md:flex"
      >
        <span className="h-2 w-2 rounded-full bg-gold-2" />
        ישראל
      </span>

      <ol className="space-y-7 md:space-y-5">
        {processSteps.map((step, i) => {
          const free = step.cost === "ללא עלות";
          return (
            <li
              key={step.n}
              className="reveal group"
              style={{
                ["--reveal-delay" as string]: `${i * 110}ms`,
                marginInlineStart: `${i * 2.4}%`,
                width: `${100 - (total - 1) * 2.4}%`,
                minWidth: "min(100%, 22rem)",
              }}
            >
              {/* גוף הספינה */}
              <div className="hull relative flex h-[110px] items-center gap-5 bg-gradient-to-l from-white via-[#F1F1EF] to-[#D9D9D5] pl-[17%] pr-4 shadow-deep transition-transform duration-500 group-hover:-translate-x-2 md:h-[124px]">
                {/* מטען הסיפון — זהה בכל שלב */}
                <span
                  aria-hidden="true"
                  className="deck pointer-events-none absolute inset-y-[22%] left-[19%] right-[6.5rem] opacity-70"
                  style={{ mixBlendMode: "multiply" }}
                />

                {/* מגדל הפיקוד, בירכתיים — נושא את מספר השלב */}
                <span
                  className={`relative flex h-[3.1rem] w-[3.1rem] flex-none items-center justify-center rounded-[10px] font-display text-[1.1rem] shadow-[0_6px_14px_-6px_rgba(0,0,0,.6)] ${
                    free ? "bg-red text-white" : "bg-ink text-white"
                  }`}
                >
                  {String(step.n).padStart(2, "0")}
                </span>

                <div className="relative min-w-0 flex-1">
                  <h3 className="truncate text-[1.1rem] leading-tight text-ink md:text-[1.35rem]">
                    <span className="sr-only">שלב {step.n}: </span>
                    {step.title}
                  </h3>
                  <span
                    className={`mt-1.5 inline-block rounded-full px-3 py-[3px] text-[0.7rem] font-bold ${
                      free ? "bg-gold-soft text-ink" : "bg-ink/[.08] text-ink-2"
                    }`}
                  >
                    {step.cost}
                  </span>
                </div>
              </div>

              {/* קילוו */}
              <p className="mt-3 max-w-[52em] pr-6 text-[0.95rem] leading-relaxed text-white/60">
                {step.body}
              </p>
            </li>
          );
        })}
      </ol>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 right-0 hidden items-center gap-2 text-[0.72rem] font-bold tracking-wide text-white/45 md:flex"
      >
        סין
        <span className="h-2 w-2 rounded-full bg-red" />
      </span>
    </div>
  );
}
