/**
 * RetiredEssayNotice — what /writing/:slug shows for an essay that is not on
 * the public shelf (lib/shelf.ts). The URL keeps working, so old links and
 * shares land somewhere honest: the title, one plain sentence, the nearest
 * essay that is on the site, and the ways on, Find Help among them (a reader
 * can arrive here from a hard place). The page is noindex; the prerendered
 * head says the same (prerender-heads).
 *
 * Where the question the essay took up is still answered on the site, the
 * notice says so first: the Honest Answer built from this essay
 * (data/answers.ts, matched by essaySlug) and the tools that work the same
 * question (data/answerCompanions.ts). Those are pages, not essays, so they
 * stay up while the essay is down. The data loads after the notice paints.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { articleUrl } from "@/lib/site";
import { HELP_LINK } from "@/lib/siteNav";
import { START_WITH, isPublicEssay, liveShelfEssays, sectionHref, shelfEntry, type ShelfSection } from "@/lib/shelf";

/** The essay to offer instead: the first live one in the nearest section, else the first to start with. */
function nearestEssay(section: ShelfSection | null, slug: string) {
  const inSection = section ? liveShelfEssays().find((e) => e.section === section.slug && e.slug !== slug) : null;
  return inSection ?? shelfEntry(START_WITH.find((s) => s !== slug && isPublicEssay(s)));
}

export const RETIRED_SENTENCE = "James has taken this essay down for now. The essays on the site today are a click away.";
export const PENDING_SENTENCE = "James is revising this essay. It is off the site until the new version is ready.";

interface StillHere { answer: { slug: string; question: string } | null; tools: { lead: string; label: string; href: string }[] }

/** The Honest Answer and the tools built from this essay, loaded off the main bundle. */
function useStillHere(slug: string): StillHere | null {
  const [found, setFound] = useState<{ slug: string; here: StillHere } | null>(null);
  useEffect(() => {
    let stale = false;
    Promise.all([import("@/data/answers"), import("@/data/answerCompanions")])
      .then(([{ ANSWERS }, { companionsFor }]) => {
        if (stale) return;
        const a = ANSWERS.find((x) => x.essaySlug === slug) ?? null;
        const tools = companionsFor({ slug: a?.slug ?? "", essaySlug: slug });
        setFound({ slug, here: { answer: a ? { slug: a.slug, question: a.question } : null, tools } });
      })
      .catch(() => {});
    return () => { stale = true; };
  }, [slug]);
  const here = found && found.slug === slug ? found.here : null;
  return here && (here.answer || here.tools.length) ? here : null;
}

const linkStyle = {
  fontFamily: "var(--U)",
  fontSize: "15px",
  fontWeight: 600,
  color: "var(--ink)",
  textDecoration: "none",
  borderBottom: "1px solid var(--mustard)",
  paddingBottom: "2px",
} as const;

export function RetiredEssayNotice({
  slug,
  title,
  pending = false,
  section,
}: {
  slug: string;
  title: string;
  /** A shelf essay waiting on its rewrite, rather than one taken off the shelf. */
  pending?: boolean;
  /** The nearest section with public essays, when there is one. */
  section: ShelfSection | null;
}) {
  const sentence = pending ? PENDING_SENTENCE : RETIRED_SENTENCE;
  const instead = nearestEssay(section, slug);
  const stillHere = useStillHere(slug);
  return (
    <Layout>
      <SEOMeta title={title} description={sentence} url={articleUrl(slug)} noindex />
      <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              margin: "0 0 20px",
            }}
          >
            {title}
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "0 0 var(--s-4)" }}>
            {sentence}
          </p>
          {stillHere && (
            <div
              style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "2px solid var(--mustard)", padding: "16px 20px", margin: "0 0 var(--s-4)", fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.6, color: "var(--ink)" }}
            >
              {stillHere.answer && (
                <p style={{ margin: 0 }}>
                  The short answer to this question is still on the site:{" "}
                  <Link href={`/answers#${stillHere.answer.slug}`} style={{ color: "var(--ink)", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}>
                    {stillHere.answer.question}
                  </Link>
                </p>
              )}
              {stillHere.tools.map((t, i) => (
                <p key={t.href} style={{ margin: stillHere.answer || i > 0 ? "10px 0 0" : 0, fontSize: "16px", color: "var(--ink-muted)" }}>
                  {t.lead}{" "}
                  <Link href={t.href} style={{ color: "var(--ink)", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}>
                    {t.label}
                  </Link>
                </p>
              ))}
            </div>
          )}
          {instead && (
            <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 var(--s-4)" }}>
              Read instead:{" "}
              <Link href={`/writing/${instead.slug}`} style={{ color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}>
                {instead.title}
              </Link>
            </p>
          )}
          <ul
            aria-label="Where to go instead"
            style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: "16px 28px" }}
          >
            <li>
              <Link href="/writing" style={linkStyle}>
                Read the essays
              </Link>
            </li>
            {section && (
              <li>
                <Link href={sectionHref(section)} style={linkStyle}>
                  Go to {section.name}
                </Link>
              </li>
            )}
            <li>
              <Link href="/study/bible" style={linkStyle}>
                Open the Study Bible
              </Link>
            </li>
            <li>
              <Link href={HELP_LINK.href} style={linkStyle}>
                {HELP_LINK.label}
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
