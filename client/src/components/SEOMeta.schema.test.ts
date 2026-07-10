import { describe, it, expect } from "vitest";
import { getPersonSchema, getOrganizationSchema } from "./SEOMeta";

describe("getPersonSchema — the E-E-A-T author entity", () => {
  const s = getPersonSchema();

  it("is a valid schema.org Person", () => {
    expect(s["@context"]).toBe("https://schema.org");
    expect(s["@type"]).toBe("Person");
    expect(s.name).toBeTruthy();
    expect(s.url).toMatch(/\/about$/);
  });

  it("carries the professional affiliations as organizations", () => {
    const orgs = s.worksFor.map((o) => o.name);
    expect(orgs).toContain("First Baptist Church of Fenton");
    expect(orgs).toContain("Pastors Connection Network");
  });

  it("declares expertise (knowsAbout) for topical authority", () => {
    expect(s.knowsAbout.length).toBeGreaterThanOrEqual(3);
    expect(s.knowsAbout).toContain("Theology");
  });

  it("ties the same social profiles as the Organization founder (one identity)", () => {
    // sameAs must be consistent across entities so the knowledge graph merges them.
    for (const url of getOrganizationSchema().sameAs) {
      expect(s.sameAs).toContain(url);
    }
  });
});
