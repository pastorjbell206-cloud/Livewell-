/**
 * jsdom setup for the client test project: testing-library matchers plus the
 * browser APIs jsdom does not implement but the app (themes, motion,
 * observers, downloads) touches on ordinary renders.
 */
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

if (typeof window !== "undefined") {
  if (!window.matchMedia) {
    window.matchMedia = (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList;
  }

  window.scrollTo = (() => undefined) as typeof window.scrollTo;
  Element.prototype.scrollIntoView = () => undefined;

  class ObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  if (!("IntersectionObserver" in window)) {
    Object.defineProperty(window, "IntersectionObserver", { value: ObserverStub, writable: true });
    Object.defineProperty(globalThis, "IntersectionObserver", { value: ObserverStub, writable: true });
  }
  if (!("ResizeObserver" in window)) {
    Object.defineProperty(window, "ResizeObserver", { value: ObserverStub, writable: true });
    Object.defineProperty(globalThis, "ResizeObserver", { value: ObserverStub, writable: true });
  }

  // jsdom has URL but not the object-URL registry.
  if (!URL.createObjectURL) {
    URL.createObjectURL = () => "blob:vitest-mock";
    URL.revokeObjectURL = () => undefined;
  }
}
