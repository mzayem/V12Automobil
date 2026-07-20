import type { Metadata } from "next";
import PageHeading from "@/components/ui/PageHeading";

export const metadata: Metadata = {
  title: "Car Finance | V12 Automobil",
};

const OPTIONS = [
  {
    title: "Hire Purchase",
    copy: "Spread the cost over fixed monthly payments and own the car outright at the end of the term.",
  },
  {
    title: "Lease Purchase",
    copy: "Lower monthly payments with a final balloon payment — ideal for prestige and appreciating classics.",
  },
  {
    title: "Equity Release",
    copy: "Unlock capital tied up in your current car or collection without having to sell.",
  },
];

export default function CarFinancePage() {
  return (
    <>
      <PageHeading
        eyebrow="Funding"
        title="Car Finance"
        intro="Tailored funding for prestige and classic cars, arranged through specialist lenders who understand the market."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-6 pb-24 sm:grid-cols-3">
        {OPTIONS.map((option) => (
          <article
            key={option.title}
            className="border border-white/10 bg-panel p-8"
          >
            <h2 className="font-display mb-4 text-xl text-bianco">
              {option.title}
            </h2>
            <p className="font-serif text-base leading-relaxed text-bianco/80">
              {option.copy}
            </p>
          </article>
        ))}
      </section>
    </>
  );
}
