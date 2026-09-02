"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, ctaPrimary } from "@/content/site";
import Logo from "./Logo";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ground/88 backdrop-blur-md">
      <div className="container-x flex h-[76px] items-center justify-between gap-4">
        <Link href="/" aria-label="לעמוד הבית">
          <Logo />
        </Link>

        <nav className="hidden lg:block" aria-label="ניווט ראשי">
          <ul className="flex items-center">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block px-3.5 py-2.5 text-[0.92rem] transition-colors ${
                      active
                        ? "font-bold text-paper after:absolute after:inset-x-3 after:-bottom-px after:h-[3px] after:bg-accent"
                        : "text-txt-2 hover:text-paper"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={ctaPrimary.href}
            className="hidden bg-accent px-5 py-3 text-[0.88rem] font-bold text-white transition-colors hover:bg-accent-2 hover:text-accent-ink md:inline-block"
          >
            {ctaPrimary.label}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center border border-line-2 text-paper lg:hidden"
          >
            <span className="sr-only">{open ? "סגירת תפריט" : "פתיחת תפריט"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path
                d={open ? "M5 5l14 14M19 5L5 19" : "M3.5 7h17M3.5 12h17M3.5 17h17"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="ניווט ראשי" className="border-t border-line bg-ground lg:hidden">
          <ul className="container-x flex flex-col py-1">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="border-b border-line last:border-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-3.5 ${
                      active ? "font-bold text-paper" : "text-txt-2"
                    }`}
                  >
                    {item.label}
                    {active && <span aria-hidden="true" className="h-2 w-2 bg-accent" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="container-x pb-5 pt-3">
            <Link href={ctaPrimary.href} className="block bg-accent px-5 py-3.5 text-center font-bold text-white">
              {ctaPrimary.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
