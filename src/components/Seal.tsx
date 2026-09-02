/**
 * חותם — מוטיב האותנטיות.
 * גרסה פשוטה ונקייה: ריבוע מעוגל בקו אדום עם תו סיני אחד
 * במרכז. מחליף את החותמת העמוסה שהייתה קודם.
 */
export default function Seal({
  label = "验",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-center justify-center rounded-[10px] border-[2.5px] border-red text-red ${className}`}
      style={{ width: "3.1rem", height: "3.1rem" }}
    >
      <span className="text-[1.5rem] leading-none" style={{ fontFamily: "serif" }}>
        {label}
      </span>
    </span>
  );
}
