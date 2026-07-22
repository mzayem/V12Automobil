"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { VehicleImage } from "@/public/type";
import { Skeleton } from "@/components/ui/skeleton";
import ImageLightbox from "./ImageLightbox";

export default function VehicleGallery({
  images,
  name,
  children,
}: {
  images: VehicleImage[];
  name: string;
  children?: React.ReactNode;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loadedMain, setLoadedMain] = useState<Record<number, boolean>>({});
  const [loadedThumbs, setLoadedThumbs] = useState<Record<number, boolean>>({});
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const drag = useRef({
    down: false,
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });
  const rafId = useRef<number | null>(null);
  const pendingScrollLeft = useRef<number | null>(null);

  const sorted = [...images].sort((a, b) => a.order - b.order);
  const hasMultiple = sorted.length > 1;

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      const index = api.selectedScrollSnap();
      setCurrent(index);
      thumbRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    };
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current = {
      down: true,
      active: false,
      startX: e.clientX,
      scrollLeft: track.scrollLeft,
      moved: false,
    };
  };

  const flushScrollLeft = () => {
    const track = trackRef.current;
    if (track && pendingScrollLeft.current !== null) {
      track.scrollLeft = pendingScrollLeft.current;
    }
    pendingScrollLeft.current = null;
    rafId.current = null;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const state = drag.current;
    // Ignore plain hover movement — only act while the pointer is actually
    // held down (otherwise this would run using stale startX/scrollLeft left
    // over from the last drag and silently re-scroll the strip).
    if (!track || !state.down) return;

    const delta = e.clientX - state.startX;

    if (!state.active) {
      if (Math.abs(delta) <= 3) return;
      state.active = true;
      state.moved = true;
      track.setPointerCapture(e.pointerId);
    }

    // Batch the scroll update through rAF so rapid pointermove events don't
    // each force a synchronous layout — coalesces to one smooth update per frame.
    pendingScrollLeft.current = state.scrollLeft - delta;
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(flushScrollLeft);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (track?.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
    drag.current.down = false;
    drag.current.active = false;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    if (pendingScrollLeft.current !== null) {
      flushScrollLeft();
    }
  };

  if (sorted.length === 0) {
    return <div className="aspect-4/3 rounded-lg bg-white/5" aria-hidden />;
  }

  return (
    <div className="min-w-0">
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-white/5">
          <Carousel
            setApi={setApi}
            opts={{ loop: hasMultiple }}
            className="h-full"
          >
            <CarouselContent className="ml-0 h-full">
              {sorted.map((image, i) => (
                <CarouselItem key={image.id} className="h-full basis-full pl-0">
                  <button
                    type="button"
                    aria-label={`View photo ${i + 1} full screen`}
                    onClick={() => setLightboxOpen(true)}
                    className="relative block h-full w-full cursor-zoom-in"
                  >
                    {!loadedMain[i] && (
                      <Skeleton className="absolute inset-0 rounded-none bg-white/10" />
                    )}
                    <Image
                      src={image.url}
                      alt={`${name} — photo ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className={cn(
                        "object-cover transition-opacity duration-300",
                        loadedMain[i] ? "opacity-100" : "opacity-0",
                      )}
                      priority={i === 0}
                      onLoad={() =>
                        setLoadedMain((prev) => ({ ...prev, [i]: true }))
                      }
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {hasMultiple && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => api?.scrollPrev()}
                className="absolute top-1/2 left-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-night/70 text-bianco backdrop-blur-sm transition-colors hover:bg-rosso"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => api?.scrollNext()}
                className="absolute top-1/2 right-3 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-night/70 text-bianco backdrop-blur-sm transition-colors hover:bg-rosso"
              >
                <ChevronRight className="size-5" />
              </button>
              <div className="absolute bottom-3 right-3 rounded-full bg-night/70 px-2.5 py-1 font-serif text-xs text-bianco backdrop-blur-sm">
                {current + 1} / {sorted.length}
              </div>
            </>
          )}
        </div>
        {children}
      </div>
      {hasMultiple && (
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="no-scrollbar mt-10 flex cursor-grab gap-2 overflow-x-auto pb-1 select-none active:cursor-grabbing"
        >
          {sorted.map((image, i) => (
            <button
              key={image.id}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              onClick={() => {
                if (drag.current.moved) return;
                api?.scrollTo(i);
              }}
              onDragStart={(e) => e.preventDefault()}
              aria-label={`View photo ${i + 1}`}
              className={cn(
                "relative h-28 w-40 shrink-0 overflow-hidden rounded-md border-2 transition-colors",
                i === current
                  ? "border-rosso"
                  : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              {!loadedThumbs[i] && (
                <Skeleton className="absolute inset-0 rounded-none bg-white/10" />
              )}
              <Image
                src={image.url}
                alt=""
                fill
                sizes="100px"
                className={cn(
                  "object-cover",
                  loadedThumbs[i] ? "opacity-100" : "opacity-0",
                )}
                draggable={false}
                onLoad={() =>
                  setLoadedThumbs((prev) => ({ ...prev, [i]: true }))
                }
              />
            </button>
          ))}
        </div>
      )}

      <ImageLightbox
        images={sorted}
        name={name}
        open={lightboxOpen}
        index={current}
        onOpenChange={setLightboxOpen}
        onIndexChange={(i) => api?.scrollTo(i)}
      />
    </div>
  );
}
