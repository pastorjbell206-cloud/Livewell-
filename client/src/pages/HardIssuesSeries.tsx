/**
 * The Hard Issues Series — a free, donation-supported collection of five
 * eldership booklets from the Pastors Connection Network (PCN).
 *
 * Self-contained (not DB-backed) so it deploys with the code. The booklets
 * are FREE; both the PDF and EPUB download directly from /ebook/<slug>/...
 * A donation to PCN is optional. The "Support this work" button links to
 * DONATE_URL when a real Stripe link is set; otherwise it falls back to a
 * mailto, exactly as StripeBuyButton handles an unset payment link.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import { Download, Heart } from "lucide-react";

const DONATE_URL = ""; // TODO: Stripe donation link

interface Booklet {
  slug: string;
  title: string;
  subtitle: string;
  note: string;
  pdf: string;
  epub: string;
}

const BOOKLETS: Booklet[] = [
  {
    slug: "what-elders-are-for",
    title: "What Elders Are For",
    subtitle: "A Biblical Job Description for the Men Who Lead the Church",
    note: "Before a team can lead well, it has to know what it was made to do.",
    pdf: "/ebook/what-elders-are-for/What-Elders-Are-For.pdf",
    epub: "/ebook/what-elders-are-for/What-Elders-Are-For.epub",
  },
  {
    slug: "qualified-elder",
    title: "Qualified",
    subtitle:
      "Understanding the Elder Qualifications of 1 Timothy 3 and Titus 1 in Real Church Life",
    note: "The qualifications are not a checklist. They are a portrait of a man you would follow.",
    pdf: "/ebook/qualified-elder/Qualified.pdf",
    epub: "/ebook/qualified-elder/Qualified.epub",
  },
  {
    slug: "finding-installing-elders",
    title: "Finding and Installing Elders",
    subtitle: "A Process for Identifying, Developing, and Commissioning Men to Lead",
    note: "Character is grown, not discovered. Here is how a church does the growing.",
    pdf: "/ebook/finding-installing-elders/Finding-and-Installing-Elders.pdf",
    epub: "/ebook/finding-installing-elders/Finding-and-Installing-Elders.epub",
  },
  {
    slug: "when-elders-disagree",
    title: "When Elders Disagree",
    subtitle: "Handling Conflict, Dissent, and Division on the Elder Team",
    note: "A board that never disagrees is not unified. It is asleep.",
    pdf: "/ebook/when-elders-disagree/When-Elders-Disagree.pdf",
    epub: "/ebook/when-elders-disagree/When-Elders-Disagree.epub",
  },
  {
    slug: "removing-an-elder",
    title: "Removing an Elder",
    subtitle: "The Most Difficult Act of Church Leadership — Done Biblically",
    note: "The work no one wants. Done wrong, it splits a church. Here it is done right.",
    pdf: "/ebook/removing-an-elder/Removing-an-Elder.pdf",
    epub: "/ebook/removing-an-elder/Removing-an-Elder.epub",
  },
];

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)",
  fontSize: "0.75rem",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  color: "var(--mustard-text)",
};

const donateActive = DONATE_URL.startsWith("https://");
const DONATE_HREF = donateActive
  ? DONATE_URL
  : "mailto:Pastorjbell206@gmail.com?subject=Supporting%20the%20Hard%20Issues%20Series%20(PCN)";
const DONATE_LABEL = donateActive ? "Support this work — give a gift to PCN" : "Support this work — ask how to give";

function DonateButton({ onDark }: { onDark?: boolean }) {
  return (
    <a
      href={DONATE_HREF}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        fontFamily: "var(--U)",
        fontWeight: 600,
        fontSize: "15px",
        padding: "15px 30px",
        borderRadius: "var(--radius-sm)",
        background: "var(--mustard)",
        color: "var(--ink)",
        textDecoration: "none",
        border: onDark ? "none" : "1px solid rgba(20,17,12,0.08)",
      }}
    >
      <Heart size={16} aria-hidden />
      {DONATE_LABEL}
    </a>
  );
}

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

export default function HardIssuesSeries() {
  return (
    <Layout>
      <SEOMeta
        title="The Hard Issues Series — Free Eldership Booklets from PCN"
        description="Five free booklets for elder teams on what elders are for, the biblical qualifications, finding and installing elders, handling disagreement, and removing an elder. Free PDF and EPUB from the Pastors Connection Network."
        image={`${SITE_URL}/books/${BOOKLETS[0].slug}.jpg`}
        url={`${SITE_URL}/resources/hard-issues-series`}
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={{ ...eyebrow, color: "var(--mustard)" }}>Pastors Connection Network · Free for Church Leaders</div>
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
            The Hard Issues Series
          </h1>
          <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 28px", maxWidth: "52ch" }}>
            Five booklets for the men who carry the weight of leading a church.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,230,.82)", maxWidth: "62ch" }}>
            <p style={{ margin: "0 0 1.2em" }}>
              An elder board does not fail in the crisis. It fails long before the crisis, in the quiet years when no one decided what the job actually was, who was fit to hold it, or how a man is found and made ready to carry it. This series exists to help elder teams do that hard work before the hard day arrives — and to face the hardest days, disagreement and removal, without tearing a church in two.
            </p>
            <p style={{ margin: "0 0 28px" }}>
              These are given freely to pastors and the men who lead with them. That is the whole point of the Pastors Connection Network: to strengthen the men who lead churches, and to put what they need in their hands without a price standing in the way. If the work has served you, you can return the gift below. You are not required to. The booklets are yours either way.
            </p>
          </div>
          <DonateButton onDark />
        </div>
      </section>

      {/* THE FIVE BOOKLETS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div style={eyebrow}>The Collection</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "10px 0 8px" }}>
            Five booklets. All free. PDF and EPUB.
          </h2>
          <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-5)" }} />

          <div style={{ display: "grid", gap: "var(--s-4)" }}>
            {BOOKLETS.map((b) => (
              <article
                key={b.slug}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(120px, 180px) 1fr",
                  gap: "var(--s-4)",
                  alignItems: "start",
                  background: "#FFFFFF",
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
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)", textAlign: "center" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={{ ...eyebrow, color: "var(--mustard)" }}>Optional</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", margin: "10px 0 16px" }}>
            Keep this free for the next pastor
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "rgba(245,240,230,.8)", maxWidth: "56ch", margin: "0 auto 28px" }}>
            The Pastors Connection Network gives this work away so cost never stands between a leader and what he needs. A gift keeps it that way and helps put the next booklet in the next man's hands. Give if you can. The downloads stay free no matter what.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DonateButton onDark />
          </div>
          {!donateActive && (
            <p style={{ fontFamily: "var(--U)", fontSize: "12px", letterSpacing: "0.04em", color: "rgba(245,240,230,.55)", margin: "18px 0 0" }}>
              Online giving is coming soon. Reach out and we will tell you how.
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}
