# Traffic, September 2026: not yet measurable

*Written 23 September 2026 for step 3 of `docs/NEXT-SESSION-PROMPT.md`. Nothing
here is a number, and that is the finding.*

## What was found

Vercel Web Analytics has never been enabled on the project. The site mounts the
analytics component on every page (`client/src/main.tsx`), so the code has been
ready since it shipped, but the Vercel API answers every read for this project
with "Web Analytics not found": the switch in the Vercel dashboard was never
turned on, and no view has ever been recorded there.

The site's own beacon has been recording the whole time: one row per page view
(`page_views`), one per reader who reaches the end of an essay (`read_events`),
and each settled Core Web Vital (`web_vitals`), all through `/api/track`. That
record lives in the production database, which this session could not reach.
`scripts/traffic-report.mjs` reads it once, read-only, and writes the report
this file was meant to be: the twenty routes readers open most, essays opened
and finished, referrers, real-user vitals at the 75th percentile, the daily
series, and two candidate lists (navigation links nobody opened; the most
opened essays the front page hides).

## The decision

James chose to enable Vercel Web Analytics and wait. Data begins the day it is
switched on (Vercel project, Analytics tab, Enable); the first honest
thirty-day read is available a month later, from the dashboard or from the
`aggregate_pageviews` API this session tried.

## What to do in thirty days

1. Run `DATABASE_URL="mysql://..." node scripts/traffic-report.mjs` for the
   beacon's view, and read the Vercel Analytics dashboard for the same window.
   The two should broadly agree; where they do not, the beacon undercounts
   readers with JavaScript blocked and Vercel undercounts nothing.
2. Replace this file with the report the script writes, and fill its
   Recommendations section by hand: at most five cuts or promotions, each one
   specific, drawn from the two candidate lists.
3. Re-grade the audit's analytics row (`docs/WORLD-CLASS-AUDIT.md`) from what
   the numbers show, not from the fact of having them.

## Recommendations

None can be made honestly without the numbers. The one that can: turn the
switch on today, so the next person to ask this question has an answer.
