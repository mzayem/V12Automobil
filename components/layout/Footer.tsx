import Link from "next/link";
import {
  FOOTER_QUICK_LINKS,
  FOOTER_SERVICES,
  FOOTER_SOCIALS,
  OPENING_HOURS,
  CONTACT,
} from "@/lib/data";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-1 font-display text-sm font-semibold uppercase tracking-[0.3em] text-bianco">
        {title}
      </h3>
      <span className="mb-5 block h-px w-10 bg-rosso" />
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-rosso"
            >
              <span className="h-px w-3 bg-white/20 transition-all group-hover:w-4 group-hover:bg-rosso" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-background">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-160 -translate-x-1/2 rounded-full bg-rosso/10 blur-3xl"
      />

      {/* Tricolore divider */}
      <div className="flex h-1">
        <span className="flex-1 bg-verde" />
        <span className="flex-1 bg-bianco" />
        <span className="flex-1 bg-rosso" />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 divide-white/5 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:divide-x">
        {/* Brand */}
        <div className="lg:pr-10">
          <Image
            src="/images/v12logo.png"
            alt="V12 Automobil"
            width={180}
            height={180}
            className="mb-4 -ml-2"
          />
          <p className="mb-6 max-w-xs font-serif text-sm italic leading-relaxed text-bianco/80">
            Specialist classic and prestige cars. Based in [Your Town],
            connecting the finest machines with the people who appreciate them
            most.
          </p>
          <ul className="space-y-3 text-sm text-muted">
            <li>
              <a
                href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-rosso"
              >
                <Phone className="size-4 shrink-0 text-rosso" />
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-rosso"
              >
                <Mail className="size-4 shrink-0 text-rosso" />
                {CONTACT.email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-rosso" />
              <span>{CONTACT.address}</span>
            </li>
          </ul>

          {/* Socials */}
          <div className="mt-6 flex gap-3">
            {FOOTER_SOCIALS.map((social) => {
              return (
                <Tooltip key={social.Id}>
                  <TooltipTrigger
                    render={
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      />
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-xs font-semibold text-muted transition-all hover:-translate-y-0.5 hover:border-rosso hover:text-rosso"
                  >
                    {social.label[0]}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{social.label}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>

        <div className="lg:pl-10">
          <FooterColumn title="Quick Links" links={FOOTER_QUICK_LINKS} />
        </div>
        <div className="lg:pl-10">
          <FooterColumn title="Services" links={FOOTER_SERVICES} />
        </div>

        {/* Opening hours */}
        <div className="lg:pl-10">
          <h3 className="mb-1 font-display text-sm font-semibold uppercase tracking-[0.3em] text-bianco">
            Opening Hours
          </h3>
          <span className="mb-5 block h-px w-10 bg-rosso" />
          <ul className="space-y-3 text-sm text-muted">
            {OPENING_HOURS.map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-rosso" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {year} V12 Automobil Ltd. All rights reserved. Created by{" "}
            <a href="#" className="hover:text-rosso">
              Genelli Tech
            </a>
          </p>
          <nav className="flex gap-6">
            <Link href="#" className="hover:text-rosso">
              Terms &amp; Conditions
            </Link>
            <Link href="#" className="hover:text-rosso">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-rosso">
              Cookie Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
