/**
 * Everything James does, in one list: LiveWell itself, then each of his other
 * works with one plain line, the address that opens it, and the picture it
 * hangs under. /connect ("Find James") draws a card for each; /about draws the
 * same list as one compact row (components/WorksRow.tsx).
 *
 * Every outside address comes from lib/channels.ts (a channel that is not
 * live drops out here too); the books, speaking and contact are pages on this
 * site. Nothing here is fetched from or embedded out of Facebook or Substack.
 *
 * Kept true on purpose:
 * - The Following the Way podcast is off the site for now (James,
 *   2026-11-18): it has no address yet.
 * - ENDS's line says only what endsinitiative.org said when it was read on
 *   2026-11-18 (endsWork below).
 * - The church has no verified web address, so it has no card.
 */
import type { LucideIcon } from "lucide-react";
import { Globe, House, Library, Mail, MessageCircle, Mic, Newspaper } from "lucide-react";
import type { PlateName } from "@/components/art/Plate";
import { channelUrl, liveChannels } from "@/lib/channels";

export interface Work {
  id: string;
  /** The name a reader knows it by. */
  name: string;
  /** One plain line: what it is. */
  line: string;
  /** Where the button goes. */
  href: string;
  /** The button's words. */
  action: string;
  /** true: another site, opened in a new tab. */
  external: boolean;
  /** For an outside address: the site's name as a reader sees it in the bar. */
  host?: string;
  plate: PlateName;
  icon: LucideIcon;
}

/** LiveWell itself: the home and the library, and the wide first card. */
export const LIVEWELL_WORK: Work = {
  id: "livewell",
  name: "LiveWell",
  line: "The Study Bible, church history, hard questions, family devotions, essays and tools. All free, all here.",
  href: "/explore",
  action: "Everything on LiveWell",
  external: false,
  plate: "house",
  icon: House,
};

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** One outside channel as a work, or nothing when channels.ts has no live address for it. */
function channelWork(id: string, w: Omit<Work, "href" | "external" | "host" | "id">): Work[] {
  const url = channelUrl(id);
  if (!url) return [];
  return [{ id, href: url, external: true, host: hostOf(url), ...w }];
}

/** His work that lives at its own address, in the order of the model James was shown. */
export function elsewhereWorks(): Work[] {
  const label = (id: string, fallback: string) => liveChannels().find((c) => c.id === id)?.label ?? fallback;
  return [
    ...channelWork("substack", { name: label("substack", "Substack"), line: "The letter: new writing by email.", action: "Read on Substack", plate: "quill", icon: Newspaper }),
    ...channelWork("facebook", { name: label("facebook", "Facebook"), line: "The front porch: short notes from James.", action: "Follow on Facebook", plate: "lantern", icon: MessageCircle }),
  ];
}

/**
 * ENDS, James's missionary work, as its own card high on /connect. Its line
 * is built only from what endsinitiative.org said on 2026-11-18: it trains
 * local shepherds, sends them out and helps their churches do the same,
 * among the nations, and is seeking to do it in rural America (not yet
 * running there). Only the home page is linked.
 */
export function endsWork(): Work | null {
  const label = liveChannels().find((c) => c.id === "ends")?.label ?? "ENDS (Ends of the Earth Initiative)";
  return (
    channelWork("ends", {
      name: label,
      line: "James founded ENDS. It trains local shepherds, sends them out, and helps the churches they plant do the same. It has done this among the nations, with partners in Thailand and India, and is now seeking to do the same in rural America.",
      action: "Visit ENDS",
      plate: "compass",
      icon: Globe,
    })[0] ?? null
  );
}

/** His books, speaking and contact: pages on this site. */
export const HOME_WORKS: Work[] = [
  { id: "books", name: "Books", line: "The three books he wrote himself.", href: "/books", action: "See the three books", external: false, plate: "books", icon: Library },
  { id: "speaking", name: "Speaking", line: "Ask James to preach or speak.", href: "/speaking", action: "Ask James to speak", external: false, plate: "lectern", icon: Mic },
  { id: "contact", name: "Contact", line: "Send James a message.", href: "/contact", action: "Write to James", external: false, plate: "letter", icon: Mail },
];

/** Every work after LiveWell, in order: ENDS, the other outside ones, then books, speaking, contact. */
export function allWorks(): Work[] {
  const ends = endsWork();
  return [...(ends ? [ends] : []), ...elsewhereWorks(), ...HOME_WORKS];
}
