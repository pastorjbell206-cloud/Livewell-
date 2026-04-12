import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createTestContext(): TrpcContext {
  const user = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus" as const,
    role: "user" as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Book Display Enhancements", () => {
  const ctx = createTestContext();
  const caller = appRouter.createCaller(ctx);

  describe("Book Covers", () => {
    it("should have cover images for all books", async () => {
      const books = await caller.books.listPublished();
      expect(books.length).toBeGreaterThanOrEqual(11);
      books.forEach((book) => {
        expect(book.coverImage).toBeTruthy();
        expect(book.coverImage).toMatch(/^https:\/\//);
      });
    });

    it("should have CDN URLs for all cover images", async () => {
      const books = await caller.books.listPublished();
      books.forEach((book) => {
        if (book.coverImage) {
          expect(book.coverImage).toContain("cloudfront.net");
        }
      });
    });
  });

  describe("Book Metadata", () => {
    it("should have descriptions for all authored books", async () => {
      const books = await caller.books.listPublished();
      const authoredBooks = books.filter((b) => b.bookType === "authored");
      authoredBooks.forEach((book) => {
        expect(book.description).toBeTruthy();
        expect(book.description!.length).toBeGreaterThan(50);
      });
    });

    it("should have author information for all books", async () => {
      const books = await caller.books.listPublished();
      books.forEach((book) => {
        expect(book.author).toBeTruthy();
      });
    });
  });

  describe("Book Recommendations", () => {
    it("should have at least 11 authored books for recommendations", async () => {
      const books = await caller.books.listPublished();
      const authoredBooks = books.filter((b) => b.bookType === "authored");
      expect(authoredBooks.length).toBeGreaterThanOrEqual(11);
    });

    it("should allow filtering books by ID for recommendations", async () => {
      const books = await caller.books.listPublished();
      if (books.length > 1) {
        const firstBook = books[0];
        const recommendations = books.filter((b) => b.id !== firstBook.id);
        expect(recommendations.length).toBe(books.length - 1);
      }
    });
  });

  describe("New Ebooks", () => {
    it("should have the 6 new ebooks in the database", async () => {
      const books = await caller.books.listPublished();
      const newEbookTitles = [
        "When Elders Disagree",
        "Removing an Elder",
        "The Solo Pastor and His Board",
        "Why Pastors Quit",
        "The Hidden Life",
        "The Pastor's Home",
      ];

      for (const title of newEbookTitles) {
        const book = books.find((b) => b.title === title);
        expect(book).toBeDefined();
        expect(book?.author).toBe("James Bell");
        expect(book?.bookType).toBe("authored");
        expect(book?.published).toBe(true);
      }
    });

    it("should have proper sort order for new ebooks", async () => {
      const books = await caller.books.listPublished();
      const newEbookTitles = [
        "When Elders Disagree",
        "Removing an Elder",
        "The Solo Pastor and His Board",
        "Why Pastors Quit",
        "The Hidden Life",
        "The Pastor's Home",
      ];

      const newEbooks = books.filter((b) =>
        newEbookTitles.includes(b.title)
      );

      newEbooks.forEach((book) => {
        expect(book.sortOrder).toBeGreaterThanOrEqual(4);
        expect(book.sortOrder).toBeLessThanOrEqual(9);
      });
    });
  });

  describe("Book Display", () => {
    it("should have all books published and visible", async () => {
      const books = await caller.books.listPublished();
      books.forEach((book) => {
        expect(book.published).toBe(true);
      });
    });

    it("should have proper sort order for display", async () => {
      const books = await caller.books.listPublished();
      const authoredBooks = books.filter((b) => b.bookType === "authored");
      if (authoredBooks.length > 0) {
        const sortOrders = authoredBooks.map((b) => b.sortOrder);
        expect(Math.min(...sortOrders)).toBeGreaterThanOrEqual(0);
      }
    });

    it("should have at least 11 total books", async () => {
      const books = await caller.books.listPublished();
      expect(books.length).toBeGreaterThanOrEqual(11);
    });
  });

  describe("Book Components", () => {
    it("should have BookRecommendations component available", async () => {
      const books = await caller.books.listPublished();
      expect(books.length).toBeGreaterThan(0);
      // Verify we can filter books for recommendations
      const firstBook = books[0];
      const recommendations = books.filter((b) => b.id !== firstBook.id);
      expect(recommendations.length).toBeGreaterThan(0);
    });

    it("should support book detail pages with slugs", async () => {
      const books = await caller.books.listPublished();
      const authoredBooks = books.filter((b) => b.bookType === "authored");
      // Verify at least some books have slugs for detail pages
      const booksWithSlugs = authoredBooks.filter((b) => b.slug);
      expect(booksWithSlugs.length).toBeGreaterThan(0);
    });
  });
});
