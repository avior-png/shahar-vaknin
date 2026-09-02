import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { SectionHead } from "@/components/Section";
import Visual from "@/components/Visual";
import CtaBand from "@/components/CtaBand";
import { about, credibility } from "@/content/site";

export const metadata: Metadata = { title: "מי אני", description: about.hero.lead };

export default function AboutPage() {
  return (
    <>
      <PageHero kicker={about.hero.eyebrow} title={about.hero.title} lead={about.hero.lead} />

      <Section tone="paper">
        <div className="bleed-start w-[320px] opacity-40">
          <Visual id="03-floor" alt="" spec="רצפת ייצור — גולש מעבר לקצה." width={2000} height={1500} />
        </div>
        <div className="relative grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="space-y-11">
            {about.story.map((chapter, i) => (
              <article key={chapter.title} className="reveal border-r-2 border-line pr-7" style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
                <span className="font-display text-[0.72rem] text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-2 text-[1.45rem] text-ink md:text-[1.75rem]">{chapter.title}</h2>
                <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">{chapter.body}</p>
              </article>
            ))}
          </div>
          <dl className="reveal grid gap-px border border-line bg-line lg:sticky lg:top-28">
            {credibility.facts.map((fact) => (
              <div key={fact.k} className="bg-paper-2 px-7 py-6">
                <dt className="text-[0.6rem] tracking-[0.13em] text-muted">{fact.k}</dt>
                <dd className="mt-2 text-[1.02rem] font-semibold leading-snug text-ink-2">{fact.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="paper-2">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHead kicker="שפה וגישה" title={about.language.title} />
          <div className="space-y-5">
            {about.language.body.map((p, i) => (
              <p key={i} className="reveal text-[1.03rem] leading-relaxed text-muted" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="paper">
        <SectionHead kicker="קווים אדומים" title={about.values.title} />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-3">
          {about.values.items.map((value, i) => (
            <article key={value.title} className="reveal bg-paper-2 p-8" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
              <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center border border-line-2 text-[1.1rem] text-muted">✕</span>
              <h3 className="mt-5 text-[1.2rem] text-ink">{value.title}</h3>
              <p className="mt-3 text-[0.96rem] leading-relaxed text-muted">{value.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
