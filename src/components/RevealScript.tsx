"use client";

import { useEffect } from "react";

/**
 * מוסיף `js` ל-<html> ומפעיל חשיפה בגלילה.
 * בלי JS (או עם prefers-reduced-motion) הכל פשוט גלוי — התוכן
 * לעולם לא תלוי בסקריפט כדי להיראות.
 */
export default function RevealScript() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.classList.add("js");
    const items = document.querySelectorAll<HTMLElement>(".reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  return null;
}
