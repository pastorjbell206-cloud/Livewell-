import { Redirect } from "wouter";
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!user) return <Redirect to="/admin/login" />;
  if (requireAdmin && user.role !== "admin") return <Redirect to="/" />;

  return <Component />;
}
