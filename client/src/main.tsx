import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useEffect, useState, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import "./index.css";
import "./brand-override.css";

// Calm defaults: one retry instead of three (the retry storm on a cold API
// was the dominant cause of the ~20 s lab Speed Index), five minutes of
// staleness for content that changes weekly, and no refetch storm when the
// reader tabs back to the page.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  if (window.location.pathname.startsWith("/admin/login")) return;

  window.location.href = "/admin/login";
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

/**
 * Mounts its children after the page has loaded and the main thread is idle.
 * Vercel's analytics and speed-insights components inject a script tag on
 * mount; mounted with the app they join the fonts and the essay index on the
 * connection while the reader is still waiting for the first screen. They
 * lose nothing by waiting: the script reads the current URL when it runs, and
 * Speed Insights reports vitals that are only final at the end of the visit.
 */
function AfterLoad({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idle: number | undefined;
    const arm = () => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
      if (typeof w.requestIdleCallback === "function") idle = w.requestIdleCallback(() => setReady(true));
      else idle = window.setTimeout(() => setReady(true), 1500);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("load", arm);
      if (idle !== undefined) {
        const w = window as Window & { cancelIdleCallback?: (id: number) => void };
        if (typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(idle);
        window.clearTimeout(idle);
      }
    };
  }, []);
  return ready ? <>{children}</> : null;
}

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
      <AfterLoad>
        <Analytics />
        <SpeedInsights />
      </AfterLoad>
    </QueryClientProvider>
  </trpc.Provider>
);
