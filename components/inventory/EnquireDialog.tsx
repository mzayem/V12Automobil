"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { createSalesLead } from "@/actions/create-sales-lead";
import { DealerKitError, unwrapDealerKitResult } from "@/lib/dealerkit-error";
import type { CreateSaleLeadPayload } from "@/public/type";

const FORM_ID = "enquire-form";

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

const titleItems = TITLE_OPTIONS.map((value) => ({ label: value, value }));

type PartExchange = NonNullable<CreateSaleLeadPayload["part_exchange"]>;

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
    hasPartExchange: z.boolean(),
    pxRegistration: z.string().optional(),
    pxMileage: z.string().optional(),
    pxServiceHistory: z.string().optional(),
    pxCondition: z.string().optional(),
    pxAppraisedValue: z.string().optional(),
    pxFinanceAmount: z.string().optional(),
    pxFinanceProvider: z.string().optional(),
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
  .refine((data) => !data.hasPartExchange || !!data.pxRegistration?.trim(), {
    message: "Registration is required",
    path: ["pxRegistration"],
  })
  .refine(
    (data) =>
      !data.hasPartExchange ||
      (!!data.pxMileage?.trim() && /^\d+$/.test(data.pxMileage.trim())),
    { message: "Enter a valid mileage", path: ["pxMileage"] },
  )
  .refine((data) => !data.hasMessage || !!data.message?.trim(), {
    message: "Enter your message",
    path: ["message"],
  });

type EnquireFormValues = z.infer<typeof formSchema>;

const defaultValues: EnquireFormValues = {
  title: "Mr",
  firstName: "",
  lastName: "",
  companyName: "",
  email: "",
  telephone: "",
  hasPartExchange: false,
  pxRegistration: "",
  pxMileage: "",
  pxServiceHistory: "None",
  pxCondition: "",
  pxAppraisedValue: "",
  pxFinanceAmount: "",
  pxFinanceProvider: "",
  note: "",
  hasMessage: false,
  message: "",
};

function buildPayload(
  stockListingId: string,
  values: EnquireFormValues,
): CreateSaleLeadPayload {
  return {
    type: "sales",
    stock_listing_id: stockListingId,
    person: {
      title: (values.title ||
        undefined) as CreateSaleLeadPayload["person"]["title"],
      first_name: values.firstName,
      last_name: values.lastName,
      company_name: values.companyName?.trim() || undefined,
      email: values.email?.trim() || undefined,
      telephone: values.telephone?.trim() || undefined,
      marketing_consent: { sms: false, email: false, telephone: false },
      updated_at: new Date().toISOString(),
    },
    part_exchange: values.hasPartExchange
      ? ({
          vrm: values.pxRegistration!.trim(),
          mileage: Number(values.pxMileage),
          service_history: (values.pxServiceHistory ||
            undefined) as PartExchange["service_history"],
          condition: (values.pxCondition ||
            undefined) as PartExchange["condition"],
          appraised_value: values.pxAppraisedValue
            ? Number(values.pxAppraisedValue)
            : undefined,
          outstanding_finance_amount: values.pxFinanceAmount
            ? Number(values.pxFinanceAmount)
            : undefined,
          outstanding_finance_provider:
            values.pxFinanceProvider?.trim() || undefined,
        } satisfies PartExchange)
      : undefined,
    note: values.note?.trim() || undefined,
    message:
      values.hasMessage && values.message?.trim()
        ? { plain: values.message.trim() }
        : undefined,
  };
}

export default function EnquireDialog({
  stockListingId,
  className,
}: {
  stockListingId: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<EnquireFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const hasPartExchange = watch("hasPartExchange");
  const hasMessage = watch("hasMessage");

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      await toast.promise(
        createSalesLead(buildPayload(stockListingId, values)).then(
          unwrapDealerKitResult,
        ),
        {
          loading: "Sending your enquiry...",
          success: () => {
            setOpen(false);
            reset(defaultValues);
            return "Thanks — we've received your enquiry and will be in touch shortly.";
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
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (loading) return;
        setOpen(next);
        if (!next) reset(defaultValues);
      }}
    >
      <DialogTrigger
        render={
          <Button
            className={cn(
              "rounded-lg font-bold text-sm uppercase tracking-[0.2em]",
              className,
            )}
          />
        }
      >
        Book a Viewing
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] w-full max-w-2xl p-6 sm:max-w-3xl">
        <ScrollArea className="max-h-[75vh] overflow-y-auto pr-3">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-display text-lg uppercase tracking-widest text-bianco">
              Book a Viewing
            </DialogTitle>
          </DialogHeader>

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

            <Field orientation="horizontal">
              <Controller
                control={control}
                name="hasPartExchange"
                render={({ field }) => (
                  <Checkbox
                    id="hasPartExchange"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <FieldLabel
                htmlFor="hasPartExchange"
                className="font-serif text-sm text-muted"
              >
                I have a part-exchange vehicle
              </FieldLabel>
            </Field>

            {hasPartExchange && (
              <div className="space-y-4 rounded-lg border border-white/10 p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field data-invalid={!!errors.pxRegistration}>
                    <FieldLabel htmlFor="pxRegistration">
                      Registration Number
                    </FieldLabel>
                    <Input
                      id="pxRegistration"
                      aria-invalid={!!errors.pxRegistration}
                      {...register("pxRegistration")}
                    />
                    <FieldError errors={[errors.pxRegistration]} />
                  </Field>
                  <Field data-invalid={!!errors.pxMileage}>
                    <FieldLabel htmlFor="pxMileage">Mileage</FieldLabel>
                    <Input
                      id="pxMileage"
                      inputMode="numeric"
                      aria-invalid={!!errors.pxMileage}
                      {...register("pxMileage")}
                    />
                    <FieldError errors={[errors.pxMileage]} />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel>Service History</FieldLabel>
                    <Controller
                      control={control}
                      name="pxServiceHistory"
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
                      name="pxCondition"
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

                <div className="grid gap-4 sm:grid-cols-3">
                  <Field>
                    <FieldLabel htmlFor="pxAppraisedValue">
                      Appraised Value
                    </FieldLabel>
                    <Input
                      id="pxAppraisedValue"
                      inputMode="numeric"
                      {...register("pxAppraisedValue")}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="pxFinanceAmount">
                      Outstanding Finance Amount
                    </FieldLabel>
                    <Input
                      id="pxFinanceAmount"
                      inputMode="numeric"
                      {...register("pxFinanceAmount")}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="pxFinanceProvider">
                      Outstanding Finance Provider
                    </FieldLabel>
                    <Input
                      id="pxFinanceProvider"
                      {...register("pxFinanceProvider")}
                    />
                  </Field>
                </div>
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
              Send Enquiry
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
  );
}
