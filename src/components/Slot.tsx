/**
 * הצגת ויזואל — קומפוננטה טהורה, בלי גישה לקבצים, כך שאפשר
 * להשתמש בה גם בתוך קומפוננטות לקוח.
 * כשאין src מוצג מציין מקום מסומן במידות המדויקות.
 */
export default function Slot({
  src, id, alt, spec, width, height, className = "", priority = false,
}: {
  src: string | null;
  id: string;
  alt: string;
  spec: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        aria-hidden={alt === "" ? true : undefined}
      />
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-red/45 bg-paper-3 p-4 text-center ${className}`}
      style={{
        aspectRatio: /\bh-full\b/.test(className) ? undefined : `${width} / ${height}`,
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(196,22,28,.14) 0 10px, rgba(192,144,42,.07) 10px 20px)",
      }}
      aria-hidden="true"
    >
      <span dir="ltr" className="text-[0.68rem] font-bold tracking-wide text-red">{id}</span>
      <span className="max-w-[26ch] text-[0.8rem] leading-snug text-muted">
        <b className="block text-ink-2">פה צריך להיות:</b> {spec}
      </span>
      <span dir="ltr" className="text-[0.66rem] text-muted/70">{width}×{height}</span>
    </div>
  );
}
