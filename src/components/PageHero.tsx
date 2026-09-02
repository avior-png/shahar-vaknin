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
    <section className="on-dark relative overflow-hidden bg-ink text-paper">
      {/* רקע עדין — דקורטיבי בלבד, לא נושא מידע */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 88% 12%, #12909C 0%, transparent 46%), radial-gradient(circle at 8% 92%, #B5730D 0%, transparent 40%)",
        }}
      />
      <div className="container-x relative py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-6 text-[clamp(2.1rem,6vw,3.9rem)] text-paper">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-[1.08rem] leading-relaxed text-paper/75 md:text-[1.2rem]">
              {lead}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
