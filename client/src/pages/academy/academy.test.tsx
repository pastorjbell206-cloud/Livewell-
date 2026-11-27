/**
 * The Academy's pages, rendered from the real files (client/public/academy,
 * client/public/tracks), served by a fetch stub that reads client/public.
 *
 * - /academy lists every program as a card, in order, each saying who it is
 *   for, and says certificates are unaccredited.
 * - /academy/:program lays out its tracks in order and continues where the
 *   reader is.
 * - A certificate is offered only for a finished track; it carries the name
 *   typed and the unaccredited notice on its face.
 * - "What I've learned" shows the reader's own answers.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent, within } from "@testing-library/react";
import { Router, Route, Switch } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import fs from "node:fs";
import path from "node:path";

import { TestProviders } from "@/test/harness";
import { NO_TRACKS, saveTracks, withDone, withNotes } from "@/lib/tracks";
import { UNACCREDITED } from "@/lib/academy";
import Academy from "./Academy";
import AcademyProgram from "./AcademyProgram";
import AcademyLearned from "./AcademyLearned";
import AcademyCertificate from "./AcademyCertificate";

const PUBLIC = path.resolve(__dirname, "../../../public");
const read = (p: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, p), "utf8"));
const PROGRAMS = read("academy/programs.json").programs as { slug: string; title: string; reader: string; tracks: string[] }[];
const INDEX = read("tracks/index.json").tracks as { slug: string; title: string; sessions: { n: number; title: string }[] }[];
const MARK = INDEX.find((t) => t.slug === "mark")!;

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
  return render(
    <TestProviders>
      <Router hook={loc.hook}>
        <Switch>
          <Route path="/academy" component={Academy} />
          <Route path="/academy/learned" component={AcademyLearned} />
          <Route path="/academy/certificate/:kind/:slug" component={AcademyCertificate} />
          <Route path="/academy/:program" component={AcademyProgram} />
        </Switch>
      </Router>
    </TestProviders>,
  );
}

/** Every session of Mark marked done on this device. */
function finishMark() {
  let p = NO_TRACKS;
  const id = { slug: MARK.slug, title: MARK.title, total: MARK.sessions.length };
  for (const s of MARK.sessions) p = withDone(p, id, s.n);
  saveTracks(p);
}

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal("fetch", servePublic());
});
afterEach(() => vi.unstubAllGlobals());

describe("/academy", () => {
  it("lists every program as a card, in order, each saying who it is for, and says certificates are unaccredited", async () => {
    renderAt("/academy");
    expect(await screen.findByRole("heading", { level: 1, name: "The LiveWell Academy" })).toBeTruthy();
    await waitFor(() => expect(document.querySelectorAll(".ac-card")).toHaveLength(PROGRAMS.length));
    const hrefs = Array.from(document.querySelectorAll(".ac-card")).map((a) => a.getAttribute("href"));
    expect(hrefs.sort()).toEqual(PROGRAMS.map((p) => `/academy/${p.slug}`).sort());
    for (const p of PROGRAMS) expect(screen.getByText(p.reader)).toBeTruthy();
    expect(screen.getAllByText(UNACCREDITED).length).toBeGreaterThanOrEqual(1);
  });
});

describe("/academy/:program", () => {
  it("lays out the program's tracks in order, and continues at the first session not done", async () => {
    const books = PROGRAMS.find((p) => p.tracks.includes("mark"))!;
    const id = { slug: MARK.slug, title: MARK.title, total: MARK.sessions.length };
    saveTracks(withDone(withDone(NO_TRACKS, id, 1), id, 2));
    renderAt(`/academy/${books.slug}`);
    expect(await screen.findByRole("heading", { level: 1, name: books.title })).toBeTruthy();
    const path_ = document.querySelector(".ac-path")!;
    await waitFor(() => expect(path_.querySelectorAll(".ac-stop")).toHaveLength(books.tracks.filter((s) => INDEX.some((t) => t.slug === s)).length));
    expect(within(path_ as HTMLElement).getByRole("link", { name: /Continue at session 3/ }).getAttribute("href")).toBe("/tracks/mark/3");
  });

  it("says plainly when a program is not there", async () => {
    renderAt("/academy/no-such-program");
    expect(await screen.findByRole("heading", { name: "That program isn't here" })).toBeTruthy();
  });
});

describe("certificates", () => {
  it("are not offered for a track that is not finished", async () => {
    renderAt("/academy/certificate/track/mark");
    expect(await screen.findByText("Not finished yet")).toBeTruthy();
    expect(screen.queryByRole("textbox", { name: /Your name/ })).toBeNull();
  });

  it("print a finished track with the reader's name and the unaccredited notice on the certificate itself", async () => {
    finishMark();
    renderAt("/academy/certificate/track/mark");
    const box = await screen.findByRole("textbox", { name: /Your name/ });
    fireEvent.change(box, { target: { value: "Ruth Example" } });
    const cert = screen.getByRole("article", { name: `Certificate of completion: ${MARK.title}` });
    expect(within(cert).getByText("Ruth Example")).toBeTruthy();
    expect(within(cert).getByText(MARK.title)).toBeTruthy();
    expect(within(cert).getByText(UNACCREDITED)).toBeTruthy();
    expect(localStorage.getItem("livewell-academy-name-v1")).toBe(JSON.stringify("Ruth Example"));
  });
});

describe("/academy/learned", () => {
  it("is empty until a session is done, then shows the reader's own answer and the certificate earned", async () => {
    const first = renderAt("/academy/learned");
    expect(await screen.findByText(/Nothing here yet/)).toBeTruthy();
    first.unmount();

    finishMark();
    const id = { slug: MARK.slug, title: MARK.title, total: MARK.sessions.length };
    const p = JSON.parse(localStorage.getItem("livewell-progress-tracks-v1")!);
    saveTracks(withNotes(p, id, 1, { answer: "He touched the man first." }));
    renderAt("/academy/learned");
    expect(await screen.findByText("He touched the man first.")).toBeTruthy();
    expect(screen.getByRole("link", { name: `Track: ${MARK.title}` }).getAttribute("href")).toBe("/academy/certificate/track/mark");
  });
});
