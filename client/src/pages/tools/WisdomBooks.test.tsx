/**
 * The Wisdom Books Explorer on its real built files: the three ways in, a
 * theme's verses in book order opening to the verses around them, a chapter
 * under the Study Bible's outline, lines kept and chapters marked read kept
 * on the device, a page that opens where the reader left it, the storage
 * refusal sentence, and the teaching panel in the notes' own words. Then
 * Ecclesiastes: its own themes, a chapter under its outline, its own saved
 * place beside Proverbs', and how to read the book in the notes' own words.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import { TestProviders } from "@/test/harness";
import WisdomBooks from "./WisdomBooks";

const PUBLIC = path.resolve(__dirname, "../../../public");
const KEY = "livewell-progress-wisdom-books";

function show() {
  return render(
    <TestProviders>
      <WisdomBooks />
    </TestProviders>,
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      const m = /\/wisdom-books\/(proverbs|ecclesiastes)\/(.+\.json)$/.exec(url);
      const file = m ? path.join(PUBLIC, "wisdom-books", m[1], m[2]) : null;
      return file && fs.existsSync(file) ? new Response(fs.readFileSync(file, "utf8"), { status: 200 }) : new Response("{}", { status: 404 });
    }),
  );
  window.scrollTo = vi.fn();
  vi.stubGlobal("requestAnimationFrame", (f: FrameRequestCallback) => {
    f(0);
    return 0;
  });
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("The Wisdom Books Explorer", () => {
  it("gathers every verse on a theme, and opens one to the verses around it", async () => {
    show();
    fireEvent.click(await screen.findByRole("radio", { name: /By theme/ }));
    fireEvent.click(await screen.findByRole("radio", { name: /^Words and the tongue/ }));
    expect(await screen.findByRole("heading", { name: "Words and the tongue" })).toBeInTheDocument();
    // The introduction's theme, word for word, is there.
    expect(screen.getByText(/From the Study Bible's introduction to Proverbs: Words and speech/)).toBeInTheDocument();
    const gentle = await screen.findByRole("button", { name: /^Proverbs 15:1\s*,\s*The verses around it$/ });
    expect(gentle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(gentle);
    expect(gentle).toHaveAttribute("aria-expanded", "true");
    const around = document.getElementById("wb-around-15-1")!;
    expect(await within(around).findByText(/The tongue of the wise commends knowledge/)).toBeInTheDocument();
    expect(within(around).getByRole("button", { name: "Read all of Proverbs 15 here" })).toBeInTheDocument();
  });

  it("lays a chapter out under the Study Bible's outline, and keeps a line and a chapter read", async () => {
    show();
    fireEvent.click(await screen.findByRole("radio", { name: /Chapter by chapter/ }));
    fireEvent.click(await screen.findByRole("button", { name: /^Proverbs 26: Fools, Slackers, and Smooth Talkers/ }));
    expect(await screen.findByRole("heading", { name: "Fools, Slackers, and Smooth Talkers" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Answering a fool/ })).toBeInTheDocument();
    const v4 = document.getElementById("p-26-4")!;
    fireEvent.click(within(v4).getByRole("button", { name: /Keep this line/ }));
    fireEvent.click(screen.getByRole("checkbox", { name: "I have read Proverbs 26" }));
    const saved = JSON.parse(localStorage.getItem(KEY)!);
    expect(saved).toMatchObject({ way: "chapter", chapter: 26, read: [26], kept: [{ c: 26, v: 4 }] });
    expect(screen.getByRole("heading", { name: "Lines you are keeping" })).toBeInTheDocument();
    // A theme chip on a verse opens that theme.
    fireEvent.click(within(v4).getByRole("button", { name: "The fool, the mocker and the simple" }));
    expect(await screen.findByRole("heading", { name: "The fool, the mocker and the simple" })).toBeInTheDocument();
  });

  it("opens where the reader left it", async () => {
    localStorage.setItem(KEY, JSON.stringify({ way: "chapter", theme: null, chapter: 10, read: [1, 2], kept: [] }));
    show();
    expect(await screen.findByRole("heading", { name: /Proverbs of Solomon|Wise|Righteous/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Proverbs 10 of 31")).toBeInTheDocument();
    expect(screen.getByText("2 of 31 chapters marked read")).toBeInTheDocument();
  });

  it("says so in the site's own sentence when the browser will not save", async () => {
    show();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    fireEvent.click(await screen.findByRole("radio", { name: /Today's chapter/ }));
    expect(screen.getByText(/Couldn't save to this browser/)).toBeInTheDocument();
  });

  it("teaches how to read a proverb in the notes' own words", async () => {
    show();
    expect(await screen.findByRole("heading", { name: "How to read a proverb" })).toBeInTheDocument();
    const notes = JSON.parse(fs.readFileSync(path.join(PUBLIC, "bible/notes/proverbs/26.json"), "utf8"));
    expect(screen.getByRole("heading", { name: notes.hard.q })).toBeInTheDocument();
    expect(screen.getByText("Do not answer a fool according to his folly, or you yourself will be like him.")).toBeInTheDocument();
    expect(screen.getByText("Answer a fool according to his folly, lest he become wise in his own eyes.")).toBeInTheDocument();
  });
});

describe("Ecclesiastes in the Wisdom Books Explorer", () => {
  it("reads Ecclesiastes by its own themes, with the introduction's theme word for word", async () => {
    show();
    fireEvent.click(await screen.findByRole("radio", { name: /^Ecclesiastes/ }));
    expect(await screen.findByRole("group", { name: "How would you like to read Ecclesiastes?" })).toBeInTheDocument();
    // No chapter a day for a book of twelve chapters.
    expect(screen.queryByRole("radio", { name: /Today's chapter/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: /By theme/ }));
    fireEvent.click(await screen.findByRole("radio", { name: /^Futility: breath and vapor/ }));
    expect(await screen.findByRole("heading", { name: "Futility: breath and vapor" })).toBeInTheDocument();
    expect(screen.getByText(/From the Study Bible's introduction to Ecclesiastes: Hevel: breath, vapor, futility/)).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: /^Ecclesiastes 1:2\s*,\s*The verses around it$/ })).toBeInTheDocument();
  });

  it("lays a chapter out under its outline, and keeps its place apart from Proverbs'", async () => {
    show();
    fireEvent.click(await screen.findByRole("radio", { name: /^Ecclesiastes/ }));
    fireEvent.click(await screen.findByRole("radio", { name: /Chapter by chapter/ }));
    fireEvent.click(await screen.findByRole("button", { name: /^Ecclesiastes 3: A Time for Everything/ }));
    expect(await screen.findByRole("heading", { name: "A Time for Everything, and Eternity in the Heart" })).toBeInTheDocument();
    expect(screen.getByText("Ecclesiastes 3 of 12")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^A time for everything/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("checkbox", { name: "I have read Ecclesiastes 3" }));
    expect(JSON.parse(localStorage.getItem(`${KEY}-ecclesiastes`)!)).toMatchObject({ way: "chapter", chapter: 3, read: [3] });
    expect(JSON.parse(localStorage.getItem(KEY)!)).toMatchObject({ book: "ecclesiastes", read: [] });
    // Back to Proverbs: its own place, untouched.
    fireEvent.click(screen.getByRole("radio", { name: /^Proverbs/ }));
    expect(await screen.findByRole("group", { name: "How would you like to read Proverbs?" })).toBeInTheDocument();
    expect(screen.queryByText(/chapters marked read/)).not.toBeInTheDocument();
  });

  it("teaches how to read Ecclesiastes in the notes' own words, each reading given", async () => {
    localStorage.setItem(KEY, JSON.stringify({ book: "ecclesiastes", way: null, theme: null, chapter: 1, read: [], kept: [] }));
    show();
    expect(await screen.findByRole("heading", { name: "How to read Ecclesiastes" })).toBeInTheDocument();
    for (const c of [1, 12]) {
      const notes = JSON.parse(fs.readFileSync(path.join(PUBLIC, `bible/notes/ecclesiastes/${c}.json`), "utf8"));
      expect(screen.getByRole("heading", { name: new RegExp(`^${notes.hard.q.replace(/[?()]/g, "\\$&")}`) })).toBeInTheDocument();
      expect(screen.getByText(notes.hard.a.split("\n\n")[0])).toBeInTheDocument();
    }
    const intro = JSON.parse(fs.readFileSync(path.join(PUBLIC, "bible/notes/ecclesiastes/intro.json"), "utf8"));
    expect(screen.getByText(intro.reading.split("\n\n")[1])).toBeInTheDocument();
  });
});
