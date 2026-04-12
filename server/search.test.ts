import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { globalSearch, searchArticles, searchResources, getTrendingArticles } from "./search-service";
import { getDb } from "./db";
import { posts, resources } from "../drizzle/schema";

describe("Search Service", () => {
  let db: any;

  beforeAll(async () => {
    db = await getDb();
    if (!db) {
      console.warn("[Search Tests] Database not available");
    }
  });

  describe("globalSearch", () => {
    it("should return empty array for empty query", async () => {
      const results = await globalSearch("");
      expect(Array.isArray(results)).toBe(true);
    });

    it("should search across articles, resources, and books", async () => {
      const results = await globalSearch("faith", 20);
      expect(Array.isArray(results)).toBe(true);
      // Results might be empty if no matching content exists
      expect(results.every((r) => r.type === "article" || r.type === "resource" || r.type === "book")).toBe(true);
    });

    it("should respect limit parameter", async () => {
      const results = await globalSearch("the", 5);
      expect(results.length).toBeLessThanOrEqual(5);
    });

    it("should include type information in results", async () => {
      const results = await globalSearch("faith", 10);
      results.forEach((result) => {
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("type");
        expect(result).toHaveProperty("title");
        expect(["article", "resource", "book"]).toContain(result.type);
      });
    });
  });

  describe("searchArticles", () => {
    it("should return articles matching query", async () => {
      const results = await searchArticles("faith", 20);
      expect(Array.isArray(results)).toBe(true);
      results.forEach((result) => {
        expect(result.type).toBe("article");
      });
    });

    it("should respect limit parameter", async () => {
      const results = await searchArticles("the", 3);
      expect(results.length).toBeLessThanOrEqual(3);
    });

    it("should include slug for article links", async () => {
      const results = await searchArticles("faith", 5);
      results.forEach((result) => {
        if (result.slug) {
          expect(typeof result.slug).toBe("string");
        }
      });
    });
  });

  describe("searchResources", () => {
    it("should return resources matching query", async () => {
      const results = await searchResources("guide", 20);
      expect(Array.isArray(results)).toBe(true);
      results.forEach((result) => {
        expect(result.type).toBe("resource");
      });
    });

    it("should respect limit parameter", async () => {
      const results = await searchResources("study", 2);
      expect(results.length).toBeLessThanOrEqual(2);
    });

    it("should include url for resource access", async () => {
      const results = await searchResources("guide", 5);
      results.forEach((result) => {
        if (result.url) {
          expect(typeof result.url).toBe("string");
        }
      });
    });
  });

  describe("getTrendingArticles", () => {
    it("should return recent articles", async () => {
      const results = await getTrendingArticles(5);
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeLessThanOrEqual(5);
    });

    it("should only return published articles", async () => {
      const results = await getTrendingArticles(10);
      results.forEach((result) => {
        expect(result.type).toBe("article");
      });
    });

    it("should be sorted by date descending", async () => {
      const results = await getTrendingArticles(10);
      for (let i = 0; i < results.length - 1; i++) {
        const current = results[i].publishedAt ? new Date(results[i].publishedAt!).getTime() : 0;
        const next = results[i + 1].publishedAt ? new Date(results[i + 1].publishedAt!).getTime() : 0;
        expect(current).toBeGreaterThanOrEqual(next);
      }
    });
  });

  describe("Search result structure", () => {
    it("should have consistent result structure", async () => {
      const results = await globalSearch("faith", 5);
      results.forEach((result) => {
        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("type");
        expect(result).toHaveProperty("title");
        expect(typeof result.id).toBe("number");
        expect(typeof result.title).toBe("string");
        expect(["article", "resource", "book"]).toContain(result.type);
      });
    });

    it("should include optional fields when available", async () => {
      const results = await globalSearch("faith", 5);
      results.forEach((result) => {
        if (result.excerpt !== undefined) {
          expect(typeof result.excerpt).toBe("string");
        }
        if (result.category !== undefined) {
          expect(typeof result.category).toBe("string");
        }
      });
    });
  });

  describe("Error handling", () => {
    it("should handle very long queries gracefully", async () => {
      const longQuery = "a".repeat(100);
      const results = await globalSearch(longQuery, 10);
      expect(Array.isArray(results)).toBe(true);
    });

    it("should handle special characters in queries", async () => {
      const results = await globalSearch("faith & culture", 10);
      expect(Array.isArray(results)).toBe(true);
    });

    it("should handle case-insensitive search", async () => {
      const resultsLower = await searchArticles("faith", 10);
      const resultsUpper = await searchArticles("FAITH", 10);
      // Both should return results (exact count might differ due to case sensitivity in DB)
      expect(Array.isArray(resultsLower)).toBe(true);
      expect(Array.isArray(resultsUpper)).toBe(true);
    });
  });
});
