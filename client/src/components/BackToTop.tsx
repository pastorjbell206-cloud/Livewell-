/**
 * Back to top (James, 2026-11-27: "back-to-top and 'you are here'"): a round
 * button in the bottom right corner that appears once a reader is well down a
 * long page, and returns them to its top. It sits above the phone's app bar
 * (--lw-appbar-h) and away from the track bar, which keeps the bottom left.
 */
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";
import "./back-to-top.css";

/** How far down, in pixels, before the button shows. */
const SHOW_AFTER = 1400;

export default function BackToTop() {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!shown) return null;
  return (
    <button
      type="button"
      className="lw-totop"
      aria-label="Back to top"
      title="Back to top"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
    >
      <ArrowUp size={20} strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
