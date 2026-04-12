import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

// Mock the storage module
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({
    key: "user-1/files/test-file-abc123.png",
    url: "https://cdn.example.com/user-1/files/test-file-abc123.png",
  }),
}));

// Mock the db module
vi.mock("./db", () => ({
  createFileRecord: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    filename: "test-file.png",
    fileKey: "user-1/files/test-file-abc123.png",
    url: "https://cdn.example.com/user-1/files/test-file-abc123.png",
    mimeType: "image/png",
    size: 1024,
    description: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  listUserFiles: vi.fn().mockResolvedValue([
    {
      id: 1,
      userId: 1,
      filename: "test-file.png",
      fileKey: "user-1/files/test-file-abc123.png",
      url: "https://cdn.example.com/user-1/files/test-file-abc123.png",
      mimeType: "image/png",
      size: 1024,
      description: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      userId: 1,
      filename: "document.pdf",
      fileKey: "user-1/files/document-def456.pdf",
      url: "https://cdn.example.com/user-1/files/document-def456.pdf",
      mimeType: "application/pdf",
      size: 2048,
      description: "My document",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  getFileById: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    filename: "test-file.png",
    fileKey: "user-1/files/test-file-abc123.png",
    url: "https://cdn.example.com/user-1/files/test-file-abc123.png",
    mimeType: "image/png",
    size: 1024,
    description: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  deleteFileRecord: vi.fn().mockResolvedValue(undefined),
  updateFileDescription: vi.fn().mockResolvedValue({
    id: 1,
    userId: 1,
    filename: "test-file.png",
    fileKey: "user-1/files/test-file-abc123.png",
    url: "https://cdn.example.com/user-1/files/test-file-abc123.png",
    mimeType: "image/png",
    size: 1024,
    description: "Updated description",
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  // Keep the original user functions
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  getDb: vi.fn(),
}));

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
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
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createUnauthContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("files router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("files.list", () => {
    it("returns a list of files for authenticated user", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.list();

      expect(result).toHaveLength(2);
      expect(result[0].filename).toBe("test-file.png");
      expect(result[1].filename).toBe("document.pdf");
    });

    it("rejects unauthenticated users", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.list()).rejects.toThrow();
    });
  });

  describe("files.get", () => {
    it("returns a single file by ID", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.get({ id: 1 });

      expect(result.id).toBe(1);
      expect(result.filename).toBe("test-file.png");
    });

    it("rejects unauthenticated users", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.get({ id: 1 })).rejects.toThrow();
    });
  });

  describe("files.upload", () => {
    it("uploads a file and returns the record", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // base64 of "hello"
      const base64Data = Buffer.from("hello").toString("base64");

      const result = await caller.files.upload({
        filename: "test-file.png",
        mimeType: "image/png",
        base64Data,
      });

      expect(result).toBeDefined();
      expect(result.filename).toBe("test-file.png");
      expect(result.url).toContain("cdn.example.com");
    });

    it("rejects files over 16MB", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // Create a base64 string that decodes to >16MB
      const largeBuffer = Buffer.alloc(17 * 1024 * 1024, "a");
      const base64Data = largeBuffer.toString("base64");

      await expect(
        caller.files.upload({
          filename: "large-file.bin",
          mimeType: "application/octet-stream",
          base64Data,
        })
      ).rejects.toThrow("File size exceeds 16MB limit");
    });

    it("rejects unauthenticated users", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.files.upload({
          filename: "test.png",
          mimeType: "image/png",
          base64Data: "aGVsbG8=",
        })
      ).rejects.toThrow();
    });
  });

  describe("files.delete", () => {
    it("deletes a file and returns success", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.delete({ id: 1 });

      expect(result).toEqual({ success: true });
    });

    it("rejects unauthenticated users", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.delete({ id: 1 })).rejects.toThrow();
    });
  });

  describe("files.updateDescription", () => {
    it("updates a file description", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.updateDescription({
        id: 1,
        description: "Updated description",
      });

      expect(result).toBeDefined();
      expect(result!.description).toBe("Updated description");
    });

    it("rejects unauthenticated users", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.files.updateDescription({ id: 1, description: "test" })
      ).rejects.toThrow();
    });
  });
});
