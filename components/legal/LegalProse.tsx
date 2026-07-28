export function LegalIntroNote({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 border-l-2 border-rosso bg-white/5 p-6 font-serif text-base leading-relaxed text-bianco/85">
      {children}
    </div>
  );
}

export function LegalNum({ children }: { children: React.ReactNode }) {
  return <span className="mr-3 text-lg font-bold text-rosso">{children}.</span>;
}

export function LegalContactCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-lg border border-white/10 bg-white/5 p-8">
      {children}
    </div>
  );
}

export default function LegalProse({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        mx-auto max-w-3xl px-6 pb-24
        [&_h2]:font-display [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:text-bianco [&_h2]:first:mt-0
        [&_h3]:font-display [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-widest [&_h3]:text-bianco
        [&_p]:mb-4 [&_p]:font-serif [&_p]:text-[15.5px] [&_p]:leading-relaxed [&_p]:text-muted
        [&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2
        [&_li]:font-serif [&_li]:text-[15.5px] [&_li]:leading-relaxed [&_li]:text-muted
        [&_strong]:font-semibold [&_strong]:text-bianco
        [&_a]:text-rosso [&_a]:underline [&_a]:underline-offset-2
        [&_hr]:my-14 [&_hr]:border-white/10
        [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
        [&_th]:bg-white/10 [&_th]:p-3 [&_th]:text-left [&_th]:font-display [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-bianco
        [&_td]:border-b [&_td]:border-white/10 [&_td]:p-3 [&_td]:align-top [&_td]:font-serif [&_td]:text-sm [&_td]:text-muted
      "
    >
      {children}
    </div>
  );
}
