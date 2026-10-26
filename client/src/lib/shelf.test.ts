/**
 * The essay shelf: the committed list (shelf.json), the site's reading of it
 * (shelf.ts), and the build scripts' reading of it (scripts/lib/shelf.mjs)
 * must agree on one rule: live shelf essays are public, pending ones only with
 * a rewrite, anything else only if created after the cutoff, and the rest is
 * retired. These tests hold that rule and the data it rests on.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

import shelfJson from "./shelf.json";
import {
  LATEST_CUTOFF,
  SHELF_ESSAYS,
  SHELF_SECTIONS,
  START_WITH,
  cleanExcerpt,
  essayDate,
  essayVisibility,
  filterPublicPosts,
  isAfterCutoff,
  isPublicEssay,
  isPublicEssayHref,
  liveSections,
  liveShelfEssays,
  nearestSection,
  sectionsForTrack,
  shelfEntry,
} from "./shelf";
import { ESSAY_OVERRIDES } from "./essayOverrides.generated";
import { pickRelated } from "@/components/RelatedEssays";
import { PENDING_SENTENCE as UI_PENDING, RETIRED_SENTENCE as UI_RETIRED } from "@/components/RetiredEssayNotice";
import {
  OVERRIDES_MODULE,
  PENDING_SENTENCE,
  RETIRED_SENTENCE,
  ROOT,
  createShelf,
  essayDate as nodeEssayDate,
  loadOverrides,
  loadTakenDown,
  overrideProblems,
  renderOverridesModule,
} from "../../../scripts/lib/shelf.mjs";

const LIVE_KEEP = "when-the-church-married-empire";
const PENDING = "what-christian-nationalism-is-and-is-not";
const RETIRED = "the-atheist-in-the-pulpit";
const BEFORE = "2026-07-08T01:06:22.000Z";
const AFTER = "2026-10-20T15:00:00.000Z";

describe("shelf.json", () => {
  it("has eight sections in order with unique slugs and real tracks", () => {
    expect(SHELF_SECTIONS).toHaveLength(8);
    expect(SHELF_SECTIONS.map((s) => s.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(new Set(SHELF_SECTIONS.map((s) => s.slug)).size).toBe(8);
    for (const s of SHELF_SECTIONS) {
      expect(s.name.trim()).not.toBe("");
      expect(s.description.trim()).not.toBe("");
    }
  });

  it("holds the 58 planned essays: 15 live, 43 pending, each filed to a real section", () => {
    expect(SHELF_ESSAYS).toHaveLength(58);
    expect(new Set(SHELF_ESSAYS.map((e) => e.slug)).size).toBe(58);
    expect(SHELF_ESSAYS.filter((e) => e.status === "live")).toHaveLength(15);
    expect(SHELF_ESSAYS.filter((e) => e.status === "pending")).toHaveLength(43);
    const sections = new Set(SHELF_SECTIONS.map((s) => s.slug));
    for (const e of SHELF_ESSAYS) {
      expect(sections.has(e.section), e.slug).toBe(true);
      expect(["live", "pending"]).toContain(e.status);
      expect(e.title.trim(), e.slug).not.toBe("");
      if (e.blurb !== undefined) expect(e.status, `${e.slug} has a blurb but is not live`).toBe("live");
    }
  });

  it("starts readers with three live essays", () => {
    expect(START_WITH).toEqual([
      "every-generation-was-sure-it-was",
      "when-the-church-married-empire",
      "how-christian-nationalism-rewrites",
    ]);
    for (const slug of START_WITH) expect(shelfEntry(slug)?.status).toBe("live");
  });

  it("dates the Latest cutoff to the end of 2026-10-12 (UTC)", () => {
    expect(new Date(LATEST_CUTOFF).toISOString()).toBe("2026-10-13T00:00:00.000Z");
  });
});

describe("essay visibility", () => {
  it("serves a live shelf essay whatever its date", () => {
    expect(essayVisibility(LIVE_KEEP)).toBe("shelf");
    expect(essayVisibility(LIVE_KEEP, BEFORE)).toBe("shelf");
    expect(isPublicEssay(LIVE_KEEP)).toBe(true);
  });

  it("holds a pending shelf essay back until its rewrite exists", () => {
    expect(ESSAY_OVERRIDES.find((o) => o.slug === PENDING)).toBeUndefined();
    expect(essayVisibility(PENDING)).toBe("pending");
    expect(isPublicEssay(PENDING, AFTER)).toBe(false);
  });

  it("retires an essay off the shelf that predates the cutoff", () => {
    expect(essayVisibility(RETIRED, BEFORE)).toBe("retired");
    expect(essayVisibility(RETIRED)).toBe("retired");
    expect(essayVisibility(RETIRED, "not a date")).toBe("retired");
    expect(isPublicEssay(RETIRED, BEFORE)).toBe(false);
  });

  it("lets a post created after the cutoff through on its own (strings, Dates, the boundary)", () => {
    expect(essayVisibility("a-new-admin-post", AFTER)).toBe("latest");
    expect(essayVisibility("a-new-admin-post", new Date(AFTER))).toBe("latest");
    expect(isAfterCutoff("2026-10-13T00:00:00.000Z")).toBe(true);
    expect(isAfterCutoff("2026-10-12T23:59:59.999Z")).toBe(false);
  });

  it("filters any post list to the public essays", () => {
    const rows = [
      { slug: LIVE_KEEP, createdAt: new Date(BEFORE) },
      { slug: PENDING, createdAt: new Date(BEFORE) },
      { slug: RETIRED, createdAt: new Date(BEFORE) },
      { slug: "a-new-admin-post", createdAt: new Date(AFTER) },
    ];
    expect(filterPublicPosts(rows).map((r) => r.slug)).toEqual([LIVE_KEEP, "a-new-admin-post"]);
  });

  it("judges Latest by the publish time, falling back to the creation time", () => {
    // The admin's draft flow: created before the cutoff, published after it.
    const draft = { slug: "a-draft-from-the-admin", createdAt: new Date(BEFORE), publishedAt: new Date(AFTER) };
    expect(essayDate(draft)).toEqual(new Date(AFTER));
    expect(essayVisibility(draft.slug, essayDate(draft))).toBe("latest");
    // The editor's own create: published at once, no publishedAt recorded.
    const created = { slug: "an-editor-post", createdAt: AFTER, publishedAt: null };
    expect(essayDate(created)).toBe(AFTER);
    expect(isPublicEssay(created.slug, essayDate(created))).toBe(true);
    // An old essay keeps its old date, however it was stored.
    expect(isPublicEssay(RETIRED, essayDate({ createdAt: BEFORE, publishedAt: undefined }))).toBe(false);
    expect(essayDate(null)).toBeUndefined();
    expect(filterPublicPosts([draft, created, { slug: RETIRED, createdAt: BEFORE, publishedAt: BEFORE }]).map((r) => r.slug)).toEqual([
      draft.slug,
      created.slug,
    ]);
  });

  it("drops hand-written links to essays off the shelf, and nothing else", () => {
    expect(isPublicEssayHref(`/writing/${LIVE_KEEP}`)).toBe(true);
    expect(isPublicEssayHref(`/writing/${LIVE_KEEP}?path=x#top`)).toBe(true);
    expect(isPublicEssayHref(`/writing/${PENDING}`)).toBe(false);
    expect(isPublicEssayHref(`/writing/${RETIRED}`)).toBe(false);
    expect(isPublicEssayHref("/writing")).toBe(true);
    expect(isPublicEssayHref("/writing?section=the-mirror")).toBe(true);
    expect(isPublicEssayHref("/studyguides/lament")).toBe(true);
    expect(isPublicEssayHref(null)).toBe(true);
  });

  it("orders the live shelf by section, then shelf order", () => {
    const live = liveShelfEssays();
    expect(live).toHaveLength(15);
    expect(live[0].slug).toBe("every-generation-was-sure-it-was");
    const ranks = live.map((e) => SHELF_SECTIONS.findIndex((s) => s.slug === e.section));
    expect([...ranks].sort((a, b) => a - b)).toEqual(ranks);
  });

  it("shows only sections that have a public essay", () => {
    expect(liveSections().map((s) => s.slug)).toEqual([
      "the-mirror",
      "faith-and-power",
      "after-christendom",
      "ancient-church",
      "bible-in-its-world",
    ]);
  });
});

describe("nearest section", () => {
  it("sends a pending essay to its own section when that section is on show", () => {
    expect(nearestSection(PENDING)?.slug).toBe("faith-and-power");
  });

  it("never points at a section with nothing in it", () => {
    // Doubt and Hard Questions has no public essay yet.
    expect(nearestSection("did-the-resurrection-happen")).toBeNull();
    expect(nearestSection(RETIRED, "doubt")).toBeNull();
  });

  it("routes a retired essay by its track", () => {
    expect(nearestSection(RETIRED, "politics")?.slug).toBe("faith-and-power");
    expect(nearestSection(RETIRED, "theology")?.slug).toBe("ancient-church");
    expect(nearestSection(RETIRED, "pastoral-ministry")).toBeNull();
    expect(sectionsForTrack("theology").map((s) => s.slug)).toEqual(["ancient-church", "bible-in-its-world"]);
  });
});

describe("related reading", () => {
  it("offers only live shelf essays, never the current one, same section first", () => {
    const picks = pickRelated({ slug: "blind-spots", pillar: "Living Well" });
    expect(picks.length).toBeGreaterThanOrEqual(3);
    expect(picks.length).toBeLessThanOrEqual(4);
    for (const p of picks) {
      expect(p.slug).not.toBe("blind-spots");
      expect(isPublicEssay(p.slug)).toBe(true);
    }
    expect(shelfEntry(picks[0].slug)?.section).toBe("the-mirror");
  });

  it("still offers the shelf at the foot of a post-cutoff essay", () => {
    const picks = pickRelated({ slug: "a-new-admin-post", pillar: null });
    expect(picks.map((p) => p.slug).slice(0, 3)).toEqual(START_WITH);
  });
});

describe("cleanExcerpt", () => {
  it("decodes the entities Substack imports left behind", () => {
    expect(cleanExcerpt("Why the church&#8217;s alliance &#8212; and &amp; more&hellip;")).toBe(
      "Why the church’s alliance — and & more…"
    );
    expect(cleanExcerpt(null)).toBe("");
  });
});

describe("the build scripts' reading of the shelf", () => {
  const nodeShelf = createShelf(shelfJson, ESSAY_OVERRIDES.map((o) => o.slug));

  it("agrees with the site on every shelf essay and on the cutoff rule", () => {
    const samples: [string, string | undefined][] = [
      ...SHELF_ESSAYS.map((e): [string, string | undefined] => [e.slug, BEFORE]),
      [RETIRED, BEFORE],
      [RETIRED, AFTER],
      ["a-new-admin-post", undefined],
      ["a-new-admin-post", "2026-10-13T00:00:00.000Z"],
    ];
    for (const [slug, createdAt] of samples) {
      expect(nodeShelf.visibility(slug, createdAt), slug).toBe(essayVisibility(slug, createdAt));
    }
    const rows = [
      { createdAt: BEFORE, publishedAt: AFTER },
      { createdAt: AFTER, publishedAt: null },
      { createdAt: BEFORE },
      {},
    ];
    for (const r of rows) expect(nodeEssayDate(r)).toEqual(essayDate(r));
    expect(nodeShelf.liveEssays().map((e: { slug: string }) => e.slug)).toEqual(liveShelfEssays().map((e) => e.slug));
  });

  it("turns a pending essay live once a rewrite exists", () => {
    const withRewrite = createShelf(shelfJson, [PENDING]);
    expect(withRewrite.visibility(PENDING)).toBe("shelf");
    expect(withRewrite.liveEssays().map((e: { slug: string }) => e.slug)).toContain(PENDING);
  });

  it("keeps the generated rewrite index in step with client/public/essays", () => {
    const { overrides, problems } = loadOverrides(ROOT);
    expect(problems).toEqual([]);
    const committed = fs.readFileSync(path.join(ROOT, OVERRIDES_MODULE), "utf8");
    expect(committed, "run: node scripts/build-essays-index.mjs").toBe(renderOverridesModule(overrides));
  });

  it("rejects a malformed rewrite or one for a slug off the shelf", () => {
    const shelfSlugs = new Set(SHELF_ESSAYS.map((e) => e.slug));
    const good = { slug: PENDING, title: "T", excerpt: "E", body: "x".repeat(600), updated: "2026-11-01" };
    expect(overrideProblems(good, PENDING, shelfSlugs)).toEqual([]);
    expect(overrideProblems({ ...good, body: "too short" }, PENDING, shelfSlugs)).toHaveLength(1);
    expect(overrideProblems({ ...good, slug: RETIRED }, RETIRED, shelfSlugs)).toHaveLength(1);
    expect(overrideProblems({ ...good, updated: "soon" }, PENDING, shelfSlugs)).toHaveLength(1);
  });

  it("answers a retired URL with the same sentence the page shows", () => {
    expect(RETIRED_SENTENCE).toBe(UI_RETIRED);
    expect(PENDING_SENTENCE).toBe(UI_PENDING);
  });
});

describe("the when-fear-rewrites-theology collision", () => {
  it("serves James's chapter: the slug is live on the shelf and its static AI draft is taken down", () => {
    expect(shelfEntry("when-fear-rewrites-theology")).toMatchObject({ status: "live", title: "When Fear Rewrites Theology" });
    expect(loadTakenDown(ROOT).has("when-fear-rewrites-theology")).toBe(true);
  });
});

describe("vercel.json", () => {
  it("does not redirect away from any live shelf essay or rewrite", () => {
    const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf8"));
    const sources = new Set<string>((vercel.redirects ?? []).map((r: { source: string }) => r.source));
    for (const e of liveShelfEssays()) expect(sources.has(`/writing/${e.slug}`), e.slug).toBe(false);
  });
});
