import StockCard from "@/components/ui/StockCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getStocks } from "@/actions/get-stocks";

export default async function StockCarousel() {
  const stock = await getStocks();
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <Carousel opts={{ align: "start" }}>
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-display font-bold text-3xl text-bianco sm:text-4xl">
            New Into Stock
          </h2>
          <div className="hidden gap-3 sm:flex">
            <CarouselNav />
          </div>
        </div>

        <CarouselContent className="-ml-6">
          {stock.data.map((car) => (
            <CarouselItem
              key={car.id}
              className="pl-6 sm:basis-1/2 lg:basis-1/3"
            >
              <StockCard car={car} />
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Mobile controls */}
        <div className="mt-8 flex justify-center gap-3 sm:hidden">
          <CarouselNav />
        </div>
      </Carousel>
    </section>
  );
}

function CarouselNav() {
  return (
    <>
      <CarouselPrevious className="static size-10 translate-y-0 border-white/15 bg-transparent text-bianco hover:border-rosso hover:bg-white/10 hover:text-rosso disabled:opacity-30" />
      <CarouselNext className="static size-10 translate-y-0 border-white/15 bg-transparent text-bianco hover:border-rosso hover:bg-white/10 hover:text-rosso disabled:opacity-30" />
    </>
  );
}
