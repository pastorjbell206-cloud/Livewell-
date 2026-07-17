import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { StatementBand, SectionArt } from "@/components/EditorialBlocks";
import ToolStrip from "@/components/ToolStrip";
import { trpc } from "@/lib/trpc";
import {
  PILLAR_BY_ID,
  pillarUrl,
  pillarForPost,
  subThemesForPost,
} from "@/lib/taxonomy";

const PILLAR = PILLAR_BY_ID.get(6)!; // Living Well After Christendom (formation)

/**
 * The front door for Pillar 6 — the formation pillar, and the family priority
 * named in the Editorial Constitution. Surfaces the seven sub-themes as
 * sub-doors into the filtered /writing views. Copy here is restrained on
 * purpose; James supplies the final on-voice intro.
 */
const SUBTHEMES: { slug: string; label: string; blurb: string }[] = [
  { slug: "marriage-covenant", label: "Marriage & Covenant", blurb: "Marriage after individualism, when the culture only knows contract." },
  { slug: "fatherhood", label: "Fatherhood", blurb: "Raising sons, being raised without a father, and what it costs to stay." },
  { slug: "parenting", label: "Parenting", blurb: "Forming children in a secular age, where formation is never neutral." },
  { slug: "family-household", label: "Family & Household", blurb: "The home as a formative institution, not a lifestyle." },
  { slug: "friendship-community", label: "Friendship & Community", blurb: "Belonging that costs something, against the drift toward isolation." },
  { slug: "vocation-work", label: "Vocation & Work", blurb: "Work, money, and calling now that the old scaffolding is gone." },
  { slug: "practices", label: "Practices", blurb: "The habits and rhythms that form a life when nothing forms us by default." },
];

const wrap = { maxWidth: "var(--w-content)", margin: "0 auto" } as const;

export default function LivingWell() {
  const postsQuery = trpc.posts.listPublished.useQuery();

  const { total, perSub } = useMemo(() => {
    const perSub: Record<string, number> = {};
    let total = 0;
    for (const p of postsQuery.data ?? []) {
      if (pillarForPost(p)?.id !== 6) continue;
      total += 1;
      for (const st of subThemesForPost(p)) perSub[st] = (perSub[st] ?? 0) + 1;
    }
    return { total, perSub };
  }, [postsQuery.data]);

  return (
    <Layout>
      <SEOMeta
        title="Living Well After Christendom — Marriage, Family & Formation"
        description="The formation pillar: marriage, fatherhood, parenting, friendship, vocation, and the daily practices that form a faithful life now that cultural Christianity is gone and the old scaffolding no longer forms us by default."
        url="https://www.livewellbyjamesbell.co/living-well"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            Formation · Pillar Six
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(38px, 6vw, 68px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: "20px", maxWidth: "16ch" }}>
            Living Well After Christendom
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "19px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>
            {PILLAR.blurb}
          </p>
        </div>
      </section>

      <StatementBand tone="light" eyebrow="Why this pillar" width="34ch">
        Formation was never neutral, and it was never automatic — a life is built now, or it is not built at all.
      </StatementBand>

      {/* SUB-THEMES */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gap: "20px" }}>
            {SUBTHEMES.map((s) => (
              <Link
                key={s.slug}
                href={`${pillarUrl(PILLAR.slug)}&subTheme=${s.slug}`}
                style={{
                  display: "block",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--mustard)",
                  borderRadius: "var(--radius-sm)",
                  padding: "24px 28px",
                  textDecoration: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "16px" }}>
                  <h2 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--ink)" }}>
                    {s.label}
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", whiteSpace: "nowrap" }}>
                      {perSub[s.slug] ?? 0} {perSub[s.slug] === 1 ? "essay" : "essays"}
                    </span>
                    <ArrowRight size={18} aria-hidden style={{ color: "var(--ink-muted)" }} />
                  </div>
                </div>
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", marginTop: "10px" }}>
                  {s.blurb}
                </p>
              </Link>
            ))}
          </div>

          <SectionArt seed="living-well-pillar-six" />

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "var(--s-5)" }}>
            <Link
              href={pillarUrl(PILLAR.slug)}
              style={{
                display: "inline-block",
                padding: "14px 28px",
                background: "var(--ink)",
                color: "var(--bone)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--U)",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Read every essay in this pillar{total ? ` (${total})` : ""}
            </Link>
          </div>
        </div>
      </section>

      {/* THE INSTRUMENTS — formation is practiced, not only read */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <ToolStrip
            intro="Formation is practiced, not only read. These four do the practicing — each one runs in your browser and answers to no one but you."
            tools={[
              { href: "/tools/rule-of-life", label: "Rule of Life Builder", blurb: "The old practice of ordering a week on purpose, rebuilt for a life nothing orders by default." },
              { href: "/life/assessment", label: "Whole-Life Audit", blurb: "Thirty honest statements across the inner life, the body, the home, the work, the world." },
              { href: "/tools/family-devotions", label: "Family Devotion Builder", blurb: "A complete fifteen-minute devotion, built for your kids' actual ages." },
              { href: "/tools/financial-health", label: "Financial Health Check", blurb: "Where the money actually goes, measured against what you say matters." },
            ]}
          />
        </div>
      </section>
    </Layout>
  );
}
