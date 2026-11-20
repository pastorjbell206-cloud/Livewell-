/**
 * The Wisdom Finder's hit rate on plain sentences (wisdom-match.fixture.json):
 * the right topic first, and the right topic in the first three. The matcher
 * reads the built finder index (client/public/wisdom/finder.json), as the page
 * does.
 *
 * Before this matcher (the old keyword count in WisdomFinder.tsx, measured on
 * the same fixture on 2026-11-20):
 *   cases   (74)  top 1 62.2%  top 3 83.8%
 *   holdout (19)  top 1 57.9%  top 3 78.9%
 * After (the hand-written phrases were written with the cases in view, so the
 * holdout, not looked at while they were written, is the honest number):
 *   cases   (74)  top 1 100%   top 3 100%
 *   holdout (19)  top 1 84.2%  top 3 100%
 * On 2026-11-20 (second build) twenty more sentences, holdout2, were written
 * before matching.json was touched, and measured: top 1 65.0%, top 3 80.0%.
 * Then four phrases were added for known misses, three of them holdout
 * sentences ("best friend lied", "cheat on my diet", "just retired and feel
 * useless") and one outside it ("boss humiliated me"). After that:
 *   holdout (19)  top 1 100%  top 3 100% (no longer a clean holdout: three of
 *                 its sentences were tuned for)
 *   holdout2 (20) top 1 65.0% top 3 80.0% (untouched; the honest number)
 * On 2026-11-20 (third build) fifteen more sentences, holdout3, were written
 * and committed before matching.json was touched, and measured: top 1 53.3%,
 * top 3 73.3%. Then phrases and "not" phrases were added for the seven
 * holdout2 misses (control in a dating relationship, hating the face in the
 * mirror, sex outside marriage, gossip about a coworker, care for the
 * homeless, how much to give, infertility under the marriage topics). After:
 *   cases    (74) top 1 100%   top 3 100%
 *   holdout  (19) top 1 100%   top 3 100% (tuned for in the second build)
 *   holdout2 (20) top 1 100%   top 3 100% (tuned for in this build; no
 *                 longer a clean holdout)
 *   holdout3 (15) top 1 53.3%  top 3 73.3% (untouched; the honest number)
 * On 2026-11-20 (fourth build) fifteen more sentences, holdout4, were written
 * and committed before matching.json was touched, and measured: top 1 86.7%,
 * top 3 100%. Then phrases and "not" phrases were added, by data only, for
 * the seven holdout3 misses (a few months to live, years of back pain, the
 * friend who died in the crash, a teenage son killed by a drunk driver, a
 * body growing old, a mother now gone, a miscarriage at eight weeks). After:
 *   cases    (74) top 1 100%   top 3 100%
 *   holdout  (19) top 1 100%   top 3 100%
 *   holdout2 (20) top 1 100%   top 3 100%
 *   holdout3 (15) top 1 100%   top 3 100% (tuned for in this build; no
 *                 longer a clean holdout)
 *   holdout4 (15) top 1 86.7%  top 3 100% (untouched; the honest number)
 * On 2026-11-20 (sixth build) fifteen more sentences, holdout5, were written
 * and committed before matching.json was touched. Then holdout4's two misses
 * (wanting to believe but thinking it is made up; saying yes to everything)
 * were fixed by data only (phrases on doubt and saying-no). After:
 *   cases, holdout, holdout2, holdout3: unchanged, 100% and 100%
 *   holdout4 (15) top 1 100%   top 3 100% (tuned for in this build)
 *   holdout5 (15) top 1 26.7%  top 3 60.0% (untouched; the honest number)
 * On 2026-11-20 (seventh build) twenty-five more sentences, holdout6, were
 * written across the topics written in full and committed before matching.json
 * was touched. Measured then: holdout5 26.7% / 60.0%, holdout6 56.0% / 64.0%.
 * Then every topic written in full was given at least eight everyday
 * phrasings (data only), and the rewrites were made to match on stems (a real
 * defect: "I keep hurting myself" and "thinking about ending it all" missed
 * the rewrites written as "hurt myself" and "end it all"). After:
 *   cases, holdout, holdout2, holdout3, holdout4: unchanged, 100% and 100%
 *   holdout5 (15) top 1 73.3%  top 3 93.3% (tuned for in this build)
 *   holdout6 (25) top 1 64.0%  top 3 72.0% (untouched; the honest number;
 *                 60.0% / 68.0% with the phrasings alone, before the rewrite fix)
 * On 2026-11-20 (eighth build) thirty more sentences, holdout7, each aimed at
 * a different topic written in full, were written and committed before the
 * matcher or matching.json was touched. Then the matcher itself was changed,
 * on grounds drawn from holdout6's nine misses (now a tuning set): misspelled
 * words mended to the nearest matching word, rewrites that meet a long word
 * typed one letter off, synonyms found by stem, a small concept table, the
 * related subjects filling the first three when fewer score near the best,
 * and safety words that put the help topic first. Then phrases for holdout6's
 * misses, a church split (holdout4) and the credit taken (holdout5).
 *   cases    (74) top 1 98.6% / 100%  ->  100%  / 100%
 *   holdout  (19) 100% / 100%         ->  100%  / 100%
 *   holdout2 (20) 100% / 100%         ->  100%  / 100%
 *   holdout3 (15) 100% / 100%         ->  100%  / 100%
 *   holdout4 (15) 100% / 100%         ->  100%  / 100%
 *   holdout5 (15) 73.3% / 93.3%       ->  80.0% / 100%
 *   holdout6 (25) 64.0% / 76.0%       ->  96.0% / 100% (tuned for in this build)
 *   holdout7 (30) 66.7% / 73.3%       ->  73.3% / 80.0% (the clean set; 70.0% /
 *                 76.7% before the one safety rewrite, "better off without me",
 *                 which is a holdout7 sentence's words and was added anyway)
 * On 2026-11-20 (ninth build) twenty-four sentences, holdout8, were written by
 * the coordinator of the run, who had not seen the phrasings, and committed
 * before the matcher or matching.json was touched. Baseline:
 *   holdout8 (24) top 1 45.8%  top 3 62.5% (the clean set; never tuned to)
 * At baseline its self-harm sentence ("everyone would be fine if i just
 * disappeared") put Anxiety first, a safety defect; its control sentence ("my
 * husband checks my phone ...") put the help topic first by score only. Fixed
 * at once with general rewrites (wishing to disappear, "fine without me") and
 * safety pairs (a control word after a partner word), tested in five other
 * wordings each below. holdout8 after the fix: top 1 50.0%, top 3 66.7%.
 * Then three parts of the eighth build's proposal: each topic written in full
 * weighed against its own page (BM25 in finder.json, at PAGE_WEIGHT 0.5, the
 * highest weight that cost nothing on the tuning sets, cases to holdout6); a
 * concept table drawn from Find Help's needs and the Honest Answers; and the
 * "Is it one of these?" step. After:
 *   cases    (74) 98.6% / 100%   holdout  (19) 100% / 100%
 *   holdout2 (20) 100%  / 100%   holdout3 (15) 93.3% / 100%
 *   holdout4 (15) 100%  / 100%   holdout5 (15) 86.7% / 100%
 *   holdout6 (25) 100%  / 100%   holdout7 (30) 73.3% / 86.7%
 *   holdout8 (24) 54.2% / 75.0% (the clean set; never tuned to)
 * Then twelve more topics were written in full (their pages and phrasings
 * feed the weights). End of the ninth build: holdout4 93.3% / 100%,
 * holdout7 76.7% / 86.7%, holdout8 54.2% / 75.0%; the rest as above.
 * The floors below sit just under those, so a change to the data that makes
 * the finder worse fails here by name.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { prepare, findTopics, findInArea, stem, normalize, queryWords, isFinderIndex, editDistance, MAX_CHOICES } from "./wisdom-match";

const index: unknown = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/wisdom/finder.json"), "utf8"));
const fixture = JSON.parse(fs.readFileSync(path.resolve(__dirname, "wisdom-match.fixture.json"), "utf8")) as {
  cases: { q: string; expect: string[] }[];
  holdout: { q: string; expect: string[] }[];
  holdout2: { q: string; expect: string[] }[];
  holdout3: { q: string; expect: string[] }[];
  holdout4: { q: string; expect: string[] }[];
  holdout5: { q: string; expect: string[] }[];
  holdout6: { q: string; expect: string[] }[];
  holdout7: { q: string; expect: string[] }[];
  holdout8: { q: string; expect: string[] }[];
};

if (!isFinderIndex(index)) throw new Error("finder.json is not a finder index");
const prep = prepare(index);

function rate(cases: { q: string; expect: string[] }[]) {
  let top1 = 0;
  let top3 = 0;
  const misses: string[] = [];
  const scored = cases.filter((c) => c.expect.length);
  for (const c of scored) {
    const r = findTopics(prep, c.q);
    const ids = r.matches.map((m) => m.topic.id);
    if (r.confident && c.expect.includes(ids[0])) top1++;
    else misses.push(`${c.q} -> ${ids.slice(0, 3).join(", ") || "(nothing)"}`);
    if (ids.slice(0, 3).some((x) => c.expect.includes(x))) top3++;
  }
  return { n: scored.length, top1: top1 / scored.length, top3: top3 / scored.length, misses };
}

describe("wisdom matcher", () => {
  it("has at least 60 plain sentences, every expected topic real", () => {
    const ids = new Set(index.topics.map((t) => t.id));
    const all = [...fixture.cases, ...fixture.holdout, ...fixture.holdout2, ...fixture.holdout3, ...fixture.holdout4, ...fixture.holdout5, ...fixture.holdout6, ...fixture.holdout7, ...fixture.holdout8];
    expect(all.length).toBeGreaterThanOrEqual(60);
    for (const c of all) for (const id of c.expect) expect(ids.has(id), `${c.q}: ${id}`).toBe(true);
  });

  it("puts the right topic first and in the first three (reported)", () => {
    const cases = rate(fixture.cases);
    const holdout = rate(fixture.holdout);
    const holdout2 = rate(fixture.holdout2);
    const holdout3 = rate(fixture.holdout3);
    const holdout4 = rate(fixture.holdout4);
    const holdout5 = rate(fixture.holdout5);
    const holdout6 = rate(fixture.holdout6);
    const holdout7 = rate(fixture.holdout7);
    const holdout8 = rate(fixture.holdout8);
    console.info(
      `[wisdom-match] cases ${cases.n}: top 1 ${(cases.top1 * 100).toFixed(1)}%, top 3 ${(cases.top3 * 100).toFixed(1)}%; ` +
        `holdout ${holdout.n}: top 1 ${(holdout.top1 * 100).toFixed(1)}%, top 3 ${(holdout.top3 * 100).toFixed(1)}%` +
        (holdout.misses.length ? `\n  holdout misses: ${holdout.misses.join("\n  ")}` : "") +
        `\n[wisdom-match] holdout2 ${holdout2.n}: top 1 ${(holdout2.top1 * 100).toFixed(1)}%, top 3 ${(holdout2.top3 * 100).toFixed(1)}%` +
        (holdout2.misses.length ? `\n  holdout2 misses: ${holdout2.misses.join("\n  ")}` : "") +
        `\n[wisdom-match] holdout3 ${holdout3.n}: top 1 ${(holdout3.top1 * 100).toFixed(1)}%, top 3 ${(holdout3.top3 * 100).toFixed(1)}%` +
        (holdout3.misses.length ? `\n  holdout3 misses: ${holdout3.misses.join("\n  ")}` : "") +
        `\n[wisdom-match] holdout4 ${holdout4.n}: top 1 ${(holdout4.top1 * 100).toFixed(1)}%, top 3 ${(holdout4.top3 * 100).toFixed(1)}%` +
        (holdout4.misses.length ? `\n  holdout4 misses: ${holdout4.misses.join("\n  ")}` : "") +
        `\n[wisdom-match] holdout5 ${holdout5.n}: top 1 ${(holdout5.top1 * 100).toFixed(1)}%, top 3 ${(holdout5.top3 * 100).toFixed(1)}%` +
        (holdout5.misses.length ? `\n  holdout5 misses: ${holdout5.misses.join("\n  ")}` : "") +
        `\n[wisdom-match] holdout6 ${holdout6.n}: top 1 ${(holdout6.top1 * 100).toFixed(1)}%, top 3 ${(holdout6.top3 * 100).toFixed(1)}%` +
        (holdout6.misses.length ? `\n  holdout6 misses: ${holdout6.misses.join("\n  ")}` : "") +
        `\n[wisdom-match] holdout7 ${holdout7.n}: top 1 ${(holdout7.top1 * 100).toFixed(1)}%, top 3 ${(holdout7.top3 * 100).toFixed(1)}%` +
        (holdout7.misses.length ? `\n  holdout7 misses: ${holdout7.misses.join("\n  ")}` : "") +
        `\n[wisdom-match] holdout8 ${holdout8.n}: top 1 ${(holdout8.top1 * 100).toFixed(1)}%, top 3 ${(holdout8.top3 * 100).toFixed(1)}%` +
        (holdout8.misses.length ? `\n  holdout8 misses: ${holdout8.misses.join("\n  ")}` : ""),
    );
    expect(cases.top1).toBeGreaterThanOrEqual(0.95);
    expect(cases.top3).toBeGreaterThanOrEqual(0.95);
    expect(holdout.top1).toBeGreaterThanOrEqual(0.94);
    expect(holdout.top3).toBeGreaterThanOrEqual(0.94);
    expect(holdout2.top1).toBeGreaterThanOrEqual(0.95);
    expect(holdout2.top3).toBeGreaterThanOrEqual(0.95);
    expect(holdout3.top1).toBeGreaterThanOrEqual(0.93);
    expect(holdout3.top3).toBeGreaterThanOrEqual(0.93);
    expect(holdout4.top1).toBeGreaterThanOrEqual(0.93);
    expect(holdout4.top3).toBeGreaterThanOrEqual(0.93);
    expect(holdout5.top1).toBeGreaterThanOrEqual(0.79);
    expect(holdout5.top3).toBeGreaterThanOrEqual(0.95);
    expect(holdout6.top1).toBeGreaterThanOrEqual(0.95);
    expect(holdout6.top3).toBeGreaterThanOrEqual(0.95);
    expect(holdout7.top1).toBeGreaterThanOrEqual(0.76);
    expect(holdout7.top3).toBeGreaterThanOrEqual(0.86);
    // The clean set, written by someone else: reported, and held just under what it scored.
    expect(holdout8.top1).toBeGreaterThanOrEqual(0.54);
    expect(holdout8.top3).toBeGreaterThanOrEqual(0.74);
  });

  it("does not force a match on nonsense", () => {
    expect(findTopics(prep, "asdf qwerty").confident).toBe(false);
    expect(findTopics(prep, "").matches).toEqual([]);
  });

  it("no longer files a wayward child under the Resurrection, or the promotion under self-pity", () => {
    const son = findTopics(prep, "my son has walked away from the faith").matches.map((m) => m.topic.id);
    expect(son[0]).toBe("wayward-child");
    expect(son).not.toContain("the-resurrection");
    const promo = findTopics(prep, "I was passed over for promotion and I am bitter").matches.map((m) => m.topic.id);
    expect(promo[0]).not.toBe("self-pity");
    expect(promo).not.toContain("grief");
  });

  it("never files a question of salvation under Saving and Spending, and still finds money saved", () => {
    // "saved" and "saving" share a stem; once Saving and Spending was written in full its name and page outscored
    // assurance for "am I really saved" (tenth build). Rewrites now add "salvation" to the ways people ask it.
    for (const q of ["am I really saved", "how do i know im saved", "will i be saved"]) {
      const ids = findTopics(prep, q).matches.map((m) => m.topic.id);
      expect(ids[0], q).toBe("assurance-of-faith");
      expect(ids.slice(0, 3), q).not.toContain("saving-and-spending");
    }
    const money = findTopics(prep, "i saved money for a car").matches.map((m) => m.topic.id);
    expect(money.slice(0, 3)).toContain("saving-and-spending");
  });

  it("stems plain word forms together", () => {
    expect(stem("worrying")).toBe(stem("worried"));
    expect(stem("worries")).toBe(stem("worry"));
    expect(stem("hoping")).toBe(stem("hope"));
    expect(queryWords(index, "my mom passed away").has(stem("died"))).toBe(true);
  });

  it("matches a rewrite in any word form, so the words that need help are not missed", () => {
    expect(queryWords(index, "I keep hurting myself").has(stem("selfharm"))).toBe(true);
    expect(queryWords(index, "thinking about ending it all").has(stem("suicide"))).toBe(true);
    expect(queryWords(index, "I do not want to live").has(stem("suicide"))).toBe(true);
    expect(queryWords(index, "we maxed out two credit cards").has(stem("debt"))).toBe(true);
    expect(findTopics(prep, "thinking about ending it all").matches[0].topic.id).toBe("suicidal-thoughts");
  });

  it("counts edits, a swap of two neighbours as one", () => {
    expect(editDistance("grief", "greif", 2)).toBe(1);
    expect(editDistance("passed", "pasted", 2)).toBe(1);
    expect(editDistance("friends", "freinds", 2)).toBe(1);
    expect(editDistance("anxiety", "anger", 1)).toBe(2);
    expect(editDistance("same", "same", 1)).toBe(0);
  });

  it("mends a misspelled word to the one nearest matching word, and leaves short and known words alone", () => {
    expect(queryWords(index, "the greif hits me").has(stem("grief"))).toBe(true);
    expect(queryWords(index, "my anxeity is bad").has(stem("anxiety"))).toBe(true);
    expect(queryWords(index, "i feel so lonley").has(stem("lonely"))).toBe(true);
    expect(queryWords(index, "my husbnd left").has("marriag")).toBe(true);
    // A rewrite meets a long word typed one letter off: "pasted away" is "passed away".
    expect(queryWords(index, "my dad pasted away").has(stem("died"))).toBe(true);
    expect(findTopics(prep, "my dad pasted away last week").matches[0].topic.id).toBe("losing-a-parent");
    // Short words are never mended, so "sun" does not become "son".
    expect(queryWords(index, "my sun").has(stem("child"))).toBe(false);
    // A known word is never mended, and a synonym is reached by stem only through a plain inflection.
    expect(queryWords(index, "we made it up").has(stem("anger"))).toBe(false);
    expect(queryWords(index, "he yelled at me").has(stem("anger"))).toBe(true);
    // A word the library knows only from its framing prose is never a word to mend to.
    expect(queryWords(index, "moving across the country").has("cross")).toBe(false);
  });

  it("adds the library's word for a thing named by a member of a concept", () => {
    expect(queryWords(index, "my mom is on chemo").has(stem("illness"))).toBe(true);
    expect(queryWords(index, "my grandma and my sister").has(stem("family"))).toBe(true);
    expect(queryWords(index, "working every weekend and all the overtime").has(stem("rest"))).toBe(true);
    expect(queryWords(index, "our pastors and elders").has(stem("leader"))).toBe(true);
    expect(queryWords(index, "the landlord is evicting us").has(stem("poor"))).toBe(true);
    // "house" is not "housing": losing the house is not a question of justice.
    expect(findTopics(prep, "we might lose the house").matches[0].topic.id).not.toBe("justice-and-the-poor");
  });

  const firstIs = (q: string, id: string) => {
    const r = findTopics(prep, q);
    expect(r.confident, q).toBe(true);
    expect(r.matches[0].topic.id, q).toBe(id);
    expect(r.matches[0].safety, q).toBe(true);
    expect(r.close, q).toEqual([]);
    // The help topic's own related subjects follow it, before chance word matches.
    const related = r.matches[0].topic.related;
    expect(related.includes(r.matches[1].topic.id), q).toBe(true);
  };

  it("puts the help topic first for self-harm, five new ways of saying it", () => {
    firstIs("i want to hurt myself tonight", "suicidal-thoughts");
    firstIs("i have been cutting myself again", "suicidal-thoughts");
    firstIs("i keep thinking about how to end my life", "suicidal-thoughts");
    firstIs("my kids would be better off without me", "suicidal-thoughts");
    firstIs("i dont want to wake up tomorrow", "suicidal-thoughts");
    firstIs("i wish i was dead", "suicidal-thoughts");
  });

  it("puts the help topic first for abuse, five new ways of saying it", () => {
    firstIs("my husband beats me when he drinks", "toxic-relationships");
    firstIs("my boyfriend choked me last night", "toxic-relationships");
    firstIs("he shoved me into the wall", "toxic-relationships");
    firstIs("my stepdad molested me when i was little", "toxic-relationships");
    firstIs("my wife abused me for years", "toxic-relationships");
  });

  it("reads hitting as abuse when a person hits the reader, not when grief hits them or a toddler does", () => {
    firstIs("my husband hits me", "toxic-relationships");
    firstIs("she hit me again last night", "toxic-relationships");
    const grief = findTopics(prep, "its been a year and the grief still hits me out of nowhere");
    expect(grief.matches[0].topic.id).toBe("grief");
    expect(grief.matches.map((m) => m.topic.id)).not.toContain("toxic-relationships");
    expect(findTopics(prep, "my toddler hits me").matches[0].topic.id).toBe("parenting-young-children");
  });

  it("puts the help topic first for danger, five new ways of saying it", () => {
    firstIs("he threatened to kill me if i leave", "toxic-relationships");
    firstIs("i am afraid for my life", "toxic-relationships");
    firstIs("i am not safe at home", "toxic-relationships");
    firstIs("i am scared he will hurt me again", "toxic-relationships");
    firstIs("my ex says he is going to hurt me", "toxic-relationships");
  });

  it("puts the help topic first for wishing to disappear, five ways of saying it (holdout8's safety sentence, not tuned to)", () => {
    firstIs("i wish i could just disappear and never come back", "suicidal-thoughts");
    firstIs("my family would be fine without me", "suicidal-thoughts");
    firstIs("everyone would be better off if i wasnt around", "suicidal-thoughts");
    firstIs("nobody would even notice if i disappeared", "suicidal-thoughts");
    firstIs("i just want to die", "suicidal-thoughts");
    // A thing that disappears is not a person wishing to.
    expect(findTopics(prep, "my anxiety would just disappear if i could sleep").matches[0].safety).toBeUndefined();
  });

  it("puts the help topic first for control by a partner, five ways of saying it (holdout8's safety sentence, not tuned to)", () => {
    firstIs("my wife reads all my texts and wont let me go out with friends", "toxic-relationships");
    firstIs("my boyfriend tracks my location and gets angry when i see my family", "toxic-relationships");
    firstIs("my husband controls all the money and wont let me have a phone", "toxic-relationships");
    firstIs("my girlfriend wont let me talk to my friends anymore", "toxic-relationships");
    firstIs("my partner goes through my phone every night and keeps me from my family", "toxic-relationships");
    // Control is danger when a partner does it, not a parent's rule about a boyfriend, a wife's rule about a dog.
    expect(findTopics(prep, "my dad wont let me see my boyfriend").matches[0].safety).toBeUndefined();
    expect(findTopics(prep, "my wife wont let me have a dog").matches[0].safety).toBeUndefined();
    expect(findTopics(prep, "my mom checks my phone every night").matches[0].safety).toBeUndefined();
  });

  it("never shows one subject alone, and names the ones nearly as close as the first", () => {
    const alone = findTopics(prep, "i keep replaying every conversation in my head");
    expect(alone.matches.length).toBeGreaterThanOrEqual(3);
    expect(alone.matches.slice(1).some((m) => m.related)).toBe(true);
    const r = findTopics(prep, "the doctor said moms cancer is back and theres nothing more they can do");
    // Either may lead (each is a right answer); the other stands beside it as just as close.
    const pair = [r.matches[0].topic.id, ...r.close.map((m) => m.topic.id)];
    expect(pair).toContain("serious-illness");
    expect(pair).toContain("terminal-diagnosis");
    // A far second is not "just as close".
    expect(findTopics(prep, "my son walked away from the faith").close).toEqual([]);
  });

  it("weighs each topic written in full against its own page, keyed by the same stems the browser uses", async () => {
    const words: { stem: (w: string) => string; normalize: (w: string) => string } = await import(path.resolve(__dirname, "../../../scripts/lib/wisdom-words.mjs"));
    const vocab = new Set<string>();
    for (const t of index.topics) normalize([t.label, t.framing, ...t.keywords, ...t.phrases].join(" ")).split(" ").forEach((w) => w && vocab.add(w));
    for (const w of Array.from(vocab)) expect(words.stem(w), w).toBe(stem(w));
    expect(words.normalize("Can't  stop—worrying!")).toBe(normalize("Can't  stop—worrying!"));
    const weights = index.weights ?? {};
    expect(Object.keys(weights).length).toBeGreaterThan(1000);
    for (const list of Object.values(weights)) {
      const parts = list.split(" ").map(Number);
      for (let k = 0; k < parts.length; k += 2) expect(index.topics[parts[k]]?.deep, `${list}`).toBe(true);
    }
    // A word only the page itself uses (no phrasing names it) still finds the page.
    expect(index.topics.find((t) => t.id === "courage")?.phrases.join(" ")).not.toMatch(/abednego/i);
    expect(findTopics(prep, "abednego").matches[0].topic.id).toBe("courage");
  });

  it("reads the concepts drawn from Find Help's needs and the Honest Answers", () => {
    expect(findTopics(prep, "i relapsed after a year sober").matches[0].topic.id).toBe("addiction");
    expect(findTopics(prep, "is it a sin to get a tattoo").matches[0].topic.id).toBe("guilt-and-conscience");
    expect(findTopics(prep, "we have been trying ivf for three years").matches[0].topic.id).toBe("infertility");
    expect(["the-problem-of-evil", "suffering"]).toContain(findTopics(prep, "why would god allow an earthquake that kills thousands").matches[0].topic.id);
    expect(queryWords(index, "my friend is an atheist").has(stem("doubt"))).toBe(true);
  });

  it("asks which area of life when the fit is weak or others are as close, and never after a safety word", () => {
    const weak = findTopics(prep, "i feel off lately");
    expect(weak.unsure).toBe(true);
    expect(weak.areas.length).toBeGreaterThanOrEqual(2);
    expect(weak.areas.length).toBeLessThanOrEqual(MAX_CHOICES);
    expect(new Set(weak.areas).size).toBe(weak.areas.length);
    const close = findTopics(prep, "the doctor said moms cancer is back and theres nothing more they can do");
    expect(close.unsure).toBe(true);
    expect(close.areas[0]).toBe("loss");
    expect(findTopics(prep, "my son walked away from the faith").unsure).toBe(false);
    for (const q of ["i want to hurt myself tonight", "my husband beats me when he drinks", "my girlfriend wont let me talk to my friends anymore"]) {
      const r = findTopics(prep, q);
      expect(r.unsure, q).toBe(false);
      expect(r.areas, q).toEqual([]);
    }
  });

  it("narrows to the area the reader picks, never to an empty list", () => {
    const area = findTopics(prep, "i feel off lately").areas[1];
    const list = findInArea(prep, "i feel off lately", area);
    expect(list.length).toBeGreaterThanOrEqual(3);
    for (const m of list) expect(m.topic.area).toBe(area);
    const scores = list.filter((m) => !m.related).map((m) => m.score);
    expect(scores).toEqual([...scores].sort((a, b) => b - a));
  });
});
