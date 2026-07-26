export const NAV_LEFT = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "Car Finance", href: "/car-finance" },
];

export const NAV_RIGHT = [
  { label: "Sell Your Car", href: "/sell-your-car" },
  {
    label: "Company",
    href: "/#",
    children: [
      {
        label: "About Us",
        href: "/about-us",
      },
      {
        label: "Why V12",
        href: "/why-v12-automobil",
      },
      {
        label: "The History of V12",
        href: "/history-of-v12",
      },
      {
        label: "Previously Sold",
        href: "/previously-sold",
      },
    ],
  },
];

export const STATS = [
  { value: "1,000+", label: "Cars Sourced & Sold", bar: "bg-verde" },
  { value: "8", label: "Years Established", bar: "bg-bianco" },
  { value: "99%", label: "Customer Satisfaction", bar: "bg-rosso" },
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

export type TeamMember = {
  name: string;
  role: string;
  email: string;
  phone?: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Josh",
    role: "CEO / Founder",
    email: "info@v12automobil.com",
  },
  {
    name: "Georgi",
    role: "Senior Operations Specialist",
    email: "hello@v12automobil.com",
    phone: "+44 (0) 1234 567 890",
  },
  {
    name: "Max",
    role: "Sales",
    email: "hello@v12automobil.com",
    phone: "+44 (0) 1234 567 890",
  },
];
