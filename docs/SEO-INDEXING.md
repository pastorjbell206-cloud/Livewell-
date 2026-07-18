# Getting indexed by Google and the answer engines

The engineering is done and shipped. Every published essay is prerendered with a
real title, description, canonical, Open Graph tags, and Article JSON-LD (WI-8),
listed in `sitemap.xml`, and reachable by the AI crawlers (`robots.txt` welcomes
GPTBot, ClaudeBot, PerplexityBot, and the rest, and points them at `/llms.txt`).

What remains is the part only the site owner can do, because it needs access to
the Search Console and Bing accounts and the Vercel project settings. This is the
checklist.

## 1. Verify ownership in Google Search Console (once)

1. Go to Google Search Console and add the property
   `https://www.livewellbyjamesbell.co` (use the URL-prefix property, not Domain,
   unless you can edit DNS).
2. Choose the **HTML tag** verification method. Google gives you a token that
   looks like `content="abc123..."`.
3. In the **Vercel** project settings, add an environment variable:
   - `VITE_GOOGLE_SITE_VERIFICATION` = the token value (just the `abc123...`
     part, not the whole tag).
4. Redeploy. The build injects
   `<meta name="google-site-verification" content="...">` into every page
   (already wired in `scripts/prerender-heads.mjs`).
5. Back in Search Console, click **Verify**.

Bing works the same way with `VITE_BING_SITE_VERIFICATION` and Bing Webmaster
Tools.

## 2. Submit the sitemap

In Search Console, under **Sitemaps**, submit:

```
https://www.livewellbyjamesbell.co/sitemap.xml
```

Do the same in Bing Webmaster Tools. The sitemap is regenerated on every deploy
from the database plus the static library, so new essays appear automatically.

## 3. Request indexing of the priorities

For the highest-value pages, use the Search Console **URL Inspection** tool and
click **Request indexing** so they are crawled sooner rather than waiting:

- `/` and `/about`
- `/writing?track=doubt` (the Doubt & Faith set)
- `/tools/test-the-case`
- A handful of the new apologetics essays, e.g.
  `/writing/is-jesus-really-the-only-way`, `/writing/does-god-actually-exist`,
  `/writing/can-you-be-good-without-god`.

## 4. Confirm the crawlable content is really there

Before and after each deploy you can prove the prerender did its job (this is the
loop that guards against the WI-8 bug coming back):

```
pnpm run build && pnpm run prerender && pnpm run verify:seo
```

`verify:seo` samples the prerendered essay pages in `dist/` and fails if any
advertised essay is still a generic shell.

To eyeball a single live page as Google sees it, use Search Console's URL
Inspection ("View crawled page"), or `curl -A "Googlebot" <url>` and check that
the `<title>` and the `<article>` body are present in the raw HTML.

## 5. Watch it land

Indexing takes days to a few weeks. Track it in Search Console under
**Pages** (indexed count should climb toward the sitemap total) and
**Performance** (impressions, then clicks). For the answer engines, periodically
ask ChatGPT / Perplexity / Claude a question the site answers well (for example
"is Jesus the only way, honest case") and see whether livewellbyjamesbell.co is
cited.

## Owner action summary

| Step | Who | Blocking? |
| --- | --- | --- |
| Set `VITE_GOOGLE_SITE_VERIFICATION` in Vercel + verify in GSC | owner | yes, gates everything below |
| Submit `sitemap.xml` in GSC + Bing | owner | high value |
| Request indexing for the priority URLs | owner | speeds it up |
| `pnpm run verify:seo` after deploys | anyone | regression guard |
