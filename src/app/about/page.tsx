import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section, { SectionHead } from "@/components/Section";
import CtaBand from "@/components/CtaBand";
import { about, credibility } from "@/content/site";

export const metadata: Metadata = {
  title: "מי אני",
  description: about.hero.lead,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        lead={about.hero.lead}
      />

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <div className="space-y-12">
            {about.story.map((chapter, i) => (
              <article
                key={chapter.title}
                className="reveal border-r-2 border-line pr-7"
                style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
              >
                <span className="numeral text-[0.9rem] text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-2 text-[1.5rem] md:text-[1.75rem]">
                  {chapter.title}
                </h2>
                <p className="mt-4 text-[1.04rem] leading-relaxed text-muted">
                  {chapter.body}
                </p>
              </article>
            ))}
          </div>

          <dl className="reveal grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:sticky lg:top-28">
            {credibility.facts.map((fact) => (
              <div key={fact.k} className="bg-paper-2 px-7 py-6">
                <dt className="font-label text-[0.65rem] font-bold tracking-[0.14em] text-muted">
                  {fact.k}
                </dt>
                <dd className="mt-2 text-[1.05rem] font-semibold leading-snug">
                  {fact.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHead
            eyebrow="שפה וגישה"
            title={about.language.title}
            tone="paper"
          />
          <div className="space-y-5">
            {about.language.body.map((paragraph, i) => (
              <p
                key={i}
                className="reveal text-[1.05rem] leading-relaxed text-paper/75"
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="paper-2">
        <SectionHead eyebrow="קווים אדומים" title={about.values.title} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {about.values.items.map((value, i) => (
            <article
              key={value.title}
              className="reveal rounded-2xl border border-line bg-paper p-8"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink text-[1.15rem] font-bold"
              >
                ✕
              </span>
              <h3 className="mt-5 text-[1.24rem]">{value.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
