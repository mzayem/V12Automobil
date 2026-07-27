import Image from "next/image";

export default function OptionsSplit({
  imageLabel,
  imageSrc,
  heading,
  items,
}: {
  imageLabel: string;
  imageSrc?: string;
  heading: string;
  items: { strong: string; text: string }[];
}) {
  return (
    <section className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-linear-to-br from-white/10 to-transparent text-xs uppercase tracking-widest text-bianco/40">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Image Placeholder"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            imageLabel
          )}
        </div>

        <div>
          <h2 className="font-display mb-7 text-2xl text-bianco sm:text-3xl">
            {heading}
          </h2>
          <ol className="space-y-6">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-rosso font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="font-serif text-sm leading-relaxed text-muted">
                  <strong className="font-semibold text-bianco">
                    {item.strong}
                  </strong>{" "}
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
