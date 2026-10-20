/**
 * My Library (/my-library): everything a reader has saved or started on
 * LiveWell, in one place.
 *
 *   - Pick up where you left off: plans in progress, self-check results, the
 *     journals and planners, the Study Bible (lib/myProgress reads what each
 *     tool already keeps in this browser).
 *   - Saved: the pages saved with Save (lib/library), each one a tap away and
 *     one tap from the reader's phone.
 *   - Recently read essays still on the shelf, and saved verses and prayers.
 *   - Put LiveWell on your home screen.
 *
 * It all lives in this browser. Readers have no accounts (James's decision,
 * 2026-10-14), so the page says plainly that nothing leaves the device, and
 * offers the reader's own email app to carry the saved list to another one.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Mail, Trash2 } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { AddToHomeScreen } from "@/components/AddToHomeScreen";
import { SAVE_FAILED, SendButton, absoluteUrl } from "@/components/TakeItWithYou";
import { removeFromLibrary, useLibrary, type LibraryItem } from "@/lib/library";
import { collectProgress, recentEssays, savedSnippetCount, type ProgressRow } from "@/lib/myProgress";
import { isPublicEssay } from "@/lib/shelf";

const wrap: React.CSSProperties = { maxWidth: "var(--w-default)", margin: "0 auto" };
const h2: React.CSSProperties = { fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--ink)", margin: "0 0 var(--s-3)" };
const kicker: React.CSSProperties = { fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--mustard-text)" };
const rowStyle: React.CSSProperties = { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", padding: "14px 0", borderBottom: "1px solid var(--border)" };
const small: React.CSSProperties = { fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.5, color: "var(--ink-muted)" };
const iconButton: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px", minWidth: "44px", minHeight: "44px", padding: "8px 10px",
  border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, cursor: "pointer", textDecoration: "none", flexShrink: 0,
};

function savedOn(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : `Saved ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

/** The saved list as plain text, for the reader's own email app. */
function listEmail(items: LibraryItem[]): string {
  const body = items.map((i) => `${i.title}\n${absoluteUrl(i.href)}`).join("\n\n");
  return `mailto:?subject=${encodeURIComponent("My LiveWell library")}&body=${encodeURIComponent(`${body}\n\nFrom LiveWell by James Bell`)}`;
}

const ESSAY_PATH = /^\/writing\/([^/?#]+)$/;

/**
 * Whether a saved page is still there to open. Only essays come and go: one
 * off the shelf answers with a takedown notice. An essay saved with its date
 * is judged as the shelf judges it, so a post James publishes later stays live.
 */
function isLiveSaved(item: LibraryItem): boolean {
  const m = item.href.match(ESSAY_PATH);
  return !m || isPublicEssay(decodeURIComponent(m[1]), item.date);
}

export default function MyLibrary() {
  const items = useLibrary();
  const [planTitles, setPlanTitles] = useState<Record<string, string>>({});
  // Read from this browser as the page renders; plan titles arrive later and
  // only rename the rows they belong to.
  const progress = useMemo<ProgressRow[]>(() => collectProgress(planTitles), [planTitles]);
  const [recent] = useState(() => recentEssays());
  const [snippets] = useState(() => savedSnippetCount());
  const [removeFailed, setRemoveFailed] = useState(false);
  // After a Remove, focus lands on the list's heading (or the page's, when the
  // list is gone), not on the page body.
  const savedHeadingRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const remove = (item: LibraryItem) => {
    const ok = removeFromLibrary(item.href);
    setRemoveFailed(!ok);
    if (ok) setTimeout(() => (savedHeadingRef.current ?? titleRef.current)?.focus(), 0);
  };

  useEffect(() => {
    let alive = true;
    fetch("/plans/plans-index.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d || !Array.isArray(d.plans)) return;
        const titles: Record<string, string> = {};
        for (const p of d.plans) if (p && typeof p.slug === "string" && typeof p.title === "string") titles[p.slug] = p.title;
        setPlanTitles(titles);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const nothingYet = items.length === 0 && progress.length === 0 && recent.length === 0 && snippets === 0;

  return (
    <Layout>
      <SEOMeta
        title="My Library: What You've Saved and Started on LiveWell"
        description="Everything you've saved or started on LiveWell in one place: essays, care pages, plans, study guides, tools, and your progress. It stays in your browser."
        url="https://www.livewellbyjamesbell.co/my-library"
        noindex
      />

      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>
            <Link href="/resources" style={{ color: "inherit" }}>Resources</Link> · My Library
          </div>
          <h1 ref={titleRef} tabIndex={-1} style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 20px", maxWidth: "20ch", outline: "none" }}>
            My Library
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--charcoal-fg-muted)", maxWidth: "60ch", margin: 0 }}>
            Everything you've saved or started here, in one place. It lives in this browser on this device: LiveWell keeps no account and sees none of it.
          </p>
          {items.length > 0 && (
            <a href={listEmail(items)} style={{ ...iconButton, marginTop: "var(--s-4)", padding: "10px 16px", border: "1px solid var(--charcoal-line)", background: "transparent", color: "var(--charcoal-fg)" }}>
              <Mail size={16} aria-hidden /> Email my saved list to myself
            </a>
          )}
        </div>
      </section>

      {nothingYet && (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={wrap}>
            <h2 style={h2}>Nothing here yet</h2>
            <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink)", maxWidth: "62ch", margin: "0 0 var(--s-4)" }}>
              Look for <strong>Save</strong> and <strong>Send to my phone</strong> on essays, Find Help pages, plans, study guides, and tools. Whatever you save, and whatever you start, will be waiting here.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {[
                ["/help", "Find help for what you're facing"],
                ["/writing", "Read an essay"],
                ["/study/bible", "Open the Study Bible"],
                ["/plans", "Start an eight-week plan"],
                ["/tools", "Try a tool"],
              ].map(([href, label]) => (
                <Link key={href} href={href} style={{ ...iconButton, padding: "10px 16px" }}>
                  {label} <ArrowRight size={14} aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {progress.length > 0 && (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={wrap}>
            <div style={kicker}>In progress</div>
            <h2 style={h2}>Pick up where you left off</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {progress.map((p) => (
                <li key={p.href} style={rowStyle}>
                  <Link href={p.href} style={{ flex: 1, minWidth: 0, textDecoration: "none", color: "var(--ink)" }}>
                    <span style={{ ...small, display: "block" }}>{p.kind}</span>
                    <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "21px", lineHeight: 1.25 }}>{p.title}</span>
                    <span style={{ ...small, display: "block" }}>{p.detail}</span>
                  </Link>
                  <ArrowRight size={18} aria-hidden style={{ color: "var(--mustard-text)", flexShrink: 0 }} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {items.length > 0 && (
        <section style={{ background: progress.length ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={wrap}>
            <div style={kicker}>Saved</div>
            <h2 ref={savedHeadingRef} tabIndex={-1} style={{ ...h2, outline: "none" }}>What you've saved</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {items.map((item) => {
                const live = isLiveSaved(item);
                return (
                  <li key={item.href} style={rowStyle}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ ...small, display: "block" }}>{item.kind}{savedOn(item.savedAt) ? ` · ${savedOn(item.savedAt)}` : ""}</span>
                      {live ? (
                        <Link href={item.href} style={{ display: "block", fontFamily: "var(--F)", fontSize: "21px", lineHeight: 1.25, color: "var(--ink)", textDecorationColor: "var(--mustard)", textUnderlineOffset: "3px" }}>
                          {item.title}
                        </Link>
                      ) : (
                        <>
                          <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "21px", lineHeight: 1.25, color: "var(--ink-muted)" }}>{item.title}</span>
                          <span style={{ ...small, display: "block" }}>James has taken this essay down for now.</span>
                        </>
                      )}
                    </div>
                    {live && <SendButton title={item.title} href={item.href} />}
                    <button type="button" onClick={() => remove(item)} aria-label={`Remove ${item.title} from My Library`} style={iconButton}>
                      <Trash2 size={16} aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
            <p role="status" style={{ ...small, color: "var(--ink)", marginTop: removeFailed ? "12px" : 0 }}>{removeFailed ? SAVE_FAILED : ""}</p>
          </div>
        </section>
      )}

      {(recent.length > 0 || snippets > 0) && (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={wrap}>
            {recent.length > 0 && (
              <>
                <div style={kicker}>Recently read</div>
                <h2 style={h2}>Essays you've read</h2>
                <ul style={{ listStyle: "none", margin: "0 0 var(--s-5)", padding: 0 }}>
                  {recent.map((e) => (
                    <li key={e.href} style={rowStyle}>
                      <Link href={e.href} style={{ flex: 1, fontFamily: "var(--F)", fontSize: "20px", lineHeight: 1.3, color: "var(--ink)", textDecorationColor: "var(--mustard)", textUnderlineOffset: "3px" }}>
                        {e.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {snippets > 0 && (
              <Link href="/tools/saved" style={{ ...iconButton, padding: "12px 16px" }}>
                Your saved verses, prayers, and quotes ({snippets}) <ArrowRight size={14} aria-hidden />
              </Link>
            )}
          </div>
        </section>
      )}

      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={{ ...wrap, maxWidth: "720px" }}>
          <AddToHomeScreen />
          <p style={{ ...small, marginTop: "var(--s-4)" }}>
            Your library lives on the device where you saved things. To have it on your phone, save things there too, or send yourself the list with the email button above. Clearing this browser's data clears your library.
          </p>
        </div>
      </section>
    </Layout>
  );
}
