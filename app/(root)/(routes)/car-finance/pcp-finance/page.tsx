import type { Metadata } from "next";
import FinanceHero from "@/components/car-finance/FinanceHero";
import FinanceIntro from "@/components/car-finance/FinanceIntro";
import BenefitsGrid from "@/components/car-finance/BenefitsGrid";
import ConsiderSplit from "@/components/car-finance/ConsiderSplit";
import OtherFinanceOptions from "@/components/car-finance/OtherFinanceOptions";

export const metadata: Metadata = {
  title: "Personal Contract Purchase | PCP Car Finance | V12 Automobil",
  description:
    "V12 Automobil can assist you in securing your dream supercar through Personal Contract Purchase. PCP finance offers low monthly payments and flexible terms.",
};

const BENEFITS = [
  {
    title: "Lower monthly payments",
    copy: "Monthly instalments are usually lower than other car finance options, making it easier to afford more prestigious cars.",
  },
  {
    title: "Flexibility at the end of the term",
    copy: 'You can return the car, trade it in for a new one, or pay a final "balloon payment" to own it at the end of the agreement.',
  },
  {
    title: "Easy to budget",
    copy: "PCP helps you manage your finances with fixed monthly payments and flexible options at the end of the agreement.",
  },
  {
    title: "Low deposit",
    copy: "Reduces the upfront cost of purchasing a car, to free up personal or business funds or to make a higher specification vehicle more affordable.",
  },
  {
    title: "Protected against depreciation",
    copy: "The lender sets a Guaranteed Minimum Future Value (GMFV), so you don't have to worry about the car losing more value than expected.",
  },
  {
    title: "Change cars more frequently",
    copy: "Monthly payments are based on depreciation, allowing you to upgrade to a new car with another PCP agreement at the end of the contract without having to pay the vehicle value in full.",
  },
];

const CONSIDERATIONS = [
  "You have to agree upfront to the mileage limit. If you exceed this, you'll be charged a fee for each additional mile over the limit.",
  "You will have to pay for any damage to the vehicle above wear and tear if you want to return the car.",
  "You have to make a large final payment if you want to keep the car. You don't own the car until this payment is made.",
  "Early termination may result in additional costs.",
  "You are bound to the terms of the agreement, so ensure you are able to afford the repayments, even if your circumstances change.",
  "Missing payments can harm your credit score and impact future borrowing. If you default on your payments, the vehicle may be repossessed without a court order.",
];

export default function PcpFinancePage() {
  return (
    <>
      <FinanceHero
        current="Personal Contract Purchase (PCP)"
        eyebrow="Car Finance"
        title="PCP Finance"
        intro="At V12 Automobil, we give you access to flexible Personal Contract Purchase (PCP) options through top car finance providers. Discover a hassle-free way to own a prestige car through PCP car finance today."
        heroLabel="Image placeholder — Range Rover"
        imageSrc="/images/large_range_rover.jpg"
      />

      <FinanceIntro
        heading="What is Personal Contract Purchase (PCP) car finance?"
        paragraphs={[
          "Personal Contract Purchase (PCP) is a popular car finance option that is often a more affordable option to fund your dream car.",
          'The best way to describe PCP is as an equivalent to a long-term rental agreement. Monthly payments are made, usually at a lower amount than other finance options, over the agreed term. At the end of the contract, you can return the vehicle, upgrade to a new car with another PCP agreement, or make a final "balloon payment" to take full ownership.',
          "The Guaranteed Minimum Future Value (GMFV) is calculated at the start of your agreement. It is based on the car's expected value at the end of the term and considers your agreed annual mileage. The finance provider defers the GMFV as a final payment, also known as a balloon payment, resulting in lower monthly payments than those on an equivalent HP agreement.",
          "PCP is also a good option if you opt out of a company car scheme, as your car allowance can cover monthly payments without incurring company car tax.",
        ]}
        quote={{
          text: "After finding the right vehicle, Nadim sourced the finance to push the deal through. The whole transaction went smoothly with regular updates all through. I would recommend Nadim and V12 to source and/or finance your next vehicle.",
          author: "Simon Ward",
        }}
      />

      <BenefitsGrid
        heading="Benefits of Personal Contract Purchase (PCP) car finance"
        items={BENEFITS}
      />

      <ConsiderSplit
        imageLabel="Image placeholder — Mercedes"
        imageSrc="/images/mercedes.jpg"
        heading="Things to consider before choosing a PCP finance product"
        items={CONSIDERATIONS}
      />

      <OtherFinanceOptions excludeHref="/car-finance/pcp-finance" />
    </>
  );
}
