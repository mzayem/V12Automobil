import { Star } from "lucide-react";

export default function FinanceIntro({
  heading,
  paragraphs,
  quote,
}: {
  heading: string;
  paragraphs: string[];
  quote?: { text: string; author: string };
}) {
  return (
    <section className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <div className="max-w-2xl">
          <h2 className="font-display mb-6 text-2xl text-bianco sm:text-3xl">
            {heading}
          </h2>
          <div className="space-y-4 font-serif text-base leading-relaxed text-muted">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {quote && (
          <blockquote className="rounded-r-lg border-l-2 border-rosso bg-white/5 p-8">
            <div className="mb-2 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="font-serif text-base italic leading-relaxed text-bianco/90">
              &ldquo;{quote.text}&rdquo;
            </p>
            <footer className="mt-4 text-sm font-semibold uppercase tracking-[0.15em] text-rosso">
              {quote.author}
            </footer>
            <p className="mt-4 font-serif text-4xl font-semibold leading-relaxed text-bianco">
              Google
            </p>
          </blockquote>
        )}
      </div>
    </section>
  );
}
