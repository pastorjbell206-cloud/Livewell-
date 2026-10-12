/**
 * The editorial list sends each link the right way: app routes through the
 * router, and files and other websites as plain links (the router cannot open
 * a PDF or navigate to another site, so a tap would do nothing).
 */
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { TestProviders } from "@/test/harness";
import { EditorialIndex } from "./EditorialIndex";

describe("EditorialIndex links", () => {
  it("opens other websites and printables as plain links", () => {
    const { container } = render(
      <TestProviders>
        <EditorialIndex
          label="Go deeper"
          items={[
            { href: "https://example.org", title: "Another website" },
            { href: "/downloads/tools/budget-letter.pdf", title: "A printable" },
            { href: "/help/anxiety", title: "A page on this site" },
          ]}
        />
      </TestProviders>,
    );
    const links = Array.from(container.querySelectorAll("a"));
    const site = links.find((a) => a.getAttribute("href") === "https://example.org")!;
    expect(site.getAttribute("target")).toBe("_blank");
    expect(site.getAttribute("rel")).toContain("noopener");
    expect(links.find((a) => a.getAttribute("href") === "/downloads/tools/budget-letter.pdf")).toBeTruthy();
    expect(links.find((a) => a.getAttribute("href") === "/help/anxiety")).toBeTruthy();
  });
});
