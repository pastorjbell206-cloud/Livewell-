/**
 * /study/films: every finished Bible film for every reader, and the Bible
 * door's first room (James, 2026-11-25: the films are "the main part of what
 * drops down").
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { doorRooms } from "@/components/art/DoorInside";
import { filmHref } from "@/lib/explorer";
import BibleFilms from "./BibleFilms";

const INDEX = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../../../client/public/explorer/index.json"), "utf8"));
const FINISHED: { slug: string; title: string }[] = INDEX.films.filter((f: { status: string }) => f.status === "finished");

afterEach(() => vi.unstubAllGlobals());

describe("Bible films in the menu", () => {
  it("is the Bible door's first room, with How to study the Bible still third", () => {
    const rooms = doorRooms("bible");
    expect(rooms[0]).toMatchObject({ id: "bible.films", name: "Bible films", href: "/study/films" });
    expect(rooms[2].id).toBe("bible.how-to-study");
    expect(rooms.length).toBeLessThanOrEqual(6);
  });
});

describe("/study/films", () => {
  const answer = (body: unknown) =>
    vi.fn(async (input: RequestInfo | URL) =>
      String(input).includes("/explorer/index.json") ? new Response(JSON.stringify(body), { status: 200 }) : new Response("{}", { status: 503 }),
    );

  it("lists every finished film, each opening its own page", async () => {
    vi.stubGlobal("fetch", answer(INDEX));
    renderWithProviders(<BibleFilms />);
    expect(screen.getByRole("heading", { level: 1, name: "Bible films" })).toBeTruthy();
    await waitFor(() => expect(screen.getByRole("heading", { level: 2, name: /Every film/ })).toBeTruthy());
    for (const f of FINISHED) {
      const link = document.querySelector(`a[href="${filmHref(f.slug)}"]`);
      expect(link, f.slug).toBeTruthy();
      expect(link!.textContent, f.slug).toContain(f.title);
    }
  });

  it("says so plainly when the films do not load", async () => {
    vi.stubGlobal("fetch", answer({ v: 1 }));
    renderWithProviders(<BibleFilms />);
    await waitFor(() => expect(document.querySelector("[data-lw-failed]")).toBeTruthy());
  });
});
