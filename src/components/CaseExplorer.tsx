"use client";

import { useState } from "react";
import Slot from "./Slot";
import { cases } from "@/content/site";

/**
 * סיפורי מקרה.
 *
 * במקום שלוש תיבות זהות — לוח אחד. הכפתורים יושבים בצד קבוע
 * מהרגע הראשון והמקרה הראשון פתוח כברירת מחדל, כך שאין קפיצה
 * בפריסה; רק הרקע והתוכן מתחלפים בהצלבה.
 */
export default function CaseExplorer({
  backgrounds,
}: {
  /** נתיבי הרקעים, נפתרים בשרת — קומפוננטת לקוח לא ניגשת לקבצים */
  backgrounds: Record<string, string | null>;
}) {
  const [active, setActive] = useState(0);
  const item = cases[active];

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-line bg-night">
      {/* רקע מתחלף */}
      {cases.map((c, i) => (
        <span
          key={c.slug}
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-700 ease-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Slot
            src={backgrounds[c.slug] ?? null}
            id={`case-${c.slug}`}
            alt=""
            spec={`רקע לסיפור: ${c.title}`}
            width={2000}
            height={1300}
            className="h-full w-full object-cover"
          />
        </span>
      ))}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-l from-night via-night/92 to-night/70"
      />

      <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_290px] lg:gap-12">
        {/* התוכן */}
        <div key={item.slug} className="min-h-[360px]">
          <p className="text-[0.92rem] font-bold text-gold-2">{item.sector}</p>
          <h3 className="display-sm mt-3 max-w-[18ch] text-paper">{item.title}</h3>
          {item.body.map((paragraph, pi) => (
            <p key={pi} className="mt-4 max-w-[46em] text-[1rem] leading-relaxed text-paper/75">
              {paragraph}
            </p>
          ))}

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-paper/15 pt-6">
            {item.stats.map((stat) => (
              <div key={stat.l}>
                <dd className="font-display text-[2.2rem] leading-none text-gold-2">{stat.v}</dd>
                <dt className="mt-2 text-[0.82rem] font-semibold text-paper/55">{stat.l}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* הבוררים */}
        <div
          role="tablist"
          aria-label="סיפורי מקרה"
          aria-orientation="vertical"
          className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
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
                className={`flex-none rounded-[var(--radius-sm)] border px-4 py-3.5 text-right text-[0.92rem] font-semibold transition-colors lg:flex-auto ${
                  on
                    ? "border-red bg-red text-white"
                    : "border-paper/20 text-paper/70 hover:border-paper/45 hover:text-paper"
                }`}
              >
                <span className="block whitespace-nowrap lg:whitespace-normal">
                  {c.sector}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
