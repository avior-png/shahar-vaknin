import { heroStats } from "@/content/site";

/**
 * רצועת המספרים. לא מספרים מודבקים — כל אחד יושב בכרטיס
 * משלו עם קו זהב עליון, והיחידה מופרדת מהערך בצבע ובגודל.
 */
export default function Stats({ className = "" }: { className?: string }) {
  return (
    <dl className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {heroStats.map((stat, i) => (
        <div
          key={stat.label}
          className="reveal card card-lift relative overflow-hidden bg-paper-2 px-6 pb-6 pt-7"
          style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-gold via-gold-2 to-transparent"
          />
          <dt className="text-[0.92rem] font-semibold leading-snug text-muted">
            {stat.label}
          </dt>
          <dd className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-[2.9rem] leading-none tracking-tight text-ink">
              {stat.value}
            </span>
            <span className="text-[0.95rem] font-bold text-red">{stat.unit}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
