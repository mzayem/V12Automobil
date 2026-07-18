import Link from "next/link";
import Logo from "@/components/ui/Logo";
import {
  FOOTER_QUICK_LINKS,
  FOOTER_SERVICES,
  OPENING_HOURS,
  CONTACT,
} from "@/lib/data";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-1 font-display text-xs font-semibold uppercase tracking-[0.3em] text-bianco">
        {title}
      </h3>
      <span className="mb-5 block h-px w-full bg-rosso/60" />
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-rosso"
            >
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
    <footer className="bg-black">
      {/* Tricolore divider */}
      <div className="tricolore">
        <span className="bg-verde" />
        <span className="bg-bianco" />
        <span className="bg-rosso" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Logo className="mb-6" />
          <p className="mb-6 font-serif text-sm italic leading-relaxed text-muted">
            Specialist classic and prestige cars. Based in [Your Town],
            connecting the finest machines with the people who appreciate them
            most.
          </p>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="hover:text-rosso">
                {CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-rosso">
                {CONTACT.email}
              </a>
            </li>
            <li>{CONTACT.address}</li>
          </ul>

          {/* Socials */}
          <div className="mt-6 flex gap-3">
            {["Instagram", "Facebook", "YouTube"].map((name) => (
              <a
                key={name}
                href="#"
                aria-label={name}
                className="flex h-9 w-9 items-center justify-center border border-white/15 text-xs font-semibold text-muted transition-colors hover:border-rosso hover:text-rosso"
              >
                {name[0]}
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Quick Links" links={FOOTER_QUICK_LINKS} />
        <FooterColumn title="Services" links={FOOTER_SERVICES} />

        {/* Opening hours */}
        <div>
          <h3 className="mb-1 font-display text-xs font-semibold uppercase tracking-[0.3em] text-bianco">
            Opening Hours
          </h3>
          <span className="mb-5 block h-px w-full bg-rosso/60" />
          <ul className="space-y-3 text-sm text-muted">
            {OPENING_HOURS.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
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
