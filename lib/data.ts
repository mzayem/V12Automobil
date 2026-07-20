import { Sparkles } from "lucide-react";

export const NAV_LEFT = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "Car Finance", href: "/car-finance" },
];

export const NAV_RIGHT = [
  { label: "Sell Your Car", href: "/sell-your-car" },
  { label: "About Us", href: "/about-us" },
];

export const STATS = [
  { value: "1,000+", label: "Cars Sourced & Sold", bar: "bg-verde" },
  { value: "8", label: "Years Established", bar: "bg-bianco" },
  { value: "99%", label: "Customer Satisfaction", bar: "bg-rosso" },
];

export type StockCar = {
  slug: string;
  name: string;
  category: string;
  image: string;
};

export const NEW_STOCK: StockCar[] = [
  {
    slug: "ferrari-sf90",
    name: "Ferrari SF90",
    category: "Uncategorized",
    image: "/images/contact.jpg",
  },
  {
    slug: "porsche-cayenne",
    name: "Porsche Cayenne",
    category: "Uncategorized",
    image: "/images/contact.jpg",
  },
  {
    slug: "land-rover-defender",
    name: "Land Rover Defender",
    category: "Uncategorized",
    image: "/images/contact.jpg",
  },
];

export const FOOTER_QUICK_LINKS = [
  { label: "Cars For Sale", href: "/inventory" },
  { label: "About Us", href: "/about-us" },
  { label: "Sell Your Car", href: "/sell-your-car" },
  { label: "Free Valuation", href: "/sell-your-car" },
  { label: "Stock Alerts", href: "/inventory" },
];

export const FOOTER_SERVICES = [
  { label: "Purchase Finance", href: "/car-finance" },
  { label: "Nationwide Delivery", href: "/about-us" },
  { label: "Part Exchange", href: "/sell-your-car" },
  { label: "Classic Insurance", href: "/car-finance" },
  { label: "Consignment Sales", href: "/sell-your-car" },
];

export const FOOTER_SOCIALS = [
  {
    Id: 1,
    label: "Instagram",
    href: "https://www.instagram.com/v12automobil/",
  },
  {
    Id: 2,
    label: "Facebook",
    href: "https://www.facebook.com/v12automobil/",
  },
  {
    Id: 3,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/v12automobil/",
  },
  {
    Id: 4,
    label: "YouTube",
    href: "https://www.youtube.com/@v12automobil",
  },
];
export const OPENING_HOURS = [
  "Mon–Fri: 9am–6pm",
  "Saturday: 10am–4pm",
  "Sunday: By Appointment",
];

export const CONTACT = {
  phone: "+44 (0) 1234 567 890",
  email: "hello@v12automobil.com",
  address: "[Your Address, Town, County, Postcode]",
};
