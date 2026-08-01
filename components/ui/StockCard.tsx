"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DealerKitVehicle } from "@/public/type";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { REVEAL_EASE } from "@/components/motion/Reveal";

const MAX_CARD_PHOTOS = 10;

export default function StockCard({ car }: { car: DealerKitVehicle }) {
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [index, setIndex] = useState(0);

  const images = [...car.media.images]
    .sort((a, b) => a.order - b.order)
    .slice(0, MAX_CARD_PHOTOS);
  const hasMultiple = images.length > 1;

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  const goNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.6, ease: REVEAL_EASE }}
      className="group"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-white/5">
        <Link
          href={`/inventory/${car.id}`}
          className="relative block h-full w-full"
        >
          {!loaded[index] && (
            <Skeleton className="absolute inset-0 rounded-none bg-white/10" />
          )}
          <Image
            src={images[index].url}
            alt={`${car.vehicle.manufacturer} ${car.vehicle.model} — photo ${index + 1}`}
            fill
            quality={100}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-105",
              loaded[index] ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setLoaded((prev) => ({ ...prev, [index]: true }))}
          />
        </Link>

        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={goPrev}
              className="absolute top-1/2 left-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-night/70 text-bianco opacity-0 backdrop-blur-sm transition-opacity hover:bg-rosso group-hover:opacity-100"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={goNext}
              className="absolute top-1/2 right-3 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-night/70 text-bianco opacity-0 backdrop-blur-sm transition-opacity hover:bg-rosso group-hover:opacity-100"
            >
              <ChevronRight className="size-4" />
            </button>
            <div className="pointer-events-none absolute top-3 right-3 rounded-full bg-night/70 px-2 py-0.5 font-serif text-xs text-bianco backdrop-blur-sm">
              {index + 1} / {images.length}
            </div>
          </>
        )}

        {/* Bottom gradient for price legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/70 to-transparent"
        />
        <p className="pointer-events-none bg-black rounded-full px-4 absolute bottom-3 left-4 font-display text-lg tracking-wide text-bianco">
          £ {car.prices.cash.amount.toLocaleString()}
        </p>
      </div>

      <div className="mt-7 flex items-center justify-between border-b border-white/10 pb-5">
        <p className="font-serif text-sm text-muted">
          {car.vehicle.year} &middot; {car.vehicle.mileage.toLocaleString()} mi
        </p>
        <p className="font-serif text-sm font-bold text-muted uppercase tracking-wide">
          {car.vehicle.body_type}
        </p>
      </div>

      <Link href={`/inventory/${car.id}`} className="block">
        <h3 className="font-display mt-3 text-2xl tracking-wide text-bianco transition-colors group-hover:text-rosso">
          {car.vehicle.manufacturer} {car.vehicle.model}
        </h3>
      </Link>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 font-serif text-sm text-muted">
        <div className="flex justify-between gap-2">
          <dt className="text-muted/70">Colour:</dt>
          <dd className="font-bold">{car.vehicle.colour}</dd>
        </div>
      </dl>

      <Link
        href={`/inventory/${car.id}`}
        className="
        group/btn mt-5 rounded-md inline-flex items-center gap-2 border
        border-rosso px-5 py-2 font-display text-xs uppercase
        tracking-[0.2em] text-rosso transition-colors
        hover:bg-rosso hover:text-white"
      >
        View Car
        <span className="transition-transform group-hover/btn:translate-x-1">
          &rarr;
        </span>
      </Link>
    </motion.article>
  );
}
