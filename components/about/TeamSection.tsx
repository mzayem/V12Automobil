import { TEAM } from "@/lib/data";
import TeamMemberCard from "@/components/about/TeamMemberCard";

export default function TeamSection() {
  return (
    <section className="mx-auto max-w-6xl border-t border-white/10 px-6 py-24">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="eyebrow mb-3">The Team</p>
        <h2 className="font-display text-4xl text-bianco sm:text-5xl">
          <span className="text-verde">Meet</span> V12
          <span className="text-rosso"> Team</span>
        </h2>
        <p className="mt-5 font-serif text-lg leading-relaxed text-bianco/85">
          Our people are at the heart of everything we do. Combining industry
          expertise with a passion for automotive excellence, the V12 Automobil
          team is here to help every step of the way.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-3">
        {TEAM.map((member) => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
