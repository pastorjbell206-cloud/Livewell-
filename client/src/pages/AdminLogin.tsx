import { useState } from "react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Login failed (${res.status})`);
      }
      navigate("/admin");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafaf7" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 32,
          background: "white",
          borderRadius: 8,
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "#1A1A1A" }}>Admin Login</h1>
        <p style={{ fontSize: 14, color: "#555", marginBottom: 24 }}>Enter your admin password to continue.</p>
        <label style={{ display: "block", fontSize: 14, fontWeight: 500, marginBottom: 6 }} htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "10px 12px", fontSize: 16, border: "1px solid #ddd", borderRadius: 6, marginBottom: 16 }}
        />
        {error && (
          <div style={{ color: "#b00020", fontSize: 14, marginBottom: 12 }}>{error}</div>
        )}
        <button
          type="submit"
          disabled={loading || !password}
          style={{
            width: "100%",
            padding: "10px 12px",
            fontSize: 16,
            fontWeight: 600,
            color: "white",
            background: loading ? "#888" : "#1A1A1A",
            border: "none",
            borderRadius: 6,
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
