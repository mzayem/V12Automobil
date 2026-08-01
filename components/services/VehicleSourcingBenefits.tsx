const BENEFITS = [
  {
    number: "01",
    title: "Effortless Experience",
    copy: "We handle every step of the process, from identifying the ideal vehicle to completing the paperwork. Simply share your requirements, and we'll take care of the rest.",
  },
  {
    number: "02",
    title: "Industry Expertise",
    copy: "Leverage our years of automotive experience to receive tailored advice on selecting the right vehicle and the most suitable purchasing option, whether it's financing or a cash purchase.",
  },
  {
    number: "03",
    title: "Time & Cost Efficiency",
    copy: "We source vehicles that meet your specifications at the most competitive prices, ensuring you get the best value for your investment.",
  },
  {
    number: "04",
    title: "Convenient Collection or Delivery",
    copy: "Choose to pick up your vehicle from our London headquarters, or opt for a seamless delivery service directly to your doorstep.",
  },
];

export default function VehicleSourcingBenefits() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="eyebrow mb-3">Bespoke Sourcing</p>
        <h2 className="font-display text-3xl text-bianco sm:text-4xl">
          Why Source Your Vehicle Through V12 Automobil?
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
