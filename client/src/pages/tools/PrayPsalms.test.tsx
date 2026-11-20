/**
 * Pray the Psalms on its real built files: the three ways in, a psalm opened
 * with its guide and the plain notes' care paragraphs word for word, the slow
 * reading through a whole psalm by button and by arrow key (Psalm 88, to its
 * end in the dark), the cursing-psalm panel, psalms kept and prayed kept on
 * the device and still there when the page opens again, and the storage
 * refusal sentence.
 */
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import { TestProviders } from "@/test/harness";
import PrayPsalms from "./PrayPsalms";
import { planDay } from "@/lib/pray-psalms";

const PUBLIC = path.resolve(__dirname, "../../../public");
const KEY = "livewell-progress-pray-psalms";
const read = (rel: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, rel), "utf8"));

function show() {
  return render(
    <TestProviders>
      <PrayPsalms />
    </TestProviders>,
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      const m = /\/pray-psalms\/(.+\.json)$/.exec(url);
      const file = m ? path.join(PUBLIC, "pray-psalms", m[1]) : null;
      return file && fs.existsSync(file) ? new Response(fs.readFileSync(file, "utf8"), { status: 200 }) : new Response("{}", { status: 404 });
    }),
  );
  window.scrollTo = vi.fn();
  vi.stubGlobal("requestAnimationFrame", (f: FrameRequestCallback) => {
    f(0);
    return 0;
  });
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Pray the Psalms", () => {
  it("finds psalms by how you are, and opens one with its guide and its care lines word for word", async () => {
    show();
    fireEvent.click(await screen.findByRole("radio", { name: /How are you today\?/ }));
    fireEvent.click(await screen.findByRole("radio", { name: /^Grieving/ }));
    const grieving = read("pray-psalms/index.json").whens.find((w: { id: string }) => w.id === "grieving");
    expect(await screen.findByRole("heading", { name: `Grieving: ${grieving.psalms.length} psalms` })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /^Psalm 23 · Trust/ }));
    expect(await screen.findByRole("heading", { name: "The LORD Is My Shepherd", level: 2 })).toBeInTheDocument();
    const p23 = read("pray-psalms/psalm/23.json");
    expect(screen.getByText(p23.guide)).toBeInTheDocument();
    const care = screen.getByRole("complementary", { name: /A word of care/ });
    expect(within(care).getByText(p23.care[0].text)).toBeInTheDocument();
    expect(within(care).getByRole("link", { name: /Find Help/ })).toHaveAttribute("href", "/help");
    // The whole psalm, in the BSB.
    expect(screen.getByText(p23.verses[0].t)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "The Study Bible on Psalm 23" })).toHaveAttribute("href", "/study/bible/psalms/23#notes");
  });

  it("prays Psalm 88 slowly, one part at a time, to its end in the dark", async () => {
    localStorage.setItem(KEY, JSON.stringify({ way: "all", when: null, day: null, open: 88, kept: [], prayed: [] }));
    show();
    expect(await screen.findByRole("heading", { name: "Darkness Is My Closest Companion", level: 2 })).toBeInTheDocument();
    const p88 = read("pray-psalms/psalm/88.json");
    // The care paragraphs come before the psalm, word for word.
    for (const c of p88.care) expect(screen.getByText(c.text)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Pray it slowly" }));
    const region = screen.getByRole("region", { name: "Praying Psalm 88 slowly" });
    expect(within(region).getByText(`Part 1 of ${p88.stanzas.length} · verses 1 to 2`)).toBeInTheDocument();
    expect(document.activeElement).toBe(within(region).getByRole("heading", { name: p88.stanzas[0].title }));
    // The arrow key moves on, and back.
    fireEvent.keyDown(region, { key: "ArrowRight" });
    expect(within(region).getByText(new RegExp(`^Part 2 of ${p88.stanzas.length}`))).toBeInTheDocument();
    fireEvent.keyDown(region, { key: "ArrowLeft" });
    expect(within(region).getByText(new RegExp(`^Part 1 of ${p88.stanzas.length}`))).toBeInTheDocument();
    for (let i = 1; i < p88.stanzas.length; i++) fireEvent.click(within(region).getByRole("button", { name: /^Next/ }));
    fireEvent.click(within(region).getByRole("button", { name: /^Finish/ }));
    expect(within(region).getByRole("heading", { name: "You have prayed Psalm 88" })).toBeInTheDocument();
    for (const e of p88.ending) expect(within(region).getByText(e.text)).toBeInTheDocument();
    fireEvent.click(within(region).getByRole("checkbox", { name: "I prayed this today" }));
    expect(JSON.parse(localStorage.getItem(KEY)!).prayed[0]).toMatchObject({ n: 88 });
  });

  it("reads Psalm 119 one stanza of eight verses at a time", async () => {
    localStorage.setItem(KEY, JSON.stringify({ way: null, when: null, day: null, open: 119, kept: [], prayed: [] }));
    show();
    fireEvent.click(await screen.findByRole("button", { name: "Pray it slowly" }));
    const region = screen.getByRole("region", { name: "Praying Psalm 119 slowly" });
    expect(within(region).getByText("Part 1 of 22 · verses 1 to 8")).toBeInTheDocument();
    for (let i = 1; i < 22; i++) fireEvent.click(within(region).getByRole("button", { name: /^Next/ }));
    expect(within(region).getByText("Part 22 of 22 · verses 169 to 176")).toBeInTheDocument();
  });

  it("explains a cursing psalm in the introduction's own words", async () => {
    localStorage.setItem(KEY, JSON.stringify({ way: null, when: null, day: null, open: 137, kept: [], prayed: [] }));
    show();
    expect(await screen.findByRole("heading", { name: "By the Rivers of Babylon", level: 2 })).toBeInTheDocument();
    const intro = read("bible/notes/psalms/intro.json").teaching.parts.find((p: { id: string }) => p.id === "cursing-psalms");
    expect(screen.getByText(/The cursing psalms: how to read this psalm/)).toBeInTheDocument();
    expect(screen.getByText(intro.body.split("\n\n").at(-1))).toBeInTheDocument();
    const p137 = read("pray-psalms/psalm/137.json");
    expect(screen.getByText(p137.care[0].text)).toBeInTheDocument();
  });

  it("keeps psalms and the days they were prayed, and opens where the reader left them", async () => {
    const first = show();
    fireEvent.click(await screen.findByRole("radio", { name: /All 150/ }));
    const grid = await screen.findByRole("list", { name: "Psalms 1 to 150" });
    expect(within(grid).getAllByRole("button")).toHaveLength(150);
    fireEvent.click(within(grid).getByRole("button", { name: /^Psalm 121: The LORD Who Keeps You/ }));
    expect(await screen.findByRole("heading", { name: "The LORD Who Keeps You", level: 2 })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Keep this psalm/ }));
    fireEvent.click(screen.getByRole("checkbox", { name: "I prayed this today" }));
    expect(JSON.parse(localStorage.getItem(KEY)!)).toMatchObject({ way: "all", open: 121, kept: [121], prayed: [{ n: 121 }] });
    first.unmount();
    show();
    expect(await screen.findByRole("heading", { name: "The LORD Who Keeps You", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Keep this psalm/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("checkbox", { name: "I prayed this today" })).toBeChecked();
    expect(screen.getByRole("heading", { name: "Psalms you are keeping" })).toBeInTheDocument();
    // The grid narrows by kind.
    fireEvent.change(screen.getByLabelText("Show"), { target: { value: "ascents" } });
    expect(within(screen.getByRole("list", { name: "15 psalms" })).getAllByRole("button")).toHaveLength(15);
  });

  it("gives a morning and an evening for today, from a plan it calls its own", async () => {
    show();
    fireEvent.click(await screen.findByRole("radio", { name: /Morning and evening/ }));
    const day = planDay();
    expect(await screen.findByRole("heading", { name: `Day ${day} of the month` })).toBeInTheDocument();
    expect(screen.getByText(/This is a plan made for this page, not an ancient order of prayer/)).toBeInTheDocument();
    const plan = read("pray-psalms/index.json").plan.find((d: { d: number }) => d.d === day);
    expect(screen.getByRole("button", { name: new RegExp(`^Psalm ${plan.morning[0]} `) })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: new RegExp(`^Psalm ${plan.evening.at(-1)} `) })).toBeInTheDocument();
  });

  it("says so in the site's own sentence when the browser will not save", async () => {
    show();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    fireEvent.click(await screen.findByRole("radio", { name: /All 150/ }));
    expect(screen.getByText(/Couldn't save to this browser/)).toBeInTheDocument();
  });

  it("keeps Find Help in view from the top of the page", async () => {
    show();
    const line = (await screen.findByText(/If today is very hard, you do not have to carry it alone/)).closest("p")!;
    expect(within(line).getByRole("link", { name: "Find Help" })).toHaveAttribute("href", "/help");
  });
});
