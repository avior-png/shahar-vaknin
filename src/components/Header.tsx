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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-paper/90 backdrop-blur-md">
      <div className="container-x flex h-[74px] items-center justify-between gap-4">
        <Link href="/" aria-label="לעמוד הבית">
          <Logo />
        </Link>

        <nav className="hidden lg:block" aria-label="ניווט ראשי">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    /* מצב פעיל מסומן בקו תחתון ובמשקל — לא בגוון בלבד */
                    className={`relative block px-3.5 py-2 text-[0.94rem] transition-colors ${
                      active
                        ? "font-bold text-ink after:absolute after:inset-x-3 after:-bottom-px after:h-[3px] after:bg-teal"
                        : "font-medium text-muted hover:text-ink"
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
            className="hidden rounded-full bg-ink px-5 py-2.5 text-[0.9rem] font-bold text-paper transition-colors hover:bg-teal md:inline-block"
          >
            {ctaPrimary.label}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line lg:hidden"
          >
            <span className="sr-only">{open ? "סגירת תפריט" : "פתיחת תפריט"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3.5 7h17M3.5 12h17M3.5 17h17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="ניווט ראשי"
          className="border-t border-line-soft bg-paper lg:hidden"
        >
          <ul className="container-x flex flex-col py-2">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="border-b border-line-soft last:border-0">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-3.5 text-[1.02rem] ${
                      active ? "font-bold text-ink" : "font-medium text-muted"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="h-2.5 w-2.5 rounded-full bg-teal" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="container-x pb-5">
            <Link
              href={ctaPrimary.href}
              className="block rounded-full bg-ink px-5 py-3.5 text-center font-bold text-paper"
            >
              {ctaPrimary.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
