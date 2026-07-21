import Image from "next/image";
import Link from "next/link";
import type { StockCar } from "@/lib/data";

export default function StockCard({ car }: { car: StockCar }) {
  return (
    <article className="group">
      <Link
        href={`/inventory/${car.slug}`}
        className="relative block aspect-4/5 overflow-hidden bg-panel"
      >
        <Image
          src={car.images[0]}
          alt={car.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="flex items-between mt-5 justify-between">
        <p className=" font-serif text-sm text-muted">
          YEAR: <span className="font-bold ">{car.year}</span>
        </p>
        <p className=" font-serif font-bold text-muted">{car.price}</p>
      </div>

      <h3 className="font-display mt-1 text-xl text-bianco">{car.name}</h3>

      <p className=" font-serif text-sm text-muted">
        Colour: <span className="font-bold ">{car.colour}</span>
      </p>
      <p className="mt-5font-serif text-sm text-muted">
        Milleage: <span className="font-bold ">{car.Mileage}</span>
      </p>

      <Link href={`/inventory/${car.slug}`} className="btn-rosso mt-4">
        Read more
      </Link>
    </article>
  );
}
