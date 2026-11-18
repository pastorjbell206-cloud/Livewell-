/**
 * SubstackLatest: James's newest Substack pieces, by title and date, each a
 * link out to Substack. Linked, never copied in: no body, no image.
 *
 * The list comes from the site's own API (`substack.latest`, both runtimes,
 * shared/substackLatest.ts), so the browser never calls Substack. While it
 * loads, the list holds its space. When the feed gives nothing, or the call
 * fails, one quiet line and the button to his Substack take its place.
 *
 * Any page may use it: <SubstackLatest /> (cream) or tone="dark" on charcoal.
 */
import { ArrowUpRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { channelUrl } from "@/lib/channels";
import "./hub.css";

export interface SubstackLatestItem {
  title: string;
  url: string;
  date: string;
}

const HOUR = 60 * 60 * 1000;

/** "November 12, 2026", read from an ISO date; "" when there is none. */
export function substackDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return "";
  const d = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/** Only https addresses on substack.com reach the page, whatever the API sends. */
function safe(items: unknown, limit: number): SubstackLatestItem[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter((x): x is SubstackLatestItem => {
      if (!x || typeof x !== "object") return false;
      const { title, url } = x as SubstackLatestItem;
      if (typeof title !== "string" || !title.trim() || typeof url !== "string") return false;
      try {
        const u = new URL(url);
        const host = u.hostname.toLowerCase();
        return u.protocol === "https:" && (host === "substack.com" || host.endsWith(".substack.com"));
      } catch {
        return false;
      }
    })
    .slice(0, limit);
}

export function SubstackLatestView({
  status,
  items,
  limit = 5,
  tone = "light",
}: {
  status: "loading" | "ready";
  items: SubstackLatestItem[];
  limit?: number;
  tone?: "light" | "dark";
}) {
  const substack = channelUrl("substack");
  const list = safe(items, limit);
  const cls = `sb-latest${tone === "dark" ? " sb-latest--dark" : ""}`;

  if (status === "loading") {
    return (
      <div className={cls} aria-busy="true">
        <ul className="sb-latest__list sb-latest__list--wait" style={{ minHeight: `calc(${limit} * var(--sb-row))` }} aria-label="Loading the newest pieces">
          {Array.from({ length: limit }, (_, i) => (
            <li key={i} className="sb-latest__ghost" aria-hidden="true" />
          ))}
        </ul>
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className={cls}>
        <p className="sb-latest__empty">His newest pieces are on Substack.</p>
        {substack && (
          <a href={substack} target="_blank" rel="noopener noreferrer" className="btn sb-latest__btn">
            Read on Substack
            <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.75} />
            <span className="sr-only"> (opens Substack in a new tab)</span>
          </a>
        )}
      </div>
    );
  }

  return (
    <div className={cls}>
      <ul className="sb-latest__list">
        {list.map((p) => {
          const when = substackDate(p.date);
          return (
            <li key={p.url} className="sb-latest__item">
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="sb-latest__link">
                <span className="sb-latest__title">{p.title}</span>
                <span className="sb-latest__meta">
                  {when && <time dateTime={p.date}>{when}</time>}
                  <span className="sb-latest__where">
                    on Substack
                    <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.75} />
                  </span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
      {substack && (
        <a href={substack} target="_blank" rel="noopener noreferrer" className="btn btn--quiet sb-latest__btn">
          Everything on his Substack
          <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.75} />
          <span className="sr-only"> (opens Substack in a new tab)</span>
        </a>
      )}
    </div>
  );
}

export default function SubstackLatest({ limit = 5, tone = "light" }: { limit?: number; tone?: "light" | "dark" }) {
  const q = trpc.substack.latest.useQuery(undefined, { staleTime: HOUR, gcTime: HOUR, retry: false, refetchOnWindowFocus: false });
  return <SubstackLatestView status={q.isLoading ? "loading" : "ready"} items={q.data ?? []} limit={limit} tone={tone} />;
}
