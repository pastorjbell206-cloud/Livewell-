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

  keepComputedStyles();
}

/**
 * One root cause of the tests that ran past 5 s on a busy machine.
 *
 * testing-library's *ByRole queries compute the accessible name of every
 * element with the role, and check that each is not hidden, and that calls
 * getComputedStyle on each element and on every child it reads. jsdom answers
 * getComputedStyle by running the cascade each time (its default stylesheet's
 * selectors against the element, then every inline property parsed again),
 * and forgets every answer on any change to the document. So a role query
 * after a click recomputed the style of most of the page. On the family
 * catechism page (850 elements, 95 buttons) one button query after a click
 * took 323 ms, and 34 ms with the answers kept; the same query again with no
 * change between, 89 ms and 15 ms.
 *
 * A style can only change when the element, one of its ancestors or its
 * parent's children change, or when a stylesheet does (jsdom's default sheet
 * matches on tag names, attributes and child order only; it has no sibling
 * combinators and no state but :focus-visible's outline). So each answer is
 * kept until a change touches that part of the tree, or any stylesheet comes,
 * goes or changes (pages here render <style> blocks of their own). The kept
 * answer is jsdom's own: nothing a style says is different.
 */
function keepComputedStyles() {
  const real = window.getComputedStyle.bind(window);
  let kept = new WeakMap<Element, CSSStyleDeclaration>();
  const drop = (node: Node) => {
    if (!(node instanceof Element)) return;
    kept.delete(node);
    for (const el of Array.from(node.querySelectorAll("*"))) kept.delete(el);
  };
  const SHEET = 'style, link[rel~="stylesheet" i]';
  const isSheet = (node: Node | null) => node instanceof Element && node.matches(SHEET);
  const holdsSheet = (node: Node) => node instanceof Element && (node.matches(SHEET) || node.querySelector(SHEET) !== null);
  const forget = (records: MutationRecord[]) => {
    for (const r of records) {
      // A stylesheet added, removed or edited, alone or inside a subtree, can change any element.
      if (isSheet(r.target) || isSheet(r.target.parentNode) || [...Array.from(r.addedNodes), ...Array.from(r.removedNodes)].some(holdsSheet)) {
        kept = new WeakMap();
        return;
      }
      if (r.type === "characterData") continue;
      // An attribute: the element and everything that inherits from it. A child
      // added, moved or removed: the parent's whole subtree (child order), and
      // the moved nodes themselves.
      drop(r.target);
      r.addedNodes.forEach(drop);
      r.removedNodes.forEach(drop);
    }
  };
  const changes = new MutationObserver(forget);
  changes.observe(document, { subtree: true, childList: true, attributes: true, characterData: true });
  const keptStyle = (el: Element, pseudo?: string | null): CSSStyleDeclaration => {
    // Pseudo-elements, other documents and shadow trees go straight to jsdom.
    if (pseudo || el.getRootNode() !== document) return real(el, pseudo);
    // A change made since the observer last ran is still in its queue.
    forget(changes.takeRecords());
    let style = kept.get(el);
    if (!style) kept.set(el, (style = real(el)));
    return style;
  };
  window.getComputedStyle = keptStyle as typeof window.getComputedStyle;
  // testing-library reads it through element.ownerDocument.defaultView.
  if (document.defaultView && document.defaultView !== window) {
    document.defaultView.getComputedStyle = keptStyle as typeof window.getComputedStyle;
  }
  // A media rule could read the window's size.
  window.addEventListener("resize", () => {
    kept = new WeakMap();
  });
}
