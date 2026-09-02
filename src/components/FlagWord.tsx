/**
 * מילה בכותרת עם מסכת דגל.
 *
 * הדגלים משמשים כסוגריים של המסע: סין פותחת את עמוד הבית,
 * ישראל סוגרת אותו באזור המסירה. המסכה הישראלית היא בעיקר
 * לבן ולכן עובדת רק על רקע בהיר — ולכן היא בתחתית ולא בהירו.
 */
export default function FlagWord({
  children,
  flag,
}: {
  children: React.ReactNode;
  flag: "cn" | "il";
}) {
  const cn =
    "linear-gradient(180deg, #E23B21 0%, #DE2910 46%, #B01E0C 100%)";
  const il =
    "linear-gradient(180deg, #FAFAF8 0 27%, #0038B8 27% 40%, #FAFAF8 40% 60%, #0038B8 60% 73%, #FAFAF8 73%)";

  return (
    <span
      className="bg-clip-text px-[0.04em] text-transparent"
      style={{
        backgroundImage: flag === "cn" ? cn : il,
        WebkitBackgroundClip: "text",
        WebkitTextStroke:
          flag === "cn" ? "1px rgba(255,222,0,.5)" : "0.5px rgba(0,56,184,.4)",
      }}
    >
      {children}
    </span>
  );
}
