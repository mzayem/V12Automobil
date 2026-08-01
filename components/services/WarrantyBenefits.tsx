const BENEFITS = [
  {
    number: "01",
    title: "Thousands of Parts & Faults Covered",
    copy: "6,000+ parts are covered against mechanical breakdown, electrical / electronic failure or wear and tear (with some exceptions).",
  },
  {
    number: "02",
    title: "Nationwide Garage Network",
    copy: "If you use one of the hundreds of garages in the network we'll pay them directly, and we'll pay for the cost of recovering the vehicle to the nearest garage.",
  },
  {
    number: "03",
    title: "48 Hour Claim Payments",
    copy: "If the repair was carried out by your own garage and we're reimbursing them or yourself, payments are usually processed within two working days upon receipt of all documentation.",
  },
  {
    number: "04",
    title: "Unlimited Claims & No Excess",
    copy: "You can be safe in the knowledge that there will be no unexpected excess fees and you won't hit a claim limit.",
  },
  {
    number: "05",
    title: "Basic UK Breakdown Cover",
    copy: "Your warranty includes free basic UK breakdown cover. You'll get one callout during the period of cover up to a total value of £500.",
  },
  {
    number: "06",
    title: "Car Hire",
    copy: "Providing the fault is covered and repair time will take over 8 hours, you will get up to 7 days of car hire.",
  },
  {
    number: "07",
    title: "Overnight Accommodation",
    copy: "If your vehicle is rendered immobile, you'll also get overnight accommodation or rail fare, as part of your claim limit.",
  },
  {
    number: "08",
    title: "European Cover",
    copy: "Travel to Europe? The premium plan also includes 30 days of European cover.",
  },
];

export default function WarrantyBenefits() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit) => (
          <div key={benefit.number}>
            <span className="mb-5 flex size-11 items-center justify-center rounded-full border-2 border-rosso font-display text-base text-rosso">
              {benefit.number}
            </span>
            <h3 className="font-display mb-2 text-base text-bianco">
              {benefit.title}
            </h3>
            <p className="font-serif text-sm leading-relaxed text-muted">
              {benefit.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
