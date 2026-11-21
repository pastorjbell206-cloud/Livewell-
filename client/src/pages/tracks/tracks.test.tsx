/**
 * The track pages, rendered from the real files (client/public/tracks),
 * served by a fetch stub that reads client/public.
 *
 * - /tracks lists the track with its sessions and "Start", names what is not
 *   written yet, and offers "Continue where you left off" once begun.
 * - /tracks/:slug lists the sessions in order and continues at the first not
 *   done.
 * - A session shows its teaching, the page it opens, one question, one thing
 *   to do, one verse, the care line where it has one, and the group guide;
 *   says the answers stay on the device; keeps the answer and the tick; says
 *   so when the browser will not save; and marks itself done.
 * - Leaving a session for the page it opens sets the way back, the bar shows
 *   it on that page, and coming back clears it.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, render, screen, waitFor, fireEvent, within } from "@testing-library/react";
import { Router, Route, Switch } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import fs from "node:fs";
import path from "node:path";

import { TestProviders } from "@/test/harness";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import TrackReturnBar from "@/components/TrackReturnBar";
import { NO_TRACKS, readReturn, readTracks, saveTracks, setReturn, withDone } from "@/lib/tracks";
import { KEPT_HERE } from "@/lib/study-method";
import Tracks from "./Tracks";
import Track from "./Track";
import TrackSession from "./TrackSession";

const PUBLIC = path.resolve(__dirname, "../../../public");
const FILE = JSON.parse(fs.readFileSync(path.join(PUBLIC, "tracks/new-to-this.json"), "utf8"));
const T = { slug: "new-to-this", title: FILE.title as string, total: FILE.sessions.length as number };

function servePublic() {
  return vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input).replace(/^https?:\/\/[^/]+/, "").split("?")[0];
    const file = path.join(PUBLIC, url);
    if (file.startsWith(PUBLIC) && fs.existsSync(file) && fs.statSync(file).isFile()) {
      return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response("not found", { status: 404 });
  });
}

function renderAt(p: string) {
  const loc = memoryLocation({ path: p, record: true });
  const view = render(
    <TestProviders>
      <Router hook={loc.hook}>
        <Switch>
          <Route path="/tracks" component={Tracks} />
          <Route path="/tracks/:slug" component={Track} />
          <Route path="/tracks/:slug/:n" component={TrackSession} />
          <Route>
            <p>Another page</p>
          </Route>
        </Switch>
        <TrackReturnBar />
      </Router>
    </TestProviders>,
  );
  return { ...view, loc };
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  vi.stubGlobal("fetch", servePublic());
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("/tracks", () => {
  it("lists the track with Start at session 1, and says plainly what is not written yet", async () => {
    renderAt("/tracks");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Tracks");
    const start = await screen.findByRole("link", { name: "Start at session 1" });
    expect(start.getAttribute("href")).toBe("/tracks/new-to-this/1");
    expect(screen.getByRole("link", { name: FILE.title }).getAttribute("href")).toBe("/tracks/new-to-this");
    expect(screen.getByText(/12 sessions, about 10 minutes each/)).toBeInTheDocument();
    expect(screen.queryByTestId("track-continue")).toBeNull();

    const coming = screen.getByRole("heading", { level: 2, name: "Coming" }).closest("section") as HTMLElement;
    for (const chip of ["I'm skeptical", "I've stepped back from faith", "I want to go deeper", "I'm leading a family"]) expect(within(coming).getByText(chip)).toBeInTheDocument();
    expect(within(coming).queryByText("I'm new to this")).toBeNull();
    expect(within(coming).getByText(/Deep in one/)).toBeInTheDocument();
    expect(within(coming).getAllByText(/Not written yet/).length).toBe(5);
    expect(within(coming).getAllByRole("link", { name: /The road for now/ }).map((a) => a.getAttribute("href"))).toEqual(["/start#skeptical", "/start#stepped-back", "/start#deeper", "/start#family"]);
  });

  it("offers Continue where you left off once a track is begun", async () => {
    saveTracks(withDone(withDone(NO_TRACKS, T, 1), T, 2));
    renderAt("/tracks");
    const line = screen.getByTestId("track-continue");
    expect(within(line).getByRole("link").getAttribute("href")).toBe("/tracks/new-to-this/3");
    expect(line).toHaveTextContent("session 3 of 12");
    expect((await screen.findByRole("link", { name: "Continue at session 3" })).getAttribute("href")).toBe("/tracks/new-to-this/3");
  });

  it("says the list did not load, with a way to try again", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("no", { status: 503 })));
    renderAt("/tracks");
    expect(await screen.findByRole("alert")).toHaveTextContent("The list of tracks didn't load.");
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });
});

describe("/tracks/:slug", () => {
  it("lists the sessions in order and starts at session 1", async () => {
    renderAt("/tracks/new-to-this");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(FILE.title));
    const titles = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    FILE.sessions.forEach((s: { n: number; title: string }, i: number) => expect(titles[i]).toContain(s.title));
    expect(screen.getByRole("link", { name: "Start at session 1" }).getAttribute("href")).toBe("/tracks/new-to-this/1");
    expect(screen.getByRole("link", { name: "six first steps" }).getAttribute("href")).toBe("/start#new");
  });

  it("continues at the first session not done, and can start over", async () => {
    saveTracks(withDone(withDone(NO_TRACKS, T, 1), T, 2));
    renderAt("/tracks/new-to-this");
    expect((await screen.findByRole("link", { name: "Continue at session 3" })).getAttribute("href")).toBe("/tracks/new-to-this/3");
    expect(screen.getByText("2 of 12 sessions done")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Session 1, done: Who Jesus is/ })).toBeInTheDocument();
    vi.spyOn(window, "confirm").mockReturnValue(true);
    fireEvent.click(screen.getByRole("button", { name: /Start this track over/ }));
    expect(readTracks().tracks).toEqual({});
    expect(screen.getByRole("link", { name: "Start at session 1" })).toBeInTheDocument();
  });
});

describe("/tracks/:slug/:n", () => {
  it("shows the session whole: teaching, the page to open, the three asks, the care line and the group guide", async () => {
    const s = FILE.sessions[8];
    renderAt("/tracks/new-to-this/9");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(s.title));
    expect(screen.getByText(/Session 9 of 12 · About 10 minutes/)).toBeInTheDocument();
    expect(screen.getByText(/You will fail\./)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: s.open.label }).getAttribute("href")).toBe(s.open.href);
    for (const l of s.also) expect(screen.getByRole("link", { name: l.label }).getAttribute("href")).toBe(l.href);
    expect(screen.getByRole("heading", { name: "One question" })).toBeInTheDocument();
    expect(screen.getByText(s.question)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "One thing to do" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "One verse to keep" })).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(s.verse.text.slice(0, 30))).length).toBeGreaterThanOrEqual(1);
    // The fear-of-falling-away care line, whole, with Find Help a real link.
    const care = screen.getByRole("complementary", { name: "If this is heavy for you" });
    expect(care.textContent).toBe(s.care.join(""));
    expect(within(care).getByRole("link", { name: "Find Help" }).getAttribute("href")).toBe("/help");
    const group = screen.getByRole("heading", { name: `Group guide: ${s.title}` }).closest("section") as HTMLElement;
    expect(within(group).getByText(s.group.open)).toBeInTheDocument();
    expect(within(group).getAllByRole("listitem")).toHaveLength(3);
    expect(within(group).getByText(s.group.pray)).toBeInTheDocument();
    expect(screen.getByText(KEPT_HERE)).toBeInTheDocument();
    // Previous and next.
    expect(screen.getByRole("link", { name: /Session 8.*Baptism/ }).getAttribute("href")).toBe("/tracks/new-to-this/8");
    expect(screen.getByRole("link", { name: /Session 10.*When you doubt/ }).getAttribute("href")).toBe("/tracks/new-to-this/10");
  });

  it("begins the track when a session is opened", async () => {
    renderAt("/tracks/new-to-this/1");
    await screen.findByRole("heading", { level: 1, name: "Who Jesus is" });
    await waitFor(() => expect(readTracks().tracks["new-to-this"]).toMatchObject({ title: FILE.title, total: 12, done: [] }));
  });

  it("keeps the answer and the tick, and marks the session done", async () => {
    const first = renderAt("/tracks/new-to-this/3");
    const box = await screen.findByRole("textbox", { name: "One question" });
    fireEvent.change(box, { target: { value: "At work, mostly." } });
    fireEvent.click(screen.getByRole("checkbox", { name: "I did this" }));
    fireEvent.click(screen.getByRole("button", { name: /Mark this session done/ }));
    expect(readTracks().tracks["new-to-this"]).toMatchObject({ done: [3], notes: { "3": { answer: "At work, mostly.", did: true } } });
    expect(screen.getByText("Session 3 is marked done.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Go on to session 4/ }).getAttribute("href")).toBe("/tracks/new-to-this/4");
    expect(screen.queryByText(SAVE_FAILED)).toBeNull();
    first.unmount();

    // A reload: the answer, the tick and the mark are still there.
    renderAt("/tracks/new-to-this/3");
    expect(await screen.findByRole("textbox", { name: "One question" })).toHaveValue("At work, mostly.");
    expect(screen.getByRole("checkbox", { name: "I did this" })).toBeChecked();
    fireEvent.click(screen.getByRole("button", { name: "Not done after all" }));
    expect(readTracks().tracks["new-to-this"].done).toEqual([]);
  });

  it("says so when the browser will not save", async () => {
    renderAt("/tracks/new-to-this/2");
    const box = await screen.findByRole("textbox", { name: "One question" });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });
    fireEvent.change(box, { target: { value: "The lamb." } });
    expect(screen.getByRole("status")).toHaveTextContent(SAVE_FAILED);
  });

  it("says a session past the end is not in the track", async () => {
    renderAt("/tracks/new-to-this/99");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("That session is not in this track"));
    expect(screen.getByRole("link", { name: "See the 12 sessions" }).getAttribute("href")).toBe("/tracks/new-to-this");
  });
});

describe("the way back", () => {
  it("is set on leaving a session, shown on the page it opened, and cleared on coming back", async () => {
    const { loc } = renderAt("/tracks/new-to-this/5");
    const open = await screen.findByRole("link", { name: /Pray Psalm 23 slowly/ });
    expect(screen.queryByTestId("track-return")).toBeNull();
    fireEvent.click(open);
    expect(loc.history).toContain("/tools/pray-the-psalms?psalm=23");
    expect(readReturn()).toEqual({ slug: "new-to-this", n: 5, total: 12, to: "/tools/pray-the-psalms?psalm=23" });

    // On the other page: the bar, and nothing else of the track.
    await screen.findByText("Another page");
    const bar = screen.getByTestId("track-return");
    const back = within(bar).getByRole("link", { name: "Back to session 5 of 12" });
    expect(back.getAttribute("href")).toBe("/tracks/new-to-this/5");

    fireEvent.click(back);
    await screen.findByRole("heading", { level: 1, name: "How to pray" });
    expect(screen.queryByTestId("track-return")).toBeNull();
    expect(readReturn()).toBeNull();
  });

  it("can be hidden, and stays hidden", async () => {
    setReturn({ slug: "new-to-this", n: 2, total: 12, to: "/study/explorer/watch/why-jesus-died" });
    const { loc } = renderAt("/study/explorer/watch/why-jesus-died");
    fireEvent.click(within(screen.getByTestId("track-return")).getByRole("button", { name: "Hide the way back to your session" }));
    expect(screen.queryByTestId("track-return")).toBeNull();
    expect(readReturn()).toBeNull();
    act(() => loc.navigate("/answers/did-the-resurrection-actually-happen"));
    expect(screen.queryByTestId("track-return")).toBeNull();
  });

  it("does not show on the tracks' own pages", async () => {
    setReturn({ slug: "new-to-this", n: 2, total: 12, to: "/study/explorer/watch/why-jesus-died" });
    renderAt("/tracks");
    await screen.findByRole("link", { name: "Start at session 1" });
    expect(screen.queryByTestId("track-return")).toBeNull();
  });
});
