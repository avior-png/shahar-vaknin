import Link from "next/link";
import Visual from "./Visual";
import { services } from "@/content/site";

/**
 * פסיפס השירותים — 2 / 3 / 2.
 *
 * העומק נבנה משכבות: תמונה שמתקרבת, הצללה שמתעמקת, לוח אדום
 * שנשטף מלמטה, מספר ענק בקו מתאר, וכרטיס שמתרומם עם צל אמיתי.
 * התיאור נחשף רק בהרחפה — במנוחה נשארת כותרת אחת נקייה.
 */

const SPANS = [3, 3, 2, 2, 2, 3, 3];

export default function ServiceMosaic() {
  return (
    <ul className="mt-16 grid gap-4 md:grid-cols-6">
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
            className="group relative flex h-[330px] flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] bg-night transition-all duration-500 hover:-translate-y-2 hover:shadow-deep md:h-[380px]"
          >
            {/* 1 · תמונה */}
            <span className="absolute inset-0 block transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]">
              <Visual
                id={`svc-${service.slug}`}
                alt=""
                spec={`רקע לשירות: ${service.title}`}
                width={900}
                height={1100}
                className="h-full w-full object-cover opacity-65 transition-opacity duration-500 group-hover:opacity-45"
              />
            </span>

            {/* 2 · הצללה */}
            <span
              aria-hidden="true"
              className="absolute inset-0 block bg-gradient-to-t from-night via-night/70 to-night/15"
            />

            {/* 3 · לוח אדום שנשטף מלמטה */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 block h-1/2 origin-bottom scale-y-0 bg-gradient-to-t from-red/85 to-transparent transition-transform duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-y-100"
            />

            {/* 4 · מסגרת פנימית */}
            <span
              aria-hidden="true"
              className="absolute inset-3 block rounded-[var(--radius-md)] border border-white/12 transition-colors duration-500 group-hover:border-white/25"
            />

            {/* 5 · מספר ענק בקו מתאר */}
            <span
              aria-hidden="true"
              className="ghost-num absolute -top-3 left-4 text-white transition-opacity duration-500 group-hover:opacity-30"
              style={{ fontSize: "7.5rem" }}
            >
              {service.n}
            </span>

            <div className="relative p-7">
              <h3 className="text-[1.4rem] leading-tight text-white transition-transform duration-500 group-hover:-translate-y-1">
                {service.title}
              </h3>

              <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[600ms] ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <p className="pt-3.5 text-[0.93rem] leading-relaxed text-white/85">
                    {service.summary}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M16 10H4M9 4.5L3.5 10 9 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-[0.85rem] font-semibold text-white/60">
                  {service.tagline}
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
