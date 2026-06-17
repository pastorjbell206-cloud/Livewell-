/**
 * Where Your Treasure Is — dedicated ebook product + purchase page (LiveWell series).
 *
 * Self-contained (not DB-backed) so it deploys with the code. The Buy button
 * calls /api/checkout, which creates a Stripe Checkout Session and redirects to
 * Stripe-hosted checkout. On success Stripe returns to /where-your-treasure-is/thank-you,
 * where the PDF download is unlocked only after the paid session is verified —
 * the file is never exposed at a public URL.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { BuyEbookButton } from "@/components/BuyEbookButton";
import { SITE_URL } from "@/lib/site";
import { Link } from "wouter";

const SLUG = "where-your-treasure-is";
const COVER = "/books/where-your-treasure-is.jpg";
const TITLE = "Where Your Treasure Is";
const SUBTITLE = "What the Bible Says About Money, and the Heart It Means to Free";

const INSIDE: string[] = [
  "the rich fool and his barns (Luke 12)",
  "the rich young ruler who walked away sad, and the camel and the needle",
  "“you cannot serve God and mammon” — why Jesus named money a rival master",
  "the love of money in 1 Timothy 6, and biblical contentment",
  "the open-handed economy of the Jubilee, and the generosity that breaks mammon’s grip",
];

const PULL_QUOTES: string[] = [
  "Money is the one subject a congregation will forgive a pastor for nearly anything except raising. The flinch is information.",
  "We guard what we are afraid to lose.",
  "The treasure leads, and the heart follows it, the way a compass needle turns north whether or not you meant it to.",
  "Mammon does not check your balance before it goes to work on you. The pull is the same in a trailer and a penthouse.",
  "The closed fist can become an open hand — not by willpower, not by shame, but by moving the treasure to a place that cannot be lost.",
];

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function WhereYourTreasureIs() {
  return (
    <Layout>
      <SEOMeta
        title="Where Your Treasure Is: What the Bible Says About Money — by James Bell"
        description="What the Bible actually says about money — why Jesus called it mammon, and how generosity breaks its grip on the heart. An honest, pastoral look. Available now as an ebook."
        image={`${SITE_URL}${COVER}`}
        url={`${SITE_URL}/${SLUG}`}
        type="book"
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
            Jesus talked about money more than he talked about heaven, and far more than he talked about hell. We have quietly agreed not to notice.
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)" }}>
            <p style={{ margin: "0 0 1.2em" }}>
              The Bible’s first concern about money is not how much you have, or even what you do with it. It is what it is doing to you. Because money, in the teaching of Jesus, is never only a tool. He gives it a name — mammon — and treats it as a rival master, a power that wants not your spare change but your allegiance.
            </p>
            <p style={{ margin: "0 0 1.2em" }}>
              In <em>Where Your Treasure Is</em>, pastor and former atheist James Bell refuses both lies the church has told about money: that God is a means to wealth, and that wealth itself is the sin. Working from the Greek and the actual texts — and engaging Augustine, Basil, Chrysostom, Wesley, and Weber in plain words — he tells the truth about a power, and offers to set you free from it.
            </p>
            <p style={{ margin: 0, fontWeight: 600 }}>
              It will not make you feel guilty for having, or ashamed for wanting. It will offer you an open hand. Move the treasure, and the heart will follow it home.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={eyebrow}>What’s Inside</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "30px", fontWeight: 500, color: "var(--ink)", margin: "10px 0 28px" }}>
            Walk slowly through the money teaching of Scripture
          </h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {INSIDE.map((item, i) => (
              <li key={i} style={{ display: "flex", gap: "16px", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, color: "var(--mustard-text)", flex: "0 0 28px", paddingTop: "4px" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ fontFamily: "var(--F)", fontSize: "19px", color: "var(--ink)", lineHeight: 1.3 }}>{item}</span>
              </li>
            ))}
          </ul>
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
          <Link href="/consider-the-birds" style={{ textDecoration: "none", color: "inherit", display: "inline-flex", gap: "20px", alignItems: "center", background: "var(--bone)", padding: "18px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
            <img src="/books/consider-the-birds.jpg" alt="Consider the Birds — cover" width={120} height={192}
              style={{ width: "72px", height: "auto", borderRadius: "2px", boxShadow: "0 8px 24px rgba(0,0,0,.25)", flex: "0 0 auto" }} />
            <span>
              <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "22px", color: "var(--ink)", lineHeight: 1.15 }}>Consider the Birds</span>
              <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", margin: "4px 0 8px" }}>What the Bible Says About Anxiety, and the Peace Christ Gives Instead</span>
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
            James Bell is the Lead Pastor of First Baptist Church of Fenton, founder of the Pastors Connection Network, and the author of more than twenty books. He came to faith from atheism and writes for the reader whose faith has outgrown the answers they were given.
          </p>
        </div>
      </section>
    </Layout>
  );
}
