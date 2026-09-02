import fs from "node:fs";
import path from "node:path";

/**
 * סלוט לוויזואל.
 *
 * כל עוד הקובץ לא קיים ב-public/visuals — מוצג מציין מקום
 * מסומן במידות המדויקות, כך שהפריסה כבר נכונה. ברגע שהקובץ
 * נכנס לתיקייה הוא פשוט מופיע, בלי לגעת בקוד.
 *
 * הרשימה המלאה עם פרומפטים לייצור: docs/VISUALS.md
 */

export type VisualId =
  | "01-crane"
  | "02-seal"
  | "03-floor"
  | "05-consol"
  | "06-arrival";

const EXTENSIONS = [".png", ".webp", ".jpg", ".jpeg"];

function resolve(id: VisualId): string | null {
  const dir = path.join(process.cwd(), "public", "visuals");
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(dir, id + ext))) return `/visuals/${id}${ext}`;
  }
  return null;
}

export default function Visual({
  id,
  alt,
  spec,
  width,
  height,
  className = "",
  priority = false,
}: {
  id: VisualId;
  /** ריק = דקורטיבי בלבד */
  alt: string;
  /** מה אמור להיות כאן — מוצג במציין המקום */
  spec: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  const src = resolve(id);

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
      className={`slot flex flex-col items-center justify-center gap-2 border border-dashed border-accent/35 p-4 text-center ${className}`}
      style={{
        aspectRatio: `${width} / ${height}`,
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(232,84,31,.05) 0 10px, transparent 10px 20px)",
      }}
      aria-hidden="true"
    >
      <span dir="ltr" className="font-mono text-[0.62rem] tracking-[0.14em] text-accent-2">
        {id}
      </span>
      <span className="max-w-[24ch] text-[0.8rem] leading-snug text-steel">
        <b className="block text-txt-2">פה צריך להיות:</b>{" "}
        {spec}
      </span>
      <span dir="ltr" className="font-mono text-[0.6rem] tracking-wide text-steel/70">
        {width}×{height}
      </span>
    </div>
  );
}
