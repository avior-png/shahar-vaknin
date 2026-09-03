import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

/**
 * שמירת פתקי Design Studio — פיתוח בלבד.
 *
 * מלכודת §1.6: הפרסום ממזג ולא דורס. אובייקט ריק או טקסט ריק
 * מוחקים את ה-override עבור אותו סלקטור.
 */

const FILE = path.join(process.cwd(), "studio.overrides.json");
const SCREENS = ["desktop", "tablet", "mobile"] as const;

type Screen = (typeof SCREENS)[number];
type Overrides = {
  text: Record<string, string>;
  fonts: string[];
  screens: Record<Screen, { styles: Record<string, Record<string, string>>; hidden: string[] }>;
};

function empty(): Overrides {
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

async function read(): Promise<Overrides> {
  try {
    return { ...empty(), ...JSON.parse(await fs.readFile(FILE, "utf8")) };
  } catch {
    return empty();
  }
}

function devOnly() {
  return process.env.NODE_ENV === "development"
    ? null
    : NextResponse.json({ error: "dev_only" }, { status: 404 });
}

export async function GET() {
  const blocked = devOnly();
  if (blocked) return blocked;
  return NextResponse.json(await read());
}

export async function POST(request: Request) {
  const blocked = devOnly();
  if (blocked) return blocked;

  let patch: Partial<Overrides>;
  try {
    patch = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const out = await read();

  for (const [sel, html] of Object.entries(patch.text ?? {})) {
    if (html === "") delete out.text[sel];
    else out.text[sel] = html;
  }
  for (const f of patch.fonts ?? []) if (!out.fonts.includes(f)) out.fonts.push(f);

  for (const screen of SCREENS) {
    const incoming = patch.screens?.[screen];
    if (!incoming) continue;
    for (const [sel, props] of Object.entries(incoming.styles ?? {})) {
      if (!props || Object.keys(props).length === 0) delete out.screens[screen].styles[sel];
      else out.screens[screen].styles[sel] = { ...(out.screens[screen].styles[sel] ?? {}), ...props };
    }
    out.screens[screen].hidden = Array.from(
      new Set([...(incoming.hidden ?? [])])
    );
  }

  await fs.writeFile(FILE, JSON.stringify(out, null, 2), "utf8");
  return NextResponse.json({ ok: true });
}
