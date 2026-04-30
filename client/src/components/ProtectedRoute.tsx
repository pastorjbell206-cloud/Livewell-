import { useEffect } from "react";
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
  const { user, loading: isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      setLocation("/admin/login");
      return;
    }
    if (requireAdmin && user.role !== "admin") {
      setLocation("/");
    }
  }, [user, isLoading, requireAdmin, setLocation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!user) return null;
  if (requireAdmin && user.role !== "admin") return null;

  return <Component />;
}
