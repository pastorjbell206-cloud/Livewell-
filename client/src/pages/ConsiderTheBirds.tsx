/**
 * Consider the Birds — dedicated ebook product + purchase page (LiveWell series).
 *
 * Self-contained (not DB-backed) so it deploys with the code. The Buy button
 * calls /api/checkout, which creates a Stripe Checkout Session and redirects to
 * Stripe-hosted checkout. On success Stripe returns to /consider-the-birds/thank-you,
 * where the PDF download is unlocked only after the paid session is verified —
 * the file is never exposed at a public URL.
 */
import Layout from "@/components/Layout";
import { SEOMeta, getBreadcrumbSchema } from "@/components/SEOMeta";
import { BuyEbookButton } from "@/components/BuyEbookButton";
import { AUTHOR_BIO, SITE_URL } from "@/lib/site";
import { Link } from "wouter";

const SLUG = "consider-the-birds";
const COVER = "/books/consider-the-birds.jpg";
const TITLE = "Consider the Birds";
const SUBTITLE = "What the Bible Says About Anxiety, and the Peace Christ Gives Instead";

const CHAPTERS: [string, string][] = [
  ["Introduction", "Three in the Morning"],
  ["One", "The Pull in Two Directions"],
  ["Two", "Consider the Birds"],
  ["Three", "The Refusal to Be a Creature"],
  ["Four", "The Manna and the Jar"],
  ["Five", "The Body and the Soul"],
  ["Six", "The God Who Counts Hairs"],
  ["Seven", "The Tyranny of the Possible"],
  ["Eight", "Cast"],
  ["Nine", "The Peace That Will Not Explain Itself"],
  ["Ten", "The Lie of the Self-Made Day"],
  ["Eleven", "The Love That Drives Out Fear"],
  ["Twelve", "The Communion of the Anxious"],
  ["Thirteen", "The Long Cure"],
  ["Fourteen", "The Birds Still Sing"],
];

const PULL_QUOTES: string[] = [
  "We are not anxious because we believe too little in God. We are anxious because we believe too much in ourselves.",
  "Anxiety is usually not a broken part. More often it’s a tell.",
  "A racing heart is not a sin. A panic attack is not unbelief.",
  "Manna was never meant to be stored. Grace never is.",
  "When Jesus says “do not be anxious,” he is not adding a new burden to a tired soul. He is offering to fire your second master.",
];

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function ConsiderTheBirds() {
  return (
    <Layout>
      <SEOMeta
        title="Consider the Birds: What the Bible Says About Anxiety — by James Bell"
        description="What the Bible actually says about anxiety: the Greek word Jesus used for worry, and the peace he offers instead. An honest look, now an ebook."
        image={`${SITE_URL}${COVER}`}
        url={`${SITE_URL}/${SLUG}`}
        type="book"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Book",
            name: TITLE,
            description: SUBTITLE,
            bookFormat: "https://schema.org/EBook",
            inLanguage: "en",
            author: { "@type": "Person", name: "James Bell", url: `${SITE_URL}/about` },
            publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
            image: `${SITE_URL}${COVER}`,
            url: `${SITE_URL}/${SLUG}`,
            offers: {
              "@type": "Offer",
              price: "9.99",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: `${SITE_URL}/${SLUG}`,
            },
          },
          getBreadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Books", url: `${SITE_URL}/books` },
            { name: TITLE, url: `${SITE_URL}/${SLUG}` },
          ]),
        ]}
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(220px, 320px) 1fr", gap: "var(--s-5)", alignItems: "center" }}>
          <img src={COVER} alt={`${TITLE} — cover`} width={1600} height={2560}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }} />
          <div>
            <div style={{ ...eyebrow, color: "var(--mustard)" }}>The LiveWell Series · Ebook Available Now</div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
              {TITLE}
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>
              {SUBTITLE}
            </p>
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,230,.7)", margin: "0 0 28px" }}>
              James Bell
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
              <BuyEbookButton slug={SLUG} />
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "rgba(245,240,230,.65)" }}>
                PDF · instant download · secure checkout by Stripe
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PITCH */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "26px", lineHeight: 1.4, color: "var(--ink)", margin: "0 0 28px" }}>
            Three in the morning. The house is quiet, everyone you love is asleep, and you are awake — holding up the world with your mind.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>
              You have been told two things about that hour, and both have failed you. That your worry is a sin you could stop if you only believed harder. And that it is only chemistry, a glitch in the machine, meaning nothing. Both are half a healing. Both leave you alone in the dark.
            </p>
            <p style={{ margin: "0 0 1.2em" }}>
              In <em>Consider the Birds</em>, pastor and former atheist James Bell takes the question seriously — and takes you seriously. Drawing on the Greek word Jesus used for worry, <em>merimna</em> (the soul pulled in two), he traces anxiety down to its root: not a wiring problem, but a worship problem — the ancient refusal to be a creature who is kept. It honors the doctor and the medicine, and refuses to stop there.
            </p>
            <p style={{ margin: 0, fontWeight: 600 }}>
              It does not promise the hour will never come again. It promises something better: that when it comes, it no longer means what you were afraid it meant.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={eyebrow}>Contents</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 500, color: "var(--ink)", margin: "10px 0 28px" }}>
            Fourteen chapters, from three in the morning to the birds at first light
          </h2>
          <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {CHAPTERS.map(([num, title], i) => (
              <li key={i} style={{ display: "flex", gap: "16px", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--mustard-text)", flex: "0 0 96px", paddingTop: "3px" }}>
                  {/^[A-Z]/.test(num) && num.length > 4 ? num : `Chapter ${num}`}
                </span>
                <span style={{ fontFamily: "var(--F)", fontSize: "19px", color: "var(--ink)", lineHeight: 1.3 }}>{title}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PULL QUOTES */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={eyebrow}>From the Book</div>
          <div style={{ marginTop: "24px", display: "grid", gap: "28px" }}>
            {PULL_QUOTES.map((q, i) => (
              <blockquote key={i} style={{ margin: 0, paddingLeft: "22px", borderLeft: "3px solid var(--mustard)" }}>
                <p style={{ fontFamily: "var(--F)", fontSize: "22px", fontStyle: "italic", lineHeight: 1.45, color: "var(--ink)", margin: 0 }}>
                  “{q.replace(/^“|”$/g, "")}”
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* SERIES CROSS-LINK */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div style={eyebrow}>The LiveWell Series</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 400, color: "var(--ink)", margin: "10px 0 8px" }}>
            Two books, one hinge
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", margin: "0 0 24px" }}>
            In Matthew 6, “you cannot serve God and money” comes one verse before “therefore do not be anxious.” The money teaching and the anxiety teaching are the same teaching. Read the other half.
          </p>
          <Link href="/where-your-treasure-is" style={{ textDecoration: "none", color: "inherit", display: "inline-flex", gap: "20px", alignItems: "center", background: "var(--bone)", padding: "18px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
            <img src="/books/where-your-treasure-is.jpg" alt="Where Your Treasure Is — cover" width={120} height={192}
              style={{ width: "72px", height: "auto", borderRadius: "2px", boxShadow: "0 8px 24px rgba(0,0,0,.25)", flex: "0 0 auto" }} />
            <span>
              <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "22px", color: "var(--ink)", lineHeight: 1.15 }}>Where Your Treasure Is</span>
              <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", margin: "4px 0 8px" }}>What the Bible Says About Money, and the Heart It Means to Free</span>
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>Read about it →</span>
            </span>
          </Link>
        </div>
      </section>

      {/* BUY + BIO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 400, margin: "0 0 14px" }}>Read it now</h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,.8)", maxWidth: "52ch", margin: "0 auto 28px" }}>
            $9.99 for the complete ebook — a PDF you can read on any device, delivered the moment you check out.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BuyEbookButton slug={SLUG} />
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,230,.6)", maxWidth: "56ch", margin: "44px auto 0", borderTop: "1px solid rgba(245,240,230,.18)", paddingTop: "28px" }}>
            {AUTHOR_BIO}
          </p>
        </div>
      </section>
    </Layout>
  );
}
