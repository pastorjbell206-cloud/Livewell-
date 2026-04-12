import { describe, it, expect } from "vitest";
import { LEAD_MAGNETS } from "./lead-magnets";

describe("Lead Magnets", () => {
  it("should have 5 lead magnets defined", () => {
    expect(Object.keys(LEAD_MAGNETS)).toHaveLength(5);
  });

  it("should have leadership audit magnet", () => {
    expect(LEAD_MAGNETS.leadership_audit).toBeDefined();
    expect(LEAD_MAGNETS.leadership_audit.title).toContain("Leadership Audit");
    expect(LEAD_MAGNETS.leadership_audit.id).toBe("leadership-audit");
  });

  it("should have prophetic manifesto magnet", () => {
    expect(LEAD_MAGNETS.prophetic_manifesto).toBeDefined();
    expect(LEAD_MAGNETS.prophetic_manifesto.title).toContain("Prophetic Manifesto");
    expect(LEAD_MAGNETS.prophetic_manifesto.id).toBe("prophetic-manifesto");
  });

  it("should have theology workbook magnet", () => {
    expect(LEAD_MAGNETS.theology_workbook).toBeDefined();
    expect(LEAD_MAGNETS.theology_workbook.title).toContain("Theology Workbook");
    expect(LEAD_MAGNETS.theology_workbook.id).toBe("theology-workbook");
  });

  it("should have life diagnostic magnet", () => {
    expect(LEAD_MAGNETS.life_diagnostic).toBeDefined();
    expect(LEAD_MAGNETS.life_diagnostic.title).toContain("Life Diagnostic");
    expect(LEAD_MAGNETS.life_diagnostic.id).toBe("life-diagnostic");
  });

  it("should have community roadmap magnet", () => {
    expect(LEAD_MAGNETS.community_roadmap).toBeDefined();
    expect(LEAD_MAGNETS.community_roadmap.title).toContain("Community Action Roadmap");
    expect(LEAD_MAGNETS.community_roadmap.id).toBe("community-roadmap");
  });

  it("should have all required fields for each magnet", () => {
    Object.values(LEAD_MAGNETS).forEach((magnet) => {
      expect(magnet.id).toBeDefined();
      expect(magnet.title).toBeDefined();
      expect(magnet.subtitle).toBeDefined();
      expect(magnet.description).toBeDefined();
      expect(magnet.pillar).toBeDefined();
      expect(magnet.coverUrl).toBeDefined();
      expect(magnet.readingPathSlug).toBeDefined();
    });
  });

  it("should have valid cover URLs", () => {
    Object.values(LEAD_MAGNETS).forEach((magnet) => {
      expect(magnet.coverUrl).toMatch(/^https:\/\//);
      expect(magnet.coverUrl).toContain("leadmagnet");
    });
  });

  it("should have unique IDs", () => {
    const ids = Object.values(LEAD_MAGNETS).map((m) => m.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have valid pillar assignments", () => {
    const validPillars = [
      "Leadership Formation",
      "Prophetic Disruption",
      "Theological Depth",
      "Integrated Life",
      "Prophetic Justice",
    ];

    Object.values(LEAD_MAGNETS).forEach((magnet) => {
      expect(validPillars).toContain(magnet.pillar);
    });
  });
});
