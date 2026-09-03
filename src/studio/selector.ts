/**
 * יצירת סלקטור ייחודי ויציב לאלמנט.
 *
 * מלכודת §1.8: סלקטור כללי מדי מתנגש בין אלמנטים דומים.
 * לכן כל סלקטור מאומת מול document.querySelectorAll עד שהוא
 * מחזיר בדיוק אחד.
 *
 * מלכודת §1: קלאסים מעורבלים (hashed) לא שורדים build, ולכן
 * הם נפסלים ואנחנו נופלים ל-nth-of-type על המבנה.
 */

const HASHED = /^(css-|sc-|jsx-|_|[a-z]+_[A-Za-z0-9_-]{5,})/;
const VOLATILE = new Set(["ds-hover", "ds-selected", "is-in", "reveal"]);

function stableClasses(el: Element): string[] {
  return Array.from(el.classList).filter(
    (c) => !HASHED.test(c) && !VOLATILE.has(c) && !c.startsWith("ds-")
  );
}

function segment(el: Element): string {
  const tag = el.tagName.toLowerCase();

  if (el.id && !HASHED.test(el.id)) return `#${CSS.escape(el.id)}`;

  const dsId = el.getAttribute("data-ds");
  if (dsId) return `${tag}[data-ds="${dsId}"]`;

  const classes = stableClasses(el);
  if (classes.length) {
    // עד שלושה קלאסים — מספיק לייחוד, ולא שביר מדי
    return tag + classes.slice(0, 3).map((c) => `.${CSS.escape(c)}`).join("");
  }

  const parent = el.parentElement;
  if (!parent) return tag;
  const sameTag = Array.from(parent.children).filter(
    (c) => c.tagName === el.tagName
  );
  if (sameTag.length === 1) return tag;
  return `${tag}:nth-of-type(${sameTag.indexOf(el) + 1})`;
}

/** בונה סלקטור מהאלמנט כלפי מעלה עד שהוא ייחודי. */
export function selectorFor(el: Element): string {
  const parts: string[] = [];
  let node: Element | null = el;

  while (node && node !== document.body) {
    parts.unshift(segment(node));
    const candidate = parts.join(" > ");
    try {
      if (document.querySelectorAll(candidate).length === 1) return candidate;
    } catch {
      /* סלקטור לא חוקי — ממשיכים למעלה */
    }
    node = node.parentElement;
  }

  const full = `body > ${parts.join(" > ")}`;
  return document.querySelectorAll(full).length === 1 ? full : parts.join(" > ");
}

/**
 * מלכודת §1.4: קליק על אות בתוך כותרת מפוצלת, או על <b> בתוך
 * פסקה, צריך לבחור את בלוק הטקסט כולו ולא את הרסיס.
 */
const INLINE = new Set(["B", "STRONG", "EM", "I", "SPAN", "U", "SMALL", "MARK"]);

export function resolveTarget(el: Element): Element {
  let node = el;
  while (
    node.parentElement &&
    node.parentElement !== document.body &&
    INLINE.has(node.tagName) &&
    stableClasses(node).length === 0
  ) {
    node = node.parentElement;
  }
  return node;
}
