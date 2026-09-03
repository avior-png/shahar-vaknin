"use client";

import { useEffect } from "react";

/**
 * שער הכניסה ל-Design Studio.
 *
 * שלושה תנאים מצטברים: פיתוח בלבד, דגל ?edit בכתובת, ו-import
 * דינמי — כך שהמודול כולו נושר מבנדל הפרודקשן.
 */
export default function StudioMount() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (!new URLSearchParams(window.location.search).has("edit")) return;
    import("./index").then((m) => m.mountStudio()).catch(console.error);
  }, []);

  return null;
}
