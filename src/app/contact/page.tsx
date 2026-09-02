import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import LeadForm from "@/components/LeadForm";
import { contactPage, site } from "@/content/site";

export const metadata: Metadata = { title: "יצירת קשר", description: contactPage.lead };

export default function ContactPage() {
  const { phone, email, whatsapp } = site.contact;

  return (
    <>
      <PageHero kicker={contactPage.eyebrow} title={contactPage.title} lead={contactPage.lead} />

      <section className="bg-paper py-20 text-ink md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:items-start">
          <div className="reveal">
            <ul className="space-y-4">
              {contactPage.reassurance.map((item) => (
                <li key={item} className="flex items-start gap-3.5 text-[1.02rem] leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center border border-red text-[0.8rem] text-red"
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-9 max-w-[26em] border-r-[3px] border-red pr-6 font-display text-[1.25rem] leading-snug text-ink">
              {contactPage.formNote}
            </p>

            {(phone || email || whatsapp) && (
              <dl className="mt-10 grid gap-px border border-paper-line bg-paper-line">
                {phone && (
                  <div className="bg-paper-2 px-6 py-5">
                    <dt className="text-[0.6rem] tracking-[0.13em] text-ink/50">טלפון</dt>
                    <dd className="mt-1.5 text-[1.05rem] font-semibold">
                      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`}>{phone}</a>
                    </dd>
                  </div>
                )}
                {email && (
                  <div className="bg-paper-2 px-6 py-5">
                    <dt className="text-[0.6rem] tracking-[0.13em] text-ink/50">אימייל</dt>
                    <dd className="mt-1.5 text-[1.05rem] font-semibold">
                      <a href={`mailto:${email}`}>{email}</a>
                    </dd>
                  </div>
                )}
                {whatsapp && (
                  <div className="bg-paper-2 px-6 py-5">
                    <dt className="text-[0.6rem] tracking-[0.13em] text-ink/50">וואטסאפ</dt>
                    <dd className="mt-1.5 text-[1.05rem] font-semibold">
                      <a href={`https://wa.me/${whatsapp}`} rel="noopener">שליחת הודעה</a>
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </div>

          <div className="reveal">
            <LeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
