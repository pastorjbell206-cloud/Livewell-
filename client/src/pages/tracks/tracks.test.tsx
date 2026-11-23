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
import TrackLeader from "./TrackLeader";
import TrackPrint from "./TrackPrint";

const PUBLIC = path.resolve(__dirname, "../../../public");
const readTrackFile = (slug: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, `tracks/${slug}.json`), "utf8"));
const FILE = readTrackFile("new-to-this");
const SKEPTIC = readTrackFile("skeptical");
const MARK = readTrackFile("mark");
const STEPPED = readTrackFile("stepped-back");
const DEEPER = readTrackFile("deeper");
const FAMILY = readTrackFile("family");
const T ={ slug: "new-to-this", title: FILE.title as string, total: FILE.sessions.length as number };

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
          <Route path="/tracks/:slug/leader" component={TrackLeader} />
          <Route path="/tracks/:slug/print" component={TrackPrint} />
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
  it("lists every track with who it is for and Start at session 1, and, with every road written, no list of what is coming", async () => {
    renderAt("/tracks");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Tracks");
    const starts = await screen.findAllByRole("link", { name: "Start at session 1" });
    // In the order of the roads on /start, and a book studied chapter by chapter after them.
    expect(starts.map((a) => a.getAttribute("href"))).toEqual([
      "/tracks/skeptical/1",
      "/tracks/new-to-this/1",
      "/tracks/stepped-back/1",
      "/tracks/deeper/1",
      "/tracks/family/1",
      "/tracks/mark/1",
    ]);
    for (const t of [FILE, SKEPTIC, STEPPED, DEEPER, FAMILY, MARK]) {
      const card = screen.getByRole("link", { name: t.title }).closest("li") as HTMLElement;
      expect(within(card).getByText(t.for)).toBeInTheDocument();
    }
    expect(screen.getByRole("link", { name: FILE.title }).getAttribute("href")).toBe("/tracks/new-to-this");
    expect(screen.getAllByText(/^12 sessions, about 10 minutes each/)).toHaveLength(5);
    expect(screen.getByText(/^16 sessions, about 15 minutes each/)).toBeInTheDocument();
    // A leader's guide on the card of every track.
    expect(screen.getAllByRole("link", { name: "Leader's guide" }).map((a) => a.getAttribute("href"))).toEqual([
      "/tracks/skeptical/leader",
      "/tracks/new-to-this/leader",
      "/tracks/stepped-back/leader",
      "/tracks/deeper/leader",
      "/tracks/family/leader",
      "/tracks/mark/leader",
    ]);
    expect(screen.queryByTestId("track-continue")).toBeNull();

    // Every road on /start has its track, so nothing is listed as coming.
    expect(screen.queryByRole("heading", { level: 2, name: "Coming" })).toBeNull();
    expect(screen.queryByText(/Not written yet/)).toBeNull();
    expect(screen.queryByRole("link", { name: /The road for now/ })).toBeNull();
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

describe("the skeptic's track and the book study", () => {
  it("offers the leader's guide and the whole track to print from the track's page", async () => {
    const first = renderAt("/tracks/skeptical");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(SKEPTIC.title));
    expect(screen.getByRole("link", { name: "The leader's guide" }).getAttribute("href")).toBe("/tracks/skeptical/leader");
    expect(screen.getByRole("link", { name: "The whole track on one page" }).getAttribute("href")).toBe("/tracks/skeptical/print");
    first.unmount();
    // The track for someone new has its leader's guide too, and prints whole.
    renderAt("/tracks/new-to-this");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(FILE.title));
    expect(screen.getByRole("link", { name: "The leader's guide" }).getAttribute("href")).toBe("/tracks/new-to-this/leader");
    expect(screen.getByRole("link", { name: "The whole track on one page" }).getAttribute("href")).toBe("/tracks/new-to-this/print");
  });

  it("shows a session of the track for someone who stepped back, with the chapter it opens and its care line", async () => {
    const s = STEPPED.sessions[6];
    renderAt("/tracks/stepped-back/7");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(s.title));
    expect(screen.getByText(/Session 7 of 12 · About 15 minutes/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: s.open.label }).getAttribute("href")).toBe("/study/bible/john/9#plain");
    const care = screen.getByRole("complementary", { name: "If this is heavy for you" });
    expect(care.textContent).toBe(s.care.join(""));
    expect(within(care).getByRole("link", { name: "Find Help" }).getAttribute("href")).toBe("/help");
    expect(screen.getByRole("link", { name: "The leader's guide" }).getAttribute("href")).toBe("/tracks/stepped-back/leader");
  });

  it("shows a session of the track for going deeper, with the guided study it opens and its extra pages", async () => {
    const s = DEEPER.sessions[2];
    renderAt("/tracks/deeper/3");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(s.title));
    expect(screen.getByText(/Session 3 of 12 · About 15 minutes/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: s.open.label }).getAttribute("href")).toBe("/study/bible/romans/8?study=walk");
    // The footer links "How to study the Bible" too; the session's own link is among them.
    for (const l of s.also) expect(screen.getAllByRole("link", { name: l.label }).map((a) => a.getAttribute("href"))).toContain(l.href);
    expect(screen.getByRole("complementary", { name: "If this is heavy for you" }).textContent).toBe(s.care.join(""));
  });

  it("shows a session of the track for a family, with both its care lines and Find Help a real link", async () => {
    const s = FAMILY.sessions[8];
    renderAt("/tracks/family/9");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(s.title));
    expect(screen.getByText(/Session 9 of 12 · About 10 minutes/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: s.open.label }).getAttribute("href")).toBe("/study/bible/ephesians/6#plain");
    const care = screen.getByRole("complementary", { name: "If this is heavy for you" });
    expect(s.care).toHaveLength(2);
    expect(care.textContent).toBe(s.care.join(""));
    expect(within(care).getAllByRole("link", { name: "Find Help" }).every((a) => a.getAttribute("href") === "/help")).toBe(true);
    expect(screen.getByRole("link", { name: "The leader's guide" }).getAttribute("href")).toBe("/tracks/family/leader");
  });

  it("shows a Mark session whole, with the chapter it opens and the leader's guide beside the group guide", async () => {
    const s = MARK.sessions[4];
    renderAt("/tracks/mark/5");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(s.title));
    expect(screen.getByText(/Session 5 of 16/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: s.open.label }).getAttribute("href")).toBe("/study/bible/mark/5#plain");
    expect(screen.getByRole("complementary", { name: "If this is heavy for you" }).textContent).toBe(s.care.join(""));
    expect(screen.getByRole("link", { name: "The leader's guide" }).getAttribute("href")).toBe("/tracks/mark/leader");
  });
});

describe("/tracks/:slug/leader", () => {
  it("says how to run the group, part by part, then gathers every session's group guide in order", async () => {
    renderAt("/tracks/skeptical/leader");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(`Leader's guide: ${SKEPTIC.title}`));
    const parts = SKEPTIC.leader.sections as { id: string; title: string; body: string[]; steps?: string[] }[];
    for (const p of parts) expect(screen.getByRole("heading", { level: 3, name: p.title })).toBeInTheDocument();
    const order = parts.find((p) => p.id === "order")!;
    for (const step of order.steps!) expect(screen.getByText(step)).toBeInTheDocument();
    // Find Help is a real link wherever the guide names it.
    const help = screen.getByRole("heading", { level: 3, name: "When to point someone to Find Help" }).closest("section") as HTMLElement;
    expect(within(help).getAllByRole("link", { name: "Find Help" }).every((a) => a.getAttribute("href") === "/help")).toBe(true);
    // Every session, in order, with its page, its question and its group guide.
    const list = screen.getByRole("heading", { level: 2, name: `The ${SKEPTIC.sessions.length} sessions, in order` }).closest("section") as HTMLElement;
    const sessions = within(list).getAllByRole("article");
    expect(sessions).toHaveLength(SKEPTIC.sessions.length);
    SKEPTIC.sessions.forEach((s: { n: number; title: string; question: string; open: { href: string }; group: { open: string; discuss: string[]; pray: string } }, i: number) => {
      const el = sessions[i];
      expect(within(el).getByRole("link", { name: s.title }).getAttribute("href")).toBe(`/tracks/skeptical/${s.n}`);
      expect(within(el).getAllByRole("link").map((a) => a.getAttribute("href"))).toContain(s.open.href);
      expect(within(el).getByText(s.question)).toBeInTheDocument();
      expect(within(el).getByText(s.group.open)).toBeInTheDocument();
      for (const q of s.group.discuss) expect(el.textContent).toContain(q);
      expect(within(el).getByText(s.group.pray)).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: /Print/ })).toBeInTheDocument();
  });

  it("draws the leader's guides added since, every part and every session", async () => {
    for (const t of [FILE, STEPPED, DEEPER, FAMILY]) {
      const view = renderAt(`/tracks/${t.slug}/leader`);
      await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(`Leader's guide: ${t.title}`));
      for (const p of t.leader.sections as { title: string }[]) expect(screen.getByRole("heading", { level: 3, name: p.title })).toBeInTheDocument();
      const list = screen.getByRole("heading", { level: 2, name: `The ${t.sessions.length} sessions, in order` }).closest("section") as HTMLElement;
      expect(within(list).getAllByRole("article")).toHaveLength(t.sessions.length);
      view.unmount();
    }
  });

  it("says plainly when a track has no leader's guide yet", async () => {
    // Every written track has one; a copy of the first without it stands in for a track written before its guide.
    const serve = servePublic();
    const copy = { ...FILE, slug: "no-guide" };
    delete copy.leader;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) =>
        String(input).includes("/tracks/no-guide.json") ? new Response(JSON.stringify(copy), { status: 200, headers: { "Content-Type": "application/json" } }) : serve(input),
      ),
    );
    renderAt("/tracks/no-guide/leader");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("This track has no leader's guide yet"));
    expect(screen.getByRole("link", { name: "See the 12 sessions" }).getAttribute("href")).toBe("/tracks/no-guide");
  });
});

describe("/tracks/:slug/print", () => {
  it("sets out every session with its addresses written out for paper, and nothing to type into", async () => {
    renderAt("/tracks/mark/print");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(MARK.title));
    const sessions = MARK.sessions as { n: number; title: string; question: string; do: string; open: { href: string }; verse: { text: string } }[];
    for (const s of sessions) {
      const sec = screen.getByRole("heading", { level: 2, name: s.title }).closest("section") as HTMLElement;
      expect(within(sec).getByText(s.question)).toBeInTheDocument();
      expect(sec.textContent).toContain(`livewellbyjamesbell.co${s.open.href}`);
      expect(sec.textContent).toContain(s.verse.text);
    }
    // Nothing to type into or tick on the page itself (the site's own footer has its sign-up box).
    const page = document.querySelector(".tk-page") as HTMLElement;
    expect(within(page).queryByRole("textbox")).toBeNull();
    expect(within(page).queryByRole("checkbox")).toBeNull();
    expect(within(page).getByRole("button", { name: /Print/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "The leader's guide" }).getAttribute("href")).toBe("/tracks/mark/leader");
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
    await screen.findAllByRole("link", { name: "Start at session 1" });
    expect(screen.queryByTestId("track-return")).toBeNull();
  });
});
