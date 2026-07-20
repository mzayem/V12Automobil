import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-155 items-center overflow-hidden lg:min-h-170">
      {/* Background image — drop your hero shot in /public/images/hero.jpg */}
      <Image
        src="/images/hero.jpeg"
        alt="A line-up of supercars on a cobbled London mews street at dusk"
        fill
        priority
        className="object-cover object-center"
      />
      {/* Left-to-right scrim so the headline stays readable */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <h1 className="font-display text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
          <span className="block text-amber-50">Driven by</span>
          <span className="block text-rosso">Passion.</span>
          <span className="mt-6 block text-bianco">Driven by</span>
          <span className="block text-verde">Trust.</span>
        </h1>

        <p className="mt-8 flex items-center gap-4 font-serif text-lg italic text-bianco/90">
          <span className="hidden h-px w-14 bg-rosso sm:block" aria-hidden />
          Carefully selected, personally assessed, passionately sold.
        </p>
      </div>
    </section>
  );
}
