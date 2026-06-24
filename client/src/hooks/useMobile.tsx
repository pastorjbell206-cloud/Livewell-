import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Tracks whether the viewport is below the mobile breakpoint.
 *
 * Uses useSyncExternalStore — the React-recommended way to subscribe to an
 * external source (here, a media query). It reads the current width on every
 * render (no setState-in-effect, no flash of the wrong value) and stays in
 * sync without tearing. getServerSnapshot keeps SSR/prerender safe.
 */
function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useIsMobile(): boolean {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
