/**
 * ReadingPathDetail — renders one curated reading path from
 * lib/readingPaths.ts (the single source of truth the old version of this
 * page predated: it filtered live posts by `post.topic`, a field most essays
 * lack, so every list rendered empty).
 *
 * Each path is an ordered arc: numbered entries, each either an existing
 * essay (links to /writing/:slug) or a planned one ("Coming soon", never a
 * broken link). The "Start Here — Blind Spots" path lives at /start and
 * redirects there.
 */
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link, Redirect, useRoute } from "wouter";
import { ArrowRight } from "lucide-react";
import { getReadingPathBySlug, availableCount } from "@/lib/readingPaths";
import { getReadEssays } from "@/lib/readProgress";

export function ReadingPathDetail() {
  const [, params] = useRoute("/reading-paths/:slug");
  const path = getReadingPathBySlug(params?.slug);

  // Depth's memory (P13): the device-local read set. Hook must run before
  // any early return (rules of hooks).
  const [readSet] = useState(getReadEssays);

  // The book-guide path is a pointer to /start, not a detail page of its own.
  if (path?.externalHref) return <Redirect to={path.externalHref} />;

  if (!path) {
    return (
      <Layout>
        <SEOMeta
          title="Reading Path Not Found"
          description="This reading path does not exist. Browse the six curated reading paths through the LiveWell essay library."
        />
        <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--s-3)", textAlign: "center" }}>
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "2rem", fontWeight: 400, color: "var(--ink)", marginBottom: "1rem" }}>
              That path isn't here
            </h1>
            <p style={{ color: "var(--ink-muted)", marginBottom: "2rem" }}>
              The reading path you followed doesn't exist — it may have moved when the paths were reorganized.
            </p>
            <Link href="/reading-paths" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
              All reading paths <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  const done = availableCount(path);
  const planned = path.entries.length - done;

  // Mark finished essays, offer "pick up here" at the first unread available
  // entry.
  const readHere = path.entries.filter((e) => e.available && e.slug && readSet.has(e.slug)).length;
  const resumeIndex = path.entries.findIndex((e) => e.available && e.slug && !readSet.has(e.slug));
  const resume = resumeIndex >= 0 && readHere > 0 ? path.entries[resumeIndex] : null;

  return (
    <Layout>
      <SEOMeta
        title={`${path.title} — A Reading Path`}
        description={path.description.length > 155 ? path.description.slice(0, 152) + "…" : path.description}
        type="website"
      />

      {/* HEADER */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-3) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "1.5rem" }}>Reading path</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.1rem, 4.5vw, 3rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1.2rem" }}>
            {path.title}
          </h1>
          <p style={{ color: "var(--bone)", opacity: 0.8, fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            {path.description}
          </p>
          <p style={{ fontFamily: "var(--U)", fontSize: "0.8rem", letterSpacing: "0.08em", color: "var(--bone)", opacity: 0.55 }}>
            {done} essay{done === 1 ? "" : "s"} to read in order
            {planned > 0 ? ` · ${planned} more coming` : ""}
          </p>
          {resume && resume.slug && (
            <p style={{ marginTop: "1.1rem", fontFamily: "var(--U)", fontSize: "0.85rem", color: "var(--bone)", opacity: 0.85 }}>
              You have read {readHere} of {done}.{" "}
              <Link href={`/writing/${resume.slug}`} style={{ color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.15rem" }}>
                Pick up at {String(resumeIndex + 1).padStart(2, "0")} — {resume.title}
              </Link>
            </p>
          )}
        </div>
      </section>

      {/* THE ARC — order carries meaning, so the entries are numbered */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {path.entries.map((entry, i) => {
              const number = (
                <span aria-hidden="true" style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", color: entry.available ? "var(--mustard)" : "var(--ink-muted)", minWidth: "2rem", paddingTop: "0.35rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              );
              const body = (
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.25, color: "var(--ink)", opacity: entry.available ? 1 : 0.55 }}>
                    {entry.title}
                    {entry.available && (
                      <ArrowRight size={15} style={{ display: "inline", verticalAlign: "middle", marginLeft: "0.5rem", color: "var(--mustard)" }} />
                    )}
                    {entry.available && entry.slug && readSet.has(entry.slug) && (
                      <span style={{ marginLeft: "0.6rem", fontFamily: "var(--U)", fontSize: "0.62rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", border: "1px solid rgba(20,17,12,0.25)", borderRadius: "3px", padding: "0.08rem 0.4rem", verticalAlign: "middle" }}>
                        Read
                      </span>
                    )}
                  </span>
                  {entry.blurb && (
                    <span style={{ display: "block", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--ink-muted)", marginTop: "0.3rem", opacity: entry.available ? 1 : 0.75 }}>
                      {entry.blurb}
                    </span>
                  )}
                  {!entry.available && (
                    <span style={{ display: "inline-block", marginTop: "0.5rem", fontFamily: "var(--U)", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)", border: "1px solid var(--ink-muted)", borderRadius: "3px", padding: "0.1rem 0.5rem", opacity: 0.7 }}>
                      Coming soon
                    </span>
                  )}
                </span>
              );
              return (
                <li key={`${entry.title}-${i}`} style={{ borderBottom: "1px solid rgba(20,17,12,0.1)" }}>
                  {entry.available && entry.slug ? (
                    <Link href={`/writing/${entry.slug}`} style={{ display: "flex", gap: "1.1rem", padding: "1.4rem 0", textDecoration: "none" }}>
                      {number}
                      {body}
                    </Link>
                  ) : (
                    <div style={{ display: "flex", gap: "1.1rem", padding: "1.4rem 0" }}>
                      {number}
                      {body}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ONWARD — never a dead end */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-3)", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--mustard)", margin: "0 auto 2rem" }} />
          <p style={{ fontFamily: "var(--F)", fontSize: "1.1rem", lineHeight: 1.6, color: "var(--bone)", fontStyle: "italic", marginBottom: "2rem" }}>
            Read it in order if you can. Each essay assumes the ground the one before it cleared.
          </p>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/reading-paths" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
              All reading paths
            </Link>
            <Link href="/writing" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
              The full library
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
