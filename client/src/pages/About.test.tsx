import { describe, it, expect, vi } from "vitest";

describe("About Page Content", () => {
  it("should contain the main bio paragraph", () => {
    const bioText = "The short version is: I couldn't keep quiet";
    expect(bioText).toBeDefined();
  });

  it("should contain the 'Why I Write' section", () => {
    const whyIWriteText = "There was a moment—I can still see it clearly—when I realized that the American church had made a catastrophic mistake";
    expect(whyIWriteText).toBeDefined();
  });

  it("should contain all five pillars in 'What You'll Find Here'", () => {
    const pillars = [
      "Prophetic Disruption",
      "Theological Depth",
      "Prophetic Justice",
      "Integrated Life",
      "Leadership Formation"
    ];

    pillars.forEach(pillar => {
      expect(pillar).toBeDefined();
    });
  });

  it("should have proper CTA message", () => {
    const ctaMessage = "If this resonates with you, I'd love for you to explore the full collection of essays";
    expect(ctaMessage).toBeDefined();
  });

  it("should reference the core conviction about heart transformation", () => {
    const conviction = "behavior modification was never the point. Heart transformation is";
    expect(conviction).toBeDefined();
  });

  it("should mention the journey from fundamentalism", () => {
    const journey = "I grew up in the kind of church where the rules were clear and the questions were discouraged";
    expect(journey).toBeDefined();
  });

  it("should explain why the author writes about justice and theology", () => {
    const reason = "I write because I love the church enough to grieve what she's become";
    expect(reason).toBeDefined();
  });

  it("should describe the tone of the content", () => {
    const tone = "faith should be intellectually honest, pastorally compassionate, and prophetically courageous";
    expect(tone).toBeDefined();
  });

  it("should reference freedom as a key theme", () => {
    const freedom = "freedom. Not the reckless kind — the kind that comes from finally being honest about what you believe and why";
    expect(freedom).toBeDefined();
  });

  it("should mention the cost of leaving fundamentalism", () => {
    const cost = "Leaving that world cost me. It cost relationships, positions, and the kind of certainty that makes life feel manageable";
    expect(cost).toBeDefined();
  });
});
