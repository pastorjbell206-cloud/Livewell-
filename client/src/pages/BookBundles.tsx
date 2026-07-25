import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  ShoppingCart,
  Gift,
  Check,
  Users,
  HeartPulse,
  Home,
  Scale,
  RefreshCw,
  Library,
  type LucideIcon,
} from "lucide-react";

interface BookInBundle {
  id: number;
  title: string;
  author: string;
  cover?: string;
}

interface BookBundle {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  regularPrice: number;
  bundlePrice: number;
  savings: number;
  books: BookInBundle[];
}

const BUNDLES: BookBundle[] = [
  {
    id: "1",
    title: "Church Leadership Essentials",
    description: "Everything a pastor needs to know about leadership, governance, and vision",
    Icon: Users,
    regularPrice: 59.97,
    bundlePrice: 39.99,
    savings: 19.98,
    books: [
      { id: 1, title: "What Elders Are For", author: "James Bell" },
      { id: 2, title: "Qualified", author: "James Bell" },
      { id: 3, title: "Finding and Installing Elders", author: "James Bell" },
      { id: 4, title: "When Elders Disagree", author: "PCN" },
    ],
  },
  {
    id: "2",
    title: "Pastoral Health & Wellness",
    description: "Protect your health, prevent burnout, and sustain your calling",
    Icon: HeartPulse,
    regularPrice: 49.97,
    bundlePrice: 29.99,
    savings: 19.98,
    books: [
      { id: 5, title: "The Patient Pastor", author: "PCN" },
      { id: 6, title: "The Hidden Life", author: "PCN" },
      { id: 7, title: "Mind, Body, Soul", author: "PCN" },
    ],
  },
  {
    id: "3",
    title: "Marriage & Family in Ministry",
    description: "Strengthen your marriage and protect your family while serving",
    Icon: Home,
    regularPrice: 39.98,
    bundlePrice: 24.99,
    savings: 14.99,
    books: [
      { id: 8, title: "The Honest Marriage", author: "James Bell" },
      { id: 9, title: "The Pastor's Family", author: "LiveWell" },
      { id: 10, title: "Staying", author: "James Bell" },
    ],
  },
  {
    id: "4",
    title: "Complete Governance Bundle",
    description: "Master church governance, deacons, and organizational health",
    Icon: Scale,
    regularPrice: 69.97,
    bundlePrice: 44.99,
    savings: 24.98,
    books: [
      { id: 11, title: "What Deacons Actually Do", author: "PCN" },
      { id: 12, title: "Deacon Qualifications & Selection", author: "PCN" },
      { id: 13, title: "Church Governance That Works", author: "PCN" },
      { id: 14, title: "Solo Pastor and His Board", author: "PCN" },
    ],
  },
  {
    id: "5",
    title: "Change Management Series",
    description: "Lead change in your church without losing people or your mind",
    Icon: RefreshCw,
    regularPrice: 39.98,
    bundlePrice: 24.99,
    savings: 14.99,
    books: [
      { id: 15, title: "Change Without Casualties", author: "PCN" },
      { id: 16, title: "Changing the Unchangeable", author: "PCN" },
    ],
  },
  {
    id: "6",
    title: "Complete James Bell Collection",
    description: "All of James Bell's books - the complete works",
    Icon: Library,
    regularPrice: 149.95,
    bundlePrice: 89.99,
    savings: 59.96,
    books: [
      { id: 17, title: "What Elders Are For", author: "James Bell" },
      { id: 18, title: "Qualified", author: "James Bell" },
      { id: 19, title: "Finding and Installing Elders", author: "James Bell" },
      { id: 20, title: "When God Bless America Replaces Thy Kingdom Come", author: "James Bell" },
      { id: 21, title: "The Monster in the Mirror", author: "James Bell" },
      { id: 22, title: "The Honest Marriage", author: "James Bell" },
      { id: 23, title: "Staying", author: "James Bell" },
    ],
  },
];

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

const WHY_BUNDLES = [
  "Save up to 40% compared to buying books individually",
  "Curated collections on specific topics for focused study",
  "Made for small groups, church libraries, or personal reading",
  "Lifetime access to every book in your bundle",
];

export function BookBundles() {
  return (
    <Layout>
      <SEOMeta
        title="Book Bundles — Curated Collections | James Bell"
        description="Save up to 40% when you buy James Bell and PCN books together. Curated collections on leadership, pastoral health, marriage, governance, and change."
        url={`${SITE_URL}/book-bundles`}
      />

      {/* Hero — dark section */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <Breadcrumb items={[{ label: "Books" }, { label: "Bundles" }]} className="mb-6" />
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>The Bundles</div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(36px, 6vw, 60px)",
              fontWeight: 400,
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              marginBottom: "18px",
              maxWidth: "18ch",
            }}
          >
            Buy them together. Pay less.
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "18px",
              lineHeight: 1.75,
              color: "rgba(245,240,230,0.82)",
              maxWidth: "62ch",
            }}
          >
            Save up to 40% when you buy these books as a set. Each bundle gathers the titles that belong to one
            subject into a single collection, built for the pastor who needs the whole picture, not a piece of it.
          </p>
        </div>
      </section>

      {/* Bundles grid — bone */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(420px, 100%), 1fr))",
              gap: "var(--s-3)",
            }}
          >
            {BUNDLES.map((bundle) => {
              const savingsPercent = Math.round(
                ((bundle.regularPrice - bundle.bundlePrice) / bundle.regularPrice) * 100
              );
              const { Icon } = bundle;

              return (
                <div
                  key={bundle.id}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--card)",
                    border: "1px solid rgba(20,17,12,0.08)",
                    borderTop: "3px solid var(--mustard)",
                    borderRadius: "var(--radius-sm)",
                    padding: "var(--s-4)",
                  }}
                >
                  {/* Savings badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "var(--s-4)",
                      right: "var(--s-4)",
                      fontFamily: "var(--U)",
                      fontSize: "11px",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      color: "var(--mustard-text)",
                      background: "var(--bone-warm)",
                      padding: "5px 10px",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    Save {savingsPercent}%
                  </div>

                  {/* Header */}
                  <div style={{ marginBottom: "var(--s-3)", paddingRight: "72px" }}>
                    <Icon size={28} strokeWidth={1.5} color="var(--mustard-text)" style={{ marginBottom: "14px" }} />
                    <h2
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "28px",
                        lineHeight: 1.12,
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        color: "var(--ink)",
                        marginBottom: "8px",
                      }}
                    >
                      {bundle.title}
                    </h2>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)" }}>
                      {bundle.description}
                    </p>
                  </div>

                  {/* Books list */}
                  <div style={{ borderTop: "1px solid rgba(20,17,12,0.08)", paddingTop: "var(--s-3)", marginBottom: "var(--s-3)" }}>
                    <p
                      className="eyebrow"
                      style={{ color: "var(--mustard-text)", marginBottom: "14px" }}
                    >
                      Includes {bundle.books.length} books
                    </p>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                      {bundle.books.map((book) => (
                        <li
                          key={book.id}
                          style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontFamily: "var(--B)" }}
                        >
                          <Check size={16} strokeWidth={2.5} color="var(--mustard-text)" style={{ marginTop: "3px", flexShrink: 0 }} />
                          <span style={{ fontSize: "15px", lineHeight: 1.5, color: "var(--ink)" }}>
                            {book.title}
                            <span style={{ color: "var(--ink-muted)", fontSize: "13px" }}> · {book.author}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing */}
                  <div
                    style={{
                      borderTop: "1px solid rgba(20,17,12,0.08)",
                      paddingTop: "var(--s-3)",
                      marginTop: "auto",
                      marginBottom: "var(--s-3)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px" }}>
                      <span style={{ fontFamily: "var(--F)", fontSize: "36px", lineHeight: 1, fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>
                        ${bundle.bundlePrice.toFixed(2)}
                      </span>
                      <span style={{ fontFamily: "var(--B)", fontSize: "17px", color: "var(--ink-muted)", textDecoration: "line-through" }}>
                        ${bundle.regularPrice.toFixed(2)}
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)" }}>
                      You save ${bundle.savings.toFixed(2)}
                    </p>
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      width: "100%",
                      padding: "14px 20px",
                      fontFamily: "var(--U)",
                      fontSize: "14px",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      color: "var(--charcoal-fg)",
                      background: "var(--charcoal)",
                      border: "none",
                      borderRadius: "var(--radius-sm)",
                      cursor: "pointer",
                    }}
                  >
                    <ShoppingCart size={16} strokeWidth={2} />
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why buy bundles — bone-warm */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "16px" }}>
            <Gift size={14} strokeWidth={2} />
            Why a bundle
          </div>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              marginBottom: "var(--s-4)",
              maxWidth: "20ch",
            }}
          >
            One subject, read whole.
          </h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
            {WHY_BUNDLES.map((reason) => (
              <li key={reason} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <Check size={18} strokeWidth={2.5} color="var(--mustard-text)" style={{ marginTop: "4px", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.6, color: "var(--ink)" }}>
                  {reason}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
