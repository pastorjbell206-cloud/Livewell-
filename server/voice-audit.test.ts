import { describe, it, expect } from "vitest";
// The audit engine lives with the other content scripts; it stays importable.
import { auditText } from "../scripts/voice-audit.mjs";

describe("voice-audit", () => {
  it("flags a forbidden word as forbidden", () => {
    const r = auditText("Let us delve into the question of grace.");
    const hit = r.findings.find((f) => f.term === "delve");
    expect(hit?.severity).toBe("forbidden");
    expect(r.forbidden).toBeGreaterThan(0);
  });

  it("flags a forbidden phrase", () => {
    const r = auditText("In today's world, the church drifts.");
    expect(r.findings.some((f) => f.term === "in today's world" && f.severity === "forbidden")).toBe(true);
  });

  it("flags therapy-speak", () => {
    const r = auditText("We need to hold space for one another.");
    expect(r.findings.some((f) => f.term === "hold space")).toBe(true);
  });

  it("treats literal 'foster care' as a judgment call, not a violation", () => {
    const r = auditText("The foster care system fails the children it claims to serve.");
    expect(r.forbidden).toBe(0);
    const hit = r.findings.find((f) => f.term === "foster");
    expect(hit?.severity).toBe("review");
  });

  it("keeps 'foster' as forbidden when used as filler", () => {
    const r = auditText("Programs that foster belonging and foster engagement.");
    const hit = r.findings.find((f) => f.term === "foster" && f.severity === "forbidden");
    expect(hit?.count).toBe(2);
  });

  it("treats metaphorical 'journey' as a review flag, not forbidden", () => {
    const r = auditText("I respect the journey that brought him to faith.");
    expect(r.forbidden).toBe(0);
    expect(r.review).toBeGreaterThan(0);
  });

  it("normalizes curly apostrophes when matching phrases", () => {
    const r = auditText("In today’s world the answers ring hollow.");
    expect(r.findings.some((f) => f.term === "in today's world")).toBe(true);
  });

  it("returns a clean result for on-voice prose", () => {
    const r = auditText(
      "He came to faith from atheism. He was raised without a father. " +
        "The cross does not explain the silence. It enters it."
    );
    expect(r.forbidden).toBe(0);
    expect(r.review).toBe(0);
  });

  it("counts words for density", () => {
    const r = auditText("one two three four five");
    expect(r.words).toBe(5);
  });
});
