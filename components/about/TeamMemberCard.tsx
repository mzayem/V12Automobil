"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import type { TeamMember } from "@/lib/data";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/SocialIcons";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      content: <FacebookIcon className="size-4" />,
    });
  }
  if (member.instagram) {
    actions.push({
      key: "instagram",
      label: "Instagram",
      href: member.instagram,
      content: <InstagramIcon className="size-4" />,
    });
  }
  if (member.linkedin) {
    actions.push({
      key: "linkedin",
      label: "LinkedIn",
      href: member.linkedin,
      content: <LinkedinIcon className="size-4" />,
    });
  }

  return actions;
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const [open, setOpen] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const actions = getContactActions(member);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="group overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-rosso/50">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View ${member.name}'s profile`}
          className="relative flex aspect-4/5 w-full cursor-pointer items-center justify-center overflow-hidden bg-linear-to-br from-white/10 to-transparent"
        >
          {member.imageSrc ? (
            <Image
              src={member.imageSrc}
              alt={member.name}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="font-display text-6xl text-rosso">
              {member.name[0]}
            </span>
          )}
        </button>

        <div className="flex items-center justify-between gap-3 p-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="cursor-pointer text-left"
          >
            <h3 className="font-display text-xl text-bianco transition-colors group-hover:text-rosso">
              {member.name}
            </h3>
            <p className="mt-1 font-serif text-xs font-bold uppercase tracking-[0.15em] text-rosso">
              {member.role}
            </p>
          </button>

          <div className="flex shrink-0 gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-track]:bg-transparent">
            {actions.map((action) => {
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

      <DialogContent
        initialFocus={headingRef}
        className="flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden p-0 sm:max-w-4xl md:flex-row"
      >
        <div className="relative aspect-4/5 w-full shrink-0 md:aspect-auto md:w-[42%]">
          {member.imageSrc ? (
            <Image
              src={member.imageSrc}
              alt={member.name}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full min-h-80 items-center justify-center bg-linear-to-br from-white/10 to-transparent">
              <span className="font-display text-7xl text-rosso">
                {member.name[0]}
              </span>
            </div>
          )}
        </div>

        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col p-8 sm:p-10">
            <p className="eyebrow mb-2">{member.role}</p>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-3xl text-bianco outline-none sm:text-4xl"
            >
              {member.name}
            </h2>
            <span className="mt-4 mb-6 block h-px w-16 bg-rosso" />

            {member.description ? (
              <p className="font-serif text-base leading-relaxed text-bianco/85">
                {member.description}
              </p>
            ) : (
              <p className="font-serif text-base italic leading-relaxed text-muted">
                Full bio coming soon.
              </p>
            )}

            {actions.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                {actions.map((action) => {
                  const isExternal = action.href.startsWith("http");
                  return (
                    <a
                      key={action.key}
                      href={action.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 font-serif text-sm text-bianco/80 transition-colors hover:border-rosso hover:text-rosso"
                    >
                      {action.content}
                      {action.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
