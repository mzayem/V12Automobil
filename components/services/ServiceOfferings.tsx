import Link from "next/link";
import { ArrowRight } from "lucide-react";

const OFFERINGS = [
  {
    number: "01",
    title: "Sell Your Supercar",
    copy: "We're always looking to buy high-quality supercars and performance vehicles to expand our premium stock. Whether you own a Ferrari, Lamborghini, McLaren, or Porsche, our expert team guarantees a fast, hassle-free sale at a competitive price.",
    cta: "Sell My Car",
    href: "/sell-your-car",
  },
  {
    number: "02",
    title: "Find Your Dream Car",
    copy: "We specialise in sourcing exclusive cars from top brands. With a trusted supplier network, we'll help you find the perfect vehicle to match your specification, backed by expert guidance for a seamless buying experience.",
    cta: "Source Your Dream Car",
    href: "/services/vehicle-sourcing",
  },
  {
    number: "03",
    title: "Comprehensive Car Warranty",
    copy: "We provide one of the most comprehensive warranties available, covering repairs and replacements for 6,000+ parts and protecting you against unexpected issues and high repair costs.",
    cta: "Find Out More",
    href: "/services/warranty",
  },
];

export default function ServiceOfferings() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-6 lg:grid-cols-3">
        {OFFERINGS.map((offering) => (
          <div
            key={offering.number}
            className="group flex flex-col rounded-lg border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-rosso/50"
          >
            <span className="mb-6 flex size-11 items-center justify-center rounded-full border-2 border-rosso font-display text-base text-rosso">
              {offering.number}
            </span>
            <h3 className="font-display mb-3 text-xl text-bianco">
              {offering.title}
            </h3>
            <p className="mb-6 flex-1 font-serif text-sm leading-relaxed text-muted">
              {offering.copy}
            </p>
            <Link
              href={offering.href}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-rosso"
            >
              {offering.cta}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
