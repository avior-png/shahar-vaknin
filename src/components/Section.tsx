import type { ReactNode } from "react";

type Tone = "paper" | "paper-2" | "night";

const TONES: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  "paper-2": "bg-paper-2 text-ink",
  night: "bg-night text-paper",
};

export default function Section({
  children, tone = "paper", className = "", id, contained = true,
}: {
  children: ReactNode; tone?: Tone; className?: string; id?: string; contained?: boolean;
}) {
  return (
    <section id={id} className={`relative overflow-hidden ${TONES[tone]} py-20 md:py-28 ${className}`}>
      {contained ? <div className="container-x">{children}</div> : children}
    </section>
  );
}

export function SectionHead({
  kicker, title, lead, light = false, center = false, className = "",
}: {
  kicker?: string; title: string; lead?: string;
  light?: boolean; center?: boolean; className?: string;
}) {
  return (
    <div className={`reveal max-w-3xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {kicker && (
        <p className={`text-[0.95rem] font-bold ${light ? "text-gold-2" : "text-red"}`}>
          {kicker}
        </p>
      )}
      <h2 className={`display-md mt-4 ${light ? "text-paper" : "text-ink"}`}>{title}</h2>
      {lead && (
        <p className={`mt-6 max-w-[40em] text-[1.06rem] leading-relaxed md:text-[1.14rem] ${
          light ? "text-paper/70" : "text-muted"
        } ${center ? "mx-auto" : ""}`}>
          {lead}
        </p>
      )}
    </div>
  );
}
