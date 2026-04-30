import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function AdminDebug() {
  const [restAuth, setRestAuth] = useState<string>("checking...");
  const [trpcAuth, setTrpcAuth] = useState<string>("checking...");
  const [trpcPosts, setTrpcPosts] = useState<string>("checking...");
  const [cookie, setCookie] = useState<string>("checking...");

  const authQuery = trpc.auth.me.useQuery(undefined, { retry: false });
  const postsQuery = trpc.posts.listAll.useQuery(undefined, { retry: false });

  useEffect(() => {
    setCookie(document.cookie || "(no cookies visible - HttpOnly cookies are hidden)");

    fetch("/api/auth/me", { credentials: "include" })
      .then(async (r) => {
        const data = await r.json();
        setRestAuth(`Status ${r.status}: ${JSON.stringify(data)}`);
      })
      .catch((e) => setRestAuth(`Error: ${e.message}`));
  }, []);

  useEffect(() => {
    if (authQuery.isLoading) return;
    if (authQuery.error) setTrpcAuth(`Error: ${authQuery.error.message}`);
    else setTrpcAuth(`Data: ${JSON.stringify(authQuery.data)}`);
  }, [authQuery.data, authQuery.error, authQuery.isLoading]);

  useEffect(() => {
    if (postsQuery.isLoading) return;
    if (postsQuery.error) setTrpcPosts(`Error: ${postsQuery.error.message}`);
    else setTrpcPosts(`Got ${Array.isArray(postsQuery.data) ? postsQuery.data.length : 0} posts`);
  }, [postsQuery.data, postsQuery.error, postsQuery.isLoading]);

  return (
    <div style={{ padding: 32, fontFamily: "monospace", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>Admin Debug</h1>

      <div style={{ marginBottom: 16, padding: 16, background: "#f5f5f5", borderRadius: 8 }}>
        <strong>REST /api/auth/me:</strong>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", fontSize: 12 }}>{restAuth}</pre>
      </div>

      <div style={{ marginBottom: 16, padding: 16, background: "#f5f5f5", borderRadius: 8 }}>
        <strong>tRPC auth.me:</strong>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", fontSize: 12 }}>{trpcAuth}</pre>
      </div>

      <div style={{ marginBottom: 16, padding: 16, background: "#f5f5f5", borderRadius: 8 }}>
        <strong>tRPC posts.listAll:</strong>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", fontSize: 12 }}>{trpcPosts}</pre>
      </div>

      <div style={{ marginBottom: 16, padding: 16, background: "#f5f5f5", borderRadius: 8 }}>
        <strong>Browser cookies (visible):</strong>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", fontSize: 12 }}>{cookie}</pre>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
        <Link href="/admin" style={{ padding: "8px 16px", background: "#1A1A1A", color: "white", borderRadius: 4, textDecoration: "none" }}>
          Go to Admin
        </Link>
        <Link href="/admin/login" style={{ padding: "8px 16px", background: "#B8963E", color: "white", borderRadius: 4, textDecoration: "none" }}>
          Go to Login
        </Link>
      </div>
    </div>
  );
}
