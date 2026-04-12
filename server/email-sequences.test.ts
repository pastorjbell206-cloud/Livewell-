import { describe, it, expect } from "vitest";
import { EMAIL_SEQUENCES, getEmailSequence, getEmailByOrder } from "./email-sequences";

describe("Email Sequences", () => {
  it("should have 5 email sequences defined", () => {
    expect(Object.keys(EMAIL_SEQUENCES)).toHaveLength(5);
  });

  it("should have sequences for all lead magnets", () => {
    expect(EMAIL_SEQUENCES["leadership-audit"]).toBeDefined();
    expect(EMAIL_SEQUENCES["prophetic-manifesto"]).toBeDefined();
    expect(EMAIL_SEQUENCES["theology-workbook"]).toBeDefined();
    expect(EMAIL_SEQUENCES["life-diagnostic"]).toBeDefined();
    expect(EMAIL_SEQUENCES["community-roadmap"]).toBeDefined();
  });

  it("should have 5 emails in each sequence", () => {
    Object.values(EMAIL_SEQUENCES).forEach((sequence) => {
      expect(sequence).toHaveLength(5);
    });
  });

  it("should have valid email structure", () => {
    Object.values(EMAIL_SEQUENCES).forEach((sequence) => {
      sequence.forEach((email) => {
        expect(email.order).toBeDefined();
        expect(email.delayHours).toBeDefined();
        expect(email.subject).toBeDefined();
        expect(email.preheader).toBeDefined();
        expect(email.body).toBeDefined();
        expect(email.cta).toBeDefined();
        expect(email.cta.text).toBeDefined();
        expect(email.cta.url).toBeDefined();
      });
    });
  });

  it("should have sequential order numbers", () => {
    Object.values(EMAIL_SEQUENCES).forEach((sequence) => {
      const orders = sequence.map((e) => e.order).sort((a, b) => a - b);
      expect(orders).toEqual([1, 2, 3, 4, 5]);
    });
  });

  it("should have increasing delay hours", () => {
    Object.values(EMAIL_SEQUENCES).forEach((sequence) => {
      for (let i = 1; i < sequence.length; i++) {
        expect(sequence[i].delayHours).toBeGreaterThanOrEqual(sequence[i - 1].delayHours);
      }
    });
  });

  it("should return correct sequence with getEmailSequence", () => {
    const sequence = getEmailSequence("leadership-audit");
    expect(sequence).toHaveLength(5);
    expect(sequence[0].subject).toContain("Leadership Audit");
  });

  it("should return undefined for invalid magnet ID", () => {
    const sequence = getEmailSequence("invalid-magnet");
    expect(sequence).toEqual([]);
  });

  it("should return correct email by order", () => {
    const email = getEmailByOrder("leadership-audit", 1);
    expect(email).toBeDefined();
    expect(email?.order).toBe(1);
    expect(email?.subject).toContain("Leadership Audit");
  });

  it("should return undefined for invalid order", () => {
    const email = getEmailByOrder("leadership-audit", 99);
    expect(email).toBeUndefined();
  });

  it("should have compelling subject lines", () => {
    Object.values(EMAIL_SEQUENCES).forEach((sequence) => {
      sequence.forEach((email) => {
        expect(email.subject.length).toBeGreaterThan(10);
        expect(email.subject.length).toBeLessThan(100);
      });
    });
  });

  it("should have valid CTA URLs", () => {
    Object.values(EMAIL_SEQUENCES).forEach((sequence) => {
      sequence.forEach((email) => {
        expect(email.cta.url).toMatch(/^\//);
      });
    });
  });

  it("should have email body content", () => {
    Object.values(EMAIL_SEQUENCES).forEach((sequence) => {
      sequence.forEach((email) => {
        expect(email.body.length).toBeGreaterThan(50);
      });
    });
  });
});
