/**
 * After the vote (U11): the two family devotions on politics ship hidden
 * behind one flag (`live` in client/public/family-devotions-world.json). While
 * the flag is false the committed index has no row for them, so their pages
 * answer "That devotion isn't here" and the library shows no tab for them.
 * Once the index lists the strand (the flag set true and the index rebuilt),
 * each has its own page, numbered in its strand, with both sides of the table
 * read in turn under Talk, and the library gives the strand its own tab.
 *
 * The hidden and live indexes are both derived from the committed one, so
 * these tests hold whichever way the flag is committed and publishing needs
 * no edit here.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, within } from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import type { FamilyIndex, FamilyIndexRow } from "@/lib/familyTable";
import { devotionFrom } from "./useFamilyData";
import DevotionPage from "./DevotionPage";
import FamilyDevotions from "../FamilyDevotions";

const PUBLIC = path.resolve(__dirname, "../../../public");
const read = (name: string) => fs.readFileSync(path.join(PUBLIC, name), "utf8");
const COMMITTED: FamilyIndex = JSON.parse(read("family/index.json"));
const WORLD_FILE = "family-devotions-world.json";
const WORLD = JSON.parse(read(WORLD_FILE)) as {
  live: boolean;
  devotions: {
    id: string;
    title: string;
    theme: string;
    passage: string;
    bigIdea: string;
    sides: { label: string; text: string }[];
  }[];
};

/** The index as scripts/build-family-index.mjs writes it while the strand is hidden. */
const HIDDEN: FamilyIndex = (() => {
  const { strands, ...rest } = COMMITTED;
  const others = (strands ?? []).filter(s => s.key !== "world");
  return {
    ...rest,
    ...(others.length ? { strands: others } : {}),
    devotions: COMMITTED.devotions.filter(r => r.file !== `/${WORLD_FILE}`),
  };
})();

/** The index as scripts/build-family-index.mjs writes it once the strand is live. */
const LIVE: FamilyIndex = {
  ...HIDDEN,
  strands: [
    ...(HIDDEN.strands ?? []),
    {
      key: "world",
      label: "The world we live in",
      count: WORLD.devotions.length,
    },
  ],
  devotions: [
    ...HIDDEN.devotions,
    ...WORLD.devotions.map<FamilyIndexRow>((d, i) => ({
      id: d.id,
      kind: "weekly",
      n: i + 1,
      strand: "world",
      title: d.title,
      theme: d.theme,
      passage: d.passage,
      href: "/study/bible/matthew/10#v2",
      file: `/${WORLD_FILE}`,
      description: d.bigIdea,
    })),
  ],
};

function serve(index: FamilyIndex) {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      const body =
        name === "family/index.json"
          ? JSON.stringify(index)
          : [
                "family-devotions.json",
                "family-devotions-2.json",
                WORLD_FILE,
              ].includes(name)
            ? read(name)
            : null;
      return body === null
        ? base(input, init)
        : new Response(body, {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
    })
  );
}

function renderAt(url: string) {
  window.history.pushState({}, "", url);
  return renderWithProviders(
    <Switch>
      <Route path="/family/devotions/:id" component={DevotionPage} />
      <Route path="/family/devotions" component={FamilyDevotions} />
    </Switch>
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.pushState({}, "", "/");
});

describe("the after-the-vote devotions behind the flag", () => {
  it("are in the committed index exactly when the file says live", () => {
    expect(typeof WORLD.live).toBe("boolean");
    expect(WORLD.devotions.map(d => d.id)).toEqual([
      "grown-ups-voted-differently",
      "praying-for-leaders",
    ]);
    const rows = COMMITTED.devotions.filter(r =>
      WORLD.devotions.some(d => d.id === r.id)
    );
    expect(rows.every(r => r.file === `/${WORLD_FILE}`)).toBe(true);
    expect(rows).toHaveLength(WORLD.live ? WORLD.devotions.length : 0);
    expect(COMMITTED.strands?.some(s => s.key === "world") ?? false).toBe(
      WORLD.live
    );
  });
});

describe("the after-the-vote devotions while hidden", () => {
  it("have no page", async () => {
    serve(HIDDEN);
    renderAt("/family/devotions/grown-ups-voted-differently");
    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "That devotion isn't here",
      })
    ).toBeInTheDocument();
  });

  it("have no tab in the library, and ?tab=world opens the weekly list", async () => {
    serve(HIDDEN);
    renderAt("/family/devotions?tab=world");
    // The weekly list is U21's Foundations strand.
    expect(
      await screen.findByRole("button", { name: /^Foundations · 72$/ })
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.queryByRole("button", { name: /world we live in/i })
    ).toBeNull();
    expect(screen.queryByText(/Grown-Ups Voted Differently/)).toBeNull();
  });
});

describe("the after-the-vote devotions once live", () => {
  it("read from the strand file's { live, devotions } shape, with their two sides", () => {
    const row = LIVE.devotions.find(r => r.id === "praying-for-leaders")!;
    const d = devotionFrom(row, JSON.parse(read(WORLD_FILE)));
    expect(d?.rendering).toBe("bsb");
    expect(d?.sides?.map(s => s.label)).toEqual([
      "If the people you voted for won",
      "If the people you voted for lost",
    ]);
    expect(d?.questions).toHaveLength(6); // younger and older together, U21's "Together" band
  });

  it("each have a page, numbered in their strand, with both sides read under Talk", async () => {
    serve(LIVE);
    renderAt("/family/devotions/grown-ups-voted-differently");
    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: "When the Grown-Ups Voted Differently",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText("1 of 2 · The world we live in")
    ).toBeInTheDocument();
    const talk = screen
      .getByRole("heading", { level: 2, name: "Talk" })
      .closest("section")!;
    for (const side of WORLD.devotions[0].sides) {
      expect(within(talk).getByText(side.label)).toBeInTheDocument();
      expect(within(talk).getByText(side.text)).toBeInTheDocument();
    }
    expect(screen.getByText(/Berean Standard Bible/)).toBeInTheDocument();
    // Next stays inside the strand; the weekly set is not its neighbour.
    expect(
      screen.getByRole("link", {
        name: "Next: Praying for Leaders We Did Not Choose",
      })
    ).toHaveAttribute("href", "/family/devotions/praying-for-leaders");
    expect(screen.queryByRole("link", { name: /^Before this/ })).toBeNull();
  });

  it("get their own tab in the library, and stay out of the weekly list", async () => {
    serve(LIVE);
    renderAt("/family/devotions?tab=world");
    expect(
      await screen.findByRole("button", { name: "The world we live in · 2" })
    ).toHaveAttribute("aria-pressed", "true");
    const list = screen.getByRole("list", {
      name: "The world we live in devotions",
    });
    expect(
      within(list).getByText("1 of 2 · After the vote")
    ).toBeInTheDocument();
    expect(
      within(list).getByRole("link", {
        name: /Praying for Leaders We Did Not Choose/,
      })
    ).toHaveAttribute("href", "/family/devotions/praying-for-leaders");
  });

  it("leave the weekly list as it was", async () => {
    serve(LIVE);
    renderAt("/family/devotions");
    // Foundations is set out by theme (U21): one list per theme group.
    expect(
      await screen.findByRole("button", { name: "Foundations · 72" })
    ).toHaveAttribute("aria-pressed", "true");
    const shelves = (LIVE.groups ?? [])
      .filter(g => g.count > 0)
      .map(g => screen.getByRole("list", { name: g.label }));
    expect(shelves.flatMap(l => within(l).getAllByRole("link"))).toHaveLength(
      72
    );
    expect(screen.queryByText(/Grown-Ups Voted Differently/)).toBeNull();
  });
});
