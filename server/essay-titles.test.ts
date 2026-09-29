import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { redirectedEssaySlugs } from "../scripts/redirected-essays.mjs";

// Essay titles built from slugs. When an essay reached the static library with
// no hand-written title, scripts/build-static-library.mjs spelled one out of
// its slug, and a short slug had already lost its small words: readers and
// search engines were shown "Reformation Actually About", "Theology Public
// Health", "Church Abandoned Public Square". The fix lives in the builder's
// TITLE_REPAIRS map; this test keeps the failure from coming back by reading
// every title a reader or search engine sees for a live essay.
//
// ESSAY_TITLES_LIBRARY points the check at another build of the library (used
// to prove the source fix before the committed JSON is regenerated).

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const readJson = (p: string) => JSON.parse(readFileSync(path.isAbsolute(p) ? p : path.join(repoRoot, p), "utf8"));

/** Words that a written title almost always carries and a stripped slug has lost. */
const FUNCTION_WORDS = new Set(
  (
    "the a an of in on to is are was were be been am what why how when where who whom which whose for and with " +
    "from by as at or but nor not no than that this these those it its your you our my his her their we they i he she " +
    "into onto upon over under about after before without within across through toward towards against between beyond " +
    "among like until since out up down off inside outside around behind beneath can could will would should shall may " +
    "might must do does did has have had isnt arent wasnt dont doesnt didnt cant wont shouldnt youre youve theyre"
  ).split(" "),
);
/** The small words whose presence in a slug means a title should keep at least one. */
const SLUG_SMALL_WORDS = new Set("the a an of in on to is are what why how when for and with from".split(" "));
/** Words that never end a title. */
const ALWAYS_DANGLING = new Set(["actually", "of", "the", "a", "an", "and", "or", "but"]);
/** Prepositions that may end a title only when a clause strands them ("What the Reformation Was About"). */
const STRANDABLE = new Set(["about", "for", "from", "to", "with", "on", "in", "at", "by", "into"]);
const CLAUSE_WORDS = new Set(
  "what why how who whom where when which that whatever nobody one everyone everybody anyone someone they we you it i he she".split(" "),
);
/**
 * Noun-phrase titles that match their slug word for word and were written that
 * way on purpose. A three-word title with no small words is usually a stripped
 * slug ("Theology Public Health"), but not always; when a new one is meant,
 * list it here rather than loosening the rule.
 */
const WRITTEN_AS_NOUN_PHRASE = new Set([
  "Moralistic Therapeutic Deism",
  "Blended Family Parenting",
  "Jubilee Economics Today",
  "Male Friendship Crisis",
  "Bivocational Ministry Done Right",
]);

const bare = (w: string) => w.toLowerCase().replace(/[^a-z0-9]/g, "");
const wordsOf = (title: string) => title.trim().split(/\s+/).filter(Boolean);
const slugWords = (slug: string) => slug.replace(/^\d+-/, "").split("-").filter(Boolean);
/** The title is the slug read out word for word: nobody wrote it. */
const spelledFromSlug = (title: string, slug: string) =>
  wordsOf(title).map(bare).filter(Boolean).join(" ") === slugWords(slug).join(" ");

/** Why a title looks like a slug with its small words stripped, or null when it reads as written. */
function garbledReason(title: string, slug = ""): string | null {
  if (/\s{2,}/.test(title)) return "doubled space";
  if (title !== title.trim()) return "leading or trailing space";
  const words = wordsOf(title);
  const lower = words.map(bare).filter(Boolean);
  const last = lower[lower.length - 1] ?? "";
  if (ALWAYS_DANGLING.has(last)) return `ends on a dangling "${words[words.length - 1]}"`;
  if (STRANDABLE.has(last) && !lower.slice(0, -1).some((w) => CLAUSE_WORDS.has(w))) {
    return `ends on a dangling "${words[words.length - 1]}" with no clause to strand it`;
  }
  const crafted = /[,:;?!.()]/.test(title) || WRITTEN_AS_NOUN_PHRASE.has(title);
  if (words.length >= 3 && !crafted && !lower.some((w) => FUNCTION_WORDS.has(w))) {
    const slugHadSmallWords = slugWords(slug).some((w) => SLUG_SMALL_WORDS.has(w));
    if (slugHadSmallWords || spelledFromSlug(title, slug)) return "no function words: a slug with its small words stripped";
  }
  if (spelledFromSlug(title, slug) && /^[A-Z][a-z]+ of\b/.test(title) && !lower.some((w) => w === "the" || w === "a" || w === "an")) {
    return `spelled from the slug and missing its article ("${words[0]} of ...")`;
  }
  return null;
}

describe("garbledReason", () => {
  // Every title that was live before the fix, spelled from its slug.
  const garbled: Array<[string, string]> = [
    ["Reformation Actually About", "reformation-actually-about"],
    ["Theology Public Health", "theology-public-health"],
    ["Church Abandoned Public Square", "church-abandoned-public-square"],
    ["Build Real Friendships Other Pastors", "build-real-friendships-other-pastors"],
    ["Mobilizing Church Missions Small Budget", "mobilizing-church-missions-small-budget"],
    ["Partnering National Pastor", "partnering-national-pastor"],
    ["Pastoral Care Wealthy", "pastoral-care-wealthy"],
    ["Cost of Ministry Silos", "cost-of-ministry-silos"],
    ["Future of Missions Already There", "future-of-missions-already-there"],
    // The same failure in the pastor-trade essays now served by PCN.
    ["Anxiety Perfectionism Pastor Breaking Cycle", "anxiety-perfectionism-pastor-breaking-cycle"],
    ["Most Dangerous Person Church Staff", "most-dangerous-person-church-staff"],
    ["Young Adults Coming Back Church", "young-adults-coming-back-church"],
    // Stripped relative to a slug that kept its small words.
    ["Church Abandoned Public Square", "why-the-church-abandoned-the-public-square"],
    ["The  Church and the Death Penalty", "church-death-penalty"],
    ["What the Reformation Was About the", "reformation"],
  ];
  it.each(garbled)("flags %j", (title, slug) => {
    expect(garbledReason(title, slug)).not.toBeNull();
  });

  // Written titles that sit near every rule's edge.
  const written: Array<[string, string]> = [
    ["Why Pastors Quit", "why-pastors-quit"],
    ["A Whole Life", "a-whole-life"],
    ["Excavation, Not Demolition", "excavation-not-demolition"],
    ["Confession Out Loud", "devo-confession-out-loud"],
    ["Marriage Across Cultural Lines", "marriage-across-cultures"],
    ["Parenting Through Divorce", "parenting-through-divorce-article"],
    ["Sabbath Isn't Optional", "sabbath-isnt-optional"],
    ["Mammon Learned to Pray", "mammon-learned-to-pray"],
    ["Literacy as Justice", "literacy-as-justice"],
    ["White Evangelicalism and Race", "white-evangelicalism-and-race"],
    ["What the Reformation Was Actually About", "reformation-actually-about"],
    ["What Is Church Actually For?", "what-is-church-actually-for"],
    ["The Burnout Nobody Talks About", "burnout-nobody-talks-about"],
    ["What Israel Was Waiting For", "messianic-expectation"],
    ["Where Do Right and Wrong Even Come From?", "apologetics-where-does-morality-come-from"],
    ["Blended Families: The Theology Nobody Prepared You For", "blended-family-theology"],
    ["Eight Weeks Toward Each Other", "marriage"],
    ["The Cost of Ministry Silos", "cost-of-ministry-silos"],
    ["A Theology of Protest", "theology-of-protest"],
    ["Disability and the Image of God", "disability-justice-theological"],
    ["What the Reformation Was Really About, and What It Broke", "reformation-actually-about"],
    ["Why Public Health Is a Theological Question for the Church", "theology-public-health"],
    ["The Loneliness of Being a Pastor: The Crisis No One in Church Leadership Talks About", "the-loneliness-of-being-a-pastor"],
    ["Moralistic Therapeutic Deism", "moralistic-therapeutic-deism"],
  ];
  it.each(written)("passes %j", (title, slug) => {
    expect(garbledReason(title, slug)).toBeNull();
  });
});

type LibraryRecord = { slug?: string; title?: unknown; published?: boolean };
type LayerEntry = { qa?: { question?: unknown } } & Record<string, unknown>;

describe("live essay titles", () => {
  const library: LibraryRecord[] = readJson(process.env.ESSAY_TITLES_LIBRARY || "content/static-library.generated.json");
  const moved = new Set<string>(readJson("content/pcn-moved.json").slugs);
  const redirected = redirectedEssaySlugs(repoRoot);
  const live = library.filter(
    (r): r is LibraryRecord & { slug: string } =>
      !!r && typeof r.slug === "string" && r.published !== false && !moved.has(r.slug) && !redirected.has(r.slug),
  );

  it("covers the library", () => {
    expect(live.length).toBeGreaterThan(200);
  });

  it("reads as written, not spelled out of a slug", () => {
    const bad = live
      .map((r) => ({ slug: r.slug, title: String(r.title ?? ""), why: garbledReason(String(r.title ?? ""), r.slug) }))
      .filter((r) => r.why)
      .map((r) => `${r.slug}: "${r.title}" (${r.why})`);
    expect(bad, "fix in the title's source; for a bridged essay, TITLE_REPAIRS in scripts/build-static-library.mjs").toEqual([]);
  });

  it("gives search engines titles that read as written too", () => {
    const layerPath = path.join(repoRoot, "content/seo-layer.generated.json");
    if (!existsSync(layerPath)) return;
    const layer: Record<string, LayerEntry> = readJson(layerPath);
    const liveSlugs = new Set(live.map((r) => r.slug));
    const bad: string[] = [];
    for (const [slug, entry] of Object.entries(layer)) {
      if (!liveSlugs.has(slug) || !entry || typeof entry !== "object") continue;
      const fields: Array<[string, unknown]> = [
        ["qa.question", entry.qa?.question],
        ...Object.entries(entry).filter(([k]) => /title/i.test(k)),
      ];
      for (const [field, value] of fields) {
        if (typeof value !== "string") continue;
        const why = garbledReason(value, slug);
        if (why) bad.push(`${slug} ${field}: "${value}" (${why})`);
      }
    }
    expect(bad).toEqual([]);
  });
});
