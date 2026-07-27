import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import MinimalNav from "./MinimalNav";
import Footer from "./Footer";
import PersistentHelpTab from "@/components/PersistentHelpTab";

// The palette (and the cmdk dependency it drags in) loads on the first ⌘K /
// Ctrl+K, not on every page. Until then this listener is the only cost.
const CommandPalette = lazy(() => import("./CommandPalette"));

export default function Layout({ children }: { children: ReactNode }) {
  const [paletteReady, setPaletteReady] = useState(false);
  useEffect(() => {
    if (paletteReady) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteReady(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [paletteReady]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <MinimalNav />
      <main id="main" style={{ flex: 1 }}>
        {children}
      </main>
      <PersistentHelpTab />
      <Footer />
      {paletteReady && (
        <Suspense fallback={null}>
          <CommandPalette defaultOpen />
        </Suspense>
      )}
    </div>
  );
}
