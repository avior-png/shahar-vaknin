import Section, { SectionHead } from "@/components/Section";
import Visual from "@/components/Visual";
import Button from "@/components/Button";
import Stats from "@/components/Stats";
import Voyage from "@/components/Voyage";
import ServiceMosaic from "@/components/ServiceMosaic";
import CaseExplorer from "@/components/CaseExplorer";
import CtaBand from "@/components/CtaBand";
import FlagWord from "@/components/FlagWord";
import { visualSrc } from "@/lib/visuals";
import {
  hero, problem, credibility, servicesIntro, homeCases,
  positioning, processIntro, ctaPrimary, ctaSecondary, cases,
} from "@/content/site";

export default function HomePage() {
  const caseBackgrounds = Object.fromEntries(
    cases.map((c) => [c.slug, visualSrc(`case-${c.slug}`)])
  );

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          הירו — לפי הסקיצה.
          שלוש שכבות: תמונת רקע מלאה, הכותרת מעליה, ותמונת
          המפעל השקופה מעל הכותרת — כך שהיא מסתתרת מאחוריו.
          מעל הכל: הכיתוב הסיני האנכי, הטקסט והכפתורים.
          בתחתית — חיתוך אלכסוני אל הלבן.
          ══════════════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden bg-paper"
        style={{ aspectRatio: "1536 / 1728" }}
      >
        {/* שתי שכבות התמונה, נעולות זו לזו */}
        <div className="hero-stage" aria-hidden="true">
          <div className="hs-bg">
            <Visual id="hero-bg" alt="" spec="שער המפעל עם שמיים — שכבת רקע" width={1536} height={1728} priority />
          </div>
          <div className="hs-gate">
            <Visual id="hero-gate" alt="" spec="שער המפעל — PNG שקוף מעל הכותרת" width={1536} height={785} priority />
          </div>
        </div>

        {/* ─── הכותרת ─────────────────────────────────────────
            בסקיצה היא מיושרת לימין בקצה שנמצא ב-47% מהשמאל,
            ו״בסין״ נחתכת מלמטה בקו הגג של השער. ─────────── */}
        <h1
          className="reveal absolute z-10 hidden text-right leading-[0.84] lg:block"
          style={{ top: "6.6%", right: "53%", whiteSpace: "nowrap" }}
        >
          <span className="block text-[5.2vw] font-normal text-ink">העיניים שלך</span>
          <span className="mt-[0.06em] block text-[13.5vw] text-red">בסין</span>
        </h1>

        {/* גרסת מובייל — ממורכזת, בלי מיקום אבסולוטי */}
        <h1 className="reveal container-wide relative z-10 pt-[6%] text-center leading-[0.86] lg:hidden">
          <span className="block text-[8vw] font-normal text-ink">העיניים שלך</span>
          <span className="mt-1 block text-[19vw] text-red">בסין</span>
        </h1>

        {/* ─── החיתוך האלכסוני ───────────────────────────────── */}
        <span
          aria-hidden="true"
          className="diag-cut absolute inset-x-0 bottom-0 z-30 block bg-paper"
          style={{ height: "13%" }}
        />

        {/* ─── הכיתוב הסיני האנכי ──────────────────────────────
            מתחיל ב-80% מגובה ההירו וממשיך אל תוך הלבן. ─────── */}
        <div
          aria-hidden="true"
          className="zh-col absolute z-40 hidden text-[3.1vw] lg:flex"
          style={{ top: "60%", left: "40.3%", fontFamily: "var(--font-zh), serif" }}
        >
          {"在中国二十".split("").map((c, i) => (
            <span key={i} className="text-ink/70">{c}</span>
          ))}
          <span className="text-red">年</span>
        </div>

        {/* ─── הטקסט והכפתורים — בצד שמאל ───────────────────── */}
        <div
          className="absolute z-40 hidden lg:block"
          style={{ top: "70%", left: "3.8%", width: "33%" }}
        >
          <p className="reveal text-right text-[1.05rem] leading-relaxed text-ink-2">
            אני לא מתקשר למפעל מישראל.
            <b className="mt-1 block font-bold text-ink">
              אני עומד שם, מדבר איתם בשפה שלהם, ויודע איך עסקים באמת נסגרים
              בסין כי חייתי שם עשרים שנה.
            </b>
          </p>
          <div className="reveal mt-7 flex flex-row-reverse justify-end gap-3">
            <Button href={ctaPrimary.href} variant="red" className="btn-sq" solidArrow>
              {ctaPrimary.label}
            </Button>
            <Button href={ctaSecondary.href} variant="outline" className="btn-sq" solidArrow>
              {ctaSecondary.label}
            </Button>
          </div>
        </div>

        {/* גרסת מובייל */}
        <div className="container-wide absolute inset-x-0 bottom-[6%] z-40 lg:hidden">
          <p className="reveal text-[1rem] leading-relaxed text-ink-2">
            אני לא מתקשר למפעל מישראל.
            <b className="mt-1 block font-bold text-ink">
              אני עומד שם, מדבר איתם בשפה שלהם, ויודע איך עסקים באמת נסגרים
              בסין כי חייתי שם עשרים שנה.
            </b>
          </p>
          <div className="reveal mt-5 flex flex-col gap-3 sm:flex-row">
            <Button href={ctaPrimary.href} variant="red" className="btn-sq" solidArrow>
              {ctaPrimary.label}
            </Button>
            <Button href={ctaSecondary.href} variant="outline" className="btn-sq" solidArrow>
              {ctaSecondary.label}
            </Button>
          </div>
        </div>
      </section>

      {/* ══ הבעיה ══ */}
      <Section tone="paper" contained={false}>
        <div className="container-wide">
          <SectionHead
            kicker="הבעיה"
            title={problem.title}
            lead={problem.lead}
            center
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {problem.fears.map((fear, i) => (
              <FearCard key={fear.title} fear={fear} n={i + 1} delay={i * 80} />
            ))}
          </div>
          <p className="reveal mx-auto mt-20 max-w-[24ch] text-center font-display text-[clamp(1.7rem,4.6vw,3.2rem)] leading-[1.1] text-ink">
            {problem.closing}
          </p>
          <Stats className="mt-16" />
        </div>
      </Section>

      {/* ══ המיצוב ══ */}
      <section className="relative overflow-hidden bg-night">
        <span aria-hidden="true" className="absolute inset-0 block">
          <Visual
            id="container-front"
            alt=""
            spec="חזית מכולה במלוא המסך — פלדה מקומטת, בריחים, בלאי"
            width={2400}
            height={1400}
            className="h-full w-full object-cover opacity-45"
          />
        </span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-6 hidden w-[230px] xl:block xl:w-[290px]"
        >
          <Visual
            id="containers-stack"
            alt=""
            spec="מגדל של 4 מכולות זו על זו, PNG שקוף, נחתך בקצה העליון"
            width={1000}
            height={1800}
            className="w-full"
          />
        </span>

        <div className="container-wide relative py-24 md:py-36">
          <div className="max-w-3xl">
            <p className="reveal flex items-center gap-2.5 text-[0.95rem] font-bold text-gold-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold-2" />
              {positioning.title}
            </p>
            <h2 className="reveal display-md mt-5 max-w-[14ch] text-white">
              {positioning.statement}
            </h2>
            <p className="reveal mt-8 text-[1.04rem] text-white/60">
              לא סוכן · לא מתווך · לא אתר לאיתור ספקים
            </p>
          </div>
        </div>
      </section>

      {/* ══ מי עומד מאחורי זה — דיוקן ימין, תוכן שמאל ══ */}
      <Section tone="paper">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative order-1 mx-auto w-full max-w-[470px]">
            <div className="relative aspect-square">
              <span aria-hidden="true" className="absolute inset-0 block overflow-hidden rounded-full border border-line">
                <Visual
                  id="china-circle"
                  alt=""
                  spec="רקע סיני לעיגול — גגות מסורתיים, גוונים אדומים חמים"
                  width={1200}
                  height={1200}
                  className="h-full w-full object-cover"
                />
              </span>
              <span aria-hidden="true" className="absolute inset-0 rounded-full ring-1 ring-inset ring-ink/10" />
              <div className="absolute inset-x-[8%] bottom-0 top-[-16%]">
                <Visual
                  id="portrait"
                  alt="שחר וקנין"
                  spec="דיוקן אמיתי של שחר, PNG שקוף, גזור עד המותניים"
                  width={1100}
                  height={1500}
                  className="h-full w-full object-contain object-bottom"
                />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-[3%] flex flex-col gap-3">
              {credibility.facts.slice(0, 3).map((fact, i) => (
                <div
                  key={fact.k}
                  className={`pointer-events-auto w-max max-w-[76%] rounded-[var(--radius-sm)] border border-line bg-white/95 px-4 py-2.5 shadow-soft backdrop-blur ${
                    i === 0 ? "drift self-start" : i === 1 ? "drift-2 self-end" : "drift-3 self-start"
                  }`}
                  style={{ ["--drift-dur" as string]: `${7 + i * 1.6}s` }}
                >
                  <p className="text-[0.72rem] font-semibold text-muted">{fact.k}</p>
                  <p className="mt-0.5 text-[0.95rem] font-bold leading-snug text-ink">{fact.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal order-2">
            <p className="flex items-center gap-2.5 text-[0.95rem] font-bold text-red">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red" />
              {credibility.label}
            </p>
            <h2 className="display-md mt-5 text-ink">{credibility.title}</h2>
            <p className="mt-7 max-w-[36em] text-[1.05rem] leading-relaxed text-muted">
              {credibility.body}
            </p>
            <Button href={credibility.cta.href} variant="outline" className="mt-9">
              {credibility.cta.label}
            </Button>
          </div>
        </div>
      </Section>

      {/* ══ שירותים ══ */}
      <Section tone="paper" contained={false}>
        <div className="container-wide">
          <SectionHead kicker="שירותים" title={servicesIntro.title} lead={servicesIntro.lead} />
          <ServiceMosaic />
        </div>
      </Section>

      {/* ══ איך זה עובד — על שחור ══ */}
      <section className="bg-night py-24 md:py-32" id="process">
        <div className="container-wide">
          <SectionHead kicker="איך זה עובד" title={processIntro.title} lead={processIntro.lead} light />
          <Voyage />
        </div>
      </section>

      {/* ══ הוכחות ══ */}
      <Section tone="paper" contained={false}>
        <div className="container-wide">
          <SectionHead kicker="הוכחות" title={homeCases.title} lead={homeCases.lead} />
          <div className="reveal mt-14">
            <CaseExplorer backgrounds={caseBackgrounds} />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

function FearCard({
  fear, n, delay,
}: {
  fear: { title: string; body: string };
  n: number;
  delay: number;
}) {
  return (
    <article
      className="reveal card card-lift group relative overflow-hidden bg-white/95 p-6 shadow-soft backdrop-blur-sm"
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-[3px] origin-top scale-y-0 bg-red transition-transform duration-500 group-hover:scale-y-100"
      />
      <span aria-hidden="true" className="ghost-num absolute -top-2 left-3 text-ink" style={{ fontSize: "4.2rem" }}>
        {String(n).padStart(2, "0")}
      </span>
      <h3 className="relative text-[1.14rem] leading-snug text-ink">{fear.title}</h3>
      <p className="relative mt-2.5 text-[0.93rem] leading-relaxed text-muted">{fear.body}</p>
    </article>
  );
}
