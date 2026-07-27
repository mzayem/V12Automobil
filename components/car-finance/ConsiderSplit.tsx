import Image from "next/image";
import { Check } from "lucide-react";

export default function ConsiderSplit({
  imageLabel,
  imageSrc,
  heading,
  items,
}: {
  imageLabel: string;
  imageSrc?: string;
  heading: string;
  items: string[];
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
          <ul className="space-y-4">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-3.5">
                <Check className="mt-0.5 size-4 shrink-0 text-rosso" />
                <span className="font-serif text-sm leading-relaxed text-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
