/**
 * נקודת הכניסה של Design Studio.
 * נטענת רק ב-import דינמי, רק בפיתוח, ורק כשיש ?edit —
 * ולכן אינה נכנסת כלל לבנייה לפרודקשן.
 */
import { Store } from "./store";
import { applyAll } from "./apply";
import { buildPanel } from "./panel";
import "./studio.css";

export async function mountStudio() {
  if (document.getElementById("ds-root")) return;

  const root = document.createElement("div");
  root.id = "ds-root";
  root.className = "ds-root";
  document.body.appendChild(root);

  const store = new Store();
  await store.load();
  applyAll(store.data);

  buildPanel(store, root);

  /* מלכודת §1.9: תוכן עם pointer-events:none לא ניתן ללחיצה.
     במצב בחירה מכריחים auto — פרט לשכבות שבאמת כבויות. */
  const force = document.createElement("style");
  force.textContent = `
    body * { pointer-events: auto !important; }
    [hidden], [aria-hidden="true"][inert] { pointer-events: none !important; }
  `;
  document.head.appendChild(force);

  /* טקסטים מוחלים שוב אחרי הידרציה של React */
  setTimeout(() => applyAll(store.data), 300);
}
