import { site } from "@/content/site";

/**
 * סימן זמני עד להכרעת לוגו.
 * חותם מרובע בקו אדום — מוטיב האותנטיות הסיני — עם צורת מכולה
 * מרומזת בפנים.
 */
export default function Logo({
  className = "",
  tone = "dark",
}: {
  className?: string;
  /** dark = על רקע בהיר | light = על רקע כהה */
  tone?: "dark" | "light";
}) {
  const main = tone === "dark" ? "#17120F" : "#FBF9F5";
  const sub = tone === "dark" ? "#7A6F64" : "rgba(251,249,245,.6)";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 40 40" aria-hidden="true" className="h-10 w-10 flex-none" fill="none">
        <rect x="2" y="2" width="36" height="36" rx="9" stroke="#C4161C" strokeWidth="2.4" />
        <rect x="10.5" y="14" width="19" height="12" rx="2" stroke={main} strokeWidth="2" />
        <path d="M16.5 14v12M23.5 14v12" stroke={main} strokeWidth="1.4" opacity=".5" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.18rem]" style={{ color: main }}>
          {site.name}
        </span>
        <span className="mt-1.5 text-[0.68rem] font-semibold tracking-wide" style={{ color: sub }}>
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
