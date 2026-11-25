import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { withoutCarry } from "@/lib/carry-hash";
import { startTransition } from "react";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import "./index.css";
import "./brand-override.css";
import { captureInstallPrompt } from "@/lib/install";
import { mountAfterStaticHero } from "@/lib/static-hero";
import { holdPrerenderedPage } from "@/lib/prerender-hold";

// The browser offers to install the site only once, early; keep that offer
// for the "Add to your home screen" card on My Library (lib/install).
captureInstallPrompt();

// iOS Safari applies :active (the pressed state in index.css) to a tapped
// element only when the page listens for touches at all. This listener does
// nothing else.
document.addEventListener("touchstart", () => {}, { passive: true });

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
  // A chapter, an essay or a guide keeps its prerendered text on screen until
  // the real page is ready (lib/prerender-hold.ts). The prerender puts that
  // text just before #root (scripts/prerender-heads.mjs; not yet on /start,
  // which other work is changing).
  const shell = document.getElementById("lw-shell");
  const textInPlace = !!shell && shell.nextElementSibling === document.getElementById("root");
  const held = holdPrerenderedPage();
  const root = createRoot(document.getElementById("root")!);
  const render = () =>
    root.render(
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <App />
          <Analytics beforeSend={withoutCarry} />
          <SpeedInsights beforeSend={withoutCarry} />
        </QueryClientProvider>
      </trpc.Provider>
    );
  // On "/" the static hero, and on a page with its own text the held text, is
  // already the page a visitor sees, so the first render can wait its turn: as
  // a transition React works in short slices and lets a tap or a scroll
  // through between them, where one long render would hold the main thread
  // for the whole tree (Lighthouse's blocking time: 520 ms on an essay).
  if (location.pathname === "/" || (held && textInPlace)) startTransition(render);
  else render();
});
