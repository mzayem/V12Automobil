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

/**
 * Plain, serializable result for a DealerKit call. Server Actions must
 * *return* expected errors like this rather than throw them — a thrown
 * DealerKitError loses its class identity crossing the server/client
 * boundary (it arrives as a generic Error), so `instanceof` checks on the
 * client would silently fail.
 */
export type DealerKitResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      status: number;
      message: string;
      errors?: Record<string, string[]>;
    };

const VALUATION_STATUS_MESSAGE: Record<number, string> = {
  401: "You're not authenticated with DealerKit. Please contact support.",
  403: "You're not authorised to do that. Please contact support.",
  404: "No valuation was found for that registration.",
};

/**
 * DealerKit's `/valuations` endpoint returns bare status codes on error —
 * no JSON body to parse — so this just maps the status to a message. Call
 * this from a Server Action and `return` it — do not throw it.
 */
export async function readValuationError<T = never>(
  response: Response,
): Promise<DealerKitResult<T>> {
  const message =
    VALUATION_STATUS_MESSAGE[response.status] ??
    `DealerKit API error (${response.status}). Please try again.`;

  return { ok: false, status: response.status, message };
}

interface DealerKitErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

const LEAD_STATUS_FALLBACK: Record<number, string> = {
  401: "You're not authenticated with DealerKit. Please contact support.",
  403: "You're not authorised to do that. Please contact support.",
  422: "Some of the details you entered aren't valid.",
};

/**
 * DealerKit's `/leads` endpoint returns a `{ message, errors }` body on
 * error (401/403/422). Call this from a Server Action and `return` it —
 * do not throw it.
 */
export async function readLeadError<T = never>(
  response: Response,
): Promise<DealerKitResult<T>> {
  let body: DealerKitErrorBody | undefined;
  try {
    body = (await response.json()) as DealerKitErrorBody;
  } catch {
    body = undefined;
  }

  const fallback =
    LEAD_STATUS_FALLBACK[response.status] ??
    `DealerKit API error (${response.status}). Please try again.`;

  const firstFieldError = body?.errors
    ? Object.values(body.errors)[0]?.[0]
    : undefined;

  const message = body?.message?.trim() || fallback;
  const detail =
    firstFieldError && firstFieldError !== message ? ` ${firstFieldError}` : "";

  return {
    ok: false,
    status: response.status,
    message: `${message}${detail}`,
    errors: body?.errors,
  };
}

/** Client-side only: unwraps a DealerKitResult, throwing a real DealerKitError instance for a failed result. Safe to use with `instanceof` since the throw never crosses the server boundary. */
export function unwrapDealerKitResult<T>(result: DealerKitResult<T>): T {
  if (!result.ok) {
    throw new DealerKitError(result.status, result.message, result.errors);
  }
  return result.data;
}
