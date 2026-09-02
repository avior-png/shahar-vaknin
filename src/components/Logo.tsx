import { site } from "@/content/site";

/**
 * סימן זמני עד להכרעת לוגו.
 * המוטיב: חותם נעילה של מכולה — ההוכחה הפיזית שאיש לא פתח את
 * המשלוח. זה בדיוק מה שהוא מוכר, וזה גם המועמד המוביל ללוגו.
 */
export default function Logo({
  className = "",
  tone = "light",
}: {
  className?: string;
  /** light = על רקע כהה | dark = על רקע בהיר */
  tone?: "light" | "dark";
}) {
  const main = tone === "light" ? "#EFEDE8" : "#0B0C0D";
  const accent = "#E8541F";
  const sub = tone === "light" ? "#78868E" : "#5C6B72";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 36 36" aria-hidden="true" className="h-9 w-9 flex-none" fill="none">
        <rect x="2" y="9" width="32" height="18" rx="1.5" stroke={main} strokeWidth="2" />
        <path d="M9 9v18M27 9v18" stroke={main} strokeWidth="1.2" opacity=".55" />
        <circle cx="18" cy="18" r="6" stroke={accent} strokeWidth="2.4" />
        <circle cx="18" cy="18" r="1.9" fill={accent} />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.1rem]" style={{ color: main }}>
          {site.name}
        </span>
        <span
          className="mt-1.5 font-mono text-[0.55rem] font-semibold tracking-[0.18em]"
          style={{ color: sub }}
        >
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
