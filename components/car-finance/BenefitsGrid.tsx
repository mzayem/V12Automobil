export default function BenefitsGrid({
  heading,
  items,
}: {
  heading: string;
  items: { title: string; copy: string }[];
}) {
  return (
    <section className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
      <h2 className="font-display mb-10 max-w-2xl text-2xl text-bianco sm:text-3xl">
        {heading}
      </h2>

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.title}>
            <h4 className="mb-2 flex items-center gap-2.5 font-display text-base text-bianco">
              <span className="size-1.5 shrink-0 rounded-full bg-rosso" />
              {item.title}
            </h4>
            <p className="font-serif text-sm leading-relaxed text-muted">
              {item.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
