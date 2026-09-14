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

type Rec = { slug: string; title: string };
const posts = (contentData as { posts: Rec[] }).posts ?? (contentData as unknown as Rec[]);
const bySlug = new Map<string, string>();
for (const r of staticLibrary as Rec[]) bySlug.set(r.slug, r.title);
for (const r of posts) bySlug.set(r.slug, r.title); // seed wins, like the runtime

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
