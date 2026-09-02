import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import CtaBand from "@/components/CtaBand";
import { faq, faqIntro } from "@/content/site";

export const metadata: Metadata = { title: "שאלות ותשובות", description: faqIntro.lead };

/** נתונים מובנים — עוזר לגוגל להציג את השאלות בתוצאות החיפוש. */
function FaqSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function FaqPage() {
  return (
    <>
      <FaqSchema />
      <PageHero eyebrow={faqIntro.eyebrow} title={faqIntro.title} lead={faqIntro.lead} />

      <Section tone="ground">
        <div className="mx-auto max-w-4xl border-t border-line">
          {faq.map((item, i) => (
            <details
              key={item.q}
              className="group border-b border-line"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-start gap-5 py-6 [&::-webkit-details-marker]:hidden">
                <span className="numeral mt-1 font-mono text-[0.68rem] text-steel">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="flex-1 font-display text-[1.15rem] leading-snug text-paper md:text-[1.35rem]">
                  {item.q}
                </h2>
                <span
                  aria-hidden="true"
                  className="mt-1 flex h-7 w-7 flex-none items-center justify-center border border-line-2 text-accent-2 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[54em] pb-7 pr-[3.1rem] text-[1rem] leading-relaxed text-txt-2">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
