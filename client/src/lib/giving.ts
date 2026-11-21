/**
 * The Support page's held facts and its place on the map.
 *
 * James, 2026-11-21: "let's do the Bible Project way" (everything free,
 * supporters give), "gifts go to keep the work going", and, asked who
 * receives them, "gifts go to me personally." So a gift goes to James Bell
 * personally and is not tax-deductible. What is still outstanding is the
 * payment account: until the Stripe key is set in Vercel and the switch is
 * turned, the page is built and HELD.
 *
 * The facts live in giving.json, beside this file, so the build scripts
 * (scripts/lib/giving.mjs) and the production function (api/index.ts) read
 * the same switch the page does:
 *
 *   open           false: held. Not in any menu, noindex, out of the sitemap,
 *                  the search index and llms.txt, the give button disabled,
 *                  and both runtimes refuse to start a gift.
 *                  true: published. All of the above reversed.
 *   recipientLine  who receives a gift, in one sentence.
 *   taxLine        whether a gift is tax-deductible, in one sentence.
 *
 * docs/work/elite/giving.md says exactly how to open it.
 */
import facts from "./giving.json";
import type { Room } from "./siteCatalog";

export interface GivingFacts {
  open: boolean;
  recipientLine: string;
  taxLine: string;
}

export const GIVING: GivingFacts = { open: facts.open === true, recipientLine: facts.recipientLine, taxLine: facts.taxLine };

/** The note at the top of the page while it is held. */
export const HELD_NOTE = "Not yet open: giving opens when the payment account is connected.";

/** On the page in both states. */
export const ADVICE_LINE = "Nothing on this page is tax or financial advice.";

export const SUPPORT_PATH = "/support";

/** The page's one name and line, wherever it is offered once it is open. */
export const SUPPORT_ROOM: Room = { id: "about.support", name: "Support this work", line: "Help keep LiveWell free for everyone.", href: SUPPORT_PATH, icon: "HeartHandshake" };

/** The About door's sixth room while giving is open; nothing while it is held. */
export function supportRooms(open: boolean): Room[] {
  return open ? [SUPPORT_ROOM] : [];
}

/** True when a line is empty or still an unfilled template ("[NAME]"): the page must not open on one. */
export function isPlaceholderLine(line: string): boolean {
  return /not been confirmed|\[|\]/i.test(line) || line.trim().length === 0;
}
