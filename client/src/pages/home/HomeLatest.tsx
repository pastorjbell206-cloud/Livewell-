/**
 * Home's latest writing: the newest public essays, newest first, each with
 * its date.
 *
 * The dates of the shelf's essays live in the database, so this asks the same
 * listing /writing asks (posts.listPublished with the shelf's slugs and
 * cutoff, one cached query between the two pages) and applies the shelf rule
 * to whatever comes back. A post James publishes through the admin shows up
 * here on its own. Until the listing answers, and if it never does, the row
 * shows the rewritten essays from the committed index with their own dates,
 * so it is never empty and never waits on the network to paint.
 *
 * Loaded on its own after first paint (Home.tsx), into a box that holds the
 * rows' height, because the row sits below the first screen.
 */
import { useMemo } from "react";
import { Link } from "wouter";

import { ESSAY_OVERRIDES } from "@/lib/essayOverrides.generated";
import { essayDate, isPublicEssay, overrideMeta, shelfEntry, shelfListingInput } from "@/lib/shelf";
import { trpc } from "@/lib/trpc";

/** How many essays the row shows. */
export const LATEST_COUNT = 5;

export interface LatestEssay {
  slug: string;
  title: string;
  /** Milliseconds since the epoch. */
  time: number;
}

interface ListingRow {
  slug: string;
  title: string;
  publishedAt?: unknown;
  createdAt?: unknown;
}

function toTime(date: unknown): number {
  if (date instanceof Date) return date.getTime();
  if (typeof date === "number") return date;
  if (typeof date === "string" && date) return Date.parse(date);
  return Number.NaN;
}

const newestFirst = (a: LatestEssay, b: LatestEssay) => b.time - a.time || a.slug.localeCompare(b.slug);

/** The rewritten essays that are public, by the date of the rewrite. Needs no network. */
export function committedLatest(): LatestEssay[] {
  return ESSAY_OVERRIDES.filter((o) => isPublicEssay(o.slug))
    .map((o) => ({ slug: o.slug, title: o.title, time: toTime(o.updated) }))
    .filter((e) => Number.isFinite(e.time))
    .sort(newestFirst)
    .slice(0, LATEST_COUNT);
}

/**
 * The newest public essays in a listing. An essay's date is the one the essay
 * page shows: when it was published (or created), and for a rewrite the
 * database never dated, the date of the rewrite. A row with no date at all
 * is left out, since the row promises one.
 */
export function latestFrom(rows: ListingRow[]): LatestEssay[] {
  const out: LatestEssay[] = [];
  const seen = new Set<string>();
  for (const r of rows) {
    if (!r || typeof r.slug !== "string" || seen.has(r.slug)) continue;
    const date = essayDate(r);
    if (!isPublicEssay(r.slug, date)) continue;
    const rewrite = overrideMeta(r.slug);
    const time = Number.isFinite(toTime(date)) ? toTime(date) : toTime(rewrite?.updated);
    if (!Number.isFinite(time)) continue;
    seen.add(r.slug);
    out.push({ slug: r.slug, title: rewrite?.title || r.title || shelfEntry(r.slug)?.title || r.slug, time });
  }
  // A rewrite whose essay the listing does not carry still stands on its own.
  for (const e of committedLatest()) if (!seen.has(e.slug)) out.push(e);
  return out.sort(newestFirst).slice(0, LATEST_COUNT);
}

/** "October 27, 2026". Read in UTC, so a date stored at midnight keeps its day. */
export function longDate(time: number): string {
  return new Date(time).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

const SHELF_LISTING = shelfListingInput();

export default function HomeLatest() {
  const listing = trpc.posts.listPublished.useQuery(SHELF_LISTING);
  const essays = useMemo(
    () => (listing.isSuccess ? latestFrom((listing.data ?? []) as unknown as ListingRow[]) : committedLatest()),
    [listing.isSuccess, listing.data]
  );
  if (essays.length === 0) return null;

  return (
    <ol className="home-latest" data-testid="home-latest">
      {essays.map((e) => (
        <li key={e.slug}>
          <Link href={`/writing/${e.slug}`} className="home-latest__link">
            <time className="home-latest__date" dateTime={new Date(e.time).toISOString().slice(0, 10)}>
              {longDate(e.time)}
            </time>
            <span className="home-latest__title">{e.title}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
