import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, Mail, Phone } from "lucide-react";
import { getStock } from "@/actions/get-stock";
import VehicleGallery from "@/components/inventory/VehicleGallery";
import ShareButton from "@/components/inventory/ShareButton";
import EnquireDialog from "@/components/inventory/EnquireDialog";
import FinanceQuoteDropdown from "@/components/inventory/FinanceQuoteDropdown";
import SpecAccordionGroup from "@/components/inventory/SpecAccordionGroup";
import ListingComments from "@/components/inventory/ListingComments";
import type { VehicleImage } from "@/public/type";
import StockCarousel from "@/components/home/StockCarousel";
import { getAllStock } from "@/actions/get-stocks";
import { sortStock } from "@/lib/inventory-filters";
import { FadeIn, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

function pickImage(images: VehicleImage[], seed: string) {
  if (images.length === 0) return null;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return images[hash % images.length];
}

interface InventoryDetailParams {
  params: Promise<{ stockId: string }>;
}

async function loadStock(stockId: string) {
  try {
    const { data } = await getStock(stockId);
    return data;
  } catch {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: InventoryDetailParams): Promise<Metadata> {
  const { stockId } = await params;
  const car = await loadStock(stockId);
  const title = `${car.vehicle.manufacturer} ${car.vehicle.model} | V12 Automobil`;

  return {
    title,
    description:
      car.advertising.attention_grabber ||
      `${car.vehicle.year} ${car.vehicle.manufacturer} ${car.vehicle.model} for sale at V12 Automobil.`,
  };
}

function SpecRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="font-serif text-sm text-muted uppercase tracking-wide">
        {label}
      </dt>
      <dd className="text-sm text-bianco">{value}</dd>
    </div>
  );
}

export default async function InventoryDetailPage({
  params,
}: InventoryDetailParams) {
  const { stockId } = await params;
  const car = await loadStock(stockId);
  const latestStock = sortStock(await getAllStock(), "latest").filter(
    (item) => item.id !== car.id,
  );

  const { vehicle, prices, advertising, media, location, links } = car;

  const backgroundImage = pickImage(media.images, car.id);

  const title = `${vehicle.manufacturer} ${vehicle.model}`;
  const subtitle = [vehicle.trim].filter(Boolean).join(" · ");

  const engineDisplay = [
    vehicle.engine_size ? `${(vehicle.engine_size / 1000).toFixed(1)}L` : null,
    vehicle.cylinders ? `V${vehicle.cylinders}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  const overviewSpecs: { label: string; value?: string | number | null }[] = [
    { label: "Colour", value: vehicle.colour },
    { label: "Year", value: vehicle.year },
    {
      label: "Mileage",
      value: vehicle.mileage
        ? `${vehicle.mileage.toLocaleString()} miles`
        : undefined,
    },
    { label: "Engine", value: engineDisplay || undefined },
    { label: "Transmission", value: vehicle.transmission_type },
    { label: "Body Style", value: vehicle.body_type },
    { label: "Fuel", value: vehicle.fuel_type },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
      <Link
        href="/inventory"
        className="inline-flex items-center gap-2 font-serif text-sm text-muted transition-colors hover:text-rosso"
      >
        <ArrowLeft className="size-4" />
        Back to Inventory
      </Link>

      <div className="mt-6">
        <VehicleGallery images={media.images} name={title}>
          <FadeIn amount={0} y={20}>
            {subtitle && (
              <p className="font-serif text-sm uppercase tracking-[0.3em] text-muted">
                {subtitle}
              </p>
            )}
            <h1 className="font-display mt-1 text-3xl text-bianco tracking-widest sm:text-4xl">
              {title}
            </h1>

            {advertising.attention_grabber && (
              <p className="mt-3 font-serif text-base italic leading-relaxed text-bianco/85">
                {advertising.attention_grabber}
              </p>
            )}

            <p className="font-display mt-5 text-3xl text-rosso tracking-widest">
              £{prices.cash.amount.toLocaleString()}
            </p>
            {prices.monthly?.amount ? (
              <FinanceQuoteDropdown monthly={prices.monthly} />
            ) : null}

            <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {overviewSpecs.map((s) => (
                <SpecRow key={s.label} label={s.label} value={s.value} />
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex gap-2 items-between">
                <EnquireDialog stockListingId={car.id} className="flex-1" />
                <ShareButton title={title} className="flex-1" />
              </div>
              {links?.silent_salesman && (
                <a
                  href={links.silent_salesman}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-serif text-sm text-muted transition-colors hover:text-rosso"
                >
                  <FileText className="size-4" />
                  Download Brochure
                </a>
              )}
            </div>
          </FadeIn>
        </VehicleGallery>
      </div>

      {advertising.comments && (
        <section className="relative mt-16 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen overflow-hidden bg-night">
          {backgroundImage && (
            <Image
              src={backgroundImage.url}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-right"
              aria-hidden
            />
          )}
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-12">
            <FadeIn className="max-w-3xl">
              <h2 className="font-display text-2xl text-bianco tracking-widest">
                Key Information
              </h2>
              <span className="mt-2 mb-6 block h-px w-16 bg-rosso" />
              <ListingComments comments={advertising.comments} />
            </FadeIn>
          </div>
        </section>
      )}

      <section className="mt-16">
        <FadeIn>
          <h2 className="font-display tracking-widest text-2xl text-bianco">
            Technical Specification
          </h2>
          <span className="mt-2 mb-8 block h-px w-16 bg-rosso" />
        </FadeIn>

        <StaggerGroup className="grid gap-10 sm:grid-cols-3">
          <StaggerItem>
            <SpecAccordionGroup
              title="Engine &amp; Drivetrain"
              rows={[
                {
                  label: "Engine Capacity",
                  value: vehicle.engine_size
                    ? `${vehicle.engine_size.toLocaleString()} cc`
                    : undefined,
                },
                { label: "Cylinders", value: vehicle.cylinders },
                { label: "Fuel Type", value: vehicle.fuel_type },
                { label: "Transmission", value: vehicle.transmission_type },
                { label: "Drivetrain", value: vehicle.drive_train },
              ]}
            />
          </StaggerItem>
          <StaggerItem>
            <SpecAccordionGroup
              title="Dimensions"
              rows={[
                {
                  label: "Length",
                  value: vehicle.length_mm
                    ? `${(vehicle.length_mm / 1000).toFixed(2)} m`
                    : undefined,
                },
                {
                  label: "Width",
                  value: vehicle.width_mm
                    ? `${(vehicle.width_mm / 1000).toFixed(2)} m`
                    : undefined,
                },
                {
                  label: "Height",
                  value: vehicle.height_mm
                    ? `${(vehicle.height_mm / 1000).toFixed(2)} m`
                    : undefined,
                },
                {
                  label: "Wheelbase",
                  value: vehicle.wheelbase_mm
                    ? `${(vehicle.wheelbase_mm / 1000).toFixed(2)} m`
                    : undefined,
                },
                {
                  label: "Fuel Tank",
                  value: vehicle.fuel_tank_capacity_litres
                    ? `${vehicle.fuel_tank_capacity_litres} L`
                    : undefined,
                },
              ]}
            />
          </StaggerItem>
          <StaggerItem>
            <SpecAccordionGroup
              title="Ownership"
              rows={[
                // { label: "Registration", value: vehicle.registration },
                { label: "Reg. Date", value: vehicle.registration_date },
                { label: "Previous Keepers", value: car.previous_keepers },
                // { label: "Doors", value: vehicle.number_of_doors },
                // { label: "Seats", value: vehicle.number_of_seats },
              ]}
            />
          </StaggerItem>
        </StaggerGroup>
      </section>

      <section className="mt-16 border-t border-white/10 pt-8">
        <FadeIn>
          <h2 className="font-display tracking-widest text-2xl text-bianco">
            Vehicle Location
          </h2>
          <span className="mt-2 mb-8 block h-px w-16 bg-rosso" />

          <div className="flex flex-col gap-3 font-serif text-lg text-muted sm:flex-row sm:items-center sm:gap-8">
            <span className="font-bold text-lg text-bianco">
              {location.name}
            </span>
            {location.telephone && (
              <a
                href={`tel:${location.telephone.replace(/[^+\d]/g, "")}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-rosso"
              >
                <Phone className="size-4" />
                {location.telephone}
              </a>
            )}
            {location.email && (
              <a
                href={`mailto:${location.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-rosso"
              >
                <Mail className="size-4" />
                {location.email}
              </a>
            )}
          </div>
          <p className="mt-6 font-serif text-md leading-relaxed text-muted/70">
            While we make every effort to ensure the accuracy of the information
            and specification listed for this vehicle, details are provided in
            good faith and should be verified before purchase. Please contact us
            to confirm specification, history and availability.
          </p>
        </FadeIn>
      </section>
      <section className="mt-16 border-t border-white/10 pt-8">
        <StockCarousel stock={latestStock.slice(0, 12)} />
      </section>

      <section className="border-t border-white/10 pt-6">
        <p className="font-serif text-xs leading-relaxed text-muted/70">
          <strong className="font-semibold text-muted">
            Finance is Subject to Status.
          </strong>{" "}
          V12 Automobil Limited is authorised &amp; regulated by the FCA [FRN
          1033823]. We are a credit broker not a lender. We work with a select
          group of lenders and will receive commission. The full details of how
          the commission arrangements work will be provided before you proceed
          with any arrangement. Finance subject to status and income. Terms and
          Conditions apply. The advice we provide is not impartial due to our
          commercial relationships with lenders. ICO number [ZB325217].
        </p>
      </section>
    </div>
  );
}
