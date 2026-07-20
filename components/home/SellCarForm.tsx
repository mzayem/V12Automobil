"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const inputClass =
  "w-full bg-bianco px-4 py-2.5 text-sm text-night placeholder:text-night/40 focus:outline-none focus:ring-2 focus:ring-rosso";

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-2 block font-serif text-sm text-bianco/80">
        {label}
      </span>
      <input className={inputClass} {...props} />
    </label>
  );
}

export default function SellCarForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    telephone: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
  });

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = () => {
    // Wire this up to your API route / CRM endpoint
    console.log("Sell enquiry:", form);
    setSent(true);
  };

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background image — drop your showroom shot in /public/images/sell-bg.jpg */}
      <Image
        src="/images/contact.jpg"
        alt=""
        fill
        aria-hidden
        className="object-cover object-center opacity-40"
      />
      <div className="absolute inset-0 bg-linear-to-b from-night via-transparent to-night" />

      <div className="relative mx-auto max-w-3xl px-6">
        <h2 className="font-display mb-4 text-center text-3xl text-bianco sm:text-4xl">
          Find Your Car&apos;s Next Home
        </h2>
        <p className="mb-12 text-center font-serif text-base leading-relaxed text-bianco/85">
          If you think it might be time for your car to move on, tell us about
          it. We connect serious cars with serious buyers — always with
          discretion and care.
        </p>

        {sent ? (
          <p className="text-center font-serif text-lg italic text-verde">
            Thank you — we&apos;ve received your details and will be in touch
            shortly.
          </p>
        ) : (
          <>
            {/* Stepper */}
            <div className="mb-10 flex items-center">
              {[1, 2].map((n, i) => (
                <div
                  key={n}
                  className={`flex items-center ${i === 1 ? "" : "flex-1"}`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm ${
                      step >= n ? "bg-rosso text-white" : "bg-bianco text-night"
                    }`}
                    aria-current={step === n ? "step" : undefined}
                  >
                    {n}
                  </span>
                  {i === 0 && (
                    <span className="mx-3 h-px flex-1 bg-bianco/60" />
                  )}
                </div>
              ))}
            </div>

            {step === 1 ? (
              <div className="grid gap-6 sm:grid-cols-3">
                <Field
                  label="Full Name"
                  placeholder="Full Name"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={update("fullName")}
                />
                <Field
                  label="Email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update("email")}
                />
                <Field
                  label="Telephone"
                  type="tel"
                  placeholder="Number"
                  autoComplete="tel"
                  value={form.telephone}
                  onChange={update("telephone")}
                />
                <div className="sm:col-span-3">
                  <Button
                    variant="secondary"
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto sm:min-w-55"
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  label="Make"
                  placeholder="e.g. Ferrari"
                  value={form.make}
                  onChange={update("make")}
                />
                <Field
                  label="Model"
                  placeholder="e.g. SF90"
                  value={form.model}
                  onChange={update("model")}
                />
                <Field
                  label="Year"
                  placeholder="e.g. 2021"
                  inputMode="numeric"
                  value={form.year}
                  onChange={update("year")}
                />
                <Field
                  label="Mileage"
                  placeholder="e.g. 12,000"
                  inputMode="numeric"
                  value={form.mileage}
                  onChange={update("mileage")}
                />
                <div className="flex gap-4 sm:col-span-2">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="bg-transparent"
                  >
                    Back
                  </Button>
                  <Button onClick={submit} className="flex-1">
                    Send Details
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
