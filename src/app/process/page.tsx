import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { SectionHead } from "@/components/Section";
import ProductionLine from "@/components/ProductionLine";
import CtaBand from "@/components/CtaBand";
import { processIntro, processSteps, commercials } from "@/content/site";

export const metadata: Metadata = { title: "איך זה עובד", description: processIntro.lead };

export default function ProcessPage() {
  return (
    <>
      <PageHero eyebrow={processIntro.eyebrow} title={processIntro.title} lead={processIntro.lead} />

      <Section tone="ground" contained={false}>
        <ProductionLine />
      </Section>

      <Section tone="surface">
        <ol className="space-y-px border border-line bg-line">
          {processSteps.map((step) => {
            const free = step.cost === "ללא עלות";
            return (
              <li key={step.n} className="reveal grid gap-6 bg-surface p-7 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-9 md:p-9">
                <span aria-hidden="true" className={`numeral flex h-14 w-14 flex-none items-center justify-center border bg-ground text-[1.3rem] ${free ? "border-accent text-accent-2" : "border-line-2 text-steel"}`}>
                  {step.n}
                </span>
                <div>
                  <h2 className="text-[1.3rem] text-paper md:text-[1.55rem]">
                    <span className="sr-only">שלב {step.n}: </span>{step.title}
                  </h2>
                  <p className="mt-3 max-w-[46em] text-[1rem] leading-relaxed text-txt-2">{step.body}</p>
                </div>
                <span className={`inline-flex flex-none items-center border px-4 py-2 font-mono text-[0.62rem] tracking-[0.11em] ${free ? "border-accent bg-accent text-white" : "border-line-2 text-steel"}`}>
                  {step.cost}
                </span>
              </li>
            );
          })}
        </ol>
      </Section>

      <Section tone="ground">
        <SectionHead eyebrow="מסחרי" title={commercials.title} />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {commercials.items.map((item, i) => (
            <article key={item.title} className="reveal bg-surface p-8" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
              <h3 className="text-[1.2rem] text-paper">{item.title}</h3>
              <p className="mt-3 text-[0.96rem] leading-relaxed text-txt-2">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
