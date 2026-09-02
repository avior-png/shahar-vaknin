import Link from "next/link";
import Section, { SectionHead } from "@/components/Section";
import CtaBand from "@/components/CtaBand";
import {
  hero,
  heroStats,
  problem,
  solution,
  credibility,
  services,
  servicesIntro,
  cases,
  homeCases,
  audience,
  ctaPrimary,
  ctaSecondary,
} from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="on-dark relative overflow-hidden bg-ink text-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 8%, #12909C 0%, transparent 48%), radial-gradient(circle at 5% 95%, #B5730D 0%, transparent 42%)",
          }}
        />
        <div className="container-x relative py-24 md:py-32">
          <div className="max-w-4xl">
            <p className="eyebrow reveal">{hero.eyebrow}</p>
            <h1
              className="reveal mt-7 text-[clamp(2.3rem,6.6vw,4.5rem)] text-paper"
              style={{ ["--reveal-delay" as string]: "60ms" }}
            >
              {hero.title}
              <span className="mt-2 block text-paper/55">{hero.titleAccent}</span>
            </h1>
            <p
              className="reveal mt-8 max-w-2xl text-[1.1rem] leading-relaxed text-paper/80 md:text-[1.28rem]"
              style={{ ["--reveal-delay" as string]: "140ms" }}
            >
              {hero.lead}
            </p>
            <p
              className="reveal mt-7 font-display text-[1.6rem] font-bold text-amber-3 md:text-[2rem]"
              style={{ ["--reveal-delay" as string]: "200ms" }}
            >
              {hero.kicker}
            </p>

            <div
              className="reveal mt-11 flex flex-col gap-3 sm:flex-row"
              style={{ ["--reveal-delay" as string]: "260ms" }}
            >
              <Link
                href={ctaPrimary.href}
                className="rounded-full bg-amber-2 px-8 py-4 text-center text-[1rem] font-bold text-ink transition-colors hover:bg-amber-3"
              >
                {ctaPrimary.label}
              </Link>
              <Link
                href={ctaSecondary.href}
                className="rounded-full border border-paper/35 px-8 py-4 text-center text-[1rem] font-bold text-paper transition-colors hover:border-paper hover:bg-paper/10"
              >
                {ctaSecondary.label}
              </Link>
            </div>
          </div>

          <dl className="reveal mt-20 grid gap-px overflow-hidden rounded-2xl border border-paper/20 bg-paper/20 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="bg-ink px-6 py-7">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="numeral text-[2.9rem] text-paper">{stat.value}</span>
                  <span className="font-label mr-2 text-[0.82rem] font-bold tracking-wide text-amber-3">
                    {stat.unit}
                  </span>
                  <span className="mt-1.5 block text-[0.95rem] text-paper/65">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ─── הבעיה ────────────────────────────────────────────── */}
      <Section tone="paper">
        <SectionHead
          eyebrow={problem.label}
          title={problem.title}
          lead={problem.lead}
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {problem.fears.map((fear, i) => (
            <article
              key={fear.title}
              className="reveal bg-paper p-8 md:p-9"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <span className="numeral block text-[0.95rem] text-teal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-[1.3rem]">{fear.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{fear.body}</p>
            </article>
          ))}
        </div>
        <p className="reveal mt-12 max-w-2xl border-r-4 border-amber-2 pr-6 font-display text-[1.35rem] leading-snug font-bold md:text-[1.6rem]">
          {problem.closing}
        </p>
      </Section>

      {/* ─── הפתרון ───────────────────────────────────────────── */}
      <Section tone="ink">
        <SectionHead
          eyebrow={solution.label}
          title={solution.title}
          lead={solution.lead}
          tone="paper"
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {solution.pillars.map((pillar, i) => (
            <article
              key={pillar.title}
              className="reveal border-t-2 border-amber-3 pt-6"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <h3 className="text-[1.22rem] text-paper">{pillar.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-paper/70">
                {pillar.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* ─── מי עומד מאחורי זה ────────────────────────────────── */}
      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="reveal">
            <p className="eyebrow">{credibility.label}</p>
            <h2 className="mt-5 text-[clamp(1.75rem,4.2vw,2.85rem)]">
              {credibility.title}
            </h2>
            <p className="mt-6 text-[1.06rem] leading-relaxed text-muted md:text-[1.13rem]">
              {credibility.body}
            </p>
            <Link
              href={credibility.cta.href}
              className="mt-8 inline-flex items-center gap-2 border-b-2 border-teal pb-1 font-bold text-ink hover:border-amber-2"
            >
              {credibility.cta.label}
              <span aria-hidden="true">←</span>
            </Link>
          </div>

          <dl className="reveal grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {credibility.facts.map((fact) => (
              <div key={fact.k} className="bg-paper-2 px-6 py-6">
                <dt className="font-label text-[0.65rem] font-bold tracking-[0.14em] text-muted">
                  {fact.k}
                </dt>
                <dd className="mt-2 text-[1.02rem] font-semibold leading-snug">
                  {fact.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ─── שירותים ──────────────────────────────────────────── */}
      <Section tone="paper-2">
        <SectionHead
          eyebrow={servicesIntro.eyebrow}
          title={servicesIntro.title}
          lead={servicesIntro.lead}
        />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <li
              key={service.slug}
              className="reveal"
              style={{ ["--reveal-delay" as string]: `${i * 55}ms` }}
            >
              <Link
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col rounded-xl border border-line bg-paper p-7 transition-colors hover:border-ink"
              >
                <span className="numeral text-[0.9rem] text-teal">{service.n}</span>
                <h3 className="mt-2.5 text-[1.24rem] group-hover:underline">
                  {service.title}
                </h3>
                <p className="font-label mt-1.5 text-[0.72rem] font-bold tracking-[0.1em] text-muted-2">
                  {service.tagline}
                </p>
                <p className="mt-4 text-[0.96rem] leading-relaxed text-muted">
                  {service.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ─── סיפורי מקרה ──────────────────────────────────────── */}
      <Section tone="paper">
        <SectionHead
          eyebrow={homeCases.label}
          title={homeCases.title}
          lead={homeCases.lead}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {cases.slice(0, 3).map((item, i) => (
            <article
              key={item.slug}
              className="reveal flex flex-col rounded-2xl border-2 border-ink bg-paper p-7"
              style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
            >
              <p className="font-label text-[0.68rem] font-bold tracking-[0.13em] text-teal">
                {item.sector}
              </p>
              <h3 className="mt-3 text-[1.3rem]">{item.title}</h3>
              <p className="mt-4 flex-1 text-[0.96rem] leading-relaxed text-muted">
                {item.body[0]}
              </p>
              <dl className="mt-6 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-5">
                {item.stats.map((stat) => (
                  <div key={stat.l}>
                    <dd className="numeral text-[1.45rem] leading-none">{stat.v}</dd>
                    <dt className="font-label mt-1.5 text-[0.62rem] font-bold tracking-[0.1em] text-muted">
                      {stat.l}
                    </dt>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <Link
          href={homeCases.cta.href}
          className="reveal mt-12 inline-flex items-center gap-2 border-b-2 border-teal pb-1 font-bold text-ink hover:border-amber-2"
        >
          {homeCases.cta.label}
          <span aria-hidden="true">←</span>
        </Link>
      </Section>

      {/* ─── למי זה מתאים ─────────────────────────────────────── */}
      <Section tone="paper-2">
        <SectionHead eyebrow={audience.label} title={audience.title} />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[audience.yes, audience.no].map((group, gi) => (
            <div
              key={group.title}
              className="reveal rounded-2xl border border-line bg-paper p-8"
              style={{ ["--reveal-delay" as string]: `${gi * 90}ms` }}
            >
              {/* המצב מסומן בתו ובתווית, לא בצבע בלבד */}
              <h3 className="flex items-center gap-3 text-[1.35rem]">
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border-2 text-[1.1rem] font-bold ${
                    gi === 0 ? "border-ink bg-ink text-paper" : "border-ink text-ink"
                  }`}
                >
                  {gi === 0 ? "✓" : "✕"}
                </span>
                {group.title}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.99rem] leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-4 flex-none bg-teal"
                    />
                    <span className={gi === 0 ? "text-ink" : "text-muted"}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="reveal mt-10 max-w-3xl rounded-xl border-r-4 border-teal bg-paper px-7 py-6 text-[1rem] leading-relaxed text-muted">
          {audience.note}
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
