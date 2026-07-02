/**
 * Client-test harness: the same provider stack main.tsx gives the real app
 * (tRPC + TanStack Query), with retries off so states settle immediately and
 * a default "offline" fetch so no test ever touches a network.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { render, type RenderResult } from "@testing-library/react";
import superjson from "superjson";
import type { ReactNode } from "react";

import { trpc } from "@/lib/trpc";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "@/contexts/ToastContext";

/**
 * A fetch that answers every request with a JSON 503 — tRPC queries error
 * out and settle, raw fetch callers hit their catch/empty branches. Tests
 * that need specific responses install their own stub on top.
 */
export function offlineFetch(): typeof fetch {
  return (async () =>
    new Response(JSON.stringify({ error: "offline test stub" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;
}

export function TestProviders({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false, staleTime: Infinity },
      mutations: { retry: false },
    },
  });
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
        transformer: superjson,
        fetch: (input, init) => globalThis.fetch(input, init),
      }),
    ],
  });
  // Theme + Toast mirror App.tsx's own inner providers so components that
  // render Layout (nav/footer/toasts) work when tested directly. When the
  // smoke test renders <App/> these simply nest once more, harmlessly.
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" switchable>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export function renderWithProviders(ui: ReactNode): RenderResult {
  return render(<TestProviders>{ui}</TestProviders>);
}
