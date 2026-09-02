"use client";

import { useState } from "react";
import { contactPage } from "@/content/site";

type Status = "idle" | "sending" | "sent" | "error";

const f = contactPage.fields;

/** שדות הטופס נקבעו בשיחת האפיון: שם, טלפון, אימייל, שם החברה,
 *  אילו מוצרים וכמויות. שם החברה והכמויות הם מה שמסנן פניות. */
export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border-2 border-ink bg-paper p-9 text-center"
      >
        <span
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-teal"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
            <path
              d="M5 12.5l4.5 4.5L19 7.5"
              stroke="#0D6B75"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-5 text-2xl">{contactPage.successTitle}</h3>
        <p className="mt-3 text-muted">{contactPage.successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate={false}
      className="rounded-2xl border border-line bg-paper p-6 md:p-9"
    >
      {/* מלכודת ספאם — מוסתרת מהמשתמש ומקוראי מסך */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">אל תמלא שדה זה</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label={f.name} required autoComplete="name" />
        <Field id="company" label={f.company} required autoComplete="organization" />
        <Field id="phone" label={f.phone} required type="tel" autoComplete="tel" inputMode="tel" />
        <Field id="email" label={f.email} required type="email" autoComplete="email" />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field id="products" label={f.products} required />
        <div>
          <Label htmlFor="quantity" required>
            {f.quantity}
          </Label>
          <select
            id="quantity"
            name="quantity"
            required
            defaultValue=""
            className="mt-2 w-full rounded-lg border border-line bg-paper-2/60 px-4 py-3 text-[1rem] text-ink"
          >
            <option value="" disabled>
              בחר סדר גודל
            </option>
            {contactPage.quantityOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="message">{f.message}</Label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-2 w-full resize-y rounded-lg border border-line bg-paper-2/60 px-4 py-3 text-[1rem] text-ink"
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-lg border-2 border-ink bg-amber-soft px-4 py-3 text-[0.95rem] font-medium text-ink"
        >
          <span aria-hidden="true" className="font-bold">
            !
          </span>
          {contactPage.errorBody}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 w-full rounded-full bg-ink px-8 py-4 text-[1.02rem] font-bold text-paper transition-colors hover:bg-teal disabled:opacity-60"
      >
        {status === "sending" ? "שולח…" : "שליחת הפנייה"}
      </button>

      <p className="mt-4 text-center text-[0.85rem] leading-relaxed text-muted-2">
        {contactPage.formNote}
      </p>
    </form>
  );
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-[0.92rem] font-semibold text-ink">
      {children}
      {required && (
        <span className="text-muted-2"> (חובה)</span>
      )}
    </label>
  );
}

function Field({
  id,
  label,
  required,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-2 w-full rounded-lg border border-line bg-paper-2/60 px-4 py-3 text-[1rem] text-ink"
        {...rest}
      />
    </div>
  );
}
