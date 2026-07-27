/**
 * FollowJames — the one block that says where else James publishes.
 *
 * A reader who finishes something good should not have to hunt for the rest of
 * it. This gathers the newsletter, the books, and the social channels in one
 * place, in plain language about what each one actually gives you.
 *
 * It renders only channels with a real URL (see lib/channels.ts). A platform
 * James has mentioned but not yet linked simply does not appear — no dead
 * icons, no "coming soon".
 */
import { Link } from "wouter";
import { liveChannels } from "@/lib/channels";

const tile = {
  display: "block",
  textDecoration: "none",
  background: "rgba(245,240,230,0.06)",
  border: "1px solid rgba(245,240,230,0.16)",
  borderRadius: "var(--radius-sm)",
  padding: "18px 20px",
} as const;

const tileTitle = {
  fontFamily: "var(--F)",
  fontSize: "20px",
  fontWeight: 500,
  color: "var(--bone)",
  marginBottom: "6px",
  lineHeight: 1.2,
} as const;

const tileBlurb = {
  fontFamily: "var(--B)",
  fontSize: "13.5px",
  lineHeight: 1.6,
  color: "rgba(245,240,230,0.72)",
  margin: 0,
} as const;

export default function FollowJames({
  heading = "Where else to find James",
  blurb = "The writing does not only live here. Everything below is the same voice, in a different room.",
}: {
  heading?: string;
  blurb?: string;
}) {
  const channels = liveChannels();

  return (
    <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)" }}>
      <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
        <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>
          Follow the writing
        </div>
        <h2
          style={{
            fontFamily: "var(--F)",
            fontSize: "clamp(24px, 3.4vw, 34px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "8px",
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            fontFamily: "var(--B)",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "rgba(245,240,230,0.78)",
            maxWidth: "60ch",
            marginBottom: "var(--s-5)",
          }}
        >
          {blurb}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
            gap: "14px",
          }}
        >
          {/* The site's own two: everything written, and the books. */}
          <Link href="/writing" style={tile}>
            <div style={tileTitle}>All the writing</div>
            <p style={tileBlurb}>Every essay, searchable, filed by subject.</p>
          </Link>
          <Link href="/books" style={tile}>
            <div style={tileTitle}>The books</div>
            <p style={tileBlurb}>Twenty-one titles, several readable free in full.</p>
          </Link>

          {channels.map((c) => (
            <a
              key={c.id}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              style={tile}
            >
              <div style={tileTitle}>{c.label}</div>
              <p style={tileBlurb}>{c.blurb}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
