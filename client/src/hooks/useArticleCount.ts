import { trpc } from "@/lib/trpc";

/**
 * Single source of truth for the published article count shown in UI copy.
 * Returns both the raw count and a marketing-rounded display string
 * (e.g. 163 -> "160+").
 *
 * Falls back to 160 if the query has not yet resolved so that SSR/first
 * paint still renders a sensible number.
 */
export function useArticleCount(): { count: number; display: string } {
    const { data } = trpc.posts.listPublished.useQuery(undefined, {
          staleTime: 1000 * 60 * 10,
    });
    const raw = Array.isArray(data) ? data.length : 160;
    const rounded = Math.max(10, Math.floor(raw / 10) * 10);
    return { count: raw, display: `${rounded}+` };
}
