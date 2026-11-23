/**
 * "Watch first" in the family devotions: a devotion whose passage or subject
 * has a Bible Explorer film offers it on its page, at the table and on
 * tonight's card; the film opens in place at the younger level and "Back to
 * the devotion" closes it and returns to the button. The match comes from the
 * generated map (client/public/family/films.json), read from the real files.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { aboutMinutes, filmForDevotion, filmForQuestion, forgetFamilyFilms, isFamilyFilms, type FamilyFilms } from "@/lib/familyFilms";
import { tonightOn } from "@/lib/familyTable";
import { localISODate } from "@/lib/familyYear";
import Family from "../Family";
import DevotionPage from "./DevotionPage";
// The film player loads only when Watch first is pressed (by design); compiled
// here rather than inside a test, where on a busy machine its first load ran
// past findBy's one second.
import "@/pages/explorer/films/FilmPlayer";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

const PUBLIC = path.resolve(__dirname, "../../../public");
const MAP: FamilyFilms = JSON.parse(fs.readFileSync(path.join(PUBLIC, "family/films.json"), "utf8"));
const SERVED = /^(family\/(index|films)\.json|family-devotions(-2|-world)?\.json|family-seasonal\.json|family-catechism\.json|explorer\/films\/[a-z0-9-]+\.json)$/;

let requests: string[] = [];
function serve({ map = true } = {}) {
  requests = [];
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      requests.push(name);
      if (name === "family/films.json" && !map) return new Response("no", { status: 500 });
      if (SERVED.test(name) && fs.existsSync(path.join(PUBLIC, name))) {
        return new Response(fs.readFileSync(path.join(PUBLIC, name), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
      }
      return base(input, init);
    }),
  );
}

function renderAt(url: string) {
  window.history.pushState({}, "", url);
  return renderWithProviders(
    <Switch>
      <Route path="/family" component={Family} />
      <Route path="/family/devotions/:id" component={DevotionPage} />
    </Switch>,
  );
}

beforeEach(() => {
  localStorage.clear();
  forgetFamilyFilms();
  serve();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("the map", () => {
  it("is the shape the pages read, and answers by devotion and by question", () => {
    expect(isFamilyFilms(MAP)).toBe(true);
    expect(filmForDevotion(MAP, "prayer")?.slug).toBe("prayer");
    expect(filmForDevotion(MAP, "no-such-devotion")).toBeNull();
    expect(filmForDevotion(MAP, "constructor")).toBeNull();
    expect(filmForDevotion(null, "prayer")).toBeNull();
    expect(filmForQuestion(MAP, 53)?.slug).toBe("prayer");
    expect(filmForQuestion(MAP, 9999)).toBeNull();
    expect(isFamilyFilms({ devotions: { a: { slug: "../x", title: "t", minutes: 2 } }, catechism: {} })).toBe(false);
    expect(aboutMinutes(1)).toBe("about 1 minute");
    expect(aboutMinutes(2)).toBe("about 2 minutes");
  });
});

describe("on a devotion's page", () => {
  it("offers the matching film, opens it in place at the younger level, and comes back", async () => {
    const film = MAP.devotions.prayer;
    renderAt("/family/devotions/prayer");
    const open = await screen.findByRole("button", { name: `Watch first (${aboutMinutes(film.minutes)})` });
    expect(screen.getByText(`A short film from Bible Explorer: ${film.title}`)).toBeInTheDocument();
    // Nothing of the film is fetched until it is asked for.
    expect(requests).not.toContain("explorer/films/prayer.json");

    fireEvent.click(open);
    const data = JSON.parse(fs.readFileSync(path.join(PUBLIC, "explorer/films/prayer.json"), "utf8"));
    const group = await screen.findByRole("group", { name: `Watch first: ${film.title}` });
    expect(requests).toContain("explorer/films/prayer.json");
    // The player's intro shows the film's line at the younger level, not the older.
    await waitFor(() => expect(group.textContent).toContain(data.line.younger));
    expect(group.textContent).not.toContain(data.line.older);
    // The film's own care line is kept whole, with Find Help a link.
    expect(group.textContent).toContain(data.care);
    expect(within(group).getByRole("link", { name: "Find Help" })).toHaveAttribute("href", "/help");
    expect(screen.getByRole("link", { name: "Open this film on its own page" })).toHaveAttribute("href", "/study/explorer/watch/prayer");
    // The devotion is still on the page under the film.
    expect(screen.getByRole("heading", { name: "Read" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Back to the devotion" }));
    const again = await screen.findByRole("button", { name: `Watch first (${aboutMinutes(film.minutes)})` });
    expect(again).toHaveFocus();
    expect(screen.queryByRole("group", { name: `Watch first: ${film.title}` })).toBeNull();
  });

  it("prints the film's address in one line", async () => {
    renderAt("/family/devotions/prayer");
    await screen.findByRole("button", { name: /Watch first/ });
    expect(document.querySelector(".tb-watch__print")?.textContent).toContain("livewellbyjamesbell.co/study/explorer/watch/prayer");
  });

  it("opens the film straight away when the link asked for it", async () => {
    renderAt("/family/devotions/prayer?watch=1");
    expect(await screen.findByRole("group", { name: /Watch first: Prayer/ })).toBeInTheDocument();
  });

  it("offers nothing on a devotion with no matching film", async () => {
    const id = "patience";
    expect(MAP.devotions[id]).toBeUndefined();
    renderAt(`/family/devotions/${id}`);
    await screen.findByRole("heading", { name: "Read" });
    await waitFor(() => expect(requests).toContain("family/films.json"));
    expect(screen.queryByRole("button", { name: /Watch first/ })).toBeNull();
  });

  it("is whole without the map: no offer and no error", async () => {
    serve({ map: false });
    renderAt("/family/devotions/prayer");
    await screen.findByRole("heading", { name: "Read" });
    await waitFor(() => expect(requests).toContain("family/films.json"));
    expect(screen.queryByRole("button", { name: /Watch first/ })).toBeNull();
    expect(document.querySelector("[data-lw-failed]")).toBeNull();
  });

  it("says so and offers a retry when the film itself will not load", async () => {
    const base = globalThis.fetch;
    let fail = true;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (fail && String(input).includes("explorer/films/prayer.json")) return new Response("no", { status: 500 });
        return base(input, init);
      }),
    );
    renderAt("/family/devotions/prayer");
    fireEvent.click(await screen.findByRole("button", { name: /Watch first/ }));
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    fail = false;
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    await waitFor(() => expect(screen.queryByRole("alert")).toBeNull());
    expect(screen.getByRole("button", { name: "Back to the devotion" })).toBeInTheDocument();
  });
});

describe("at the table", () => {
  it("offers the film on the first screen, before the passage, and comes back to the passage", async () => {
    renderAt("/family/devotions/prayer?mode=table");
    const open = await screen.findByRole("button", { name: /Watch first/ });
    fireEvent.click(open);
    fireEvent.click(await screen.findByRole("button", { name: "Back to the passage" }));
    expect(await screen.findByRole("button", { name: /Watch first/ })).toHaveFocus();
  });

  it("does not offer it on the later screens", async () => {
    renderAt("/family/devotions/prayer?mode=table&step=2");
    await screen.findByRole("heading", { name: "Talk" });
    await waitFor(() => expect(requests).toContain("family/films.json"));
    expect(screen.queryByRole("button", { name: /Watch first/ })).toBeNull();
  });
});

describe("tonight's card on /family", () => {
  it("offers the film when tonight's devotion has one, and links to it opened", async () => {
    // Find a date whose devotion has a film, from the year map itself.
    let when: Date | null = null;
    let id = "";
    for (let d = 0; d < 400 && !when; d++) {
      const day = new Date(2026, 0, 1 + d, 18);
      const t = tonightOn(localISODate(day));
      if (t && MAP.devotions[t.id]) {
        when = day;
        id = t.id;
      }
    }
    expect(when, "a night in the year whose devotion has a film").not.toBeNull();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(when!);
    renderAt("/family");
    const film = MAP.devotions[id];
    const link = await screen.findByRole("link", { name: `Watch first (${aboutMinutes(film.minutes)}): ${film.title}` });
    expect(link).toHaveAttribute("href", `/family/devotions/${id}?watch=1`);
  });
});
