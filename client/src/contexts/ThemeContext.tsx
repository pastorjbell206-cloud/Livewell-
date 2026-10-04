import React, { createContext, useContext, useEffect, useState } from "react";
import { readStoredJSON, removeStoredJSON, writeStoredJSON } from "@/lib/storage";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
  /** True when no explicit choice is stored and the OS setting decides. */
  followsSystem: boolean;
  /** Forget the explicit choice and follow the OS setting again. */
  followSystemTheme?: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * The reader's explicit choice, if any. The inline script in client/index.html
 * reads the same key before first paint (so dark readers never see a cream
 * flash); keep the two in step.
 */
export const THEME_STORAGE_KEY = "livewell-theme";
/** Pre-2026 key: a raw string the old provider wrote for everyone. */
const LEGACY_KEY = "theme";

const isTheme = (x: unknown): x is Theme => x === "light" || x === "dark";

function readChoice(): Theme | null {
  const stored = readStoredJSON<Theme | null>(THEME_STORAGE_KEY, (x): x is Theme | null => isTheme(x), null);
  if (stored) return stored;
  // The old provider persisted "light" for every visitor, so only a stored
  // "dark" was ever a real choice. Carry that one forward, once.
  if (typeof window === "undefined") return null;
  try {
    if (window.localStorage.getItem(LEGACY_KEY) === "dark") {
      writeStoredJSON(THEME_STORAGE_KEY, "dark");
      removeStoredJSON(LEGACY_KEY);
      return "dark";
    }
    removeStoredJSON(LEGACY_KEY);
  } catch {
    /* storage unavailable: follow the system */
  }
  return null;
}

const DARK_QUERY = "(prefers-color-scheme: dark)";

function systemPrefersDark(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  try {
    return window.matchMedia(DARK_QUERY).matches;
  } catch {
    return false;
  }
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

/**
 * Theme: follows the OS (prefers-color-scheme) until the reader chooses; the
 * footer toggle is an override persisted through lib/storage. The admin area
 * stays light regardless, via `.admin-scope` in index.css.
 */
export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [choice, setChoice] = useState<Theme | null>(() => (switchable ? readChoice() : null));
  const [systemDark, setSystemDark] = useState<boolean>(() => (switchable ? systemPrefersDark() : false));

  useEffect(() => {
    if (!switchable || typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    let mql: MediaQueryList;
    try {
      mql = window.matchMedia(DARK_QUERY);
    } catch {
      return;
    }
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mql.addEventListener?.("change", onChange);
    return () => mql.removeEventListener?.("change", onChange);
  }, [switchable]);

  const theme: Theme = switchable ? (choice ?? (systemDark ? "dark" : "light")) : defaultTheme;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = switchable
    ? () => {
        const next: Theme = theme === "dark" ? "light" : "dark";
        setChoice(next);
        writeStoredJSON(THEME_STORAGE_KEY, next);
      }
    : undefined;

  const followSystemTheme = switchable
    ? () => {
        setChoice(null);
        removeStoredJSON(THEME_STORAGE_KEY);
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable, followsSystem: choice === null, followSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
