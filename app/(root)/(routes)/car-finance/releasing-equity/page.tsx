import type { Metadata } from "next";
import FinanceHero from "@/components/car-finance/FinanceHero";
import FinanceIntro from "@/components/car-finance/FinanceIntro";
import BenefitsGrid from "@/components/car-finance/BenefitsGrid";
import ConsiderSplit from "@/components/car-finance/ConsiderSplit";
import OtherFinanceOptions from "@/components/car-finance/OtherFinanceOptions";
import { CONTACT } from "@/lib/data";

export const metadata: Metadata = {
  title: "Releasing Equity From Your Car | V12 Automobil",
  description:
    "Own a high-value car? You may be able to unlock cash for other ventures by releasing equity. Explore car equity release options with top finance providers.",
};

const BENEFITS = [
  {
    title: "Quick access to cash",
    copy: "As the loan is secured against your vehicle you can usually receive the loan quickly, giving you access to a lump sum for immediate needs.",
  },
  {
    title: "Retain ownership",
    copy: "Releasing equity lets you access your vehicle's value without selling it, so you can continue to enjoy your high-spec car.",
  },
  {
    title: "Fixed monthly payments",
    copy: "Fixed monthly payments make it easier to budget and manage your finances, whilst keeping your car.",
  },
  {
    title: "Leverage existing assets",
    copy: "A car is usually a person's second most valuable asset after their home. Equity release unlocks funds that would otherwise remain tied up.",
  },
];

const CONSIDERATIONS = [
  "Equity release uses your car as collateral, meaning the lender can repossess it if you miss payments. Ensure you can afford repayments before committing.",
  "The condition of your car and how much mileage it has will affect its market value. A well-maintained vehicle can provide higher equity release.",
  "Be aware of any fees like early repayment charges, admin costs, or penalties for refinancing during the equity release process.",
];

export default function ReleasingEquityPage() {
  return (
    <>
      <FinanceHero
        current="Releasing Equity"
        eyebrow="Car Finance"
        title="Releasing Equity From Your Car"
        intro="At V12 Automobil, we can help you unlock funds from your high-value car, giving you the cash you need for other ventures. Our expert team work with top car finance providers to secure the best finance deals for you."
        heroLabel="Image placeholder — Mercedes"
        imageSrc="/images/large_mercedes.jpg"
        ctaHref={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
        ctaLabel="Contact Us"
      />

      <FinanceIntro
        heading="Car equity release"
        paragraphs={[
          "Releasing equity from your car provides a flexible way to access funds based on your vehicle's value.",
          "Car equity release loans are secured against your vehicle, making them a popular choice over unsecured loans. Finance providers often view secured lending more favourably because it protects personal liability, and can increase your borrowing power.",
          "Whether you want to invest in property, cover expenses, or start a new business venture, with car equity release loans, you can unlock the cash tied up in your car without selling it.",
        ]}
        quote={{
          text: "Fantastic service from the V12 team, from start to finish the communication has been easy and prompt. Great team to work with and would highly recommend to anyone looking to purchase/sell a premium/luxury car.",
          author: "Duncan Balloch",
        }}
      />

      <BenefitsGrid
        heading="Benefits of releasing car equity"
        items={BENEFITS}
      />

      <ConsiderSplit
        imageLabel="Image placeholder — purple car, small"
        imageSrc="/images/large_purple_car_detail.jpg"
        heading="Things to consider before choosing to release equity from your car"
        items={CONSIDERATIONS}
      />

      <OtherFinanceOptions excludeHref="/car-finance/releasing-equity" />
    </>
  );
}
