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
  const rightCards = problem.fears.slice(0, 2);
  const leftCards = problem.fears.slice(2);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          הירו + המספרים — אזור אחד עם ציר אנכי אחד.
          מגדל המכולות מתחיל כאן, עובר מאחורי המשפט הסוגר
          והמספרים, ונמוג. ההירו יושב במסגרת עם שוליים.
          ══════════════════════════════════════════════════════ */}
      <div className="spine-zone bg-paper pb-24 pt-4 md:pb-32 md:pt-5">
        <div className="container-wide relative">
          {/* המסגרת */}
          <div className="relative rounded-[var(--radius-xl)] border border-line bg-paper-2/70 px-5 py-16 md:px-12 md:py-20">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[var(--radius-xl)]"
            >
              <span
                className="absolute -top-40 right-[-8%] block h-[560px] w-[560px] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(0,56,184,.11), transparent 66%)" }}
              />
              <span
                className="absolute -top-48 left-[-10%] block h-[620px] w-[620px] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(196,22,28,.14), transparent 66%)" }}
              />
            </span>

            <div className="relative mx-auto max-w-4xl text-center">
              <p className="reveal text-[0.95rem] font-bold text-red">{hero.eyebrow}</p>
              <h1
                className="reveal display mt-6 text-ink"
                style={{ ["--reveal-delay" as string]: "60ms" }}
              >
                העיניים שלך <FlagWord flag="cn">בסין</FlagWord>
              </h1>
              <p
                className="reveal mx-auto mt-7 max-w-[34em] text-[1.08rem] leading-relaxed text-ink-2 md:text-[1.24rem]"
                style={{ ["--reveal-delay" as string]: "130ms" }}
              >
                עשרים שנה חייתי ועבדתי שם. אני מאתר את המפעל האמיתי, מנהל את
                המשא ומתן בסינית, ובודק את הסחורה{" "}
                <b className="font-bold text-ink">לפני</b> שהיא עולה על האונייה.
              </p>
              <div
                className="reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
                style={{ ["--reveal-delay" as string]: "200ms" }}
              >
                <Button href={ctaPrimary.href} variant="red">{ctaPrimary.label}</Button>
                <Button href={ctaSecondary.href} variant="outline" arrow={false}>
                  {ctaSecondary.label}
                </Button>
              </div>
            </div>

            {/* ארבע הכרטיסיות מלוות את הציר משני צדדיו.
                הציר מתחיל כאן — מתחת לכותרת — וממשיך מטה אל
                מעבר לגבול המסגרת, אל המשפט הסוגר והמספרים. */}
            <div className="relative mt-14 grid gap-6 lg:mt-20 lg:grid-cols-[1fr_minmax(280px,30%)_1fr] lg:gap-8">
              <div className="spine-col">
                <Visual
                  id="spine-containers"
                  alt=""
                  spec="מגדל מכולות אנכי · PNG שקוף · נחתך בשני הקצוות"
                  width={1024}
                  height={1536}
                  priority
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="relative flex flex-col gap-5">
                {rightCards.map((fear, i) => (
                  <FearCard key={fear.title} fear={fear} n={i + 1} delay={i * 90} />
                ))}
              </div>
              <div aria-hidden="true" className="hidden lg:block" />
              <div className="relative flex flex-col gap-5">
                {leftCards.map((fear, i) => (
                  <FearCard key={fear.title} fear={fear} n={i + 3} delay={(i + 2) * 90} />
                ))}
              </div>
            </div>
          </div>

          {/* המשפט הסוגר + המספרים — עדיין על הציר */}
          <p className="reveal mx-auto mt-24 max-w-[24ch] text-center font-display text-[clamp(1.7rem,4.6vw,3.2rem)] leading-[1.1] text-ink">
            {problem.closing}
          </p>
          <Stats className="mt-16" />
        </div>
      </div>

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
