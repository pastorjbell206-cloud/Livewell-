/**
 * The Find Help search has one job: meet a reader in their own words. These
 * pin that everyday phrasing finds the right need and that nothing matches on
 * filler words alone. (Scripture links are scripture-ref.test.ts.)
 */
import { describe, it, expect } from "vitest";
import { searchNeeds, type NeedEntry } from "./needs";

const need = (slug: string, title: string, askedAs: string[], rank: number): NeedEntry => ({
  slug, title, summary: title, askedAs, states: ["carrying"], sensitivity: "ordinary", page: true, rank,
});

const NEEDS: NeedEntry[] = [
  need("anxiety", "I can't stop worrying", ["anxiety", "worry", "Bible verses about anxiety", "how to stop overthinking"], 1),
  need("loneliness", "I feel so alone", ["loneliness", "lonely", "I have no friends"], 3),
  need("marriage", "My marriage is falling apart", ["marriage problems", "should I get a divorce", "we fight all the time"], 9),
];

describe("searchNeeds", () => {
  it("finds a need from the way people say it", () => {
    expect(searchNeeds("I'm so worried I can't sleep", NEEDS)[0].slug).toBe("anxiety");
    expect(searchNeeds("lonely", NEEDS)[0].slug).toBe("loneliness");
    expect(searchNeeds("we fight all the time", NEEDS)[0].slug).toBe("marriage");
    expect(searchNeeds("divorce", NEEDS)[0].slug).toBe("marriage");
  });

  it("matches nothing on filler words or a single letter", () => {
    expect(searchNeeds("i", NEEDS)).toEqual([]);
    expect(searchNeeds("what does the bible say", NEEDS)).toEqual([]);
  });
});
