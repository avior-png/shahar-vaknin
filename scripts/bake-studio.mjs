#!/usr/bin/env node
/**
 * אפיית פתקי Design Studio ל-CSS נקי לפרודקשן.
 *
 * ההבדל המהותי מהחלה בזמן ריצה: כאן אין !important ואין מערכת
 * פתקים — רק CSS שנטען אחרי globals.css ולכן מנצח בקסקדה.
 * קבצי המקור לא משתנים; רק הקובץ שנוצר כאן.
 *
 * מריצים אוטומטית לפני build (ראה package.json).
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "studio.overrides.json");
const OUT = path.join(ROOT, "src", "app", "studio-baked.css");

const MEDIA = {
  desktop: "(min-width: 1025px)",
  tablet: "(min-width: 768px) and (max-width: 1024px)",
  mobile: "(max-width: 767px)",
};

const header = "/* נוצר אוטומטית מ-studio.overrides.json — אין לערוך ידנית. */\n";

if (!fs.existsSync(SRC)) {
  fs.writeFileSync(OUT, header + "/* אין פתקים. */\n", "utf8");
  console.log("[studio] אין פתקים — נכתב קובץ ריק");
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(SRC, "utf8"));
const out = [header];

if (data.fonts?.length) {
  const q = data.fonts
    .map((f) => `family=${f.replace(/ /g, "+")}:wght@300;400;500;600;700;800;900`)
    .join("&");
  out.push(`@import url("https://fonts.googleapis.com/css2?${q}&display=swap");\n`);
}

let rules = 0;
for (const [screen, media] of Object.entries(MEDIA)) {
  const bucket = data.screens?.[screen];
  if (!bucket) continue;
  const lines = [];

  for (const [sel, props] of Object.entries(bucket.styles ?? {})) {
    const decls = Object.entries(props)
      .map(([k, v]) => `    ${k}: ${v};`)
      .join("\n");
    if (decls) { lines.push(`  ${sel} {\n${decls}\n  }`); rules++; }
  }
  for (const sel of bucket.hidden ?? []) {
    lines.push(`  ${sel} { display: none; }`);
    rules++;
  }
  if (lines.length) out.push(`@media ${media} {\n${lines.join("\n")}\n}\n`);
}

fs.writeFileSync(OUT, out.join("\n"), "utf8");
console.log(`[studio] נאפו ${rules} כללים ל-src/app/studio-baked.css`);

/* טקסטים: לא נאפים אוטומטית — כל הקופי יושב בקובץ אחד,
   ולכן עדיף להעביר אותו ידנית מאשר לשכתב מקור אוטומטית. */
const texts = Object.entries(data.text ?? {});
if (texts.length) {
  console.log(`\n[studio] ${texts.length} עריכות טקסט ממתינות להעברה ל-src/content/site.ts:`);
  for (const [sel, html] of texts) console.log(`  ${sel}\n    → ${html.replace(/\s+/g, " ").slice(0, 90)}`);
}
