import { getLoginUrl } from "@/const";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useEffect, useMemo } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

type AuthUser = {
  id?: number | string;
  name?: string | null;
  email?: string | null;
  role?: string | null;
};

const AUTH_ME_KEY = ["auth.me"] as const;

// The deployed REST endpoint returns { user: "admin" } (string) for a valid
// cookie session. The legacy tRPC auth.me returned a full User object. Adapt
// either wire shape into the AuthUser shape consumers expect (role/name/email).
function normalizeMeResponse(payload: unknown): AuthUser | null {
  if (payload == null || typeof payload !== "object") return null;
  const raw = (payload as { user?: unknown }).user;
  if (raw == null) return null;
  if (typeof raw === "string") {
    return { name: raw, role: "admin" };
  }
  if (typeof raw === "object") {
    return raw as AuthUser;
  }
  return null;
}

export function useAuth(options?: UseAuthOptions) {
  const opts = options ?? {};
  const redirectOnUnauthenticated = opts.redirectOnUnauthenticated ?? false;
  // Lazily resolve redirectPath so getLoginUrl() is only called when needed.
  // This avoids a render-time crash if VITE_OAUTH_PORTAL_URL / VITE_APP_ID are missing.
  const queryClient = useQueryClient();

  const meQuery = useQuery<AuthUser | null>({
    queryKey: AUTH_ME_KEY,
    queryFn: async () => {
      const r = await fetch("/api/auth/me", { credentials: "include" });
      if (r.status === 401) return null;
      if (!r.ok) throw new Error(`auth.me failed: ${r.status}`);
      return normalizeMeResponse(await r.json());
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const r = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!r.ok) throw new Error(`logout failed: ${r.status}`);
    },
    onSuccess: () => {
      queryClient.setQueryData(AUTH_ME_KEY, null);
    },
  });

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
    } finally {
      queryClient.setQueryData(AUTH_ME_KEY, null);
      await queryClient.invalidateQueries({ queryKey: AUTH_ME_KEY });
    }
  }, [logoutMutation, queryClient]);

  const state = useMemo(() => {
    localStorage.setItem(
      "manus-runtime-user-info",
      JSON.stringify(meQuery.data)
    );
    return {
      user: meQuery.data ?? null,
      loading: meQuery.isLoading || logoutMutation.isPending,
      error: meQuery.error ?? logoutMutation.error ?? null,
      isAuthenticated: Boolean(meQuery.data),
    };
  }, [
    meQuery.data,
    meQuery.error,
    meQuery.isLoading,
    logoutMutation.error,
    logoutMutation.isPending,
  ]);

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (meQuery.isLoading || logoutMutation.isPending) return;
    if (state.user) return;
    if (typeof window === "undefined") return;

    const target = opts.redirectPath ?? getLoginUrl();
    if (window.location.pathname === target) return;

    window.location.href = target;
  }, [
    redirectOnUnauthenticated,
    opts.redirectPath,
    logoutMutation.isPending,
    meQuery.isLoading,
    state.user,
  ]);

  return {
    ...state,
    refresh: () => meQuery.refetch(),
    logout,
  };
}
