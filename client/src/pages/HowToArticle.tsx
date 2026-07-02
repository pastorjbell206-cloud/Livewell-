/**
 * How-To article reader (/how-tos/:slug). Loads a single static how-to guide
 * from client/public/howtos/a/<slug>.json and renders its Markdown body with
 * the shared Markdown renderer the article pages use.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Markdown } from "@/components/Markdown";

const wrap = { maxWidth: "720px", margin: "0 auto" } as const;

interface Article { slug: string; title: string; excerpt: string; topic: string; readTime: string; body: string }

const TOPIC_LABEL: Record<string, string> = {
  "spiritual-formation": "The Inner Life", marriage: "Marriage", parenting: "Parenting",
  relationships: "Relationships", family: "The Home", work: "Work & Money",
  suffering: "Hard Seasons", "the-body": "The Body", "the-life-in-the-world": "Life in the World",
  discipleship: "Following Jesus", evangelism: "Sharing Your Faith",
};

export default function HowToArticle() {
  const [, params] = useRoute("/how-tos/:slug");
  const slug = params?.slug;
  const [article, setArticle] = useState<Article | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setArticle(null);
    setMissing(false);
    fetch(`/howtos/a/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (d ? setArticle(d) : setMissing(true)))
      .catch(() => setMissing(true));
  }, [slug]);

  return (
    <Layout>
      {article && (
        <SEOMeta
          title={`${article.title} | How-To Guides`}
          description={article.excerpt}
          url={`https://www.livewellbyjamesbell.co/how-tos/${article.slug}`}
          type="article"
        />
      )}

      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          <Link href="/how-tos" style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none" }}>
            ← All how-to guides
          </Link>

          {missing && (
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", color: "var(--ink-muted)", marginTop: "var(--s-4)" }}>
              That guide was not found. Browse the <Link href="/how-tos" style={{ color: "var(--mustard-text)" }}>full library</Link>.
            </p>
          )}

          {article && (
            <article>
              <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.07em", color: "var(--mustard-text)", margin: "var(--s-4) 0 12px" }}>
                {(TOPIC_LABEL[article.topic] || article.topic).toUpperCase()} · {article.readTime}
              </div>
              <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 4.6vw, 46px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "var(--s-3)" }}>
                {article.title}
              </h1>
              <div style={{ width: "44px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-4)" }} />
              <div className="prose" style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
                <Markdown>{article.body.replace(/^\s*#{1,6}\s+.*\r?\n+/, "")}</Markdown>
              </div>

              <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid rgba(20,17,12,0.1)", paddingTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
                <Link href={`/how-tos?topic=${article.topic}`} style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>More on {TOPIC_LABEL[article.topic] || article.topic}</Link>
                <Link href="/tools/wisdom-finder" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Wisdom Finder</Link>
              </div>
            </article>
          )}
        </div>
      </section>
    </Layout>
  );
}
