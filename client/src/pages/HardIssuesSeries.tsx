/**
 * The Hard Issues Series: a free collection of ten booklets in two parts,
 * Part One on eldership, Part Two on leading and governing the church.
 *
 * Self-contained (not DB-backed) so it deploys with the code. The booklets
 * are FREE; both the PDF and EPUB download directly from /ebook/<slug>/...
 * The page asks for no gift and names no outside network (James,
 * 2026-11-17: no giving, and the pastors' network stays off this site).
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import { Download } from "lucide-react";
import { BOOKLETS, type Booklet } from "@/data/booklets";

const ELDERSHIP = BOOKLETS.filter((b) => b.group === "eldership");
const GOVERNING = BOOKLETS.filter((b) => b.group === "governing");

// ItemList so the ten free booklets are indexed as one named series (each item
// points at its downloadable PDF, which is the actual resource).
const hardIssuesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "The Hard Issues Series",
  description:
    "Ten free booklets for church leaders on eldership and church governance.",
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
        description="Ten free booklets for the men who lead the church: five on eldership and five on governing the local church. Free PDF and EPUB."
        image={`${SITE_URL}/books/${BOOKLETS[0].slug}.jpg`}
        url={`${SITE_URL}/resources/hard-issues-series`}
        structuredData={hardIssuesSchema}
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={{ ...eyebrow, color: "var(--mustard)" }}>Free for Church Leaders</div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(34px, 5.2vw, 56px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: "16px 0 18px",
              maxWidth: "20ch",
            }}
          >
            Free booklets for elders and church leaders
          </h1>
          <p className="page-standfirst">The Hard Issues Series.</p>
          <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 28px", maxWidth: "52ch" }}>
            Ten booklets for the men who carry the weight of leading a church.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,230,.82)", maxWidth: "62ch" }}>
            <p style={{ margin: "0 0 1.2em" }}>
              An elder board does not fail in the crisis. It fails long before the crisis, in the quiet years when no one decided what the job actually was, who was fit to hold it, or how a man is found and made ready to carry it. The first five booklets help elder teams do that hard work before the hard day arrives — and face the hardest days, disagreement and removal, without tearing a church in two. The next five turn to the wider work of leading and governing: deacons, polity, and the patient art of changing what a church believes it can never change.
            </p>
            <p style={{ margin: 0 }}>
              Every one of these is free, as a PDF and as an EPUB. Nothing here asks you for an email address or a gift.
            </p>
          </div>
        </div>
      </section>

      {/* THE BOOKLETS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div style={eyebrow}>The Collection</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "10px 0 8px" }}>
            Ten booklets. All free. PDF and EPUB.
          </h2>
          <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-5)" }} />

          <BookletGroup
            label="Part One · Eldership"
            heading="The men who lead the church"
            booklets={ELDERSHIP}
          />

          <div style={{ marginTop: "var(--s-6)" }}>
            <BookletGroup
              label="Part Two · Leading & Governing the Church"
              heading="Polity, deacons, and the work of leading change"
              booklets={GOVERNING}
            />
          </div>
        </div>
      </section>

    </Layout>
  );
}
