export const NAV_LEFT = [
  { label: "Home", href: "/" },
  {
    label: "Inventory",
    href: "/inventory",
    children: [
      {
        label: "Current Inventory",
        href: "/inventory",
      },
      {
        label: "Previously Sold",
        href: "/previously-sold",
      },
    ],
  },
  {
    label: "Car Finance",
    href: "/car-finance",
    children: [
      {
        label: "Hire Purchase (HP)",
        href: "/car-finance/hire-purchase",
      },
      {
        label: "Personal Contract Purchase (PCP)",
        href: "/car-finance/pcp-finance",
      },
      {
        label: "Lease Purchase (LP)",
        href: "/car-finance/lease-purchase",
      },
      {
        label: "Car Refinance",
        href: "/car-finance/car-refinance",
      },
      {
        label: "Releasing Equity",
        href: "/car-finance/releasing-equity",
      },
    ],
  },
];

export const NAV_RIGHT = [
  { label: "Sell Your Car", href: "/sell-your-car" },
  {
    label: "About Us",
    href: "/#",
    children: [
      {
        label: "Meet the Team",
        href: "/meet-the-team",
      },
      {
        label: "Why V12?",
        href: "/why-v12-automobil",
      },
      {
        label: "The History of V12",
        href: "/history-of-v12",
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
  { label: "Meet the Team", href: "/meet-the-team" },
  { label: "Why V12", href: "/why-v12-automobil" },
  { label: "Sell Your Car", href: "/sell-your-car" },
  { label: "Cars For Sale", href: "/inventory" },
  { label: "Previously Sold", href: "/previously-sold" },
];

export const FOOTER_SERVICES = [
  { label: "Hire Purchase", href: "/car-finance/hire-purchase" },
  { label: "Personal Contract Purchase", href: "/car-finance/pcp-finance" },
  { label: "Lease Purchase", href: "/car-finance/lease-purchase" },
  { label: "Car Refinance", href: "/car-finance/car-refinance" },
  { label: "Releasing Equity", href: "/car-finance/releasing-equity" },
];

export const FOOTER_SOCIALS = [
  {
    Id: 1,
    label: "Instagram",
    href: "https://www.instagram.com/V12automobil",
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
  phone: "+44 330 133 5108",
  email: "info@v12automobil.co.uk",
  address: "84 Eccleston Square, Pimlico, London SW1V 1PX",
};

export type FinanceOption = {
  label: string;
  href: string;
  description: string;
};

export const FINANCE_OPTIONS: FinanceOption[] = [
  {
    label: "Hire Purchase (HP)",
    href: "/car-finance/hire-purchase",
    description:
      "Hire Purchase offers fixed monthly payments and full ownership of the car once the agreement ends.",
  },
  {
    label: "Personal Contract Purchase (PCP)",
    href: "/car-finance/pcp-finance",
    description:
      "PCP allows you to use the car until the contract ends before deciding whether to keep it or change it.",
  },
  {
    label: "Lease Purchase (LP)",
    href: "/car-finance/lease-purchase",
    description:
      "Lease Purchase gives you the benefit of lower monthly payments compared to a standard Hire Purchase deal.",
  },
  {
    label: "Car Refinance",
    href: "/car-finance/car-refinance",
    description:
      "Refinancing your car is the hassle-free way of restructuring your funding, much like switching your mortgage.",
  },
  {
    label: "Releasing Equity",
    href: "/car-finance/releasing-equity",
    description:
      "If you own a high-value vehicle and are looking for additional funds, you may be able to release some equity from your car.",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  imageSrc?: string;
  phone?: string;
  email?: string;
  description?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Josh Apps",
    role: "CEO / Founder",
    imageSrc: "/images/team/Josh_1e546be37e.jpg",
    email: "Josh@v12automobil.co.uk",
    instagram: "https://www.instagram.com/V12automobil",
    linkedin: "https://www.linkedin.com/in/josh-apps-8b1109228/",
    description:
      "Josh has worked in the football industry representing clients for 10+ years and has been heavily involved in sourcing high end vehicles for his sporting clientele; with over 2000 sales transacted. The creation of V12 Automobil was a natural progression that has enabled new and existing clients to access highly sought after vehicles at competitive prices. Josh works tirelessly to ensure that we always offer the very highest levels of service to our customers, which has enabled V12 Automobil to become both a trusted and highly recommended luxury dealership.",
  },
  {
    name: "Georgi Vasilev",
    role: "Senior Operations Specialist",
    imageSrc: "/images/team/Georgi_03d6c7d684.jpg",
    email: "georgi@v12automobil.co.uk",
    phone: "+44 (0) 7883 748 278",
    description:
      "Georgi has worked in the motor trade for more than five years most recently with Chelsea Truck Company. He has been heavily involved in operations and after sales customer service including sales of high-end parts, ensuring the customers experience is as seamless as possible. His extensive experience with high-end vehicles and customers alike compliment V12's continued commitment to delivering the highest standards at all times.",
  },
  {
    name: "Jack Borsos",
    role: "Head of Sale",
    imageSrc: "/images/team/Jack_c32cb03d65.jpg",
    email: "jack@v12automobil.co.uk",
    phone: "+44 (0) 7534 638 884",
    instagram: "https://www.instagram.com/Jack_v12automobil",
    linkedin: "https://www.linkedin.com/in/jack-borsos/",
    description:
      "Jack brings a wealth of sales knowledge to V12 Automobil with years of experience in the automotive industry. He has previously managed large sales teams for prominent main dealer locations in and around London and was previously responsible for a significant Training Department in automotive sales before joining our team. Jack specialises in sourcing luxury cars and supercars for clients, managing sales from our extensive stock including Sale or Return enquiries.",
  },
];
