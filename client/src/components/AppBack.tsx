/**
 * AppBack: a Back button at the left of the header, shown only when LiveWell
 * is opened from its icon (no browser bar, so no browser Back). It goes back
 * one page when there is one in this window, and to Home when there is not
 * (a page opened straight from a shortcut). Hidden on Home itself.
 */
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useStandalone } from "@/lib/install";

export default function AppBack() {
  const standalone = useStandalone();
  const [location, navigate] = useLocation();
  if (!standalone || location === "/") return null;
  return (
    <button
      type="button"
      className="sn-back"
      onClick={() => {
        if (window.history.length > 1) window.history.back();
        else navigate("/");
      }}
    >
      <ChevronLeft size={22} strokeWidth={1.75} aria-hidden="true" />
      Back
    </button>
  );
}
