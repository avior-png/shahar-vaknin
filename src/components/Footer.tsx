import Link from "next/link";
import { nav, site, footerNote } from "@/content/site";
import Logo from "./Logo";
import Seal from "./Seal";

/** לוח כהה בתוך מסגרת עם שוליים — משתלב עם האזור שמעליו. */
export default function Footer() {
  const year = new Date().getFullYear();
  const { phone, email, whatsapp } = site.contact;

  return (
    <footer className="bg-paper px-3 pb-3 pt-6 md:px-5 md:pb-5">
      <div className="container-x !px-0">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-night px-7 py-14 text-paper md:px-14">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(196,22,28,.28), transparent 68%)" }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(192,144,42,.2), transparent 68%)" }}
          />

          <div className="relative grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
            <div>
              <Logo tone="light" />
              <p className="mt-6 max-w-sm text-[0.97rem] leading-relaxed text-paper/65">
                {footerNote}
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Seal />
                <p className="max-w-[20ch] text-[0.85rem] leading-snug text-paper/45">
                  כל משלוח נבדק בסין לפני שהמכולה נסגרת
                </p>
              </div>
            </div>

            <nav aria-label="ניווט תחתון">
              <h2 className="text-[0.95rem] font-bold text-gold-2">באתר</h2>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.97rem] text-paper/70 underline-offset-4 transition-colors hover:text-paper hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-[0.95rem] font-bold text-gold-2">יצירת קשר</h2>
              <ul className="mt-5 space-y-3 text-[0.97rem] text-paper/70">
                {phone && <li><a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-paper">{phone}</a></li>}
                {email && <li><a href={`mailto:${email}`} className="hover:text-paper">{email}</a></li>}
                {whatsapp && <li><a href={`https://wa.me/${whatsapp}`} rel="noopener" className="hover:text-paper">וואטסאפ</a></li>}
                <li className="pt-2">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-5 py-2.5 font-bold text-paper transition-colors hover:border-gold-2 hover:text-gold-2"
                  >
                    לטופס יצירת קשר
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative mt-14 flex flex-col gap-2 border-t border-paper/12 pt-6 text-[0.84rem] text-paper/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} {site.legalName}</p>
            <p>לעסקים בלבד · B2B</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
