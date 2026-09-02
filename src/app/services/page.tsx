import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Section from "@/components/Section";
import CtaBand from "@/components/CtaBand";
import { services, servicesIntro } from "@/content/site";

export const metadata: Metadata = {
  title: "שירותים",
  description: servicesIntro.lead,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow={servicesIntro.eyebrow}
        title={servicesIntro.title}
        lead={servicesIntro.lead}
      />

      {/* ניווט מהיר בין השירותים */}
      <nav aria-label="שירותים" className="border-b border-line bg-paper-2">
        <div className="container-x flex gap-2 overflow-x-auto py-4">
          {services.map((service) => (
            <a
              key={service.slug}
              href={`#${service.slug}`}
              className="flex-none rounded-full border border-line bg-paper px-4 py-2 text-[0.88rem] font-semibold whitespace-nowrap hover:border-ink"
            >
              <span className="numeral ml-2 text-[0.78rem] text-teal">
                {service.n}
              </span>
              {service.title}
            </a>
          ))}
        </div>
      </nav>

      <Section tone="paper">
        <div className="space-y-6">
          {services.map((service) => (
            <article
              key={service.slug}
              id={service.slug}
              className="reveal scroll-mt-28 rounded-2xl border border-line bg-paper-2/50 p-8 md:p-11"
            >
              <div className="grid gap-9 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
                <div>
                  <span className="numeral text-[2.6rem] leading-none text-line">
                    {service.n}
                  </span>
                  <h2 className="mt-2 text-[1.65rem] md:text-[2rem]">
                    {service.title}
                  </h2>
                  <p className="font-label mt-2 text-[0.74rem] font-bold tracking-[0.12em] text-teal">
                    {service.tagline}
                  </p>
                  <p className="mt-6 text-[1.04rem] leading-relaxed text-muted">
                    {service.summary}
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-paper p-7">
                  <h3 className="font-label text-[0.68rem] font-bold tracking-[0.14em] text-muted">
                    מה זה כולל
                  </h3>
                  <ul className="mt-5 space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.97rem] leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-4 flex-none bg-teal"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
