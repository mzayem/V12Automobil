"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { NAV_LEFT, NAV_RIGHT } from "@/lib/data";

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`font-serif text-[15px] transition-colors hover:text-rosso ${
        active ? "text-rosso" : "text-bianco"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black">
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-6">
        {/* Left nav (desktop) */}
        <nav className="hidden flex-1 items-center gap-8 md:flex">
          {NAV_LEFT.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Centre logo */}
        <Link href="/" aria-label="V12 Automobil — home" className="shrink-0">
          <Logo />
        </Link>

        {/* Right nav (desktop) */}
        <nav className="hidden flex-1 items-center justify-end gap-8 md:flex">
          {NAV_RIGHT.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-bianco" />
          <span className="block h-0.5 w-6 bg-bianco" />
          <span className="block h-0.5 w-6 bg-bianco" />
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-4 border-t border-white/10 bg-black px-6 py-6 md:hidden"
        >
          {[...NAV_LEFT, ...NAV_RIGHT].map((item) => (
            <NavLink key={item.href} {...item} onClick={close} />
          ))}
        </nav>
      )}
    </header>
  );
}
