/**
 * The apologetics library's pages (pages/questions, lib/questions) read from
 * the committed files in client/public/questions:
 * the data loads in the shapes the pages expect; the room lists the plan's ten
 * areas with only the text area linked, and is live with it (James,
 * 2026-11-20), its nine pieces live and the authors, jesus and science areas pending; a live piece renders word for word with no review line and no
 * noindex, its argument as a numbered list with the weight-bearing step marked;
 * a pending piece keeps noindex and the review line; and nothing outside the
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

const diskFetch = (async (input: RequestInfo | URL) => {
  const url = new URL(String(input instanceof Request ? input.url : input), "http://localhost");
  const file = path.join(PUBLIC, decodeURIComponent(url.pathname));
  if (url.pathname.startsWith("/questions/") && file.startsWith(PUBLIC) && fs.existsSync(file)) {
    return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
}) as typeof fetch;

function at(address: string, ui: React.ReactNode) {
  vi.stubGlobal("fetch", diskFetch);
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

describe("the questions library's data", () => {
  it("lists the plan's ten areas; the text area and its nine pieces are live, the authors, contradictions, jesus and science areas and their pieces pending", () => {
    expect(index.areas.map((a) => a.n)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(index.roomLive).toBe(true);
    expect(text.live).toBe(true);
    expect(text.pieces.map((p) => p.slug)).toEqual(["more-variants-than-words", "copies-of-copies", "passages-not-in-the-earliest-bibles", "did-scribes-make-jesus-more-divine", "compared-with-other-ancient-books", "who-decides-what-the-text-says", "king-james-and-the-missing-verses", "lost-in-translation", "an-angry-jesus-mark-1-41"]);
    expect(text.pieces.every((p) => p.live)).toBe(true);
    expect(authors.live).toBe(false);
    expect(authors.pieces.length).toBeGreaterThan(0);
    expect(authors.pieces.every((p) => !p.live && p.status === "pending")).toBe(true);
    expect(science.live).toBe(false);
    expect(science.pieces.length).toBe(5);
    expect(science.pieces.every((p) => !p.live && p.status === "pending")).toBe(true);
    expect(jesus.live).toBe(false);
    expect(jesus.pieces.length).toBe(5);
    expect(jesus.pieces.every((p) => !p.live && p.status === "pending")).toBe(true);
    expect(contradictions.live).toBe(false);
    expect(contradictions.pieces.length).toBe(5);
    expect(contradictions.pieces.every((p) => !p.live && p.status === "pending")).toBe(true);
    expect(index.areas.filter((a) => a.pieces.length > 0).map((a) => a.slug)).toEqual(["text", "authors", "contradictions", "jesus", "science"]);
  });

  it("gives every piece the parts the pages render", () => {
    for (const [a, p] of [...text.pieces.map((p) => ["text", p] as const), ...authors.pieces.map((p) => ["authors", p] as const), ...contradictions.pieces.map((p) => ["contradictions", p] as const), ...jesus.pieces.map((p) => ["jesus", p] as const), ...science.pieces.map((p) => ["science", p] as const)]) {
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
  it("lists ten areas, links only the text area, and is published", async () => {
    at("/questions", <QuestionsRoom />);
    await waitFor(() => expect(document.querySelectorAll(".qx-areas > li")).toHaveLength(10));
    const links = Array.from(document.querySelectorAll(".qx-areas a")).map((a) => a.getAttribute("href"));
    expect(links).toEqual(["/questions/text"]);
    expect(screen.getAllByText("Being written")).toHaveLength(9);
    expect(screen.getByText("9 pieces")).toBeInTheDocument();
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
  });

  it("pending: says noindex and carries the review line", async () => {
    const pending = authors.pieces.find((p) => !p.live)!;
    at(`/questions/authors/${pending.slug}`, <QuestionPiece />);
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
