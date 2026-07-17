/**
 * /library — the commonplace book.
 *
 * Bell-curated quotes from the intellectual anchors CLAUDE.md names: Keller,
 * Brueggemann, Peterson, Bonhoeffer, Newbigin, Bellah, Taylor, Haidt, +
 * scattered others. No Christian peer runs a serious quote archive.
 * Stratechery's "Library" translated for theology.
 *
 * For v1 the quotes are file-backed (this file). For v2 they get a quotes
 * table and admin UX. Each quote has an id so future permalinks like
 * /library/q/42 don't break.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { NewsletterSignup } from "@/components/NewsletterSignup";

interface Quote {
  id: number;
  text: string;
  author: string;
  source?: string;
  tags: string[];
  /**
   * How faithful the wording is to the source. Omitted means a verbatim
   * quotation. "paraphrase" is our wording of the author's idea; "adapted"
   * is a phrase the author themselves borrowed and reshaped. The archive
   * labels these so an idea we restated is never mistaken for the author's
   * exact words — the one line a commonplace book cannot blur.
   */
  kind?: "paraphrase" | "adapted";
  /** Optional Bell commentary that appears below the quote. */
  note?: string;
}

const KIND_LABEL: Record<NonNullable<Quote["kind"]>, string> = {
  paraphrase: "Paraphrase",
  adapted: "Adapted",
};

// Seed quotes. Bell edits / expands these in code for v1.
const QUOTES: Quote[] = [
  {
    id: 1,
    text: "The Christian gospel is not an answer; it is a question that judges every answer.",
    author: "Lesslie Newbigin",
    source: "The Gospel in a Pluralist Society",
    tags: ["mission", "skeptic"],
  },
  {
    id: 2,
    text: "The world is not concluded; it remains open. The future remains undecided.",
    author: "Walter Brueggemann",
    source: "The Prophetic Imagination",
    tags: ["justice", "hope", "after-christendom"],
  },
  {
    id: 3,
    text: "Cheap grace is the deadly enemy of our church. We are fighting today for costly grace.",
    author: "Dietrich Bonhoeffer",
    source: "The Cost of Discipleship",
    tags: ["pastoring", "after-christendom"],
  },
  {
    id: 4,
    text: "A long obedience in the same direction.",
    author: "Eugene Peterson",
    source: "borrowing Nietzsche",
    kind: "adapted",
    tags: ["pastoring", "formation"],
    note:
      "Peterson borrowed this from Nietzsche on purpose. The shape of faithful pastoring lives in the borrowed clause, not in the original target.",
  },
  {
    id: 5,
    text: "If the resurrection didn't happen, who cares? If it did, nothing else matters.",
    author: "Tim Keller",
    source: "preaching at Redeemer",
    tags: ["skeptic", "theology"],
  },
  {
    id: 6,
    text: "We are made by what we love.",
    author: "James K. A. Smith",
    source: "You Are What You Love",
    tags: ["formation", "everyday"],
  },
  {
    id: 7,
    text: "A secular age is not an age without religion; it is an age where belief is contested, optional, and increasingly improbable.",
    author: "Charles Taylor",
    source: "A Secular Age",
    kind: "paraphrase",
    tags: ["after-christendom", "skeptic"],
  },
  {
    id: 8,
    text: "We don't reason our way into our convictions; we reason our way out of them.",
    author: "Jonathan Haidt",
    source: "The Righteous Mind",
    tags: ["politics", "skeptic"],
  },
  {
    id: 9,
    text: "Habits of the heart are the language of the tribe.",
    author: "Robert Bellah",
    source: "Habits of the Heart",
    tags: ["politics", "american-church"],
  },
  {
    id: 10,
    text: "Justice is what love looks like in public.",
    author: "Cornel West",
    tags: ["justice", "prophetic-justice"],
  },
];

const ALL_TAGS = Array.from(new Set(QUOTES.flatMap(q => q.tags))).sort();

export default function Library() {
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let q = QUOTES;
    if (filter) q = q.filter(x => x.tags.includes(filter));
    if (search.trim()) {
      const term = search.toLowerCase();
      q = q.filter(
        x =>
          x.text.toLowerCase().includes(term) ||
          x.author.toLowerCase().includes(term) ||
          (x.source ?? "").toLowerCase().includes(term)
      );
    }
    return q;
  }, [filter, search]);

  return (
    <Layout>
      <SEOMeta
        title="The Library — A commonplace book"
        description="A working commonplace book — quotes from Keller, Brueggemann, Peterson, Bonhoeffer, Newbigin, Bellah, Taylor, Haidt and others, curated by James Bell."
        url="https://www.livewellbyjamesbell.co/library"
      />

      {/* HERO */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-7) var(--s-4) var(--s-6)",
          color: "var(--charcoal-fg)",
        }}
      >
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "20px", color: "var(--mustard)" }}>
            The Library
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(40px, 6vw, 60px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              marginBottom: "20px",
              maxWidth: "22ch",
            }}
          >
            A commonplace book.
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "18px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.75)",
              maxWidth: "62ch",
            }}
          >
            The quotes I write down. From Keller, Brueggemann, Peterson,
            Bonhoeffer, Newbigin, Taylor, Bellah, Haidt — the writers I keep
            returning to. Permalinked, taggable, copy-friendly. Use them in
            sermons. Use them in arguments. Use them in your own commonplace.
          </p>
        </div>
      </section>

      {/* CONTROLS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) 0" }}>
        <div
          style={{
            maxWidth: "var(--w-content)",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              padding: "8px 12px",
              flex: "1 1 240px",
            }}
          >
            <Search size={14} aria-hidden style={{ color: "var(--ink-muted)" }} />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Find a quote, author, or source…"
              aria-label="Search library"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontFamily: "var(--B)",
                fontSize: "14px",
                color: "var(--ink)",
              }}
            />
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setFilter(null)}
              aria-pressed={filter === null}
              style={{
                fontFamily: "var(--U)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
                padding: "6px 12px",
                borderRadius: "999px",
                border: `1px solid ${filter === null ? "var(--mustard)" : "var(--border)"}`,
                background: filter === null ? "var(--bone-warm)" : "transparent",
                color: "var(--ink)",
                cursor: "pointer",
              }}
            >
              All
            </button>
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => setFilter(tag)}
                aria-pressed={filter === tag}
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: "999px",
                  border: `1px solid ${filter === tag ? "var(--mustard)" : "var(--border)"}`,
                  background: filter === tag ? "var(--bone-warm)" : "transparent",
                  color: "var(--ink)",
                  cursor: "pointer",
                }}
              >
                {tag.replace(/-/g, " ")}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTES */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          {filtered.length === 0 && (
            <p
              style={{
                fontFamily: "var(--B)",
                color: "var(--ink-muted)",
                textAlign: "center",
                padding: "var(--s-5) 0",
              }}
            >
              No quotes match. Try a different tag or search.
            </p>
          )}
          {filtered.map(q => (
            <article
              key={q.id}
              id={`q${q.id}`}
              style={{
                padding: "var(--s-4) 0",
                borderTop: "1px solid var(--border)",
              }}
            >
              <blockquote
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "22px",
                  fontStyle: "italic",
                  fontWeight: 400,
                  lineHeight: 1.45,
                  color: "var(--ink)",
                  borderLeft: "2px solid var(--mustard)",
                  paddingLeft: "20px",
                  margin: "0 0 14px",
                  letterSpacing: "-0.005em",
                }}
              >
                {q.text}
              </blockquote>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  fontFamily: "var(--U)",
                  fontSize: "12px",
                  color: "var(--ink-muted)",
                  marginBottom: "10px",
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                  — {q.author}
                </span>
                {q.source && <span>{q.source}</span>}
                {q.kind && (
                  <span
                    title={
                      q.kind === "paraphrase"
                        ? "Our wording of the author's idea, not a verbatim quotation."
                        : "A phrase the author borrowed and reshaped, not original to them."
                    }
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--mustard-text)",
                      border: "1px solid var(--mustard)",
                      borderRadius: "999px",
                      padding: "1px 8px",
                    }}
                  >
                    {KIND_LABEL[q.kind]}
                  </span>
                )}
                <Link
                  href={`/library#q${q.id}`}
                  style={{
                    color: "var(--mustard-text)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--mustard)",
                    paddingBottom: "1px",
                  }}
                >
                  Permalink
                </Link>
              </div>
              {q.note && (
                <p
                  style={{
                    fontFamily: "var(--B)",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "var(--ink-muted)",
                    maxWidth: "62ch",
                    marginBottom: "8px",
                  }}
                >
                  <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                    Bell:
                  </strong>{" "}
                  {q.note}
                </p>
              )}
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {q.tags.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilter(t)}
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "10px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "999px",
                      border: "1px solid var(--border)",
                      background: "transparent",
                      color: "var(--ink-muted)",
                      cursor: "pointer",
                    }}
                  >
                    {t.replace(/-/g, " ")}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="library"
            title="A quote a week, with Bell's commentary."
            description="The weekly letter includes one quote pulled from the commonplace, with a paragraph on why it carries weight right now."
          />
        </div>
      </section>
    </Layout>
  );
}
