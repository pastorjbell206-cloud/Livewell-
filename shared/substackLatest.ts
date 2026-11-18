/**
 * The newest pieces on James's Substack, as titles, dates and links only.
 *
 * One small, dependency-free module used by both runtimes: the dev tRPC
 * router (server/routers.ts, `substack.latest`) and the production function
 * (api/index.ts, the same procedure). Nothing from a post's body, and no
 * image, ever leaves this file: only { title, url, date }.
 *
 * Every failure (a timeout, a bad status, a feed that will not parse) gives an
 * empty list, which the page answers with one line and a button to Substack.
 * A link that is not an https address on substack.com is dropped.
 */

/**
 * James's Substack feed. NOT YET VERIFIED: the machine this was built on could
 * not reach Substack. If the list on /connect stays empty on the live site,
 * this address is the first thing to check (his Substack address plus /feed).
 */
export const SUBSTACK_FEED_URL = "https://jamesbell333289.substack.com/feed";

export interface SubstackPiece {
  title: string;
  /** An https address on substack.com or one of its subdomains. */
  url: string;
  /** ISO date (YYYY-MM-DD), or "" when the feed gave none we could read. */
  date: string;
}

/** How many pieces the list shows. */
export const SUBSTACK_LIMIT = 5;
/** A slow feed must not hold the page's request open. */
export const SUBSTACK_TIMEOUT_MS = 4000;
/** About an hour between fetches when the feed answered. */
export const SUBSTACK_CACHE_MS = 60 * 60 * 1000;
/** A failed fetch is tried again sooner, but not on every request. */
export const SUBSTACK_RETRY_MS = 5 * 60 * 1000;

const MAX_TITLE = 200;
const MAX_FEED_BYTES = 2_000_000;

/** True only for an https address on substack.com or a subdomain of it. */
export function isSubstackUrl(raw: string): boolean {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return false;
  }
  if (u.protocol !== "https:") return false;
  if (u.username || u.password || u.port) return false;
  const host = u.hostname.toLowerCase();
  return host === "substack.com" || host.endsWith(".substack.com");
}

const NAMED: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

/** Decode the XML and common HTML entities a feed title carries. */
export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (whole, body: string) => {
    if (body[0] === "#") {
      const code = body[1] === "x" || body[1] === "X" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
      if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff) return "";
      try {
        return String.fromCodePoint(code);
      } catch {
        return "";
      }
    }
    return NAMED[body.toLowerCase()] ?? whole;
  });
}

/** The text inside one tag of an <item>, CDATA unwrapped, entities decoded, tags removed. */
function tagText(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  if (!m) return "";
  let s = m[1].trim();
  const cdata = s.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  if (cdata) s = cdata[1];
  // A title may hold markup; keep only its words, then decode them once.
  s = decodeEntities(s.replace(/<[^>]*>/g, ""));
  // Strip control characters a reader should never see.
  // eslint-disable-next-line no-control-regex
  return s.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").replace(/\s+/g, " ").trim();
}

function isoDate(raw: string): string {
  if (!raw) return "";
  const t = Date.parse(raw);
  if (!Number.isFinite(t)) return "";
  return new Date(t).toISOString().slice(0, 10);
}

/**
 * Read an RSS 2.0 feed: each <item>'s <title>, <link> and <pubDate>. Items
 * without a title, or whose link is not on substack.com, are dropped. The
 * result keeps the feed's order (newest first, as Substack sends it), sorted
 * by date where dates exist, and is cut to `limit`.
 */
export function parseSubstackFeed(xml: string, limit = SUBSTACK_LIMIT): SubstackPiece[] {
  if (typeof xml !== "string" || !xml) return [];
  const text = xml.length > MAX_FEED_BYTES ? xml.slice(0, MAX_FEED_BYTES) : xml;
  const out: SubstackPiece[] = [];
  const seen = new Set<string>();
  const re = /<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const block = m[1];
    let title = tagText(block, "title");
    const url = tagText(block, "link");
    if (!title || !url || !isSubstackUrl(url) || seen.has(url)) continue;
    if (title.length > MAX_TITLE) title = title.slice(0, MAX_TITLE - 1).trimEnd() + "…";
    seen.add(url);
    out.push({ title, url, date: isoDate(tagText(block, "pubDate")) });
  }
  // Newest first where the feed gave dates; undated items keep their place at the end.
  const sorted = out
    .map((p, i) => ({ p, i }))
    .sort((a, b) => {
      if (a.p.date && b.p.date) return a.p.date < b.p.date ? 1 : a.p.date > b.p.date ? -1 : a.i - b.i;
      if (a.p.date) return -1;
      if (b.p.date) return 1;
      return a.i - b.i;
    })
    .map((x) => x.p);
  return sorted.slice(0, Math.max(0, limit));
}

type FetchLike = (input: string, init?: { signal?: AbortSignal; headers?: Record<string, string> }) => Promise<{
  ok: boolean;
  text(): Promise<string>;
}>;

/** Fetch the feed once, with a timeout. Any failure gives []. */
export async function fetchSubstackLatest(
  fetchImpl: FetchLike = fetch as unknown as FetchLike,
  feedUrl: string = SUBSTACK_FEED_URL,
  timeoutMs: number = SUBSTACK_TIMEOUT_MS
): Promise<SubstackPiece[]> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetchImpl(feedUrl, {
      signal: ctrl.signal,
      headers: { "User-Agent": "LiveWellSite/1.0", Accept: "application/rss+xml, application/xml, text/xml" },
    });
    if (!r.ok) return [];
    return parseSubstackFeed(await r.text());
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

/**
 * A one-hour cache in front of fetchSubstackLatest. Each runtime keeps its own
 * (one per server process, one per warm serverless instance). A failure is
 * kept for a few minutes only, and never replaces a good list still in hand.
 */
export function createSubstackCache(
  fetchImpl?: FetchLike,
  now: () => number = Date.now
): () => Promise<SubstackPiece[]> {
  let held: { items: SubstackPiece[]; until: number } | null = null;
  let inflight: Promise<SubstackPiece[]> | null = null;
  return async () => {
    const t = now();
    if (held && t < held.until) return held.items;
    if (inflight) return inflight;
    inflight = (async () => {
      const items = await fetchSubstackLatest(fetchImpl);
      if (items.length > 0) held = { items, until: now() + SUBSTACK_CACHE_MS };
      else if (held && held.items.length > 0) held = { items: held.items, until: now() + SUBSTACK_RETRY_MS };
      else held = { items: [], until: now() + SUBSTACK_RETRY_MS };
      return held.items;
    })().finally(() => {
      inflight = null;
    });
    return inflight;
  };
}
