import type { Metadata } from "next";
import SellCarForm from "@/components/home/SellCarForm";

export const metadata: Metadata = {
  title: "Sell Your Car | V12 Automobil",
};

export default function SellYourCarPage() {
  return <SellCarForm />;
}
