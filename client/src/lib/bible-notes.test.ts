import { describe, it, expect } from "vitest";

import type { CatalogueItem } from "./catalogue";
import { flattenStory, itemsForPassage, noteForVerse, paragraphs, refChapters, spreadKinds, storyPlace, translationHref, verseRange, type Story, type VerseNote } from "./bible-notes";

describe("refChapters", () => {
  it("reads the site's reference styles, including singular Psalm and Song of Songs", () => {
    expect(refChapters("Psalm 139:1-4")).toEqual({ slug: "psalms", chapters: [139] });
    expect(refChapters("Song of Songs 2")).toEqual({ slug: "song-of-solomon", chapters: [2] });
    expect(refChapters("1 Cor. 13")).toEqual({ slug: "1-corinthians", chapters: [13] });
    expect(refChapters("Genesis 3:19")).toEqual({ slug: "genesis", chapters: [3] });
  });

  it("expands chapter ranges and 'and', but not verse ranges", () => {
    expect(refChapters("Romans 8–9")?.chapters).toEqual([8, 9]);
    expect(refChapters("Romans 8:18-28")?.chapters).toEqual([8]);
    expect(refChapters("Romans 7:24-8:2")?.chapters).toEqual([7, 8]);
    expect(refChapters("Daniel 1 and 6")?.chapters).toEqual([1, 6]);
    expect(refChapters("Proverbs 16:33 and 21:1")?.chapters).toEqual([16, 21]);
  });

  it("reads the reference a catalogue line opens with, and stops where it leaves the book", () => {
    expect(refChapters("Acts 2 (Pentecost and Peter's sermon)")).toEqual({ slug: "acts", chapters: [2] });
    expect(refChapters("Genesis 1:5, the day with evening and morning")).toEqual({ slug: "genesis", chapters: [1] });
    expect(refChapters("Matthew 23:37 and Ezekiel 18:23")).toEqual({ slug: "matthew", chapters: [23] });
    expect(refChapters("Mark 10:6 and the genealogies of Genesis 5 and 11")).toEqual({ slug: "mark", chapters: [10] });
    expect(refChapters("Jude 14-15 with Jude 9")).toEqual({ slug: "jude", chapters: [1] });
  });

  it("returns null for anything that isn't a Bible reference", () => {
    expect(refChapters("Chapter 3")).toBeNull();
    expect(refChapters("Genesis 51")).toBeNull();
    expect(refChapters("Genesis")).toBeNull();
    expect(refChapters("Wisdom 2:12-20")).toBeNull();
  });
});

describe("the story path", () => {
  const story: Story = {
    intro: "",
    acts: [
      { id: "one", dates: "", world: "", watch: "", people: [], path: [{ book: "genesis", from: 1, to: 2 }] },
      { id: "two", dates: "", world: "", watch: "", people: [], path: [{ book: "psalms", from: 90, to: 90 }, { book: "genesis", from: 3, to: 3 }] },
    ],
  };

  it("walks every chapter in story order and finds its neighbors", () => {
    const steps = flattenStory(story);
    expect(steps.map((s) => `${s.slug}/${s.chapter}`)).toEqual(["genesis/1", "genesis/2", "psalms/90", "genesis/3"]);
    const place = storyPlace(steps, "psalms", 90);
    expect(place?.step.act).toBe("two");
    expect(place?.prev).toMatchObject({ slug: "genesis", chapter: 2 });
    expect(place?.next).toMatchObject({ slug: "genesis", chapter: 3 });
    expect(storyPlace(steps, "romans", 1)).toBeNull();
  });
});

describe("related writing", () => {
  const item = (kind: string, title: string, scripture?: string[]): CatalogueItem => ({ kind, title, href: `/${title}`, scripture });

  it("finds items by the chapters their references touch", () => {
    const items = [item("Essay", "a", ["Psalm 23:1"]), item("Essay", "b", ["Psalms 22"]), item("Wisdom", "c", ["Romans 8:28"])];
    expect(itemsForPassage(items, "psalms", 23).map((i) => i.title)).toEqual(["a"]);
    expect(itemsForPassage(items, "psalms").map((i) => i.title)).toEqual(["a", "b"]);
  });

  it("keeps at most two of a kind and drops duplicates", () => {
    const items = [item("Essay", "a"), item("Essay", "a"), item("Essay", "b"), item("Essay", "c"), item("Wisdom", "d")];
    expect(spreadKinds(items, 6).map((i) => i.title)).toEqual(["a", "b", "d"]);
  });
});

describe("small helpers", () => {
  it("splits paragraphs, reads verse ranges, and links translations out", () => {
    expect(paragraphs("One.\n\nTwo.\n \nThree.")).toEqual(["One.", "Two.", "Three."]);
    expect(verseRange("3-9")).toEqual([3, 9]);
    expect(verseRange("12")).toEqual([12, 12]);
    expect(translationHref("1 John", 4, "ESV")).toBe("https://www.biblegateway.com/passage/?search=1%20John%204&version=ESV");
  });
});

describe("verse notes", () => {
  const notes: VerseNote[] = [
    { v: "1", context: "a" },
    { v: "2-4", context: "b" },
    { v: "5", context: "c" },
  ];
  it("finds the entry that covers a verse, including inside a range", () => {
    expect(noteForVerse(notes, 1)?.context).toBe("a");
    expect(noteForVerse(notes, 3)?.context).toBe("b");
    expect(noteForVerse(notes, 5)?.context).toBe("c");
    expect(noteForVerse(notes, 6)).toBeNull();
  });
});
