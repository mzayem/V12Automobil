export class DealerKitError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(
    status: number,
    message: string,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "DealerKitError";
    this.status = status;
    this.errors = errors;
  }
}

interface DealerKitErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

const STATUS_FALLBACK_MESSAGE: Record<number, string> = {
  401: "You're not authenticated with DealerKit. Please contact support.",
  403: "You're not authorised to do that. Please contact support.",
  404: "No valuations were found for that vehicle.",
  422: "Some of the details you entered aren't valid.",
};

/** Reads a DealerKit `{ message, errors }` error body and throws a DealerKitError with it. */
export async function throwDealerKitError(response: Response): Promise<never> {
  let body: DealerKitErrorBody | undefined;
  try {
    body = (await response.json()) as DealerKitErrorBody;
  } catch {
    body = undefined;
  }

  const fallback =
    STATUS_FALLBACK_MESSAGE[response.status] ??
    `DealerKit API error (${response.status}). Please try again.`;

  const firstFieldError = body?.errors
    ? Object.values(body.errors)[0]?.[0]
    : undefined;

  const message = body?.message?.trim() || fallback;
  const detail =
    firstFieldError && firstFieldError !== message ? ` ${firstFieldError}` : "";

  throw new DealerKitError(response.status, `${message}${detail}`, body?.errors);
}
