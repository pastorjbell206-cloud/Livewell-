/**
 * /study/cross-references: the links are the Study Bible's own, verse for
 * verse; the starting verses are chosen by count; each linked verse opens its
 * chapter, with one more step outward on request.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { parseRef, type BibleBook, type BibleChapter } from "@/lib/bible";
import type { XrefExamples } from "@/lib/bibleStudy";
import { FollowView, followHref } from "./FollowVerse";

const PUBLIC = path.resolve(__dirname, "../../../../client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const BOOKS: BibleBook[] = json("bible/books.json");
const EXAMPLES: XrefExamples = json("bible/xref/examples.json");

function publicFetch(): typeof fetch {
  return vi.fn(async (input: RequestInfo | URL) => {
    const file = path.join(PUBLIC, String(input).split("?")[0]);
    if (!file.startsWith(PUBLIC) || !fs.existsSync(file)) return new Response("", { status: 404 });
    return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "content-type": "application/json" } });
  }) as unknown as typeof fetch;
}

afterEach(() => vi.unstubAllGlobals());

describe("the cross-reference index", () => {
  it("holds every verse's links exactly as its chapter file has them, and a file for every chapter", () => {
    let verses = 0;
    let links = 0;
    const into = new Map<string, number>();
    for (const b of BOOKS) {
      for (let c = 1; c <= b.chapters; c++) {
        const want: Record<string, string[]> = {};
        for (const v of (json(`bible/ch/${b.slug}/${c}.json`) as BibleChapter).verses) {
          if (!v.x?.length) continue;
          want[v.v] = v.x;
          verses++;
          links += v.x.length;
          for (const x of v.x) into.set(x.replace(/-\d+$/, ""), (into.get(x.replace(/-\d+$/, "")) ?? 0) + 1);
        }
        expect(json(`bible/xref/${b.slug}/${c}.json`), `${b.slug} ${c}`).toEqual(want);
      }
    }
    expect(EXAMPLES.verses).toBe(verses);
    expect(EXAMPLES.links).toBe(links);
    // The starting verses are the ones the most other verses link to: chosen by count.
    const most = Array.from(into.values()).sort((a, b) => b - a);
    expect(EXAMPLES.examples.map((e) => e.into)).toEqual(most.slice(0, EXAMPLES.examples.length));
    for (const e of EXAMPLES.examples) {
      expect(into.get(e.ref)).toBe(e.into);
      const p = parseRef(e.ref, BOOKS)!;
      expect((json(`bible/text/${p.slug}/${p.chapter}.json`) as { verses: { v: number; t: string }[] }).verses.find((v) => v.v === p.verse)!.t).toBe(e.t);
    }
  });
});

describe("the cross-reference page", () => {
  const show = (ref: string | null) => {
    const { hook, history } = memoryLocation({ path: ref ? followHref(ref) : "/study/cross-references", record: true });
    renderWithProviders(
      <Router hook={hook}>
        <FollowView refCode={ref} books={BOOKS} examples={EXAMPLES} />
      </Router>,
    );
    return history!;
  };

  it("offers the most linked-to verses to start from, each with its words and its count", () => {
    show(null);
    const list = document.querySelector(".bx-follow__starts") as HTMLElement;
    const links = within(list).getAllByRole("link");
    expect(links).toHaveLength(EXAMPLES.examples.length);
    const first = EXAMPLES.examples[0];
    expect(links[0].getAttribute("href")).toBe(`/study/cross-references?ref=${first.ref}`);
    expect(within(list).getByText(first.t)).toBeTruthy();
    expect(within(list).getAllByText(`${first.into} verses link to it.`).length).toBeGreaterThan(0);
  });

  it("shows the verses linked from a verse, grouped by book in the Bible's order, each with its words and the way to its chapter", async () => {
    vi.stubGlobal("fetch", publicFetch());
    show("Jhn.3.16");
    const refs: string[] = json("bible/xref/john/3.json")["16"];
    expect(screen.getByRole("heading", { level: 2, name: "John 3:16" })).toBeTruthy();
    await waitFor(() => expect(screen.getByRole("heading", { level: 2, name: "The verses linked from it" })).toBeTruthy());
    const items = Array.from(document.querySelectorAll(".bx-follow__book .bx-verses > li"));
    expect(items).toHaveLength(refs.length);
    // Grouped by book, in canon order.
    const heads = Array.from(document.querySelectorAll(".bx-follow__book h3")).map((h) => h.textContent);
    const slugs = Array.from(new Set(refs.map((r) => parseRef(r, BOOKS)!.slug)));
    expect(heads).toEqual(BOOKS.filter((b) => slugs.includes(b.slug)).map((b) => b.name));
    const one = parseRef(refs[0], BOOKS)!;
    const link = screen.getAllByRole("link", { name: one.label })[0];
    expect(link.getAttribute("href")).toBe(`/study/bible/${one.slug}/${one.chapter}#v${one.verse}`);
    const text = (json(`bible/text/${one.slug}/${one.chapter}.json`) as { verses: { v: number; t: string }[] }).verses.find((v) => v.v === one.verse)!.t;
    await waitFor(() => expect(link.closest("li")!.querySelector(".bx-verse__t")!.textContent).toContain(text));
  });

  it("goes one step further on request, and no further by itself", async () => {
    vi.stubGlobal("fetch", publicFetch());
    show("Jhn.3.16");
    await waitFor(() => expect(document.querySelectorAll(".bx-follow__book .bx-verses > li").length).toBeGreaterThan(0));
    const refs: string[] = json("bible/xref/john/3.json")["16"];
    const one = parseRef(refs[0], BOOKS)!;
    const li = screen.getAllByRole("link", { name: one.label })[0].closest("li") as HTMLElement;
    expect(li.querySelectorAll(".wk__xref")).toHaveLength(0);
    const step = within(li).getByRole("button", { name: "One step further" });
    expect(step.getAttribute("aria-expanded")).toBe("false");
    fireEvent.click(step);
    const next: string[] = json(`bible/xref/${one.slug}/${one.chapter}.json`)[String(one.verse)] ?? [];
    await waitFor(() => expect(li.querySelectorAll(".wk__xref")).toHaveLength(next.length));
    expect(step.getAttribute("aria-expanded")).toBe("true");
    expect(within(li).getByRole("link", { name: `Follow ${one.label.replace(/–\d+$/, "")} from here` }).getAttribute("href")).toBe(`/study/cross-references?ref=${refs[0].replace(/-\d+$/, "")}`);
  });

  it("takes a verse typed in, and says plainly when what is typed is not one verse", () => {
    const history = show(null);
    fireEvent.change(screen.getByLabelText("A verse"), { target: { value: "John 3" } });
    fireEvent.click(screen.getByRole("button", { name: "Follow it" }));
    expect(screen.getByRole("status").textContent).toContain("is not a verse this can follow");
    fireEvent.change(screen.getByLabelText("A verse"), { target: { value: "romans 8:28" } });
    fireEvent.click(screen.getByRole("button", { name: "Follow it" }));
    expect(history[history.length - 1]).toBe("/study/cross-references?ref=Rom.8.28");
  });

  it("says so when a verse has no links", async () => {
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL) => (String(input).includes("/bible/xref/") ? new Response("{}", { status: 200 }) : publicFetch()(input))));
    // A chapter this file has not read yet (the library keeps what it has fetched).
    show("Oba.1.1");
    await waitFor(() => expect(screen.getByText("The Study Bible lists no cross-references for this verse.")).toBeTruthy());
  });
});
