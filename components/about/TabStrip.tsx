import Link from "next/link";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Meet the Team", href: "/meet-the-team" },
  { label: "Why V12 Automobil", href: "/why-v12-automobil" },
  { label: "Our History", href: "/history-of-v12" },
];

export default function TabStrip({ active }: { active: string }) {
  return (
    <nav className="mx-auto flex max-w-2xl flex-wrap justify-center gap-3 pb-24">
      {TABS.map((tab) => {
        const isActive = tab.label === active;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-full border px-6 py-2.5 font-serif text-sm font-semibold transition-colors",
              isActive
                ? "border-rosso bg-rosso text-bianco"
                : "border-white/15 text-bianco/70 hover:border-rosso hover:text-rosso",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
