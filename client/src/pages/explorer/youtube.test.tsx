/**
 * A film's video on the LiveWell YouTube channel (James, 2026-11-26): the
 * film's JSON may carry `youtube`, the video's 11-character id, and its page
 * then links "Watch on YouTube" beside Share. No id, or a malformed one, and
 * the page shows nothing new.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { isYouTubeId, youTubeHref, type ExplorerIndex } from "@/lib/explorer";
import ExplorerFilm from "./ExplorerFilm";
// @ts-expect-error a plain .mjs script, read here to hold its rules
import { youTubeIdFrom, parseList, withYouTube } from "../../../../scripts/set-film-youtube.mjs";

const PUBLIC = path.resolve(__dirname, "../../../public");
const read = (name: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, name), "utf8"));
const INDEX: ExplorerIndex = read("explorer/index.json");

afterEach(() => vi.unstubAllGlobals());

/** Serve the explorer's files, with one film's JSON changed. */
function serve(slug: string, change: Record<string, unknown>) {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      if (name === `explorer/films/${slug}.json`)
        return new Response(JSON.stringify({ ...read(name), ...change }), { status: 200, headers: { "Content-Type": "application/json" } });
      if (name.startsWith("explorer/") && fs.existsSync(path.join(PUBLIC, name)))
        return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
      return base(input, init);
    })
  );
}

function renderFilm(slug: string) {
  window.history.pushState({}, "", `/study/explorer/watch/${slug}`);
  return renderWithProviders(
    <Switch>
      <Route path="/study/explorer/watch/:slug" component={ExplorerFilm} />
    </Switch>
  );
}

describe("a film's YouTube id", () => {
  it("is accepted only in YouTube's own form", () => {
    expect(isYouTubeId("dQw4w9WgXcQ")).toBe(true);
    expect(isYouTubeId("a_b-c1D2e3F")).toBe(true);
    for (const bad of ["", "short", "https://youtu.be/dQw4w9WgXcQ", "dQw4w9WgXcQ1", "dQw4w9WgXc!", 12345678901, undefined])
      expect(isYouTubeId(bad), String(bad)).toBe(false);
    expect(youTubeHref({ youtube: "dQw4w9WgXcQ" })).toBe("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    expect(youTubeHref({ youtube: "not-an-id" })).toBeNull();
    expect(youTubeHref({})).toBeNull();
  });

  it("is well formed in every finished film that has one", () => {
    for (const f of (INDEX.films ?? []).filter((x) => x.status === "finished")) {
      const film = read(`explorer/films/${f.slug}.json`);
      if ("youtube" in film) expect(isYouTubeId(film.youtube), f.slug).toBe(true);
    }
  });

  it("puts Watch on YouTube beside Share when the film has one", async () => {
    serve("who-made-god", { youtube: "dQw4w9WgXcQ" });
    renderFilm("who-made-god");
    const link = await screen.findByRole("link", { name: "Watch on YouTube" });
    expect(link).toHaveAttribute("href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    expect(link).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("button", { name: "Share" })).toBeTruthy();
  });

  it("shows nothing new when the film has none, or a malformed one", async () => {
    serve("who-made-god", { youtube: "https://youtu.be/x" });
    renderFilm("who-made-god");
    await screen.findByRole("button", { name: "Share" });
    expect(screen.queryByRole("link", { name: "Watch on YouTube" })).toBeNull();
  });
});

describe("scripts/set-film-youtube.mjs", () => {
  const FINISHED = new Set((INDEX.films ?? []).filter((x) => x.status === "finished").map((x) => x.slug));

  it("reads the id from every address YouTube gives, or a bare id", () => {
    for (const addr of [
      "dQw4w9WgXcQ",
      "https://youtu.be/dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?feature=share&v=dQw4w9WgXcQ&t=3",
      "https://youtube.com/shorts/dQw4w9WgXcQ",
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
    ])
      expect(youTubeIdFrom(addr), addr).toBe("dQw4w9WgXcQ");
    expect(youTubeIdFrom("https://example.com/watch?v=dQw4w9WgXcQ")).toBeNull();
    expect(youTubeIdFrom("https://youtu.be/short")).toBeNull();
  });

  it("refuses the whole list when any line is wrong, naming each", () => {
    expect(parseList("# a note\n\ngospel-in-a-minute, https://youtu.be/dQw4w9WgXcQ\n", FINISHED)).toEqual([["gospel-in-a-minute", "dQw4w9WgXcQ"]]);
    expect(() => parseList("gospel-in-a-minute dQw4w9WgXcQ\nnot-a-film dQw4w9WgXcQ\ngrace nope", FINISHED)).toThrow(/line 2.*not a finished film[\s\S]*line 3.*no YouTube video id/);
  });

  it("adds or replaces only the youtube line, leaving every other byte", () => {
    const text = fs.readFileSync(path.join(PUBLIC, "explorer/films/gospel-in-a-minute.json"), "utf8");
    const added = withYouTube(text, "dQw4w9WgXcQ");
    expect(JSON.parse(added)).toEqual({ ...JSON.parse(text), youtube: "dQw4w9WgXcQ" });
    expect(added.startsWith(text.replace(/\s*\}\s*$/, ""))).toBe(true);
    const replaced = withYouTube(added, "aBcDeFgHiJk");
    expect(replaced).toBe(added.replace("dQw4w9WgXcQ", "aBcDeFgHiJk"));
  });
});
