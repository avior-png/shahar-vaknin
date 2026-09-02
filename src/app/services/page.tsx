import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import Visual from "@/components/Visual";
import CtaBand from "@/components/CtaBand";
import { services, servicesIntro } from "@/content/site";

export const metadata: Metadata = { title: "שירותים", description: servicesIntro.lead };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow={servicesIntro.eyebrow} title={servicesIntro.title} lead={servicesIntro.lead} />

      <nav aria-label="שירותים" className="border-b border-line bg-surface">
        <div className="container-x flex gap-2 overflow-x-auto py-4">
          {services.map((service) => (
            <a key={service.slug} href={`#${service.slug}`} className="flex-none border border-line-2 px-4 py-2 text-[0.86rem] font-semibold whitespace-nowrap text-txt-2 hover:border-accent hover:text-paper">
              <span className="numeral ml-2 font-mono text-[0.7rem] text-accent-2">{service.n}</span>
              {service.title}
            </a>
          ))}
        </div>
      </nav>

      <Section tone="ground">
        <div className="space-y-px border border-line bg-line">
          {services.map((service) => (
            <article key={service.slug} id={service.slug} className="reveal scroll-mt-28 bg-surface p-8 md:p-11">
              <div className="grid gap-9 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
                <div>
                  <span className="numeral text-[2.4rem] leading-none text-line-2">{service.n}</span>
                  <h2 className="mt-2 text-[1.6rem] text-paper md:text-[2rem]">{service.title}</h2>
                  <p className="mt-2 font-mono text-[0.66rem] tracking-[0.12em] text-accent-2">{service.tagline}</p>
                  <p className="mt-6 text-[1.02rem] leading-relaxed text-txt-2">{service.summary}</p>
                </div>
                <div className="border border-line bg-ground p-7">
                  <h3 className="font-mono text-[0.62rem] tracking-[0.14em] text-steel">מה זה כולל</h3>
                  <ul className="mt-5 space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-txt-2">
                        <span aria-hidden="true" className="mt-2.5 h-px w-4 flex-none bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mt-12 grid gap-8 border border-line bg-surface p-8 md:grid-cols-[1fr_320px] md:items-center md:p-11">
          <div>
            <p className="eyebrow">השירות שאף אחד אחר לא נותן</p>
            <h2 className="mt-4 text-[1.5rem] text-paper md:text-[1.9rem]">עשרה ספקים, מכולה אחת</h2>
            <p className="mt-4 max-w-[40em] text-[1rem] leading-relaxed text-txt-2">
              פריטים קטנים שהכמות שלהם לבדה לא מצדיקה יבוא — כפפות, ברגים, ברזלים,
              חומרי גלם. איחוד של ספקים מאזורים שונים בסין למכולה אחת משנה את התחשיב לגמרי.
            </p>
          </div>
          <Visual
            id="05-consol"
            alt="תרשים איזומטרי: עשרה ארגזים מתכנסים למכולה אחת"
            spec="איזומטרי — 10 ארגזים מתכנסים בקווים כתומים למכולה אחת."
            width={2200}
            height={1500}
            className="w-full"
          />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
