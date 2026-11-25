/**
 * Client-test harness: the same provider stack main.tsx gives the real app
 * (tRPC + TanStack Query), with retries off so states settle immediately and
 * a default "offline" fetch so no test ever touches a network.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { act, render, type RenderResult } from "@testing-library/react";
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

/**
 * Wait until a page has drawn what its data brings, without a clock running
 * against the drawing.
 *
 * The Bible Explorer's map sets its data in a transition, an essay takes its
 * text as a deferred value, and /downloads sets its catalogue in a transition
 * (the speed work of 2026-11-23 and 2026-11-25): React draws each in slices
 * and hands Node's event loop back between them. Under testing-library's
 * findBy and waitFor, the loop then runs the wait's own one-second timer in
 * the middle of the drawing. On a busy machine (six CPU burners) the map was
 * drawn 1.5 to 2.2 s after it was rendered, in 30 to 38 slices, and a V8
 * profile showed the wait's timer firing, and its error message serializing
 * the page, between them: the timeouts that began after that work. Drawn in
 * one piece, as before, the timer could not run until the page was drawn.
 *
 * Here each turn of the event loop runs inside act, where React draws without
 * yielding, so the wait ends when the page is drawn, however long a busy
 * machine takes; the test's own budget still bounds it. `ready` says when the
 * page has what the test needs; after `turns` turns the test's next assertion
 * says what is missing.
 */
export async function untilDrawn(ready: () => boolean, turns = 100): Promise<void> {
  for (let i = 0; i < turns && !ready(); i++) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
}
