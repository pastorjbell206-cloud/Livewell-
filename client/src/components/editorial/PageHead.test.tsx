/**
 * PageHead contract: the page's one H1 with its eyebrow and line, no landmark
 * of its own (it sits inside the layout's main), actions only when given, and
 * a heading that can take focus without joining the tab order when the page
 * asks for it. The /study test in lib/siteNav.test.tsx covers its first use.
 */
import { describe, it, expect } from "vitest";
import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { PageHead } from "./PageHead";

describe("PageHead", () => {
  it("renders the eyebrow, one H1 and one line, and nothing else", () => {
    const { container } = render(
      <PageHead eyebrow="Study" title="Learn the whole Bible" lede="Start with the Study Bible." />,
    );
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent("Learn the whole Bible");
    expect(h1s[0]).not.toHaveAttribute("tabindex");
    expect(screen.getByText("Study")).toHaveClass("eyebrow");
    expect(screen.getByText("Start with the Study Bible.")).toBeInTheDocument();
    expect(container.querySelector(".pg-head__actions")).toBeNull();
    // No banner or region landmark: the layout's <main> already holds it.
    expect(container.querySelector("header, section, [role]")).toBeNull();
  });

  it("puts the page's actions after the line, in order", () => {
    render(
      <PageHead
        title="Family"
        actions={
          <>
            <a className="pg-action" href="/family/devotions">Start tonight</a>
            <a className="pg-action pg-action--quiet" href="/family/catechism">The catechism</a>
          </>
        }
      />,
    );
    const links = screen.getAllByRole("link").map((a) => a.textContent);
    expect(links).toEqual(["Start tonight", "The catechism"]);
  });

  it("lets the page focus its heading without adding it to the tab order", () => {
    const ref = createRef<HTMLHeadingElement>();
    render(<PageHead title="My Library" titleId="library-title" titleRef={ref} />);
    const h1 = screen.getByRole("heading", { level: 1, name: "My Library" });
    expect(ref.current).toBe(h1);
    expect(h1).toHaveAttribute("id", "library-title");
    expect(h1).toHaveAttribute("tabindex", "-1");
    ref.current?.focus();
    expect(h1).toHaveFocus();
  });

  it("matches the column of the page below when given a width", () => {
    const { container } = render(<PageHead title="Essays" width="var(--w-content)" />);
    const inner = container.querySelector<HTMLElement>(".pg-head__inner")!;
    expect(inner.style.getPropertyValue("--pg-w")).toBe("var(--w-content)");
  });
});
