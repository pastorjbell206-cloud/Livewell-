import { describe, it, expect, vi, afterEach } from "vitest";
import { copyToClipboard } from "./clipboard";

function stubClipboard(writeText: (() => Promise<void>) | undefined) {
  Object.defineProperty(navigator, "clipboard", {
    value: writeText ? { writeText } : undefined,
    writable: true,
    configurable: true,
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  stubClipboard(undefined);
});

describe("copyToClipboard", () => {
  it("returns true when the async clipboard API works", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);
    await expect(copyToClipboard("hello")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("hello");
  });

  it("falls back to execCommand when the API is denied, honoring its boolean", async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    const exec = vi.fn().mockReturnValue(true);
    document.execCommand = exec as typeof document.execCommand;

    await expect(copyToClipboard("fallback text")).resolves.toBe(true);
    expect(exec).toHaveBeenCalledWith("copy");
    // The scratch textarea must not be left in the DOM.
    expect(document.querySelector("textarea")).toBeNull();
  });

  it("returns false — never a lie — when both paths fail", async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    document.execCommand = vi.fn().mockReturnValue(false) as typeof document.execCommand;
    await expect(copyToClipboard("x")).resolves.toBe(false);
  });

  it("uses the fallback when no async clipboard exists at all", async () => {
    stubClipboard(undefined);
    document.execCommand = vi.fn().mockReturnValue(true) as typeof document.execCommand;
    await expect(copyToClipboard("legacy")).resolves.toBe(true);
  });

  it("returns false when execCommand itself throws", async () => {
    stubClipboard(undefined);
    document.execCommand = vi.fn(() => {
      throw new Error("unsupported");
    }) as typeof document.execCommand;
    await expect(copyToClipboard("x")).resolves.toBe(false);
  });
});
