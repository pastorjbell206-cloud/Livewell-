/**
 * The Bible Explorer (/study/explorer), rendered from the real data files:
 * the map loads every stop; a stop still being drawn has no link; the
 * reading level switches the words and is kept on this device; the thread
 * lights exactly the stops it names; each of the four activities keeps its
 * contract (by buttons and radio buttons, nothing dragged); progress survives
 * a reload through the storage helper, and a refused save says so.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  screen,
  fireEvent,
  waitFor,
  within,
  cleanup,
} from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import {
  EXPLORER_PROGRESS_KEY,
  readExplorerProgress,
  threadStops,
  threadsAt,
  type ExplorerIndex,
  type Stop,
} from "@/lib/explorer";
import ExplorerMap from "./ExplorerMap";
import ExplorerStop from "./ExplorerStop";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

const PUBLIC = path.resolve(__dirname, "../../../public");
const INDEX: ExplorerIndex = JSON.parse(
  fs.readFileSync(path.join(PUBLIC, "explorer/index.json"), "utf8")
);
const stopFile = (slug: string): Stop =>
  JSON.parse(
    fs.readFileSync(path.join(PUBLIC, `explorer/stops/${slug}.json`), "utf8")
  );
const FINISHED = INDEX.stops.filter(s => s.status === "finished");
const DRAWING = INDEX.stops.filter(s => s.status !== "finished");

function serve() {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      if (
        name.startsWith("explorer/") &&
        fs.existsSync(path.join(PUBLIC, name))
      )
        return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      return base(input, init);
    })
  );
}

function renderAt(url: string) {
  window.history.pushState({}, "", url);
  return renderWithProviders(
    <Switch>
      <Route path="/study/explorer/:slug" component={ExplorerStop} />
      <Route path="/study/explorer" component={ExplorerMap} />
    </Switch>
  );
}

const stored = () =>
  JSON.parse(window.localStorage.getItem(EXPLORER_PROGRESS_KEY) ?? "null");

beforeEach(() => {
  window.localStorage.clear();
  serve();
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("the data", () => {
  it("has every act of the Bible's story, numbered without a gap, four stops finished", () => {
    expect(INDEX.stops.map(s => s.n)).toEqual(INDEX.stops.map((_, i) => i + 1));
    expect(new Set(INDEX.stops.map(s => s.act)).size).toBe(11);
    expect(FINISHED.map(s => s.slug)).toEqual([
      "creation",
      "abraham",
      "rescue",
      "cross",
    ]);
    for (const s of INDEX.stops) {
      expect(s.summary.younger.length, s.slug).toBeGreaterThan(20);
      expect(s.summary.older.length, s.slug).toBeGreaterThan(20);
    }
  });

  it("gives each finished stop one activity of a kind the page runs", () => {
    expect(FINISHED.map(s => stopFile(s.slug).activity?.kind)).toEqual([
      "tap",
      "match",
      "order",
      "reveal",
    ]);
  });
});

describe("the map", () => {
  it("shows every stop; only finished stops are links, and a stop being drawn says so", async () => {
    renderAt("/study/explorer");
    await screen.findByRole("heading", { name: "Creation" });
    for (const s of FINISHED) {
      const h = screen.getByRole("heading", { name: s.title });
      expect(
        within(h).getByRole("link", { name: s.title }).getAttribute("href")
      ).toBe(`/study/explorer/${s.slug}`);
    }
    for (const s of DRAWING) {
      const item = document.getElementById(`stop-${s.slug}`)!;
      expect(item, s.slug).toBeTruthy();
      expect(
        within(item)
          .queryAllByRole("link")
          .filter(a => a.getAttribute("href")?.startsWith("/study/explorer/"))
      ).toEqual([]);
      expect(
        item.querySelector(`a[href="/study/explorer/${s.slug}"]`)
      ).toBeNull();
      expect(item.textContent).toContain("This stop is being drawn.");
    }
  });

  it("switches the reading level in one tap and keeps it on this device", async () => {
    renderAt("/study/explorer");
    await screen.findByText(INDEX.stops[0].summary.younger);
    fireEvent.click(screen.getByRole("radio", { name: "Ages 12 to 16" }));
    expect(screen.getByText(INDEX.stops[0].summary.older)).toBeInTheDocument();
    expect(screen.queryByText(INDEX.stops[0].summary.younger)).toBeNull();
    expect(stored().level).toBe("older");
    cleanup();
    renderAt("/study/explorer");
    await screen.findByText(INDEX.stops[0].summary.older);
    expect(screen.getByRole("radio", { name: "Ages 12 to 16" })).toBeChecked();
  });

  it("lights the thread at exactly the stops it names, with its line at each", async () => {
    const thread = INDEX.threads.find(t => t.status === "finished")!;
    const named = Object.keys(thread.stops!);
    expect(threadStops(thread, INDEX.stops).map(x => x.slug)).toEqual(
      INDEX.stops.filter(s => named.includes(s.slug)).map(s => s.slug)
    );
    expect(threadsAt("fall", INDEX.threads)[0].at.state).toBe("apart");

    renderAt("/study/explorer");
    await screen.findByRole("heading", { name: "Creation" });
    expect(document.querySelectorAll("[data-lit]")).toHaveLength(0);
    const button = screen.getByRole("button", { name: thread.name });
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");
    const lit = [...document.querySelectorAll("[data-lit]")].map(el =>
      el.id.replace(/^stop-/, "")
    );
    expect(lit).toEqual(
      named.sort(
        (a, b) =>
          INDEX.stops.findIndex(s => s.slug === a) -
          INDEX.stops.findIndex(s => s.slug === b)
      )
    );
    for (const slug of named)
      expect(document.getElementById(`stop-${slug}`)!.textContent).toContain(
        thread.stops![slug].line
      );
    expect(
      document.getElementById("stop-exile")!.getAttribute("data-lit")
    ).toBe("apart");
    fireEvent.click(button);
    expect(document.querySelectorAll("[data-lit]")).toHaveLength(0);
  });

  it("lists the finished doctrine cards and names the rest without links", async () => {
    renderAt("/study/explorer");
    await screen.findByRole("heading", { name: "Why we believe" });
    for (const c of INDEX.cards.filter(x => x.status === "finished"))
      expect(
        screen.getByRole("heading", { name: c.title })
      ).toBeInTheDocument();
    const soon = INDEX.cards.filter(x => x.status !== "finished");
    for (const c of soon) {
      const li = screen.getByText(c.title, { selector: ".ex-soon li" });
      expect(li.querySelector("a")).toBeNull();
    }
  });
});

describe("a stop", () => {
  it("marks the stop visited, so the map shows where you are after a reload", async () => {
    renderAt("/study/explorer/abraham");
    await screen.findByRole("heading", {
      level: 1,
      name: "Abraham and the Promise",
    });
    await waitFor(() => expect(stored()?.visited).toEqual(["abraham"]));
    expect(readExplorerProgress().last).toBe("abraham");
    cleanup();
    renderAt("/study/explorer");
    await screen.findByRole("heading", { name: "Creation" });
    expect(document.getElementById("stop-abraham")!.textContent).toContain(
      "You are here"
    );
  });

  it("a stop still being drawn answers with its summary and no activity", async () => {
    const s = DRAWING[0];
    renderAt(`/study/explorer/${s.slug}`);
    await screen.findByRole("heading", { level: 1, name: s.title });
    expect(screen.getByText(/This stop is being drawn\./)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Check/ })).toBeNull();
    expect(stored()).toBeNull();
  });

  it("tap the picture: every spot is a button; finding them all is recorded as done", async () => {
    renderAt("/study/explorer/creation");
    const act = stopFile("creation").activity!;
    if (act.kind !== "tap") throw new Error("creation is a tap activity");
    await screen.findByRole("heading", { name: act.title });
    for (const spot of act.spots) {
      const b = screen.getByRole("button", { name: spot.name });
      expect(b).toHaveAttribute("aria-pressed", "false");
      fireEvent.click(b);
      expect(b).toHaveAttribute("aria-pressed", "true");
    }
    expect(
      screen.getByText(
        `You found all ${act.spots.length}. That is the whole week of creation.`
      )
    ).toBeInTheDocument();
    await waitFor(() => expect(stored().done).toContain("creation"));
  });

  it("put in order: moves by buttons, says how many are right, and finishes in the true order", async () => {
    renderAt("/study/explorer/rescue");
    const act = stopFile("rescue").activity!;
    if (act.kind !== "order") throw new Error("rescue is an order activity");
    await screen.findByRole("heading", { name: act.title });
    const list = () =>
      [...document.querySelectorAll(".ex-order__text")].map(
        el => el.textContent ?? ""
      );
    fireEvent.click(screen.getByRole("button", { name: "Check my order" }));
    expect(
      screen.getByText(/^Not yet: \d of 4 are in the right place/)
    ).toBeInTheDocument();
    // Sort with the buttons alone, as a keyboard or a finger would.
    const want = act.items.map(x => x.text);
    for (let target = 0; target < want.length; target++) {
      let at = list().findIndex(t => t.startsWith(want[target]));
      while (at > target) {
        fireEvent.click(
          screen.getByRole("button", { name: `Move up: ${want[target]}` })
        );
        at--;
      }
    }
    expect(list().map((t, i) => t.startsWith(want[i]))).toEqual([
      true,
      true,
      true,
      true,
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Check my order" }));
    expect(
      screen.getByText("That is the order it happened.")
    ).toBeInTheDocument();
    await waitFor(() => expect(stored().done).toContain("rescue"));
  });

  it("match: asks for every answer first, marks a wrong one, and finishes when all are kept", async () => {
    renderAt("/study/explorer/abraham");
    const act = stopFile("abraham").activity!;
    if (act.kind !== "match") throw new Error("abraham is a match activity");
    await screen.findByRole("heading", { name: act.title });
    fireEvent.click(screen.getByRole("button", { name: "Check my answers" }));
    expect(
      screen.getByText(/Choose an answer for every promise first/)
    ).toBeInTheDocument();
    const groups = screen
      .getAllByRole("group")
      .filter(
        g => g.tagName === "FIELDSET" && /^Promise \d/.test(g.textContent ?? "")
      );
    expect(groups).toHaveLength(act.pairs.length);
    // One wrong on purpose.
    act.pairs.forEach((p, i) => {
      const pick = i === 0 ? act.pairs[1].kept : p.kept;
      fireEvent.click(within(groups[i]).getByRole("radio", { name: pick }));
    });
    fireEvent.click(screen.getByRole("button", { name: "Check my answers" }));
    expect(within(groups[0]).getByText("Not this one")).toBeInTheDocument();
    fireEvent.click(
      within(groups[0]).getByRole("radio", { name: act.pairs[0].kept })
    );
    fireEvent.click(screen.getByRole("button", { name: "Check my answers" }));
    expect(
      screen.getByText("All three promises, kept. God does what he says.")
    ).toBeInTheDocument();
    await waitFor(() => expect(stored().done).toContain("abraham"));
  });

  it("think, then look: each answer is behind its own button, and all of them shown is done", async () => {
    renderAt("/study/explorer/cross");
    const act = stopFile("cross").activity!;
    if (act.kind !== "reveal") throw new Error("cross is a reveal activity");
    await screen.findByRole("heading", { name: act.title });
    const buttons = screen.getAllByRole("button", { name: "Show the answer" });
    expect(buttons).toHaveLength(act.questions.length);
    buttons.forEach(b => {
      expect(b).toHaveAttribute("aria-expanded", "false");
      fireEvent.click(b);
      expect(b).toHaveAttribute("aria-expanded", "true");
    });
    expect(
      screen.getByText("You have looked at every answer.")
    ).toBeInTheDocument();
    await waitFor(() => expect(stored().done).toContain("cross"));
  });

  it("shows the older level's question, the care line toward Find Help, and the verses", async () => {
    window.localStorage.setItem(
      EXPLORER_PROGRESS_KEY,
      JSON.stringify({
        v: 1,
        level: "older",
        visited: [],
        done: [],
        last: null,
      })
    );
    renderAt("/study/explorer/rescue");
    const s = stopFile("rescue");
    await screen.findByRole("heading", { name: "A question people ask" });
    expect(screen.getByText(s.question!.ask)).toBeInTheDocument();
    const care = document.querySelector(".ex-care a[href='/help']");
    expect(care?.textContent).toBe("Find Help");
    for (const v of s.verses!)
      expect(screen.getByText(v.text)).toBeInTheDocument();
  });

  it("says plainly when this browser will not keep the progress", async () => {
    const real = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (
      this: Storage,
      key: string,
      value: string
    ) {
      if (key === EXPLORER_PROGRESS_KEY) throw new Error("quota");
      return real.call(this, key, value);
    });
    renderAt("/study/explorer/creation");
    await screen.findByRole("heading", { level: 1, name: "Creation" });
    expect(
      await screen.findByText(
        "Couldn't save to this browser — your work here will not survive a reload."
      )
    ).toBeInTheDocument();
  });
});
