import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";

interface ProtectedRouteProps {
  component: React.ComponentType;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({
  component: Component,
  requireAdmin = false,
}: ProtectedRouteProps) {
  const { user, loading: isLoading, error } = useAuth();
  const [, setLocation] = useLocation();
  const [waited, setWaited] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWaited(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!waited) return;

    if (!user) {
      setLocation("/admin/login");
      return;
    }

    if (requireAdmin && user.role !== "admin") {
      setLocation("/");
    }
  }, [user, isLoading, requireAdmin, setLocation, waited]);

  if (isLoading || !waited) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4" />
          <p style={{ fontSize: 14, color: "#666" }}>Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div style={{ maxWidth: 500, padding: 32, textAlign: "center", fontFamily: "system-ui" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#b00020" }}>Authentication Error</h2>
          <p style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>{String(error.message || error)}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: "10px 20px", background: "#1A1A1A", color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}
            >
              Retry
            </button>
            <button
              onClick={() => setLocation("/admin/login")}
              style={{ padding: "10px 20px", background: "white", color: "#1A1A1A", border: "1px solid #ddd", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;
  if (requireAdmin && user.role !== "admin") return null;

  return <Component />;
}
