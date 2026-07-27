import type { Metadata } from "next";
import FinanceHero from "@/components/car-finance/FinanceHero";
import FinanceIntro from "@/components/car-finance/FinanceIntro";
import BenefitsGrid from "@/components/car-finance/BenefitsGrid";
import ConsiderSplit from "@/components/car-finance/ConsiderSplit";
import OtherFinanceOptions from "@/components/car-finance/OtherFinanceOptions";

export const metadata: Metadata = {
  title: "Hire Purchase | HP Car Finance | V12 Automobil",
  description:
    "Own your dream supercar with Hire Purchase Finance. V12 Automobil helps you get the best HP deals with affordable monthly payments from top finance providers.",
};

const BENEFITS = [
  {
    title: "Fixed monthly payments",
    copy: "HP makes it easier to budget and manage your finances.",
  },
  {
    title: "Flexible deposit",
    copy: "Free up personal or business funds by choosing your deposit amount.",
  },
  {
    title: "No mileage limits",
    copy: "HP allows you to drive freely without worrying about extra charges.",
  },
  {
    title: "Ownership at the end",
    copy: "Once the final payment is made, the vehicle is yours, giving you full control.",
  },
  {
    title: "Complete control",
    copy: "You can choose the length of your term, the deposit amount and the final payment amount.",
  },
  {
    title: "Tax benefits",
    copy: "HP offers tax allowances for businesses using the vehicle for business purposes.",
  },
];

const CONSIDERATIONS = [
  "Monthly repayments are usually higher than other finance options.",
  "You don't own the car until the final payment is made, including the option to purchase fee.",
  "You are bound to the terms of the agreement, so ensure you are able to afford the repayments, even if your circumstances change.",
  "Missing payments can harm your credit score and impact future borrowing. If you default on your payments, the vehicle may be repossessed without a court order.",
];

export default function HirePurchasePage() {
  return (
    <>
      <FinanceHero
        current="Hire Purchase (HP)"
        eyebrow="Car Finance"
        title="Hire Purchase (HP)"
        intro="At V12 Automobil, we give you access to flexible Hire Purchase (HP) options through top car finance providers. Explore a hassle-free way to own a performance car through HP car finance today."
        heroLabel="Image placeholder — purple car, close detail"
        imageSrc="/images/large_purple_car_detail.jpg"
      />

      <FinanceIntro
        heading="What is Hire Purchase (HP) car finance?"
        paragraphs={[
          "With Hire Purchase (HP), you can spread the cost of your car purchase through fixed monthly payments and a set interest rate, making budgeting simple.",
          "Choose the deposit amount, typically between 10% and 50% of the car's price, and repay the remaining balance, plus interest, over an agreed term, usually 1 to 5 years.",
          "You can enjoy clear, predictable payments with HP car finance. And once the agreement is complete, you'll fully own your dream car.",
        ]}
        quote={{
          text: "Can't thank the team enough for helping me with my new car purchase. Josh was excellent at sales and Nadim really helped me with the financing of my car. All around great team. Looking forward to my next purchase!",
          author: "Islay Langley",
        }}
      />

      <BenefitsGrid
        heading="Benefits of Hire Purchase (HP) car finance"
        items={BENEFITS}
      />

      <ConsiderSplit
        imageSrc="/images/porsche_911_turbo.jpg"
        imageLabel="Image placeholder — Porsche 911 Turbo"
        heading="Things to consider before choosing a Hire Purchase finance product"
        items={CONSIDERATIONS}
      />

      <OtherFinanceOptions excludeHref="/car-finance/hire-purchase" />
    </>
  );
}
