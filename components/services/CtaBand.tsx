import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/data";

export default function CtaBand({
  id = "contact",
  heading = "Ready to talk to our team?",
  copy = "Get in touch about selling, sourcing, or protecting your vehicle.",
}: {
  id?: string;
  heading?: string;
  copy?: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 pb-24 pt-4 sm:pb-28">
      <div className="flex flex-col items-center justify-between gap-6 rounded-lg border border-white/10 bg-white/5 p-10 text-center sm:flex-row sm:text-left">
        <div>
          <h3 className="font-display text-2xl text-bianco">{heading}</h3>
          <p className="mt-2 font-serif text-sm text-muted">{copy}</p>
        </div>
        <Button
          size="lg"
          className="px-6"
          render={<Link href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} />}
        >
          <Phone className="size-4" />
          {CONTACT.phone}
        </Button>
      </div>
    </section>
  );
}
