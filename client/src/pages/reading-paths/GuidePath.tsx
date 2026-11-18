/**
 * A reading path of study guides (client/public/reading-paths/index.json):
 * the skeptic's, doubt, marriage and parenting paths. Each stop is a study
 * guide that already ships at /studyguides/<slug>. The catalogue lists these
 * four under Tools, Small group study guides; until this view they were only
 * PDFs, and their addresses showed "That path isn't here".
 *
 * Every sentence shown is the file's own, word for word.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Users } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import LoadFailed from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";

export const GUIDE_PATH_SLUGS = ["skeptic", "doubt", "marriage", "parenting"] as const;

export interface GuidePathStop {
  n: number;
  guide: string;
  why: string;
  url: string;
}
export interface GuidePathData {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  stops: GuidePathStop[];
  closing: string;
}

const isFile = (x: unknown): x is { paths: GuidePathData[] } =>
  !!x && typeof x === "object" && Array.isArray((x as { paths?: unknown }).paths);

/** "www.livewellbyjamesbell.co/studyguides/skeptic" to "/studyguides/skeptic". */
export function stopHref(url: string): string {
  const m = /\/studyguides\/([a-z0-9-]+)\/?$/.exec(url);
  return m ? `/studyguides/${m[1]}` : "/studyguides";
}

export default function GuidePath({ slug }: { slug: string }) {
  const [path, setPath] = useState<GuidePathData | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let stale = false;
    fetchJson("/reading-paths/index.json", isFile)
      .then((f) => {
        if (stale) return;
        const p = f.paths.find((x) => x.slug === slug);
        if (p) setPath(p);
        else setFailed(true);
      })
      .catch(() => !stale && setFailed(true));
    return () => {
      stale = true;
    };
  }, [slug, nonce]);

  return (
    <Layout>
      <SEOMeta
        title={path ? `${path.title}: Study Guides in Order` : "A Reading Path of Study Guides"}
        description={path ? path.subtitle : "Study guides in the order to take them, each one free to use alone or with a group."}
        url={`https://www.livewellbyjamesbell.co/reading-paths/${slug}`}
      />
      {failed ? (
        <section style={{ padding: "var(--s-6) var(--gutter)" }}>
          <LoadFailed what="This reading path" onRetry={() => {
              setFailed(false);
              setNonce((n) => n + 1);
            }} backHref="/studyguides" backLabel="All study guides" />
        </section>
      ) : !path ? (
        <div style={{ minHeight: "60vh" }} data-lw-loading aria-busy="true" />
      ) : (
        <>
          <PageHead door="Tools" doorHref="/tools" title={path.title} line={path.subtitle} plate="books" />
          <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--gutter) var(--s-6)" }}>
            <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
              {path.intro.split(/\n\n+/).map((para, i) => (
                <p key={i} style={{ fontFamily: "var(--font-reading)", fontSize: "var(--fs-read)", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 var(--s-2)" }}>
                  {para}
                </p>
              ))}
              <h2 className="eyebrow" style={{ margin: "var(--s-4) 0 var(--s-2)" }}>
                The studies, in order
              </h2>
              <ol style={{ listStyle: "none", padding: 0, margin: "0 0 var(--s-4)" }}>
                {path.stops.map((s) => (
                  <li key={s.n} style={{ borderTop: "1px solid var(--border)" }}>
                    <Link href={stopHref(s.url)} className="gp-stop" style={{ display: "flex", gap: "var(--s-2)", padding: "var(--s-3) 0", textDecoration: "none", color: "inherit", minHeight: 44 }}>
                      <span aria-hidden="true" style={{ fontFamily: "var(--F)", fontSize: "var(--fs-h2)", lineHeight: 1, color: "var(--mustard-text)", minWidth: "1.4em" }}>
                        {s.n}
                      </span>
                      <span>
                        <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "var(--fs-h3, 1.5rem)", fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>
                          {s.guide} <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} style={{ verticalAlign: "middle" }} />
                        </span>
                        <span style={{ display: "block", fontFamily: "var(--B)", color: "var(--ink-muted)", lineHeight: 1.6 }}>{s.why}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
              <p style={{ fontFamily: "var(--font-reading)", fontStyle: "italic", fontSize: "var(--fs-read)", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 var(--s-4)" }}>
                {path.closing}
              </p>
              <Link href="/studyguides" className="btn btn--quiet">
                <Users aria-hidden="true" size={18} strokeWidth={1.75} /> All study guides
              </Link>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}
