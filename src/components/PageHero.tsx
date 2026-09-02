export default function PageHero({
  kicker, title, lead,
}: { kicker: string; title: string; lead?: string }) {
  return (
    <section className="bg-paper px-3 pt-5 md:px-5">
      <div className="container-x !px-0">
        <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-night px-7 py-20 text-paper md:px-14 md:py-24">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-24 h-80 w-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(196,22,28,.3), transparent 68%)" }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -right-10 h-72 w-72 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(192,144,42,.22), transparent 68%)" }}
          />
          <div className="relative max-w-3xl">
            <p className="text-[0.95rem] font-bold text-gold-2">{kicker}</p>
            <h1 className="display-md mt-4 text-paper">{title}</h1>
            {lead && (
              <p className="mt-6 max-w-2xl text-[1.06rem] leading-relaxed text-paper/72 md:text-[1.16rem]">
                {lead}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
