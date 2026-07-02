/**
 * Route render-smoke net (roadmap HS-3): every path in App.tsx's route table
 * renders inside the real provider stack with the network stubbed offline.
 * A route passes when it produces visible content and does not trip the
 * ErrorBoundary. Data-backed pages pass by rendering their loading/empty/
 * not-found states — which QW-27 made real states, not blank screens.
 *
 * This is the safety net that makes consolidation work (LT-1/LT-2) safe:
 * a page that throws on render, or renders nothing at all, fails here by
 * name before it ever ships.
 */
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { render, waitFor } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { TestProviders, offlineFetch } from "@/test/harness";
import App from "@/App";

// The ErrorBoundary's headline — if this appears, a component threw.
const BOUNDARY_TEXT = "Something broke on our side";

/** Sample values for path params: real static-data slugs where one exists,
 * so a few routes exercise their happy path; anything unknown renders its
 * honest not-found state, which also passes. */
const PARAM_SAMPLES: Record<string, string> = {
  slug: "sample-essay",
  id: "1",
  n: "1",
  magnetId: "sample",
  category: "marriage",
  topic: "prayer",
  era: "reformation",
  domain: "marriage",
};

function routesFromAppSource(): string[] {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const src = fs.readFileSync(path.resolve(here, "../App.tsx"), "utf8");
  const seen = new Set<string>();
  const out: string[] = [];
  const re = /path="([^"]+)"/g;
  let m = re.exec(src);
  while (m) {
    if (!seen.has(m[1])) {
      seen.add(m[1]);
      out.push(m[1]);
    }
    m = re.exec(src);
  }
  return out;
}

function fillParams(route: string): string {
  return route
    .split("/")
    .map((seg) => {
      if (!seg.startsWith(":")) return seg;
      const name = seg.replace(/^:/, "").replace(/[?*]$/, "");
      return PARAM_SAMPLES[name] ?? "sample";
    })
    .join("/");
}

beforeAll(() => {
  vi.stubGlobal("fetch", vi.fn(offlineFetch()));
});

afterAll(() => {
  vi.unstubAllGlobals();
  window.history.pushState({}, "", "/");
});

describe("route smoke", () => {
  const routes = routesFromAppSource();

  it("found the route table", () => {
    expect(routes.length).toBeGreaterThan(200);
  });

  it(
    "every route renders visible content without tripping the ErrorBoundary",
    { timeout: 600_000 },
    async () => {
      const failures: { route: string; reason: string }[] = [];

      for (const route of routes) {
        const target = fillParams(route);
        window.history.pushState({}, "", target);
        let view: ReturnType<typeof render> | undefined;
        try {
          view = render(
            <TestProviders>
              <App />
            </TestProviders>
          );
          await waitFor(
            () => {
              const text = document.body.textContent ?? "";
              if (text.includes(BOUNDARY_TEXT)) throw new Error("ErrorBoundary tripped");
              // "One moment." is PageFallback's marker: the route only passes
              // once its actual page has mounted past the Suspense fallback —
              // otherwise every lazy route would "pass" on the fallback text.
              if (text.includes("One moment.")) throw new Error("stuck on the route fallback");
              if (text.trim().length < 20) throw new Error("no visible content");
            },
            { timeout: 5_000 }
          );
        } catch (e) {
          failures.push({ route, reason: e instanceof Error ? e.message : String(e) });
        } finally {
          view?.unmount();
        }
      }

      expect(failures, `routes failing smoke:\n${JSON.stringify(failures, null, 2)}`).toEqual([]);
    }
  );
});
