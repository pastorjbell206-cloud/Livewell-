import { describe, it, expect } from "vitest";
import { fixEncoding, fromFacebook, fromText, idFor, cleanText } from "../scripts/import-facebook-notes.mjs";

// The Notes importer brings James's own posts in untouched. These pin the
// ways it could corrupt or invent one: mangling the export's encoding,
// counting a share with no words as a note, or making up a date.

describe("the Facebook notes importer", () => {
  it("repairs the export's mis-encoded text in both flavours and leaves clean text alone", () => {
    const rightQuote = "’";
    const asLatin1 = "Weâve buried people";
    const asCp1252 = "Weâ€™ve buried people";
    expect(fixEncoding(asLatin1)).toBe(`We${rightQuote}ve buried people`);
    expect(fixEncoding(asCp1252)).toBe(`We${rightQuote}ve buried people`);
    expect(fixEncoding("plain ascii")).toBe("plain ascii");
    expect(fixEncoding("café déjà vu")).toBe("café déjà vu");
  });

  it("keeps a post with words, skips a share or a photo with none, and dates from the timestamp", () => {
    const notes = fromFacebook([
      { timestamp: 1690000000, data: [{ post: "A sentence long enough to be a note for someone." }] },
      { timestamp: 1690000001, data: [{ post: "hi" }] },
      { timestamp: 1690000002, title: "James shared a link.", attachments: [] },
      { data: [{ post: "Undated posts cannot be placed in order and are skipped." }] },
    ]);
    expect(notes).toHaveLength(1);
    expect(notes[0].date).toBe("2023-07-22");
    expect(notes[0].source).toBe("facebook");
  });

  it("reads plain text blocks and refuses a block without a date", () => {
    const notes = fromText("date: 2026-09-01\nurl: https://www.facebook.com/x/posts/1\nFirst note, long enough to count.\n\nSecond paragraph.\n---\nNo date on this one, so it is skipped.\n");
    expect(notes).toHaveLength(1);
    expect(notes[0].text).toBe("First note, long enough to count.\n\nSecond paragraph.");
    expect(notes[0].url).toBe("https://www.facebook.com/x/posts/1");
  });

  it("gives the same text the same id so re-importing never duplicates", () => {
    expect(idFor("the same words", "2026-01-01")).toBe(idFor("the same words ", "2026-01-01"));
    expect(idFor("the same words", "2026-01-01")).not.toBe(idFor("other words", "2026-01-01"));
  });

  it("turns an em-dash into the comma a reader would say", () => {
    expect(cleanText("Not advice — news.")).toBe("Not advice, news.");
  });
});
