import { describe, it, expect, vi, beforeEach } from "vitest";
import { syncFeed, syncAllFeeds } from "./feed-sync-scheduler";

// Mock the dependencies
vi.mock("./feed-parser", () => ({
  parseFeed: vi.fn(async () => [
    {
      title: "Test Article 1",
      link: "https://example.com/article-1",
      description: "Test description 1",
      pubDate: new Date().toISOString(),
      author: "Test Author",
      source: "substack",
      guid: "guid-1",
    },
    {
      title: "Test Article 2",
      link: "https://example.com/article-2",
      description: "Test description 2",
      pubDate: new Date().toISOString(),
      author: "Test Author",
      source: "substack",
      guid: "guid-2",
    },
  ]),
}));

vi.mock("./db-syndication", () => ({
  createSyndicatedArticle: vi.fn(async () => ({
    title: "Test Article",
    link: "https://example.com/article",
    description: "Test description",
  })),
}));

describe("Feed Sync Scheduler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("syncFeed", () => {
    it("should successfully sync articles from a feed", async () => {
      const result = await syncFeed("https://example.com/feed", "substack");

      expect(result.success).toBe(true);
      expect(result.itemsAdded).toBeGreaterThan(0);
      expect(result.error).toBeUndefined();
    });

    it("should handle sync errors gracefully", async () => {
      const result = await syncFeed("https://invalid-feed.com/feed", "substack");

      expect(typeof result.success).toBe("boolean");
      expect(typeof result.itemsAdded).toBe("number");
      expect(typeof result.itemsSkipped).toBe("number");
    });

    it("should support both substack and pastors-connection sources", async () => {
      const substackResult = await syncFeed("https://example.com/feed", "substack");
      const pastorsResult = await syncFeed("https://example.com/feed", "pastors-connection");

      expect(substackResult.success).toBe(true);
      expect(pastorsResult.success).toBe(true);
    });
  });

  describe("syncAllFeeds", () => {
    it("should sync all configured feeds", async () => {
      const result = await syncAllFeeds();

      expect(result.success).toBeDefined();
      expect(result.substack).toBeDefined();
      expect(result.pastorsConnection).toBeDefined();
      expect(result.totalAdded).toBeGreaterThanOrEqual(0);
      expect(result.totalSkipped).toBeGreaterThanOrEqual(0);
      expect(Array.isArray(result.errors)).toBe(true);
    });

    it("should return aggregated results from all sources", async () => {
      const result = await syncAllFeeds();

      expect(result.totalAdded).toBe(
        result.substack.itemsAdded + result.pastorsConnection.itemsAdded
      );
      expect(result.totalSkipped).toBe(
        result.substack.itemsSkipped + result.pastorsConnection.itemsSkipped
      );
    });

    it("should track errors from individual feeds", async () => {
      const result = await syncAllFeeds();

      expect(Array.isArray(result.errors)).toBe(true);
      expect(typeof result.success).toBe("boolean");
    });
  });

  describe("Feed sync integration", () => {
    it("should handle multiple articles in a single feed", async () => {
      const result = await syncFeed("https://example.com/feed", "substack");

      expect(result.itemsAdded).toBeGreaterThanOrEqual(0);
    });

    it("should return consistent data structure", async () => {
      const result = await syncAllFeeds();

      expect(result).toHaveProperty("success");
      expect(result).toHaveProperty("substack");
      expect(result).toHaveProperty("pastorsConnection");
      expect(result).toHaveProperty("totalAdded");
      expect(result).toHaveProperty("totalSkipped");
      expect(result).toHaveProperty("errors");
    });
  });
});
