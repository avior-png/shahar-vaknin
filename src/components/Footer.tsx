import Link from "next/link";
import { nav, site, footerNote } from "@/content/site";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  const { phone, email, whatsapp } = site.contact;

  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-[0.94rem] leading-relaxed text-txt-2">
              {footerNote}
            </p>
          </div>

          <nav aria-label="ניווט תחתון">
            <h2 className="font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-accent-2">
              באתר
            </h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[0.94rem] text-txt-2 underline-offset-4 hover:text-paper hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-[0.62rem] font-semibold tracking-[0.16em] text-accent-2">
              יצירת קשר
            </h2>
            <ul className="mt-4 space-y-2.5 text-[0.94rem] text-txt-2">
              {phone && <li><a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="hover:text-paper">{phone}</a></li>}
              {email && <li><a href={`mailto:${email}`} className="hover:text-paper">{email}</a></li>}
              {whatsapp && <li><a href={`https://wa.me/${whatsapp}`} rel="noopener" className="hover:text-paper">וואטסאפ</a></li>}
              <li className="pt-2">
                <Link href="/contact" className="inline-block border border-line-2 px-4 py-2 font-bold text-paper hover:border-accent hover:text-accent-2">
                  לטופס יצירת קשר
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[0.68rem] tracking-[0.08em] text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.legalName}</p>
          <p>לעסקים בלבד · B2B</p>
        </div>
      </div>
    </footer>
  );
}
