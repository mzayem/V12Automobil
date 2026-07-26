import { Mail, Phone } from "lucide-react";
import { TEAM } from "@/lib/data";

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
          <div
            key={member.name}
            className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-rosso/50"
          >
            <div className="relative flex aspect-4/5 items-center justify-center bg-linear-to-br from-white/10 to-transparent">
              <span className="font-display text-6xl text-rosso">
                {member.name[0]}
              </span>
              <span className="absolute bottom-4 left-0 right-0 text-center font-serif text-xs uppercase tracking-[0.15em] text-bianco/40">
                Photo placeholder
              </span>
            </div>

            <div className="p-6">
              <h3 className="font-display text-xl text-bianco">
                {member.name}
              </h3>
              <p className="mt-1 mb-4 font-serif text-xs font-bold uppercase tracking-[0.15em] text-rosso">
                {member.role}
              </p>
              <div className="space-y-2 font-serif text-sm text-muted">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2.5 transition-colors hover:text-rosso"
                >
                  <Mail className="size-4 shrink-0 text-rosso" />
                  {member.email}
                </a>
                {member.phone && (
                  <a
                    href={`tel:${member.phone.replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-2.5 transition-colors hover:text-rosso"
                  >
                    <Phone className="size-4 shrink-0 text-rosso" />
                    {member.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
