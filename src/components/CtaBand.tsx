import Link from "next/link";
import { finalCta } from "@/content/site";

/** נחיתה בבהיר — הסוף הישראלי של המסע. */
export default function CtaBand() {
  return (
    <section className="border-t border-paper-line bg-paper py-20 text-ink md:py-28">
      <div className="container-x">
        <div className="reveal max-w-3xl">
          <h2 className="text-[clamp(1.9rem,5vw,3.2rem)] text-ink">{finalCta.title}</h2>
          <p className="mt-5 max-w-[38em] text-[1.05rem] leading-relaxed text-ink/70">
            {finalCta.body}
          </p>
          <Link
            href={finalCta.cta.href}
            className="mt-9 inline-flex items-center gap-3 bg-ink px-8 py-4 font-bold text-paper transition-colors hover:bg-accent"
          >
            {finalCta.cta.label}
            <span aria-hidden="true">←</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
