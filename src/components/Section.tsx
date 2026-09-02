import type { ReactNode } from "react";

/** גוונים כפי שנקבעו במפת העמוד: סין כהה → שבירה כתומה → ישראל בהירה */
type Tone = "ground" | "surface" | "orange" | "paper";

const TONES: Record<Tone, string> = {
  ground: "bg-ground text-txt",
  surface: "bg-surface text-txt",
  orange: "bg-accent text-accent-ink",
  paper: "bg-paper text-ink",
};

export default function Section({
  children,
  tone = "ground",
  className = "",
  id,
  contained = true,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
  /** false = התוכן נוגע בקצוות המסך */
  contained?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${TONES[tone]} py-20 md:py-28 ${className}`}
    >
      {contained ? <div className="container-x">{children}</div> : children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  light = false,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  /** true = הסקציה על רקע בהיר */
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`reveal max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${light ? "!text-ink/55" : ""}`}>{eyebrow}</p>
      )}
      <h2
        className={`mt-5 text-[clamp(1.8rem,4.6vw,3.1rem)] ${
          light ? "text-ink" : "text-paper"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 max-w-[40em] text-[1.04rem] leading-relaxed md:text-[1.12rem] ${
            light ? "text-ink/70" : "text-txt-2"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
