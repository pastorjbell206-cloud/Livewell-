/**
 * Gifts to LiveWell (/support): the amounts, the one check every gift passes,
 * and the Stripe Checkout request built from a checked gift.
 *
 * One file for the page and for both runtimes (server/giving-router.ts in
 * dev, the "giving.*" cases of api/index.ts in production), so the three
 * cannot disagree about what a gift may be. No imports and no secrets: the
 * Stripe key is read only on the server.
 *
 * A gift is whole US dollars. Given once, it is any amount from GIFT_MIN_USD
 * to GIFT_MAX_USD. Given each month, it is one of the listed amounts. The
 * price is sent inline (`price_data`), so nothing has to be made in the
 * Stripe dashboard first.
 */

export type GiftFrequency = "once" | "monthly";

export interface Gift {
  frequency: GiftFrequency;
  /** Whole US dollars. */
  amountUsd: number;
}

export const GIFT_ONCE_PRESETS_USD = [10, 25, 50, 100] as const;
export const GIFT_MONTHLY_PRESETS_USD = [5, 10, 25, 50] as const;
export const GIFT_MIN_USD = 1;
export const GIFT_MAX_USD = 5000;

/** Said by both runtimes when the switch is off or no Stripe key is set. */
export const GIVING_CLOSED_MESSAGE = "Giving isn't open yet.";

export type GiftCheck = { ok: true; gift: Gift } | { ok: false; error: string };

/** The one check: what the page offers is exactly what the server accepts. */
export function checkGift(input: unknown): GiftCheck {
  const raw = (input ?? {}) as { frequency?: unknown; amountUsd?: unknown };
  const frequency = raw.frequency;
  if (frequency !== "once" && frequency !== "monthly") {
    return { ok: false, error: "Choose a one-time gift or a monthly gift." };
  }
  const amountUsd = raw.amountUsd;
  if (typeof amountUsd !== "number" || !Number.isInteger(amountUsd)) {
    return { ok: false, error: "Enter the amount in whole dollars." };
  }
  if (amountUsd < GIFT_MIN_USD) {
    return { ok: false, error: `The smallest gift this page takes is $${GIFT_MIN_USD}.` };
  }
  if (amountUsd > GIFT_MAX_USD) {
    return { ok: false, error: `The largest gift this page takes is $${GIFT_MAX_USD.toLocaleString("en-US")}.` };
  }
  if (frequency === "monthly" && !(GIFT_MONTHLY_PRESETS_USD as readonly number[]).includes(amountUsd)) {
    return { ok: false, error: "Choose one of the monthly amounts." };
  }
  return { ok: true, gift: { frequency, amountUsd } };
}

/** "A one-time gift of $25" or "A gift of $10 each month". */
export function describeGift(gift: Gift): string {
  const amount = `$${gift.amountUsd.toLocaleString("en-US")}`;
  return gift.frequency === "monthly" ? `A gift of ${amount} each month` : `A one-time gift of ${amount}`;
}

/** Where Stripe sends the giver afterwards, both on this site. */
export const GIFT_THANKS_PATH = "/support/thanks";
export const GIFT_CANCELLED_PATH = "/support?cancelled=1";

/**
 * The Stripe Checkout request for a checked gift. `origin` is the site's own
 * address, worked out by the server from the request, never taken from the
 * page. No email or name is sent: Stripe asks the giver for them on its own
 * page, and nothing about the giver is kept here.
 */
export function giftCheckoutParams(gift: Gift, origin: string) {
  const monthly = gift.frequency === "monthly";
  const base = {
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: gift.amountUsd * 100,
          product_data: { name: monthly ? "Monthly gift to LiveWell" : "Gift to LiveWell" },
          ...(monthly ? { recurring: { interval: "month" as const } } : {}),
        },
      },
    ],
    metadata: { kind: "gift", frequency: gift.frequency },
    success_url: `${origin}${GIFT_THANKS_PATH}`,
    cancel_url: `${origin}${GIFT_CANCELLED_PATH}`,
  };
  return monthly
    ? { ...base, mode: "subscription" as const }
    : { ...base, mode: "payment" as const, submit_type: "donate" as const };
}
