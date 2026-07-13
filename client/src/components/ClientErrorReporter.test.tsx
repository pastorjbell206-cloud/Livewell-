import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import ClientErrorReporter from "./ClientErrorReporter";

/**
 * Integration test for the global-handler wiring. report-error's own logic
 * (throttle/dedupe/cap) is unit-tested separately; here we prove the component
 * actually attaches window "error" / unhandledrejection handlers that beacon,
 * and detaches them on unmount.
 */
let fetchMock: ReturnType<typeof vi.fn>;

function bodies() {
  return fetchMock.mock.calls.map((c) => JSON.parse((c[1] as RequestInit).body as string));
}

// Dispatch a window "error" event with a preventDefault guard so the test
// runner does not treat the synthetic error as an uncaught failure.
function dispatchWindowError(message: string) {
  const guard = (e: Event) => e.preventDefault();
  window.addEventListener("error", guard);
  try {
    window.dispatchEvent(new ErrorEvent("error", { message, error: new Error(message) }));
  } finally {
    window.removeEventListener("error", guard);
  }
}

beforeEach(() => {
  fetchMock = vi.fn(() => Promise.resolve({ ok: true }));
  vi.stubGlobal("fetch", fetchMock);
  window.history.pushState({}, "", "/"); // public path so reports are sent
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("ClientErrorReporter", () => {
  it("reports an uncaught window error as kind:window", () => {
    render(<ClientErrorReporter />);
    dispatchWindowError("wired-window-boom");
    const b = bodies().find((x) => x.message?.includes("wired-window-boom"));
    expect(b).toBeTruthy();
    expect(b.event).toBe("error");
    expect(b.kind).toBe("window");
  });

  it("reports an unhandled promise rejection as kind:promise", () => {
    render(<ClientErrorReporter />);
    const e = new Event("unhandledrejection");
    (e as any).reason = new Error("wired-promise-boom");
    window.dispatchEvent(e);
    const b = bodies().find((x) => x.message?.includes("wired-promise-boom"));
    expect(b).toBeTruthy();
    expect(b.kind).toBe("promise");
  });

  it("detaches its handlers on unmount", () => {
    const { unmount } = render(<ClientErrorReporter />);
    unmount();
    fetchMock.mockClear();
    dispatchWindowError("after-unmount");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
