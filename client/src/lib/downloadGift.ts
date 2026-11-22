/**
 * Suggested gifts on downloads, the reader's side (James, 2026-11-22).
 *
 * HELD BEHIND THE GIVING SWITCH. While client/src/lib/giving.json is
 * `open: false`, or the server has no Stripe key, nothing here runs: every
 * download link is the plain link it always was. docs/work/elite/bookshelf.md
 * says how it opens.
 *
 * When it is open, a download raises a small sheet once: the suggested gift,
 * filled in, and beneath it "Download without giving". This file holds what
 * the device remembers so the sheet does not nag:
 *
 *   - a download that has raised the sheet today does not raise it again;
 *   - once any small thing (a worksheet, a card set, a family booklet) has
 *     raised it today, no other small thing does: a parent printing tonight's
 *     devotion is asked at most once a day, and is always two taps from the
 *     file;
 *   - the download a reader was fetching when they went to give, so the
 *     thank-you page can start it.
 */
import { GIVING } from "@/lib/giving";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";
import { trpc } from "@/lib/trpc";
import { asksForGift, downloadIdForHref, isSmallAsk } from "@shared/downloads";

export const ASKED_KEY = "livewell-gift-asked-v1";
export const PENDING_KEY = "livewell-gift-pending-v1";

interface Asked {
  /** The reader's own date, YYYY-MM-DD. */
  day: string;
  items: string[];
  small: boolean;
}

export interface PendingDownload {
  itemId: string;
  href: string;
  title: string;
}

const isAsked = (x: unknown): x is Asked =>
  typeof x === "object" && x !== null && typeof (x as Asked).day === "string" && Array.isArray((x as Asked).items) && (x as Asked).items.every((i) => typeof i === "string") && typeof (x as Asked).small === "boolean";

const isPending = (x: unknown): x is PendingDownload =>
  typeof x === "object" && x !== null && typeof (x as PendingDownload).itemId === "string" && typeof (x as PendingDownload).href === "string" && typeof (x as PendingDownload).title === "string";

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// A private window may refuse storage; the page then remembers for as long as it is open.
let inMemory: Asked | null = null;

function askedToday(): Asked {
  const fresh: Asked = { day: today(), items: [], small: false };
  const stored = readStoredJSON(ASKED_KEY, isAsked, inMemory ?? fresh);
  return stored.day === fresh.day ? stored : fresh;
}

/** Whether this download should raise the sheet now. */
export function shouldAsk(itemId: string): boolean {
  if (!asksForGift(itemId)) return false;
  const asked = askedToday();
  if (asked.items.includes(itemId)) return false;
  if (isSmallAsk(itemId) && asked.small) return false;
  return true;
}

/** Remember that the sheet was raised for this download today. */
export function markAsked(itemId: string): void {
  const asked = askedToday();
  const next: Asked = { day: asked.day, items: asked.items.includes(itemId) ? asked.items : [...asked.items, itemId], small: asked.small || isSmallAsk(itemId) };
  inMemory = next;
  writeStoredJSON(ASKED_KEY, next);
}

/** For tests: forget what this page remembers. */
export function forgetAsked(): void {
  inMemory = null;
  removeStoredJSON(ASKED_KEY);
}

/** A file address is safe to hand back to the reader only if it is one of this site's own downloads for that item. */
export function isDownloadOf(href: string, itemId: string): boolean {
  return href.startsWith("/") && !href.startsWith("//") && downloadIdForHref(href) === itemId;
}

export function rememberPending(pending: PendingDownload): void {
  writeStoredJSON(PENDING_KEY, pending);
}

/** The download the reader was fetching when they went to give, if it is this item's. */
export function pendingFor(itemId: string): PendingDownload | null {
  const pending = readStoredJSON<PendingDownload | null>(PENDING_KEY, (x): x is PendingDownload | null => x === null || isPending(x), null);
  return pending && pending.itemId === itemId && isDownloadOf(pending.href, itemId) ? pending : null;
}

export function clearPending(): void {
  removeStoredJSON(PENDING_KEY);
}

/**
 * True only when a gift can really be started: the switch is on and the
 * server has a Stripe key. While the switch is off the server is never asked.
 */
export function useGivingOpen(switchOn: boolean = GIVING.open): boolean {
  const status = trpc.giving.status.useQuery(undefined, { enabled: switchOn, staleTime: 60_000 });
  return switchOn && status.data?.open === true;
}
