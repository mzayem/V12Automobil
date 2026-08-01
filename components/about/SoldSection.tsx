import { Video } from "lucide-react";

const PLACEHOLDER_COUNT = 8;

export default function SoldSection() {
  return (
    <section className="mx-auto max-w-7xl border-t border-white/10 px-6 py-24">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-rosso/50"
          >
            <div className="relative flex aspect-4/3 items-center justify-center bg-linear-to-br from-white/10 to-transparent text-xs uppercase tracking-widest text-bianco/40">
              <span className="absolute left-3 top-3 rounded-full bg-rosso px-3 py-1 font-display text-[11px] font-bold uppercase tracking-widest text-white">
                Sold
              </span>
              Photo placeholder
            </div>
            <div className="flex items-center justify-between gap-2 p-4">
              <h3 className="font-display text-sm text-bianco">
                [Car Make &amp; Model]
              </h3>
              <span className="flex shrink-0 items-center gap-1.5 font-serif text-xs text-muted">
                <Video className="size-3.5" />
                Video
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-11 max-w-2xl border-t border-white/10 pt-6 text-center font-serif text-sm text-muted">
        <p>
          Each card here is a placeholder — swap in the photo and name of every
          car once it&apos;s sold. The &quot;Video&quot; tag is ready to link
          out to that car&apos;s individual YouTube walkaround once one exists
          (a nice SEO boost per the brief, not urgent to fill in now).
        </p>
      </div>
    </section>
  );
}
