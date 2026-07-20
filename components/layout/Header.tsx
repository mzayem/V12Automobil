"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LEFT, NAV_RIGHT } from "@/lib/data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background">
      <div className="mx-auto flex h-22 max-w-7xl items-center justify-between px-6">
        {/* Left Navigation */}
        <NavigationMenu className="hidden flex-1 justify-start md:flex">
          <NavigationMenuList className="gap-2">
            {NAV_LEFT.map((item) => (
              <NavigationMenuItem key={item.href} className="">
                <NavigationMenuLink
                  render={<Link href={item.href} />}
                  className={navigationMenuTriggerStyle()}
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Logo */}
        <Link
          href="/"
          aria-label="V12 Automobil — home"
          className="shrink-0 px-8"
        >
          <Image
            src="/images/logo.png"
            alt="V12 Automobil"
            width={150}
            height={150}
          />
        </Link>

        {/* Right Navigation */}
        <NavigationMenu className="hidden flex-1 justify-end md:flex">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem key="/sell-your-car">
              <NavigationMenuLink
                render={<Link href="/sell-your-car" />}
                className={navigationMenuTriggerStyle()}
              >
                Sell Your Car
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem key="/about-us">
              <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
              <NavigationMenuContent className="rounded-lg">
                <ul className="w-96">
                  <ListItem href="/team" title="The Team" />
                  <ListItem href="/about-us" title="Why V12" />
                  <ListItem href="/history-of-v12" title="The History of V12" />
                  <ListItem href="/history-of-v12" title="Previously Sold" />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="ml-auto flex flex-col gap-1.5 p-2 md:hidden"
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

      {/* Mobile Navigation */}
      {open && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-4 border-t border-white/10 bg-black px-6 py-6 md:hidden"
        >
          {[...NAV_LEFT, ...NAV_RIGHT].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="text-bianco transition-colors hover:text-rosso"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function ListItem({
  title,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="rounded-lg p-3 text-bianco transition-all duration-200 hover:bg-white/10 hover:text-rosso">
              <div className="mb-1 text-sm font-medium leading-none">
                {title}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}
