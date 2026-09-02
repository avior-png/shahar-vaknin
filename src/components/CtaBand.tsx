import Visual from "./Visual";
import Button from "./Button";
import { finalCta } from "@/content/site";

/** לוח בתוך מסגרת עם שוליים, על תמונת רקע. */
export default function CtaBand() {
  return (
    <section className="bg-paper px-3 py-14 md:px-5 md:py-20">
      <div className="container-x !px-0">
        <div className="reveal relative overflow-hidden rounded-[var(--radius-xl)] bg-night">
          <span aria-hidden="true" className="absolute inset-0 block">
            <Visual
              id="cta-bg"
              alt=""
              spec="נמל בישראל בשעת בוקר — מכולות ומנופים, פריים רחב ורגוע"
              width={2400}
              height={1300}
              className="h-full w-full object-cover"
            />
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-l from-night via-night/90 to-night/60"
          />

          <div className="relative px-7 py-16 md:px-16 md:py-24">
            <p className="text-[0.95rem] font-bold text-gold-2">{finalCta.kicker}</p>
            <h2 className="display-md mt-4 max-w-[16ch] text-paper">{finalCta.title}</h2>
            <p className="mt-6 max-w-[38em] text-[1.06rem] leading-relaxed text-paper/75">
              {finalCta.body}
            </p>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {finalCta.points.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-[0.95rem] text-paper/80">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-gold-2" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={finalCta.cta.href} variant="red">{finalCta.cta.label}</Button>
              <Button href={finalCta.secondary.href} variant="ghost" arrow={false}>
                {finalCta.secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
