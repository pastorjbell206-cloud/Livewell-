/**
 * copyToClipboard — the one clipboard helper (roadmap HS-4, audit 15 H1).
 *
 * Modeled on QuoteLibrary's fallback chain, plus the check it was missing:
 * execCommand's boolean return. Never throws; resolves true only when a copy
 * actually happened, so call sites can show "Copied" truthfully and offer
 * "select and copy manually" when it failed (denied permission, no HTTPS,
 * ancient browser).
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to the textarea path
    }
  }
  if (typeof document === "undefined") return false;
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}
