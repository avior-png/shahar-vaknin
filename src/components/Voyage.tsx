import { processSteps } from "@/content/site";

/**
 * המסע — אזור התהליך.
 *
 * מבט עילי, בקנה מידה מרוסן: כל שלב הוא פס דק בצורת גוף
 * ספינה, עם חרטום מחודד לכיוון ההתקדמות (שמאלה). כל ספינה
 * מוסטת מעט שמאלה מקודמתה. מטען הסיפון זהה בכולן — מה
 * שמשתנה הוא רק המרחק שעברו.
 */
export default function Voyage() {
  const total = processSteps.length;

  return (
    <div className="relative mt-14">
      {/* קווי היעד */}
      <div className="mb-5 flex items-center justify-between text-[0.72rem] font-bold tracking-wide">
        <span className="flex items-center gap-2 text-gold-2">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-2" />
          ישראל
        </span>
        <span className="flex items-center gap-2 text-white/40">
          סין
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-red" />
        </span>
      </div>

      <ol className="space-y-6">
        {processSteps.map((step, i) => {
          const free = step.cost === "ללא עלות";
          return (
            <li
              key={step.n}
              className="reveal group"
              style={{
                ["--reveal-delay" as string]: `${i * 100}ms`,
                marginInlineStart: `${i * 3.2}%`,
                width: `${100 - (total - 1) * 3.2}%`,
              }}
            >
              {/* גוף הספינה — פס דק */}
              <div className="hull relative flex h-[58px] items-center gap-3.5 bg-gradient-to-l from-white via-[#F4F4F2] to-[#DCDCD8] pl-[9%] pr-3 shadow-[0_16px_28px_-18px_rgba(0,0,0,.9)] transition-transform duration-500 group-hover:-translate-x-1.5 md:h-[64px] md:gap-4 md:pr-3.5">
                {/* מטען הסיפון — זהה בכל שלב */}
                <span
                  aria-hidden="true"
                  className="deck pointer-events-none absolute inset-y-[26%] left-[11%] right-[3.6rem]"
                />
                {/* מגדל הפיקוד, בירכתיים — נושא את מספר השלב */}
                <span
                  className={`relative flex h-9 w-9 flex-none items-center justify-center rounded-[7px] font-display text-[0.88rem] ${
                    free ? "bg-red text-white" : "bg-ink text-white"
                  }`}
                >
                  {String(step.n).padStart(2, "0")}
                </span>

                <h3 className="relative truncate text-[0.98rem] leading-none text-ink md:text-[1.12rem]">
                  <span className="sr-only">שלב {step.n}: </span>
                  {step.title}
                </h3>

                <span
                  className={`relative mr-auto hidden flex-none rounded-full px-2.5 py-1 text-[0.66rem] font-bold sm:block ${
                    free ? "bg-gold-soft text-ink" : "bg-ink/10 text-ink-2"
                  }`}
                >
                  {step.cost}
                </span>
              </div>

              <p className="mt-2.5 max-w-[54em] pr-2 text-[0.88rem] leading-relaxed text-white/50">
                {step.body}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
