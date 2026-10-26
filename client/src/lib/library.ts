/**
 * My Library: everything a reader saves, kept in this browser.
 *
 * One list of saved pages (essays, care pages, plans, study guides, tools,
 * printables), shown at /my-library. Nothing leaves the device: readers have
 * no accounts, so the list lives in localStorage through lib/storage and every
 * write reports whether it landed, so a page can show the save-failure line
 * instead of a "Saved" that will not survive a reload.
 *
 * The essay page's older bookmarks (livewell:bookmarks, a list of slugs) are
 * read as saved essays, so nothing a reader saved before this list existed is
 * lost, and removing one removes it from both.
 *
 * Components stay in step through useLibrary(): a save in one place updates
 * every Save button and the library page, in this tab and in others.
 */
import { useSyncExternalStore } from "react";
import { isArrayOf, readStoredJSON, writeStoredJSON } from "@/lib/storage";
import { shelfEntry } from "@/lib/shelf";

export const LIBRARY_KEY = "livewell-library-v1";
export const LEGACY_BOOKMARKS_KEY = "livewell:bookmarks";
/** Fired on window after every successful write, so other components re-read. */
export const LIBRARY_EVENT = "livewell-library-change";

export interface LibraryItem {
  /** The page on this site, as a path (/help/grief, /writing/<slug>). */
  href: string;
  title: string;
  /** What it is, in plain words: Essay, Find Help, Eight-week plan, Tool... */
  kind: string;
  /** When it was saved (ISO 8601). */
  savedAt: string;
  /**
   * An essay's own date, as the shelf judges it (publishedAt, else createdAt),
   * so a post James publishes after the shelf was set stays a live link.
   */
  date?: string;
}

const isItem = (x: unknown): x is LibraryItem => {
  if (!x || typeof x !== "object") return false;
  const r = x as Record<string, unknown>;
  return (
    typeof r.href === "string" &&
    typeof r.title === "string" &&
    typeof r.kind === "string" &&
    typeof r.savedAt === "string" &&
    (r.date === undefined || typeof r.date === "string")
  );
};
const isList = (x: unknown): x is unknown[] => Array.isArray(x);
const isSlugs = isArrayOf((x): x is string => typeof x === "string");

/** The stored list, every well-formed entry kept: one bad entry never empties the rest. */
function storedItems(): LibraryItem[] {
  return readStoredJSON(LIBRARY_KEY, isList, []).filter(isItem);
}

const SITE_HOST = /(^|\.)livewellbyjamesbell\.co$/i;
/** Tags a shared link picks up (Facebook, Google, Mailchimp); never part of the page itself. */
const TRACKING = /^(utm_\w+|fbclid|gclid|mc_cid|mc_eid)$/i;

/** One spelling per page: a path on this site, without its hash, tracking tags, or a trailing slash. */
export function libraryPath(href: string): string {
  let path = href.trim();
  try {
    const url = new URL(path, "https://www.livewellbyjamesbell.co");
    const sameHost = SITE_HOST.test(url.hostname) || (typeof window !== "undefined" && url.host === window.location.host);
    if (!sameHost) return url.toString();
    for (const key of Array.from(url.searchParams.keys())) if (TRACKING.test(key)) url.searchParams.delete(key);
    path = url.pathname + url.search;
  } catch {
    /* keep it as given */
  }
  path = path.replace(/#.*$/, "");
  return path.length > 1 ? path.replace(/\/+$/, "") || "/" : path;
}

const ESSAY = /^\/writing\/([^/?#]+)$/;

function humanize(slug: string): string {
  const words = slug.replace(/[-_]+/g, " ").trim();
  return words ? words[0].toUpperCase() + words.slice(1) : slug;
}

/** Saved items, newest first, with the older essay bookmarks folded in. */
export function readLibrary(): LibraryItem[] {
  const items = storedItems();
  const have = new Set(items.map((i) => i.href));
  const legacy = readStoredJSON(LEGACY_BOOKMARKS_KEY, isSlugs, []);
  const fromBookmarks: LibraryItem[] = legacy
    .map((slug) => `/writing/${slug}`)
    .filter((href) => !have.has(href))
    .map((href) => {
      const slug = href.slice("/writing/".length);
      return { href, title: shelfEntry(slug)?.title ?? humanize(slug), kind: "Essay", savedAt: "" };
    });
  return [...items].sort((a, b) => b.savedAt.localeCompare(a.savedAt)).concat(fromBookmarks);
}

function notify(): void {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(LIBRARY_EVENT));
}

/** Save a page (or refresh its title). Returns false when the browser refused the write. */
export function saveToLibrary(item: Omit<LibraryItem, "savedAt">): boolean {
  const href = libraryPath(item.href);
  const items = storedItems().filter((i) => i.href !== href);
  const next: LibraryItem[] = [
    { href, title: item.title.trim() || href, kind: item.kind, savedAt: new Date().toISOString(), ...(item.date ? { date: item.date } : {}) },
    ...items,
  ];
  const ok = writeStoredJSON(LIBRARY_KEY, next);
  if (ok) notify();
  return ok;
}

/** Remove a page from the library (and from the older essay bookmarks). Returns false when the write failed. */
export function removeFromLibrary(href: string): boolean {
  const path = libraryPath(href);
  const items = storedItems();
  let ok = true;
  if (items.some((i) => i.href === path)) ok = writeStoredJSON(LIBRARY_KEY, items.filter((i) => i.href !== path));
  const essay = path.match(ESSAY);
  if (essay) {
    const legacy = readStoredJSON(LEGACY_BOOKMARKS_KEY, isSlugs, []);
    if (legacy.includes(essay[1])) ok = writeStoredJSON(LEGACY_BOOKMARKS_KEY, legacy.filter((s) => s !== essay[1])) && ok;
  }
  if (ok) notify();
  return ok;
}

export function isInLibrary(href: string, items: LibraryItem[] = readLibrary()): boolean {
  const path = libraryPath(href);
  return items.some((i) => i.href === path);
}

// ── React: one snapshot, shared by every component that reads the library ──

const EMPTY: LibraryItem[] = [];
let cache: { raw: string; items: LibraryItem[] } | null = null;

function rawState(): string {
  try {
    return `${window.localStorage.getItem(LIBRARY_KEY) ?? ""}\u0000${window.localStorage.getItem(LEGACY_BOOKMARKS_KEY) ?? ""}`;
  } catch {
    return "";
  }
}

function snapshot(): LibraryItem[] {
  const raw = rawState();
  if (cache && cache.raw === raw) return cache.items;
  cache = { raw, items: readLibrary() };
  return cache.items;
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(LIBRARY_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(LIBRARY_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** The saved items, kept current across components and tabs. */
export function useLibrary(): LibraryItem[] {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}
