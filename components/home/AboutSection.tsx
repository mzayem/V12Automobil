import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

export default function AboutSection() {
  return (
    <section className="mx-auto max-w-4xl px-6 pt-24 text-center">
      <FadeIn>
        <p className="font-display text-3xl text-primary eyebrow mb-3">
          We Are
        </p>
        <h2 className="font-display mb-8 text-4xl text-bianco sm:text-5xl">
          More Than Just Cars
        </h2>
      </FadeIn>
      <StaggerGroup className="space-y-5 font-serif text-lg leading-relaxed text-bianco/85">
        <StaggerItem>
          <p>
            V12 Automobil is a specialist dealer with an uncompromising passion
            for the machines that defined an era. Every car we present has been
            driven, assessed, and approved by people who genuinely care.
          </p>
        </StaggerItem>
        <StaggerItem>
          <p>
            From Italian exotica to British icons and German precision — our
            collection spans the finest driving machines of the 20th and 21st
            centuries, each sold with full transparency and honest provenance.
          </p>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
