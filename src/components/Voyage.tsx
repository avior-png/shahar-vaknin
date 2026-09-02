import { processSteps } from "@/content/site";

/**
 * המסע — אזור התהליך.
 *
 * כל שלב הוא ספינה שמתקדמת שמאלה לאורך קו מים אחד, עד לנמל.
 * הקו נצבע באדום עד לנקודה שאליה הגיעו, וכך ההתקדמות נקראת
 * גם בלי לקרוא מילה.
 */

function Ship({ progress }: { progress: number }) {
  // ככל שמתקדמים, נערמות עוד שכבות מכולות על הסיפון
  const tiers = Math.min(3, Math.floor(progress * 3) + 1);
  return (
    <svg viewBox="0 0 96 62" className="h-14 w-[5.4rem]" fill="none" aria-hidden="true">
      {Array.from({ length: tiers }).map((_, t) => (
        <g key={t}>
          {[0, 1, 2].map((c) => (
            <rect
              key={c}
              x={24 + c * 17}
              y={34 - t * 9}
              width="15"
              height="8"
              rx="1.5"
              fill={t === tiers - 1 ? "#C0902A" : "#C4161C"}
              opacity={t === tiers - 1 ? 0.9 : 0.75}
            />
          ))}
        </g>
      ))}
      <path d="M12 42h72l-9 13H21z" fill="#17120F" />
      <rect x="66" y="24" width="13" height="12" rx="2" fill="#453C34" />
      <path d="M72.5 24v-7" stroke="#453C34" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Voyage() {
  const last = processSteps.length - 1;

  return (
    <div className="mt-14 overflow-x-auto pb-4">
      <ol className="relative flex min-w-[1080px] items-stretch gap-4 px-1">
        {/* קו המים */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-2 top-[86px] h-6"
        >
          <path
            d="M0 12q30-9 60 0t60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0 60 0"
            stroke="#C7B9A2"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {processSteps.map((step, i) => {
          const free = step.cost === "ללא עלות";
          return (
            <li
              key={step.n}
              className="reveal relative flex flex-1 flex-col"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              {/* הספינה — נעה שמאלה ככל שמתקדמים */}
              <div
                className="flex h-[92px] items-end"
                style={{ justifyContent: "flex-start", paddingInlineStart: `${(i / last) * 26}%` }}
              >
                <Ship progress={i / last} />
              </div>

              <div className="card card-lift mt-7 flex flex-1 flex-col bg-paper p-6">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-[1.9rem] leading-none text-gold">
                    {String(step.n).padStart(2, "0")}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-[0.7rem] font-bold ${
                      free ? "bg-red text-white" : "bg-paper-3 text-ink-2"
                    }`}
                  >
                    {step.cost}
                  </span>
                </div>
                <h3 className="mt-3.5 text-[1.18rem] leading-tight text-ink">
                  <span className="sr-only">שלב {step.n}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.93rem] leading-relaxed text-muted">
                  {step.body}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
