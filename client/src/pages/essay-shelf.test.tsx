/**
 * The essay shelf as a reader meets it: /writing lists only the public shelf
 * (plus posts created after the cutoff, under "Latest"), and a retired
 * essay's URL answers with a short noindex notice instead of the essay.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { screen, waitFor, within } from "@testing-library/react";
import { Route, Switch } from "wouter";
import superjson from "superjson";

import { renderWithProviders, offlineFetch } from "@/test/harness";
import { SHELF_ESSAYS, essayVisibility, shelfListingInput } from "@/lib/shelf";
import Writing from "./Writing";
import ArticleDetail from "./ArticleDetail";
import Search from "./Search";

type Answers = Record<string, unknown>;

/**
 * A fetch that answers tRPC batch requests procedure by procedure: the named
 * procedures get their data, every other one errors (as if offline). Anything
 * that is not a tRPC call is answered offline.
 */
function trpcFetch(answers: Answers): typeof fetch {
  const offline = offlineFetch();
  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(String(input instanceof Request ? input.url : input), "http://localhost");
    if (!url.pathname.startsWith("/api/trpc/")) return offline(input, init);
    const procs = decodeURIComponent(url.pathname.slice("/api/trpc/".length)).split(",");
    const body = procs.map((p) =>
      p in answers
        ? { result: { data: superjson.serialize(answers[p]) } }
        : {
            error: superjson.serialize({
              message: "offline test stub",
              code: -32603,
              data: { code: "INTERNAL_SERVER_ERROR", httpStatus: 500, path: p },
            }),
          }
    );
    return new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;
}

function at(path: string) {
  window.history.pushState({}, "", path);
}

afterEach(() => {
  vi.unstubAllGlobals();
  window.history.pushState({}, "", "/");
});

const row = (slug: string, title: string, createdAt: string, extra: Record<string, unknown> = {}) => ({
  id: slug.length,
  slug,
  title,
  excerpt: `${title} excerpt`,
  pillar: "politics",
  readTime: "12 min read",
  readingTimeMinutes: 12,
  createdAt: new Date(createdAt),
  publishedAt: new Date(createdAt),
  ...extra,
});

describe("/writing", () => {
  it("shows the shelf from the committed list before the API answers, with three to start", async () => {
    vi.stubGlobal("fetch", vi.fn(offlineFetch()));
    at("/writing");
    renderWithProviders(<Writing />);

    expect(screen.getByRole("heading", { level: 1, name: "Essays" })).toBeInTheDocument();
    expect(screen.getByText("Start with these")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "The Mirror: How Sincere Believers Go Wrong" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Faith and Power: Christian Nationalism and Politics" })).toBeInTheDocument();
    // Sections with nothing public yet stay hidden.
    expect(screen.queryByRole("heading", { name: "Doubt and Hard Questions" })).not.toBeInTheDocument();
    // Pending essays are not listed.
    expect(screen.queryByText("What Christian Nationalism Is and What It Is Not")).not.toBeInTheDocument();
    expect(screen.getAllByText("When the Church Married Empire").length).toBeGreaterThan(0);
  });

  it("adds James's new posts under Latest and keeps retired ones out", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        trpcFetch({
          "posts.listPublished": [
            row("a-new-essay-from-the-admin", "A New Essay From the Admin", "2026-11-02T14:00:00.000Z"),
            row("the-atheist-in-the-pulpit", "The Atheist in the Pulpit", "2026-04-30T22:44:29.000Z"),
            row("strongman-theology", "Why a Frightened Church Wants a King", "2026-07-07T20:02:19.000Z"),
          ],
        })
      )
    );
    at("/writing");
    renderWithProviders(<Writing />);

    expect(await screen.findByRole("heading", { level: 2, name: "Latest" })).toBeInTheDocument();
    expect(screen.getByText("A New Essay From the Admin")).toBeInTheDocument();
    expect(screen.queryByText("The Atheist in the Pulpit")).not.toBeInTheDocument();
    expect(screen.getByText("Why a Frightened Church Wants a King")).toBeInTheDocument();
  });

  it("counts a draft begun before the cutoff and published after it as Latest", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        trpcFetch({
          "posts.listPublished": [
            row("a-draft-finished-later", "A Draft Finished Later", "2026-10-01T09:00:00.000Z", {
              publishedAt: new Date("2026-10-20T09:00:00.000Z"),
            }),
          ],
        })
      )
    );
    at("/writing");
    renderWithProviders(<Writing />);

    expect(await screen.findByRole("heading", { level: 2, name: "Latest" })).toBeInTheDocument();
    expect(screen.getByText("A Draft Finished Later")).toBeInTheDocument();
  });

  it("asks the API for the shelf only, not every published row", async () => {
    const fetchSpy = vi.fn(trpcFetch({ "posts.listPublished": [] }));
    vi.stubGlobal("fetch", fetchSpy);
    at("/writing");
    renderWithProviders(<Writing />);

    await waitFor(() =>
      expect(fetchSpy.mock.calls.some(([u]) => String(u).includes("posts.listPublished"))).toBe(true)
    );
    const url = new URL(
      String(fetchSpy.mock.calls.find(([u]) => String(u).includes("posts.listPublished"))![0]),
      "http://localhost"
    );
    const procs = decodeURIComponent(url.pathname.slice("/api/trpc/".length)).split(",");
    const sent = JSON.parse(url.searchParams.get("input") ?? "{}")[String(procs.indexOf("posts.listPublished"))];
    const asked = superjson.deserialize(sent) as { slugs: string[]; since: string };
    expect(asked).toEqual(shelfListingInput());
    // The public shelf by slug, nothing pending or retired, and the Latest cutoff.
    // The pending essay is read from the shelf, not named, because landing a
    // rewrite makes a named one public.
    const pending = SHELF_ESSAYS.filter((e) => essayVisibility(e.slug) === "pending").map((e) => e.slug);
    expect(pending.length).toBeGreaterThan(0);
    expect(asked.slugs).toContain("when-the-church-married-empire");
    for (const slug of pending) expect(asked.slugs).not.toContain(slug);
    expect(asked.slugs).not.toContain("the-atheist-in-the-pulpit");
    expect(asked.since).toBe("2026-10-13T00:00:00.000Z");
  });

  it("narrows to one section with ?section=", () => {
    vi.stubGlobal("fetch", vi.fn(offlineFetch()));
    at("/writing?section=ancient-church");
    renderWithProviders(<Writing />);

    expect(screen.getByRole("heading", { level: 1, name: "The Ancient Church" })).toBeInTheDocument();
    expect(screen.getByText("Women in Church History: The Voices They Silenced")).toBeInTheDocument();
    expect(screen.queryByText("Start with these")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "All essays" })).toHaveAttribute("href", "/writing");
  });

  it("lands old track links on the matching section, or says plainly when it is empty", () => {
    vi.stubGlobal("fetch", vi.fn(offlineFetch()));
    at("/writing?track=politics");
    const first = renderWithProviders(<Writing />);
    expect(screen.getByRole("heading", { level: 1, name: "Faith and Power: Christian Nationalism and Politics" })).toBeInTheDocument();
    first.unmount();

    at("/writing?track=prophetic-justice");
    renderWithProviders(<Writing />);
    expect(screen.getByText("Nothing on this part of the shelf yet.")).toBeInTheDocument();
  });

  it("searches only the public shelf with ?q=", () => {
    vi.stubGlobal("fetch", vi.fn(offlineFetch()));
    at("/writing?q=blind%20spot");
    renderWithProviders(<Writing />);

    expect(screen.getByText(/3 essays match/)).toBeInTheDocument();
    expect(screen.getByText("The Conservative Blind Spot")).toBeInTheDocument();
  });
});

function renderEssay(path: string) {
  at(path);
  return renderWithProviders(
    <Switch>
      <Route path="/writing/:slug" component={ArticleDetail} />
    </Switch>
  );
}

const robots = () => document.head.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "";

describe("/writing/:slug off the shelf", () => {
  it("answers a pending shelf essay at once, noindex, pointing to its section and the Study Bible", () => {
    vi.stubGlobal("fetch", vi.fn(offlineFetch()));
    renderEssay("/writing/what-render-unto-caesar-actually-means");

    expect(screen.getByRole("heading", { level: 1, name: "What Render Unto Caesar Actually Means" })).toBeInTheDocument();
    expect(screen.getByText(/James is revising this essay/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Read the essays" })).toHaveAttribute("href", "/writing");
    expect(screen.getByRole("link", { name: /Go to Faith and Power/ })).toHaveAttribute("href", "/writing?section=faith-and-power");
    expect(screen.getByRole("link", { name: "Open the Study Bible" })).toHaveAttribute("href", "/study/bible");
    const ways = within(screen.getByRole("list", { name: "Where to go instead" }));
    expect(ways.getByRole("link", { name: "Find Help" })).toHaveAttribute("href", "/help");
    // The same robots line the prerendered head carries.
    expect(robots()).toBe("noindex, follow");
    // The nearest essay on the site, from the same section.
    expect(screen.getByText("Read instead:")).toBeInTheDocument();
    expect(robots()).toContain("noindex");
  });

  it("answers a retired essay with the notice, not the essay", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        trpcFetch({
          "posts.getBySlug": {
            ...row("the-atheist-in-the-pulpit", "The Atheist in the Pulpit", "2026-04-30T22:44:29.000Z"),
            body: "A long essay body that must not be shown. ".repeat(40),
          },
        })
      )
    );
    renderEssay("/writing/the-atheist-in-the-pulpit");

    expect(await screen.findByText(/has taken this essay down/)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: "The Atheist in the Pulpit" })).toBeInTheDocument();
    expect(screen.queryByText(/must not be shown/)).not.toBeInTheDocument();
    // Its track (politics) has a section on show.
    expect(screen.getByRole("link", { name: /Go to Faith and Power/ })).toBeInTheDocument();
    await waitFor(() => expect(robots()).toContain("noindex"));
  });

  it("renders a live shelf essay in full", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        trpcFetch({
          "posts.getBySlug": {
            ...row("when-the-church-married-empire", "When the Church Married Empire", "2026-06-09T02:40:57.000Z"),
            body: "The body of the chapter itself. ".repeat(40),
          },
        })
      )
    );
    renderEssay("/writing/when-the-church-married-empire");

    expect(await screen.findByRole("heading", { level: 1, name: "When the Church Married Empire" })).toBeInTheDocument();
    expect(screen.getAllByText(/The body of the chapter itself/).length).toBeGreaterThan(0);
    expect(screen.queryByText(/has taken this essay down/)).not.toBeInTheDocument();
    // Its kicker is its shelf section, and its dek is the shelf's clean line.
    expect(screen.getByRole("link", { name: "After Christendom" })).toHaveAttribute("href", "/writing?section=after-christendom");
    expect(screen.getByText("Why the church’s alliance with empire began long before the modern culture wars.")).toBeInTheDocument();
    expect(screen.queryByText(/For:/)).not.toBeInTheDocument();
  });

  it("repairs an imported body: section breaks, glued headings and paragraphs, lazy quotes", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        trpcFetch({
          "posts.getBySlug": {
            ...row("every-generation-was-sure-it-was", "Every Generation Was Sure It Was Right", "2026-06-09T02:40:57.000Z"),
            excerpt: "Why the church&#8217;s certainty",
            body:
              "---\n\n## A Bible on His Desk\nHe kept a Bible on his desk. " + "He read it daily and prayed. ".repeat(8) +
              "\n\n> He was not a monster. That is the point.\nHe was a man embedded in a community." +
              "\n\n**• • •****## The Day Everything Changed\nIn 313 AD the edict was issued and power was altered.Before that edict, faith had a cost.• • •**\n\n## Closing\n\nThe end.\n\n##",
          },
        })
      )
    );
    renderEssay("/writing/every-generation-was-sure-it-was");

    expect(await screen.findByRole("heading", { level: 2, name: "A Bible on His Desk" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "The Day Everything Changed" })).toBeInTheDocument();
    // The quote ends at its own line; the commentary after it is prose.
    expect(screen.getByText("He was a man embedded in a community.").closest("blockquote")).toBeNull();
    expect(screen.getByText(/Before that edict, faith had a cost\./).textContent).toMatch(/^Before that edict/);
    expect(document.body.textContent).not.toContain("• • •");
    expect(document.body.textContent).not.toContain("**");
    // No empty heading becomes a phantom section.
    for (const h of Array.from(document.querySelectorAll(".article-body h2"))) expect(h.textContent?.trim()).not.toBe("");
  });
});

describe("/search and the shelf", () => {
  it("finds a new admin post that never recorded publishedAt, and keeps retired essays out", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        trpcFetch({
          "search.global": {
            results: [
              { id: 1, type: "article", slug: "an-editor-post", title: "An Editor Post", createdAt: new Date("2026-10-20T09:00:00.000Z") },
              { id: 2, type: "article", slug: "the-atheist-in-the-pulpit", title: "The Atheist in the Pulpit", createdAt: new Date("2026-04-30T22:44:29.000Z") },
            ],
            total: 2,
          },
        })
      )
    );
    at("/search?q=editor");
    renderWithProviders(<Search />);

    expect(await screen.findByText("An Editor Post")).toBeInTheDocument();
    expect(screen.queryByText("The Atheist in the Pulpit")).not.toBeInTheDocument();
  });
});
