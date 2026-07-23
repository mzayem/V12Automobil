"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const currentYear = new Date().getFullYear();

// Keep every field as a string, matching what native <input> elements
// actually hold — z.coerce.number() gives a field an "unknown" input type
// vs a "number" output type, which useForm's single generic can't represent
// and breaks handleSubmit's inference. Numbers are parsed out after validation.
const formSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.email("Enter a valid email"),
  telephone: z.string().min(1, "Telephone number is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z
    .string()
    .regex(/^\d{4}$/, "Enter a valid 4-digit year")
    .refine(
      (v) => Number(v) >= 1900 && Number(v) <= currentYear + 1,
      "Enter a valid year",
    ),
  mileage: z
    .string()
    .min(1, "Mileage is required")
    .regex(/^\d+$/, "Enter a valid mileage"),
});

type SellCarFormValues = z.infer<typeof formSchema>;

const STEP_ONE_FIELDS = ["name", "email", "telephone"] as const;

const inputClass =
  "border-transparent bg-bianco text-night placeholder:text-night/40 focus-visible:ring-rosso/50";

async function submitEnquiry(values: SellCarFormValues) {
  // Wire this up to your API route / CRM endpoint — logging for now.
  const payload = {
    ...values,
    year: Number(values.year),
    mileage: Number(values.mileage),
  };
  console.log("Sell enquiry:", payload);
  await new Promise((resolve) => setTimeout(resolve, 1200));
}

export default function SellCarForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [sent, setSent] = useState(false);

  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<SellCarFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      telephone: "",
      make: "",
      model: "",
      year: "",
      mileage: "",
    },
  });

  const goToStepTwo = async () => {
    const valid = await trigger(STEP_ONE_FIELDS);
    if (valid) setStep(2);
  };

  const onSubmit = handleSubmit((values) => {
    toast.promise(submitEnquiry(values), {
      loading: "Sending your details...",
      success: () => {
        setSent(true);
        return "Thanks — we've received your details and will be in touch shortly.";
      },
      error: "Something went wrong. Please try again.",
    });
  });

  return (
    <section className="relative overflow-hidden py-24">
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
          <form onSubmit={onSubmit} noValidate>
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
                <Field data-invalid={!!errors.name}>
                  <FieldLabel htmlFor="name" className="text-bianco/80">
                    Full Name
                  </FieldLabel>
                  <Input
                    id="name"
                    placeholder="Full Name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    className={inputClass}
                    {...register("name")}
                  />
                  <FieldError errors={[errors.name]} />
                </Field>
                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email" className="text-bianco/80">
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className={inputClass}
                    {...register("email")}
                  />
                  <FieldError errors={[errors.email]} />
                </Field>
                <Field data-invalid={!!errors.telephone}>
                  <FieldLabel htmlFor="telephone" className="text-bianco/80">
                    Telephone
                  </FieldLabel>
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="Number"
                    autoComplete="tel"
                    aria-invalid={!!errors.telephone}
                    className={inputClass}
                    {...register("telephone")}
                  />
                  <FieldError errors={[errors.telephone]} />
                </Field>
                <div className="sm:col-span-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={goToStepTwo}
                    className="w-full sm:w-auto sm:min-w-55"
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field data-invalid={!!errors.make}>
                  <FieldLabel htmlFor="make" className="text-bianco/80">
                    Make
                  </FieldLabel>
                  <Input
                    id="make"
                    placeholder="e.g. Ferrari"
                    aria-invalid={!!errors.make}
                    className={inputClass}
                    {...register("make")}
                  />
                  <FieldError errors={[errors.make]} />
                </Field>
                <Field data-invalid={!!errors.model}>
                  <FieldLabel htmlFor="model" className="text-bianco/80">
                    Model
                  </FieldLabel>
                  <Input
                    id="model"
                    placeholder="e.g. SF90"
                    aria-invalid={!!errors.model}
                    className={inputClass}
                    {...register("model")}
                  />
                  <FieldError errors={[errors.model]} />
                </Field>
                <Field data-invalid={!!errors.year}>
                  <FieldLabel htmlFor="year" className="text-bianco/80">
                    Year
                  </FieldLabel>
                  <Input
                    id="year"
                    placeholder="e.g. 2021"
                    inputMode="numeric"
                    aria-invalid={!!errors.year}
                    className={inputClass}
                    {...register("year")}
                  />
                  <FieldError errors={[errors.year]} />
                </Field>
                <Field data-invalid={!!errors.mileage}>
                  <FieldLabel htmlFor="mileage" className="text-bianco/80">
                    Mileage
                  </FieldLabel>
                  <Input
                    id="mileage"
                    placeholder="e.g. 12,000"
                    inputMode="numeric"
                    aria-invalid={!!errors.mileage}
                    className={inputClass}
                    {...register("mileage")}
                  />
                  <FieldError errors={[errors.mileage]} />
                </Field>
                <div className="flex gap-4 sm:col-span-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="bg-transparent"
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Send Details
                  </Button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
