/**
 * The Start Here quiz recommends essays by hardcoded {title, slug} pairs. When
 * an essay is retitled (the SEO pass renames titles, never slugs), those copies
 * would silently drift and the quiz would recommend essays under names that no
 * longer exist. This test pins every quiz title to the real one, so a retitle
 * fails CI by name instead of shipping a stale quiz.
 */
import { describe, it, expect } from "vitest";
import { READING_PATHS } from "@/pages/StartHereQuiz";
import contentData from "@/data/content-data.json";
import staticLibrary from "../../../content/static-library.generated.json";
import rewrites from "../../../content/rewrites.generated.json";

type Rec = { slug: string; title: string };
const posts = (contentData as { posts: Rec[] }).posts ?? (contentData as unknown as Rec[]);
const rewritten = new Set<string>((rewrites as { rewritten: string[] }).rewritten);
const merged = (rewrites as { merged: Record<string, string> }).merged;
const bySlug = new Map<string, string>();
for (const r of staticLibrary as Rec[]) bySlug.set(r.slug, r.title);
// The seed wins, like the runtime, except over a rewrite (a rewrite outranks the
// old row everywhere) and for an essay merged away (its address redirects).
for (const r of posts) if (!rewritten.has(r.slug)) bySlug.set(r.slug, r.title);
for (const slug of Object.keys(merged)) bySlug.delete(slug);

describe("Start Here quiz titles", () => {
  const pairs = Object.values(READING_PATHS).flatMap((p) => p.articles);

  it("every recommended essay exists", () => {
    for (const a of pairs) {
      expect(bySlug.has(a.slug), `unknown slug: ${a.slug}`).toBe(true);
    }
  });

  it("every displayed title matches the essay's real title", () => {
    for (const a of pairs) {
      expect(a.title, `title drift for ${a.slug}`).toBe(bySlug.get(a.slug));
    }
  });
});
