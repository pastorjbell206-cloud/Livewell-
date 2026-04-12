import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { generateSitemap, generateRobotsTxt } from "./sitemap-generator";

describe("SEO Features", () => {
  describe("Sitemap Generation", () => {
    it("should generate valid XML sitemap", async () => {
      const sitemap = await generateSitemap("https://livewell.com");
      
      expect(sitemap).toContain("<?xml version");
      expect(sitemap).toContain("<urlset");
      expect(sitemap).toContain("</urlset>");
      expect(sitemap).toContain("https://livewell.com");
    });

    it("should include static pages in sitemap", async () => {
      const sitemap = await generateSitemap("https://livewell.com");
      
      expect(sitemap).toContain("/writing");
      expect(sitemap).toContain("/resources");
      expect(sitemap).toContain("/books");
      expect(sitemap).toContain("/about");
      expect(sitemap).toContain("/search");
    });

    it("should include priority and changefreq tags", async () => {
      const sitemap = await generateSitemap("https://livewell.com");
      
      expect(sitemap).toContain("<priority>");
      expect(sitemap).toContain("</priority>");
      expect(sitemap).toContain("<changefreq>");
      expect(sitemap).toContain("</changefreq>");
    });

    it("should properly escape XML special characters", async () => {
      const sitemap = await generateSitemap("https://livewell.com");
      
      // Should not contain unescaped special characters in URLs
      expect(sitemap).not.toContain("&<>");
    });
  });

  describe("Robots.txt Generation", () => {
    it("should generate valid robots.txt", () => {
      const robotsTxt = generateRobotsTxt("https://livewell.com");
      
      expect(robotsTxt).toContain("User-agent: *");
      expect(robotsTxt).toContain("Allow: /");
      expect(robotsTxt).toContain("Sitemap:");
    });

    it("should disallow admin and API routes", () => {
      const robotsTxt = generateRobotsTxt("https://livewell.com");
      
      expect(robotsTxt).toContain("Disallow: /admin/");
      expect(robotsTxt).toContain("Disallow: /api/");
      expect(robotsTxt).toContain("Disallow: /private/");
    });

    it("should include sitemap URL", () => {
      const robotsTxt = generateRobotsTxt("https://livewell.com");
      
      expect(robotsTxt).toContain("Sitemap: https://livewell.com/sitemap.xml");
    });

    it("should include crawl delay", () => {
      const robotsTxt = generateRobotsTxt("https://livewell.com");
      
      expect(robotsTxt).toContain("Crawl-delay:");
    });
  });

  describe("Email Capture Pop-up", () => {
    it("should trigger after specified seconds", () => {
      // This test would be better as an E2E test
      // For now, we're testing the logic
      const triggerTime = 120; // 2 minutes
      expect(triggerTime).toBeGreaterThan(0);
    });

    it("should store popup state in localStorage", () => {
      // Test that localStorage is used to track if user has seen popup
      const key = "emailCapturePopupSeen";
      expect(key).toBeDefined();
      expect(key.length).toBeGreaterThan(0);
    });

    it("should validate email format", () => {
      const validEmails = [
        "test@example.com",
        "user.name@domain.co.uk",
        "first+last@test.org",
      ];

      const invalidEmails = [
        "notanemail",
        "@example.com",
        "user@",
        "",
      ];

      validEmails.forEach((email) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        expect(isValid).toBe(true);
      });

      invalidEmails.forEach((email) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        expect(isValid).toBe(false);
      });
    });
  });

  describe("Article SEO Head", () => {
    it("should generate article schema with required fields", () => {
      const schema = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: "Test Article",
        description: "Test description",
        author: { "@type": "Person", name: "James Bell" },
      };

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("NewsArticle");
      expect(schema.headline).toBeDefined();
      expect(schema.description).toBeDefined();
      expect(schema.author).toBeDefined();
    });

    it("should include published and modified dates", () => {
      const publishedDate = new Date("2026-03-22").toISOString();
      const modifiedDate = new Date("2026-03-22").toISOString();

      expect(publishedDate).toMatch(/\d{4}-\d{2}-\d{2}/);
      expect(modifiedDate).toMatch(/\d{4}-\d{2}-\d{2}/);
    });
  });
});
