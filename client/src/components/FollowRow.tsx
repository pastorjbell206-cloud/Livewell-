/**
 * FollowRow: the one "Follow James" line, read from lib/channels.ts
 * (followLinks). It sits in the footer of every page, on Home, at the top of
 * the essay shelf, at the top of /contact, and on /connect. Links only.
 *
 * The RSS link is a plain <a>: /rss.xml is a feed the server answers, not a
 * route in the app.
 */
import { Link } from "wouter";
import { followLinks } from "@/lib/channels";

export default function FollowRow({
  tone = "light",
  label = "Follow James",
  connect = true,
  style,
}: {
  /** "dark" on charcoal surfaces (the footer), "light" on cream. */
  tone?: "light" | "dark";
  label?: string;
  /** Also link the page that gathers everything (/connect). */
  connect?: boolean;
  style?: React.CSSProperties;
}) {
  const dark = tone === "dark";
  const strong = dark ? "var(--charcoal-fg)" : "var(--ink)";
  const link: React.CSSProperties = {
    color: strong,
    textDecoration: "underline",
    textDecorationColor: "var(--mustard)",
    textDecorationThickness: "1px",
    textUnderlineOffset: "4px",
    backgroundImage: "none",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    minHeight: "44px",
    // A short word ("RSS") still gets a full 44px target.
    minWidth: "44px",
  };
  return (
    <p
      className="follow-row"
      style={{
        fontFamily: "var(--U)",
        fontSize: "14px",
        lineHeight: 1.4,
        color: strong,
        margin: 0,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        columnGap: "16px",
        ...style,
      }}
    >
      <span style={{ fontWeight: 600 }}>{label}</span>
      {followLinks().map((l) => (
        <a
          key={l.id}
          href={l.href}
          style={link}
          {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...(l.id === "rss" ? { "aria-label": "RSS feed of the essays" } : {})}
        >
          {l.label}
        </a>
      ))}
      {connect && (
        <Link href="/connect" style={link}>
          Every way to find James
        </Link>
      )}
    </p>
  );
}
