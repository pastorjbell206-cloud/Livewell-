/**
 * /connect — everywhere James is, on one page.
 *
 * The "Follow the writing" block from the front page, given a room of its own:
 * the Library, the books, the tools, the downloads, working with James, and
 * every outside channel (lib/channels.ts), then the newsletter and a way to
 * write to him. Nothing here is invented: channels render only with a real
 * URL, and speaking requests go through the existing Work with James form.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import FollowJames from "@/components/FollowJames";
import { NewsletterSignup } from "@/components/NewsletterSignup";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function Connect() {
  return (
    <Layout>
      <SEOMeta
        title="Connect: Everywhere James Bell Writes and Speaks"
        description="Everywhere to find James Bell: the Library of essays and books, the newsletter, the Following the Way podcast, Facebook, speaking and pastoral coaching, and a direct line to write to him."
        url="https://www.livewellbyjamesbell.co/connect"
      />

      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "14px" }}>Connect</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.2rem, 5vw, 3.4rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.08, color: "var(--ink)", marginBottom: "14px" }}>
            Everywhere James is
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", margin: 0 }}>
            The essays and books live here. The newsletter, the podcast, and the daily notes live elsewhere. Same voice, different rooms.
          </p>
        </div>
      </section>

      <FollowJames heading="Every room, in one place" />

      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: "var(--s-5)", alignItems: "start" }}>
          <NewsletterSignup variant="inline" source="connect" />
          <div>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--ink)", margin: "0 0 10px" }}>
              Speaking, coaching, and a direct line
            </h2>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>
              For preaching, retreats, pastoral coaching, or church consulting, the Work with James page has the details and a form that reaches him directly.
            </p>
            <p style={{ margin: 0, display: "flex", flexWrap: "wrap", gap: "12px 20px", fontFamily: "var(--U)", fontSize: "14px" }}>
              <Link href="/work-with-james" style={{ color: "var(--ink)", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}>Work with James</Link>
              <a href="mailto:Pastorjbell206@gmail.com" style={{ color: "var(--ink)", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}>Email James</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
