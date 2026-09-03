/**
 * מצב העורך: פתקים, היסטוריה ושמירה.
 *
 * מלכודת §1.6: פרסום הוא מיזוג ולא דריסה — לכן העורך טוען
 * (seed) את כל מה שכבר פורסם, ומשדר תמיד את הסט המלא.
 */

export type Screen = "desktop" | "tablet" | "mobile";

export type Overrides = {
  text: Record<string, string>;
  fonts: string[];
  screens: Record<Screen, { styles: Record<string, Record<string, string>>; hidden: string[] }>;
};

export const BREAKPOINTS: Record<Screen, { label: string; width: number; media: string }> = {
  desktop: { label: "דסקטופ", width: 0, media: "(min-width: 1025px)" },
  tablet: { label: "טאבלט", width: 900, media: "(min-width: 768px) and (max-width: 1024px)" },
  mobile: { label: "מובייל", width: 420, media: "(max-width: 767px)" },
};

const LS_KEY = "ds-overrides-v1";

export function empty(): Overrides {
  return {
    text: {},
    fonts: [],
    screens: {
      desktop: { styles: {}, hidden: [] },
      tablet: { styles: {}, hidden: [] },
      mobile: { styles: {}, hidden: [] },
    },
  };
}

export function merge(base: Overrides, patch: Partial<Overrides>): Overrides {
  const out = structuredClone(base);
  Object.assign(out.text, patch.text ?? {});
  for (const f of patch.fonts ?? []) if (!out.fonts.includes(f)) out.fonts.push(f);
  for (const s of Object.keys(out.screens) as Screen[]) {
    const p = patch.screens?.[s];
    if (!p) continue;
    for (const [sel, props] of Object.entries(p.styles ?? {})) {
      out.screens[s].styles[sel] = { ...(out.screens[s].styles[sel] ?? {}), ...props };
    }
    for (const sel of p.hidden ?? []) {
      if (!out.screens[s].hidden.includes(sel)) out.screens[s].hidden.push(sel);
    }
  }
  return out;
}

export class Store {
  data: Overrides = empty();
  screen: Screen = "desktop";
  private past: Overrides[] = [];
  private future: Overrides[] = [];
  private listeners = new Set<() => void>();

  /** טוען את מה שפורסם, וממזג מעליו טיוטה מקומית */
  async load() {
    let published = empty();
    try {
      const res = await fetch("/api/studio", { cache: "no-store" });
      if (res.ok) published = merge(empty(), await res.json());
    } catch {
      /* אין endpoint — ממשיכים עם localStorage בלבד */
    }
    let draft: Partial<Overrides> = {};
    try {
      draft = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
    } catch {
      /* טיוטה פגומה — מתעלמים */
    }
    this.data = merge(published, draft);
    this.emit();
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }
  private emit() {
    this.listeners.forEach((f) => f());
  }

  private snapshot() {
    this.past.push(structuredClone(this.data));
    if (this.past.length > 120) this.past.shift();
    this.future.length = 0;
  }

  private persist() {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(this.data));
    } catch {
      /* מכסת אחסון — לא קריטי */
    }
    this.emit();
  }

  setStyle(sel: string, prop: string, value: string) {
    this.snapshot();
    const bucket = (this.data.screens[this.screen].styles[sel] ??= {});
    if (value === "") delete bucket[prop];
    else bucket[prop] = value;
    if (Object.keys(bucket).length === 0) delete this.data.screens[this.screen].styles[sel];
    this.persist();
  }

  setText(sel: string, html: string) {
    this.snapshot();
    if (html === "") delete this.data.text[sel];
    else this.data.text[sel] = html;
    this.persist();
  }

  toggleHidden(sel: string) {
    this.snapshot();
    const list = this.data.screens[this.screen].hidden;
    const i = list.indexOf(sel);
    if (i >= 0) list.splice(i, 1);
    else list.push(sel);
    this.persist();
  }

  addFont(family: string) {
    if (this.data.fonts.includes(family)) return;
    this.snapshot();
    this.data.fonts.push(family);
    this.persist();
  }

  /** מעתיק את עריכות המסך הנוכחי לשני האחרים */
  applyToOtherScreens() {
    this.snapshot();
    const src = this.data.screens[this.screen];
    for (const s of Object.keys(this.data.screens) as Screen[]) {
      if (s === this.screen) continue;
      this.data.screens[s] = structuredClone(src);
    }
    this.persist();
  }

  resetSelector(sel: string) {
    this.snapshot();
    for (const s of Object.keys(this.data.screens) as Screen[]) {
      delete this.data.screens[s].styles[sel];
      const list = this.data.screens[s].hidden;
      const i = list.indexOf(sel);
      if (i >= 0) list.splice(i, 1);
    }
    delete this.data.text[sel];
    this.persist();
  }

  resetAll() {
    this.snapshot();
    this.data = empty();
    this.persist();
  }

  undo() {
    const prev = this.past.pop();
    if (!prev) return;
    this.future.push(structuredClone(this.data));
    this.data = prev;
    this.persist();
  }

  redo() {
    const next = this.future.pop();
    if (!next) return;
    this.past.push(structuredClone(this.data));
    this.data = next;
    this.persist();
  }

  async publish(): Promise<boolean> {
    try {
      const res = await fetch("/api/studio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.data),
      });
      return res.ok;
    } catch {
      return false;
    }
  }
}
