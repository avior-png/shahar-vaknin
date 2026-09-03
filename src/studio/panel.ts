import { Store, BREAKPOINTS, type Screen } from "./store";
import { selectorFor, resolveTarget } from "./selector";
import { applyAll } from "./apply";
import { Overlays } from "./overlay";
import { h, row, numeric, select, button, section, colorPicker } from "./ui";

const PX = (p: string) => (v: number) => [p, `${v}px`] as const;

export function buildPanel(store: Store, root: HTMLElement) {
  const overlays = new Overlays(root);
  let current: Element | null = null;
  let currentSel = "";
  let picking = true;

  /* ─── שלד הפאנel ─────────────────────────────────────── */
  const title = h("div", { className: "ds-title" });
  const body = h("div", { className: "ds-body" });
  const panel = h("div", { className: "ds-panel" }, title, body);
  root.append(panel);

  /* גרירה מהכותרת */
  let drag: { x: number; y: number } | null = null;
  title.addEventListener("mousedown", (e) => {
    if ((e.target as HTMLElement).tagName === "BUTTON") return;
    drag = { x: e.clientX - panel.offsetLeft, y: e.clientY - panel.offsetTop };
  });
  addEventListener("mousemove", (e) => {
    if (!drag) return;
    panel.style.left = `${e.clientX - drag.x}px`;
    panel.style.top = `${e.clientY - drag.y}px`;
    panel.style.right = "auto";
  });
  addEventListener("mouseup", () => (drag = null));

  /* ─── בחירה בקליק ─────────────────────────────────────── */
  const inEditor = (el: EventTarget | null) =>
    el instanceof Node && root.contains(el);

  document.addEventListener(
    "mouseover",
    (e) => {
      if (!picking || inEditor(e.target)) return;
      const el = resolveTarget(e.target as Element);
      if (el && el !== document.body) overlays.showHover(el);
    },
    true
  );

  document.addEventListener(
    "click",
    (e) => {
      if (!picking || inEditor(e.target)) return;
      e.preventDefault();
      e.stopPropagation();
      selectElement(resolveTarget(e.target as Element));
    },
    true
  );

  function selectElement(el: Element) {
    if (!el || el === document.body) return;
    current = el;
    currentSel = selectorFor(el);
    overlays.showSelect(el, currentSel.split(" > ").pop() ?? "");
    renderControls();
  }

  /* ─── עץ המבנה — קריאה בלבד ───────────────────────────── */
  function buildTree(): HTMLElement {
    const wrap = h("div", { className: "ds-tree" });
    const walk = (el: Element, depth: number) => {
      if (depth > 6 || root.contains(el)) return;
      const label = el.tagName.toLowerCase() +
        (el.className && typeof el.className === "string"
          ? "." + el.className.split(" ").filter(Boolean).slice(0, 2).join(".")
          : "");
      const node = h("button", {
        className: "ds-tree-node",
        type: "button",
        textContent: label,
        style: { paddingInlineStart: `${depth * 10 + 8}px` },
      });
      node.addEventListener("click", () => selectElement(el));
      node.addEventListener("mouseenter", () => overlays.showHover(el));
      wrap.append(node);
      Array.from(el.children).forEach((c) => walk(c, depth + 1));
    };
    const main = document.querySelector("main") ?? document.body;
    Array.from(main.children).forEach((c) => walk(c, 0));
    return wrap;
  }

  /* ─── בקרות ───────────────────────────────────────────── */
  function set(prop: string) {
    return (value: string) => {
      if (!currentSel) return;
      store.setStyle(currentSel, prop, value);
      applyAll(store.data);
      overlays.reposition();
    };
  }
  function setPx(prop: string) {
    const s = set(prop);
    return (v: number) => s(`${v}px`);
  }

  function renderControls() {
    body.replaceChildren();
    if (!current) {
      body.append(h("p", { className: "ds-empty", textContent: "בחר אלמנט בעמוד" }));
      body.append(section("מבנה", buildTree()));
      body.append(hiddenList());
      return;
    }

    const cs = getComputedStyle(current);
    const isText = (current.textContent ?? "").trim().length > 0;

    body.append(h("code", { className: "ds-sel", textContent: currentSel, dir: "ltr" }));

    /* טקסט */
    if (isText) {
      const ta = h("textarea", { className: "ds-textarea", value: current.innerHTML });
      ta.addEventListener("input", () => {
        store.setText(currentSel, ta.value);
        applyAll(store.data);
      });
      body.append(section("טקסט", ta));
    }

    /* טיפוגרפיה */
    const fs = numeric(8, 200, 1, setPx("font-size"), parseFloat(cs.fontSize));
    const lh = numeric(0.7, 3, 0.01, (v) => set("line-height")(String(v)), parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) || 1.5);
    const ls = numeric(-8, 20, 0.1, setPx("letter-spacing"), parseFloat(cs.letterSpacing) || 0);
    const fw = select(
      [["", "—"], ...["300", "400", "500", "600", "700", "800", "900"].map((w) => [w, w] as [string, string])],
      set("font-weight")
    );
    const ta2 = select([["", "—"], ["right", "ימין"], ["center", "מרכז"], ["left", "שמאל"]], set("text-align"));
    const fontInput = h("input", { className: "ds-text", placeholder: "Google font — למשל Rubik", spellcheck: false });
    fontInput.addEventListener("change", () => {
      if (!fontInput.value.trim()) return;
      store.addFont(fontInput.value.trim());
      set("font-family")(`"${fontInput.value.trim()}", sans-serif`);
      applyAll(store.data);
    });
    body.append(section("טיפוגרפיה",
      row("גודל", fs.el), row("גובה שורה", lh.el), row("מרווח אותיות", ls.el),
      row("משקל", fw), row("יישור", ta2), row("פונט", fontInput)
    ));

    /* צבע */
    body.append(section("צבע",
      row("טקסט", colorPicker(cs.color, set("color"))),
      row("רקע", colorPicker(cs.backgroundColor, set("background-color")))
    ));

    /* מרווחים */
    const sides = ["top", "right", "bottom", "left"] as const;
    const labels = { top: "עליון", right: "ימין", bottom: "תחתון", left: "שמאל" };
    body.append(section("מרווחים",
      ...sides.map((s) => row(`padding ${labels[s]}`, numeric(0, 300, 1, setPx(`padding-${s}`), parseFloat(cs[`padding${s[0].toUpperCase()}${s.slice(1)}` as never]) || 0).el)),
      ...sides.map((s) => row(`margin ${labels[s]}`, numeric(-200, 300, 1, setPx(`margin-${s}`), parseFloat(cs[`margin${s[0].toUpperCase()}${s.slice(1)}` as never]) || 0).el))
    ));

    /* מידות ומסגרת */
    body.append(section("מידות ומסגרת",
      row("רוחב", h("input", { className: "ds-text", placeholder: "auto / 100% / 480px", oninput: (e) => set("width")((e.target as HTMLInputElement).value) })),
      row("גובה", h("input", { className: "ds-text", placeholder: "auto / 60vh", oninput: (e) => set("height")((e.target as HTMLInputElement).value) })),
      row("רוחב מרבי", h("input", { className: "ds-text", placeholder: "none / 1200px", oninput: (e) => set("max-width")((e.target as HTMLInputElement).value) })),
      row("פינות", numeric(0, 80, 1, setPx("border-radius"), parseFloat(cs.borderRadius) || 0).el),
      row("מסגרת", h("input", { className: "ds-text", placeholder: "1px solid #000", oninput: (e) => set("border")((e.target as HTMLInputElement).value) }))
    ));

    /* אפקטים */
    body.append(section("אפקטים",
      row("שקיפות", numeric(0, 1, 0.01, (v) => set("opacity")(String(v)), parseFloat(cs.opacity)).el),
      row("סיבוב", numeric(-180, 180, 1, (v) => set("transform")(`rotate(${v}deg)`), 0).el),
      row("צל תיבה", h("input", { className: "ds-text", placeholder: "0 20px 40px -20px rgba(0,0,0,.4)", oninput: (e) => set("box-shadow")((e.target as HTMLInputElement).value) })),
      row("צל טקסט", h("input", { className: "ds-text", placeholder: "0 2px 8px rgba(0,0,0,.4)", oninput: (e) => set("text-shadow")((e.target as HTMLInputElement).value) })),
      row("מיזוג", select([["", "—"], ["multiply", "multiply"], ["screen", "screen"], ["overlay", "overlay"], ["difference", "difference"]], set("mix-blend-mode")))
    ));

    /* רקע */
    const gallery = Array.from(new Set(
      Array.from(document.images).map((i) => new URL(i.src).pathname).filter((p) => p.startsWith("/"))
    ));
    body.append(section("רקע",
      row("תמונה", select([["", "—"], ...gallery.map((g) => [g, g] as [string, string])],
        (v) => set("background-image")(v ? `url("${v}")` : ""))),
      row("גודל", select([["", "—"], ["cover", "cover"], ["contain", "contain"], ["auto", "auto"]], set("background-size"))),
      row("מיקום", select([["", "—"], ["center", "מרכז"], ["top", "למעלה"], ["bottom", "למטה"], ["right center", "ימין"], ["left center", "שמאל"]], set("background-position"))),
      row("חזרה", select([["", "—"], ["no-repeat", "ללא"], ["repeat", "חזרה"]], set("background-repeat")))
    ));

    /* מתקדם */
    const adv = h("input", { className: "ds-text", placeholder: "prop: value", spellcheck: false, dir: "ltr" });
    adv.addEventListener("change", () => {
      const [p, ...rest] = adv.value.split(":");
      if (p && rest.length) { set(p.trim())(rest.join(":").trim()); adv.value = ""; }
    });
    body.append(section("מתקדם", adv));

    /* פעולות על האלמנט */
    body.append(h("div", { className: "ds-actions" },
      button(store.data.screens[store.screen].hidden.includes(currentSel) ? "הצג" : "הסתר", () => {
        store.toggleHidden(currentSel);
        applyAll(store.data);
        renderControls();
      }),
      button("אפס אלמנט", () => {
        store.resetSelector(currentSel);
        applyAll(store.data);
        renderControls();
      }, "ds-warn")
    ));

    body.append(section("מבנה", buildTree()));
    body.append(hiddenList());
  }

  function hiddenList() {
    const list = store.data.screens[store.screen].hidden;
    const wrap = h("div", { className: "ds-hidden-list" });
    if (!list.length) wrap.append(h("p", { className: "ds-empty", textContent: "אין אלמנטים מוסתרים" }));
    for (const sel of list) {
      wrap.append(h("div", { className: "ds-hidden-item" },
        h("code", { textContent: sel, dir: "ltr" }),
        button("החזר", () => {
          store.toggleHidden(sel);
          applyAll(store.data);
          renderControls();
        })
      ));
    }
    return section(`מוסתרים (${list.length})`, wrap);
  }

  /* ─── כותרת הפאנל ─────────────────────────────────────── */
  function renderTitle() {
    title.replaceChildren();
    const screens = h("div", { className: "ds-screens" });
    for (const s of Object.keys(BREAKPOINTS) as Screen[]) {
      const b = button(BREAKPOINTS[s].label, () => {
        store.screen = s;
        setViewport(s);
        renderTitle();
        renderControls();
      }, store.screen === s ? "ds-on" : "");
      screens.append(b);
    }
    title.append(
      h("strong", { textContent: "Design Studio" }),
      screens,
      h("div", { className: "ds-title-actions" },
        button(picking ? "בחירה ✓" : "בחירה ✕", () => { picking = !picking; renderTitle(); }),
        button("↶", () => { store.undo(); applyAll(store.data); renderControls(); }),
        button("↷", () => { store.redo(); applyAll(store.data); renderControls(); }),
        button("החל על שאר המסכים", () => { store.applyToOtherScreens(); applyAll(store.data); }),
        button("פרסם", async () => {
          const ok = await store.publish();
          alert(ok ? "פורסם ל-studio.overrides.json" : "הפרסום נכשל — האם שרת הפיתוח רץ?");
        }, "ds-primary"),
        button("אפס הכל", () => {
          if (confirm("למחוק את כל העריכות?")) { store.resetAll(); applyAll(store.data); renderControls(); }
        }, "ds-warn"),
        button("—", () => panel.classList.toggle("ds-min"))
      )
    );
  }

  /* מלכודת §1.7: אין transform על body — מצמצמים ברוחב בלבד */
  function setViewport(s: Screen) {
    const w = BREAKPOINTS[s].width;
    const el = document.documentElement;
    if (!w) {
      el.style.removeProperty("--ds-vw");
      document.body.style.removeProperty("max-width");
      document.body.style.removeProperty("margin-inline");
      document.body.style.removeProperty("box-shadow");
    } else {
      document.body.style.maxWidth = `${w}px`;
      document.body.style.marginInline = "auto";
      document.body.style.boxShadow = "0 0 0 1px rgba(0,0,0,.15)";
    }
    overlays.reposition();
  }

  addEventListener("keydown", (e) => {
    if (!(e.metaKey || e.ctrlKey)) return;
    if (e.key.toLowerCase() !== "z") return;
    e.preventDefault();
    if (e.shiftKey) store.redo();
    else store.undo();
    applyAll(store.data);
    renderControls();
  });

  store.subscribe(() => applyAll(store.data));
  renderTitle();
  renderControls();
}
