import { visualSrc } from "@/lib/visuals";
import Slot from "./Slot";

/**
 * סלוט לוויזואל (שרת). מאתר את הקובץ ומעביר ל-Slot.
 * להוספה: שומרים ב-public/visuals בשם המזהה. אין מה לשנות בקוד.
 */
export default function Visual(props: {
  id: string;
  alt: string;
  spec: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fallback?: React.ReactNode;
}) {
  const src = visualSrc(props.id);
  if (!src && props.fallback) return <>{props.fallback}</>;
  return <Slot {...props} src={src} />;
}
