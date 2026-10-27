/**
 * useWakeLock (table mode, U17): asks for one screen lock while active, asks
 * again on the next tap when the browser refused the first ask, asks again
 * when the page comes back into view, and lets go on leaving. Silent where
 * the browser has no Wake Lock API.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWakeLock } from "./useWakeLock";

function stubWakeLock(answers: ("grant" | "refuse")[]) {
  const releases: ReturnType<typeof vi.fn>[] = [];
  const request = vi.fn(async () => {
    if ((answers.shift() ?? "grant") === "refuse") throw new DOMException("refused", "NotAllowedError");
    const release = vi.fn(async () => {});
    releases.push(release);
    return { release, addEventListener: vi.fn() };
  });
  Object.defineProperty(navigator, "wakeLock", { value: { request }, configurable: true });
  return { request, releases };
}

const flush = () => act(async () => {});

afterEach(() => {
  // @ts-expect-error: the stub is ours to remove
  delete navigator.wakeLock;
});

describe("useWakeLock", () => {
  it("holds one lock while active and lets go on leaving", async () => {
    const { request, releases } = stubWakeLock(["grant"]);
    const { unmount } = renderHook(() => useWakeLock(true));
    await flush();
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith("screen");
    document.dispatchEvent(new Event("pointerdown")); // a tap while held asks for nothing more
    await flush();
    expect(request).toHaveBeenCalledTimes(1);
    unmount();
    expect(releases[0]).toHaveBeenCalledTimes(1);
  });

  it("asks again on the next tap when the first ask was refused", async () => {
    const { request } = stubWakeLock(["refuse", "grant"]);
    renderHook(() => useWakeLock(true));
    await flush();
    expect(request).toHaveBeenCalledTimes(1);
    document.dispatchEvent(new Event("pointerdown"));
    await flush();
    expect(request).toHaveBeenCalledTimes(2);
  });

  it("asks again when the page comes back into view", async () => {
    const { request } = stubWakeLock(["grant", "grant"]);
    renderHook(() => useWakeLock(true));
    await flush();
    const visibility = vi.spyOn(document, "visibilityState", "get");
    visibility.mockReturnValue("hidden");
    document.dispatchEvent(new Event("visibilitychange"));
    visibility.mockReturnValue("visible");
    document.dispatchEvent(new Event("visibilitychange"));
    await flush();
    expect(request).toHaveBeenCalledTimes(2);
    visibility.mockRestore();
  });

  it("does nothing when inactive or where the browser has no Wake Lock", async () => {
    const { request } = stubWakeLock([]);
    renderHook(() => useWakeLock(false));
    await flush();
    expect(request).not.toHaveBeenCalled();
    // @ts-expect-error: the stub is ours to remove
    delete navigator.wakeLock;
    expect(() => renderHook(() => useWakeLock(true))).not.toThrow();
  });
});
