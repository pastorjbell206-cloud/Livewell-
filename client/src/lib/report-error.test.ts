import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * report-error keeps module-level throttle/dedupe state, so each test imports a
 * fresh copy via resetModules to start from a clean counter.
 */
async function freshReporter() {
  vi.resetModules();
  const mod = await import("./report-error");
  return mod.reportClientError;
}

function lastBody(fetchMock: ReturnType<typeof vi.fn>) {
  const call = fetchMock.mock.calls[fetchMock.mock.calls.length - 1];
  return JSON.parse((call[1] as RequestInit).body as string);
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn(() => Promise.resolve({ ok: true }));
  vi.stubGlobal("fetch", fetchMock);
  window.history.pushState({}, "", "/"); // default to a public path
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("reportClientError", () => {
  it("beacons one POST to /api/track with event:error and the error fields", async () => {
    const report = await freshReporter();
    report({ message: "boom", stack: "at foo", kind: "window" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/track");
    expect((init as RequestInit).method).toBe("POST");
    expect((init as RequestInit).keepalive).toBe(true);
    const body = lastBody(fetchMock);
    expect(body).toMatchObject({ event: "error", message: "boom", stack: "at foo", kind: "window", path: "/" });
    expect(typeof body.visitorId).toBe("string");
  });

  it("dedupes an identical kind+message within one page load", async () => {
    const report = await freshReporter();
    report({ message: "same", kind: "window" });
    report({ message: "same", kind: "window" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("reports the same message under a different kind separately", async () => {
    const report = await freshReporter();
    report({ message: "same", kind: "window" });
    report({ message: "same", kind: "promise" });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("caps reports at 8 per page load even with distinct errors", async () => {
    const report = await freshReporter();
    for (let i = 0; i < 12; i++) report({ message: `err-${i}`, kind: "window" });
    expect(fetchMock).toHaveBeenCalledTimes(8);
  });

  it("never reports on an /admin route", async () => {
    const report = await freshReporter();
    window.history.pushState({}, "", "/admin/dashboard");
    report({ message: "admin boom", kind: "react" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("truncates a very long message to 500 characters", async () => {
    const report = await freshReporter();
    report({ message: "x".repeat(2000), kind: "window" });
    const body = lastBody(fetchMock);
    expect(body.message.length).toBe(500);
  });

  it("never throws when fetch rejects", async () => {
    const report = await freshReporter();
    fetchMock.mockImplementationOnce(() => Promise.reject(new Error("network")));
    expect(() => report({ message: "boom", kind: "window" })).not.toThrow();
  });
});
