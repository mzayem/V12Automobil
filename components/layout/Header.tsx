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
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { CONTACT, FOOTER_SOCIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

type MobileNavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const MOBILE_NAV_ITEMS: MobileNavItem[] = [...NAV_LEFT, ...NAV_RIGHT];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState<string | null>(null);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setOpenMobileItem(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background">
      <div className="mx-auto flex h-22 max-w-7xl items-center justify-between px-6">
        {/* Left Navigation */}
        <NavigationMenu className="hidden flex-1 justify-start md:flex">
          <NavigationMenuList className="gap-2">
            {NAV_LEFT.map((item) => (
              <NavigationMenuItem key={item.href}>
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
        <Link href="/" aria-label="V12 Automobil — home" className="shrink-0">
          <Image
            src="/images/v12logo.png"
            alt="V12 Automobil"
            width={200}
            height={200}
          />
        </Link>

        {/* Right Navigation */}
        <NavigationMenu className="hidden flex-1 justify-end md:flex">
          <NavigationMenuList className="gap-2">
            {NAV_RIGHT.map((item) => (
              <NavigationMenuItem key={item.href}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                    <NavigationMenuContent className="rounded-lg">
                      <ul className="w-96">
                        {item.children.map((child) => (
                          <ListItem
                            key={child.href}
                            href={child.href}
                            title={child.label}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink
                    render={<Link href={item.href} />}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.label}
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <Drawer
          open={open}
          onOpenChange={handleOpenChange}
          swipeDirection="right"
        >
          <Button
            variant="outline"
            size={"icon-lg"}
            className="border-white/15 bg-transparent hover:border-rosso hover:bg-white/10 hover:text-rosso md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => handleOpenChange(!open)}
          >
            <Menu width={22} height={22} />
          </Button>
          <DrawerContent className="ml-auto flex h-full w-[85vw] max-w-xs flex-col rounded-none border-l border-white/10 bg-night sm:max-w-sm">
            {/* Tricolore accent */}
            <div className="flex h-1 shrink-0">
              <span className="flex-1 bg-verde" />
              <span className="flex-1 bg-bianco" />
              <span className="flex-1 bg-rosso" />
            </div>

            <DrawerHeader className="flex shrink-0 flex-row items-center justify-between border-b border-white/10 p-5">
              <DrawerTitle className="font-display text-lg font-semibold uppercase tracking-[0.3em] text-bianco">
                Menu
              </DrawerTitle>
              <DrawerClose
                aria-label="Close menu"
                className="flex size-9 items-center justify-center rounded-full text-bianco/70 transition-colors hover:bg-white/10 hover:text-rosso"
              >
                <X width={18} height={18} />
              </DrawerClose>
            </DrawerHeader>

            <nav
              id="mobile-nav"
              className="flex flex-1 flex-col overflow-y-auto px-2 py-2"
            >
              {MOBILE_NAV_ITEMS.map((item, i) => {
                const hasChildren = !!item.children?.length;
                const index = String(i + 1).padStart(2, "0");

                if (!hasChildren) {
                  return (
                    <DrawerClose
                      key={item.href}
                      render={<Link href={item.href} />}
                      className="group flex items-center gap-4 border-b border-white/5 px-4 py-4 text-left transition-colors last:border-none hover:bg-white/5"
                    >
                      <span className="font-display text-xs text-bianco/30 transition-colors group-hover:text-rosso">
                        {index}
                      </span>
                      <span className="font-display text-xl tracking-wide text-bianco transition-colors group-hover:text-rosso">
                        {item.label}
                      </span>
                    </DrawerClose>
                  );
                }

                const isExpanded = openMobileItem === item.href;

                return (
                  <div
                    key={item.href}
                    className="border-b border-white/5 last:border-none"
                  >
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setOpenMobileItem(isExpanded ? null : item.href)
                      }
                      className="group flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-white/5"
                    >
                      <span className="font-display text-xs text-bianco/30 transition-colors group-hover:text-rosso">
                        {index}
                      </span>
                      <span
                        className={cn(
                          "flex-1 font-display text-xl tracking-wide text-bianco transition-colors group-hover:text-rosso",
                          isExpanded && "text-rosso",
                        )}
                      >
                        {item.label}
                      </span>
                      <ChevronDown
                        width={18}
                        height={18}
                        className={cn(
                          "shrink-0 text-bianco/40 transition-transform duration-300",
                          isExpanded && "rotate-180 text-rosso",
                        )}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isExpanded
                          ? "grid-rows-[1fr] pb-3 opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <ul className="min-h-0 overflow-hidden pl-14 pr-4">
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <DrawerClose
                              render={<Link href={child.href} />}
                              className="block py-2.5 text-sm text-bianco/70 transition-colors hover:text-rosso"
                            >
                              {child.label}
                            </DrawerClose>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="shrink-0 space-y-4 border-t border-white/10 p-5">
              <a
                href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
                className="block text-center font-display text-base tracking-wide text-bianco transition-colors hover:text-rosso"
              >
                {CONTACT.phone}
              </a>
              <div className="flex items-center justify-center gap-3">
                {FOOTER_SOCIALS.map((social) => (
                  <a
                    key={social.Id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center border border-white/15 text-xs font-semibold text-bianco/70 transition-colors hover:border-rosso hover:text-rosso"
                  >
                    {social.label[0]}
                  </a>
                ))}
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
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
            <div className="rounded-lg p-3 text-bianco transition-all duration-200">
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
