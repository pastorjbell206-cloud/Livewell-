/**
 * posts.listPublished's optional input, and the rule that applies it.
 *
 * /writing used to ask for every published row (about 959 in production) to
 * show a shelf of a few dozen. It now asks for the shelf only: the public shelf
 * essays by slug, and anything that went out at or after the shelf's cutoff
 * (the "Latest" group, posts James adds through the admin). Callers that pass
 * no input get the whole listing, exactly as before.
 *
 * Two runtimes answer this procedure: the dev router (server/routers.ts, which
 * uses this module) and the self-contained production function (api/index.ts,
 * which repeats the same few lines in its own pickListing). The rule is the
 * same in both, and server/posts-listing.test.ts runs one fixture through each
 * and checks they agree.
 *
 * The essay date is the one client/src/lib/shelf.ts (essayDate) and
 * scripts/lib/shelf.mjs judge "Latest" by: publishedAt, or createdAt when no
 * publish time was recorded.
 */
import { z } from "zod";

export const listPublishedInput = z
  .object({
    /** Rows whose slug is listed come back whatever their date. */
    slugs: z.array(z.string().min(1).max(200)).max(500).optional(),
    /** ISO instant: rows whose essay date is at or after it come back too. */
    since: z.iso.datetime().optional(),
  })
  .optional();

export type ListPublishedInput = z.infer<typeof listPublishedInput>;

function toTime(date: unknown): number {
  if (date instanceof Date) return date.getTime();
  if (typeof date === "number") return date;
  if (typeof date === "string" && date) return Date.parse(date);
  return Number.NaN;
}

function essayTime(row: { publishedAt?: unknown; createdAt?: unknown }): number {
  const published = toTime(row.publishedAt);
  return Number.isFinite(published) ? published : toTime(row.createdAt);
}

/**
 * The rows a listPublished call asked for. With neither field set, every row,
 * in the order given; otherwise the rows named by slug or dated at or after
 * `since`, in the same order.
 */
export function pickListing<T extends { slug: string; publishedAt?: unknown; createdAt?: unknown }>(
  rows: T[],
  input: ListPublishedInput
): T[] {
  if (!input || (input.slugs === undefined && input.since === undefined)) return rows;
  const wanted = new Set(input.slugs ?? []);
  const since = input.since === undefined ? Number.NaN : Date.parse(input.since);
  return rows.filter((r) => wanted.has(r.slug) || (Number.isFinite(since) && essayTime(r) >= since));
}
