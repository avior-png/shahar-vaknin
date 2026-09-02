import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { SectionHead } from "@/components/Section";
import CtaBand from "@/components/CtaBand";
import { processIntro, processSteps, commercials } from "@/content/site";

export const metadata: Metadata = {
  title: "איך זה עובד",
  description: processIntro.lead,
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow={processIntro.eyebrow}
        title={processIntro.title}
        lead={processIntro.lead}
      />

      <Section tone="paper">
        <ol className="relative space-y-3">
          {processSteps.map((step, i) => (
            <li
              key={step.n}
              className="reveal relative"
              style={{ ["--reveal-delay" as string]: `${i * 55}ms` }}
            >
              <div className="grid gap-6 rounded-2xl border border-line bg-paper-2/50 p-7 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-9 md:p-9">
                <span
                  className="numeral flex h-14 w-14 flex-none items-center justify-center rounded-full border-2 border-ink bg-paper text-[1.4rem]"
                  aria-hidden="true"
                >
                  {step.n}
                </span>

                <div>
                  <h2 className="text-[1.35rem] md:text-[1.6rem]">
                    <span className="sr-only">שלב {step.n}: </span>
                    {step.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
                    {step.body}
                  </p>
                </div>

                {/* תווית עלות — טקסט מלא, לא צבע בלבד */}
                <span
                  className={`font-label inline-flex flex-none items-center rounded-full px-4 py-2 text-[0.72rem] font-bold tracking-[0.1em] ${
                    step.cost === "ללא עלות"
                      ? "bg-ink text-paper"
                      : "border border-ink text-ink"
                  }`}
                >
                  {step.cost}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ink">
        <SectionHead eyebrow="מסחרי" title={commercials.title} tone="paper" />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {commercials.items.map((item, i) => (
            <article
              key={item.title}
              className="reveal border-t-2 border-amber-3 pt-6"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <h3 className="text-[1.22rem] text-paper">{item.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-paper/70">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
