/**
 * One source of truth for the optional PCN donation link, shared by the free
 * resources that invite a gift (the Hard Issues Series, the study guides).
 *
 * Set DONATE_URL to a Stripe "customer chooses amount" payment link
 * (https://donate.stripe.com/... or https://buy.stripe.com/...). While it is
 * empty, every donate affordance falls back to a mailto so the invitation
 * still works and nothing breaks — the downloads stay free regardless.
 */
export const DONATE_URL = "https://donate.stripe.com/4gM6oH83A3xs7dAfLIa3u09"; // live PCN choose-your-amount link

export const donateActive = DONATE_URL.startsWith("https://");

export const DONATE_HREF = donateActive
  ? DONATE_URL
  : "mailto:Pastorjbell206@gmail.com?subject=Supporting%20the%20work%20(PCN)";

/** Short, voice-appropriate invitation. Free either way; a gift trains pastors. */
export const DONATE_BLURB =
  "This is free, and it stays free. If it helped you, a gift supports the work of training pastors — including those leading churches in remote and under-resourced places.";
