/**
 * QuickExit — a way off the page at once, for a reader who may be watched.
 *
 * Shown on care pages about abuse and safety. It replaces this page in the
 * tab's history with a neutral site, so the back button does not return
 * here. It cannot erase browser history, and it says so (in its accessible
 * name and tooltip, and in the help block on the page), because a promise of
 * safety this button cannot keep would be worse than no button. Small on
 * purpose: a compact pill in the corner that covers as little as it can,
 * but never under the 44px every other control on the site keeps, since it
 * is the one control that has to work on the first try (the walk of
 * 2026-11-23, finding 10: it was 40px).
 */
export function QuickExit() {
  const leave = () => {
    window.location.replace("https://www.weather.gov/");
  };
  return (
    <button
      type="button"
      onClick={leave}
      aria-label="Exit site. Opens a weather site at once; it does not clear your browsing history."
      title="Opens a weather site. Clear your browsing history afterward."
      style={{
        position: "fixed",
        right: "10px",
        bottom: "10px",
        zIndex: 160,
        minHeight: "44px",
        padding: "8px 14px",
        borderRadius: "var(--radius-pill)",
        border: "2px solid var(--charcoal-fg)",
        background: "var(--charcoal)",
        color: "var(--charcoal-fg)",
        fontFamily: "var(--U)",
        fontSize: "14px",
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "var(--shadow-card)",
      }}
    >
      Exit site
    </button>
  );
}

export default QuickExit;
