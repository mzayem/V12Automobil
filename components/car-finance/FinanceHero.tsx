import Link from "next/link";
import Image from "next/image";

export default function FinanceHero({
  current,
  eyebrow,
  title,
  intro,
  heroLabel,
  imageSrc,
  ctaHref = "/inventory",
  ctaLabel = "View Vehicles In Stock",
}: {
  current: string;
  eyebrow: string;
  title: string;
  intro: string;
  heroLabel: string;
  imageSrc?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-16">
      <nav className="mb-8 font-serif text-xs text-muted">
        <Link href="/" className="transition-colors hover:text-rosso">
          Home
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <Link
          href="/car-finance"
          className="transition-colors hover:text-rosso"
        >
          Car Finance
        </Link>
        <span className="mx-2 opacity-50">/</span>
        <span className="text-bianco">{current}</span>
      </nav>

      <div className="relative mb-10 flex aspect-21/9 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-linear-to-br from-white/10 to-transparent text-xs uppercase tracking-[0.1em] text-bianco/40">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Image Placeholder"
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        ) : (
          heroLabel
        )}
      </div>

      <div className="max-w-2xl">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="font-display text-4xl text-bianco sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 font-serif text-lg leading-relaxed text-bianco/85">
          {intro}
        </p>
        <Link
          href={ctaHref}
          className="mt-8 mb-5 inline-flex items-center rounded-full bg-rosso px-8 py-3 font-display text-sm uppercase tracking-[0.15em] text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rosso/25"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
