/**
 * /downloads groups each card's files by document, one line each, so a care
 * page's eight files read as four documents in two paper sizes rather than a
 * wall of links.
 *
 * The bookshelf is there at once; the catalogue's shelves (some 8,000
 * elements on the live page) arrive as a transition, so React renders them in
 * slices instead of one long task (Lighthouse on a phone, 2026-11-25).
 */
import { afterEach, describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { renderWithProviders, offlineFetch } from "@/test/harness";
import Downloads, { fileLines } from "./Downloads";

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return { ...actual, startTransition: vi.fn(actual.startTransition) };
});

const f = (label: string) => ({ label, href: `/downloads/${label.replace(/\W+/g, "-")}.pdf` });

describe("fileLines", () => {
  it("joins a document's paper sizes on one line", () => {
    const lines = fileLines([f("One-page guide (Letter)"), f("One-page guide (A4)"), f("Prayer cards (Letter)"), f("Prayer cards (A4)")]);
    expect(lines.map((l) => [l.name, l.files.map((x) => x.label)])).toEqual([
      ["One-page guide", ["Letter", "A4"]],
      ["Prayer cards", ["Letter", "A4"]],
    ]);
  });

  it("keeps files without a paper size together on one unnamed line", () => {
    expect(fileLines([f("Leader's guide"), f("Participant handout")])).toEqual([
      { name: "", files: [{ label: "Leader's guide", file: f("Leader's guide") }, { label: "Participant handout", file: f("Participant handout") }] },
    ]);
    expect(fileLines([f("Letter"), f("A4")]).map((l) => l.files.map((x) => x.label))).toEqual([["Letter", "A4"]]);
  });
});

describe("the Downloads page", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("shows the bookshelf at once and the catalogue's shelves when the list arrives, as a transition", async () => {
    let send: (c: unknown) => void = () => {};
    const list = new Promise((resolve) => { send = resolve; });
    const offline = offlineFetch();
    vi.stubGlobal("fetch", vi.fn(async (input: RequestInfo | URL, init?: RequestInit) =>
      String(input) === "/catalogue/index.json"
        ? new Response(JSON.stringify(await list), { status: 200, headers: { "Content-Type": "application/json" } })
        : offline(input, init),
    ));
    renderWithProviders(<Downloads />);

    expect(screen.getByRole("heading", { level: 1, name: "Downloads" })).toBeInTheDocument();
    expect(document.getElementById("ebooks")?.querySelector("ul.bk-shelf li")).not.toBeNull();
    expect(screen.getByText("Gathering the files…")).toBeInTheDocument();
    const before = vi.mocked(React.startTransition).mock.calls.length;

    send({
      generatedAt: "2026-11-25",
      essaysFrom: "static-library",
      counts: {},
      items: [{ kind: "Study guide", title: "Lament: A Bible Study on Praying Your Pain", href: "/studyguides/lament", files: [f("Leader's guide"), f("Participant handout")] }],
    });
    await waitFor(() => expect(document.getElementById("study-guide-title")).not.toBeNull());
    expect(screen.queryByText("Gathering the files…")).toBeNull();
    expect(screen.getByRole("link", { name: "Lament: A Bible Study on Praying Your Pain: Leader's guide" })).toHaveAttribute("href", f("Leader's guide").href);
    expect(vi.mocked(React.startTransition).mock.calls.length).toBeGreaterThan(before);
  });
});
