import Link from "next/link";
import { finalCta } from "@/content/site";

export default function CtaBand() {
  return (
    <section className="bg-paper-2 py-20 md:py-section">
      <div className="container-x">
        <div className="reveal relative overflow-hidden rounded-3xl border-2 border-ink bg-paper px-7 py-14 md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full border-[14px] border-amber-soft"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-[clamp(1.7rem,4vw,2.6rem)]">{finalCta.title}</h2>
            <p className="mt-5 text-[1.06rem] leading-relaxed text-muted md:text-[1.13rem]">
              {finalCta.body}
            </p>
            <Link
              href={finalCta.cta.href}
              className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[1rem] font-bold text-paper transition-colors hover:bg-teal"
            >
              {finalCta.cta.label}
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                <path
                  d="M13 4L7 10l6 6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
