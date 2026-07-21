import Image from "next/image";
import Link from "next/link";
import { DealerKitVehicle } from "@/public/type";

export default function StockCard({ car }: { car: DealerKitVehicle }) {
  return (
    <article className="group">
      <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-white/5">
        <Link
          href={`/inventory/${car.id}`}
          className="relative block h-full w-full"
        >
          <Image
            src={car.media.images[0].url}
            alt={car.vehicle.manufacturer + " " + car.vehicle.model}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Bottom gradient for price legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/70 to-transparent"
        />
        <p className="pointer-events-none absolute bottom-3 left-4 font-display text-lg tracking-wide text-bianco">
          £ {car.prices.cash.amount.toLocaleString()}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-b border-white/10 pb-4">
        <p className="font-serif text-sm text-muted">
          {car.vehicle.year} &middot; {car.vehicle.mileage.toLocaleString()} mi
        </p>
        <p className="font-serif text-sm font-bold text-muted uppercase tracking-wide">
          {car.vehicle.body_type}
        </p>
      </div>

      <Link href={`/inventory/${car.id}`} className="block">
        <h3 className="font-display mt-3 text-xl text-bianco transition-colors group-hover:text-rosso">
          {car.vehicle.manufacturer} {car.vehicle.model}
        </h3>
      </Link>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 font-serif text-sm text-muted">
        <div className="flex justify-between gap-2">
          <dt className="text-muted/70">Colour:</dt>
          <dd className="font-bold">{car.vehicle.colour}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-muted/70">Transmission:</dt>
          <dd className="font-bold">{car.vehicle.transmission}</dd>
        </div>
      </dl>

      <Link
        href={`/inventory/${car.id}`}
        className="group/btn mt-5 inline-flex items-center gap-2 border border-rosso px-5 py-2 font-display text-xs uppercase tracking-[0.2em] text-rosso transition-colors hover:bg-rosso hover:text-white"
      >
        Read more
        <span className="transition-transform group-hover/btn:translate-x-1">
          &rarr;
        </span>
      </Link>
    </article>
  );
}
