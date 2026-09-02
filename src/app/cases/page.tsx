import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import CtaBand from "@/components/CtaBand";
import { cases, casesIntro } from "@/content/site";

export const metadata: Metadata = { title: "סיפורי מקרה", description: casesIntro.lead };

export default function CasesPage() {
  return (
    <>
      <PageHero eyebrow={casesIntro.eyebrow} title={casesIntro.title} lead={casesIntro.lead} />

      <Section tone="ground">
        <div className="space-y-px border border-line bg-line">
          {cases.map((item, i) => (
            <article
              key={item.slug}
              className="reveal bg-surface p-8 md:p-11"
              style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}
            >
              <div className="grid gap-9 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
                <div>
                  <p className="font-mono text-[0.64rem] tracking-[0.13em] text-accent-2">
                    {item.sector}
                  </p>
                  <h2 className="mt-3 text-[1.5rem] text-paper md:text-[2rem]">{item.title}</h2>
                  {item.body.map((paragraph, pi) => (
                    <p key={pi} className="mt-4 text-[1.01rem] leading-relaxed text-txt-2">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <dl className="grid content-start gap-px self-start border border-line bg-line">
                  {item.stats.map((stat) => (
                    <div key={stat.l} className="bg-ground px-6 py-5">
                      <dd className="numeral text-[1.9rem] leading-none text-accent-2">{stat.v}</dd>
                      <dt className="mt-2.5 font-mono text-[0.6rem] tracking-[0.1em] text-steel">
                        {stat.l}
                      </dt>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>

        <p className="reveal mt-10 max-w-[52em] border-r-[3px] border-line-2 pr-6 text-[0.96rem] leading-relaxed text-txt-2">
          שמות הלקוחות והמפעלים אינם מפורסמים. חלק מהעבודה הוא לא לחשוף את מי
          שעובד איתי — וזה נכון גם לגביך.
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
