import { BREAKPOINTS, type Overrides, type Screen } from "./store";

/**
 * החלת הפתקים בזמן ריצה — פיתוח בלבד.
 *
 * מלכודת §1.5: בפיתוח חייבים !important כדי לנצח את ה-CSS
 * הבסיסי. בבנייה לפרודקשן האפייה מייצרת CSS נקי בלי !important
 * (ראה scripts/bake-studio.mjs).
 */

const STYLE_ID = "ds-runtime-styles";
const FONT_ID = "ds-runtime-fonts";

function cssFor(data: Overrides): string {
  const blocks: string[] = [];

  for (const screen of Object.keys(data.screens) as Screen[]) {
    const { styles, hidden } = data.screens[screen];
    const rules: string[] = [];

    for (const [sel, props] of Object.entries(styles)) {
      const decls = Object.entries(props)
        .map(([k, v]) => `  ${k}: ${v} !important;`)
        .join("\n");
      if (decls) rules.push(`${sel} {\n${decls}\n}`);
    }
    for (const sel of hidden) {
      rules.push(`${sel} { display: none !important; }`);
    }
    if (rules.length) {
      blocks.push(`@media ${BREAKPOINTS[screen].media} {\n${rules.join("\n")}\n}`);
    }
  }
  return blocks.join("\n\n");
}

export function applyStyles(data: Overrides) {
  let tag = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!tag) {
    tag = document.createElement("style");
    tag.id = STYLE_ID;
    document.head.appendChild(tag);
  }
  tag.textContent = cssFor(data);
}

export function applyFonts(families: string[]) {
  if (!families.length) return;
  let link = document.getElementById(FONT_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.id = FONT_ID;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  const q = families
    .map((f) => `family=${f.replace(/ /g, "+")}:wght@300;400;500;600;700;800;900`)
    .join("&");
  link.href = `https://fonts.googleapis.com/css2?${q}&display=swap`;
}

/** טקסטים מוחלים על ה-DOM אחרי שהוא קיים. */
export function applyText(data: Overrides) {
  for (const [sel, html] of Object.entries(data.text)) {
    try {
      const el = document.querySelector(sel);
      if (el && el.innerHTML !== html) el.innerHTML = html;
    } catch {
      /* סלקטור שכבר לא קיים בדף */
    }
  }
}

export function applyAll(data: Overrides) {
  applyStyles(data);
  applyFonts(data.fonts);
  applyText(data);
}
