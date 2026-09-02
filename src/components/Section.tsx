import type { ReactNode } from "react";

type Tone = "paper" | "paper-2" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  "paper-2": "bg-paper-2 text-ink",
  ink: "on-dark bg-ink text-paper",
};

export default function Section({
  children,
  tone = "paper",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`${tones[tone]} py-20 md:py-section ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "start",
  tone = "ink",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "start" | "center";
  tone?: "ink" | "paper";
}) {
  const centered = align === "center";
  return (
    <div
      className={`reveal max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className={`eyebrow ${centered ? "justify-center" : ""}`}>{eyebrow}</p>
      )}
      <h2
        className={`mt-5 text-[clamp(1.75rem,4.2vw,2.85rem)] ${
          tone === "paper" ? "text-paper" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 text-[1.06rem] leading-relaxed md:text-[1.13rem] ${
            tone === "paper" ? "text-paper/75" : "text-muted"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
