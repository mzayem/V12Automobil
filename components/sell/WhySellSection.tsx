const BENEFITS = [
  {
    number: "01",
    title: "No-Obligation Valuation",
    copy: "Share details about your vehicle, and we'll provide a free, no-obligation valuation to help you make an informed decision.",
  },
  {
    number: "02",
    title: "No Hidden Fees",
    copy: "We offer a transparent process without any unexpected costs or additional charges. Enjoy a hassle-free experience when you sell your car to us.",
  },
  {
    number: "03",
    title: "Flexible Selling Options",
    copy: "Whether you're upgrading to a new vehicle, selling outright, or part-exchanging, we guarantee competitive pricing with no purchase necessary.",
  },
  {
    number: "04",
    title: "Exceptional Customer Service",
    copy: "Don't just take our word for it — explore our 5-star reviews on Google and AutoTrader to see why our customers trust us.",
  },
];

export default function WhySellSection() {
  return (
    <section className="mx-auto max-w-6xl  px-6 py-24">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="eyebrow mb-3">Why Choose Us</p>
        <h2 className="font-display text-4xl text-bianco sm:text-5xl">
          Why Sell Your Car to <span className="text-rosso">V12 Automobil</span>
          ?
        </h2>
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((benefit) => (
          <div key={benefit.number}>
            <span className="mb-5 flex size-12 items-center justify-center rounded-full border-2 border-rosso font-display text-lg text-rosso">
              {benefit.number}
            </span>
            <h3 className="font-display mb-2 text-lg text-bianco">
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
