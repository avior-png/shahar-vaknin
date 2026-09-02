import Link from "next/link";
import { nav, site, footerNote } from "@/content/site";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  const { phone, email, whatsapp } = site.contact;

  return (
    <footer className="on-dark mt-auto bg-ink text-paper">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="paper" />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-paper/70">
              {footerNote}
            </p>
          </div>

          <nav aria-label="ניווט תחתון">
            <h2 className="font-label text-[0.68rem] font-bold tracking-[0.16em] text-amber-3">
              באתר
            </h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.95rem] text-paper/75 underline-offset-4 hover:text-paper hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-label text-[0.68rem] font-bold tracking-[0.16em] text-amber-3">
              יצירת קשר
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-paper/75">
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-paper">
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-paper">
                    {email}
                  </a>
                </li>
              )}
              {whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    className="hover:text-paper"
                    rel="noopener"
                  >
                    וואטסאפ
                  </a>
                </li>
              )}
              <li className="pt-1">
                <Link
                  href="/contact"
                  className="inline-block rounded-full border border-paper/30 px-4 py-2 font-bold text-paper hover:border-amber-3 hover:text-amber-3"
                >
                  לטופס יצירת קשר
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-paper/15 pt-6 text-[0.82rem] text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. כל הזכויות שמורות.
          </p>
          <p>לעסקים בלבד · B2B</p>
        </div>
      </div>
    </footer>
  );
}
