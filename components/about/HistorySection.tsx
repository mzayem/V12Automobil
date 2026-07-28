import { Play } from "lucide-react";

export default function HistorySection() {
  return (
    <section className="mx-auto max-w-6xl border-t border-white/10 px-6 py-24">
      <div className="flex min-h-[340px] flex-col items-center justify-center gap-4 rounded-lg border border-white/10 bg-linear-to-br from-white/[0.06] to-transparent p-10 text-center">
        <span className="flex size-16 items-center justify-center rounded-full border-2 border-rosso text-rosso">
          <Play className="size-6 fill-rosso" />
        </span>
        <p className="font-display text-sm uppercase tracking-[0.2em] text-rosso">
          Coming Soon
        </p>
        <p className="max-w-md font-serif text-sm text-muted">
          The story of how V12 Automobil started — told by our founder, Josh.
        </p>
      </div>

      <div className="mx-auto mt-9 max-w-2xl border-t border-white/10 pt-7 text-center font-serif text-sm text-muted">
        <p>
          This section will carry the founder&apos;s story in his own words —
          how V12 Automobil began, and the philosophy that still shapes every
          car the team sources and sells today.
        </p>
      </div>
    </section>
  );
}
