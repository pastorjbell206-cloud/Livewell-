/**
 * AuthorBio — appears at the end of every article.
 *
 * Voice is calibrated to CLAUDE.md: no "gospel-centered" without earning it,
 * no "journey," no therapy-speak. Self-implicating, weighted, unhurried.
 */
import { Link } from "wouter";
import { SITE_STATS } from "@/config/siteStats";

interface AuthorBioProps {
  author?: string;
  bio?: string;
  image?: string;
  showCta?: boolean;
}

const JAMES_BELL_BIO =
  `James Bell is Lead Pastor of First Baptist Church of Fenton and founder of the Pastors Connection Network. He came to faith from atheism, was raised without a father, and has five sons. Those last two facts shape everything he writes. He has been in ministry for over ${SITE_STATS.yearsInMinistryWord} years and is the author of ${SITE_STATS.bookCountWord} books.`;

const JAMES_BELL_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg";

export function AuthorBio({
  author = "James Bell",
  bio,
  image,
  showCta = true,
}: AuthorBioProps) {
  const isJamesBell =
    author.toLowerCase().includes("james") &&
    author.toLowerCase().includes("bell");
  const resolvedBio = bio ?? (isJamesBell ? JAMES_BELL_BIO : undefined);
  const resolvedImage = image ?? (isJamesBell ? JAMES_BELL_IMAGE : undefined);

  return (
    <aside
      aria-label={`About ${author}`}
      style={{
        background: "var(--bone-warm)",
        padding: "var(--s-5) var(--s-4)",
      }}
    >
      <div
        className="wrap"
        style={{
          maxWidth: "var(--w-prose)",
          margin: "0 auto",
          padding: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "var(--s-3)",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {resolvedImage && (
            <img
              src={resolvedImage}
              alt={author}
              width={96}
              height={128}
              loading="lazy"
              style={{
                width: "96px",
                height: "128px",
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: "var(--radius-sm)",
                flexShrink: 0,
              }}
            />
          )}
          <div style={{ flex: "1 1 280px", minWidth: 0 }}>
            <div
              style={{
                fontFamily: "var(--U)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--mustard-text)",
                marginBottom: "8px",
              }}
            >
              About the Author
            </div>
            <h3
              style={{
                fontFamily: "var(--F)",
                fontSize: "24px",
                fontWeight: 500,
                color: "var(--ink)",
                marginBottom: "12px",
                letterSpacing: "-0.01em",
              }}
            >
              {author}
            </h3>
            {resolvedBio && (
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "var(--ink-muted)",
                  marginBottom: showCta ? "20px" : 0,
                  maxWidth: "55ch",
                }}
              >
                {resolvedBio}
              </p>
            )}
            {showCta && isJamesBell && (
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link
                  href="/books"
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ink)",
                    borderBottom: "1px solid var(--mustard)",
                    paddingBottom: "2px",
                  }}
                >
                  Read his books →
                </Link>
                <Link
                  href="/about"
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--ink-muted)",
                    borderBottom: "1px solid var(--border)",
                    paddingBottom: "2px",
                  }}
                >
                  More about James
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default AuthorBio;
