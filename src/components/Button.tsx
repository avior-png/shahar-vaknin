import Link from "next/link";

type Variant = "red" | "ink" | "outline" | "ghost";

/** כפתור עם מילוי שנשטף מלמטה וחץ שנע פנימה בהרחפה. */
export default function Button({
  href,
  children,
  variant = "red",
  className = "",
  arrow = true,
  solidArrow = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  /** חץ משולש מלא, כמו בסקיצת ההירו */
  solidArrow?: boolean;
}) {
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`}>
      {children}
      {arrow && (
        solidArrow ? (
          <svg viewBox="0 0 12 14" className="arrow h-[0.8em] w-[0.7em]" aria-hidden="true">
            <path d="M11 7L1 13.5V0.5z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" className="arrow h-[1.05em] w-[1.05em]" fill="none" aria-hidden="true">
            <path d="M16 10H4M9 4.5L3.5 10 9 15.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      )}
    </Link>
  );
}
