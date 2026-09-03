/** עזרי בנייה קטנים לפאנל — DOM גולמי, מבודד מ-React. */

type Props<K extends keyof HTMLElementTagNameMap> =
  Partial<Omit<HTMLElementTagNameMap[K], "style">> & {
    style?: Partial<CSSStyleDeclaration>;
  };

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Props<K> = {},
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  const { style, ...rest } = props as Record<string, unknown>;
  Object.assign(el, rest);
  if (style) Object.assign(el.style, style as Partial<CSSStyleDeclaration>);
  for (const c of children) el.append(c);
  return el;
}

export function row(label: string, ...controls: Node[]) {
  return h(
    "div",
    { className: "ds-row" },
    h("label", { className: "ds-label", textContent: label }),
    h("div", { className: "ds-ctl" }, ...controls)
  );
}

/** סליידר + תיבת מספר מסונכרנים — כמו שנדרש בכל בקרה מספרית. */
export function numeric(
  min: number,
  max: number,
  step: number,
  onChange: (v: number) => void,
  initial = 0
) {
  const range = h("input", { type: "range", className: "ds-range" });
  const num = h("input", { type: "number", className: "ds-num" });
  range.min = num.min = String(min);
  range.max = num.max = String(max);
  range.step = num.step = String(step);
  range.value = num.value = String(initial);

  const sync = (v: string, from: HTMLInputElement) => {
    (from === range ? num : range).value = v;
    onChange(parseFloat(v));
  };
  range.addEventListener("input", () => sync(range.value, range));
  num.addEventListener("input", () => sync(num.value, num));

  const set = (v: number) => {
    range.value = num.value = String(v);
  };
  return { el: h("div", { className: "ds-numeric" }, range, num), set };
}

export function select(options: [string, string][], onChange: (v: string) => void) {
  const el = h("select", { className: "ds-select" });
  for (const [value, label] of options) el.append(h("option", { value, textContent: label }));
  el.addEventListener("change", () => onChange(el.value));
  return el;
}

export function button(label: string, onClick: () => void, variant = "") {
  const el = h("button", { className: `ds-btn ${variant}`, type: "button", textContent: label });
  el.addEventListener("click", onClick);
  return el;
}

export function section(title: string, ...body: Node[]) {
  const content = h("div", { className: "ds-sec-body" }, ...body);
  const head = h("button", { className: "ds-sec-head", type: "button", textContent: title });
  head.addEventListener("click", () => {
    const open = content.style.display !== "none";
    content.style.display = open ? "none" : "";
    head.classList.toggle("ds-closed", open);
  });
  return h("div", { className: "ds-sec" }, head, content);
}

/* ─── בורר צבע HSV עם שקיפות ─────────────────────────────── */

function hsvToRgb(hDeg: number, s: number, v: number) {
  const c = v * s;
  const x = c * (1 - Math.abs(((hDeg / 60) % 2) - 1));
  const m = v - c;
  const [r, g, b] =
    hDeg < 60 ? [c, x, 0] : hDeg < 120 ? [x, c, 0] : hDeg < 180 ? [0, c, x]
    : hDeg < 240 ? [0, x, c] : hDeg < 300 ? [x, 0, c] : [c, 0, x];
  return [r + m, g + m, b + m].map((n) => Math.round(n * 255));
}

export function colorPicker(initial: string, onChange: (css: string) => void) {
  let hue = 0, sat = 1, val = 1, alpha = 1;

  const area = h("div", { className: "ds-sv" });
  const knob = h("div", { className: "ds-knob" });
  area.append(knob);
  const hueBar = h("input", { type: "range", className: "ds-hue", min: "0", max: "360", value: "0" });
  const alphaBar = h("input", { type: "range", className: "ds-alpha", min: "0", max: "1", step: "0.01", value: "1" });
  const hex = h("input", { type: "text", className: "ds-hex", value: initial, spellcheck: false });

  const emit = () => {
    const [r, g, b] = hsvToRgb(hue, sat, val);
    const css = alpha >= 1
      ? `#${[r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("")}`
      : `rgba(${r}, ${g}, ${b}, ${alpha})`;
    hex.value = css;
    area.style.background =
      `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue} 100% 50%))`;
    knob.style.left = `${sat * 100}%`;
    knob.style.top = `${(1 - val) * 100}%`;
    knob.style.background = css;
    onChange(css);
  };

  let dragging = false;
  const pick = (e: MouseEvent) => {
    const r = area.getBoundingClientRect();
    sat = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    val = 1 - Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    emit();
  };
  area.addEventListener("mousedown", (e) => { dragging = true; pick(e); });
  addEventListener("mousemove", (e) => dragging && pick(e));
  addEventListener("mouseup", () => (dragging = false));

  hueBar.addEventListener("input", () => { hue = +hueBar.value; emit(); });
  alphaBar.addEventListener("input", () => { alpha = +alphaBar.value; emit(); });
  hex.addEventListener("change", () => onChange(hex.value));

  emit();
  return h("div", { className: "ds-color" }, area, hueBar, alphaBar, hex);
}
