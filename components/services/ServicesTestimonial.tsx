import { Star } from "lucide-react";

export default function ServicesTestimonial() {
  return (
    <section className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
      <div className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-white/5 p-10 text-center sm:p-12">
        <div className="mb-5 flex justify-center gap-1 text-rosso">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-5 fill-rosso" />
          ))}
        </div>
        <p className="font-serif text-lg italic leading-relaxed text-bianco/85">
          &ldquo;Sold my car to V12 Automobil — offered a good price, they
          turned up at my home as agreed, car inspected and taken for a quick
          test drive. No haggling on price or time wasting, and finance
          settled efficiently and without fuss. It really was all very
          straightforward, and knowing that I was dealing with a reputable
          organisation was reassuring throughout the whole process.&rdquo;
        </p>
        <p className="mt-6 text-xs uppercase tracking-wide text-muted">
          Anonymous · 18 January 2024
        </p>
      </div>
    </section>
  );
}
