/**
 * The Find Help search has one job: meet a reader in their own words. These
 * pin that everyday phrasing finds the right need and that nothing matches on
 * filler words alone. (Scripture links are scripture-ref.test.ts.)
 */
import { describe, it, expect } from "vitest";
import { NEED_RESULT_CAP, searchNeeds, type NeedEntry } from "./needs";

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

  it("keeps only pages near the best match, and never more than three", () => {
    const three = [
      need("grief", "Someone I love died", ["grief", "my husband died", "my wife died"], 1),
      need("pornography", "I can't stop looking at pornography", ["my husband watches porn"], 2),
      need("drinking", "I drink too much", ["my husband drinks too much"], 3),
    ];
    // The grief page holds the whole sentence; pages that share one word fall under the floor.
    expect(searchNeeds("my husband died", three).map((n) => n.slug)).toEqual(["grief"]);
    // Many equal matches stop at the cap.
    const many = ["a", "b", "c", "d", "e"].map((slug, i) => need(slug, `Marriage page ${slug}`, ["marriage"], i + 1));
    expect(searchNeeds("marriage", many)).toHaveLength(NEED_RESULT_CAP);
    expect(NEED_RESULT_CAP).toBe(3);
  });

  it("matches nothing on filler words or a single letter", () => {
    expect(searchNeeds("i", NEEDS)).toEqual([]);
    expect(searchNeeds("what does the bible say", NEEDS)).toEqual([]);
  });
});
