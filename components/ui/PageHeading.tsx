import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PageHeading({
  eyebrow,
  title,
  intro,
  bgSrc,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  bgSrc?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        bgSrc && "flex min-h-105 items-center justify-center",
      )}
    >
      {bgSrc && (
        <>
          <Image
            src={bgSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-night to-night/40" />
        </>
      )}

      <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-24 text-center">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h1 className="font-display text-4xl text-bianco sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 font-serif text-lg leading-relaxed text-bianco/85">
            {intro}
          </p>
        )}
      </div>
    </div>
  );
}
