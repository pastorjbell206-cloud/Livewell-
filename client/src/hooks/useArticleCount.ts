import { trpc } from "@/lib/trpc";
import { filterPublicPosts, liveShelfEssays } from "@/lib/shelf";

/**
 * Single source of truth for the published article count shown in UI copy.
 * Returns both the raw count and a marketing-rounded display string
 * (e.g. 163 -> "160+").
 *
 * Falls back to the size of the public shelf (lib/shelf.ts) if the query has
 * not yet resolved so that SSR/first paint still renders a sensible number.
 */
export function useArticleCount(): { count: number; display: string } {
    const { data } = trpc.posts.listForIndex.useQuery(undefined, {
          staleTime: 1000 * 60 * 10,
    });
    // Count only the public shelf (lib/shelf.ts), not retired essays.
    const raw = Array.isArray(data) ? filterPublicPosts(data).length : liveShelfEssays().length;
    const rounded = Math.max(10, Math.floor(raw / 10) * 10);
    return { count: raw, display: `${rounded}+` };
}
