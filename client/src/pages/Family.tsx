/**
 * Family Discipleship hub (/family) — the one place a family finds what it
 * needs to disciple the household: teen apologetics (why we believe), family
 * devotions to do together, parenting in the faith, marriage, and the tools.
 *
 * Curated links always render. Teen apologetics are featured live from
 * published posts (slug prefix "teen-"); the family devotions render from
 * /family-devotions.json when present.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";

interface Devotion {
  id: string;
  title: string;
  theme: string;
  passage: string;
  passageText: string;
  bigIdea: string;
  reflection: string;
  questions: string[];
  activity: string;
  prayer: string;
}

const card = {
  background: "var(--card)", border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)", padding: "var(--s-4)", textDecoration: "none",
  color: "inherit", display: "block",
} as const;

function SectionHead({ kicker, title, blurb }: { kicker: string; title: string; blurb: string }) {
  return (
    <div style={{ marginBottom: "var(--s-4)" }}>
      <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>{kicker}</div>
      <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.5vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>{title}</h2>
      <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch" }}>{blurb}</p>
    </div>
  );
}

function LinkCard({ href, title, desc, external }: { href: string; title: string; desc: string; external?: boolean }) {
  const inner = (
    <>
      <div style={{ fontFamily: "var(--F)", fontSize: "19px", fontWeight: 500, color: "var(--ink)", marginBottom: "6px" }}>{title}</div>
      <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{desc}</div>
    </>
  );
  return external ? (
    <a href={href} style={card}>{inner}</a>
  ) : (
    <Link href={href} style={card}>{inner}</Link>
  );
}

const grid = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" } as const;

function PostCard({ slug, title, excerpt }: { slug: string; title: string; excerpt?: string | null }) {
  return (
    <Link href={`/writing/${slug}`} style={card}>
      <div style={{ fontFamily: "var(--F)", fontSize: "19px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.25 }}>{title}</div>
      {excerpt && <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{excerpt.slice(0, 130)}{excerpt.length > 130 ? "…" : ""}</div>}
    </Link>
  );
}

export default function Family() {
  const postsQuery = trpc.posts.listPublished.useQuery();
  const posts = postsQuery.data ?? [];
  const teen = posts.filter((p) => p.slug.startsWith("teen-"));
  const apologetics = posts.filter((p) => p.slug.startsWith("apologetics-"));
  const parentingArticles = posts.filter((p) => p.slug.startsWith("parenting-"));
  const marriageArticles = posts.filter((p) => p.slug.startsWith("marriage-"));

  const [devotions, setDevotions] = useState<Devotion[]>([]);
  const [openDev, setOpenDev] = useState<string | null>(null);
  useEffect(() => {
    fetch("/family-devotions.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => Array.isArray(d) && setDevotions(d))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="Family Discipleship — Devotions, Apologetics, and Parenting"
        description="Everything a family needs to grow in faith together: devotions you can do with your kids, teen apologetics on why we believe, parenting Scripture, and marriage."
        url="https://www.livewellbyjamesbell.co/family"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>Integrated Life · Family</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            Disciple your whole family, in one place.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            Devotions you can actually do with your kids. Apologetics that give a teenager not just what to believe but why. Scripture and writing for parenting and marriage. The whole house, learning to carry the weight of faith together.
          </p>
        </div>
      </section>

      {/* CATECHISM — featured */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) 0" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <Link href="/family/catechism" style={{ ...card, borderTop: "2px solid var(--mustard)", padding: "var(--s-5)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Learn the faith together</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>
              The Family Catechism
            </div>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "12px" }}>
              Fifty-two questions, one a week, in the New City Catechism tradition. An answer for the grown-ups and one for the little ones, a verse, a short reflection, and a prayer. The oldest way a family has ever learned the faith.
            </p>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Start the catechism <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* FAMILY DEVOTIONS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead kicker="Do this together" title="Family devotions" blurb="Short, warm devotions for the table or the couch — a passage, a question that actually starts a conversation, something to do together, and a prayer a child can pray. Tap one to open it." />
          {devotions.length === 0 ? (
            <LinkCard href="/tools/family-devotions" title="Build a family devotion" desc="Pick your kids' ages and a theme and get a complete 15-minute devotion with Scripture, teaching, an activity, and a prayer." />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {devotions.map((d) => {
                const open = openDev === d.id;
                return (
                  <div key={d.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                    <button type="button" onClick={() => setOpenDev(open ? null : d.id)} aria-expanded={open}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "16px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                      <span>
                        <span style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{d.theme}</span>
                        <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginTop: "4px" }}>{d.title}</span>
                      </span>
                      <ChevronDown size={18} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                    </button>
                    {open && (
                      <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
                        <p style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)", margin: "16px 0 4px" }}>{d.passage}</p>
                        <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", fontStyle: "italic", marginBottom: "16px" }}>{d.passageText}</p>
                        <p style={{ fontFamily: "var(--F)", fontSize: "17px", color: "var(--ink)", marginBottom: "12px" }}>{d.bigIdea}</p>
                        <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "16px", whiteSpace: "pre-line" }}>{d.reflection}</p>
                        <div style={{ marginBottom: "16px" }}>
                          <div className="eyebrow" style={{ marginBottom: "8px" }}>Talk about it</div>
                          <ul style={{ margin: 0, paddingLeft: "20px", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.8, color: "var(--ink)" }}>
                            {d.questions.map((q, i) => <li key={i}>{q}</li>)}
                          </ul>
                        </div>
                        <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "12px" }}><strong>Try this together.</strong> {d.activity}</p>
                        <p style={{ fontFamily: "var(--F)", fontSize: "15px", fontStyle: "italic", lineHeight: 1.7, color: "var(--ink-muted)", borderLeft: "2px solid var(--mustard)", paddingLeft: "14px" }}>{d.prayer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
            <Link href="/family/devotions" style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              See the full year, plus Advent and Holy Week <ArrowRight size={14} />
            </Link>
            <Link href="/tools/family-devotions" style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Or build your own <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* READING PLANS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) 0" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <Link href="/family/reading-plans" style={{ ...card, borderTop: "2px solid var(--mustard)", padding: "var(--s-5)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>Read it together</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "10px" }}>
              Family Bible reading plans
            </div>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "12px" }}>
              A passage a day and a short prompt. Walk the life of Jesus, the great Old Testament story for kids, the Psalms, or a starter plan if your family is beginning or beginning again.
            </p>
            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              Browse the plans <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* TEEN APOLOGETICS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead kicker="For teenagers" title="Why we believe" blurb="Faith does not survive on what alone. A teenager needs the why. Honest answers to the hard questions — the resurrection, the Bible, suffering, science, other religions, and doubt itself." />
          {teen.length > 0 ? (
            <div style={grid}>
              {teen.map((p) => (
                <Link key={p.slug} href={`/writing/${p.slug}`} style={card}>
                  <div style={{ fontFamily: "var(--F)", fontSize: "19px", fontWeight: 500, color: "var(--ink)", marginBottom: "8px", lineHeight: 1.25 }}>{p.title}</div>
                  {p.excerpt && <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{p.excerpt.slice(0, 130)}{p.excerpt.length > 130 ? "…" : ""}</div>}
                </Link>
              ))}
            </div>
          ) : (
            <div style={grid}>
              <LinkCard href="/skeptic-track" title="Start here if you're a skeptic" desc="Seven essays in argument order, for anyone working out whether this is true." />
              <LinkCard href="/doubt" title="On doubt" desc="Doubt is not the enemy of faith. What to do with the questions." />
            </div>
          )}
        </div>
      </section>

      {/* APOLOGETICS LIBRARY */}
      {apologetics.length > 0 && (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
          <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
            <SectionHead kicker="For the asking" title="The apologetics library" blurb="The hardest questions, answered honestly — morality, suffering, hell, miracles, the hiddenness of God, the failures of the church, and whether faith is reasonable at all. For the teenager and the skeptic both." />
            <div style={grid}>
              {apologetics.map((p) => <PostCard key={p.slug} slug={p.slug} title={p.title} excerpt={p.excerpt} />)}
            </div>
          </div>
        </section>
      )}

      {/* PARENTING */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead kicker="Raising them in the faith" title="Parenting" blurb="The work no one applauds, done where no congregation watches. Scripture for the real moments, plus writing and tools for the long obedience of raising children who can carry weight." />
          <div style={grid}>
            {parentingArticles.map((p) => <PostCard key={p.slug} slug={p.slug} title={p.title} excerpt={p.excerpt} />)}
            <LinkCard href="/tools/parenting-verses" title="Parenting Bible verses" desc="Scripture for fear, anger, identity, obedience, screens, and doubt — each with a short note for the parent." />
            <LinkCard href="/parenting" title="On parenting" desc="Essays on raising children in the faith without crushing them." />
            <LinkCard href="/tools/parenting-guide" title="Parenting stage guide" desc="Age-specific guidance from toddlers to young adults, and one practice to start this week." />
            <LinkCard href="/writing/what-fatherhood-requires" title="What fatherhood requires" desc="On the inheritance you pass down, and the one you choose to break." />
            <LinkCard href="/life/raising-children-in-grace" title="Raising children in grace" desc="The deep guide: discipline that reaches the heart, faith, screens, and the teen years. You cannot save your children, and you were never meant to." />
            <LinkCard href="/life/the-home-and-the-family" title="The home and the family" desc="The household as a school of grace: the table, family worship, and the open door." />
          </div>
        </div>
      </section>

      {/* MARRIAGE */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead kicker="The center of the home" title="Marriage" blurb="A home is built on a covenant before it is built on anything else. Writing and a real assessment for the marriage your family is standing on." />
          <div style={grid}>
            {marriageArticles.map((p) => <PostCard key={p.slug} slug={p.slug} title={p.title} excerpt={p.excerpt} />)}
            <LinkCard href="/marriage" title="On marriage" desc="Covenant, not contract. Marriage through the long middle." />
            <LinkCard href="/tools/marriage-assessment" title="Marriage health assessment" desc="A 15-question diagnostic across communication, trust, conflict, and shared vision." />
            <LinkCard href="/writing/covenant-vs-contract-what-marriage-is" title="Covenant vs. contract" desc="What marriage actually is, and why the difference holds it together." />
            <LinkCard href="/life/marriage-the-long-covenant" title="Marriage: the long covenant" desc="The deep guide: the slow drift, conflict, money, desire, and the daily work of staying married well." />
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead kicker="For the home" title="Tools" blurb="Practical tools to use around the table and through the week." />
          <div style={grid}>
            <LinkCard href="/tools/verse-finder" title="Bible verse finder" desc="Find Scripture for any season — anxiety, grief, hope, courage — and share it." />
            <LinkCard href="/tools/family-devotions" title="Family devotion builder" desc="Build a 15-minute devotion by your kids' ages and a theme." />
            <LinkCard href="/tools/bible-study" title="Bible study guide" desc="Study any book of the Bible with themes, questions, and reading strategies." />
            <LinkCard href="/tools/prayer-generator" title="Prayer generator" desc="Guided prayers for morning, evening, strength, guidance, and gratitude." />
            <LinkCard href="/tools/rule-of-life" title="Rule of life builder" desc="Build a sustainable rhythm of prayer, Scripture, rest, community, and mission you can actually keep." />
            <LinkCard href="/disciple-making" title="Make disciples" desc="Equip the ordinary believer to make disciples around a table. The path, plus a Start a Table tool." />
          </div>
        </div>
      </section>
    </Layout>
  );
}
