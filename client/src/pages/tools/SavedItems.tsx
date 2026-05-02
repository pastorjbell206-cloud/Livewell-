import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useFavorites } from "@/hooks/useFavorites";
import { Link } from "wouter";
import { Trash2, Copy, Check, BookOpen, Heart } from "lucide-react";
import { useState } from "react";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function SavedItems() {
  const verses = useFavorites("livewell-saved-verses");
  const prayers = useFavorites("livewell-saved-prayers");
  const [exportCopied, setExportCopied] = useState(false);

  const totalCount = verses.favorites.length + prayers.favorites.length;

  const handleExportAll = () => {
    const lines: string[] = [];
    if (verses.favorites.length > 0) {
      lines.push("=== Saved Verses ===\n");
      verses.favorites.forEach((v) => {
        lines.push(`${v.content.ref} — ${v.content.text}`);
        lines.push(`Saved: ${formatDate(v.savedAt)}\n`);
      });
    }
    if (prayers.favorites.length > 0) {
      lines.push("=== Saved Prayers ===\n");
      prayers.favorites.forEach((p) => {
        lines.push(`[${p.content.type}]`);
        lines.push(p.content.text);
        lines.push(`Saved: ${formatDate(p.savedAt)}\n`);
      });
    }
    navigator.clipboard.writeText(lines.join("\n"));
    setExportCopied(true);
    setTimeout(() => setExportCopied(false), 2000);
  };

  return (
    <Layout>
      <SEOMeta
        title="Saved Items — LiveWell Tools"
        description="Your saved verses and prayers from LiveWell tools."
      />

      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "80px 32px 60px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "700px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--mustard)", fontFamily: "var(--U)", marginBottom: "16px" }}>
            YOUR COLLECTION
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 300, fontFamily: "var(--F)", lineHeight: 1.15, marginBottom: "16px" }}>
            Saved <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>Items</em>
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.7, opacity: 0.85, fontFamily: "var(--U)" }}>
            {totalCount} {totalCount === 1 ? "item" : "items"} saved across your tools.
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 32px", background: "var(--bone)" }}>
        <div className="wrap" style={{ maxWidth: "800px" }}>

          {totalCount > 0 && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "32px" }}>
              <button
                onClick={handleExportAll}
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "10px 20px", background: "var(--mustard)", border: "none",
                  borderRadius: "4px", fontSize: "13px", fontWeight: 600,
                  fontFamily: "var(--U)", color: "var(--charcoal)", cursor: "pointer",
                }}
              >
                {exportCopied ? <><Check size={14} /> Copied to Clipboard</> : <><Copy size={14} /> Export All</>}
              </button>
            </div>
          )}

          {totalCount === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--ink-muted)" }}>
              <Heart size={48} style={{ margin: "0 auto 16px", opacity: 0.25 }} />
              <p style={{ fontFamily: "var(--F)", fontSize: "20px", marginBottom: "8px", color: "var(--charcoal)" }}>
                Nothing saved yet.
              </p>
              <p style={{ fontFamily: "var(--U)", fontSize: "15px", lineHeight: 1.7 }}>
                Use the tools to find verses and prayers worth keeping.
              </p>
              <Link
                href="/tools"
                style={{
                  display: "inline-block", marginTop: "24px", padding: "12px 24px",
                  background: "var(--mustard)", color: "var(--charcoal)", borderRadius: "4px",
                  fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, textDecoration: "none",
                }}
              >
                Browse Tools
              </Link>
            </div>
          )}

          {/* Saved Verses */}
          {verses.favorites.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 600, fontFamily: "var(--F)", color: "var(--charcoal)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <BookOpen size={20} style={{ color: "var(--mustard)" }} />
                Saved Verses ({verses.favorites.length})
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {verses.favorites.map((v) => (
                  <div
                    key={v.id}
                    style={{
                      padding: "20px 24px", background: "white",
                      border: "1px solid var(--bone-muted)", borderRadius: "8px",
                      borderLeft: "4px solid var(--mustard)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--mustard)", fontFamily: "var(--U)" }}>
                        {v.content.ref}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "11px", color: "var(--ink-muted)", fontFamily: "var(--U)" }}>
                          {formatDate(v.savedAt)}
                        </span>
                        <button
                          onClick={() => verses.removeFavorite(v.id)}
                          style={{
                            display: "flex", alignItems: "center", gap: "4px",
                            padding: "4px 8px", background: "none", border: "1px solid var(--bone-muted)",
                            borderRadius: "4px", fontSize: "11px", fontFamily: "var(--U)",
                            color: "var(--ink-muted)", cursor: "pointer",
                          }}
                          title="Remove"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--charcoal)", fontFamily: "var(--U)", fontStyle: "italic" }}>
                      "{v.content.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Prayers */}
          {prayers.favorites.length > 0 && (
            <div style={{ marginBottom: "48px" }}>
              <h2 style={{ fontSize: "22px", fontWeight: 600, fontFamily: "var(--F)", color: "var(--charcoal)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                <Heart size={20} style={{ color: "var(--mustard)" }} />
                Saved Prayers ({prayers.favorites.length})
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {prayers.favorites.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      padding: "20px 24px", background: "white",
                      border: "1px solid var(--bone-muted)", borderRadius: "8px",
                      borderTop: "4px solid var(--mustard)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--mustard)", fontFamily: "var(--U)", letterSpacing: "0.1em" }}>
                        {p.content.type?.toUpperCase()}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "11px", color: "var(--ink-muted)", fontFamily: "var(--U)" }}>
                          {formatDate(p.savedAt)}
                        </span>
                        <button
                          onClick={() => prayers.removeFavorite(p.id)}
                          style={{
                            display: "flex", alignItems: "center", gap: "4px",
                            padding: "4px 8px", background: "none", border: "1px solid var(--bone-muted)",
                            borderRadius: "4px", fontSize: "11px", fontFamily: "var(--U)",
                            color: "var(--ink-muted)", cursor: "pointer",
                          }}
                          title="Remove"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </div>
                    <p style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--charcoal)", fontFamily: "var(--U)", fontStyle: "italic" }}>
                      {p.content.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </Layout>
  );
}
