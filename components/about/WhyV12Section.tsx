import { Star } from "lucide-react";

export default function WhyV12Section() {
  return (
    <section className="mx-auto max-w-6xl border-t border-white/10 px-6 py-24">
      <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-5 font-serif text-lg leading-relaxed text-bianco/85">
          <p>
            At V12 Automobil, we believe buying a vehicle should be an exciting
            and enjoyable experience. We combine carefully selected quality
            vehicles, tailored finance solutions, and exceptional customer
            service to help every customer find the right car with complete
            confidence.
          </p>
          <p>
            Our commitment to transparency, professionalism, and attention to
            detail means you can expect a seamless journey from your first
            inquiry through to driving away in your new vehicle. Whether
            you&apos;re purchasing, financing, or selling a car, our experienced
            team is dedicated to delivering a service you can trust.
          </p>
          <p>
            Because at V12 Automobil,{" "}
            <strong className="font-semibold text-bianco">
              it&apos;s not just about cars — it&apos;s about people,
              relationships, and creating an experience that exceeds
              expectations.
            </strong>
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
          <div className="mb-4 flex justify-center gap-1 text-rosso">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-rosso" />
            ))}
          </div>
          <h3 className="font-display text-lg text-bianco">
            Rated by Our Customers
          </h3>
          <p className="mt-2 mb-6 font-serif text-sm text-muted">
            Live Google Reviews feed goes here.
          </p>
          <script
            defer
            async
            src="https://cdn.trustindex.io/loader.js?a1377e67792a909970763665ac1"
          ></script>
        </div>
      </div>
    </section>
  );
}
