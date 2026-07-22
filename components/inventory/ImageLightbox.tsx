"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { VehicleImage } from "@/public/type";

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

export default function ImageLightbox({
  images,
  name,
  open,
  index,
  onOpenChange,
  onIndexChange,
}: {
  images: VehicleImage[];
  name: string;
  open: boolean;
  index: number;
  onOpenChange: (open: boolean) => void;
  onIndexChange: (index: number) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const panRef = useRef({
    down: false,
    dragging: false,
    startX: 0,
    startY: 0,
    panX: 0,
    panY: 0,
  });

  const current = images[index];
  const hasMultiple = images.length > 1;

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const goPrev = () => {
    resetView();
    onIndexChange((index - 1 + images.length) % images.length);
  };

  const goNext = () => {
    resetView();
    onIndexChange((index + 1) % images.length);
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, images.length]);

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));

  const zoomOut = () =>
    setZoom((z) => {
      const next = Math.max(MIN_ZOOM, z - ZOOM_STEP);
      if (next === MIN_ZOOM) setPan({ x: 0, y: 0 });
      return next;
    });

  const toggleZoom = () => {
    if (zoom > 1) {
      resetView();
    } else {
      setZoom(2);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    panRef.current = {
      down: true,
      dragging: false,
      startX: e.clientX,
      startY: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = panRef.current;
    if (!state.down) return;
    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    if (!state.dragging && Math.hypot(dx, dy) <= 3) return;
    state.dragging = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setPan({ x: state.panX + dx, y: state.panY + dy });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    panRef.current.down = false;
  };

  const handleShare = async () => {
    if (!current) return;
    const shareUrl = current.url;

    try {
      if (navigator.share) {
        const canShareFiles =
          typeof navigator.canShare === "function" &&
          (await (async () => {
            try {
              const res = await fetch(shareUrl);
              const blob = await res.blob();
              const file = new File([blob], `${name}.jpg`, { type: blob.type });
              if (navigator.canShare({ files: [file] })) {
                await navigator.share({ files: [file], title: name });
                return true;
              }
              return false;
            } catch {
              return false;
            }
          })());

        if (canShareFiles) return;

        await navigator.share({ title: name, url: shareUrl });
        return;
      }
    } catch {
      // user cancelled the native share sheet — nothing to do.
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    window.location.href = `/api/download-image?url=${encodeURIComponent(
      current.url,
    )}`;
  };

  if (!current) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) resetView();
        onOpenChange(next);
      }}
    >
      <DialogContent
        showClose={false}
        className="flex h-screen w-screen max-w-none translate-x-0 translate-y-0 flex-col rounded-none border-none bg-black/95 p-0 top-0 left-0"
      >
        {/* Top control bar */}
        <div className="relative z-10 flex shrink-0 items-center justify-between gap-4 p-4 sm:p-6">
          <p className="font-serif text-sm text-bianco/70">
            {index + 1} / {images.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Zoom out"
              onClick={zoomOut}
              disabled={zoom <= MIN_ZOOM}
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-bianco transition-colors hover:bg-rosso disabled:pointer-events-none disabled:opacity-30"
            >
              <ZoomOut className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={zoomIn}
              disabled={zoom >= MAX_ZOOM}
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-bianco transition-colors hover:bg-rosso disabled:pointer-events-none disabled:opacity-30"
            >
              <ZoomIn className="size-4" />
            </button>
            <button
              type="button"
              aria-label={copied ? "Link copied" : "Share photo"}
              onClick={handleShare}
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-bianco transition-colors hover:bg-rosso"
            >
              <Share2 className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Download photo"
              onClick={handleDownload}
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-bianco transition-colors hover:bg-rosso"
            >
              <Download className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={() => {
                resetView();
                onOpenChange(false);
              }}
              className="flex size-9 items-center justify-center rounded-full bg-white/10 text-bianco transition-colors hover:bg-rosso"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Image stage */}
        <div
          className={cn(
            "relative flex-1 overflow-hidden",
            zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in",
          )}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onDoubleClick={toggleZoom}
        >
          <div
            className="size-full transition-transform duration-150 ease-out"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            }}
          >
            <Image
              src={current.url}
              alt={`${name} — photo ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain select-none"
              draggable={false}
              priority
            />
          </div>

          {hasMultiple && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={goPrev}
                className="absolute top-1/2 left-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-bianco backdrop-blur-sm transition-colors hover:bg-rosso sm:left-6"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={goNext}
                className="absolute top-1/2 right-3 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-bianco backdrop-blur-sm transition-colors hover:bg-rosso sm:right-6"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
