/**
 * The study desk on a chapter (docs/work/elite/desk.md): the Read and Study
 * switch is remembered, "Study this chapter" walks seven steps built only
 * from the chapter's own files and says so plainly where a piece is missing,
 * and a highlight and a note on a verse survive a reload and can be removed.
 */
import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, screen, waitFor, within } from "@testing-library/react";

import { renderWithProviders } from "@/test/harness";
import type { BibleBook, BibleChapter } from "@/lib/bible";
import type { ChapterNote } from "@/lib/bible-notes";
import { MARKS_KEY, VIEW_KEY, WALK_KEY, readMarks, removeMark, saveMark } from "@/lib/bible-desk";
import { STUDY_STEPS } from "@/lib/study-method";
import StudyBible from "../StudyBible";
import ChapterWalk from "./ChapterWalk";

const PUBLIC = path.resolve(__dirname, "../../../public");
const json = <T,>(file: string): T => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const BOOKS = json<BibleBook[]>("bible/books.json");

/** Serves the committed files from disk; anything else is offline. */
const diskFetch = (async (input: RequestInfo | URL) => {
  const url = new URL(String(input instanceof Request ? input.url : input), "http://localhost");
  const file = path.join(PUBLIC, decodeURIComponent(url.pathname));
  if (file.startsWith(PUBLIC) && fs.existsSync(file) && fs.statSync(file).isFile()) {
    return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  return new Response("{}", { status: 404, headers: { "Content-Type": "application/json" } });
}) as typeof fetch;

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal("fetch", diskFetch);
});
afterEach(() => {
  vi.unstubAllGlobals();
  window.history.replaceState({}, "", "/");
});

function walk(slug: string, chapter: number) {
  const book = BOOKS.find((b) => b.slug === slug)!;
  const data = json<BibleChapter>(`bible/ch/${slug}/${chapter}.json`);
  const note = json<ChapterNote>(`bible/notes/${slug}/${chapter}.json`);
  return renderWithProviders(<ChapterWalk books={BOOKS} book={book} chapter={chapter} data={data} note={note} next={null} onClose={() => {}} />);
}
const next = () => fireEvent.click(screen.getByRole("button", { name: /^Next:/ }));
const stepName = () => document.querySelector(".wk__title")?.textContent;

describe("Study this chapter", { timeout: 20000 }, () => {
  it("walks John 3 in seven steps, each from the chapter's own files", async () => {
    walk("john", 3);
    const dialog = screen.getByRole("dialog", { name: "Study John 3" });
    expect(within(dialog).getByText("Step 1 of 7")).toBeTruthy();

    // 1. Read it: the whole chapter, named as the Berean Standard Bible.
    expect(stepName()).toBe(STUDY_STEPS[0].title);
    expect(dialog.textContent).toContain("For God so loved the world");
    expect(dialog.textContent).toContain("Berean Standard Bible");

    // 2. Notice: four questions and a private box.
    next();
    expect(stepName()).toBe("Notice");
    expect(screen.getByLabelText("What I notice")).toBeTruthy();

    // 3. Its setting: the summary and the introduction's own words.
    next();
    expect(stepName()).toBe("Its setting");
    expect(await screen.findByText("Who wrote it")).toBeTruthy();

    // 4. Its key words: each opens to its Greek and its dictionary entry.
    next();
    expect(stepName()).toBe("Its key words");
    const words = document.querySelectorAll(".wk__wordbtn");
    expect(words.length).toBe(8);
    fireEvent.click(words[0]);
    expect(await screen.findByText("Where else it appears", {}, { timeout: 5000 })).toBeTruthy();

    // 5. Cross-references, each opened in place to its verse text.
    next();
    expect(stepName()).toBe("Where else Scripture says this");
    const refs = document.querySelectorAll(".wk__xrefbtn");
    expect(refs.length).toBeGreaterThan(0);
    fireEvent.click(refs[0]);
    await waitFor(() => expect(document.querySelector(".wk__reftext")?.textContent?.length).toBeGreaterThan(10));

    // 6. The hard question, its answer one tap behind.
    next();
    expect(stepName()).toBe("The hard question");
    fireEvent.click(screen.getAllByRole("button", { name: "Show an answer" })[0]);
    expect(screen.getByRole("button", { name: "Hide the answer" })).toBeTruthy();

    // 7. What it asks of you: the study questions, a box, and the chapter's
    // "Go deeper" list as its next steps.
    next();
    expect(stepName()).toBe("What it asks of you");
    expect(screen.getByLabelText("What I will carry with me")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Finish" })).toBeTruthy();
    expect(await screen.findByText("Next steps: go deeper")).toBeTruthy();
    expect(screen.getByRole("link", { name: /New Birth/ }).getAttribute("href")).toBe("/study/bible/doctrines/regeneration");
  });

  it("keeps the step reached and what was written for each chapter", () => {
    const first = walk("john", 3);
    next();
    fireEvent.change(screen.getByLabelText("What I notice"), { target: { value: "Nicodemus comes at night." } });
    next();
    first.unmount();

    walk("john", 3);
    expect(screen.getByText("Step 3 of 7")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Back/ }));
    expect((screen.getByLabelText("What I notice") as HTMLTextAreaElement).value).toBe("Nicodemus comes at night.");
    expect(JSON.parse(localStorage.getItem(WALK_KEY)!)["john/3"].step).toBe(1);
  });

  it("walks 3 John 1 to the end, every step with something true to show", async () => {
    walk("3-john", 1);
    for (let i = 0; i < STUDY_STEPS.length; i++) {
      expect(stepName()).toBe(STUDY_STEPS[i].title);
      expect(document.querySelector(".wk__body")?.textContent).not.toMatch(/undefined|null|NaN/);
      if (i < STUDY_STEPS.length - 1) next();
    }
    expect(await screen.findByText("Next steps: go deeper")).toBeTruthy();
  });

  it("says so in one line where a chapter has no hard question (Psalm 23)", () => {
    walk("psalms", 23);
    for (let i = 0; i < 5; i++) next();
    expect(stepName()).toBe("The hard question");
    expect(screen.getByText(/do not raise a hard question/)).toBeTruthy();
  });
});

describe("Read and Study", { timeout: 20000 }, () => {
  it("opens in Study on a first visit, and remembers Read", async () => {
    window.history.replaceState({}, "", "/study/bible/john/3");
    const first = renderWithProviders(<StudyBible />);
    expect(await screen.findByRole("button", { name: "Study", pressed: true }, { timeout: 5000 })).toBeTruthy();
    expect(screen.getByText(/shows the words alone/)).toBeTruthy();
    expect(screen.getByRole("button", { name: /Study this chapter/ })).toBeTruthy();

    fireEvent.click(within(screen.getByRole("group", { name: "How to show this chapter" })).getByRole("button", { name: "Read" }));
    expect(JSON.parse(localStorage.getItem(VIEW_KEY)!)).toBe("read");
    first.unmount();

    renderWithProviders(<StudyBible />);
    expect(await screen.findByRole("button", { name: "Read", pressed: true }, { timeout: 5000 })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Text size" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: /Study this chapter/ })).toBeNull();
    await waitFor(() => expect(document.querySelector(".sb-text--read #v16")).not.toBeNull(), { timeout: 5000 });
    // Read shows no verse numbers and nothing to tap.
    expect(document.querySelector(".sb-text--read .sb-num")).toBeNull();
  });
});

describe("highlights and notes on a verse", { timeout: 20000 }, () => {
  it("keeps one verse's colour and note, and removes it in one step", () => {
    const where = { ref: "jhn.3.16", slug: "john", chapter: 3, verse: 16, label: "John 3:16" };
    let r = saveMark([], where, { color: "a" });
    r = saveMark(r.marks, where, { color: "a", note: "Loved first." });
    expect(r.saved).toBe(true);
    expect(readMarks()).toEqual([expect.objectContaining({ ref: "jhn.3.16", color: "a", note: "Loved first." })]);
    expect(removeMark(readMarks(), "jhn.3.16").marks).toEqual([]);
    expect(JSON.parse(localStorage.getItem(MARKS_KEY)!)).toEqual([]);
  });

  it("survives a reload in Study, and is removed with one tap", async () => {
    window.history.replaceState({}, "", "/study/bible/john/3#v16");
    const first = renderWithProviders(<StudyBible />);
    fireEvent.click(await screen.findByRole("button", { name: "Highlight in gold" }, { timeout: 5000 }));
    fireEvent.click(screen.getByRole("button", { name: "Note" }));
    fireEvent.change(screen.getByLabelText("Your note on John 3:16"), { target: { value: "Loved first." } });
    fireEvent.click(screen.getByRole("button", { name: "Keep" }));
    first.unmount();

    window.history.replaceState({}, "", "/study/bible/john/3");
    renderWithProviders(<StudyBible />);
    await waitFor(() => expect(document.querySelector('#v16[data-mark="a"]')).not.toBeNull(), { timeout: 5000 });
    const list = await screen.findByText("My notes on this chapter", {}, { timeout: 5000 });
    expect(list.closest("details")?.textContent).toContain("Loved first.");

    fireEvent.click(screen.getByRole("button", { name: "Remove your mark on John 3:16" }));
    await waitFor(() => expect(document.querySelector('#v16[data-mark]')).toBeNull());
    expect(readMarks()).toEqual([]);
    act(() => {});
  });
});
