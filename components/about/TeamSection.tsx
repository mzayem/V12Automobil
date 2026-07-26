import { Mail, Phone } from "lucide-react";
import { TEAM, type TeamMember } from "@/lib/data";

type ContactAction = {
  key: string;
  label: string;
  href: string;
  content: React.ReactNode;
};

function getContactActions(member: TeamMember): ContactAction[] {
  const actions: ContactAction[] = [];

  if (member.phone) {
    actions.push({
      key: "phone",
      label: member.phone,
      href: `tel:${member.phone.replace(/[^+\d]/g, "")}`,
      content: <Phone className="size-4" />,
    });
  }
  if (member.email) {
    actions.push({
      key: "email",
      label: member.email,
      href: `mailto:${member.email}`,
      content: <Mail className="size-4" />,
    });
  }
  if (member.facebook) {
    actions.push({
      key: "facebook",
      label: "Facebook",
      href: member.facebook,
      content: "F",
    });
  }
  if (member.instagram) {
    actions.push({
      key: "instagram",
      label: "Instagram",
      href: member.instagram,
      content: "I",
    });
  }
  if (member.linkedin) {
    actions.push({
      key: "linkedin",
      label: "LinkedIn",
      href: member.linkedin,
      content: "L",
    });
  }

  return actions;
}

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

            <div className="flex items-center justify-between gap-3 p-6">
              <div>
                <h3 className="font-display text-xl text-bianco">
                  {member.name}
                </h3>
                <p className="mt-1 font-serif text-xs font-bold uppercase tracking-[0.15em] text-rosso">
                  {member.role}
                </p>
              </div>

              <div className="flex shrink-0 gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-track]:bg-transparent">
                {getContactActions(member).map((action) => {
                  const isExternal = action.href.startsWith("http");
                  return (
                    <a
                      key={action.key}
                      href={action.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      aria-label={action.label}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-night text-bianco transition-colors hover:bg-rosso"
                    >
                      {action.content}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
