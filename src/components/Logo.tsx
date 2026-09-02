import { site } from "@/content/site";

/**
 * סימן זמני עד שיוכרע לוגו.
 * המוטיב: חותם (印章) — סמל האותנטיות בסין, וגם ״מאומת״.
 * העדשה במרכז נשענת על ״העיניים שלך בסין״.
 * בנוי מקווי מתאר בלבד, כך שהוא קריא גם בהדפסה ובמונוכרום.
 */
export default function Logo({
  className = "",
  tone = "ink",
}: {
  className?: string;
  tone?: "ink" | "paper";
}) {
  const main = tone === "paper" ? "#FBFAF6" : "#0B1A20";
  const accent = tone === "paper" ? "#F0C572" : "#0D6B75";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="h-9 w-9 flex-none"
        fill="none"
      >
        <rect
          x="2.6"
          y="2.6"
          width="34.8"
          height="34.8"
          rx="7"
          stroke={main}
          strokeWidth="2.4"
        />
        <circle cx="20" cy="20" r="10.4" stroke={accent} strokeWidth="2.4" />
        <circle cx="20" cy="20" r="3.5" fill={accent} />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[1.15rem] font-extrabold tracking-tight"
          style={{ color: main }}
        >
          {site.name}
        </span>
        <span
          className="font-label mt-1 text-[0.6rem] font-bold tracking-[0.18em]"
          style={{ color: tone === "paper" ? "#F0C572" : "#5C6B72" }}
        >
          {site.tagline}
        </span>
      </span>
    </span>
  );
}
