/**
 * The Mark pilot (docs/work/elite/bdoor-plan.md): a book's teaching
 * introduction, its map, and a chapter in plain words, rendered from the
 * site's own files. Books without a teaching guide keep their old page.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import type { BibleBook } from "@/lib/bible";
import { MAP_FRAMES, bookMaps, type BookIntro, type MapPlace } from "@/lib/bible-notes";
import BookTeaching from "./BookTeaching";
import BookMap from "./BookMap";
import PlainPassages from "./PlainPassages";

const PUBLIC = path.resolve(__dirname, "../../../../client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const BOOKS: BibleBook[] = json("bible/books.json");
const MARK = BOOKS.find((b) => b.slug === "mark")!;
const intro: BookIntro = json("bible/notes/mark/intro.json");

function publicFetch(): typeof fetch {
  return vi.fn(async (input: RequestInfo | URL) => {
    const file = path.join(PUBLIC, String(input).split("?")[0]);
    if (!file.startsWith(PUBLIC) || !fs.existsSync(file)) return new Response("", { status: 404 });
    return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "content-type": "application/json" } });
  }) as unknown as typeof fetch;
}

afterEach(() => vi.unstubAllGlobals());

describe("Mark's teaching introduction", () => {
  it("lists every part, the lists, the timeline and the map as rows that open in place, the first one open", () => {
    renderWithProviders(<BookTeaching book={MARK} teaching={intro.teaching!} />);
    const rows = Array.from(screen.getByRole("list", { name: "Contents of the guide to Mark" }).children);
    expect(rows).toHaveLength(intro.teaching!.parts.length + 4);
    const folds = rows.map((r) => r.querySelector("details")!);
    // Each row is a fold with the id a link uses (#who, #map), and only the first is open.
    expect(folds.map((d) => d.id)).toEqual([...intro.teaching!.parts.map((p) => p.id), "hard-passages", "key-words", "timeline", "map"]);
    expect(folds.map((d) => d.open)).toEqual(folds.map((_, i) => i === 0));
    expect(document.getElementById("deeper")).toBeTruthy();
    // The hard passages open their verse in the chapter.
    expect(screen.getByRole("link", { name: "Mark 2:26" }).getAttribute("href")).toBe("/study/bible/mark/2#v26");
  });

  it("narrows the timeline by kind", () => {
    renderWithProviders(<BookTeaching book={MARK} teaching={intro.teaching!} />);
    const all = document.querySelectorAll(".bk-tl li").length;
    expect(all).toBe(intro.teaching!.timeline.length);
    fireEvent.click(screen.getByRole("button", { name: "How the book came to be" }));
    const book = intro.teaching!.timeline.filter((t) => t.kind === "book").length;
    expect(document.querySelectorAll(".bk-tl li")).toHaveLength(book);
    expect(book).toBeLessThan(all);
  });

  it("only the four Gospels, Acts and Genesis have one so far, and every other book's introduction still has the fields its page draws", () => {
    for (const b of BOOKS) {
      const d: BookIntro = json(`bible/notes/${b.slug}/intro.json`);
      expect(!!d.teaching, b.slug).toBe(["mark", "matthew", "john", "luke", "acts", "genesis", "exodus", "leviticus", "numbers", "deuteronomy", "joshua", "judges", "ruth", "1-samuel", "2-samuel", "1-kings", "2-kings", "1-chronicles", "2-chronicles", "ezra", "nehemiah", "esther", "job", "psalms", "hosea", "joel", "proverbs", "ecclesiastes", "song-of-solomon", "isaiah", "jeremiah", "lamentations", "daniel", "amos", "obadiah", "jonah", "micah", "nahum", "habakkuk", "zephaniah", "haggai", "zechariah", "malachi", "ezekiel", "romans", "1-corinthians", "2-corinthians", "galatians", "ephesians", "philippians", "colossians", "1-thessalonians", "2-thessalonians", "1-timothy", "2-timothy", "titus", "philemon", "hebrews", "james", "1-peter", "2-peter", "1-john", "2-john", "3-john", "jude", "revelation"].includes(b.slug));
      expect(typeof d.overview).toBe("string");
    }
  });
});

describe("Mark's map", () => {
  it("lists every place as a button, and the card follows the one chosen", () => {
    renderWithProviders(<BookMap slug="mark" bookName="Mark" places={intro.teaching!.map} />);
    expect(screen.getByRole("img", { name: "A simple map of the places in Mark, from Sidon in the north to Jerusalem in the south." })).toBeTruthy();
    const list = within(screen.getByRole("list", { name: "Places in Mark" })).getAllByRole("button");
    expect(list).toHaveLength(intro.teaching!.map.length);
    fireEvent.click(screen.getByRole("button", { name: "Caesarea Philippi" }));
    expect(screen.getByRole("heading", { level: 3, name: "Caesarea Philippi" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Mark 8:27" }).getAttribute("href")).toBe("/study/bible/mark/8#v27");
  });
});

describe("Matthew's teaching introduction, from the same parts", () => {
  const MATTHEW = BOOKS.find((b) => b.slug === "matthew")!;
  const mt: BookIntro = json("bible/notes/matthew/intro.json");

  it("adds its own pages to Go deeper, after the shared ones", () => {
    renderWithProviders(<BookTeaching book={MATTHEW} teaching={mt.teaching!} />);
    expect(screen.getByRole("link", { name: /Jewish life in Jesus's day/ }).getAttribute("href")).toBe("/resources/context/world/jewish-life-in-jesus-day");
    expect(screen.getByRole("link", { name: /How to read the Gospels/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Matthew 27:25" }).getAttribute("href")).toBe("/study/bible/matthew/27#v25");
  });

  it("draws its own places, north to south, with its regions marked", () => {
    renderWithProviders(<BookMap slug="matthew" bookName="Matthew" places={mt.teaching!.map} />);
    expect(screen.getByRole("img", { name: "A simple map of the places in Matthew, from Sidon in the north to Bethlehem in the south." })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Bethlehem" }));
    expect(screen.getByRole("link", { name: "Matthew 2:16" }).getAttribute("href")).toBe("/study/bible/matthew/2#v16");
    expect(screen.getByText(/the two regions are placed roughly/)).toBeTruthy();
  });
});

describe("John's teaching introduction, from the same parts", () => {
  const JOHN = BOOKS.find((b) => b.slug === "john")!;
  const jn: BookIntro = json("bible/notes/john/intro.json");

  it("has its own part on 'the Jews', its hard passages and its own Go deeper pages", () => {
    renderWithProviders(<BookTeaching book={JOHN} teaching={jn.teaching!} />);
    expect(screen.getByRole("heading", { level: 3, name: "‘The Jews’ in John" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "John 8:44" }).getAttribute("href")).toBe("/study/bible/john/8#v44");
    expect(screen.getByRole("link", { name: /Jewish life in Jesus's day/ }).getAttribute("href")).toBe("/resources/context/world/jewish-life-in-jesus-day");
  });

  it("draws its own places, north to south, with Cana placed roughly", () => {
    renderWithProviders(<BookMap slug="john" bookName="John" places={jn.teaching!.map} />);
    expect(screen.getByRole("img", { name: "A simple map of the places in John, from Capernaum in the north to Jerusalem in the south." })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Sychar" }));
    expect(screen.getByRole("link", { name: "John 4:5" }).getAttribute("href")).toBe("/study/bible/john/4#v5");
    expect(screen.getByText(/the region is placed roughly/)).toBeTruthy();
  });
});

describe("Luke's teaching introduction, from the same parts", () => {
  const LUKE = BOOKS.find((b) => b.slug === "luke")!;
  const lk: BookIntro = json("bible/notes/luke/intro.json");

  it("has its parts on history and on the Jewish people, its hard passages and its own Go deeper pages", () => {
    renderWithProviders(<BookTeaching book={LUKE} teaching={lk.teaching!} />);
    expect(screen.getByRole("heading", { level: 3, name: "Luke and the history of his day" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 3, name: "Luke and the Jewish people" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Luke 2:2" }).getAttribute("href")).toBe("/study/bible/luke/2#v2");
    expect(screen.getByRole("link", { name: "Luke 23:34" }).getAttribute("href")).toBe("/study/bible/luke/23#v34");
    expect(screen.getByRole("link", { name: /The Roman world/ }).getAttribute("href")).toBe("/resources/context/world/roman-world");
  });

  it("draws its own places, north to south, with Emmaus and the Samaritan villages placed roughly", () => {
    renderWithProviders(<BookMap slug="luke" bookName="Luke" places={lk.teaching!.map} />);
    expect(screen.getByRole("img", { name: "A simple map of the places in Luke, from Capernaum in the north to Bethlehem in the south." })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Emmaus" }));
    expect(screen.getByRole("link", { name: "Luke 24:13" }).getAttribute("href")).toBe("/study/bible/luke/24#v13");
    expect(screen.getByText(/the two regions are placed roughly/)).toBeTruthy();
  });
});

describe("Acts's teaching introduction, Luke's second volume", () => {
  const ACTS = BOOKS.find((b) => b.slug === "acts")!;
  const ac: BookIntro = json("bible/notes/acts/intro.json");

  it("has its parts on Paul's letters and on the Jewish people, its hard passages and its own Go deeper pages", () => {
    renderWithProviders(<BookTeaching book={ACTS} teaching={ac.teaching!} />);
    expect(screen.getByRole("heading", { level: 3, name: "Acts and Paul's letters" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 3, name: "Acts and the Jewish people" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Acts 2:38" }).getAttribute("href")).toBe("/study/bible/acts/2#v38");
    expect(screen.getByRole("link", { name: "Acts 5:5" }).getAttribute("href")).toBe("/study/bible/acts/5#v5");
    expect(within(document.getElementById("map")!).getByText(/The second follows Paul's travels from Antioch through Asia Minor, Macedonia and Greece, and by sea to Rome\./)).toBeTruthy();
    expect(screen.queryByText(/still to come/)).toBeNull();
    expect(document.querySelector(".bk-map-hold")!.getAttribute("data-frames")).toBe("israel mediterranean");
  });

  it("draws two maps: Acts 1 to 12 on the old frame, then Paul's travels on the Mediterranean frame", () => {
    renderWithProviders(<BookMap slug="acts" bookName="Acts" places={ac.teaching!.map} />);
    const maps = Array.from(document.querySelectorAll(".bk-map"));
    expect(maps.map((m) => m.getAttribute("data-frame"))).toEqual(["israel", "mediterranean"]);
    expect(screen.getByRole("heading", { level: 3, name: "Jerusalem to Damascus, Acts 1 to 12" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 3, name: "Paul's travels and the road to Rome" })).toBeTruthy();
    expect(maps[0].querySelector("svg")!.getAttribute("viewBox")).toBe("0 0 348 462");
    expect(maps[1].querySelector("svg")!.getAttribute("viewBox")).toBe("0 0 523 292");
    expect(screen.getByRole("img", { name: "A simple map of the places in Acts, from Damascus in the north to Jerusalem in the south." })).toBeTruthy();
    expect(screen.getByRole("img", { name: "A simple map of the places in Acts, from Antioch in Syria in the east to Rome in the west." })).toBeTruthy();
    // The wide map's caption says the coasts are today's.
    expect(within(maps[1] as HTMLElement).getByText(/^A sketch, not a survey: places are set by their modern sites, and the coasts as they are now, not as they were then\.$/)).toBeTruthy();
  });

  it("each map keeps its own card; every place on the wide map is a button, even where the drawing leaves its name off", () => {
    renderWithProviders(<BookMap slug="acts" bookName="Acts" places={ac.teaching!.map} />);
    const near = within(screen.getByRole("list", { name: "Places in Acts: Jerusalem to Damascus, Acts 1 to 12" }));
    fireEvent.click(near.getByRole("button", { name: "Joppa" }));
    expect(screen.getByRole("link", { name: "Acts 9:36" }).getAttribute("href")).toBe("/study/bible/acts/9#v36");
    const wide = within(screen.getByRole("list", { name: "Places in Acts: Paul's travels and the road to Rome" }));
    expect(wide.getAllByRole("button").map((b) => b.textContent)).toEqual([
      "Antioch in Syria", "Tarsus", "Salamis", "Paphos", "Perga", "Pisidian Antioch", "Iconium", "Lystra", "Derbe",
      "Troas", "Philippi", "Thessalonica", "Berea", "Athens", "Corinth", "Ephesus", "Miletus", "Caesarea", "Jerusalem",
      "Crete (Fair Havens)", "Malta", "Syracuse", "Puteoli", "Rome",
    ]);
    // Derbe is unnamed on the drawing (the Galatian towns sit too close) but has its button and card.
    const svg = document.querySelectorAll(".bk-map__fig svg")[1];
    expect(Array.from(svg.querySelectorAll(".bk-map__name")).map((t) => t.textContent)).not.toContain("Derbe");
    expect(svg.querySelectorAll(".bk-map__place")).toHaveLength(24);
    fireEvent.click(wide.getByRole("button", { name: "Derbe" }));
    expect(screen.getByText(/Its site is not certain: it is drawn at Kerti Höyük/)).toBeTruthy();
    expect(screen.getByRole("link", { name: "Acts 14:20" }).getAttribute("href")).toBe("/study/bible/acts/14#v20");
    fireEvent.click(wide.getByRole("button", { name: "Malta" }));
    expect(screen.getByText(/Where it struck is not known for sure: it is drawn at St Paul's Bay, where tradition places it\./)).toBeTruthy();
    // The first map keeps its own choice.
    expect(near.getByRole("button", { name: "Joppa" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("every place sits inside its own map's frame", () => {
    for (const m of bookMaps(ac.teaching!.map)) {
      const f = MAP_FRAMES[m.frame];
      for (const p of m.places) {
        expect(p.lat > f.south && p.lat < f.north && p.lon > f.west && p.lon < f.east, `${m.frame} ${p.id}`).toBe(true);
      }
    }
  });
});

describe("Genesis's teaching introduction, the first Old Testament book", () => {
  const GENESIS = BOOKS.find((b) => b.slug === "genesis")!;
  const gn: BookIntro = json("bible/notes/genesis/intro.json");

  it("has its parts on authorship, its neighbors and its readers, its hard passages, and its own Go deeper pages without the Gospel ones", () => {
    renderWithProviders(<BookTeaching book={GENESIS} teaching={gn.teaching!} />);
    expect(screen.getByRole("heading", { level: 3, name: "Who wrote it, and how we know" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 3, name: "Genesis and its neighbors" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 3, name: "How Jews and Christians have read it" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Genesis 9:20-27" }).getAttribute("href")).toBe("/study/bible/genesis/9#v25");
    expect(screen.getByRole("link", { name: "Genesis 3:15" }).getAttribute("href")).toBe("/study/bible/genesis/3#v15");
    const deeper = document.getElementById("deeper")!;
    expect(within(deeper).getByRole("link", { name: /How should a Christian read Genesis 1\?/ }).getAttribute("href")).toBe("/answers/how-should-a-christian-read-genesis-1");
    expect(within(deeper).getByRole("link", { name: /The Old Testament's world/ }).getAttribute("href")).toBe("/resources/context/world/old-testament-world");
    expect(within(deeper).queryByRole("link", { name: /How to read the Gospels/ })).toBeNull();
    expect(within(document.getElementById("map")!).getByText(/The first follows the family from Ur and Haran to Canaan and down to Egypt/)).toBeTruthy();
  });

  it("draws two maps: the long journey on the wide frame, then Canaan close up", () => {
    renderWithProviders(<BookMap slug="genesis" bookName="Genesis" places={gn.teaching!.map} />);
    const maps = Array.from(document.querySelectorAll(".bk-map"));
    expect(maps.map((m) => m.getAttribute("data-frame"))).toEqual(["fertile-crescent", "canaan"]);
    expect(screen.getByRole("heading", { level: 3, name: "From Ur to Egypt" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 3, name: "Canaan, close up" })).toBeTruthy();
    expect(maps[0].querySelector("svg")!.getAttribute("viewBox")).toBe("0 0 521 311");
    expect(maps[1].querySelector("svg")!.getAttribute("viewBox")).toBe("0 0 338 483");
    expect(screen.getByRole("img", { name: "A simple map of the places in Genesis, from Ur in the east to Goshen in the west, with Haran in the north." })).toBeTruthy();
    expect(screen.getByRole("img", { name: "A simple map of the places in Genesis, from Dothan in the north to Beersheba in the south." })).toBeTruthy();
    // The wide map's caption says the coasts and rivers are today's, and counts its regions.
    expect(within(maps[0] as HTMLElement).getByText(/the coasts and rivers as they are now, not as they were then; the three regions are placed roughly\./)).toBeTruthy();
    expect(within(maps[1] as HTMLElement).getByText(/the five regions are placed roughly\./)).toBeTruthy();
  });

  it("a place card on each map follows the button chosen, and the uncertain sites say so", () => {
    renderWithProviders(<BookMap slug="genesis" bookName="Genesis" places={gn.teaching!.map} />);
    const wide = within(screen.getByRole("list", { name: "Places in Genesis: From Ur to Egypt" }));
    fireEvent.click(wide.getByRole("button", { name: "Ur" }));
    expect(screen.getByRole("heading", { level: 4, name: "Ur" })).toBeTruthy();
    expect(screen.getByText(/usually placed at Tell el-Muqayyar/)).toBeTruthy();
    expect(screen.getByRole("link", { name: "Genesis 15:7" }).getAttribute("href")).toBe("/study/bible/genesis/15#v7");
    fireEvent.click(wide.getByRole("button", { name: "Goshen" }));
    expect(screen.getByText(/eastern Nile delta; it is drawn here roughly/)).toBeTruthy();
    const close = within(screen.getByRole("list", { name: "Places in Genesis: Canaan, close up" }));
    expect(close.getAllByRole("button")).toHaveLength(11);
    fireEvent.click(close.getByRole("button", { name: "Moriah" }));
    expect(screen.getByRole("link", { name: "Genesis 22:2" }).getAttribute("href")).toBe("/study/bible/genesis/22#v2");
    expect(screen.getByText(/Where exactly is uncertain/)).toBeTruthy();
    fireEvent.click(close.getByRole("button", { name: "Sodom" }));
    expect(screen.getByText(/Where it stood is not known\. It is drawn at the south end of the Dead Sea/)).toBeTruthy();
    // Both maps keep their own choice.
    expect(wide.getByRole("button", { name: "Goshen" }).getAttribute("aria-pressed")).toBe("true");
  });

  it("every place sits inside its own map's frame", () => {
    for (const m of bookMaps(gn.teaching!.map)) {
      const f = MAP_FRAMES[m.frame];
      for (const p of m.places) {
        expect(p.lat > f.south && p.lat < f.north && p.lon > f.west && p.lon < f.east, `${m.frame} ${p.id}`).toBe(true);
      }
    }
  });
});

describe("a map's frame", () => {
  const place: MapPlace = { id: "jerusalem", name: "Jerusalem", lat: 31.778, lon: 35.235, refs: ["1:1"], line: "A test place." };

  it("is the old 'israel' frame when a book gives a bare list of places: one map, no title, the same drawing", () => {
    expect(bookMaps([place])).toEqual([{ frame: "israel", title: "", places: [place] }]);
    for (const slug of ["mark", "matthew", "john", "luke"]) {
      const t: BookIntro = json(`bible/notes/${slug}/intro.json`);
      expect(bookMaps(t.teaching!.map).map((m) => m.frame), slug).toEqual(["israel"]);
    }
    renderWithProviders(<BookMap slug="mark" bookName="Mark" places={[place]} />);
    expect(document.querySelectorAll(".bk-map")).toHaveLength(1);
    expect(document.querySelector(".bk-map")!.getAttribute("data-frame")).toBe("israel");
    expect(document.querySelector(".bk-map svg")!.getAttribute("viewBox")).toBe("0 0 348 462");
    expect(document.querySelector(".bk-map__title")).toBeNull();
    expect(screen.getByRole("heading", { level: 3, name: "Jerusalem" })).toBeTruthy();
    expect(screen.getByText(/^A sketch, not a survey: places are set by their modern sites\.$/)).toBeTruthy();
  });

  it("is chosen by the data: a named map draws on the frame it names", () => {
    renderWithProviders(<BookMap slug="genesis" bookName="Genesis" places={[{ frame: "canaan", title: "Test map", places: [place] }]} />);
    expect(document.querySelector(".bk-map")!.getAttribute("data-frame")).toBe("canaan");
    expect(screen.getByRole("heading", { level: 3, name: "Test map" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 4, name: "Jerusalem" })).toBeTruthy();
  });

  it("the validator's frames are the component's frames", () => {
    const src = fs.readFileSync(path.resolve(__dirname, "../../../../scripts/validate-bible-notes.mjs"), "utf8");
    const m = src.match(/const MAP_FRAMES = (\{.*\});/);
    expect(m).toBeTruthy();
    expect(JSON.parse(m![1])).toEqual(MAP_FRAMES);
    expect(Object.keys(JSON.parse(m![1]))).toEqual(["israel", "canaan", "fertile-crescent", "mediterranean"]);
  });

  it("only Genesis and Acts name frames; every other book with a map keeps the old frame", () => {
    for (const b of BOOKS) {
      const p = path.resolve(__dirname, `../../../../client/public/bible/notes/${b.slug}/intro.json`);
      if (!fs.existsSync(p)) continue;
      const t: BookIntro = JSON.parse(fs.readFileSync(p, "utf8"));
      if (!t.teaching?.map) continue;
      const frames = bookMaps(t.teaching.map).map((m) => m.frame);
      if (b.slug === "genesis") expect(frames).toEqual(["fertile-crescent", "canaan"]);
      else if (b.slug === "acts") expect(frames).toEqual(["israel", "mediterranean"]);
      else if (b.slug === "exodus") expect(frames).toEqual(["fertile-crescent"]);
      else if (b.slug === "leviticus") expect(frames).toEqual(["fertile-crescent"]);
      else if (b.slug === "numbers") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "deuteronomy") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "joshua") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "judges") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "ruth") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "1-samuel") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "2-samuel") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "1-kings") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "2-kings") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "1-chronicles") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "2-chronicles") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "ezra") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "nehemiah") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "esther") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "job") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "hosea") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "joel") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "proverbs") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "ecclesiastes") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "song-of-solomon") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "lamentations") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "amos") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "obadiah") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "jonah") expect(frames).toEqual(["fertile-crescent"]);
      else if (b.slug === "micah") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "nahum") expect(frames).toEqual(["fertile-crescent"]);
      else if (b.slug === "daniel") expect(frames).toEqual(["canaan", "fertile-crescent"]);
      else if (b.slug === "isaiah") expect(frames).toEqual(["canaan", "fertile-crescent"]);
      else if (b.slug === "jeremiah") expect(frames).toEqual(["canaan", "fertile-crescent"]);
      else if (b.slug === "habakkuk") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "zephaniah") expect(frames).toEqual(["canaan", "fertile-crescent"]);
      else if (b.slug === "haggai") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "zechariah") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "malachi") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "ezekiel") expect(frames).toEqual(["fertile-crescent", "canaan"]);
      else if (b.slug === "romans") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "1-corinthians") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "2-corinthians") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "galatians") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "ephesians") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "philippians") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "colossians") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "1-thessalonians") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "2-thessalonians") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "1-timothy") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "2-timothy") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "titus") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "philemon") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "hebrews") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "1-peter") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "2-peter") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "1-john") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "2-john") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "3-john") expect(frames).toEqual(["mediterranean"]);
      else if (b.slug === "jude") expect(frames).toEqual(["canaan"]);
      else if (b.slug === "revelation") expect(frames).toEqual(["mediterranean"]);
      else expect(frames, b.slug).toEqual(["israel"]);
    }
  });

  it("the space held for a book's maps names its frames, so the page can reserve the right height", () => {
    const GENESIS = BOOKS.find((b) => b.slug === "genesis")!;
    const gn: BookIntro = json("bible/notes/genesis/intro.json");
    const { unmount } = renderWithProviders(<BookTeaching book={GENESIS} teaching={gn.teaching!} />);
    expect(document.querySelector(".bk-map-hold")!.getAttribute("data-frames")).toBe("fertile-crescent canaan");
    unmount();
    renderWithProviders(<BookTeaching book={MARK} teaching={intro.teaching!} />);
    expect(document.querySelector(".bk-map-hold")!.getAttribute("data-frames")).toBe("israel");
  });
});

describe("Mark 1 to 3 in plain words", () => {
  it.each([1, 2, 3])("Mark %i: every passage, in order, with what is happening and what it asks", async (n) => {
    vi.stubGlobal("fetch", publicFetch());
    const note = json(`bible/notes/mark/${n}.json`);
    expect(note.plain).toBe(true);
    const { passages } = json(`bible/notes/mark/plain/${n}.json`);
    renderWithProviders(<PlainPassages slug="mark" chapter={n} label={`Mark ${n}`} />);
    await waitFor(() => expect(document.querySelectorAll(".pp-passage")).toHaveLength(passages.length));
    expect(screen.getAllByRole("heading", { level: 4, name: "What is happening" })).toHaveLength(passages.length);
    expect(screen.getAllByRole("heading", { level: 4, name: "What it asks" })).toHaveLength(passages.length);
    expect(within(screen.getByRole("navigation", { name: `Passages in Mark ${n}` })).getAllByRole("link")).toHaveLength(passages.length);
  });
});

describe("the third part of a passage is named for its testament", () => {
  const GOSPELS = ["matthew", "mark", "luke", "john"];

  it("a Gospel chapter keeps 'The Old Testament behind it', and nothing new appears", async () => {
    vi.stubGlobal("fetch", publicFetch());
    const { passages } = json("bible/notes/mark/plain/1.json");
    renderWithProviders(<PlainPassages slug="mark" chapter={1} label="Mark 1" />);
    await waitFor(() => expect(document.querySelectorAll(".pp-passage")).toHaveLength(passages.length));
    expect(screen.getAllByRole("heading", { level: 4, name: "The Old Testament behind it" })).toHaveLength(passages.filter((p: { ot?: string }) => p.ot).length);
    expect(screen.queryByRole("heading", { level: 4, name: "Where the Bible takes this up" })).toBeNull();
    // Five parts at most, in their old order.
    const first = document.querySelector(".pp-passage")!;
    expect(Array.from(first.querySelectorAll("h4")).map((h) => h.textContent)).toEqual(
      ["What is happening", "What the first hearers would catch", "The Old Testament behind it", "The hard verse", "What it asks"].filter((_, i) => [passages[0].happening, passages[0].hearers, passages[0].ot, passages[0].hard, passages[0].asks][i]),
    );
  });

  it("an Old Testament passage shows 'Where the Bible takes this up' in the third place", async () => {
    const passage = {
      v: "1-31",
      t: "A test passage",
      happening: "Happening text.",
      hearers: "Hearers text.",
      later: "Later text, naming John 1.",
      hard: "Hard text.",
      asks: "Asks text.",
    };
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ passages: [passage] }), { status: 200, headers: { "content-type": "application/json" } })));
    renderWithProviders(<PlainPassages slug="genesis" chapter={99} label="Genesis 99" />);
    await waitFor(() => expect(document.querySelectorAll(".pp-passage")).toHaveLength(1));
    expect(Array.from(document.querySelectorAll(".pp-passage h4")).map((h) => h.textContent)).toEqual([
      "What is happening",
      "What the first hearers would catch",
      "Where the Bible takes this up",
      "The hard verse",
      "What it asks",
    ]);
    expect(screen.queryByRole("heading", { level: 4, name: "The Old Testament behind it" })).toBeNull();
    expect(screen.getByText("Later text, naming John 1.")).toBeTruthy();
  });

  it("every plain file uses its own testament's field: `ot` in the New Testament, `later` in the Old", () => {
    for (const b of BOOKS) {
      const dir = path.join(PUBLIC, "bible/notes", b.slug, "plain");
      if (!fs.existsSync(dir)) continue;
      for (const f of fs.readdirSync(dir)) {
        for (const p of json(`bible/notes/${b.slug}/plain/${f}`).passages) {
          if (b.testament === "NT") expect(p.later, `${b.slug}/${f} ${p.v}`).toBeUndefined();
          else expect(p.ot, `${b.slug}/${f} ${p.v}`).toBeUndefined();
        }
      }
    }
  });

  it("the four Gospels keep the whole shared Go deeper list; another book keeps only 'How to study the Bible' from it", () => {
    for (const slug of GOSPELS) {
      const book = BOOKS.find((b) => b.slug === slug)!;
      const t: BookIntro = json(`bible/notes/${slug}/intro.json`);
      const { unmount } = renderWithProviders(<BookTeaching book={book} teaching={t.teaching!} />);
      const deeper = document.getElementById("deeper")!;
      expect(within(deeper).getAllByRole("link"), slug).toHaveLength(1 + 6 + (t.teaching!.deeper?.length ?? 0));
      expect(within(deeper).getByRole("link", { name: /How to read the Gospels/ })).toBeTruthy();
      expect(document.querySelector("#map .bk-learn__lede"), slug).toBeNull();
      unmount();
    }
    const GENESIS = BOOKS.find((b) => b.slug === "genesis")!;
    renderWithProviders(
      <BookTeaching book={GENESIS} teaching={{ ...intro.teaching!, deeper: [], mapNote: "Places beyond the map's edge are named here." }} />,
    );
    const deeper = document.getElementById("deeper")!;
    expect(within(deeper).queryByRole("link", { name: /How to read the Gospels/ })).toBeNull();
    expect(within(deeper).getByRole("link", { name: /How to study the Bible/ })).toBeTruthy();
    expect(within(deeper).getAllByRole("link")).toHaveLength(2);
    expect(within(document.getElementById("map")!).getByText("Places beyond the map's edge are named here.")).toBeTruthy();
  });
});

describe("Genesis 1 to 3 in plain words", () => {
  it.each([1, 2, 3])("Genesis %i: every passage, in order, with 'Where the Bible takes this up' as its third part", async (n) => {
    vi.stubGlobal("fetch", publicFetch());
    expect(json(`bible/notes/genesis/${n}.json`).plain).toBe(true);
    const { passages } = json(`bible/notes/genesis/plain/${n}.json`);
    renderWithProviders(<PlainPassages slug="genesis" chapter={n} label={`Genesis ${n}`} />);
    await waitFor(() => expect(document.querySelectorAll(".pp-passage")).toHaveLength(passages.length));
    expect(screen.getAllByRole("heading", { level: 4, name: "Where the Bible takes this up" })).toHaveLength(passages.length);
    expect(screen.queryByRole("heading", { level: 4, name: "The Old Testament behind it" })).toBeNull();
    for (const a of Array.from(document.querySelectorAll(".pp-passage"))) expect(a.querySelectorAll("h4")[2].textContent).toBe("Where the Bible takes this up");
  });
});
