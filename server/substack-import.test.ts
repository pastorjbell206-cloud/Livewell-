import { describe, it, expect } from "vitest";
import { categoryForSlug, slugFromLink } from "@/lib/substackImport";
import { shapeSyndicatedPost, plainText, SERIES_TITLE } from "./syndication-shape";
import type { FeedItem } from "./feed-parser";

// The Substack → site mapping had no test; the feed sync ignored it entirely
// and wrote a literal pillar "Substack". These pin the mapping and the shape
// every synced row now takes.

const item = (over: Partial<FeedItem>): FeedItem => ({
  title: "Jesus Is Lord",
  link: "https://jamesbell333289.substack.com/p/jesus-is-lord",
  description: "<p>Caesar is not. &amp; that is the whole creed.</p>",
  pubDate: "Tue, 01 Jul 2026 12:00:00 GMT",
  source: "substack",
  ...over,
});

describe("substack import mapping", () => {
  it("files the serialized book as a teaser series under Church & Empire", () => {
    const c = categoryForSlug("the-end-of-christian-america-99a");
    expect(c).toEqual({ sub: "Church & Empire", pillar: "Prophetic Disruption", mode: "teaser", series: true });
  });

  it("files a mapped essay in full under its sub-pathway's pillar", () => {
    const c = categoryForSlug("the-conservative-blind-spot");
    expect(c?.mode).toBe("full");
    expect(c?.sub).toBe("Cultural Captivity");
    expect(c?.pillar).toBe("Prophetic Disruption");
    expect(c?.series).toBe(false);
  });

  it("returns null for an unmapped slug rather than guessing", () => {
    expect(categoryForSlug("a-post-nobody-has-filed")).toBeNull();
  });

  it("reads the /p/ slug from a Substack link, ignoring query and hash", () => {
    expect(slugFromLink("https://jamesbell333289.substack.com/p/jesus-is-lord?utm_source=x#top")).toBe("jesus-is-lord");
    expect(slugFromLink("https://jamesbell333289.substack.com/")).toBe("");
  });
});

describe("shapeSyndicatedPost", () => {
  it("uses the Substack slug, a real pillar, and a stripped excerpt", () => {
    const s = shapeSyndicatedPost(item({}));
    expect(s).not.toBeNull();
    expect(s!.slug).toBe("jesus-is-lord");
    expect(s!.pillar).toBe("Prophetic Disruption");
    expect(s!.subPathway).toBe("Church & Empire");
    expect(s!.isSeries).toBe(false);
    expect(s!.excerpt).toBe("Caesar is not. & that is the whole creed.");
    expect(s!.pillar).not.toBe("Substack");
  });

  it("shapes the serialized book as a teaser that links back to Substack", () => {
    const link = "https://jamesbell333289.substack.com/p/the-end-of-christian-america-part";
    const s = shapeSyndicatedPost(item({ title: "The End of Christian America, Part III", link, content: "<p>full text</p>" }));
    expect(s!.isSeries).toBe(true);
    expect(s!.body).toContain(SERIES_TITLE);
    expect(s!.body).toContain(`](${link})`);
    expect(s!.body).not.toContain("full text"); // teaser mode never stores the full body
  });

  it("stores a mapped essay's full body as markdown when the feed carries one", () => {
    const s = shapeSyndicatedPost(item({ content: "<h2>Lord</h2><p>Not <strong>Caesar</strong>.</p>" }));
    expect(s!.body).toContain("## Lord");
    expect(s!.body).toContain("**Caesar**");
    expect(s!.body).not.toMatch(/<[a-z]+>/);
  });

  it("skips unmapped slugs, links without /p/, and non-Substack sources", () => {
    expect(shapeSyndicatedPost(item({ link: "https://jamesbell333289.substack.com/p/unfiled-post" }))).toBeNull();
    expect(shapeSyndicatedPost(item({ link: "https://jamesbell333289.substack.com/" }))).toBeNull();
    expect(shapeSyndicatedPost(item({ source: "pastors-connection" }))).toBeNull();
  });

  it("never yields an invalid publish date", () => {
    const s = shapeSyndicatedPost(item({ pubDate: "not a date" }));
    expect(Number.isNaN(s!.publishedAt.getTime())).toBe(false);
  });

  it("plainText decodes the entities Substack actually emits", () => {
    expect(plainText("Fear &amp; Theology &#8212; &#8220;quoted&#8221;")).toBe('Fear & Theology — "quoted"');
  });
});
