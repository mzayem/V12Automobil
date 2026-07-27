import type { Metadata } from "next";
import FinanceHero from "@/components/car-finance/FinanceHero";
import FinanceIntro from "@/components/car-finance/FinanceIntro";
import BenefitsGrid from "@/components/car-finance/BenefitsGrid";
import ConsiderSplit from "@/components/car-finance/ConsiderSplit";
import OtherFinanceOptions from "@/components/car-finance/OtherFinanceOptions";
import { CONTACT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Refinance Your Car Loan | Refinancing | V12 Automobil",
  description:
    "Reduce monthly payments, avoid a lump sum balloon payment, or speed up ownership by refinancing your car. Explore refinance options with top finance providers.",
};

const BENEFITS = [
  {
    title: "Lower interest rates",
    copy: "By paying less interest over the life of the loan you could reduce your monthly payments or pay off your loan earlier.",
  },
  {
    title: "Reduce monthly payments",
    copy: "Free up cash flow or make monthly payments more manageable by refinancing over a longer term.",
  },
  {
    title: "Keep the car for longer",
    copy: "Extending the term of your loan allows you to drive the car for longer without the pressure of a final balloon payment or having to trade it in early.",
  },
  {
    title: "Accelerate the path to ownership",
    copy: "You could own your car sooner by refinancing to a shorter loan term or use it to pay off the final balloon payment.",
  },
];

const CONSIDERATIONS = [
  "You may pay more interest in the long run. Extending your term may lower your monthly payments, but you could end up paying more interest.",
  "Some lenders charge fees for early repayment of your current loan or setting up a new one, which can reduce potential savings.",
  "If your current car loan exceeds the car's value, lenders may deny refinancing or charge you a higher interest rate.",
  "Interest rates may have risen since you took out your first agreement so you may not find a better deal.",
];

export default function CarRefinancePage() {
  return (
    <>
      <FinanceHero
        current="Car Refinance"
        eyebrow="Car Finance"
        title="Car Refinance"
        intro="At V12 Automobil, we can help you lower your monthly repayments or spread the cost of a balloon payment by refinancing your existing car loan. Our expert team work with the top car finance providers to get you the best refinancing deals."
        heroLabel="Image placeholder — Porsche 911 Turbo"
        imageSrc="/images/large_porsche_911_turbo.jpg"
        ctaHref={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
        ctaLabel="Contact Us"
      />

      <FinanceIntro
        heading="What is car refinancing?"
        paragraphs={[
          "Refinancing your car is a practical way to make car payments more manageable without selling your vehicle.",
          "Car refinancing involves replacing your current car loan with a new one that offers better terms. It is a practical way to make your monthly payments more manageable without selling your vehicle.",
          "Refinancing is similar to switching your mortgage — it lets you restructure your car finance. Whether you're looking to lower monthly outgoings, extend the term, or accelerate your path to ownership, refinancing could help.",
          "You may also be able to refinance your balloon payment if you have a final lump sum payment on an existing car finance product. Allowing you to keep your car without paying the final payment in full.",
        ]}
        quote={{
          text: "An absolutely fantastic service provided by the guys at V12. Saved me ~£400 per month on my finance deal! A*",
          author: "Tom Wilde",
        }}
      />

      <BenefitsGrid heading="Benefits of refinancing a car" items={BENEFITS} />

      <ConsiderSplit
        imageLabel="Image placeholder — Range Rover, black, cropped"
        imageSrc="/images/range_rover_black_cropped.jpg"
        heading="Things to consider before choosing to refinance your car"
        items={CONSIDERATIONS}
      />

      <OtherFinanceOptions excludeHref="/car-finance/car-refinance" />
    </>
  );
}
