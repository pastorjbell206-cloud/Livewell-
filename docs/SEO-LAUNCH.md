# SEO Launch Playbook — getting LiveWell found on Google

This is the plain-language checklist for turning "indexed but invisible" into
real search traffic. The site's technical SEO is now world-class (see "What the
code already does" at the bottom). The remaining levers are things only the
owner can do: prove ownership to Google, submit the sitemap, and earn links.

Traffic is not a switch. Even done perfectly, indexing improves over days and
ranking builds over weeks to a few months. The fastest real visitors this week
come from Step 3 (your own audience), not from Google.

---

## Step 1 — Google Search Console (do this first, ~15 minutes)

This is the single highest-leverage action. It tells Google "I own this site,
here is my map of every page, crawl me now."

1. Go to **search.google.com/search-console** and sign in with the Google
   account you want to own the site's search data.
2. Click **Add property**. Choose the **URL prefix** option and enter
   `https://www.livewellbyjamesbell.co` (with the `www` — that is the canonical
   host the site redirects to).
3. Google offers verification methods. Choose **HTML tag**. It shows a line like
   `<meta name="google-site-verification" content="ABC123..." />`. Copy only the
   token inside `content="..."` (the `ABC123...` part).
4. In **Vercel → the project → Settings → Environment Variables**, add:
   `VITE_GOOGLE_SITE_VERIFICATION` = the token you copied. Save, then
   **redeploy** (Deployments → the latest → Redeploy) so the tag ships.
   - Or paste the token to your developer and it drops in during the next build.
5. Back in Search Console, click **Verify**.
6. Once verified, open **Sitemaps** in the left menu, enter `sitemap.xml`, and
   **Submit**. (The full URL is `https://www.livewellbyjamesbell.co/sitemap.xml`;
   it lists roughly 1,300 pages.)
7. Open **URL Inspection** at the top, paste your most important pages one at a
   time (the homepage, `/writing`, two or three flagship essays), and click
   **Request indexing** for each. This pushes Google to crawl them now instead
   of whenever it gets around to it.

After a few days, the **Pages** report shows how many URLs Google has indexed,
and **Performance** starts showing impressions. Watch **Pages** climb from a
handful toward the full sitemap over the following weeks.

---

## Step 2 — Bing Webmaster Tools (5 minutes, easy win)

Bing also powers DuckDuckGo and a slice of ChatGPT's web results, so it is worth
the five minutes.

1. Go to **bing.com/webmasters**, sign in.
2. Add `https://www.livewellbyjamesbell.co`. The fastest path is **Import from
   Google Search Console** (one click once Step 1 is done). Otherwise choose the
   meta-tag method: copy the token, set `VITE_BING_SITE_VERIFICATION` in Vercel
   the same way as Step 1, redeploy, verify.
3. Submit the same sitemap: `sitemap.xml`.

---

## Step 3 — Point your existing audience at the site (this week, biggest traffic)

You already have the three things a new site begs for. Each link you post does
two jobs at once: it sends real readers today, and every link from another site
is a vote of authority that Google uses to rank you.

- **Facebook** (your existing following): share a *specific essay* two or three
  times a week, not just the homepage. Deep links to individual articles are
  what get indexed and shared.
- **Substack** (your newsletter): every issue should link to the full essay on
  `livewellbyjamesbell.co`. A Substack link is a real backlink and a real
  reader. Make the site, not the newsletter, the home of the writing.
- **The PCN network** (thousands of pastors): this is your strongest channel.
  When a pastor links your essay from their church site, newsletter, or socials,
  that is exactly the kind of trusted, topical backlink Google rewards most.

Do this consistently for a month and it will outrun SEO by a wide margin while
the search rankings slowly build underneath.

---

## Step 4 — Keep publishing, and interlink (ongoing)

- **Fresh, regular publishing** is itself a ranking signal for a site about
  current questions. The "New essays weekly" cadence is right; keep it.
- **Link essays to each other.** The `/explore` catalog and related-content
  links already help; every internal link you add helps Google understand and
  rank the cluster.
- **Titles are your ad copy.** The prerendered `<title>` and description are what
  show in search results. Make them specific and answer a real question a person
  would type.

---

## What the code already does (so you know it is not the bottleneck)

- **Every page ships its real content in the HTML.** The site is a React app; a
  build step (`scripts/prerender-heads.mjs`) now writes a static copy of every
  route with the full essay text, the correct title/description, Open Graph and
  Twitter cards, and Article/Organization/WebSite structured data (JSON-LD)
  baked in. Google, Bing, no-JS crawlers, and AI answer engines all see the
  actual prose, not an empty shell.
- **A complete sitemap** (~1,300 URLs, regenerated every deploy) with
  `lastmod`/`priority`/`changefreq`, referenced from `robots.txt`.
- **Correct crawl rules**: crawling allowed, admin/api disallowed, one canonical
  host (`www`), permanent redirects from the old paths, and `noindex` correctly
  limited to thank-you/download pages only.
- **Verification is env-driven**: set `VITE_GOOGLE_SITE_VERIFICATION` /
  `VITE_BING_SITE_VERIFICATION` in Vercel and the tags appear site-wide on the
  next build. Nothing to hand-edit.
- **Per-essay social cards** via the `/api/og` image endpoint, so shared links
  unfurl with a branded card.

The foundation is done. Steps 1 through 3 are what turn it into traffic.
