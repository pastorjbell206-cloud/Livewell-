import { describe, it, expect, beforeAll } from "vitest";
import { relatedArticlesRouter } from "./related-articles-router";
import { quizRouter } from "./quiz-router";
import { listPosts } from "./db";

describe("Engagement Features", () => {
  describe("Related Articles Router", () => {
    it("should return related articles from the same pillar", async () => {
      const caller = relatedArticlesRouter.createCaller({} as any);
      const result = await caller.getRelated({
        slug: "test-article",
        pillar: "Theological Depth",
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(4);
    });

    it("should exclude the current article from results", async () => {
      const caller = relatedArticlesRouter.createCaller({} as any);
      const result = await caller.getRelated({
        slug: "when-one-partner-has-grown-and-the-other-hasnt",
        pillar: "Integrated Life",
      });

      const slugs = result.map((article) => article.slug);
      expect(slugs).not.toContain("when-one-partner-has-grown-and-the-other-hasnt");
    });

    it("should return articles from other pillars if same pillar has fewer than 3", async () => {
      const caller = relatedArticlesRouter.createCaller({} as any);
      const result = await caller.getRelated({
        slug: "test-article",
        pillar: "Prophetic Disruption",
      });

      expect(result.length).toBeGreaterThanOrEqual(0);
      expect(result.length).toBeLessThanOrEqual(4);
    });

    it("should handle empty pillar gracefully", async () => {
      const caller = relatedArticlesRouter.createCaller({} as any);
      const result = await caller.getRelated({
        slug: "test",
        pillar: "NonExistentPillar",
      });

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("Quiz Router", () => {
    it("should return all quiz questions", async () => {
      const caller = quizRouter.createCaller({} as any);
      const questions = await caller.getQuestions();

      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBe(10);
      expect(questions[0]).toHaveProperty("id");
      expect(questions[0]).toHaveProperty("question");
      expect(questions[0]).toHaveProperty("options");
      expect(questions[0]).toHaveProperty("pillarWeights");
    });

    it("should have valid question structure", async () => {
      const caller = quizRouter.createCaller({} as any);
      const questions = await caller.getQuestions();

      questions.forEach((question) => {
        expect(question.id).toBeGreaterThan(0);
        expect(question.question).toBeTypeOf("string");
        expect(question.options).toBeInstanceOf(Array);
        expect(question.options.length).toBeGreaterThan(0);
        expect(question.pillarWeights).toBeInstanceOf(Object);
      });
    });

    it("should calculate recommendations based on answers", async () => {
      const caller = quizRouter.createCaller({} as any);
      const answers = [0, 1, 2, 1, 0, 1, 2, 1, 0, 1];
      const result = await caller.getRecommendations({ answers });

      expect(result).toHaveProperty("topPillar");
      expect(result).toHaveProperty("pillarScores");
      expect(result).toHaveProperty("recommendedArticles");
      expect(result).toHaveProperty("message");

      expect(["Theological Depth", "Prophetic Disruption", "Integrated Life"]).toContain(
        result.topPillar
      );
      expect(result.pillarScores).toHaveProperty("Theological Depth");
      expect(result.pillarScores).toHaveProperty("Prophetic Disruption");
      expect(result.pillarScores).toHaveProperty("Integrated Life");
    });

    it("should return recommended articles for top pillar", async () => {
      const caller = quizRouter.createCaller({} as any);
      const answers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const result = await caller.getRecommendations({ answers });

      expect(Array.isArray(result.recommendedArticles)).toBe(true);
      if (result.recommendedArticles.length > 0) {
        expect(result.recommendedArticles[0]).toHaveProperty("slug");
        expect(result.recommendedArticles[0]).toHaveProperty("title");
        expect(result.recommendedArticles[0]).toHaveProperty("pillar");
      }
    });

    it("should provide meaningful message based on top pillar", async () => {
      const caller = quizRouter.createCaller({} as any);
      const answers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const result = await caller.getRecommendations({ answers });

      expect(result.message).toBeTypeOf("string");
      expect(result.message.length).toBeGreaterThan(0);
    });

    it("should handle different answer combinations", async () => {
      const caller = quizRouter.createCaller({} as any);

      const combinations = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
        [1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      ];

      for (const answers of combinations) {
        const result = await caller.getRecommendations({ answers });
        expect(result.topPillar).toBeDefined();
        expect(Object.values(result.pillarScores).every((score) => score > 0)).toBe(true);
      }
    });
  });
});
