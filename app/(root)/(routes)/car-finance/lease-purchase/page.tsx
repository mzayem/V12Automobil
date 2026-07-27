import type { Metadata } from "next";
import FinanceHero from "@/components/car-finance/FinanceHero";
import FinanceIntro from "@/components/car-finance/FinanceIntro";
import BenefitsGrid from "@/components/car-finance/BenefitsGrid";
import OptionsSplit from "@/components/car-finance/OptionsSplit";
import OtherFinanceOptions from "@/components/car-finance/OtherFinanceOptions";

export const metadata: Metadata = {
  title: "Lease Purchase | LP Car Finance | V12 Automobil",
  description:
    "Secure your dream supercar from V12 Automobil with Lease Purchase finance. Spread the cost with manageable monthly payments from top car finance providers.",
};

const BENEFITS = [
  {
    title: "Flexible deposit",
    copy: "You can choose a deposit amount that suits your budget, usually between 10% and 50% of the car's price.",
  },
  {
    title: "Lower monthly payments",
    copy: "Lease Purchase is more affordable as the balloon payment at the end of the agreement reduces monthly payments.",
  },
  {
    title: "No mileage limits",
    copy: "Lease Purchase allows you to drive freely without worrying about extra mileage charges.",
  },
  {
    title: "Ownership at the end",
    copy: "Once the final payment is made, the vehicle is yours.",
  },
  {
    title: "A higher spec vehicle",
    copy: "Lower monthly payments can help make a higher specification vehicle a more affordable option.",
  },
  {
    title: "Tax benefits",
    copy: "LP offers tax allowances for businesses using the vehicle for business purposes.",
  },
];

const END_OF_TERM_OPTIONS = [
  {
    strong: "Pay the final payment and own the car —",
    text: "use existing funds or refinance the balloon payment.",
  },
  {
    strong: "Part-exchange the car —",
    text: "deduct the final payment from the trade-in value, and use any remaining equity towards your next vehicle.",
  },
  {
    strong: "Sell the car privately —",
    text: "retain any equity once the final payment has been paid.",
  },
];

export default function LeasePurchasePage() {
  return (
    <>
      <FinanceHero
        current="Lease Purchase (LP)"
        eyebrow="Car Finance"
        title="Lease Purchase (LP)"
        intro="At V12 Automobil, we give you access to flexible Lease Purchase (LP) options through top car finance providers. Explore a hassle-free way to purchase a performance car through LP car finance today."
        heroLabel="Image placeholder — Range Rover, dark exterior"
        imageSrc="/images/large_range_rover_black.jpg"
      />

      <FinanceIntro
        heading="What is Lease Purchase (LP) car finance?"
        paragraphs={[
          "Lease Purchase is a type of car finance where you make fixed monthly payments over an agreed term, similar to a Hire Purchase (HP) agreement.",
          "The main difference is that Lease Purchase includes a balloon payment (a large final payment) at the end of the contract to purchase the car in full if you choose to do so.",
          "The lender bases the balloon payment on the car's predicted value at the end of the term. By deferring this payment, your monthly instalments are typically lower than a standard HP finance agreement.",
          "LP provides flexibility, helping you manage your budget while securing your dream car.",
        ]}
        quote={{
          text: "Josh and Nadim did a great job at sourcing and financing my new Bentley, they went above and beyond to assist me and were incredibly knowledgeable, I didn't feel pressured like I had at other dealerships. The staff at V12 Automobil were fantastic throughout, thanks again!",
          author: "Thom Brown",
        }}
      />

      <BenefitsGrid
        heading="Benefits of Lease Purchase (LP) car finance"
        items={BENEFITS}
      />

      <OptionsSplit
        imageLabel="Image placeholder — Range Rover, side profile"
        imageSrc="/images/range_rover_small.jpg"
        heading="What are my options at the end of a Lease Purchase agreement?"
        items={END_OF_TERM_OPTIONS}
      />

      <OtherFinanceOptions excludeHref="/car-finance/lease-purchase" />
    </>
  );
}
