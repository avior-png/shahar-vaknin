import fs from "node:fs";
import path from "node:path";

/**
 * מאתר ויזואל ב-public/visuals לפי מזהה, בלי סיומת.
 * שרת בלבד — משתמש ב-fs.
 *
 * הרשימה המלאה עם פרומפטים לייצור: docs/VISUALS.md
 */
const EXTENSIONS = [".png", ".webp", ".jpg", ".jpeg"];

export function visualSrc(id: string): string | null {
  const dir = path.join(process.cwd(), "public", "visuals");
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(dir, id + ext))) return `/visuals/${id}${ext}`;
  }
  return null;
}
