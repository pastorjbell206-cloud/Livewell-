/**
 * Church history as a course: the order, the anchors, the names an essay may
 * link, and the years the timeline reads, checked against the real libraries
 * in client/public so a renamed entry or a re-dated essay fails here.
 */
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  NEVER_LINKED, SHORT_NAMES, aliveIn, buildNameIndex, coursePlace, courseEssays, deeperEssays, entryId, essaySpan,
  essaysCovering, isSourcesFile, kindOfAnchor, splitNames, timelineStops, yearSpan,
  type Council, type Era, type Figure, type HistoryEssayEntry,
} from "./historyCourse";

const pub = (f: string) => JSON.parse(readFileSync(resolve(__dirname, "../../public", f), "utf8"));
const essays: HistoryEssayEntry[] = pub("history/essays-index.json").essays;
const eras: Era[] = pub("theology/church-history-timeline.json").eras;
const councils: Council[] = pub("theology/church-history-councils.json").councils;
const figures: Figure[] = pub("theology/church-history-figures.json").figures;
const names = buildNameIndex(figures, councils);
const link = (text: string) => splitNames(text, names, new Set()).filter((p) => typeof p !== "string") as { text: string; name: string; href: string }[];

describe("the course order", () => {
  it("numbers fourteen essays from 1, in the order of the years they start", () => {
    const course = courseEssays(essays);
    expect(course.map((e) => e.course)).toEqual(Array.from({ length: 14 }, (_, i) => i + 1));
    expect(course[0].slug).toBe("the-apostolic-age");
    expect(course[13].slug).toBe("the-global-church");
  });

  it("files each of the fourteen longer essays under a real era", () => {
    const deeper = deeperEssays(essays);
    // Eight era surveys, and six on how culture reads the Bible (James, 2026-11-25).
    expect(deeper).toHaveLength(14);
    for (const e of deeper) expect(eras.map((x) => x.name)).toContain(e.under);
    expect(deeper.find((e) => e.slug === "awakenings-and-enlightenment")?.under).toBe("The Modern and Global Church");
  });

  it("gives a course essay its number and neighbours", () => {
    const p = coursePlace(essays, "the-constantinian-turn")!;
    expect(p.entry.course).toBe(4);
    expect(p.total).toBe(14);
    expect(p.prev?.slug).toBe("the-desert-and-the-rule");
    expect(p.next?.slug).toBe("the-fathers-at-work");
    expect(coursePlace(essays, "the-apostolic-age")!.prev).toBeNull();
    expect(coursePlace(essays, "the-global-church")!.next).toBeNull();
  });

  it("points a longer essay at the course essays of its era", () => {
    const p = coursePlace(essays, "apostolic-and-persecuted")!;
    expect(p.entry.course).toBeUndefined();
    expect(p.alongside.map((e) => e.slug)).toEqual(["the-age-of-martyrs"]);
    expect(coursePlace(essays, "no-such-essay")).toBeNull();
  });
});

describe("entry anchors", () => {
  it("are stable, readable and unique", () => {
    expect(entryId("person", "Augustine of Hippo")).toBe("person-augustine-of-hippo");
    expect(entryId("person", "C.S. Lewis")).toBe("person-c-s-lewis");
    expect(entryId("heresy", "Modalism, also called Sabellianism")).toBe("heresy-modalism");
    expect(kindOfAnchor("council-first-council-of-nicaea")).toBe("council");
    expect(kindOfAnchor("timeline")).toBeNull();
    const ids = [...figures.map((f) => entryId("person", f.name)), ...councils.map((c) => entryId("council", c.name)), ...pub("theology/church-history-heresies.json").heresies.map((h: { name: string }) => entryId("heresy", h.name))];
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("names an essay links", () => {
  it("lists short forms only for entries that exist", () => {
    const real = new Set([...figures.map((f) => f.name), ...councils.map((c) => c.name)]);
    for (const name of Object.keys(SHORT_NAMES)) expect(real, name).toContain(name);
    for (const name of NEVER_LINKED) expect(real, name).toContain(name);
  });

  it("gives no short form to two entries", () => {
    const forms = Object.values(SHORT_NAMES).flat();
    expect(new Set(forms).size).toBe(forms.length);
  });

  it("links a full name and a listed short form to the entry", () => {
    expect(link("Polycarp of Smyrna, who had known the apostle John")[0]).toMatchObject({ text: "Polycarp of Smyrna", href: "/theology/history/people#person-polycarp-of-smyrna" });
    expect(link("the philosopher Justin, who had walked")[0].name).toBe("Justin Martyr");
    expect(link("bishops from across the world to Nicaea in AD 325")[0].name).toBe("First Council of Nicaea");
    expect(link("the Second Council of Nicaea restored the icons")[0].name).toBe("Second Council of Nicaea");
  });

  it("links an entry once, at its first mention", () => {
    const pieces = splitNames("Athanasius came to Nicaea. Athanasius against the world.", names, new Set());
    expect(pieces.filter((p) => typeof p !== "string")).toHaveLength(2);
    expect(pieces.map((p) => (typeof p === "string" ? p : p.text)).join("")).toBe("Athanasius came to Nicaea. Athanasius against the world.");
  });

  it("does not link a name inside a longer word, and builds its pattern without a lookbehind", () => {
    expect(link("the preAugustine years")).toEqual([]);
    expect(link("Saint-Augustine wrote the Confessions")[0].name).toBe("Augustine of Hippo");
    // Safari before 16.4 throws on a lookbehind when the pattern is built.
    expect(names.pattern?.source).not.toContain("(?<");
  });

  it("leaves another person's name alone", () => {
    expect(link("Augustine of Canterbury reached England in 597")).toEqual([]);
    expect(link("Martin Luther King Jr. wrote from a Birmingham jail")).toEqual([]);
    expect(link("Benedict XVI resigned")).toEqual([]);
    expect(link("the Lutheran princes and the Calvinists and the Benedictines")).toEqual([]);
    expect(link("the emperor Justinian")).toEqual([]);
    expect(link("Gregory wrote to John about Ignatius and Francis and Wesley")).toEqual([]);
    expect(link("the Great Schism of rival popes")).toEqual([]);
  });

  it("leaves a short form alone in a sentence dated outside that person's life", () => {
    expect(link("In 597 he sent Augustine, a reluctant monk who tried to turn back once, to Kent.")).toEqual([]);
    expect(link("He wrote from Carthage. In 597 he sent a missionary, another monk, Augustine, no relation.")).toEqual([]);
    expect(link("Rome fell in 410, and Augustine spent thirteen years answering.")[0].name).toBe("Augustine of Hippo");
    expect(link("That was 597. Augustine had asked God for chastity.")[0].name).toBe("Augustine of Hippo");
  });

  it("links the key figures the essays name to real entries", () => {
    const dir = resolve(__dirname, "../../public/history/essays");
    const real = new Set([...figures.map((f) => f.name), ...councils.map((c) => c.name)]);
    let linked = 0;
    for (const f of readdirSync(dir)) {
      for (const k of JSON.parse(readFileSync(resolve(dir, f), "utf8")).keyFigures ?? []) {
        for (const hit of link(k.name)) { expect(real).toContain(hit.name); linked++; }
      }
    }
    expect(linked).toBeGreaterThan(20);
  });
});

describe("years", () => {
  it("reads the date strings the libraries hold", () => {
    expect(yearSpan("around 35 to 108")).toEqual({ start: 35, end: 108 });
    expect(yearSpan("325")).toEqual({ start: 325, end: 325 });
    expect(yearSpan("from around 1525")).toEqual({ start: 1525, end: null });
    expect(yearSpan("today")).toBeNull();
    for (const f of figures) expect(yearSpan(f.dates), f.name).not.toBeNull();
    for (const c of councils) expect(yearSpan(c.year), c.name).not.toBeNull();
    for (const e of essays) expect(essaySpan(e, eras, 2026), e.slug).not.toBeNull();
    expect(essaySpan(essays.find((e) => e.slug === "the-east-west-schism")!, eras, 2026)).toEqual({ start: 590, end: 1054 });
  });

  it("gives every era its dated years in order, every event and council once", () => {
    const stops = timelineStops(eras, councils, 2026);
    expect(stops).toHaveLength(eras.length);
    for (const s of stops) {
      expect(s.length).toBeGreaterThan(0);
      expect(s.map((x) => x.year)).toEqual([...s.map((x) => x.year)].sort((a, b) => a - b));
    }
    expect(stops.flat().reduce((n, s) => n + s.events.length, 0)).toBe(eras.reduce((n, e) => n + e.events.length, 0));
    expect(stops.flat().flatMap((s) => s.councils.map((c) => c.name)).sort()).toEqual(councils.map((c) => c.name).sort());
  });

  it("says who was alive and which essay covers a year", () => {
    const in325 = aliveIn(325, figures, eras, 2026).map((f) => f.name);
    expect(in325).toContain("Athanasius of Alexandria");
    expect(in325).not.toContain("Augustine of Hippo");
    expect(aliveIn(1530, figures, eras, 2026).map((f) => f.name)).toContain("The Anabaptists");
    const cover = essaysCovering(325, essays, eras, 2026);
    expect(cover.map((e) => e.slug)).toContain("the-great-councils");
    expect(cover[0].course).toBeDefined();
    expect(cover[cover.length - 1].slug).toBe("councils-and-creeds");
    for (const s of timelineStops(eras, councils, 2026).flat()) expect(essaysCovering(s.year, essays, eras, 2026).length, String(s.year)).toBeGreaterThan(0);
  });
});

describe("source cards", () => {
  const dir = resolve(__dirname, "../../public/history/sources");
  it("stand under a real section of a real essay, and the index counts them", () => {
    for (const f of readdirSync(dir)) {
      const file = JSON.parse(readFileSync(resolve(dir, f), "utf8"));
      expect(isSourcesFile(file), f).toBe(true);
      const essay = pub(`history/essays/${file.essay}.json`);
      expect(`${file.essay}.json`).toBe(f);
      const sections = essay.sections.map((s: { id: string }) => s.id);
      for (const c of file.cards) {
        expect(sections, `${f}: ${c.section}`).toContain(c.section);
        for (const k of ["about", "author", "work", "reference", "translation", "corpus"]) expect(c[k], `${f}: ${k}`).toBeTruthy();
      }
      expect(essays.find((e) => e.slug === file.essay)?.sources).toBe(file.cards.length);
    }
  });
});
