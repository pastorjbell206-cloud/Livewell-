/**
 * Find on Home (master plan 3.2, U15 and U18): one field. A reference
 * ("John 3:16", "jn 3 16", "Romans 8") goes straight to the passage in the
 * Study Bible; anything else, a bare book name included, goes to /search,
 * which answers it across the site. The search module and the reference
 * parser load the first time the field is focused (lib/siteSearch), never
 * with Home itself, so first paint carries none of it.
 */
import { useState, type FormEvent } from "react";
import { Link, useLocation } from "wouter";

import type { PassageMatch } from "@/lib/siteSearch";

const loadFind = () => import("@/lib/siteSearch");

export default function HomeFind() {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState("");
  // Reads a typed reference once the parser has loaded; null until then.
  const [readPassage, setReadPassage] = useState<((q: string) => PassageMatch | null) | null>(null);

  const prepare = () => {
    if (readPassage) return;
    loadFind()
      .then((find) => find.loadPassageParser().then((parser) => setReadPassage(() => (q: string) => find.passageFor(q, parser))))
      .catch(() => {});
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    const fallback = `/search?q=${encodeURIComponent(q)}`;
    navigate(await loadFind().then((find) => find.findHref(q), () => fallback));
  };

  const typed = readPassage && query.trim() ? readPassage(query) : null;

  return (
    <form role="search" aria-labelledby="home-find-label" className="home-find" onSubmit={submit}>
      <label id="home-find-label" htmlFor="home-find-input" className="home-find__label">
        Look up a passage or ask a question
      </label>
      <div className="home-find__row">
        <input
          id="home-find-input"
          className="home-find__input"
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          spellCheck={false}
          placeholder="John 3:16, or your question"
          value={query}
          onFocus={prepare}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="pg-action home-find__go">
          Find
        </button>
      </div>
      {typed && (
        <Link href={typed.href} className="home-find__passage">
          Open {typed.label} in the Study Bible
        </Link>
      )}
    </form>
  );
}
