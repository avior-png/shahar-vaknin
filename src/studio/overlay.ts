/**
 * שכבות הסימון של הבחירה.
 *
 * מלכודת §1.10: המסגרות חייבות position:fixed מול ה-viewport
 * ולמקם מחדש בכל scroll/resize, אחרת הן מתנתקות מהאלמנט.
 * מלכודת §1.7: לכן גם אין להשתמש ב-transform על body — הוא
 * היה מעגן מחדש כל fixed צאצא.
 */

function make(cls: string, color: string) {
  const el = document.createElement("div");
  el.className = cls;
  Object.assign(el.style, {
    position: "fixed",
    pointerEvents: "none",
    zIndex: "2147483000",
    border: `2px solid ${color}`,
    borderRadius: "3px",
    display: "none",
    transition: "opacity .12s",
  });
  return el;
}

export class Overlays {
  hover = make("ds-hover-box", "#3B82F6");
  select = make("ds-select-box", "#C4161C");
  private label = document.createElement("div");
  private target: Element | null = null;

  constructor(root: HTMLElement) {
    Object.assign(this.label.style, {
      position: "fixed",
      zIndex: "2147483001",
      background: "#C4161C",
      color: "#fff",
      font: "600 11px/1 ui-monospace, monospace",
      padding: "4px 7px",
      borderRadius: "3px",
      pointerEvents: "none",
      display: "none",
      direction: "ltr",
    });
    root.append(this.hover, this.select, this.label);

    const reposition = () => this.reposition();
    addEventListener("scroll", reposition, { passive: true, capture: true });
    addEventListener("resize", reposition, { passive: true });
  }

  private place(box: HTMLElement, el: Element) {
    const r = el.getBoundingClientRect();
    Object.assign(box.style, {
      display: "block",
      top: `${r.top}px`,
      left: `${r.left}px`,
      width: `${r.width}px`,
      height: `${r.height}px`,
    });
    return r;
  }

  showHover(el: Element) {
    this.place(this.hover, el);
  }
  hideHover() {
    this.hover.style.display = "none";
  }

  showSelect(el: Element, text: string) {
    this.target = el;
    const r = this.place(this.select, el);
    this.label.textContent = text;
    this.label.style.display = "block";
    this.label.style.top = `${Math.max(2, r.top - 22)}px`;
    this.label.style.left = `${r.left}px`;
  }

  hideSelect() {
    this.target = null;
    this.select.style.display = "none";
    this.label.style.display = "none";
  }

  reposition() {
    if (this.target && document.contains(this.target)) {
      this.showSelect(this.target, this.label.textContent ?? "");
    }
    this.hideHover();
  }
}
