/**
 * The Hard Issues Series: free booklets in two parts, Part One on eldership,
 * Part Two on leading and governing the church. Seven of the ten are held
 * off the site until their files are corrected (see data/booklets.ts); a
 * part with no booklet on the page is not shown.
 *
 * Self-contained (not DB-backed) so it deploys with the code. The booklets
 * are FREE; both the PDF and EPUB download directly from /ebook/<slug>/...
 * The page asks for no gift and names no outside network (James,
 * 2026-11-17: no giving, and the pastors' network stays off this site).
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { SITE_URL } from "@/lib/site";
import { Download } from "lucide-react";
import { BOOKLETS, HELD_BOOKLETS, type Booklet } from "@/data/booklets";

const ELDERSHIP = BOOKLETS.filter((b) => b.group === "eldership");
const GOVERNING = BOOKLETS.filter((b) => b.group === "governing");

// ItemList so the free booklets are indexed as one named series (each item
// points at its downloadable PDF, which is the actual resource).
const hardIssuesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The Hard Issues Series",
  description:
    "Free booklets for church leaders on deacons, church government and leading a church through change.",
  url: `${SITE_URL}/resources/hard-issues-series`,
  numberOfItems: BOOKLETS.length,
  itemListElement: BOOKLETS.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: b.title,
    url: `${SITE_URL}${b.pdf}`,
  })),
};

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)",
  fontSize: "0.75rem",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  color: "var(--mustard-text)",
};

function DownloadLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
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
      {label}
    </a>
  );
}

function BookletCard({ b }: { b: Booklet }) {
  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(96px, min(180px, 32%)) 1fr",
        gap: "var(--s-4)",
        alignItems: "start",
        background: "var(--card)",
        border: "1px solid rgba(20,17,12,0.08)",
        borderLeft: "2px solid var(--mustard)",
        borderRadius: "var(--radius-sm)",
        padding: "var(--s-4)",
      }}
    >
      <img
        src={`/books/${b.slug}.jpg`}
        alt={`${b.title} — cover`}
        loading="lazy"
        style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 8px 24px rgba(0,0,0,.18)" }}
      />
      <div>
        <h3 style={{ fontFamily: "var(--F)", fontSize: "26px", fontWeight: 500, lineHeight: 1.15, color: "var(--ink)", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
          {b.title}
        </h3>
        <p style={{ fontFamily: "var(--F)", fontSize: "17px", fontStyle: "italic", color: "var(--ink-muted)", margin: "0 0 14px", lineHeight: 1.4 }}>
          {b.subtitle}
        </p>
        <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 20px", maxWidth: "56ch" }}>
          {b.note}
        </p>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
          <DownloadLink href={b.pdf} label="Download PDF" />
          <DownloadLink href={b.epub} label="Download EPUB" />
        </div>
      </div>
    </article>
  );
}

function BookletGroup({ label, heading, booklets }: { label: string; heading: string; booklets: Booklet[] }) {
  return (
    <div>
      <div style={eyebrow}>{label}</div>
      <h3 style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.6vw, 26px)", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--ink)", margin: "8px 0 var(--s-4)" }}>
        {heading}
      </h3>
      <div style={{ display: "grid", gap: "var(--s-4)" }}>
        {booklets.map((b) => (
          <BookletCard key={b.slug} b={b} />
        ))}
      </div>
    </div>
  );
}

export default function HardIssuesSeries() {
  return (
    <Layout>
      <SEOMeta
        title="Free Booklets on Elders and Church Government"
        description="Free booklets for elders and church leaders on choosing deacons, church government, and bringing a major change to a church. PDF and EPUB."
        image={`${SITE_URL}/books/${BOOKLETS[0].slug}.jpg`}
        url={`${SITE_URL}/resources/hard-issues-series`}
        structuredData={hardIssuesSchema}
      />

      <InnerHead path="/resources/hard-issues-series" title="Free booklets for elders and church leaders" line="The Hard Issues Series." plate="books">
        <p className="pg-head__lede">Booklets for the men who carry the weight of leading a church.</p>
        <p className="pg-head__lede">
          Most of the damage in a church's leadership is done long before the crisis, in the quiet years when nobody decided how deacons are chosen, who makes which decision, or how a hard change gets brought to the people. These booklets are about that work: choosing deacons, building a structure that serves the church, and making a major change without losing people along the way.
        </p>
        <p className="pg-head__lede">Every one of these is free, as a PDF and as an EPUB. Nothing here asks you for an email address or a gift.</p>
        {HELD_BOOKLETS.length > 0 && (
          <p className="pg-head__lede">The booklets on eldership and two on leading change are off this page for now while their files are corrected.</p>
        )}
      </InnerHead>

      {/* THE BOOKLETS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div style={eyebrow}>The Collection</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "10px 0 8px" }}>
            All free, as a PDF and as an EPUB.
          </h2>
          <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-5)" }} />

          {ELDERSHIP.length > 0 && (
            <BookletGroup
              label="Part One · Eldership"
              heading="The men who lead the church"
              booklets={ELDERSHIP}
            />
          )}

          {GOVERNING.length > 0 && (
            <div style={{ marginTop: ELDERSHIP.length > 0 ? "var(--s-6)" : 0 }}>
              <BookletGroup
                label={ELDERSHIP.length > 0 ? "Part Two · Leading & Governing the Church" : "Leading & Governing the Church"}
                heading={HELD_BOOKLETS.length > 0 ? "Deacons, polity, and bringing a change to the church" : "Polity, deacons, and the work of leading change"}
                booklets={GOVERNING}
              />
            </div>
          )}
        </div>
      </section>

    </Layout>
  );
}
