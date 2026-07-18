export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-end gap-1.5 ${className}`}>
      <span className="font-display text-3xl font-semibold leading-none tracking-tight text-bianco">
        V12
      </span>
      <span className="flex flex-col gap-[3px] pb-0.5">
        <span className="font-display text-[8px] font-medium uppercase tracking-[0.3em] leading-none text-muted">
          Automobil
        </span>
        <span className="flex h-[3px] w-full overflow-hidden">
          <span className="w-1/3 bg-verde" />
          <span className="w-1/3 bg-bianco" />
          <span className="w-1/3 bg-rosso" />
        </span>
      </span>
    </span>
  );
}
