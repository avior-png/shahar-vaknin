"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, ctaPrimary } from "@/content/site";
import Logo from "./Logo";
import Button from "./Button";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* פס דק בצבעי המותג — חותם את ראש העמוד */}
      <div aria-hidden="true" className="h-[3px] bg-gradient-to-l from-red via-gold to-red" />

      <div
        className={`bg-paper/92 backdrop-blur-lg transition-shadow duration-300 ${
          lifted ? "shadow-[0_10px_30px_-22px_rgba(23,18,15,.5)]" : ""
        }`}
      >
        <div className="container-x flex h-[82px] items-center justify-between gap-4">
          <Link href="/" aria-label="לעמוד הבית">
            <Logo />
          </Link>

          <nav className="hidden lg:block" aria-label="ניווט ראשי">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative block px-3.5 py-2 text-[0.95rem] transition-colors ${
                        active ? "font-bold text-ink" : "font-medium text-muted hover:text-ink"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-3 bottom-0.5 h-[2.5px] origin-right rounded-full bg-red transition-transform duration-400 ${
                          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button href={ctaPrimary.href} variant="red" className="hidden !px-6 !py-3 !text-[0.9rem] md:inline-flex">
              {ctaPrimary.label}
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-line-2 text-ink lg:hidden"
            >
              <span className="sr-only">{open ? "סגירת תפריט" : "פתיחת תפריט"}</span>
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  d={open ? "M5 5l14 14M19 5L5 19" : "M3.5 7h17M3.5 12h17M3.5 17h17"}
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="ניווט ראשי" className="border-t border-line bg-paper lg:hidden">
          <ul className="container-x flex flex-col py-1">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="border-b border-line last:border-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-4 text-[1.05rem] ${
                      active ? "font-bold text-ink" : "font-medium text-muted"
                    }`}
                  >
                    {item.label}
                    {active && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="container-x pb-6 pt-3">
            <Button href={ctaPrimary.href} variant="red" className="w-full">
              {ctaPrimary.label}
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
