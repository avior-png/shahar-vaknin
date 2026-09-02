import Link from "next/link";
import Visual from "./Visual";
import { services } from "@/content/site";

/**
 * פסיפס השירותים — 2 / 3 / 2.
 * במנוחה: תמונת רקע, הצללה וכותרת. בהרחפה הכרטיסייה "נפתחת":
 * ההצללה מתעמקת, הכותרת עולה והתיאור נחשף מלמטה.
 */

// פריסת הפסיפס: כמה עמודות תופס כל אריח מתוך שש
const SPANS = [3, 3, 2, 2, 2, 3, 3];

export default function ServiceMosaic() {
  return (
    <ul className="mt-14 grid gap-3 md:grid-cols-6">
      {services.map((service, i) => (
        <li
          key={service.slug}
          className="reveal"
          style={{
            gridColumn: `span ${SPANS[i] ?? 2} / span ${SPANS[i] ?? 2}`,
            ["--reveal-delay" as string]: `${i * 60}ms`,
          }}
        >
          <Link
            href={`/services#${service.slug}`}
            className="group relative flex h-[300px] flex-col justify-end overflow-hidden rounded-[var(--radius-md)] border border-line bg-night md:h-[330px]"
          >
            {/* רקע */}
            <span className="absolute inset-0 -z-10 block transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]">
              <Visual
                id={`svc-${service.slug}`}
                alt=""
                spec={`רקע לשירות: ${service.title}`}
                width={900}
                height={1100}
                className="h-full w-full object-cover opacity-70"
              />
            </span>
            {/* הצללה — מתעמקת בהרחפה */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 block bg-gradient-to-t from-night via-night/80 to-night/35 transition-opacity duration-500 group-hover:from-night group-hover:via-night/90"
            />

            <div className="relative p-6">
              <span className="font-display text-[0.95rem] text-gold-2">{service.n}</span>
              <h3 className="mt-1.5 text-[1.35rem] leading-tight text-paper">
                {service.title}
              </h3>

              {/* נחשף בהרחפה — ובמובייל תמיד גלוי חלקית */}
              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pt-3 text-[0.92rem] leading-relaxed text-paper/80">
                    {service.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.9rem] font-bold text-gold-2">
                    לפרטים
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                      <path d="M16 10H4M9 4.5L3.5 10 9 15.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="mt-4 block h-[3px] w-10 origin-right bg-red transition-transform duration-500 group-hover:scale-x-[3.2]"
              />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
