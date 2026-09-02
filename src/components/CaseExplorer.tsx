"use client";

import { useState } from "react";
import Slot from "./Slot";
import { cases } from "@/content/site";

/**
 * סיפורי מקרה.
 *
 * לוח כהה אחד. המספר המרכזי של כל מקרה מודפס ענק ברקע בקו
 * מתאר, התמונה יושבת ככרטיס מוסט עם צל, והמעבר בין המקרים
 * נעשה ברצועת בוררים ממוספרת — בלי שהפריסה זזה.
 */
export default function CaseExplorer({
  backgrounds,
}: {
  backgrounds: Record<string, string | null>;
}) {
  const [active, setActive] = useState(0);
  const item = cases[active];
  const headline = item.stats[0];

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-night text-white">
      {/* המספר המרכזי, ענק ומאחור */}
      <span
        aria-hidden="true"
        className="ghost-num pointer-events-none absolute -top-6 left-[-2%] text-white"
        style={{ fontSize: "clamp(9rem,24vw,20rem)" }}
      >
        {headline.v}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(196,22,28,.4), transparent 68%)" }}
      />

      <div className="relative grid gap-10 p-7 md:p-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* התוכן */}
        <div>
          <p className="flex items-center gap-2.5 text-[0.92rem] font-bold text-gold-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold-2" />
            {item.sector}
          </p>
          <h3 className="display-sm mt-4 max-w-[16ch] text-white">{item.title}</h3>

          {item.body.map((paragraph, pi) => (
            <p key={pi} className="mt-4 max-w-[44em] text-[1rem] leading-relaxed text-white/65">
              {paragraph}
            </p>
          ))}

          <dl className="mt-9 grid gap-3 sm:grid-cols-3">
            {item.stats.map((stat, si) => (
              <div
                key={stat.l}
                className={`rounded-[var(--radius-sm)] border p-4 ${
                  si === 0 ? "border-red bg-red/12" : "border-white/12 bg-white/[.04]"
                }`}
              >
                <dd className={`font-display text-[1.75rem] leading-none ${si === 0 ? "text-red-3" : "text-gold-2"}`}>
                  {stat.v}
                </dd>
                <dt className="mt-2.5 text-[0.78rem] font-semibold leading-snug text-white/55">
                  {stat.l}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        {/* התמונה — כרטיס מוסט עם צל */}
        <div className="relative lg:self-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-white/12 shadow-deep">
            {cases.map((c, i) => (
              <span
                key={c.slug}
                aria-hidden="true"
                className="absolute inset-0 block transition-opacity duration-700 ease-out"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <Slot
                  src={backgrounds[c.slug] ?? null}
                  id={`case-${c.slug}`}
                  alt=""
                  spec={`רקע לסיפור: ${c.title}`}
                  width={1600}
                  height={1200}
                  className="h-full w-full object-cover"
                />
              </span>
            ))}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent"
            />
          </div>
          <span
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-[var(--radius-lg)] border border-red/45"
          />
        </div>
      </div>

      {/* רצועת הבוררים */}
      <div
        role="tablist"
        aria-label="סיפורי מקרה"
        className="relative flex gap-px overflow-x-auto border-t border-white/10 bg-white/[.03]"
      >
        {cases.map((c, i) => {
          const on = i === active;
          return (
            <button
              key={c.slug}
              role="tab"
              type="button"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`group relative flex-1 whitespace-nowrap px-5 py-5 text-right transition-colors ${
                on ? "bg-white/[.07]" : "hover:bg-white/[.05]"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 h-[3px] origin-right bg-red transition-transform duration-500 ${
                  on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
              <span className={`block font-display text-[0.95rem] ${on ? "text-gold-2" : "text-white/35"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`mt-1 block text-[0.92rem] font-semibold ${on ? "text-white" : "text-white/55"}`}>
                {c.sector}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
