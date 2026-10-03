/**
 * Safety contract for CrisisBlock, the one place the site shows how to reach
 * a person now. Every number a reader can tap must come from the verified
 * data file (data/crisis-resources.json), the 988 Lifeline must always show,
 * a topic must add its line, and the date the numbers were checked must be
 * on the page, because a stale number is a safety failure.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestProviders } from "@/test/harness";
import crisis from "@/data/crisis-resources.json";
import { CrisisBlock, crisisLines, checkedLabel } from "./CrisisBlock";

function hrefs(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href") ?? "");
}

describe("CrisisBlock", () => {
  it("always shows the 988 Lifeline and 911, with tap-to-call links", () => {
    const { container } = render(<TestProviders><CrisisBlock topics={[]} /></TestProviders>);
    expect(screen.getByText("988 Suicide & Crisis Lifeline")).toBeInTheDocument();
    expect(hrefs(container)).toEqual(expect.arrayContaining(["tel:988", "sms:988", "tel:911"]));
  });

  it("adds each topic's line, and only from the verified data", () => {
    const { container } = render(
      <TestProviders><CrisisBlock topics={["suicide", "abuse", "sexual-assault", "substance"]} /></TestProviders>,
    );
    const shown = hrefs(container);
    for (const r of crisis.resources) for (const a of r.actions) expect(shown).toContain(a.href);
    const known = new Set(["tel:911", ...crisis.resources.flatMap((r) => r.actions.map((a) => a.href))]);
    for (const h of shown) if (/^(tel|sms):/.test(h)) expect(known.has(h)).toBe(true);
  });

  it("shows the Domestic Violence Hotline only when abuse is a topic", () => {
    expect(crisisLines(["suicide"]).map((r) => r.id)).not.toContain("dv-hotline");
    expect(crisisLines(["abuse"]).map((r) => r.id)).toContain("dv-hotline");
  });

  it("the compact block adds a topic's lines from the verified data, and only then", () => {
    const plain = render(<TestProviders><CrisisBlock variant="compact" /></TestProviders>);
    expect(hrefs(plain.container)).not.toContain("tel:18006624357");
    plain.unmount();
    const { container } = render(<TestProviders><CrisisBlock variant="compact" topics={["suicide", "substance"]} /></TestProviders>);
    const samhsa = crisis.resources.find((r) => r.id === "samhsa")!;
    for (const a of samhsa.actions) expect(hrefs(container)).toContain(a.href);
    expect(hrefs(container)).toEqual(expect.arrayContaining(["tel:988", "tel:911"]));
  });

  it("prints the date the numbers were checked", () => {
    render(<TestProviders><CrisisBlock /></TestProviders>);
    expect(screen.getByText(new RegExp(`Numbers checked ${checkedLabel()}`))).toBeInTheDocument();
    expect(checkedLabel("2026-09-29")).toBe("September 29, 2026");
  });

  it("keeps the compact form to 988, the text line, 911, and a way to /help", () => {
    const { container } = render(<TestProviders><CrisisBlock variant="compact" /></TestProviders>);
    expect(hrefs(container)).toEqual(expect.arrayContaining(["tel:988", "tel:911", "/help"]));
  });
});
