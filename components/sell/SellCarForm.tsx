"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { Check, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FadeIn } from "@/components/motion/Reveal";
import PlateValuationForm from "./PlateValuationForm";
import { createBuyLead } from "@/actions/create-buy-lead";
import { DealerKitError, unwrapDealerKitResult } from "@/lib/dealerkit-error";
import type { CreateBuyLeadPayload, ValuationResponse } from "@/public/type";

const FORM_ID = "sell-car-form";

const TITLE_OPTIONS = [
  "Mr",
  "Mrs",
  "Ms",
  "Mx",
  "Master",
  "Miss",
  "Dr",
  "Prof",
  "Dame",
  "Sir",
  "Lord",
  "Lady",
  "Rev",
] as const;

const titleItems = TITLE_OPTIONS.map((value) => ({ label: value, value }));

const SERVICE_HISTORY_OPTIONS = [
  { value: "none", label: "None" },
  { value: "partial", label: "Partial" },
  { value: "full", label: "Full" },
  { value: "full_main_dealer", label: "Full (Main Dealer)" },
] as const;

const CONDITION_OPTIONS = [
  { value: "poor", label: "Poor" },
  { value: "average", label: "Average" },
  { value: "good", label: "Good" },
  { value: "excellent", label: "Excellent" },
] as const;

type Vehicle = CreateBuyLeadPayload["vehicle"];

// Every numeric/enum field is kept as a string, matching what the underlying
// <input>/<select> elements actually hold — values are parsed and dropped
// into the DealerKit payload shape only after validation passes.
const formSchema = z
  .object({
    title: z.string().optional(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    companyName: z.string().optional(),
    email: z.string().optional(),
    telephone: z.string().optional(),
    serviceHistory: z.string().optional(),
    condition: z.string().optional(),
    hasFinance: z.boolean(),
    financeAmount: z.string().optional(),
    financeProvider: z.string().optional(),
    note: z.string().optional(),
    hasMessage: z.boolean(),
    message: z.string().optional(),
  })
  .refine((data) => !!data.email?.trim() || !!data.telephone?.trim(), {
    message: "Provide an email or a telephone number",
    path: ["telephone"],
  })
  .refine(
    (data) => !data.email?.trim() || z.email().safeParse(data.email).success,
    { message: "Enter a valid email", path: ["email"] },
  )
  .refine(
    (data) =>
      !data.hasFinance ||
      (!!data.financeAmount?.trim() && /^\d+$/.test(data.financeAmount.trim())),
    { message: "Enter a valid amount", path: ["financeAmount"] },
  )
  .refine((data) => !data.hasMessage || !!data.message?.trim(), {
    message: "Enter your message",
    path: ["message"],
  });

type SellDetailsValues = z.infer<typeof formSchema>;

const defaultValues: SellDetailsValues = {
  title: "Mr",
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  telephone: "",
  serviceHistory: "none",
  condition: "",
  hasFinance: false,
  financeAmount: "",
  financeProvider: "",
  note: "",
  hasMessage: false,
  message: "",
};

function buildPayload(
  vehicle: { vrm: string; mileage: number; appraisedValue?: number },
  values: SellDetailsValues,
): CreateBuyLeadPayload {
  return {
    type: "buying",
    person: {
      title: (values.title ||
        undefined) as CreateBuyLeadPayload["person"]["title"],
      first_name: values.firstName,
      last_name: values.lastName,
      company_name: values.companyName?.trim() || undefined,
      email: values.email?.trim() || undefined,
      telephone: values.telephone?.trim() || undefined,
      marketing_consent: { sms: false, email: false, telephone: false },
      updated_at: new Date().toISOString(),
    },
    vehicle: {
      vrm: vehicle.vrm,
      mileage: vehicle.mileage,
      service_history: (values.serviceHistory ||
        undefined) as Vehicle["service_history"],
      condition: (values.condition || undefined) as Vehicle["condition"],
      appraised_value: vehicle.appraisedValue,
      outstanding_finance_amount:
        values.hasFinance && values.financeAmount
          ? Number(values.financeAmount)
          : undefined,
      outstanding_finance_provider: values.hasFinance
        ? values.financeProvider?.trim() || undefined
        : undefined,
    },
    note: values.note?.trim() || undefined,
    message:
      values.hasMessage && values.message?.trim()
        ? { plain: values.message.trim() }
        : undefined,
  };
}

export default function SellCarForm() {
  const [open, setOpen] = useState(false);
  const [valuation, setValuation] = useState<ValuationResponse | null>(null);
  const [vehicle, setVehicle] = useState<{
    vrm: string;
    mileage: number;
  } | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<SellDetailsValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const hasFinance = watch("hasFinance");
  const hasMessage = watch("hasMessage");

  const handleValuation = (
    result: ValuationResponse,
    vrm: string,
    mileage: number,
  ) => {
    setValuation(result);
    setVehicle({ vrm, mileage });
    setOpen(true);
  };

  const onSubmit = handleSubmit(async (values) => {
    if (!vehicle) return;
    setLoading(true);
    try {
      await toast.promise(
        createBuyLead(
          buildPayload(
            { ...vehicle, appraisedValue: valuation?.data.valuation.retail },
            values,
          ),
        ).then(unwrapDealerKitResult),
        {
          loading: "Sending your details...",
          success: () => {
            setOpen(false);
            setSent(true);
            reset(defaultValues);
            return "Thanks — we've received your details and will be in touch shortly.";
          },
          error: (error) =>
            error instanceof DealerKitError
              ? error.message
              : "Something went wrong. Please try again.",
        },
      );
    } catch {
    } finally {
      setLoading(false);
    }
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
      <div className="absolute inset-0 bg-linear-to-b from-night via-night/70 to-night" />

      <div className="relative mx-auto max-w-3xl px-6">
        <FadeIn>
          <p className="eyebrow mb-3 text-center">Free Instant Valuation</p>
          <h2 className="font-display mb-4 text-center text-3xl text-bianco sm:text-4xl">
            TIME TO CHANGE YOUR CAR?
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-center font-serif text-base leading-relaxed text-bianco/85">
            Enter your registration number below for an instant, no-obligation
            valuation — then share a few details and our team will be in touch
            with a bespoke offer.
          </p>
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
          <PlateValuationForm onValuation={handleValuation} />
        )}
      </div>

      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (loading) return;
          setOpen(next);
          if (!next) {
            reset(defaultValues);
            setVehicle(null);
            setValuation(null);
          }
        }}
      >
        <DialogContent className="max-h-[85vh] w-full max-w-2xl p-6 sm:max-w-3xl">
          <ScrollArea className="max-h-[75vh] overflow-y-auto pr-3">
            <DialogHeader className="mb-4">
              <DialogTitle className="font-display text-lg uppercase tracking-widest text-bianco">
                Complete Your Details
              </DialogTitle>
            </DialogHeader>

            {valuation && vehicle && (
              <div className="mb-6 rounded-lg border border-rosso/40 bg-white/5 p-6 text-center">
                <p className="font-serif text-sm uppercase tracking-widest text-muted-foreground">
                  {valuation.data.vehicle.manufacturer}{" "}
                  {valuation.data.vehicle.model}{" "}
                  {valuation.data.vehicle.derivative}
                </p>
                <p className="font-display mt-2 text-3xl text-rosso">
                  Est. £{valuation.data.valuation.retail.toLocaleString()}
                </p>
                <p className="mt-1 font-serif text-xs text-muted-foreground">
                  Estimated retail value for {vehicle.vrm} &middot;{" "}
                  {vehicle.mileage.toLocaleString()} mi
                </p>
                <p className="mt-3 font-serif text-xs italic text-muted-foreground">
                  This is an indicative estimate, not a final offer — your
                  actual offer will be confirmed after a full vehicle
                  inspection.
                </p>
              </div>
            )}

            <form
              id={FORM_ID}
              onSubmit={onSubmit}
              noValidate
              className="space-y-6 px-1 py-1"
            >
              <div className="grid gap-4 sm:grid-cols-[7rem_1fr_1fr]">
                <Field data-invalid={!!errors.title}>
                  <FieldLabel>Title</FieldLabel>
                  <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <Select
                        items={titleItems}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Title" />
                        </SelectTrigger>
                        <SelectContent>
                          {titleItems.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
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

              <Field data-invalid={!!errors.companyName}>
                <FieldLabel htmlFor="companyName">
                  Company Name{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </FieldLabel>
                <Input
                  id="companyName"
                  autoComplete="organization"
                  {...register("companyName")}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email">
                    Email{" "}
                    <span className="text-muted-foreground">
                      (required without telephone)
                    </span>
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  <FieldError errors={[errors.email]} />
                </Field>
                <Field data-invalid={!!errors.telephone}>
                  <FieldLabel htmlFor="telephone">
                    Telephone{" "}
                    <span className="text-muted-foreground">
                      (required without email)
                    </span>
                  </FieldLabel>
                  <Input
                    id="telephone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={!!errors.telephone}
                    {...register("telephone")}
                  />
                  <FieldError errors={[errors.telephone]} />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>Service History</FieldLabel>
                  <Controller
                    control={control}
                    name="serviceHistory"
                    render={({ field }) => (
                      <Select
                        items={SERVICE_HISTORY_OPTIONS}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_HISTORY_OPTIONS.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
                <Field>
                  <FieldLabel>Condition</FieldLabel>
                  <Controller
                    control={control}
                    name="condition"
                    render={({ field }) => (
                      <Select
                        items={CONDITION_OPTIONS}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONDITION_OPTIONS.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
              </div>

              <Field orientation="horizontal">
                <Controller
                  control={control}
                  name="hasFinance"
                  render={({ field }) => (
                    <Checkbox
                      id="hasFinance"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <FieldLabel
                  htmlFor="hasFinance"
                  className="font-serif text-sm text-muted"
                >
                  There is outstanding finance on this vehicle
                </FieldLabel>
              </Field>

              {hasFinance && (
                <div className="grid gap-4 rounded-lg border border-white/10 p-4 sm:grid-cols-2">
                  <Field data-invalid={!!errors.financeAmount}>
                    <FieldLabel htmlFor="financeAmount">
                      Outstanding Finance Amount
                    </FieldLabel>
                    <Input
                      id="financeAmount"
                      inputMode="numeric"
                      aria-invalid={!!errors.financeAmount}
                      {...register("financeAmount")}
                    />
                    <FieldError errors={[errors.financeAmount]} />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="financeProvider">
                      Outstanding Finance Provider
                    </FieldLabel>
                    <Input
                      id="financeProvider"
                      {...register("financeProvider")}
                    />
                  </Field>
                </div>
              )}

              <Field>
                <FieldLabel htmlFor="note">
                  Note <span className="text-muted-foreground">(optional)</span>
                </FieldLabel>
                <Input id="note" {...register("note")} />
              </Field>

              <Field orientation="horizontal">
                <Controller
                  control={control}
                  name="hasMessage"
                  render={({ field }) => (
                    <Checkbox
                      id="hasMessage"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <FieldLabel
                  htmlFor="hasMessage"
                  className="font-serif text-sm text-muted"
                >
                  Add a message
                </FieldLabel>
              </Field>

              {hasMessage && (
                <Field data-invalid={!!errors.message}>
                  <FieldLabel htmlFor="message">Message</FieldLabel>
                  <Textarea
                    id="message"
                    rows={4}
                    aria-invalid={!!errors.message}
                    {...register("message")}
                  />
                  <FieldError errors={[errors.message]} />
                </Field>
              )}
              <Button
                type="submit"
                form={FORM_ID}
                disabled={loading}
                className="w-full shrink-0"
              >
                Send Details
              </Button>
            </form>
          </ScrollArea>

          {loading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-night/80 backdrop-blur-sm">
              <Loader2 className="size-8 animate-spin text-bianco" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
