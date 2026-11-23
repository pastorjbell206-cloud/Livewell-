/**
 * Tap targets of 44 px on the pages the walk measured (the walk's polish,
 * 2026-11-23): the "All" buttons on /topics (31 to 38 px wide), the Bible
 * Explorer's stop titles (30 px tall on a phone), its card links and the
 * narrow card names ("God", "Sin"), a study guide's PDF buttons (39 px) and
 * its Find Help links. Sizes only: whether a guide's PDF asks for an email
 * waits for James. A browser measured them on the served build; here the
 * rules that hold them are checked, so none can quietly go.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import GatedDownload from "@/components/GatedDownload";
import { HelpForThisGuide } from "@/components/HelpForThisGuide";

const SRC = path.resolve(__dirname, "..");
const css = (rel: string) => fs.readFileSync(path.join(SRC, rel), "utf8");

/** The declarations of the first rule whose selector list is exactly `selector`. */
function rule(text: string, selector: string): string {
  const flat = text.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ");
  const at = flat.indexOf(`${selector} {`) > -1 ? flat.indexOf(`${selector} {`) : flat.indexOf(`${selector}{`);
  expect(at, selector).toBeGreaterThan(-1);
  return flat.slice(flat.indexOf("{", at) + 1, flat.indexOf("}", at)).replace(/\s/g, "");
}

afterEach(() => {
  vi.unstubAllGlobals();
  window.localStorage.clear();
});

describe("controls of 44 px", () => {
  it("holds the 'All' buttons on /topics to 44 px each way", () => {
    const d = rule(css("index.css"), ".qa-group__more");
    expect(d).toContain("min-height:44px");
    expect(d).toContain("min-width:44px");
  });

  it("gives the Explorer's stop titles, card links and card names 44 px", () => {
    const ex = css("pages/explorer/explorer.css");
    // An inline title link: 30 px of text plus 7 px above and below.
    expect(rule(ex, ".ex-stop__title a")).toContain("padding:7px0");
    expect(rule(ex, ".ex-holds__jump a")).toContain("min-width:44px");
    const cards = rule(ex, ".ex-card li > .st-verseref, .ex-card li > .ex-link, .ex-quote__ref .st-verseref");
    expect(cards).toContain("display:inline-flex");
    expect(cards).toContain("min-height:44px");
  });

  it("makes a study guide's PDF buttons, and the email form behind them, 44 px tall", () => {
    render(<GatedDownload href="/downloads/studyguides/x-leader.pdf" label="Leader's Guide (PDF)" source="test" />);
    const button = screen.getByRole("button", { name: /Leader's Guide \(PDF\)/ });
    expect(button.style.minHeight).toBe("44px");
    // It still asks for an email first: only its size changed.
    fireEvent.click(button);
    expect(screen.getByLabelText("Email to receive the toolkit").style.minHeight).toBe("44px");
    expect(screen.getByRole("button", { name: /Get the download/ }).style.minHeight).toBe("44px");
  });

  it("makes the unlocked download link 44 px tall too", () => {
    window.localStorage.setItem("lw-toolkit-unlocked", "1");
    render(<GatedDownload href="/downloads/studyguides/x-leader.pdf" label="Leader's Guide (PDF)" source="test" />);
    expect(screen.getByRole("link", { name: /Leader's Guide \(PDF\)/ }).style.minHeight).toBe("44px");
  });

  it("makes a study guide's Find Help links 44 px tall", async () => {
    const PUBLIC = path.resolve(__dirname, "../../public");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(fs.readFileSync(path.join(PUBLIC, "needs/index.json"), "utf8"), { status: 200, headers: { "Content-Type": "application/json" } })),
    );
    render(<HelpForThisGuide slug="addiction-and-recovery" />);
    const link = await screen.findByRole("link", { name: "I can't stop drinking or using" });
    expect(link.style.minHeight).toBe("44px");
    expect(link.style.display).toBe("inline-flex");
  });
});
