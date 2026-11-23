/**
 * When God Bless America: the book's own page, with its free download (James,
 * 2026-11-18: every ebook is free). The PDF and EPUB are static files under
 * /ebook/when-god-bless-america/ (the folder keeps its name; the files were rebuilt under the new title on
 * 2026-11-23 and their old names redirect), listed in data/ebooks.ts. The old Stripe link and its
 * /thank-you page are gone; the thank-you address redirects to /downloads.
 */
import Layout from "@/components/Layout";
import Place from "@/components/art/Place";
import { SEOMeta } from "@/components/SEOMeta";
import { BookNextSteps } from "@/components/BookNextSteps";
import { FreeEbookButtons, earlierLine } from "@/components/FreeEbookButtons";
import { freeEbook } from "@/data/ebooks";
import { OfferLine, OfferMeta, useEbookLabel } from "@/components/BookOffer";
import { AUTHOR_BIO, SITE_URL } from "@/lib/site";

const COVER = "/covers/when-god-bless-america-800.webp";
const SHARE = "/covers/when-god-bless-america.jpg";
const EBOOK = freeEbook("a-higher-allegiance")!;
const EARLIER = earlierLine(EBOOK);

const CHAPTERS: [string, string][] = [
  ["Introduction", "Not Persecuted—Seduced"],
  ["One", "Zanah: When You Keep the Vows and Give Away the Heart"],
  ["Two", "Chariots Aren’t Evil—But They Aren’t Ultimate"],
  ["Three", "The Messiah You Want vs. the Messiah You Need"],
  ["Four", "“Jesus Is Lord”—The Most Dangerous Sentence in the Empire"],
  ["Five", "Civil Religion: When a Nation Borrows Sacred Words"],
  ["Six", "How Christian Nationalism Quietly Rewrites Doctrine"],
  ["Seven", "Constantine’s Bargain: Protection and Its Price"],
  ["Eight", "Germany’s Warning: Baptized Nationalism and Moral Catastrophe"],
  ["Nine", "The Generational Cost: When Hypocrisy Makes the Gospel Unbelievable"],
  ["Ten", "Cross and Sword: Two Theologies of Power"],
  ["Conclusion", "Repent, Not Retreat"],
  ["Afterword", "A Confession and an Invitation"],
];

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function WhenGodBlessAmerica() {
  const ebookLabel = useEbookLabel();
  return (
    <Layout>
      <SEOMeta
        title="A Higher Allegiance"
        description="A pastor's critique of political idolatry in the American church — from Scripture, from church history, and from inside the sanctuary. Available now as an ebook."
        image={`${SITE_URL}${SHARE}`}
        url={`${SITE_URL}/books/a-higher-allegiance`}
        type="book"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4)" }}>
        <div className="book-detail-hero" style={{ maxWidth: "var(--w-content)", margin: "0 auto", display: "grid", gap: "var(--s-5)", alignItems: "center" }}>
          <img
            src={COVER}
            alt="Cover of A Higher Allegiance"
            width={800} height={1200}
            style={{ width: "100%", height: "auto", borderRadius: "var(--radius-sm)", boxShadow: "0 16px 48px rgba(0,0,0,.45)" }}
          />
          <div>
            <Place path="/books/a-higher-allegiance" after={ebookLabel} dark style={{ margin: 0 }} />
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "16px 0 12px" }}>
              A Higher Allegiance
            </h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>
              Reclaiming Jesus from American Politics
            </p>
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,240,230,.7)", margin: "0 0 12px" }}>
              James Bell
            </p>
            {EARLIER && (
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--charcoal-fg-muted)", margin: "0 0 28px" }}>{EARLIER}</p>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
              <FreeEbookButtons title={EBOOK.title} pdf={EBOOK.pdf} epub={EBOOK.epub} band="charcoal" />
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "rgba(245,240,230,.65)" }}>
                <OfferMeta pdf={EBOOK.pdf} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PITCH */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "26px", lineHeight: 1.4, color: "var(--ink)", margin: "0 0 28px" }}>
            American Christianity is not mainly being persecuted. It is being seduced.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>
              Many believers have quietly begun to place their practical trust in power, policy, and national strength rather than in Christ. The language of faith is still there, and so are the rituals and the worship, but the heart has moved.
            </p>
            <p style={{ margin: "0 0 1.2em" }}>
              In <em>A Higher Allegiance</em>, James Bell writes to the church in America as a pastor inside it, drawing on Scripture, church history, and what he has watched happen in his own sanctuary. He exposes how patriotism can become practical salvation, how fear can rewrite doctrine, and how the cross confronts every attempt to turn Jesus into a mascot for political power.
            </p>
            <p style={{ margin: 0, fontWeight: 600 }}>
              This book won't tell you who to vote for. It asks who you worship.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENTS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={eyebrow}>What’s Inside</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 500, color: "var(--ink)", margin: "10px 0 28px" }}>
            Thirteen movements, from Hosea to the cross
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

      {/* BUY + BIO */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 400, margin: "0 0 14px" }}>
            Read it now
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,.8)", maxWidth: "52ch", margin: "0 auto 28px" }}>
            <OfferLine />
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <FreeEbookButtons title={EBOOK.title} pdf={EBOOK.pdf} epub={EBOOK.epub} band="charcoal" />
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.7, color: "rgba(245,240,230,.6)", maxWidth: "56ch", margin: "44px auto 0", borderTop: "1px solid rgba(245,240,230,.18)", paddingTop: "28px" }}>
            {AUTHOR_BIO}
          </p>
        </div>
      </section>

      <BookNextSteps
        slug="a-higher-allegiance"
        related={[
          { href: "/books/blind-spots", title: "Blind Spots" },
          { href: "/books/critical-race-theory-biblical", title: "Is Critical Race Theory Biblical?" },
          { href: "/books/deconstruction-of-faith", title: "The Deconstruction of Faith" },
        ]}
      />
    </Layout>
  );
}
