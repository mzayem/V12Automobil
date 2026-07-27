import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FINANCE_OPTIONS } from "@/lib/data";

export default function OtherFinanceOptions({
  excludeHref,
}: {
  excludeHref: string;
}) {
  const options = FINANCE_OPTIONS.filter(
    (option) => option.href !== excludeHref,
  );

  return (
    <section className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
      <div className="mx-auto mb-12 max-w-xl text-center">
        <h2 className="font-display text-2xl text-bianco sm:text-3xl">
          Other finance options available
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {options.map((option) => (
          <div
            key={option.href}
            className="group flex flex-col gap-3.5 rounded-lg border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-rosso/50"
          >
            <h4 className="font-display tracking-wider text-base text-bianco">
              {option.label}
            </h4>
            <p className="flex-1 font-serif text-sm leading-relaxed text-muted">
              {option.description}
            </p>
            <Link
              href={option.href}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-rosso"
            >
              Find Out More
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
