/**
 * Suggested gifts on downloads (James, 2026-11-22): the ebooks and the
 * printables are how the work is supported. Each download carries a suggested
 * gift, filled in, that the reader can change or skip ("Download without
 * giving"). No one is blocked; the files stay at their plain addresses.
 *
 * ONE DATA FILE for the page and for both runtimes (server/giving-router.ts
 * in dev, the "giving.createDownloadCheckout" case of api/index.ts in
 * production): the suggested amount for each kind of download and for each
 * item that differs from its kind, the one check a download gift passes, and
 * the Stripe Checkout request built from it. No imports and no secrets.
 *
 * A download is named by an id, "<kind>:<slug>", never by a file path: the
 * server looks the id up in shared/download-items.json (written by
 * scripts/build-download-items.mjs from the site's own libraries) and takes
 * nothing else from the page but the amount.
 *
 * THE LADDER, and why:
 *   $8.99  a full book (350 pages or more, and the three shelf books)
 *   $6.99  a shorter book (about 260 pages)
 *   $5.99  a short book (about 200 pages)
 *   $4.99  a workbook for a couple or a group (18 to 28 pages, used over weeks)
 *   $3.99  a booklet for church leaders (about 40 pages)
 *   $2.99  a study guide (leader's guide and handout together, one ask), an
 *          eight-week plan booklet, the Advent family booklet (26 pages)
 *   $1.99  anything short: a context guide, a worksheet, a card set, a Bible
 *          reading plan, a family booklet, a reading path, a care page's set
 * Nothing is suggested below $1.99: Stripe keeps 30 cents and 2.9 percent of
 * each payment, which is a third of a 99-cent gift, and the least a gift can
 * be is $1 (GIFT_MIN_USD in shared/giving.ts).
 *
 * NO ASK IN THE HARD PLACES. The Find Help printables, the care plans and the
 * worksheets written for grief and for abuse download at once, with no sheet
 * in the way (CLAUDE.md, "Care for the reader in the hard places"). They keep
 * a suggested amount here, so turning the ask on for them is `ask: true`.
 */

export type DownloadKind =
  | "ebook"
  | "study-guide"
  | "context-guide"
  | "care-page"
  | "care-plan"
  | "worksheet"
  | "card-set"
  | "workbook"
  | "reading-plan"
  | "family"
  | "reading-path";

export interface DownloadKindFacts {
  /** What the sheet calls it: "this study guide". */
  noun: string;
  /** Suggested gift, US cents. */
  suggestedCents: number;
  /** False: this kind downloads at once, with no sheet. */
  ask: boolean;
}

export const DOWNLOAD_KINDS: Record<DownloadKind, DownloadKindFacts> = {
  ebook: { noun: "book", suggestedCents: 899, ask: true },
  "study-guide": { noun: "study guide", suggestedCents: 299, ask: true },
  "context-guide": { noun: "guide", suggestedCents: 199, ask: true },
  "care-page": { noun: "set of printables", suggestedCents: 199, ask: false },
  "care-plan": { noun: "plan", suggestedCents: 299, ask: false },
  worksheet: { noun: "worksheet", suggestedCents: 199, ask: true },
  "card-set": { noun: "card set", suggestedCents: 199, ask: true },
  workbook: { noun: "workbook", suggestedCents: 499, ask: true },
  "reading-plan": { noun: "reading plan", suggestedCents: 199, ask: true },
  family: { noun: "family booklet", suggestedCents: 199, ask: true },
  "reading-path": { noun: "reading path", suggestedCents: 199, ask: true },
};

/** Items whose suggested gift is not their kind's. Ebooks are named by their folder under /ebook/. */
export const ITEM_SUGGESTED_CENTS: Record<string, number> = {
  "ebook:the-reliability-of-scripture": 699,
  "ebook:bible-and-homosexuality": 599,
  "ebook:bible-and-transgender-identity": 599,
  "ebook:critical-race-theory-biblical": 599,
  "ebook:deacon-qualifications": 399,
  "ebook:church-governance": 399,
  "ebook:change-without-casualties": 399,
  "family:advent": 299,
};

/** Items that never raise the sheet, whatever their kind: written for grief and for abuse. */
export const NO_ASK_ITEMS: readonly string[] = [
  "worksheet:grief-journal",
  "worksheet:holidays-after-loss",
  "worksheet:first-response",
  "worksheet:referral-list",
  "worksheet:conflict-guide",
];

/** At or under this, an ask is "small": once a reader has been asked for one small thing today, no other small thing asks. */
export const SMALL_ASK_CENTS = 199;

export const DOWNLOAD_GIFT_MIN_CENTS = 100;
export const DOWNLOAD_GIFT_MAX_CENTS = 500000;

const KIND_NAMES = Object.keys(DOWNLOAD_KINDS) as DownloadKind[];
const SLUG = "[a-z0-9][a-z0-9-]*";

/** The two card sets live beside the worksheets under /downloads/tools/. */
const CARD_SETS = new Set(["memory-cards", "family-cards"]);

/**
 * The download a file address belongs to, or null when the address is not a
 * download this site offers. Several files are one download: a study guide's
 * leader's guide and handout, a printable's Letter and A4.
 */
export function downloadIdForHref(href: string): string | null {
  const path = href.replace(/^https?:\/\/[^/]+/, "").replace(/[?#].*$/, "");
  let m: RegExpMatchArray | null;
  if ((m = path.match(new RegExp(`^/ebook/(${SLUG})/[A-Za-z0-9-]+\\.(?:pdf|epub)$`)))) return `ebook:${m[1]}`;
  if ((m = path.match(new RegExp(`^/downloads/studyguides/(${SLUG})-(?:leader|participant)\\.pdf$`)))) return `study-guide:${m[1]}`;
  if ((m = path.match(new RegExp(`^/downloads/context/(${SLUG})\\.pdf$`)))) return `context-guide:${m[1]}`;
  if ((m = path.match(new RegExp(`^/downloads/help/(${SLUG})-(?:guide|prayer|scripture|week)-(?:letter|a4)\\.pdf$`)))) return `care-page:${m[1]}`;
  if ((m = path.match(new RegExp(`^/downloads/plans/(${SLUG})-booklet-(?:letter|a4)\\.pdf$`)))) return `care-plan:${m[1]}`;
  if ((m = path.match(new RegExp(`^/downloads/tools/(${SLUG})-(?:letter|a4)\\.pdf$`)))) return `${CARD_SETS.has(m[1]) ? "card-set" : "worksheet"}:${m[1]}`;
  if ((m = path.match(new RegExp(`^/downloads/workbooks/(${SLUG})-(?:letter|a4)\\.pdf$`)))) return `workbook:${m[1]}`;
  if ((m = path.match(new RegExp(`^/downloads/reading-plans/(${SLUG})-(?:letter|a4)\\.pdf$`)))) return `reading-plan:${m[1]}`;
  if ((m = path.match(new RegExp(`^/downloads/seasonal/(${SLUG})-family-(?:letter|a4)\\.pdf$`)))) return `family:${m[1]}`;
  if ((m = path.match(new RegExp(`^/downloads/reading-paths/(${SLUG})\\.pdf$`)))) return `reading-path:${m[1]}`;
  return null;
}

/** "study-guide:lament" → "study-guide", or null for an id of no known kind. */
export function downloadKind(id: string): DownloadKind | null {
  const kind = id.slice(0, id.indexOf(":"));
  return (KIND_NAMES as string[]).includes(kind) ? (kind as DownloadKind) : null;
}

/** The suggested gift for a download, US cents. 0 for an id of no known kind. */
export function suggestedCents(id: string): number {
  const kind = downloadKind(id);
  if (!kind) return 0;
  return ITEM_SUGGESTED_CENTS[id] ?? DOWNLOAD_KINDS[kind].suggestedCents;
}

/** Whether a download raises the sheet at all. */
export function asksForGift(id: string): boolean {
  const kind = downloadKind(id);
  return kind !== null && DOWNLOAD_KINDS[kind].ask && !NO_ASK_ITEMS.includes(id);
}

export function isSmallAsk(id: string): boolean {
  return suggestedCents(id) <= SMALL_ASK_CENTS;
}

/** "$8.99", "$5", "$1,250". */
export function formatUsd(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toLocaleString("en-US", { minimumFractionDigits: cents % 100 === 0 ? 0 : 2, maximumFractionDigits: 2 })}`;
}

/** The amounts the sheet offers beside the suggested one: one below it, two above. */
export function giftPresetsCents(suggested: number): number[] {
  const ladder: [number, number[]][] = [
    [199, [100, 199, 300, 500]],
    [299, [200, 299, 500, 1000]],
    [399, [200, 399, 700, 1200]],
    [499, [300, 499, 800, 1500]],
    [599, [300, 599, 1000, 2000]],
    [699, [400, 699, 1200, 2000]],
    [899, [500, 899, 1500, 2500]],
  ];
  const row = ladder.find(([at]) => suggested <= at) ?? ladder[ladder.length - 1];
  return row[1].map((n) => (n === row[0] ? suggested : n));
}

/** "12.50" or "$12.5" or "12" → cents, or null when it is not an amount of money. */
export function parseUsdToCents(text: string): number | null {
  const t = text.trim().replace(/^\$/, "").replace(/,/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(t)) return null;
  return Math.round(Number(t) * 100);
}

export interface DownloadGift {
  itemId: string;
  /** The download's title, from shared/download-items.json. */
  title: string;
  /** US cents. */
  amountCents: number;
}

export type DownloadGiftCheck = { ok: true; gift: DownloadGift } | { ok: false; error: string };

/**
 * The one check. `items` is shared/download-items.json (id → title): an id
 * that is not in it is refused, so nothing the page sends can name a file.
 */
export function checkDownloadGift(input: unknown, items: Record<string, string>): DownloadGiftCheck {
  const raw = (input ?? {}) as { itemId?: unknown; amountCents?: unknown };
  const itemId = raw.itemId;
  if (typeof itemId !== "string" || !Object.prototype.hasOwnProperty.call(items, itemId) || downloadKind(itemId) === null) {
    return { ok: false, error: "That download is not one this site offers." };
  }
  const amountCents = raw.amountCents;
  if (typeof amountCents !== "number" || !Number.isInteger(amountCents)) {
    return { ok: false, error: "Enter the amount in dollars and cents." };
  }
  if (amountCents < DOWNLOAD_GIFT_MIN_CENTS) {
    return { ok: false, error: `The smallest gift this page takes is ${formatUsd(DOWNLOAD_GIFT_MIN_CENTS)}.` };
  }
  if (amountCents > DOWNLOAD_GIFT_MAX_CENTS) {
    return { ok: false, error: `The largest gift this page takes is ${formatUsd(DOWNLOAD_GIFT_MAX_CENTS)}.` };
  }
  return { ok: true, gift: { itemId, title: items[itemId], amountCents } };
}

/** Where Stripe sends the giver afterwards, both on this site; the page there starts the download. */
export const DOWNLOAD_THANKS_PATH = "/downloads/thanks";

/**
 * The Stripe Checkout request for a checked download gift. `origin` is the
 * site's own address, worked out by the server from the request. The return
 * address names the download by its id, which the server has just looked up;
 * no file path and no address from the page goes into it. Nothing about the
 * giver is sent: Stripe asks for the card and the email on its own page.
 */
export function downloadGiftCheckoutParams(gift: DownloadGift, origin: string) {
  const item = encodeURIComponent(gift.itemId);
  return {
    mode: "payment" as const,
    submit_type: "donate" as const,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: gift.amountCents,
          product_data: { name: `Gift to LiveWell, with ${gift.title}` },
        },
      },
    ],
    metadata: { kind: "download-gift", item: gift.itemId },
    success_url: `${origin}${DOWNLOAD_THANKS_PATH}?item=${item}`,
    cancel_url: `${origin}${DOWNLOAD_THANKS_PATH}?item=${item}&cancelled=1`,
  };
}
