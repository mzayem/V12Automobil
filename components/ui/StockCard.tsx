import Image from "next/image";
import Link from "next/link";
import type { StockCar } from "@/lib/data";

export default function StockCard({ car }: { car: StockCar }) {
  return (
    <article className="group">
      <Link
        href={`/inventory/${car.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-panel"
      >
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <p className="mt-5 font-serif text-xs italic text-muted">{car.category}</p>
      <h3 className="heading-display mt-1 text-xl text-bianco">{car.name}</h3>

      <Link href={`/inventory/${car.slug}`} className="btn-rosso mt-4">
        Read more
      </Link>
    </article>
  );
}
