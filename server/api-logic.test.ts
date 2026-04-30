import { describe, it, expect } from "vitest";
import crypto from "node:crypto";
import { generateRobotsTxt } from "./sitemap-generator";

describe("robots.txt generation", () => {
  it("generates valid robots.txt with sitemap URL", () => {
    const result = generateRobotsTxt("https://www.livewellbyjamesbell.co");
    expect(result).toContain("User-agent: *");
    expect(result).toContain("Allow: /");
    expect(result).toContain("Sitemap: https://www.livewellbyjamesbell.co/sitemap.xml");
    expect(result).toContain("Disallow: /admin/");
    expect(result).toContain("Disallow: /api/");
  });

  it("does not contain unclosed braces or syntax errors", () => {
    const result = generateRobotsTxt("https://example.com");
    expect(result).not.toContain("{");
    expect(result).not.toContain("}");
  });
});

describe("quiz scoring logic", () => {
  const PILLARS = ["Theological Depth", "Prophetic Disruption", "Integrated Life"] as const;

  function scoreQuiz(answers: number[], questions: Array<{ pillarWeights: Record<string, number[]> }>) {
    const scores: Record<string, number> = {};
    for (const p of PILLARS) scores[p] = 0;

    answers.forEach((answerIndex, questionIndex) => {
      const q = questions[questionIndex];
      if (!q) return;
      for (const [pillar, weights] of Object.entries(q.pillarWeights)) {
        const w = weights[answerIndex];
        if (typeof w === "number") scores[pillar] = (scores[pillar] || 0) + w;
      }
    });

    const sorted = Object.entries(scores).sort(([, a], [, b]) => b - a);
    return { topPillar: sorted[0]?.[0] || "Theological Depth", scores };
  }

  const sampleQuestions = [
    {
      pillarWeights: {
        "Theological Depth": [3, 2, 2, 3],
        "Prophetic Disruption": [1, 2, 3, 2],
        "Integrated Life": [1, 1, 3, 2],
      },
    },
    {
      pillarWeights: {
        "Theological Depth": [3, 1, 1, 1],
        "Prophetic Disruption": [2, 3, 2, 3],
        "Integrated Life": [1, 1, 3, 1],
      },
    },
  ];

  it("scores Theological Depth highest when selecting first options", () => {
    const result = scoreQuiz([0, 0], sampleQuestions);
    expect(result.topPillar).toBe("Theological Depth");
    expect(result.scores["Theological Depth"]).toBe(6);
  });

  it("scores Prophetic Disruption highest when selecting prophetic options", () => {
    const result = scoreQuiz([2, 1], sampleQuestions);
    expect(result.topPillar).toBe("Prophetic Disruption");
  });

  it("handles empty answers gracefully", () => {
    const result = scoreQuiz([], sampleQuestions);
    expect(result.topPillar).toBeDefined();
    expect(result.scores["Theological Depth"]).toBe(0);
  });

  it("handles out-of-bounds answer index", () => {
    const result = scoreQuiz([99], sampleQuestions);
    expect(result.scores["Theological Depth"]).toBe(0);
  });
});

describe("session token logic", () => {

  function signSession(user: string, expMs: number, secret: string): string {
    const payload = JSON.stringify({ u: user, e: expMs });
    const b64 = Buffer.from(payload).toString("base64url");
    const sig = crypto.createHmac("sha256", secret).update(b64).digest("base64url");
    return b64 + "." + sig;
  }

  function verifySession(token: string | undefined, secret: string): { user: string } | null {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [b64, sig] = parts;
    const expected = crypto.createHmac("sha256", secret).update(b64).digest("base64url");
    if (sig !== expected) return null;
    try {
      const payload = JSON.parse(Buffer.from(b64, "base64url").toString());
      if (typeof payload.e !== "number" || payload.e < Date.now()) return null;
      if (typeof payload.u !== "string") return null;
      return { user: payload.u };
    } catch {
      return null;
    }
  }

  const secret = "test-secret-at-least-32-characters-long";

  it("signs and verifies a valid session", () => {
    const token = signSession("admin", Date.now() + 60000, secret);
    const result = verifySession(token, secret);
    expect(result).toEqual({ user: "admin" });
  });

  it("rejects expired sessions", () => {
    const token = signSession("admin", Date.now() - 1000, secret);
    const result = verifySession(token, secret);
    expect(result).toBeNull();
  });

  it("rejects tampered tokens", () => {
    const token = signSession("admin", Date.now() + 60000, secret);
    const tampered = token.slice(0, -1) + "X";
    const result = verifySession(tampered, secret);
    expect(result).toBeNull();
  });

  it("rejects tokens signed with different secret", () => {
    const token = signSession("admin", Date.now() + 60000, "wrong-secret-wrong-secret-wrong");
    const result = verifySession(token, secret);
    expect(result).toBeNull();
  });

  it("rejects undefined/empty tokens", () => {
    expect(verifySession(undefined, secret)).toBeNull();
    expect(verifySession("", secret)).toBeNull();
  });

  it("rejects malformed tokens", () => {
    expect(verifySession("not-a-token", secret)).toBeNull();
    expect(verifySession("a.b.c", secret)).toBeNull();
  });
});

describe("email validation", () => {
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  it("accepts valid emails", () => {
    expect(emailRegex.test("user@example.com")).toBe(true);
    expect(emailRegex.test("user+tag@example.co.uk")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(emailRegex.test("")).toBe(false);
    expect(emailRegex.test("notanemail")).toBe(false);
    expect(emailRegex.test("@example.com")).toBe(false);
    expect(emailRegex.test("user@")).toBe(false);
    expect(emailRegex.test("user @example.com")).toBe(false);
  });
});
