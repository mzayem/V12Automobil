export const NAV_LEFT = [
  { label: "Home", href: "/" },
  { label: "Inventory", href: "/inventory" },
  { label: "Car Finance", href: "/car-finance" },
];

export const NAV_RIGHT = [
  { label: "Sell Your Car", href: "/sell-your-car" },
  {
    label: "About Us",
    href: "/about-us",
    children: [
      {
        label: "The Team",
        href: "/team",
      },
      {
        label: "Why V12",
        href: "/about-us",
      },
      {
        label: "The History of V12",
        href: "/history-of-v12",
      },
      {
        label: "Previously Sold",
        href: "/history",
      },
    ],
  },
];

export const STATS = [
  { value: "1,000+", label: "Cars Sourced & Sold", bar: "bg-verde" },
  { value: "8", label: "Years Established", bar: "bg-bianco" },
  { value: "99%", label: "Customer Satisfaction", bar: "bg-rosso" },
];

export type StockCar = {
  slug: string;
  images: string[];
  name: string;
  price: string;
  colour: string;
  Interior: string;
  year: number;
  Mileage: number;
  Engine: string;
  Transmission: string;
  BodyStyle: string;
  FuelType: string;
};

export const NEW_STOCK: StockCar[] = [
  {
    slug: "ferrari-sf90",
    name: "Ferrari SF90",
    images: ["/images/contact.jpg"],
    price: "£10000",
    colour: "Black",
    Interior: "Leather",
    year: 2022,
    Mileage: 10000,
    Engine: "V12 Engine",
    Transmission: "Automatic",
    BodyStyle: "Sedan",
    FuelType: "Gasoline",
  },
  {
    slug: "porsche-cayenne",
    name: "Porsche Cayenne",
    images: ["/images/contact.jpg"],
    price: "£10000",
    colour: "Black",
    Interior: "Leather",
    year: 2022,
    Mileage: 10000,
    Engine: "V12 Engine",
    Transmission: "Automatic",
    BodyStyle: "Sedan",
    FuelType: "Gasoline",
  },
  {
    slug: "land-rover-defender",
    name: "Land Rover Defender",
    images: ["/images/contact.jpg"],
    price: "UNDER OFFER",
    colour: "Black",
    Interior: "Leather",
    year: 2022,
    Mileage: 10000,
    Engine: "V12 Engine",
    Transmission: "Automatic",
    BodyStyle: "Sedan",
    FuelType: "Gasoline",
  },
  {
    slug: "land-rover-defender",
    name: "Land Rover Defender",
    images: ["/images/contact.jpg"],
    price: "UNDER OFFER",
    colour: "Black",
    Interior: "Leather",
    year: 2022,
    Mileage: 10000,
    Engine: "V12 Engine",
    Transmission: "Automatic",
    BodyStyle: "Sedan",
    FuelType: "Gasoline",
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
