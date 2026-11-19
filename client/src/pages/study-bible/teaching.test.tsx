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
import type { BookIntro } from "@/lib/bible-notes";
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
  it("opens with a contents list that reaches every part, the lists, the timeline and the map", () => {
    renderWithProviders(<BookTeaching book={MARK} teaching={intro.teaching!} />);
    const links = within(screen.getByRole("navigation", { name: "Contents of the guide to Mark" })).getAllByRole("link");
    expect(links).toHaveLength(intro.teaching!.parts.length + 5);
    for (const a of links) expect(document.getElementById(a.getAttribute("href")!.slice(1))).toBeTruthy();
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

  it("only the four Gospels and Genesis have one so far, and every other book's introduction still has the fields its page draws", () => {
    for (const b of BOOKS) {
      const d: BookIntro = json(`bible/notes/${b.slug}/intro.json`);
      expect(!!d.teaching, b.slug).toBe(["mark", "matthew", "john", "luke", "genesis"].includes(b.slug));
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
    expect(screen.getByRole("heading", { level: 2, name: "‘The Jews’ in John" })).toBeTruthy();
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
    expect(screen.getByRole("heading", { level: 2, name: "Luke and the history of his day" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "Luke and the Jewish people" })).toBeTruthy();
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

describe("Genesis's teaching introduction, the first Old Testament book", () => {
  const GENESIS = BOOKS.find((b) => b.slug === "genesis")!;
  const gn: BookIntro = json("bible/notes/genesis/intro.json");

  it("has its parts on authorship, its neighbors and its readers, its hard passages, and its own Go deeper pages without the Gospel ones", () => {
    renderWithProviders(<BookTeaching book={GENESIS} teaching={gn.teaching!} />);
    expect(screen.getByRole("heading", { level: 2, name: "Who wrote it, and how we know" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "Genesis and its neighbors" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "How Jews and Christians have read it" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Genesis 9:20-27" }).getAttribute("href")).toBe("/study/bible/genesis/9#v25");
    expect(screen.getByRole("link", { name: "Genesis 3:15" }).getAttribute("href")).toBe("/study/bible/genesis/3#v15");
    const deeper = document.getElementById("deeper")!;
    expect(within(deeper).getByRole("link", { name: /How should a Christian read Genesis 1\?/ }).getAttribute("href")).toBe("/answers/how-should-a-christian-read-genesis-1");
    expect(within(deeper).getByRole("link", { name: /The Old Testament's world/ }).getAttribute("href")).toBe("/resources/context/world/old-testament-world");
    expect(within(deeper).queryByRole("link", { name: /How to read the Gospels/ })).toBeNull();
    expect(within(document.getElementById("map")!).getByText(/Ur and Haran to the north-east, and Egypt to the south-west, lie far beyond it/)).toBeTruthy();
  });

  it("draws Canaan's places only, north to south, with Moriah and the regions placed roughly", () => {
    renderWithProviders(<BookMap slug="genesis" bookName="Genesis" places={gn.teaching!.map} />);
    expect(screen.getByRole("img", { name: "A simple map of the places in Genesis, from Dothan in the north to Bethlehem (Ephrath) in the south." })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Moriah" }));
    expect(screen.getByRole("link", { name: "Genesis 22:2" }).getAttribute("href")).toBe("/study/bible/genesis/22#v2");
    expect(screen.getByText(/Where exactly is uncertain/)).toBeTruthy();
    expect(screen.getByText(/the 4 regions are placed roughly/)).toBeTruthy();
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
