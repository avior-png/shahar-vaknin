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
  const left = problem.fears.slice(0, 2);
  const right = problem.fears.slice(2);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          הירו — לוח בתוך מסגרת עם שוליים.
          התמונה: שמיים, דגלי ישראל וסין דהויים בשני הצדדים,
          והמנוף במרכז. הכותרת ממורכזת מעליו, וארבע נקודות
          הבעיה מלוות אותו משני צדדיו.
          ══════════════════════════════════════════════════════ */}
      <section className="bg-night px-3 pb-3 pt-3 md:px-5 md:pb-5">
        <div className="container-x !px-0">
          <div className="relative overflow-hidden rounded-[var(--radius-xl)]">
            <span aria-hidden="true" className="absolute inset-0 block">
              <Visual
                id="hero-frame"
                alt=""
                spec="שמיים בהירים · דגל ישראל דהוי מימין, דגל סין דהוי משמאל · מנוף במרכז מרים מכולה"
                width={2400}
                height={1600}
                priority
                className="h-full w-full object-cover"
              />
            </span>
            {/* הבהרה עדינה כדי שהטקסט ייקרא מעל השמיים */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-paper/85 via-paper/55 to-paper/88"
            />

            <div className="relative px-5 py-16 md:px-12 md:py-24">
              {/* כותרת ממורכזת */}
              <div className="mx-auto max-w-4xl text-center">
                <p className="reveal text-[0.95rem] font-bold text-red">{hero.eyebrow}</p>
                <h1
                  className="reveal display mt-6 text-ink"
                  style={{ ["--reveal-delay" as string]: "60ms" }}
                >
                  העיניים שלך <FlagWord flag="cn">בסין</FlagWord>
                </h1>
                <p
                  className="reveal mx-auto mt-8 max-w-[34em] text-[1.08rem] leading-relaxed text-ink-2 md:text-[1.22rem]"
                  style={{ ["--reveal-delay" as string]: "130ms" }}
                >
                  עשרים שנה חייתי ועבדתי שם. אני מאתר את המפעל האמיתי, מנהל את
                  המשא ומתן בסינית, ובודק את הסחורה{" "}
                  <b className="font-bold text-ink">לפני</b> שהיא עולה על האונייה.
                </p>
                <div
                  className="reveal mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
                  style={{ ["--reveal-delay" as string]: "200ms" }}
                >
                  <Button href={ctaPrimary.href} variant="red">{ctaPrimary.label}</Button>
                  <Button href={ctaSecondary.href} variant="outline" arrow={false}>
                    {ctaSecondary.label}
                  </Button>
                </div>
              </div>

              {/* ארבע נקודות הבעיה, שתיים בכל צד של המנוף */}
              <div className="mt-16 grid gap-5 lg:mt-20 lg:grid-cols-[1fr_minmax(160px,22%)_1fr] lg:gap-8">
                <div className="flex flex-col gap-5">
                  {left.map((fear, i) => (
                    <FearCard key={fear.title} fear={fear} n={i + 1} delay={i * 90} />
                  ))}
                </div>
                <div aria-hidden="true" className="hidden lg:block" />
                <div className="flex flex-col gap-5">
                  {right.map((fear, i) => (
                    <FearCard key={fear.title} fear={fear} n={i + 3} delay={(i + 2) * 90} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ המשפט שסוגר את הבעיה + המספרים ══ */}
      <Section tone="paper">
        <p className="reveal mx-auto max-w-[24ch] text-center font-display text-[clamp(1.6rem,4.4vw,3rem)] leading-[1.12] text-ink">
          {problem.closing}
        </p>
        <Stats className="mt-16" />
      </Section>

      {/* ══ המיצוב — מכולה כתומה על כל המסך ══ */}
      <section className="relative overflow-hidden">
        <span aria-hidden="true" className="absolute inset-0 block">
          <Visual
            id="container-front"
            alt=""
            spec="חזית מכולה כתומה במלוא המסך — פלדה מקומטת, בריחים, בלאי"
            width={2400}
            height={1400}
            className="h-full w-full object-cover"
          />
        </span>
        <span aria-hidden="true" className="absolute inset-0 bg-night/72" />

        {/* מגדל מכולות שנחתך בקצה העליון */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-4 hidden w-[240px] lg:block xl:w-[300px]"
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

        <div className="container-x relative py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="reveal text-[0.95rem] font-bold text-gold-2">{positioning.title}</p>
            <h2 className="reveal display-md mt-4 max-w-[14ch] text-paper">
              {positioning.statement}
            </h2>
            <p className="reveal mt-8 text-[1.02rem] text-paper/70">
              לא סוכן · לא מתווך · לא אתר לאיתור ספקים
            </p>
          </div>
        </div>
      </section>

      {/* ══ מי עומד מאחורי זה ══ */}
      <Section tone="paper">
        {/* הסקציה שמעליה ממוקמת בימין — כאן מתהפך: דיוקן ימין, תוכן שמאל */}
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="reveal order-2 lg:order-1">
            <p className="text-[0.95rem] font-bold text-red">{credibility.label}</p>
            <h2 className="display-md mt-4 text-ink">{credibility.title}</h2>
            <p className="mt-7 max-w-[36em] text-[1.05rem] leading-relaxed text-muted">
              {credibility.body}
            </p>
            <Button href={credibility.cta.href} variant="outline" className="mt-9">
              {credibility.cta.label}
            </Button>
          </div>

          {/* הדיוקן — בתוך עיגול, יוצא ממנו למעלה, עם כרטיסים מרחפים */}
          <div className="relative order-1 mx-auto w-full max-w-[470px] lg:order-2">
            <div className="relative aspect-square">
              <span
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden rounded-full border border-line"
              >
                <Visual
                  id="china-circle"
                  alt=""
                  spec="רקע סיני לעיגול — גגות מסורתיים / חזית מפעל, גוונים אדומים חמים"
                  width={1200}
                  height={1200}
                  className="h-full w-full object-cover"
                />
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-gradient-to-t from-night/45 to-transparent"
              />
              {/* הדיוקן חורג מהעיגול כלפי מעלה */}
              <div className="absolute inset-x-[8%] bottom-0 top-[-16%]">
                <Visual
                  id="portrait"
                  alt="שחר וקנין"
                  spec="דיוקן של שחר, PNG שקוף, גזור עד המותניים"
                  width={1100}
                  height={1500}
                  className="h-full w-full object-contain object-bottom"
                />
              </div>
            </div>

            {/* כרטיסי הוותק — מרחפים בקצב שונה, מעל החלק התחתון בלבד */}
            <div className="pointer-events-none absolute inset-x-0 bottom-[4%] flex flex-col gap-3">
              {credibility.facts.slice(0, 3).map((fact, i) => (
                <div
                  key={fact.k}
                  className={`pointer-events-auto w-max max-w-[74%] rounded-[var(--radius-sm)] border border-line bg-paper/94 px-4 py-2.5 shadow-[0_14px_28px_-18px_rgba(23,18,15,.55)] backdrop-blur-sm ${
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
        </div>
      </Section>

      {/* ══ שירותים — פסיפס 2/3/2 ══ */}
      <Section tone="paper-2">
        <SectionHead
          kicker="שירותים"
          title={servicesIntro.title}
          lead={servicesIntro.lead}
        />
        <ServiceMosaic />
      </Section>

      {/* ══ איך זה עובד — המסע ══ */}
      <Section tone="paper" contained={false} id="process">
        <div className="container-x">
          <SectionHead kicker="איך זה עובד" title={processIntro.title} lead={processIntro.lead} />
        </div>
        <div className="container-x">
          <Voyage />
        </div>
      </Section>

      {/* ══ סיפורי מקרה ══ */}
      <Section tone="paper-2">
        <SectionHead kicker="הוכחות" title={homeCases.title} lead={homeCases.lead} />
        <div className="reveal mt-14">
          <CaseExplorer backgrounds={caseBackgrounds} />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

function FearCard({
  fear, n, delay,
}: { fear: { title: string; body: string }; n: number; delay: number }) {
  return (
    <article
      className="reveal card card-lift bg-paper/92 p-6 backdrop-blur-sm"
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <span className="font-display text-[1.7rem] leading-none text-gold">
          {String(n).padStart(2, "0")}
        </span>
        <div>
          <h3 className="text-[1.12rem] leading-snug text-ink">{fear.title}</h3>
          <p className="mt-2.5 text-[0.92rem] leading-relaxed text-muted">{fear.body}</p>
        </div>
      </div>
    </article>
  );
}
