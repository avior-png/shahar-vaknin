import Link from "next/link";
import Section, { SectionHead } from "@/components/Section";
import ProductionLine from "@/components/ProductionLine";
import Visual from "@/components/Visual";
import FlagWord from "@/components/FlagWord";
import CtaBand from "@/components/CtaBand";
import {
  hero, heroStats, problem, credibility,
  services, servicesIntro, cases, homeCases, audience,
  positioning, processIntro, delivery, ctaPrimary, ctaSecondary,
} from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          אזור הציר — הירו + נתונים + הבעיה.
          מנוף הגשר של המפעל חוצה את שלושתם. התוכן יושב
          ב-.spine-safe ששומר לו עמודה ריקה בצד שמאל.
          ══════════════════════════════════════════════════════ */}
      <div className="spine-zone border-b border-line bg-ground">
        <div className="spine">
          <Visual
            id="01-crane"
            alt=""
            spec="מנוף גשר של מפעל — וו ושרשרת יורדים, נושאים צרור פלדה מעל קו הייצור. תופס שלושה אזורים לגובה."
            width={1440}
            height={3400}
            priority
          />
        </div>

        {/* ─── הירו ─── */}
        <div className="container-x relative pb-14 pt-20 md:pt-28">
          <div className="spine-safe">
            <p className="eyebrow reveal">{hero.eyebrow}</p>
            <h1
              className="reveal mt-7 text-[clamp(2.6rem,7.6vw,5.6rem)] text-paper"
              style={{ ["--reveal-delay" as string]: "60ms" }}
            >
              העיניים שלך <FlagWord flag="cn">בסין</FlagWord>
            </h1>
            <p
              className="reveal mt-8 max-w-[34em] text-[1.08rem] leading-relaxed text-txt-2 md:text-[1.24rem]"
              style={{ ["--reveal-delay" as string]: "130ms" }}
            >
              עשרים שנה חייתי ועבדתי שם. אני מאתר את המפעל האמיתי, מנהל את
              המשא ומתן בסינית, ובודק את הסחורה{" "}
              <b className="font-bold text-paper">לפני</b> שהיא עולה על האונייה.
            </p>
            <div
              className="reveal mt-10 flex flex-col gap-3 sm:flex-row"
              style={{ ["--reveal-delay" as string]: "200ms" }}
            >
              <Link
                href={ctaPrimary.href}
                className="bg-accent px-8 py-4 text-center font-bold text-white transition-colors hover:bg-accent-2 hover:text-accent-ink"
              >
                {ctaPrimary.label}
              </Link>
              <Link
                href={ctaSecondary.href}
                className="border border-line-2 px-8 py-4 text-center font-bold text-paper transition-colors hover:border-paper"
              >
                {ctaSecondary.label}
              </Link>
            </div>
          </div>
        </div>

        {/* ─── רצועת נתונים ─── */}
        <div className="container-x relative pb-20">
          <div className="spine-safe">
            <dl className="reveal grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="bg-surface px-6 py-6">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="numeral text-[2.4rem] leading-none text-paper">
                      {stat.value}
                    </span>
                    <span className="mr-2 font-mono text-[0.78rem] font-semibold text-accent-2">
                      {stat.unit}
                    </span>
                    <span className="mt-2.5 block font-mono text-[0.62rem] tracking-[0.1em] text-steel">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ─── הבעיה ─── */}
        <div className="container-x relative pb-24">
          <div className="spine-safe">
            <SectionHead eyebrow={problem.label} title={problem.title} lead={problem.lead} />

            <ul className="reveal mt-12 border-t border-line">
              {problem.fears.map((fear, i) => (
                <li
                  key={fear.title}
                  className="flex items-start gap-5 border-b border-line py-6"
                >
                  {/* תיבה ריקה — הבדיקה שלא נעשתה */}
                  <span aria-hidden="true" className="mt-1.5 h-5 w-5 flex-none border border-line-2" />
                  <div>
                    <h3 className="text-[1.15rem] text-paper md:text-[1.35rem]">
                      {fear.title}
                    </h3>
                    <p className="mt-2 max-w-[46em] text-[0.98rem] leading-relaxed text-txt-2">
                      {fear.body}
                    </p>
                  </div>
                  <span className="mr-auto hidden pt-2 font-mono text-[0.62rem] tracking-[0.1em] text-steel sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>

            <p className="reveal mt-10 max-w-[26em] border-r-[3px] border-accent pr-6 font-display text-[1.3rem] leading-snug text-paper md:text-[1.7rem]">
              {problem.closing}
            </p>
          </div>
        </div>
      </div>

      {/* ══ שבירה כתומה — מקצה לקצה ══ */}
      <section className="relative overflow-hidden bg-accent py-20 text-accent-ink md:py-24">
        <div className="bleed-end w-[280px] opacity-90">
          <Visual
            id="02-seal"
            alt=""
            spec="חותם נעילה של מכולה — מקרו, גוף כתום, נחתך בקצה המסך."
            width={1600}
            height={1600}
          />
        </div>
        <div className="container-x relative">
          <div className="max-w-3xl">
            <p className="eyebrow eyebrow-plain reveal !text-accent-ink/60">{positioning.title}</p>
            <h2 className="reveal mt-5 text-[clamp(1.9rem,6vw,4rem)] text-accent-ink">
              {positioning.statement}
            </h2>
            <p className="reveal mt-7 font-mono text-[0.68rem] tracking-[0.16em] text-accent-ink/65">
              לא סוכן · לא מתווך · לא אתר לאיתור ספקים
            </p>
          </div>
        </div>
      </section>

      {/* ══ מי אני ══ */}
      <Section tone="ground">
        <div className="bleed-start w-[300px] opacity-45">
          <Visual
            id="03-floor"
            alt=""
            spec="רצפת ייצור סינית — קו פעיל, מכונות, אובך. גולש מעבר לקצה הימני."
            width={2000}
            height={1500}
          />
        </div>
        <div className="relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div className="reveal">
            <p className="eyebrow">{credibility.label}</p>
            <h2 className="mt-5 text-[clamp(1.8rem,4.6vw,3.1rem)] text-paper">
              {credibility.title}
            </h2>
            <p className="mt-6 max-w-[38em] text-[1.04rem] leading-relaxed text-txt-2">
              {credibility.body}
            </p>
            <Link
              href={credibility.cta.href}
              className="mt-8 inline-flex items-center gap-2 border-b-2 border-accent pb-1 font-bold text-paper hover:border-paper"
            >
              {credibility.cta.label} <span aria-hidden="true">←</span>
            </Link>
          </div>
          <dl className="reveal grid gap-px border border-line bg-line sm:grid-cols-2">
            {credibility.facts.map((fact) => (
              <div key={fact.k} className="bg-surface px-6 py-6">
                <dt className="font-mono text-[0.6rem] tracking-[0.13em] text-steel">
                  {fact.k}
                </dt>
                <dd className="mt-2 text-[1rem] font-semibold leading-snug text-txt">
                  {fact.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ══ שירותים ══ */}
      <Section tone="surface">
        <SectionHead eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} lead={servicesIntro.lead} />
        <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <li key={service.slug} className="reveal bg-surface" style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}>
              <Link href={`/services#${service.slug}`} className="group flex h-full flex-col bg-surface p-7 transition-colors hover:bg-surface-2">
                <span className="numeral text-[0.8rem] text-accent-2">{service.n}</span>
                <h3 className="mt-2.5 text-[1.2rem] text-paper group-hover:underline">
                  {service.title}
                </h3>
                <p className="mt-1.5 font-mono text-[0.62rem] tracking-[0.09em] text-steel">
                  {service.tagline}
                </p>
                <p className="mt-4 text-[0.94rem] leading-relaxed text-txt-2">
                  {service.summary}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ══ קו הייצור — מקצה לקצה ══ */}
      <Section tone="ground" contained={false} id="process">
        <div className="container-x">
          <SectionHead eyebrow={processIntro.eyebrow} title={processIntro.title} lead={processIntro.lead} />
        </div>
        <ProductionLine />
      </Section>

      {/* ══ הוכחות ══ */}
      <Section tone="surface">
        <SectionHead eyebrow={homeCases.label} title={homeCases.title} lead={homeCases.lead} />
        <div className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-3">
          {cases.slice(0, 3).map((item, i) => (
            <article key={item.slug} className="reveal flex flex-col bg-surface p-8" style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
              <p className="font-mono text-[0.62rem] tracking-[0.12em] text-accent-2">{item.sector}</p>
              <h3 className="mt-3 text-[1.28rem] text-paper">{item.title}</h3>
              <p className="mt-4 flex-1 text-[0.94rem] leading-relaxed text-txt-2">{item.body[0]}</p>
              <dl className="mt-7 flex flex-wrap gap-x-7 gap-y-4 border-t border-line pt-5">
                {item.stats.map((stat) => (
                  <div key={stat.l}>
                    <dd className="numeral text-[1.5rem] leading-none text-accent-2">{stat.v}</dd>
                    <dt className="mt-2 font-mono text-[0.58rem] tracking-[0.1em] text-steel">{stat.l}</dt>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <Link href={homeCases.cta.href} className="reveal mt-12 inline-flex items-center gap-2 border-b-2 border-accent pb-1 font-bold text-paper hover:border-paper">
          {homeCases.cta.label} <span aria-hidden="true">←</span>
        </Link>
      </Section>

      {/* ══ למי זה מתאים ══ */}
      <Section tone="ground">
        <SectionHead eyebrow={audience.label} title={audience.title} />
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
          {[audience.yes, audience.no].map((group, gi) => (
            <div key={group.title} className="reveal bg-surface p-8">
              <h3 className="flex items-center gap-3 text-[1.3rem] text-paper">
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 flex-none items-center justify-center border text-[1.05rem] ${
                    gi === 0 ? "border-accent bg-accent text-white" : "border-line-2 text-steel"
                  }`}
                >
                  {gi === 0 ? "✓" : "✕"}
                </span>
                {group.title}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.97rem] leading-relaxed">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 flex-none bg-accent" />
                    <span className={gi === 0 ? "text-txt" : "text-txt-2"}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="reveal mt-10 max-w-[52em] border-r-[3px] border-line-2 pr-6 text-[0.99rem] leading-relaxed text-txt-2">
          {audience.note}
        </p>
      </Section>

      {/* ══ המסירה — כאן הפלטה מתהפכת ══ */}
      <section className="relative overflow-hidden border-t border-paper-line bg-paper py-20 text-ink md:py-28">
        <div className="container-x relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="reveal">
            <p className="eyebrow !text-ink/50">{delivery.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(1.9rem,5.4vw,3.4rem)] text-ink">
              {delivery.titleBefore}{" "}
              <FlagWord flag="il">{delivery.titleFlag}</FlagWord>
            </h2>
            <p className="mt-6 max-w-[36em] text-[1.05rem] leading-relaxed text-ink/70">
              {delivery.lead}
            </p>
            <ul className="mt-8 space-y-3.5">
              {delivery.points.map((point) => (
                <li key={point} className="flex gap-3 text-[0.99rem] leading-relaxed text-ink/80">
                  <span aria-hidden="true" className="mt-2.5 h-px w-4 flex-none bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-9 max-w-[24em] border-r-[3px] border-accent pr-6 font-display text-[1.3rem] leading-snug text-ink md:text-[1.6rem]">
              {delivery.kicker}
            </p>
          </div>

          <div className="reveal">
            <Visual
              id="06-arrival"
              alt="מכולה פתוחה במחסן בישראל, סחורה מסודרת על משטחים באור בוקר"
              spec="מכולה פתוחה במחסן ישראלי — אור בוקר, סחורה מסודרת. רגוע ומשעמם בכוונה."
              width={2600}
              height={1700}
              className="w-full border border-paper-line object-cover"
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
