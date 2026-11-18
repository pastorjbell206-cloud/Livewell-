/**
 * Topics (U25): /topics lists the questions in the reader's words, each row
 * opening the one best page (a row to an essay that is not public yet opens
 * its stand-in; Test the Case sits on the Honest Answers row); a topic page
 * holds its six parts in order, shows the stand-in until the lead essay is
 * public and only public essays after it, asks the politics question of both
 * sides, makes every reference a link into the Study Bible, and sends one
 * anonymous event when the lead is opened. Rendered from the committed data,
 * with the shelf seeded per test (`held`, `published`) so the stand-in and the
 * live cases both hold whichever way shelf.json and the essay files stand.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, fireEvent, within } from "@testing-library/react";
import { Route, Switch } from "wouter";
import fs from "node:fs";
import path from "node:path";
import { track as vercelTrack } from "@vercel/analytics";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { leadOf, publicEssays, rowTarget, type Topic as TopicData, type TopicsIndex } from "@/lib/topics";
import { trackTopicLeadOpen } from "@/lib/telemetry";
import { LIBRARY_SOURCES } from "@/lib/catalog";
import { libraryEntries, rankEntries } from "@/lib/siteSearch";
import Topics from "./Topics";
import Topic from "./Topic";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

/** Essay slugs a test holds off the shelf, or puts on it, over the committed state. */
const seed = vi.hoisted(() => ({ held: new Set<string>(), published: new Set<string>() }));
vi.mock("@/lib/shelf", async (importOriginal) => {
  const real = await importOriginal<typeof import("@/lib/shelf")>();
  const seeded = (slug: string, committed: boolean) => !seed.held.has(slug) && (seed.published.has(slug) || committed);
  return {
    ...real,
    isPublicEssay: (slug: string, date?: unknown) => seeded(slug, real.isPublicEssay(slug, date)),
    isPublicEssayHref: (href: string | null | undefined) =>
      seeded(href?.match(/^\/writing\/([^/?#]+)/)?.[1] ?? "", real.isPublicEssayHref(href)),
  };
});
const CN_LEAD = "what-christian-nationalism-is-and-is-not";
const CN_ALSO = "was-america-founded-as-a-christian-nation";
const SLAVERY = "why-didnt-the-bible-ban-slavery";
const hold = (...slugs: string[]) => slugs.forEach((s) => seed.held.add(s));
const publish = (...slugs: string[]) => slugs.forEach((s) => seed.published.add(s));

const PUBLIC = path.resolve(__dirname, "../../public");
const read = (name: string) => fs.readFileSync(path.join(PUBLIC, name), "utf8");
const INDEX: TopicsIndex = JSON.parse(read("topics/index.json"));
const topic = (slug: string): TopicData => JSON.parse(read(`topics/${slug}.json`));

function serve(online = true) {
  const base = offlineFetch();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const name = String(input).replace(/^\//, "");
      if (online && name.startsWith("topics/") && fs.existsSync(path.join(PUBLIC, name))) {
        return new Response(read(name), { status: 200, headers: { "Content-Type": "application/json" } });
      }
      return base(input, init);
    }),
  );
}

function renderAt(url: string) {
  window.history.pushState({}, "", url);
  return renderWithProviders(
    <Switch>
      <Route path="/topics/:slug" component={Topic} />
      <Route path="/topics" component={Topics} />
    </Switch>,
  );
}

afterEach(() => {
  seed.held.clear();
  seed.published.clear();
  vi.unstubAllGlobals();
  vi.mocked(vercelTrack).mockClear();
  window.history.pushState({}, "", "/");
});

describe("/topics", () => {
  /** Open every group, so each question is on the page. */
  const openAll = () => screen.queryAllByRole("button", { name: /^All \d+$/ }).forEach((b) => fireEvent.click(b));

  it("is the Questions door: every question in a group, each a link to the page it opens today", async () => {
    serve();
    renderAt("/topics");
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Hard questions");
    const politics = await screen.findByRole("link", { name: /What is Christian nationalism/ });
    openAll();
    expect(politics.getAttribute("href")).toBe("/topics/faith-politics-and-the-flag");
    expect(screen.getByRole("link", { name: /What does it mean that America is post-Christian/ }).getAttribute("href")).toBe("/topics/living-after-christendom");
    // A personal need opens its care page directly, labelled as care.
    const worry = screen.getByRole("link", { name: /I can't stop worrying/ });
    expect(worry.getAttribute("href")).toBe("/help/anxiety");
    expect(within(worry).getByText("Find Help")).toBeTruthy();
    // The two trust questions are guides to read, not crisis care.
    const bible = screen.getByRole("link", { name: /Can I trust the Bible/ });
    expect(within(bible).getByText("Guide")).toBeTruthy();
    expect(within(bible).queryByText("Find Help")).toBeNull();
    expect(within(screen.getByRole("link", { name: /Can I trust the church/ })).getByText("Guide")).toBeTruthy();
    // The resurrection, Jesus and God each have a card by name, on the answer's own page.
    expect(screen.getByRole("link", { name: "Did the resurrection actually happen?" }).getAttribute("href")).toBe("/answers/did-the-resurrection-actually-happen");
    expect(screen.getByRole("link", { name: "Was Jesus just a good teacher?" }).getAttribute("href")).toBe("/answers/was-jesus-just-a-good-teacher");
    expect(screen.getByRole("link", { name: "Does God actually exist?" }).getAttribute("href")).toBe("/answers/does-god-actually-exist");
    // Every row of the index is on the door, or held by the page that already answers it.
    for (const row of INDEX.rows) {
      if (row.href === "/answers" || row.href === "/answers#is-jesus-the-only-way" || row.standIn) continue;
      expect(screen.getAllByRole("link", { name: new RegExp(row.askedAs.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").slice(0, 30)) }).length).toBeGreaterThan(0);
    }
  });

  it("opens the essay once it is public, and leaves the row to its answer while it is not", async () => {
    publish(SLAVERY);
    serve();
    renderAt("/topics");
    await screen.findByRole("link", { name: /What is Christian nationalism/ });
    openAll();
    const slavery = screen.getByRole("link", { name: /Sunday mornings/ });
    expect(slavery.getAttribute("href")).toBe(`/writing/${SLAVERY}`);
    expect(within(slavery).getByText("Essay")).toBeTruthy();
  });

  it("answers a question typed in a person's own words, with next steps", async () => {
    serve();
    renderAt("/topics");
    fireEvent.change(screen.getByRole("searchbox", { name: "Ask a hard question" }), { target: { value: "did jesus really rise from the dead" } });
    const best = screen.getByText("The closest answer").closest(".qa-best") as HTMLElement;
    expect(within(best).getByRole("link", { name: "Did the resurrection actually happen?" }).getAttribute("href")).toBe("/answers/did-the-resurrection-actually-happen");
    expect(within(best).getByRole("link", { name: /Test the Case/ }).getAttribute("href")).toMatch(/^\/tools\/test-the-case\?case=/);
  });

  it("says plainly when nothing fits, and brings the help lines first when words call for a person", async () => {
    serve();
    renderAt("/topics");
    const box = screen.getByRole("searchbox", { name: "Ask a hard question" });
    fireEvent.change(box, { target: { value: "zzqx flurb" } });
    expect(screen.getByText("Nothing here answers that yet.")).toBeTruthy();
    fireEvent.change(box, { target: { value: "I want to end my life" } });
    expect(screen.getByRole("note", { name: "Where to find help now" })).toBeTruthy();
  });

  it("says so, with a retry, when the list does not arrive", async () => {
    serve(false);
    renderAt("/topics");
    expect(await screen.findByRole("alert")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Try again" })).toBeTruthy();
  });
});

describe("/topics/:slug", () => {
  it("holds the six parts in order, under the question", async () => {
    serve();
    renderAt("/topics/faith-politics-and-the-flag");
    const h1 = await screen.findByRole("heading", { level: 1, name: topic("faith-politics-and-the-flag").title });
    expect(h1).toBeTruthy();
    const parts = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(parts).toEqual([
      "Read this first",
      "What Scripture says, read in its world",
      "The church has been here before",
      "At the table",
      "Use this",
    ]);
    expect(screen.getByText(/Love of country isn't the problem/)).toBeTruthy();
  });

  it("shows the stand-in until the lead essay is public, and no essay that is not public", async () => {
    hold(CN_LEAD, CN_ALSO);
    serve();
    renderAt("/topics/faith-politics-and-the-flag");
    const lead = await screen.findByRole("link", { name: /How Christian Nationalism Rewrites Doctrine/ });
    expect(lead.getAttribute("href")).toBe("/writing/how-christian-nationalism-rewrites");
    expect(screen.queryByText(/What Christian Nationalism Is, and What It Is Not/)).toBeNull();
    expect(screen.queryByText(/Was America Founded/)).toBeNull();
    expect(screen.getByRole("link", { name: /When the Church Married Empire/ })).toBeTruthy();
    fireEvent.click(lead);
    expect(vi.mocked(vercelTrack)).toHaveBeenCalledWith("topic_lead_open", {
      topic: "faith-politics-and-the-flag",
      lead: "/writing/how-christian-nationalism-rewrites",
      stand_in: true,
    });
  });

  it("leads with the essay once it is public, and lists the public essays after it", async () => {
    publish(CN_LEAD, CN_ALSO);
    serve();
    renderAt("/topics/faith-politics-and-the-flag");
    const lead = await screen.findByRole("link", { name: /What Christian Nationalism Is, and What It Is Not/ });
    expect(lead.getAttribute("href")).toBe(`/writing/${CN_LEAD}`);
    expect(screen.getByRole("link", { name: /Was America Founded/ }).getAttribute("href")).toBe(`/writing/${CN_ALSO}`);
    expect(screen.getByRole("link", { name: /When the Church Married Empire/ })).toBeTruthy();
    fireEvent.click(lead);
    expect(vi.mocked(vercelTrack)).toHaveBeenCalledWith("topic_lead_open", {
      topic: "faith-politics-and-the-flag",
      lead: `/writing/${CN_LEAD}`,
      stand_in: false,
    });
  });

  it("asks the politics question of both sides, and carries the four public-square tools", async () => {
    serve();
    renderAt("/topics/faith-politics-and-the-flag");
    await screen.findByText("Asked of both sides");
    for (const [essay, pathName, href] of [
      ["The Conservative Blind Spot", "Faith and the Flag", "/pathways/christian-nationalism"],
      ["The Progressive Blind Spot", "Faith and the Cause", "/pathways/progressive-captivity"],
    ]) {
      expect(screen.getByRole("link", { name: essay })).toBeTruthy();
      expect(screen.getByRole("link", { name: pathName }).getAttribute("href")).toBe(href);
    }
    const use = screen.getByRole("list", { name: "Use this" });
    for (const tool of ["The Consistency Check", "Which Lens Has You?", "The Party Scorecard", "If We Had a Biblical Government"]) {
      expect(within(use).getByRole("link", { name: new RegExp(tool.replace(/[?]/g, "\\?")) })).toBeTruthy();
    }
  });

  it("makes each passage, and each reference in the prose, a link into the Study Bible", async () => {
    serve();
    renderAt("/topics/raising-children-in-a-secular-age");
    const passage = await screen.findByRole("link", { name: "Deuteronomy 6:5-7" });
    expect(passage.getAttribute("href")).toMatch(/^\/study\/bible\/deuteronomy\/6/);
    // In the short answer and in a passage's line.
    expect(screen.getByRole("link", { name: "Deuteronomy 6:7" }).getAttribute("href")).toMatch(/^\/study\/bible\/deuteronomy\/6/);
    expect(screen.getByRole("link", { name: "Judges 2:10" }).getAttribute("href")).toMatch(/^\/study\/bible\/judges\/2/);
  });

  it("opens tonight's devotion at the table when the page names tonight, and the care page when there is no essay", async () => {
    serve();
    renderAt("/topics/raising-children-in-a-secular-age");
    expect((await screen.findByRole("link", { name: "Start at the table" })).getAttribute("href")).toBe("/family/tonight?mode=table");
    expect(screen.getByRole("link", { name: /How do we do family devotions/ }).getAttribute("href")).toBe("/help/family-devotions");
    expect(screen.getByRole("link", { name: /Raising Kids Who Keep the Faith/ }).getAttribute("href")).toBe("/pathways/parenting");
  });

  it("names its shelf section first on the post-Christian page, and a named devotion opens its own page", async () => {
    serve();
    renderAt("/topics/living-after-christendom");
    expect((await screen.findByRole("link", { name: "After Christendom" })).getAttribute("href")).toBe("/writing?section=after-christendom");
    expect(screen.getByRole("link", { name: "Start at the table" }).getAttribute("href")).toBe("/family/devotions/being-sent?mode=table");
  });

  it("answers an unknown topic plainly, and a failed load with a retry", async () => {
    serve();
    renderAt("/topics/no-such-topic");
    expect(await screen.findByText("That topic isn't here")).toBeTruthy();
    serve(false);
    renderAt("/topics/faith-politics-and-the-flag");
    expect(await screen.findByRole("alert")).toBeTruthy();
  });
});

describe("lib/topics", () => {
  it("leads with the essay once it is public, and drops further essays that are not", () => {
    const t = topic("faith-politics-and-the-flag");
    const row = INDEX.rows.find((r) => r.standIn)!;
    hold(CN_LEAD, CN_ALSO, SLAVERY);
    expect(leadOf(t)).toMatchObject({ standIn: true, link: { href: "/writing/how-christian-nationalism-rewrites" } });
    expect(leadOf({ ...t, essay: { href: "/writing/when-the-church-married-empire", label: "x" } })).toMatchObject({ standIn: false });
    expect(publicEssays(t.alsoEssays).map((l) => l.href)).toEqual(["/writing/when-the-church-married-empire"]);
    expect(rowTarget(row)).toBe(row.standIn);
    expect(rowTarget({ ...row, href: "/writing/when-the-church-married-empire" })).toBe("/writing/when-the-church-married-empire");
    // The pilots' case: the same data once the essays are public.
    seed.held.clear();
    publish(CN_LEAD, CN_ALSO, SLAVERY);
    expect(leadOf(t)).toMatchObject({ standIn: false, link: { href: `/writing/${CN_LEAD}` } });
    expect(publicEssays(t.alsoEssays).map((l) => l.href)).toEqual([`/writing/${CN_ALSO}`, "/writing/when-the-church-married-empire"]);
    expect(rowTarget(row)).toBe(row.href);
  });

  it("sends topic_lead_open with the slugs only", () => {
    trackTopicLeadOpen("a-topic", "/help/x", true);
    expect(vi.mocked(vercelTrack)).toHaveBeenCalledWith("topic_lead_open", { topic: "a-topic", lead: "/help/x", stand_in: true });
  });

  it("is found by search: \"christian nationalism\" ranks the topic first", () => {
    const source = LIBRARY_SOURCES.find((s) => s.url === "/topics/index.json")!;
    const guides = LIBRARY_SOURCES.find((s) => s.url === "/studyguides/index.json")!;
    const entries = [
      ...libraryEntries(guides, JSON.parse(read("studyguides/index.json"))),
      ...libraryEntries(source, INDEX),
    ];
    expect(rankEntries(entries, "christian nationalism")[0].href).toBe("/topics/faith-politics-and-the-flag");
    expect(rankEntries(entries, "post christian")[0].href).toBe("/topics/living-after-christendom");
    expect(rankEntries(entries, "post-christian")[0].href).toBe("/topics/living-after-christendom");
  });
});
