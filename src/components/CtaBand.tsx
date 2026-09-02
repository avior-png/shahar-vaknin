import Visual from "./Visual";
import Button from "./Button";
import { finalCta } from "@/content/site";

/**
 * הנעה לפעולה — מגדל המכולות על רקע שמיים.
 * לוח בתוך מסגרת עם שוליים: כותרת ענקית למעלה, ומתחתיה
 * ערימת המכולות שעומדת על קו האופק.
 */
export default function CtaBand() {
  return (
    <section className="bg-paper px-3 py-14 md:px-5 md:py-20">
      <div className="container-wide !px-0">
        <div className="reveal relative overflow-hidden rounded-[var(--radius-xl)]">
          {/* שמיים וים */}
          <span aria-hidden="true" className="absolute inset-0 block">
            <Visual
              id="cta-sky"
              alt=""
              spec="שמיים בהירים מעל ים שקט — קו אופק נמוך, עננים דקים"
              width={2400}
              height={1500}
              className="h-full w-full object-cover"
            />
          </span>

          <div className="relative px-6 pt-16 text-center md:px-14 md:pt-20">
            <p className="text-[0.95rem] font-bold text-red">{finalCta.kicker}</p>
            <h2 className="display-md mx-auto mt-4 max-w-[15ch] text-ink">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-6 max-w-[36em] text-[1.06rem] leading-relaxed text-ink-2">
              {finalCta.body}
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={finalCta.cta.href} variant="red">{finalCta.cta.label}</Button>
              <Button href={finalCta.secondary.href} variant="outline" arrow={false}>
                {finalCta.secondary.label}
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {finalCta.points.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-[0.94rem] text-ink-2">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-red" />
                  {point}
                </li>
              ))}
            </ul>

            {/* מגדל המכולות עומד על קו האופק */}
            <div className="mx-auto mt-12 w-full max-w-[620px]">
              <Visual
                id="cta-containers"
                alt=""
                spec="ארבע מכולות ערומות זו על זו בפרספקטיבה — PNG שקוף, ניצבות על קו האופק"
                width={1400}
                height={1200}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
