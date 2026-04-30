import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

export default function AdminDebug() {
  const [restAuth, setRestAuth] = useState<string>("checking...");
  const [location, setLocation] = useLocation();
  const { user, loading: authLoading, error: authError } = useAuth();

  const postsQuery = trpc.posts.listAll.useQuery(undefined, { retry: false });

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(async (r) => {
        const data = await r.json();
        setRestAuth(`${r.status}: ${JSON.stringify(data)}`);
      })
      .catch((e) => setRestAuth(`Error: ${e.message}`));
  }, []);

  const box = { marginBottom: 16, padding: 16, background: "#f5f5f5", borderRadius: 8, fontSize: 13 };

  return (
    <div style={{ padding: 32, fontFamily: "monospace", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>Admin Debug v2</h1>

      <div style={box}>
        <strong>Current URL:</strong> {location}
      </div>

      <div style={box}>
        <strong>REST /api/auth/me:</strong> {restAuth}
      </div>

      <div style={box}>
        <strong>useAuth():</strong>{" "}
        {authLoading ? "loading..." : authError ? `ERROR: ${authError.message}` : `user=${JSON.stringify(user)}`}
      </div>

      <div style={box}>
        <strong>posts.listAll:</strong>{" "}
        {postsQuery.isLoading ? "loading..." : postsQuery.error ? `ERROR: ${postsQuery.error.message}` : `${postsQuery.data?.length ?? 0} posts`}
      </div>

      {/* Render posts directly to prove data works */}
      {postsQuery.data && postsQuery.data.length > 0 && (
        <div style={box}>
          <strong>Posts from DB (proving rendering works):</strong>
          <ul style={{ margin: "8px 0 0 16px" }}>
            {postsQuery.data.slice(0, 5).map((p: any) => (
              <li key={p.id}>{p.title} (id:{p.id}, published:{String(p.published)})</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Navigation Test</h2>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>Click these and tell me what happens — does the URL in your browser change?</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link href="/admin" style={{ padding: "8px 16px", background: "#1A1A1A", color: "white", borderRadius: 4, textDecoration: "none" }}>
            /admin
          </Link>
          <Link href="/admin/posts" style={{ padding: "8px 16px", background: "#2C3E50", color: "white", borderRadius: 4, textDecoration: "none" }}>
            /admin/posts
          </Link>
          <Link href="/admin/books" style={{ padding: "8px 16px", background: "#B8963E", color: "white", borderRadius: 4, textDecoration: "none" }}>
            /admin/books
          </Link>
          <button onClick={() => setLocation("/admin/posts")} style={{ padding: "8px 16px", background: "#4A6A55", color: "white", borderRadius: 4, border: "none", cursor: "pointer" }}>
            navigate(/admin/posts)
          </button>
          <button onClick={() => { window.location.href = "/admin/posts"; }} style={{ padding: "8px 16px", background: "#7a3020", color: "white", borderRadius: 4, border: "none", cursor: "pointer" }}>
            hard nav /admin/posts
          </button>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Direct Content Test</h2>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 12 }}>This renders what AdminPosts would show, without ProtectedRoute:</p>
        {postsQuery.data && (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#1A1A1A", color: "white" }}>
                <th style={{ padding: 8, textAlign: "left" }}>ID</th>
                <th style={{ padding: 8, textAlign: "left" }}>Title</th>
                <th style={{ padding: 8, textAlign: "left" }}>Pillar</th>
                <th style={{ padding: 8, textAlign: "left" }}>Published</th>
              </tr>
            </thead>
            <tbody>
              {postsQuery.data.map((p: any) => (
                <tr key={p.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: 8 }}>{p.id}</td>
                  <td style={{ padding: 8 }}>{p.title}</td>
                  <td style={{ padding: 8 }}>{p.pillar || "-"}</td>
                  <td style={{ padding: 8 }}>{String(p.published ?? "-")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
