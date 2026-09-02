import Link from "next/link";

type Variant = "red" | "ink" | "outline" | "ghost";

/** כפתור עם מילוי שנשטף מלמטה וחץ שנע פנימה בהרחפה. */
export default function Button({
  href,
  children,
  variant = "red",
  className = "",
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={`btn btn-${variant} ${className}`}>
      {children}
      {arrow && (
        <svg viewBox="0 0 20 20" className="arrow h-[1.05em] w-[1.05em]" fill="none" aria-hidden="true">
          <path d="M16 10H4M9 4.5L3.5 10 9 15.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </Link>
  );
}
