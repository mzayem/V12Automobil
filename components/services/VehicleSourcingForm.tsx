"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { FadeIn } from "@/components/motion/Reveal";

const FORM_ID = "vehicle-sourcing-form";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Enter a valid email"),
  phone: z.string().min(1, "Phone number is required"),
  vehicleMake: z.string().min(1, "Vehicle make is required"),
  vehicleModel: z.string().min(1, "Vehicle model is required"),
  message: z.string().optional(),
  consent: z.boolean().refine((value) => value, {
    message: "Please agree to the Privacy Policy to continue",
  }),
});

type SourcingFormValues = z.infer<typeof formSchema>;

const defaultValues: SourcingFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  vehicleMake: "",
  vehicleModel: "",
  message: "",
  consent: false,
};

export default function VehicleSourcingForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<SourcingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    // No backend lead type currently fits an open-ended sourcing request
    // (DealerKit's "buying"/"sales" leads both require an existing vehicle),
    // so this is a UI-only confirmation until that's wired up.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
    setSent(true);
    reset(defaultValues);
  });

  return (
    <section
      id="form"
      className="border-t border-white/10 bg-white/[0.02] py-24"
    >
      <div className="mx-auto max-w-2xl px-6">
        <FadeIn>
          <div className="mx-auto mb-10 max-w-xl text-center">
            <h2 className="font-display text-2xl text-bianco sm:text-3xl">
              Tell Us What You&apos;re After
            </h2>
            <p className="mt-4 font-serif text-sm leading-relaxed text-muted">
              Please complete the form below and a member of our experienced
              team will contact you to discuss sourcing your vehicle.
            </p>
          </div>
        </FadeIn>

        {sent ? (
          <FadeIn>
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-lg border border-verde/30 bg-linear-to-b from-white/8 to-white/3 p-10 text-center shadow-2xl shadow-black/40">
              <span className="flex size-14 items-center justify-center rounded-full border-2 border-verde text-verde">
                <Check className="size-6" />
              </span>
              <p className="font-serif text-lg italic text-bianco/90">
                Thank you — we&apos;ve received your details and will be in
                touch shortly.
              </p>
            </div>
          </FadeIn>
        ) : (
          <form
            id={FORM_ID}
            onSubmit={onSubmit}
            noValidate
            className="space-y-6 rounded-lg border border-white/10 bg-white/5 p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={!!errors.firstName}>
                <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  aria-invalid={!!errors.firstName}
                  {...register("firstName")}
                />
                <FieldError errors={[errors.firstName]} />
              </Field>
              <Field data-invalid={!!errors.lastName}>
                <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  aria-invalid={!!errors.lastName}
                  {...register("lastName")}
                />
                <FieldError errors={[errors.lastName]} />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email Address</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                <FieldError errors={[errors.email]} />
              </Field>
              <Field data-invalid={!!errors.phone}>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  {...register("phone")}
                />
                <FieldError errors={[errors.phone]} />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={!!errors.vehicleMake}>
                <FieldLabel htmlFor="vehicleMake">Vehicle Make</FieldLabel>
                <Input
                  id="vehicleMake"
                  placeholder="e.g. Porsche"
                  aria-invalid={!!errors.vehicleMake}
                  {...register("vehicleMake")}
                />
                <FieldError errors={[errors.vehicleMake]} />
              </Field>
              <Field data-invalid={!!errors.vehicleModel}>
                <FieldLabel htmlFor="vehicleModel">Vehicle Model</FieldLabel>
                <Input
                  id="vehicleModel"
                  placeholder="e.g. 911"
                  aria-invalid={!!errors.vehicleModel}
                  {...register("vehicleModel")}
                />
                <FieldError errors={[errors.vehicleModel]} />
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="message">
                Message{" "}
                <span className="text-muted-foreground">(optional)</span>
              </FieldLabel>
              <Textarea
                id="message"
                rows={4}
                placeholder="Tell us more about what you're looking for..."
                {...register("message")}
              />
            </Field>

            <Field
              orientation="horizontal"
              data-invalid={!!errors.consent}
            >
              <Controller
                control={control}
                name="consent"
                render={({ field }) => (
                  <Checkbox
                    id="consent"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <FieldLabel htmlFor="consent" className="font-serif text-sm text-muted">
                I have read and agree to the{" "}
                <Link href="/privacy-policy" className="text-rosso underline">
                  Privacy Policy
                </Link>
              </FieldLabel>
            </Field>
            <FieldError errors={[errors.consent]} />

            <Button
              type="submit"
              form={FORM_ID}
              disabled={loading}
              className="w-full shrink-0"
            >
              {loading && <Loader2 className="size-4 animate-spin" />}
              Submit
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
