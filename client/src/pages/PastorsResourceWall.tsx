/**
 * /pastors-resource-wall — the PCN distribution moat.
 *
 * Per the competitor audit: PCN is the highest-leverage growth channel
 * Bell has, and no peer in the audit serves pastors as a named, segmented
 * product. This page consolidates: sermon-prep helpers (the existing
 * tools), discussion guides per book (when present), citation tools, and
 * the pastoral letter signup.
 *
 * Resources are pulled DB-driven where available; the page is opinionated
 * about the structure so it never feels empty.
 */
import { Link } from "wouter";
import {
  BookOpen,
  Download,
  FileText,
  Mail,
  Quote,
  Search,
  Users,
} from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { trpc } from "@/lib/trpc";
import { NEWSLETTER_PITCH_PASTORAL } from "@/lib/positioning";

interface ResourceLink {
  title: string;
  description: string;
  href: string;
  icon: typeof BookOpen;
  external?: boolean;
}

const SERMON_PREP: ResourceLink[] = [
  {
    title: "Verse Finder",
    description: "Find passages by theme, situation, or scripture reference.",
    href: "/tools/verse-finder",
    icon: Search,
  },
  {
    title: "Sermon Outline Builder",
    description: "Walk a passage from text to outline in seven prompts.",
    href: "/tools/sermon-outline",
    icon: FileText,
  },
  {
    title: "Deep Bible Companion",
    description: "Greek, Hebrew, cross-references, and Bell's notes on the text.",
    href: "/tools/deep-bible",
    icon: BookOpen,
  },
  {
    title: "Scripture Memory",
    description: "Plans, spaced repetition, and the memorization patterns that actually work.",
    href: "/tools/scripture-memory",
    icon: BookOpen,
  },
];

const PASTOR_CARE: ResourceLink[] = [
  {
    title: "Pastor Burnout Assessment",
    description: "Ten questions. Honest answers. No marketing.",
    href: "/tools/pastor-burnout",
    icon: Users,
  },
  {
    title: "Church Health Audit",
    description: "Where the congregation is and what to do about it.",
    href: "/tools/church-health",
    icon: Users,
  },
  {
    title: "Conflict Guide",
    description: "The conversations you have been avoiding, and how to have them well.",
    href: "/tools/conflict-guide",
    icon: Users,
  },
];

const PCN_LINKS: ResourceLink[] = [
  {
    title: "Pastors Connection Network",
    description: "You don't have to lead alone. Cohorts, peer groups, monthly calls.",
    href: "/pastors",
    icon: Users,
  },
  {
    title: "Pastor's Letter",
    description: "Tuesday morning. One essay, one sermon-prep idea, one resource.",
    href: "/for-pastors",
    icon: Mail,
  },
];

function ResourceCard({ r }: { r: ResourceLink }) {
  const Icon = r.icon;
  const inner = (
    <div
      style={{
        padding: "20px",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderLeft: "2px solid var(--mustard)",
        borderRadius: "var(--radius-sm)",
        height: "100%",
        cursor: "pointer",
        transition: "all 0.2s",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = "var(--bone-warm)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = "var(--card)";
      }}
    >
      <Icon size={22} aria-hidden style={{ color: "var(--mustard)" }} />
      <h3
        style={{
          fontFamily: "var(--F)",
          fontSize: "20px",
          fontWeight: 500,
          color: "var(--ink)",
          letterSpacing: "-0.01em",
        }}
      >
        {r.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: "14px",
          lineHeight: 1.6,
          color: "var(--ink-muted)",
        }}
      >
        {r.description}
      </p>
    </div>
  );
  if (r.external) {
    return (
      <a href={r.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={r.href} style={{ textDecoration: "none" }}>
      {inner}
    </Link>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div style={{ marginBottom: "var(--s-4)" }}>
      <div className="eyebrow" style={{ marginBottom: "10px" }}>
        {kicker}
      </div>
      <h2
        style={{
          fontFamily: "var(--F)",
          fontSize: "clamp(26px, 3.5vw, 34px)",
          fontWeight: 400,
          letterSpacing: "-0.015em",
          color: "var(--ink)",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

export default function PastorsResourceWall() {
  const resources = trpc.resources.listPublished.useQuery();
  const downloads =
    resources.data?.filter(r =>
      r.category
        ? /pastor|sermon|ministry|leadership|trench/i.test(r.category)
        : false
    ) ?? [];

  return (
    <Layout>
      <SEOMeta
        title="Pastor's Resource Wall"
        description="Sermon prep, citation tools, discussion guides, and the Pastors Connection Network — built so pastors don't have to do the work alone."
        url="https://www.livewellbyjamesbell.co/pastors-resource-wall"
      />

      {/* HERO */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "var(--s-7) var(--s-4) var(--s-6)",
          color: "var(--bone)",
        }}
      >
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "20px", color: "var(--mustard)" }}>
            Pastor's Resource Wall
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
            Tools for the work that does not finish.
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "18px",
              lineHeight: 1.7,
              color: "rgba(245,240,230,0.75)",
              maxWidth: "60ch",
            }}
          >
            Sermon prep. Citation tools. Discussion guides for the books. The
            quote bank for sermon illustrations. Built so the pastor reading
            this can spend less time fighting friction and more time pastoring.
          </p>
        </div>
      </section>

      {/* SERMON PREP */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionTitle kicker="Sermon Prep" title="Tools for Sunday morning." />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {SERMON_PREP.map(r => (
              <ResourceCard key={r.href} r={r} />
            ))}
          </div>
        </div>
      </section>

      {/* DISCUSSION GUIDES — DB-driven */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionTitle
            kicker="For Your Church"
            title="Discussion guides, sermon-ready quotes, downloads."
          />
          {downloads.length === 0 && (
            <p
              style={{
                fontFamily: "var(--B)",
                color: "var(--ink-muted)",
                padding: "var(--s-4) 0",
              }}
            >
              Discussion guides land here as they are produced. The
              Trench Work collection is already available below.
            </p>
          )}
          {downloads.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "20px",
              }}
            >
              {downloads.map(d => (
                <div
                  key={d.id}
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderLeft: "2px solid var(--mustard)",
                    borderRadius: "var(--radius-sm)",
                    padding: "20px",
                  }}
                >
                  <Quote size={22} aria-hidden style={{ color: "var(--mustard)", marginBottom: "10px" }} />
                  {d.category && (
                    <div className="eyebrow" style={{ marginBottom: "10px" }}>
                      {d.category}
                    </div>
                  )}
                  <h3
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "20px",
                      fontWeight: 500,
                      color: "var(--ink)",
                      marginBottom: "8px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {d.title}
                  </h3>
                  {d.description && (
                    <p
                      style={{
                        fontFamily: "var(--B)",
                        fontSize: "14px",
                        lineHeight: 1.6,
                        color: "var(--ink-muted)",
                        marginBottom: "16px",
                      }}
                    >
                      {d.description}
                    </p>
                  )}
                  {d.url && (
                    <a
                      href={d.url}
                      download
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        fontFamily: "var(--U)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--ink)",
                        textDecoration: "none",
                        borderBottom: "1px solid var(--mustard)",
                        paddingBottom: "2px",
                      }}
                    >
                      <Download size={14} aria-hidden />
                      Download {d.fileType || "file"}
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* PASTOR CARE TOOLS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionTitle
            kicker="Pastor Care"
            title="When the work is grinding you down."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {PASTOR_CARE.map(r => (
              <ResourceCard key={r.href} r={r} />
            ))}
          </div>
        </div>
      </section>

      {/* PCN BLOCK */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionTitle
            kicker="Pastors Connection Network"
            title="You don't have to lead alone."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {PCN_LINKS.map(r => (
              <ResourceCard key={r.href} r={r} />
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="pastors-resource-wall"
            title={NEWSLETTER_PITCH_PASTORAL.title}
            description={NEWSLETTER_PITCH_PASTORAL.description}
          />
        </div>
      </section>
    </Layout>
  );
}
