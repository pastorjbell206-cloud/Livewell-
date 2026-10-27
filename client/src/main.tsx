import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import "./index.css";
import "./brand-override.css";
import { captureInstallPrompt } from "@/lib/install";
import { mountAfterStaticHero } from "@/lib/static-hero";

// The browser offers to install the site only once, early; keep that offer
// for the "Add to your home screen" card on My Library (lib/install).
captureInstallPrompt();

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

// On "/", let the static hero's first paint be recorded before React replaces
// it (lib/static-hero.ts); everywhere else this mounts at once.
mountAfterStaticHero(() => {
  createRoot(document.getElementById("root")!).render(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Analytics />
        <SpeedInsights />
      </QueryClientProvider>
    </trpc.Provider>
  );
});
