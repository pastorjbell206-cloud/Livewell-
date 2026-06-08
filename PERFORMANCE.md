# Performance notes & pre-deploy checklist — LiveWell

Stack: React + Vite SPA on Vercel. Images on CloudFront. This file records what was
optimized and how to keep speed from regressing.

## What's been done (PR: perf-optimizations)
- **Payload:** card/list pages use `posts.listForIndex` (no article body), not `listPublished`.
- **Bundle:** route pages are `lazy()`; the 884 KB `ArticleDetail` chunk no longer loads on Home.
- **Fonts:** Google Fonts loaded non-render-blocking (preload + swap, noscript fallback).
- **Images:** below-fold images `loading="lazy" decoding="async"`; article cover is `fetchPriority="high"`.
- **Chunks:** removed the force-bundled, every-page-preloaded `recharts` chunk.
- **Caching:** `vercel.json` sets `Cache-Control: immutable` (1y) on `/assets/*` (hashed files).
- **CDN:** `preconnect` + `dns-prefetch` to the CloudFront image origin (faster LCP image).

## Images & assets (prompt 2)
- Static raster assets in `client/public`: none — all imagery comes from CloudFront. Good.
- **Convert source images to WebP/AVIF** at the CDN/origin. CloudFront can serve AVIF/WebP via
  content negotiation or a Lambda@Edge image handler. Target sizes: cover/hero ≤ 200 KB,
  thumbnails ≤ 40 KB. Serve responsive `srcset` (e.g. 480/800/1200 w) for covers.
- **Always set `width`/`height` (or `aspect-ratio`)** on `<img>` to prevent CLS. The article
  cover already does (`width={1200} height={630}` + `aspect-ratio`). Apply the same to book
  covers and avatars if not already fixed-size via CSS.
- CSS/JS minification + hashing: handled automatically by `vite build`. No action needed.

## Render path (prompt 3)
- The entry JS is `type="module"` → already deferred (not render-blocking).
- The bundled CSS is ~19 KB — render-blocking but trivial; **critical-CSS extraction is not
  worth it** for a file this small on an SPA. Skip it.
- Fonts are no longer render-blocking (done).
- Net: there are effectively no costly render-blocking resources left on the entry path.

## Caching / server (prompt 4 — Vercel)
- Vercel serves Brotli/gzip automatically — no config needed.
- Asset caching now explicit in `vercel.json` (`/assets/*` immutable 1y; html stays
  revalidated by Vercel default so new deploys are picked up).
- Preconnect/dns-prefetch: fonts + CloudFront covered in `index.html`.
- No `.htaccess` — this is Vercel, not Apache; `vercel.json` is the equivalent.

## Core Web Vitals (prompt 5)
- **LCP** (cover image or H1): cover is high-priority + CDN-preconnected; fonts swap;
  heavy renderer is off the entry. Biggest remaining LCP lever = **server-render the article
  body** (the `prerender-heads` script currently only does `<head>`), so text isn't gated on
  JS boot + a tRPC round trip. Good target: < 2.5 s.
- **INP** (responsiveness): code-splitting + deferred queries reduce main-thread work.
  Watch for heavy synchronous work in render; keep it < 200 ms.
- **CLS** (layout shift): give every image explicit dimensions; reserve space for the cover
  and any async content. Good target: < 0.1.
- **Biggest open item:** the `streamdown` renderer statically bundles `shiki` + `katex`
  (~most of the 884 KB article chunk) for code/math that prose articles don't use. Swapping
  article bodies to a light markdown renderer is the largest single win — do it with a
  before/after Lighthouse since it changes how articles render.

## Pre-deploy checklist (run before every deploy)
- [ ] `pnpm run check` passes (typecheck).
- [ ] `pnpm run build` passes; no new chunk > ~500 KB that loads on the entry/home path.
- [ ] No page imports the article renderer (`streamdown`) or other heavy libs eagerly into
      the entry — keep route pages `lazy()`.
- [ ] List/card pages use `posts.listForIndex` (never `listPublished`, which ships bodies).
- [ ] New `<img>` has `loading="lazy"` (unless above-the-fold/LCP) + `width`/`height`.
- [ ] New third-party origins get a `preconnect`/`dns-prefetch` in `index.html`.
- [ ] Hashed assets still land in `/assets/` so the immutable cache header applies.
- [ ] Run Lighthouse (mobile) on Home + one article on the Vercel preview; LCP < 2.5 s,
      CLS < 0.1, INP < 200 ms before promoting to production.
