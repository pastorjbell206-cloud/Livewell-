/**
 * The kit's PageHead: one H1 under the door's label, one line, the action,
 * and a frame for the plate that is there before the drawing arrives. The
 * older contract (eyebrow, lede, actions) is editorial/PageHead.test.tsx.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Search } from "lucide-react";
import PageHead from "./PageHead";
import SectionHead from "./SectionHead";
import IconTile from "./IconTile";

describe("PageHead", () => {
  it("draws a door's page top: label, plain H1, one line, the action, and the plate's frame", () => {
    const { container } = render(
      <PageHead
        size="door"
        door="Bible"
        doorHref="/study"
        title="Study the Bible"
        line="Read it."
        plate="book"
        action={<a className="btn" href="/study/bible">Open the Study Bible</a>}
      />,
    );
    expect(container.firstElementChild).toHaveClass("pg-head", "pg-head--door", "pg-head--art");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Study the Bible");
    expect(screen.getByRole("link", { name: "Bible" }).getAttribute("href")).toBe("/study");
    expect(screen.getByText("Read it.")).toHaveClass("pg-head__lede");
    expect(screen.getByRole("link", { name: "Open the Study Bible" })).toBeInTheDocument();
    // The frame is on the page at once, so its space is held while the plate loads.
    expect(container.querySelector(".pg-head__art .lw-frame__in")).not.toBeNull();
    // No landmark of its own.
    expect(container.querySelector("header, section, [role]")).toBeNull();
  });

  it("is the inner size by default, and draws no frame without a picture", () => {
    const { container } = render(<PageHead title="Contact" />);
    expect(container.firstElementChild).toHaveClass("pg-head--inner");
    expect(container.firstElementChild).not.toHaveClass("pg-head--art");
    expect(container.querySelector(".lw-frame")).toBeNull();
  });
});

describe("SectionHead and IconTile", () => {
  it("give a section an H2 with its label and link, and a tile one link with its name and line", () => {
    render(
      <>
        <SectionHead icon={Search} label="Six ways in" title="Where to study." id="t" link={{ href: "/study/bible", label: "All of it" }} />
        <IconTile href="/tools" icon={Search} name="Study tools" line="Every tool" />
      </>,
    );
    expect(screen.getByRole("heading", { level: 2, name: "Where to study." }).id).toBe("t");
    expect(screen.getByText("Six ways in")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /All of it/ }).getAttribute("href")).toBe("/study/bible");
    expect(screen.getByRole("link", { name: /Study tools/ }).getAttribute("href")).toBe("/tools");
  });
});
