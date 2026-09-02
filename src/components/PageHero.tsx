export default function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-ground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 88% 6%, rgba(232,84,31,.16), transparent 52%)",
        }}
      />
      <div className="container-x relative py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-6 text-[clamp(2.2rem,6.4vw,4.2rem)] text-paper">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-[1.06rem] leading-relaxed text-txt-2 md:text-[1.18rem]">
              {lead}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
