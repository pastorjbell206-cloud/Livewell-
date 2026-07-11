import { Link } from "wouter";
import { SEOMeta } from "@/components/SEOMeta";

/**
 * 404 — the one page a lost reader lands on. It keeps the room: cream,
 * Cormorant, quiet. No alarm icons; a wrong turn is not an emergency.
 * Three real paths forward instead of a single "Go Home" dead end.
 */
export default function NotFound() {
  return (
    <>
      <SEOMeta title="Page Not Found" description="This page doesn't exist. The writing, the books, and the tools are still where they were." />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bone)",
          padding: "48px 24px",
        }}
      >
        <div style={{ maxWidth: "560px", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--U)",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mustard-text)",
              marginBottom: "20px",
            }}
          >
            404
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontWeight: 400,
              fontSize: "clamp(34px, 6vw, 52px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              margin: "0 0 20px",
            }}
          >
            There is no page here.
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "17px",
              lineHeight: 1.7,
              color: "var(--ink-muted)",
              margin: "0 0 36px",
            }}
          >
            The address may have changed, or the link was wrong. Nothing is
            lost — the writing, the books, and the tools are all still where
            they were.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <Link
              href="/"
              style={{
                fontFamily: "var(--U)",
                fontSize: "14px",
                fontWeight: 500,
                background: "var(--mustard)",
                color: "var(--ink)",
                padding: "12px 24px",
                borderRadius: "3px",
                textDecoration: "none",
              }}
            >
              Back to the front page
            </Link>
            <Link
              href="/explore"
              style={{
                fontFamily: "var(--U)",
                fontSize: "14px",
                fontWeight: 500,
                border: "1px solid var(--border)",
                color: "var(--ink)",
                padding: "12px 24px",
                borderRadius: "3px",
                textDecoration: "none",
              }}
            >
              Browse everything
            </Link>
            <Link
              href="/writing"
              style={{
                fontFamily: "var(--U)",
                fontSize: "14px",
                fontWeight: 500,
                border: "1px solid var(--border)",
                color: "var(--ink)",
                padding: "12px 24px",
                borderRadius: "3px",
                textDecoration: "none",
              }}
            >
              The essays
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
