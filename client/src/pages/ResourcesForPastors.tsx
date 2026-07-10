/**
 * ResourcesForPastors — the strategic page that should grow with the PCN
 * library. Was hardcoded to a single resource; now queries the DB so admins
 * can publish new resources without a redeploy.
 *
 * Categorization heuristic: any resource whose category mentions "pastor",
 * "ministry", "leadership", or "sermon" is considered pastor-facing. The
 * fully-typed solution is to add an `audience` enum column to resources;
 * until that migration, the heuristic is good enough.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";
import { BookOpen, Download, FileText } from "lucide-react";

const RESOURCES_HERO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/pastors-network-DhRzFbE8YzSg9o7MLtigko.webp";

const PASTOR_CATEGORY_RE = /pastor|ministry|leadership|sermon|preach|trench/i;

export default function ResourcesForPastors() {
  const { data: resources, isLoading } =
    trpc.resources.listPublished.useQuery();

  const pastorResources =
    resources?.filter(r =>
      r.category ? PASTOR_CATEGORY_RE.test(r.category) : false
    ) ?? [];

  return (
    <>
      <SEOMeta
        title="Resources for Pastors"
        description="Free downloadable resources for pastors and church leaders — guides, sermon collections, and tools for the work."
        keywords="pastor resources, ministry tools, sermon resources, leadership guides"
      />
      <Layout>
        {/* HERO */}
        <section
          style={{
            position: "relative",
            minHeight: "44vh",
            overflow: "hidden",
            background: "var(--charcoal)",
          }}
        >
          <img
            src={RESOURCES_HERO}
            alt=""
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.45,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, var(--charcoal) 0%, rgba(26,26,26,0.6) 60%, rgba(26,26,26,0.25) 100%)",
            }}
          />
          <div
            style={{
              position: "relative",
              maxWidth: "var(--w-default)",
              margin: "0 auto",
              padding: "var(--s-7) var(--s-4) var(--s-6)",
              color: "var(--bone)",
            }}
          >
            <div className="eyebrow" style={{ marginBottom: "16px" }}>
              For Pastors
            </div>
            <h1
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(40px, 5vw, 60px)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "20px",
                maxWidth: "20ch",
              }}
            >
              Tools for the work.
            </h1>
            <p
              style={{
                fontFamily: "var(--B)",
                fontSize: "18px",
                lineHeight: 1.7,
                maxWidth: "55ch",
                color: "rgba(245,240,230,0.78)",
              }}
            >
              Sermon collections, leadership guides, and pastoral resources —
              free, downloadable, written for the pastor who is actually doing
              the work.
            </p>
          </div>
        </section>

        {/* LIST */}
        <section
          style={{
            background: "var(--bone)",
            padding: "var(--s-7) var(--s-4)",
          }}
        >
          <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
            {isLoading && (
              <p
                style={{
                  fontFamily: "var(--U)",
                  color: "var(--ink-muted)",
                  textAlign: "center",
                  padding: "var(--s-5) 0",
                }}
              >
                Loading resources…
              </p>
            )}

            {!isLoading && pastorResources.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "var(--s-6) 0",
                  fontFamily: "var(--B)",
                  fontSize: "16px",
                  color: "var(--ink-muted)",
                }}
              >
                <p>Resources are being prepared. Check back soon.</p>
              </div>
            )}

            {pastorResources.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "var(--s-4)",
                }}
              >
                {pastorResources.map(resource => (
                  <article
                    key={resource.id}
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderLeft: "2px solid var(--mustard)",
                      borderRadius: "var(--radius-sm)",
                      padding: "var(--s-4)",
                    }}
                  >
                    <header
                      style={{
                        display: "flex",
                        gap: "16px",
                        alignItems: "flex-start",
                        marginBottom: "16px",
                      }}
                    >
                      <BookOpen
                        size={28}
                        aria-hidden
                        style={{ color: "var(--mustard)", flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {resource.category && (
                          <div className="eyebrow" style={{ marginBottom: "8px" }}>
                            {resource.category}
                          </div>
                        )}
                        <h2
                          style={{
                            fontFamily: "var(--F)",
                            fontSize: "26px",
                            fontWeight: 500,
                            color: "var(--ink)",
                            letterSpacing: "-0.01em",
                            marginBottom: "8px",
                          }}
                        >
                          {resource.title}
                        </h2>
                        {resource.description && (
                          <p
                            style={{
                              fontFamily: "var(--B)",
                              fontSize: "15px",
                              lineHeight: 1.65,
                              color: "var(--ink-muted)",
                              maxWidth: "65ch",
                            }}
                          >
                            {resource.description}
                          </p>
                        )}
                      </div>
                    </header>
                    {resource.url && (
                      <a
                        href={resource.url}
                        download
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "10px",
                          background: "var(--ink)",
                          color: "var(--bone)",
                          fontFamily: "var(--U)",
                          fontSize: "13px",
                          fontWeight: 600,
                          padding: "12px 22px",
                          borderRadius: "var(--radius-sm)",
                          textDecoration: "none",
                          transition: "background 0.2s",
                        }}
                      >
                        <FileText size={14} aria-hidden />
                        Download {resource.fileType || "File"}
                        <Download size={14} aria-hidden />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            )}

            {/* Coming Soon block — preserved from the previous version */}
            <div
              style={{
                marginTop: "var(--s-6)",
                paddingTop: "var(--s-6)",
                borderTop: "1px solid var(--border)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "28px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                  marginBottom: "6px",
                }}
              >
                Ready to hand your people this week
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", marginBottom: "24px", maxWidth: "60ch" }}>
                Finished curriculum you can print or forward today — each with a leader&rsquo;s guide and a participant handout, or a full preaching arc, free to use in your church.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
                  gap: "24px",
                }}
              >
                <ResourceCard
                  href="/studyguides"
                  title="Small-group study guides"
                  description="Teach through anxiety, doubt, deconstruction, Christian nationalism, and more — a leader's guide and participant handout for each, as printable PDFs."
                />
                <ResourceCard
                  href="/leadership/sermon-series"
                  title="Ready-to-preach sermon series"
                  description="Twelve complete series — Jonah, Ruth, James, Philippians, Mark, the Sermon on the Mount, and more — each a downloadable arc you can carry into the pulpit."
                />
                <ResourceCard
                  href="/table"
                  title="The Table: disciple-making at home"
                  description="A full small-group, disciple-making curriculum built for ordinary Christians to use around a table. Yours to run freely."
                />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

function ResourceCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderLeft: "3px solid var(--mustard)",
        borderRadius: "var(--radius-sm)",
        padding: "24px",
        textDecoration: "none",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--F)",
          fontSize: "20px",
          fontWeight: 500,
          color: "var(--ink)",
          marginBottom: "12px",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: "14px",
          color: "var(--ink-muted)",
          lineHeight: 1.65,
          marginBottom: "12px",
        }}
      >
        {description}
      </p>
      <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>
        Open the library &rarr;
      </span>
    </Link>
  );
}
