import { Check } from "lucide-react";

const ADDITIONAL_SERVICES = [
  {
    title: "Nationwide delivery",
    copy: "Secure, hassle-free transport across the UK.",
  },
  {
    title: "Aftermarket body styling & alloy wheels",
    copy: "Upgrade your supercar's aesthetics and performance.",
  },
  {
    title: "Insurance-approved security & trackers",
    copy: "Advanced protection for complete peace of mind.",
  },
  {
    title: "Alloy wheel & tyre cover",
    copy: "Comprehensive protection against damage.",
  },
  {
    title: "Paint Protection Film (PPF) & wrapping",
    copy: "Preserve and customise your car's finish.",
  },
  {
    title: "Interior & exterior detailing",
    copy: "Luxury detailing for a showroom-standard shine.",
  },
  {
    title: "Supercar service plans",
    copy: "Expert maintenance to keep your vehicle performing at its best.",
  },
];

export default function AdditionalServices() {
  return (
    <section className="mx-auto max-w-6xl border-t border-white/10 px-6 py-20">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="eyebrow mb-3">Beyond Buying &amp; Selling</p>
        <h2 className="font-display text-3xl text-bianco sm:text-4xl">
          Additional Services We Offer
        </h2>
        <p className="mt-4 font-serif text-sm leading-relaxed text-muted">
          We offer a bespoke range of services to enhance, protect, and
          maintain your vehicle.
        </p>
      </div>

      <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {ADDITIONAL_SERVICES.map((service) => (
          <li
            key={service.title}
            className="flex items-start gap-3.5 border-b border-white/5 pb-6"
          >
            <Check className="mt-0.5 size-4 shrink-0 text-rosso" />
            <span className="font-serif text-sm leading-relaxed text-muted">
              <strong className="font-semibold text-bianco">
                {service.title}
              </strong>{" "}
              — {service.copy}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
