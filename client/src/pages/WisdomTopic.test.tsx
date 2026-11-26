/**
 * The wisdom topic page (/wisdom/:id), rendered from the real built files
 * (client/public/wisdom/entry/<id>.json and the Study Bible's own files),
 * served by a fetch stub that reads client/public.
 *
 * - A topic written in full shows every section, in order.
 * - "Read it where it stands" opens the paragraph, and names the plain-words
 *   notes only where the chapter note says they exist.
 * - Heavy subjects keep Find Help above the first verse; the gravest keep the
 *   full block there, and the abuse lines still close the page.
 * - A topic not yet written in full still renders, without the new sections.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor, fireEvent, within } from "@testing-library/react";
import { Router } from "wouter";
import { memoryLocation } from "wouter/memory-location";
import fs from "node:fs";
import path from "node:path";
import { TestProviders } from "@/test/harness";
import { SENSITIVE_WISDOM } from "@/lib/needs";
import WisdomTopic from "./WisdomTopic";

const PUBLIC = path.resolve(__dirname, "../../public");
const topics: { id: string; label: string }[] = JSON.parse(fs.readFileSync(path.join(PUBLIC, "wisdom/topics.json"), "utf8")).topics;
const deepIds = fs.readdirSync(path.join(PUBLIC, "wisdom/deep")).map((f) => f.replace(/\.json$/, ""));
const heavyDeepIds = deepIds.filter((x) => SENSITIVE_WISDOM[x]);

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
  const { hook } = memoryLocation({ path: p });
  return render(
    <TestProviders>
      <Router hook={hook}>
        <WisdomTopic />
      </Router>
    </TestProviders>,
  );
}

describe("WisdomTopic", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal("fetch", servePublic());
  });
  afterEach(() => vi.unstubAllGlobals());

  it("names only topics that exist, and writes in full only topics that exist", () => {
    const ids = new Set(topics.map((t) => t.id));
    for (const id of Object.keys(SENSITIVE_WISDOM)) expect(ids.has(id), id).toBe(true);
    expect(deepIds.length).toBeGreaterThanOrEqual(12);
    for (const id of deepIds) expect(ids.has(id), id).toBe(true);
  });

  it("shows every section of a topic written in full, in order", async () => {
    const { container } = renderAt("/wisdom/wayward-child");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("A Wayward Child"));
    const order = ["What Scripture says", "Often misread", "What the whole Bible says", "The world it was written in", "How the church has read it", "Where Christians differ", "A question to sit with", "Pray", "If this is heavy for you", "Where to go next"];
    const headings = Array.from(container.querySelectorAll("h2")).map((h) => h.textContent?.trim());
    let at = -1;
    for (const name of order) {
      const i = headings.indexOf(name);
      expect(i, `${name} in ${headings.join(" | ")}`).toBeGreaterThan(at);
      at = i;
    }
    expect(container.querySelectorAll(".wz-verse").length).toBeGreaterThanOrEqual(5);
    expect(container.querySelectorAll(".wz-verse__where").length).toBe(container.querySelectorAll(".wz-verse").length);
    expect(container.querySelector(".wz-prayer cite")?.textContent).toMatch(/^Psalm /);
    // The psalm opens in Pray the Psalms and in the Study Bible (Psalm 130:5-7).
    expect(container.querySelector('#pray a[href="/tools/pray-the-psalms?psalm=130"]')).toHaveTextContent("Pray Psalm 130 slowly");
    expect(container.querySelector('#pray a[href="/study/bible/psalms/130"]')).toBeTruthy();
    // wayward-child is a heavy subject: Find Help sits above the first verse.
    const help = container.querySelector('a[href="/help"]');
    const firstVerse = container.querySelector(".wz-verse");
    expect(help!.compareDocumentPosition(firstVerse!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("opens a verse where it stands, and names the plain-words notes only where they exist", async () => {
    const { container } = renderAt("/wisdom/wayward-child");
    await waitFor(() => expect(container.querySelectorAll(".wz-verse").length).toBeGreaterThan(0));
    const cards = Array.from(container.querySelectorAll<HTMLElement>(".wz-verse"));
    // Luke 15 has plain-words notes; Ezekiel 18 does not.
    const luke = cards.find((c) => c.querySelector("cite")?.textContent === "Luke 15:20")!;
    const ezekiel = cards.find((c) => c.querySelector("cite")?.textContent === "Ezekiel 18:20")!;
    fireEvent.click(within(luke).getByRole("button", { name: /Read it where it stands/ }));
    await waitFor(() => expect(within(luke).getByText("The plain-words notes on Luke 15")).toBeInTheDocument());
    expect(within(luke).getByText("The plain-words notes on Luke 15").closest("a")?.getAttribute("href")).toBe("/study/bible/luke/15#notes");
    expect(luke.querySelector("mark")?.textContent).toMatch(/^So he got up/);
    expect(luke.querySelector(".wz-context__head")?.textContent).toMatch(/^Luke 15:11.24/);
    fireEvent.click(within(ezekiel).getByRole("button", { name: /Read it where it stands/ }));
    await waitFor(() => expect(within(ezekiel).getByText("The Study Bible notes on Ezekiel 18")).toBeInTheDocument());
    expect(within(ezekiel).queryByText(/plain-words/)).toBeNull();
    // Every Study Bible link on the page points at a chapter that has its notes file.
    for (const a of Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href^="/study/bible/"]'))) {
      const m = a.getAttribute("href")!.match(/^\/study\/bible\/([a-z0-9-]+)\/(\d+)/);
      if (!m) continue;
      expect(fs.existsSync(path.join(PUBLIC, "bible/notes", m[1], `${m[2]}.json`)), a.getAttribute("href")!).toBe(true);
    }
  });

  it("has heavy subjects written in full to check", () => {
    expect(heavyDeepIds.length).toBeGreaterThanOrEqual(20);
  });

  // One page to a test: all of them in one test rendered two dozen whole
  // pages, and on a busy machine that alone ran past the 5 s budget.
  it.each(heavyDeepIds)("keeps Find Help at the top of %s, a heavy subject written in full, with the care lines", async (id) => {
    const { container } = renderAt(`/wisdom/${id}`);
    await waitFor(() => expect(container.querySelector(".wz-verse")).not.toBeNull());
    const help = container.querySelector('a[href="/help"]');
    expect(help, id).not.toBeNull();
    expect(help!.compareDocumentPosition(container.querySelector(".wz-verse")!) & Node.DOCUMENT_POSITION_FOLLOWING, id).toBeTruthy();
    expect(container.querySelector(".wz-care")?.textContent, id).toMatch(/Find Help page on this site lists places to turn/);
  });

  it("still renders a topic not yet written in full, without the new sections", async () => {
    const { container } = renderAt("/wisdom/patience");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Patience and Waiting"));
    expect(container.querySelectorAll(".wz-verse").length).toBeGreaterThanOrEqual(5);
    const headings = Array.from(container.querySelectorAll("h2")).map((h) => h.textContent?.trim());
    expect(headings).toContain("Living it now");
    expect(headings).not.toContain("Often misread");
    expect(headings).not.toContain("Pray");
  });

  it("puts the full help block above the verses on /wisdom/suicidal-thoughts", async () => {
    const { container } = renderAt("/wisdom/suicidal-thoughts");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Suicidal Thoughts"));
    const call = container.querySelector('a[href="tel:988"]');
    const firstVerse = container.querySelector("blockquote");
    expect(call).not.toBeNull();
    expect(call!.compareDocumentPosition(firstVerse!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("shows the Domestic Violence Hotline on /wisdom/toxic-relationships", async () => {
    const { container } = renderAt("/wisdom/toxic-relationships");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument());
    expect(container.querySelector('a[href="tel:18007997233"]')).not.toBeNull();
  });

  it("says plainly when a topic does not exist", async () => {
    renderAt("/wisdom/no-such-topic");
    await waitFor(() => expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("No wisdom entry here"));
  });
});
