import { NextResponse } from "next/server";

/**
 * קליטת פניות מהאתר.
 *
 * הלקוח ביקש לעבוד עם Google Sheets ולא עם CRM. הדרך הפשוטה:
 * Google Apps Script שמקבל POST וכותב שורה לגיליון — ואת כתובת
 * ה-Webhook שלו שמים ב-LEAD_WEBHOOK_URL (משתנה סביבה, לא בקוד).
 *
 * כל עוד המשתנה לא מוגדר, הפנייה נרשמת ללוג בלבד והטופס עדיין
 * מחזיר תשובה תקינה — כדי שאפשר יהיה לפתח ולבדוק בלי תלות חיצונית.
 */

const REQUIRED = ["name", "company", "phone", "email", "products", "quantity"] as const;
const MAX_LEN = 2000;

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  // מלכודת ספאם: בוט שממלא את השדה המוסתר מקבל 200 ולא נרשם
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const lead: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (key === "website") continue;
    if (typeof value !== "string") continue;
    lead[key] = value.trim().slice(0, MAX_LEN);
  }

  const missing = REQUIRED.filter((key) => !lead[key]);
  if (missing.length > 0) {
    return NextResponse.json({ error: "missing_fields", missing }, { status: 422 });
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(lead.email)) {
    return NextResponse.json({ error: "bad_email" }, { status: 422 });
  }

  const record: Record<string, string> = {
    ...lead,
    submittedAt: new Date().toISOString(),
    source: request.headers.get("referer") ?? "",
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.info("[lead] webhook not configured — lead not persisted", {
      company: record.company,
      submittedAt: record.submittedAt,
    });
    return NextResponse.json({ ok: true, persisted: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (error) {
    console.error("[lead] failed to deliver", error);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, persisted: true });
}
