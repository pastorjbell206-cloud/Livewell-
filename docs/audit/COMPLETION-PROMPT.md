# The Completion Prompt — LiveWell by James Bell

> James's directive, 2026-08-24: "Run a full audit and debug and search the
> website for all problems in the code. Everything complete. A finalized
> product. Everything works, the links match, everything seated together.
> Elite and world class. Nothing left behind."
>
> This is the master prompt for that finish. Run it whole; each dimension is
> an independent audit whose findings become fixes, and no fix ships unguarded.

## The standard

A finalized product means: every route renders a real page; every link on the
site lands where it promises; every piece of content that is advertised
exists and is complete; both runtimes implement the same API; the design
system holds on every page in both themes; the money paths work end to end;
the build reproduces from a clean checkout; and the gates in CI prove all of
it on every future change. "Done" is what survives checking, not what looks
finished.

## The ten dimensions

1. **Route health.** Every path in the route table renders visible, correct
   content with no ErrorBoundary trips and no console errors. Every redirect
   in vercel.json points at a live destination. No route renders another
   page's content.
2. **The link graph.** Every internal href in every page, component, and
   content store resolves to a live route, a live content slug, or a
   redirect. No promise without a destination. External links carry
   rel="noopener" and go where they claim.
3. **Content completeness.** Nothing advertised and missing: no card without
   its essay, no tool without its page, no "coming soon," no placeholder
   text, no empty sections, no stub that reads as a full piece. Counts shown
   to readers match counts that exist.
4. **API parity and the money paths.** Every procedure the client calls
   exists in both the dev server and the production function. The three
   books' purchase paths work end to end; past buyers' download links still
   verify; the fulfillment registry is intact.
5. **Code correctness.** No React key collisions, no unstable effect
   dependencies, no dead exports doing live work, no swallowed errors on
   paths readers hit. Warnings in the test run are defects, not noise.
6. **Design-system fidelity.** No hardcoded hex outside the token file; cream
   is the room and white is the card everywhere; mustard stays punctuation;
   both themes render every page legibly; the admin stays light.
7. **SEO and the crawl surface.** Every sitemap URL prerendered and
   self-canonical (CI-gated); every page's title and description its own;
   structured data valid; no redirected URL still advertised in a sitemap.
8. **Accessibility.** Heading order sound, images alt-texted, everything
   keyboard-operable, focus visible, reduced-motion honored absolutely.
9. **Data integrity.** Every public JSON parses; no duplicate slugs within or
   across stores; generated files agree with their sources; the two static
   libraries agree with each other.
10. **The gates.** Typecheck, all validators, the full test suite, the build,
    and the canonical audit — green from a clean checkout, enforced in CI, so
    the finished state cannot silently rot.

## The method

Audit each dimension independently and in parallel, with file-and-line
evidence for every finding and severity ranked by reader impact. Verify
before fixing; fix with the smallest change that resolves the finding; gate
every fix; ship only green. Findings that require James's judgment (content
truth, money, biography) go to him and never get guessed.

## The finish line

The site is finished when a stranger can arrive at any URL, read anything,
use any tool, buy any book, and find nothing broken, nothing missing,
nothing borrowed, and nothing false — and when the CI gates guarantee it
stays that way without anyone watching.
