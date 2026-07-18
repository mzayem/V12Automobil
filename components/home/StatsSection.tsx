import { STATS } from "@/lib/data";

export default function StatsSection() {
  return (
    <section className="mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:grid-cols-3 sm:gap-8">
      {STATS.map((stat) => (
        <div key={stat.label} className="text-center">
          <span className={`mb-8 block h-[5px] w-full ${stat.bar}`} aria-hidden />
          <p className="heading-display text-5xl text-bianco sm:text-6xl">
            {stat.value}
          </p>
          <p className="mt-3 font-serif text-sm uppercase tracking-[0.15em] text-bianco/80">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
}
