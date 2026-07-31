"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Car } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { getValuations } from "@/actions/get-valuations";
import { DealerKitError } from "@/lib/dealerkit-error";
import type { ValuationResponse } from "@/public/type";

const formSchema = z.object({
  registration: z
    .string()
    .min(2, "Enter your registration number")
    .max(10, "Enter a valid registration number"),
  mileage: z
    .string()
    .min(1, "Mileage is required")
    .regex(/^\d+$/, "Enter a valid mileage"),
});

type PlateFormValues = z.infer<typeof formSchema>;

const fieldLabelClass =
  "mb-1.5 block text-left text-xs font-bold uppercase tracking-[0.2em] text-bianco/50 sm:text-center";

export default function PlateValuationForm({
  onValuation,
}: {
  onValuation: (
    valuation: ValuationResponse,
    vrm: string,
    mileage: number,
  ) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { registration: "", mileage: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const vrm = values.registration.trim().toUpperCase();
    const mileage = Number(values.mileage);

    await toast.promise(getValuations({ vrm, mileage }), {
      loading: "Looking up your valuation...",
      success: (valuation) => {
        onValuation(valuation, vrm, mileage);
        return "Here's your estimated valuation.";
      },
      error: (error) =>
        error instanceof DealerKitError
          ? error.message
          : "Something went wrong. Please try again.",
    });
  });

  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-lg border border-white/10 bg-linear-to-b from-white/8 to-white/[0.03] p-8 text-center shadow-2xl shadow-black/40 sm:p-11">
      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-rosso" />

      <span className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full border-2 border-rosso text-rosso">
        <Car className="size-6" />
      </span>

      <h2 className="font-display text-2xl text-bianco sm:text-3xl">
        Enter your registration number to see what your car is worth
      </h2>

      <form
        onSubmit={onSubmit}
        noValidate
        className="mt-8 flex flex-col items-center gap-4"
      >
        <div className="w-full sm:max-w-96">
          <label htmlFor="registration" className={fieldLabelClass}>
            Registration Number
          </label>
          <input
            id="registration"
            {...register("registration")}
            type="text"
            placeholder="AB12 CDE"
            aria-invalid={!!errors.registration}
            className="h-14 w-full rounded-md border-2 border-amber-400 bg-[#f5c518] text-center font-display text-xl tracking-[0.15em] text-night uppercase placeholder:text-night/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-rosso/50"
          />
          <FieldError
            errors={[errors.registration]}
            className="mt-2 text-left sm:text-center"
          />
        </div>
        <div className="flex w-full flex-col gap-4 sm:max-w-96 sm:flex-row sm:items-start">
          <div className="flex-1">
            <label htmlFor="mileage" className={fieldLabelClass}>
              Approx. Mileage
            </label>
            <input
              id="mileage"
              {...register("mileage")}
              type="number"
              inputMode="numeric"
              placeholder="e.g. 12,000"
              aria-invalid={!!errors.mileage}
              className="h-14 w-full rounded-md border-2 border-white/15 bg-bianco text-center font-display text-lg text-night placeholder:text-night/40 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-rosso/50"
            />
            <FieldError
              errors={[errors.mileage]}
              className="mt-2 text-left sm:text-center"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-14 w-full shrink-0 px-8 font-display text-sm uppercase tracking-[0.15em] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rosso/25 sm:mt-6 sm:w-auto"
          >
            Get Your Valuation
          </Button>
        </div>
      </form>

      <p className="mt-7 font-serif text-xs tracking-wide text-bianco/50">
        No obligation &middot; Free to use &middot; Results in seconds
      </p>
    </div>
  );
}
