/**
 * The apologetics library's pages (pages/questions, lib/questions) read from
 * the committed files in client/public/questions:
 * the data loads in the shapes the pages expect; the room lists the plan's ten
 * areas, each linked, with its one line and its number of live pieces, and is
 * live (James, 2026-11-20: "publish all of this when ready"); every piece that
 * has had its second read is live, and since 2026-11-21 nothing in the
 * committed library is pending (the pending cases below make their own
 * pending piece by serving a changed manifest); a live piece renders
 * word for word with no review line and no noindex, its argument as a numbered
 * list with the weight-bearing step marked; a pending piece keeps noindex and
 * the review line and is listed on no live page; and nothing outside the
 * library links a pending page.
 */
import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import { renderWithProviders } from "@/test/harness";
import { REVIEW_LINE, linkPaths, type QIndex, type QPiece } from "@/lib/questions";
import { DOORS, allEntries } from "@/lib/siteCatalog";
import QuestionsRoom from "./QuestionsRoom";
import QuestionsArea from "./QuestionsArea";
import QuestionPiece from "./QuestionPiece";
import QuestionsClaims from "./QuestionsClaims";

const PUBLIC = path.resolve(__dirname, "../../../public");
const SRC = path.resolve(__dirname, "../..");
const read = <T,>(rel: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, rel), "utf8")) as T;

/** Serves the committed files; `manifest`, when given, stands in for index.json. */
const diskFetch = (manifest?: QIndex) => (async (input: RequestInfo | URL) => {
  const url = new URL(String(input instanceof Request ? input.url : input), "http://localhost");
  const file = path.join(PUBLIC, decodeURIComponent(url.pathname));
  if (manifest && url.pathname === "/questions/index.json") {
    return new Response(JSON.stringify(manifest), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  if (url.pathname.startsWith("/questions/") && file.startsWith(PUBLIC) && fs.existsSync(file)) {
    return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
}) as typeof fetch;

function at(address: string, ui: React.ReactNode, manifest?: QIndex) {
  vi.stubGlobal("fetch", diskFetch(manifest));
  const { hook } = memoryLocation({ path: address, static: true });
  return renderWithProviders(<Router hook={hook}>{ui}</Router>);
}
const robots = () => document.head.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";

afterEach(() => {
  vi.unstubAllGlobals();
});

const index = read<QIndex>("questions/index.json");
const text = index.areas.find((a) => a.slug === "text")!;
const authors = index.areas.find((a) => a.slug === "authors")!;
const science = index.areas.find((a) => a.slug === "science")!;
const jesus = index.areas.find((a) => a.slug === "jesus")!;
const contradictions = index.areas.find((a) => a.slug === "contradictions")!;
const oldTestament = index.areas.find((a) => a.slug === "old-testament")!;
const evil = index.areas.find((a) => a.slug === "evil")!;
const god = index.areas.find((a) => a.slug === "god")!;
const morality = index.areas.find((a) => a.slug === "morality")!;
const religions = index.areas.find((a) => a.slug === "religions")!;
/**
 * No committed piece is pending (the last, the morality page on homosexuality,
 * went live on James's word of 2026-11-21: "state my position on the page").
 * The pending cases set one piece pending in a copy of the manifest.
 */
const SEEDED_PENDING = "is-christian-morality-a-product-of-its-culture";
const withPending: QIndex = {
  ...index,
  areas: index.areas.map((a) => (a.slug !== "morality" ? a : { ...a, pieces: a.pieces.map((p) => (p.slug !== SEEDED_PENDING ? p : { ...p, status: "pending" as const, live: false })) })),
};

describe("the questions library's data", () => {
  const PENDING: Record<string, string[]> = {};
  const LIVE_COUNT: Record<string, number> = { god: 5, text: 9, authors: 10, contradictions: 5, jesus: 10, "old-testament": 10, science: 10, evil: 5, morality: 10, religions: 5 };

  it("lists the plan's ten areas, all live, each with its line; all 79 pieces are live", () => {
    expect(index.areas.map((a) => a.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(index.roomLive).toBe(true);
    expect(index.areas.map((a) => a.slug)).toEqual(["god", "text", "authors", "contradictions", "jesus", "old-testament", "science", "evil", "morality", "religions"]);
    for (const a of index.areas) {
      expect(a.live, a.slug).toBe(true);
      expect((a.line ?? "").length, a.slug).toBeGreaterThan(20);
      const pending = a.pieces.filter((p) => !p.live).map((p) => p.slug);
      expect(pending, a.slug).toEqual(PENDING[a.slug] ?? []);
      expect(a.pieces.filter((p) => p.live).length, a.slug).toBe(LIVE_COUNT[a.slug]);
      for (const p of a.pieces) expect(p.live, p.slug).toBe(p.status === "live");
    }
    expect(index.areas.flatMap((a) => a.pieces).length).toBe(79);
    expect(index.areas.flatMap((a) => a.pieces).filter((p) => p.live).length).toBe(79);
    expect(text.pieces.map((p) => p.slug)).toEqual(["more-variants-than-words", "copies-of-copies", "passages-not-in-the-earliest-bibles", "did-scribes-make-jesus-more-divine", "compared-with-other-ancient-books", "who-decides-what-the-text-says", "king-james-and-the-missing-verses", "lost-in-translation", "an-angry-jesus-mark-1-41"]);
  });

  it("gives every piece the parts the pages render", () => {
    for (const [a, p] of [...text.pieces.map((p) => ["text", p] as const), ...authors.pieces.map((p) => ["authors", p] as const), ...contradictions.pieces.map((p) => ["contradictions", p] as const), ...jesus.pieces.map((p) => ["jesus", p] as const), ...oldTestament.pieces.map((p) => ["old-testament", p] as const), ...science.pieces.map((p) => ["science", p] as const), ...evil.pieces.map((p) => ["evil", p] as const), ...god.pieces.map((p) => ["god", p] as const), ...morality.pieces.map((p) => ["morality", p] as const), ...religions.pieces.map((p) => ["religions", p] as const)]) {
      const piece = read<QPiece>(`questions/${a}/${p.slug}.json`);
      expect(piece.question).toBe(p.question);
      expect(piece.sections.map((s) => s.role)).toEqual(expect.arrayContaining(["objection", "concessions", "evidence", "argument", "reply", "unresolved", "differ"]));
      const arg = piece.sections.find((s) => s.role === "argument");
      expect(arg && "steps" in arg && arg.steps.length).toBeGreaterThan(1);
      expect(piece.otherSide.length).toBeGreaterThan(1);
      expect(piece.further.length).toBeGreaterThan(1);
    }
  });

  it("links a path in the prose without changing the words", () => {
    expect(linkPaths("the answer (/answers/x), which")).toBe("the answer ([/answers/x](/answers/x)), which");
    expect(linkPaths("[a](/b)")).toBe("[a](/b)");
  });
});

describe("the room", () => {
  it("lists ten areas, each linked with its line and its number of live pieces, and is published", async () => {
    at("/questions", <QuestionsRoom />);
    await waitFor(() => expect(document.querySelectorAll(".qx-areas > li")).toHaveLength(10));
    const links = Array.from(document.querySelectorAll(".qx-areas a")).map((a) => a.getAttribute("href"));
    expect(links).toEqual(index.areas.map((a) => `/questions/${a.slug}`));
    expect(screen.queryByText("Being written")).toBeNull();
    const cards = Array.from(document.querySelectorAll(".qx-areas > li"));
    index.areas.forEach((a, i) => {
      const n = a.pieces.filter((p) => p.live).length;
      expect(cards[i].textContent, a.slug).toContain(a.line!);
      expect(cards[i].querySelector(".qx-area__count")?.textContent?.trim(), a.slug).toBe(`${n} pieces`);
    });
    expect(screen.queryByText(REVIEW_LINE)).toBeNull();
    expect(robots()).not.toContain("noindex");
  });
});

describe("the area", () => {
  it("opens with its own text and lists its nine live pieces", async () => {
    at("/questions/text", <QuestionsArea />);
    expect(await screen.findByRole("heading", { level: 1, name: "Can we trust the text of the New Testament?" })).toBeInTheDocument();
    await waitFor(() => expect(document.querySelectorAll(".qx-pieces a")).toHaveLength(9));
    const listed = Array.from(document.querySelectorAll(".qx-pieces a")).map((a) => a.getAttribute("href"));
    for (const p of text.pieces.filter((x) => !x.live)) expect(listed).not.toContain(`/questions/text/${p.slug}`);
    expect(screen.queryByText(REVIEW_LINE)).toBeNull();
    expect(screen.getByText("Autograph")).toBeInTheDocument();
  });
});

describe("the morality area", () => {
  it("lists all ten of its pieces, the page on homosexuality among them", async () => {
    at("/questions/morality", <QuestionsArea />);
    expect(await screen.findByRole("heading", { level: 1, name: morality.title })).toBeInTheDocument();
    await waitFor(() => expect(document.querySelectorAll(".qx-pieces a")).toHaveLength(10));
    const listed = Array.from(document.querySelectorAll(".qx-pieces a")).map((a) => a.getAttribute("href"));
    expect(listed).toEqual(morality.pieces.map((p) => `/questions/morality/${p.slug}`));
    expect(listed).toContain("/questions/morality/what-the-bible-says-about-homosexuality");
    expect(screen.queryByText(REVIEW_LINE)).toBeNull();
    expect(robots()).not.toContain("noindex");
  });
});

describe("an area with a piece still pending (seeded)", () => {
  it("lists its live pieces and none of the pending ones", async () => {
    at("/questions/morality", <QuestionsArea />, withPending);
    expect(await screen.findByRole("heading", { level: 1, name: morality.title })).toBeInTheDocument();
    await waitFor(() => expect(document.querySelectorAll(".qx-pieces a")).toHaveLength(9));
    const listed = Array.from(document.querySelectorAll(".qx-pieces a")).map((a) => a.getAttribute("href"));
    expect(listed).toEqual(morality.pieces.filter((p) => p.slug !== SEEDED_PENDING).map((p) => `/questions/morality/${p.slug}`));
    expect(listed).not.toContain(`/questions/morality/${SEEDED_PENDING}`);
    expect(screen.queryByText(REVIEW_LINE)).toBeNull();
    expect(robots()).not.toContain("noindex");
  });
});

describe("a piece", () => {
  it("live: renders the short answer, the contents, the steps with the weight marked and the reading lists, with no review line and no noindex", async () => {
    const piece = read<QPiece>("questions/text/passages-not-in-the-earliest-bibles.json");
    at("/questions/text/passages-not-in-the-earliest-bibles", <QuestionPiece />);
    expect(await screen.findByRole("heading", { level: 1, name: piece.question })).toBeInTheDocument();
    await waitFor(() => expect(document.querySelector(".qx-short")).not.toBeNull());
    expect(document.querySelector(".qx-short")?.textContent).toContain("The last twelve verses of Mark (16:9-20)");
    expect(screen.queryByText(REVIEW_LINE)).toBeNull();
    expect(robots()).not.toContain("noindex");

    const contents = screen.getByRole("navigation", { name: "In this piece" });
    const hrefs = within(contents).getAllByRole("link").map((a) => a.getAttribute("href"));
    for (const h of hrefs) expect(document.getElementById(h!.slice(1)), h!).not.toBeNull();

    const arg = piece.sections.find((s) => s.role === "argument")!;
    if (!("steps" in arg)) throw new Error("no steps");
    const steps = document.querySelectorAll(".qx-arg ol > li");
    expect(steps).toHaveLength(arg.steps.length);
    expect(document.querySelector(".qx-arg ol > li.qx-weight")).toBe(steps[arg.weightStep - 1]);
    expect(screen.getByText("This step carries the weight")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Read the other side" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Read further" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Mark 16/ }).map((a) => a.getAttribute("href"))).toContain("/study/bible/mark/16");

    // The reader who disagrees is told where to say so (walk 2026-11, finding 2).
    const back = screen.getByTestId("push-back");
    expect(back).toHaveTextContent("Think this piece gets something wrong? Write to James and say where.");
    expect(within(back).getByRole("link", { name: "Write to James" }).getAttribute("href")).toBe("/contact");
  });

  it("the page on homosexuality is live: no review line, no noindex, where the author lands before the closing care passage", async () => {
    const slug = "what-the-bible-says-about-homosexuality";
    const piece = read<QPiece>(`questions/morality/${slug}.json`);
    at(`/questions/morality/${slug}`, <QuestionPiece />);
    expect(await screen.findByRole("heading", { level: 1, name: piece.question })).toBeInTheDocument();
    await waitFor(() => expect(document.querySelector(".qx-short")).not.toBeNull());
    expect(screen.queryByText(REVIEW_LINE)).toBeNull();
    expect(robots()).not.toContain("noindex");
    const care = "If you are gay, or love someone who is, you are met with respect here.";
    expect(piece.shortAnswer.startsWith(care)).toBe(true);
    const differ = piece.sections.find((s) => s.role === "differ")!;
    if (!("body" in differ)) throw new Error("no body");
    const paras = differ.body.split("\n\n");
    expect(paras[paras.length - 2].startsWith("The author of this site holds the historic teaching")).toBe(true);
    expect(paras[paras.length - 1]).toContain(care);
    expect(JSON.stringify(piece)).not.toMatch(/page takes no side|This page does the same/);
  });

  it("pending (seeded): says noindex and carries the review line", async () => {
    const pending = withPending.areas.find((a) => a.slug === "morality")!.pieces.find((p) => !p.live)!;
    expect(pending.slug).toBe(SEEDED_PENDING);
    at(`/questions/morality/${pending.slug}`, <QuestionPiece />, withPending);
    expect(await screen.findByRole("heading", { level: 1, name: pending.question })).toBeInTheDocument();
    expect(await screen.findByText(REVIEW_LINE)).toBeInTheDocument();
    await waitFor(() => expect(robots()).toContain("noindex"));
  });

  it("prints every paragraph of its prose", async () => {
    const piece = read<QPiece>("questions/text/copies-of-copies.json");
    at("/questions/text/copies-of-copies", <QuestionPiece />);
    await waitFor(() => expect(document.querySelector(".qx-short")).not.toBeNull());
    const page = (document.querySelector("article")?.textContent ?? "").replace(/\s+/g, " ");
    // Typewriter quotes are set curly on screen (lib/smartQuotes); compare without them.
    const flat = (s: string) => s.replace(/[“”"‘’']/g, "").replace(/\*/g, "").replace(/\s+/g, " ");
    for (const s of piece.sections) {
      const body = s.role === "argument" ? s.intro : s.body;
      for (const para of body.split("\n\n")) expect(flat(page)).toContain(flat(para).slice(0, 120));
    }
  });
});

describe("the claims index", () => {
  it("lists each claim with its work and the piece that answers it", async () => {
    at("/questions/claims", <QuestionsClaims />);
    expect(await screen.findByText("The Johannine Comma")).toBeInTheDocument();
    expect(document.querySelectorAll(".qx-claims li")).toHaveLength(index.claims.filter((c) => c.live).length);
    expect(screen.getAllByRole("link", { name: /Two famous passages/ })[0]).toHaveAttribute("href", "/questions/text/passages-not-in-the-earliest-bibles");
  });
});

describe("nothing pending is linked from outside the library", () => {
  const live = new Set(["/questions", "/questions/claims", ...index.areas.filter((a) => a.live).map((a) => `/questions/${a.slug}`), ...index.areas.flatMap((a) => a.pieces.filter((p) => p.live).map((p) => `/questions/${a.slug}/${p.slug}`))]);
  const pendingPaths = index.areas.flatMap((a) => [...(a.live ? [] : [`/questions/${a.slug}`]), ...a.pieces.filter((p) => !p.live).map((p) => `/questions/${a.slug}/${p.slug}`)]);

  it("the site catalogue (the menus) links only live library pages", () => {
    const linked = Array.from(JSON.stringify([DOORS, allEntries()]).matchAll(/"(\/questions[^"]*)"/g), (m) => m[1]);
    expect(linked).toContain("/questions");
    for (const h of linked) expect(live.has(h), h).toBe(true);
  });

  it("is linked from no page or data file outside the library", () => {
    const hits: string[] = [];
    const walk = (dir: string) => {
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) { if (!p.endsWith(path.join("pages", "questions"))) walk(p); continue; }
        if (!/\.(tsx?|json)$/.test(e.name) || /\.test\.tsx?$/.test(e.name) || p.endsWith("App.tsx") || p.endsWith(path.join("lib", "questions.ts"))) continue;
        const src = fs.readFileSync(p, "utf8");
        for (const q of pendingPaths) if (new RegExp(`(?<![A-Za-z0-9_/}.-])${q.replace(/[/-]/g, "\\$&")}(?=["'\`#?)\\s]|$)`, "m").test(src)) hits.push(`${path.relative(SRC, p)} ${q}`);
      }
    };
    walk(SRC);
    expect(hits).toEqual([]);
  });
});
