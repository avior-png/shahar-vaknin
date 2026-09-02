import Link from "next/link";
import Section, { SectionHead } from "@/components/Section";
import ProductionLine from "@/components/ProductionLine";
import Visual from "@/components/Visual";
import Crane from "@/components/Crane";
import FlagWord from "@/components/FlagWord";
import CtaBand from "@/components/CtaBand";
import {
  hero, heroStats, problem, credibility, services, servicesIntro,
  cases, homeCases, audience, positioning, processIntro, delivery,
  ctaPrimary, ctaSecondary,
} from "@/content/site";

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          אזור הציר — המנוף חוצה הירו + נתונים + הבעיה.
          ══════════════════════════════════════════════════════ */}
      <div className="spine-zone overflow-hidden bg-ground">
        <div className="spine">
          <Visual
            id="01-crane"
            alt=""
            spec="מנוף גשר של מפעל — צילומי, מחליף את הרישום."
            width={1440}
            height={3400}
            priority
            fallback={<Crane className="h-full w-full" />}
          />
        </div>

        {/* ─── הירו ─── */}
        <div className="relative pb-20 pt-16 md:pt-24">
          <span className="ghost -top-6 select-none" style={{ insetInlineStart: "-4vw" }}>
            מבפנים
          </span>

          <div className="container-x relative">
            <div className="spine-safe">
              <p className="eyebrow reveal">{hero.eyebrow}</p>
              <h1
                className="reveal display mt-8 text-paper"
                style={{ ["--reveal-delay" as string]: "60ms" }}
              >
                העיניים שלך
                <span className="mt-1 block">
                  <FlagWord flag="cn">בסין</FlagWord>
                </span>
              </h1>
              <p
                className="reveal mt-10 max-w-[32em] text-[1.1rem] leading-relaxed text-txt-2 md:text-[1.3rem]"
                style={{ ["--reveal-delay" as string]: "140ms" }}
              >
                עשרים שנה חייתי ועבדתי שם. אני מאתר את המפעל האמיתי, מנהל את
                המשא ומתן בסינית, ובודק את הסחורה{" "}
                <b className="font-bold text-paper">לפני</b> שהיא עולה על האונייה.
              </p>
              <div
                className="reveal mt-11 flex flex-col gap-3 sm:flex-row"
                style={{ ["--reveal-delay" as string]: "210ms" }}
              >
                <Link href={ctaPrimary.href} className="bg-accent px-9 py-5 text-center text-[1.02rem] font-bold text-white transition-colors hover:bg-accent-2 hover:text-accent-ink">
                  {ctaPrimary.label}
                </Link>
                <Link href={ctaSecondary.href} className="border border-line-2 px-9 py-5 text-center text-[1.02rem] font-bold text-paper transition-colors hover:border-paper">
                  {ctaSecondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─── מספרים ענקיים, בלי קופסאות, עם כרטיס שרוכב על התפר ─── */}
        <div className="container-x relative pb-28">
          <div className="spine-safe">
            <dl className="reveal flex flex-wrap items-end gap-x-14 gap-y-9 border-t border-line pt-9">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="numeral text-[clamp(3.4rem,7vw,5.4rem)] leading-[0.8] text-paper">
                      {stat.value}
                    </span>
                    <span className="mr-2 font-mono text-[0.9rem] font-semibold text-accent-2">
                      {stat.unit}
                    </span>
                    <span className="mt-3 block max-w-[13ch] font-mono text-[0.62rem] leading-relaxed tracking-[0.1em] text-steel">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* כרטיס דוח הבדיקה — מרחף, מוטה, וחוצה את גבול הסקציה */}
          <article className="ride tilt-b float reveal mx-auto mt-16 max-w-md bg-paper p-6 text-ink md:mr-auto md:ml-0">
            <div className="flex items-start justify-between gap-4 border-b-2 border-ink pb-3">
              <div>
                <h2 className="text-[1.25rem] text-ink">דוח בקרת איכות</h2>
                <p dir="ltr" className="mt-1 text-right font-mono text-[0.6rem] tracking-[0.12em] text-ink/45">
                  PRE-SHIPMENT / NINGBO
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-16 w-16 flex-none rotate-[-9deg] items-center justify-center border-[2.5px] border-accent text-center font-display text-[0.68rem] leading-tight text-accent"
              >
                נבדק<br />במפעל
              </span>
            </div>
            <ul className="pt-2">
              {[
                ["התאמה למפרט", "96 / 96"],
                ["שקילת מדגם", "±1.4%"],
                ["הרכב חומרים — מעבדה", "PASS"],
                ["כמות בפועל", "1,200 / 1,200"],
              ].map(([label, value]) => (
                <li key={label} className="flex items-center gap-3 border-b border-ink/12 py-2.5 text-[0.9rem] last:border-0">
                  <span aria-hidden="true" className="flex h-[18px] w-[18px] flex-none items-center justify-center bg-ink">
                    <svg viewBox="0 0 12 12" fill="none" className="h-3 w-3">
                      <path d="M2 6.3l2.7 2.7L10 3.4" stroke="#EFEDE8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {label}
                  <span dir="ltr" className="mr-auto font-mono text-[0.68rem] text-ink/50">{value}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* ─── הבעיה ─── */}
        <div className="make-room container-x relative pb-28">
          <div className="spine-safe">
          <p className="eyebrow reveal">{problem.label}</p>
          <h2 className="reveal display-md mt-6 text-paper">
            למצוא מוצר בסין<br />זה החלק הקל
          </h2>
          <p className="reveal mt-7 max-w-[34em] text-[1.06rem] leading-relaxed text-txt-2">
            {problem.lead}
          </p>

          <ul className="reveal mt-14">
            {problem.fears.map((fear, i) => (
              <li key={fear.title} className="group flex items-start gap-6 border-t border-line py-7 last:border-b">
                <span className="numeral pt-1 text-[2.2rem] leading-none text-line-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.35rem] text-paper md:text-[1.65rem]">{fear.title}</h3>
                  <p className="mt-2.5 max-w-[46em] text-[0.99rem] leading-relaxed text-txt-2">
                    {fear.body}
                  </p>
                </div>
                <span aria-hidden="true" className="mt-2 hidden h-6 w-6 flex-none border border-line-2 sm:block" />
              </li>
            ))}
          </ul>

          <p className="reveal mt-14 max-w-[22em] font-display text-[clamp(1.6rem,4.5vw,2.9rem)] leading-[1.15] text-paper">
            {problem.closing}
          </p>
          </div>
        </div>
      </div>

      {/* ══ שבירה כתומה — מלוא הרוחב, כותרת שנחתכת ══ */}
      <section className="relative overflow-hidden bg-accent py-24 text-accent-ink md:py-32">
        <span className="ghost -bottom-16 opacity-40" style={{ insetInlineEnd: "-6vw", WebkitTextStroke: "1.5px rgba(21,6,2,.16)" }}>
          במיקור חוץ
        </span>
        <div className="bleed-end w-[min(38vw,480px)]" style={{ insetInlineEnd: "-3vw" }}>
          <Visual id="02-seal" alt="" spec="חותם נעילה של מכולה — מקרו, גוף כתום." width={1600} height={1600} />
        </div>
        <div className="container-x relative">
          <p className="eyebrow eyebrow-plain reveal !text-accent-ink/55">{positioning.title}</p>
          <h2 className="reveal display-md mt-6 max-w-[13ch] text-accent-ink">
            {positioning.statement}
          </h2>
          <p className="reveal mt-9 font-mono text-[0.7rem] tracking-[0.18em] text-accent-ink/60">
            לא סוכן · לא מתווך · לא אתר לאיתור ספקים
          </p>
        </div>
      </section>

      {/* ══ מי אני ══ */}
      <Section tone="ground">
        <div className="bleed-start w-[320px] opacity-40">
          <Visual id="03-floor" alt="" spec="רצפת ייצור — גולש מעבר לקצה." width={2000} height={1500} />
        </div>
        <div className="relative grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="reveal">
            <p className="eyebrow">{credibility.label}</p>
            <h2 className="display-md mt-6 text-paper">{credibility.title}</h2>
            <p className="mt-7 max-w-[36em] text-[1.04rem] leading-relaxed text-txt-2">
              {credibility.body}
            </p>
            <Link href={credibility.cta.href} className="mt-9 inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-[1.05rem] font-bold text-paper hover:border-paper">
              {credibility.cta.label} <span aria-hidden="true">←</span>
            </Link>
          </div>

          {/* עובדות — שתי עמודות מדורגות, לא טבלה */}
          <div className="reveal grid gap-4 sm:grid-cols-2">
            {credibility.facts.map((fact, i) => (
              <div key={fact.k} className={`border-t-2 border-accent bg-surface p-6 ${i % 2 ? "step-2" : "step-1"}`}>
                <dt className="font-mono text-[0.58rem] tracking-[0.14em] text-steel">{fact.k}</dt>
                <dd className="mt-2.5 text-[1.02rem] font-semibold leading-snug text-txt">{fact.v}</dd>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ שירותים — כרטיסים מדורגים ══ */}
      <Section tone="surface">
        <SectionHead eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} lead={servicesIntro.lead} />
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <li key={service.slug} className={`reveal ${i % 3 === 1 ? "step-1" : i % 3 === 2 ? "step-2" : ""}`} style={{ ["--reveal-delay" as string]: `${i * 50}ms` }}>
              <Link href={`/services#${service.slug}`} className="group relative flex h-full flex-col overflow-hidden border border-line bg-ground p-7 transition-colors hover:border-accent">
                <span aria-hidden="true" className="numeral pointer-events-none absolute -left-2 -top-5 text-[5.5rem] leading-none text-line/70 transition-colors group-hover:text-accent/20">
                  {service.n}
                </span>
                <h3 className="relative mt-1 text-[1.3rem] text-paper">{service.title}</h3>
                <p className="relative mt-2 font-mono text-[0.6rem] tracking-[0.1em] text-accent-2">{service.tagline}</p>
                <p className="relative mt-5 text-[0.94rem] leading-relaxed text-txt-2">{service.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* ══ קו הייצור ══ */}
      <Section tone="ground" contained={false} id="process">
        <div className="container-x">
          <p className="eyebrow reveal">{processIntro.eyebrow}</p>
          <h2 className="reveal display-md crop mt-6 text-paper">משיחת טלפון ועד המכולה</h2>
          <p className="reveal mt-6 max-w-[38em] text-[1.04rem] leading-relaxed text-txt-2">{processIntro.lead}</p>
        </div>
        <ProductionLine />
      </Section>

      {/* ══ הוכחות — כרטיסים מוטים ומדורגים ══ */}
      <Section tone="surface">
        <SectionHead eyebrow={homeCases.label} title={homeCases.title} lead={homeCases.lead} />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {cases.slice(0, 3).map((item, i) => (
            <article
              key={item.slug}
              className={`reveal float flex flex-col border border-line-2 bg-ground p-8 ${i === 1 ? "step-1 tilt-a" : i === 2 ? "step-2" : "tilt-b"}`}
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <p className="font-mono text-[0.6rem] tracking-[0.12em] text-accent-2">{item.sector}</p>
              <h3 className="mt-3 text-[1.35rem] text-paper">{item.title}</h3>
              <p className="mt-4 flex-1 text-[0.94rem] leading-relaxed text-txt-2">{item.body[0]}</p>
              <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6">
                {item.stats.map((stat) => (
                  <div key={stat.l}>
                    <dd className="numeral text-[2rem] leading-none text-accent-2">{stat.v}</dd>
                    <dt className="mt-2 font-mono text-[0.56rem] tracking-[0.1em] text-steel">{stat.l}</dt>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <Link href={homeCases.cta.href} className="reveal mt-16 inline-flex items-center gap-2 border-b-2 border-accent pb-1 text-[1.05rem] font-bold text-paper hover:border-paper">
          {homeCases.cta.label} <span aria-hidden="true">←</span>
        </Link>
      </Section>

      {/* ══ למי זה מתאים ══ */}
      <Section tone="ground">
        <SectionHead eyebrow={audience.label} title={audience.title} />
        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {[audience.yes, audience.no].map((group, gi) => (
            <div key={group.title} className={`reveal ${gi === 0 ? "border-t-4 border-accent" : "border-t-4 border-line-2"} pt-7`}>
              <h3 className="flex items-baseline gap-4 text-[2rem] text-paper">
                <span aria-hidden="true" className={`numeral text-[3rem] leading-none ${gi === 0 ? "text-accent" : "text-line-2"}`}>
                  {gi === 0 ? "✓" : "✕"}
                </span>
                {group.title}
              </h3>
              <ul className="mt-7 space-y-4">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3.5 text-[1.02rem] leading-relaxed">
                    <span aria-hidden="true" className="mt-3 h-px w-5 flex-none bg-accent" />
                    <span className={gi === 0 ? "text-txt" : "text-txt-2"}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="reveal mt-14 max-w-[50em] border-r-[3px] border-line-2 pr-6 text-[0.99rem] leading-relaxed text-txt-2">
          {audience.note}
        </p>
      </Section>

      {/* ══ המסירה — כאן הפלטה מתהפכת ══ */}
      <section className="relative overflow-hidden border-t border-paper-line bg-paper py-24 text-ink md:py-32">
        <span className="ghost -top-10 opacity-70" style={{ insetInlineStart: "-5vw", WebkitTextStroke: "1.5px rgba(11,12,13,.07)" }}>
          נחת בישראל
        </span>
        <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="reveal">
            <p className="eyebrow !text-ink/45">{delivery.eyebrow}</p>
            <h2 className="display-md mt-6 text-ink">
              {delivery.titleBefore}{" "}
              <FlagWord flag="il">{delivery.titleFlag}</FlagWord>
            </h2>
            <p className="mt-7 max-w-[34em] text-[1.05rem] leading-relaxed text-ink/70">
              {delivery.lead}
            </p>
            <ul className="mt-8 space-y-4">
              {delivery.points.map((point) => (
                <li key={point} className="flex gap-3.5 text-[1rem] leading-relaxed text-ink/80">
                  <span aria-hidden="true" className="mt-3 h-px w-5 flex-none bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-11 max-w-[20em] font-display text-[clamp(1.5rem,3.6vw,2.4rem)] leading-[1.15] text-ink">
              {delivery.kicker}
            </p>
          </div>

          <div className="reveal float tilt-a">
            <Visual
              id="06-arrival"
              alt="מכולה פתוחה במחסן בישראל, סחורה מסודרת על משטחים באור בוקר"
              spec="מכולה פתוחה במחסן ישראלי — אור בוקר, סחורה מסודרת."
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
