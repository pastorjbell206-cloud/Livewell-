/**
 * "Go to" on the Study Bible's front door and in the reader (master plan 7.1,
 * U15). A reference ("John 3:16", "jn 3 16", "Romans 8", "Ps 23:1-3") opens
 * at its verse or chapter, and a book named on its own ("Romans", "1 John")
 * opens the book. Anything else says so plainly and offers the site search.
 *
 * The reference parser already travels with the Study Bible (lib/bible-notes
 * reads catalogue lines through it), so it is imported here, not fetched.
 */
import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";

import * as scriptureRef from "@/lib/scripture-ref";
import { passageFor } from "@/lib/siteSearch";
import { quietLink } from "@/pages/study-bible/shared";

export function GoToPassage({ here, onVerse }: {
  /** The chapter on screen ("/study/bible/john/3"), so a verse in it is shown in place. */
  here?: string;
  /** Shows a verse of the chapter on screen; returns false when the chapter has no such verse. */
  onVerse?: (verse: number) => boolean;
}) {
  const [, navigate] = useLocation();
  const [value, setValue] = useState("");
  const [missed, setMissed] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    const match = passageFor(q, scriptureRef);
    if (!match) {
      setMissed(q);
      return;
    }
    setMissed(null);
    const [path, hash] = match.href.split("#");
    const verse = hash?.startsWith("v") ? Number(hash.slice(1)) : NaN;
    // The same chapter: the address does not change, so the reader is told directly.
    if (path === here && onVerse && Number.isFinite(verse) && onVerse(verse)) {
      window.history.replaceState(window.history.state, "", match.href);
      return;
    }
    navigate(match.href);
  };

  return (
    <form role="search" aria-label="Go to a passage" onSubmit={submit} style={{ display: "grid", gap: "8px", maxWidth: "420px", width: "100%" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <label htmlFor="study-bible-goto" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)" }}>
          Go to a passage
        </label>
        <input
          id="study-bible-goto"
          type="text"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="Go to: John 3:16, Romans 8"
          value={value}
          onChange={(e) => { setValue(e.target.value); setMissed(null); }}
          style={{ flex: "1 1 auto", minWidth: 0, minHeight: "44px", padding: "0 14px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", color: "var(--ink)", fontFamily: "var(--U)", fontSize: "15px" }}
        />
        <button type="submit" style={{ flex: "0 0 auto", minHeight: "44px", padding: "0 18px", border: "none", borderRadius: "999px", background: "var(--ink)", color: "var(--bone)", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
          Go
        </button>
      </div>
      <p role="status" style={{ margin: 0, fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.5, color: "var(--ink-muted)" }}>
        {missed && (
          <>
            “{missed}” isn’t a passage this can open. Try John 3:16, Romans 8, or Psalm 23, or{" "}
            <Link href={`/search?q=${encodeURIComponent(missed)}`} style={quietLink}>search the site for it</Link>.
          </>
        )}
      </p>
    </form>
  );
}
