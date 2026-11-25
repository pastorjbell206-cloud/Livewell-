/**
 * Putting LiveWell on a phone's home screen.
 *
 * Chrome, Edge, and Android browsers offer to install a site once, early in
 * the page's life (the beforeinstallprompt event). That can fire before any
 * page that shows an "Add to home screen" button has loaded, so main.tsx
 * calls captureInstallPrompt() at startup and the button asks for it later.
 * Safari on iPhone and iPad has no such event; there the reader adds the site
 * from the Share menu, and installHow() says so.
 */
import { useSyncExternalStore } from "react";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferred: InstallPromptEvent | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

export function captureInstallPrompt(): void {
  if (typeof window === "undefined") return;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as InstallPromptEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    notify();
  });
}

/** Show the browser's own install dialog. Resolves true when the reader accepted. */
export async function promptInstall(): Promise<boolean> {
  const e = deferred;
  if (!e) return false;
  deferred = null;
  notify();
  try {
    await e.prompt();
    return (await e.userChoice).outcome === "accepted";
  } catch {
    return false;
  }
}

/** True when the page is already running from the home screen. */
export function isInstalled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(display-mode: standalone)").matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
  } catch {
    return false;
  }
}

export type InstallHow = "installed" | "prompt" | "ios" | "menu";

/** How this reader can add the site: already done, the browser's dialog, the iOS Share menu, or the browser menu. */
export function installHow(hasPrompt: boolean): InstallHow {
  if (isInstalled()) return "installed";
  if (hasPrompt) return "prompt";
  if (typeof navigator !== "undefined") {
    const ua = navigator.userAgent || "";
    const iPadOS = navigator.platform === "MacIntel" && (navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints! > 1;
    if (/iPhone|iPad|iPod/.test(ua) || iPadOS) return "ios";
  }
  return "menu";
}

function subscribe(l: () => void): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** Whether the browser's install dialog is available right now. */
export function useInstallPrompt(): boolean {
  return useSyncExternalStore(subscribe, () => deferred !== null, () => false);
}

function subscribeStandalone(l: () => void): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => {};
  const mq = window.matchMedia("(display-mode: standalone)");
  mq.addEventListener?.("change", l);
  return () => mq.removeEventListener?.("change", l);
}

/**
 * True while LiveWell runs opened from its icon (no browser bar). The app
 * bar (components/AppBar.tsx) and the header's Back button show only then.
 */
export function useStandalone(): boolean {
  return useSyncExternalStore(subscribeStandalone, isInstalled, () => false);
}

export type Device = "iphone" | "android" | "mac" | "windows";

/** The reader's device, best guess from the browser: it picks which steps /app shows first. */
export function guessDevice(): Device {
  if (typeof navigator === "undefined") return "iphone";
  const ua = navigator.userAgent || "";
  const touch = ((navigator as Navigator & { maxTouchPoints?: number }).maxTouchPoints ?? 0) > 1;
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && touch)) return "iphone";
  if (/Android/.test(ua)) return "android";
  if (/Macintosh|Mac OS X/.test(ua)) return "mac";
  if (/Windows|CrOS|Linux/.test(ua)) return "windows";
  return "iphone";
}
