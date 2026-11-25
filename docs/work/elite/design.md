# Unit: design

Branch `elite/design`, from `6cc48594`. Not pushed. Date: 2026-11-17 to 18.

Scope: AUDIT.md section 4 item 12, section 6, roadmap items 32 to 35 and the
Step 2 "Design" line; lens report `docs/work/audit-2026-11/design.md`; the
direction in `docs/work/design/VISION.md` (6.1 to 6.4, 5.24).

## What changed, and why

### 1. A reading face

- **Source Serif 4**, the face VISION 6.1 names (proposal P1), self-hosted in
  `client/public/fonts/`: regular, italic and semibold, latin and latin-ext
  (six files, 115 KB on disk in all). Taken from `@fontsource/source-serif-4`
  5.3.1 with `npm pack`; SIL Open Font License 1.1. `@font-face` rules are in
  `client/src/index.css` with the same `unicode-range` values as the other
  families. Nothing is preloaded. Checked in the built site: Home, /family,
  /topics and the 404 do not request it; an essay and John 1 do.
  The task asked for the latin subset; latin-ext is added too because the
  Bible notes and essays carry transliterated Greek and Hebrew (a macron would
  otherwise fall back to Georgia inside a word). The latin-ext files download
  only when a page uses those characters.
- Token `--font-reading`. Applied through the existing classes: `.article-body`
  (essays, history essays, every `Prose` block), `.tb-passage`, `.tb-body p`,
  `.tb-text`, `.tb-questions`, `.tb-grownups__line` (devotions), `.tp-short p`,
  `.tp-text` (topics), `.sy-prose p`, `.st-passage__text` (the verse sheet);
  and by one-token edits where the type is inline: the Study Bible chapter
  text, the interlinear verse line, the verse panel's verse, verse notes and
  the study-bible `Prose`, `/answers`, how-to guides.
- Body size is a token, `--fs-read` (19px on a phone to 20px on a desk),
  line height `--lh-read` 1.6, oldstyle figures in running text. The essay's
  reader text size is now a multiplier (`--read-scale`) on that token, not a
  pixel number in JavaScript.
- **Curly quotes.** `client/src/lib/smartQuotes.ts`: a small function and a
  remark plugin, in both Markdown paths (`Markdown.tsx`,
  `MarkdownVerseRefs.tsx`) and in `lib/prose.tsx` for plain-text paragraphs.
  It changes only `"` and `'`, never dashes or ellipses, never code, never the
  stored text. The essay title and the line under it go through it as well.
  True italics come from the italic file (no browser slant in reading text).

### 2. The essay's top (ArticleDetail, above the body only)

- The head is the title block alone: section name, title, the line under it,
  the short rule, then name, minutes and date. The "All essays" bar, the
  person icon and the three buttons under the byline are gone.
- One quiet row of tools between two hairlines at the top of the reading
  column: Listen, text size, Save, Focus (new local `EssayTools`). Save writes
  to My Library through `lib/library` and says so, or shows the house
  save-failure line.
- "In this essay" is one closed line on every screen (it was an open white
  card on desktop). The essay's first sentence now starts about 690px down at
  1440 x 900 (it was about 1,150px) and about 610px down on a 390 x 844 phone.
- One centered reading column, `--w-read` (38.5rem), body in the reading face
  at `--fs-read`, a three-line Cormorant initial.
- Nothing after the body-end sentinel was touched. "Send to my phone", Print
  and Cite now appear once, in the bar after the essay (the connect unit's).
- Tests updated to the new contract in `ArticleDetail.test.tsx` (head has no
  buttons; Save in the tools row and after the essay; Send once; contents
  closed at both widths; text size as `--read-scale`).

### 3. One scale

- Tokens in `:root`: `--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-h3`,
  `--fs-read`, `--lh-read`, `--fs-lede`, `--gutter`, `--page-top`, `--w-read`.
- Page titles: measured on the nineteen pages (the audit's eighteen plus
  /search). Before: ten sizes on desktop. After: two. Home and About at
  `--fs-display` (78px at 1440), every other page at `--fs-h1` (56px at 1440,
  36px on a phone).
- Side margin on a phone: the left edge of the title is 16px on every one of
  those pages (it was 16, 24 or 32). Done by swapping the section's side
  padding for `var(--gutter)`; desktop is unchanged (32px).
- Section titles in the shared classes (`.ed-section-head h2`,
  `.tp-section__title`, `.tb-section__title`, `.sy-h2`) take `--fs-h2`.
- Buttons: `.btn`, `.btn--quiet`, `.btn--text`, `.btn--on-dark` join the
  existing `.pg-action` family (one button, three weights). One card
  (`.ed-card`), one label (`.eyebrow`). A heading used as a label keeps the
  label's face (it was 12px Cormorant capitals on /tools).
- Pages were not restyled beyond these one-token edits.

### 4. Pressed, focus, contrast, footer

- **Pressed:** one zero-specificity rule; every link, button, summary and
  role=button dims while the finger is down, and buttons settle by a pixel.
  A no-op `touchstart` listener in `main.tsx` so iOS Safari applies `:active`.
  The global two-tone focus ring already existed and is unchanged.
- **Contrast:** `/search` labels and the back link use `--mustard-text` (was
  bright mustard on cream, 2.09:1); its selected filter is ink, not a mustard
  fill. The eyebrow in the dark `StatementBand` (/family, /theology/history)
  uses bright `--mustard` on charcoal (was `--mustard-text`, 2.9:1).
- **Phone footer:** at 640px and under, the five link groups are closed rows
  that open (`<details class="ft-group">`). 1,918px before, 785px after at
  390 wide. Desktop markup is unchanged.
- **Footer email box:** the field sits on its own line at the column's full
  width with the placeholder "Your email" (the old one was clipped); the
  button is bone on charcoal, not a mustard fill; the "One serious essay a
  week" label uses `--charcoal-fg`, so it no longer vanishes in night mode.

### 5. The not-found page

Inside the site's `Layout` (header and footer), an ink button and two quiet
ones, `noindex`. An unknown address is served the shell, whose own robots tag
says "index"; the page removes that tag while it is up so the only one left is
`noindex, follow` (checked in the built site). The dash in its copy is gone.

### 6. Night

Checked with `html.dark` forced, both sizes: Home, the essay, John 1, /family,
/topics, the 404, /search and the footer. No new color tokens were added.

## Files

`client/public/fonts/` (six woff2, README), `client/src/index.css`,
`client/src/lib/smartQuotes.ts` (+ test), `client/src/lib/prose.tsx`,
`client/src/main.tsx`, `client/src/components/{Markdown,MarkdownVerseRefs,
Footer,NewsletterSignup,EditorialBlocks}.tsx`,
`client/src/pages/{ArticleDetail,NotFound,Search,StudyBible,TheologyHistory,
Writing,Help,ToolsHub,Resources,EmailSignup,Contact,About,Home,Study,Speaking,
Family,Answers,HowToArticle}.tsx`, `client/src/pages/study-bible/{shared,
VerseNotes}.tsx`, `client/src/pages/tools/TestTheCase.tsx`,
`client/src/pages/ArticleDetail.test.tsx`.

Shared files touched: `client/src/index.css` only (tokens added after the Type
line in `:root`; a block before "EASY EDITS"; the essay block and
`.article-body` rules edited in place). Not touched: `App.tsx`, `siteNav.ts`,
`prerender-heads.mjs`, `vercel.json`, `llms.txt`.

Merge notes: `Footer.tsx` is changed in the group loop only (a `usePhoneWidth`
hook and the `<details>` wrap); the brand column and the bottom bar are as they
were, for the connect unit. In `ArticleDetail.tsx` everything from the body-end
sentinel down is untouched, except that `measure` is now `var(--w-read)`.

## What I ran

- `pnpm check`: passed (again on the final tree).
- The whole content-gates step from `ci.yml` (33 commands): all passed. After
  the last two small commits, `validate-design`, `validate-no-emdash`,
  `validate-links`, `validate-grow-voice` were run again: passed.
- `pnpm test`: 114 files passed, 7 skipped; 1,313 tests passed, 73 skipped.
  Run once, before the last two small commits (the 404's robots effect and two
  CSS rules). After them: the route smoke test, `ArticleDetail.test.tsx` and
  `site-structure.test.ts` were run again and passed.
- `pnpm build`, `pnpm sitemap`, `pnpm prerender`, `pnpm audit:canonicals`:
  passed (no database, so the sitemap wrote its static fallback).
- ESLint on the files I changed: clean, except two warnings in
  `pages/tools/TestTheCase.tsx` (lines 33 and 38) that are in the base commit
  and not in lines I touched. I left them.
- `validate-design.mjs`: 178 hex, the same as the baseline. The count did not
  go down, so `--update` was not run.
- Chromium at 390 x 844 and 1440 x 900 against the built site
  (`serve -s dist/public`, tRPC stubbed). Screenshots in
  `/home/user/elite-shots/design/`: `before-*` (base), `after-*` and
  `after-dark-*` (Home, the essay, John 1, /family, /topics, the 404), plus
  working shots (`w1` to `w5`, `dark-*`).

## Not verified

- A real iPhone or Safari: the pressed state and the font were checked in
  Chromium only.
- axe and Lighthouse were not run. The contrast fixes follow the audit's
  measured values and the token table, not a new axe pass.
- Essays that come only from the database (no rewrite file) were not seen in
  the browser: there is no database here. The essay checked is
  `what-post-christian-means`.
- `/search` with results on screen was not captured (the labels were changed
  in code and the page was seen empty).
- Print output of an essay in the new face was not looked at.
- Whether James's own Substack uses a serif: this session cannot open it.

## Skipped, and why

- Devotion fields, Bible notes and other JSON text that does not pass through
  Markdown or `Prose` still show typewriter apostrophes (for example "God's"
  in a devotion's big line). Fixing it means edits across the family and
  study-bible page files other units are in.
- Mustard words inside headlines ("Actually" on /tools, "once" on /subscribe)
  and the round controls on /study/bible, /help and /tools: page-by-page
  restyling, outside "adopt the shared classes".
- The gray Subscribe button on /subscribe, dates on /writing, the floating
  Find Help tab on essays, Subscribe in the phone header: audit items that sit
  in other units' pages.
- Inter italic was not added (the reading face now carries the italics).
- The drawings (the Line, the canon bars), shorter hub pages, the chapter as a
  desk, a Paper or Night control: not in this unit's list.

## Waits for James

1. The reading face is Source Serif 4 (audit decision 13). If he would rather
   have another, it is one token and six files.
2. The essay's top no longer offers "Send to my phone" or Print before the
   text; both are after the essay (decision 14).
3. Essay block quotations stay in Cormorant italic with the mustard rule. The
   October vision would set long Scripture in the reading face instead. Left
   as it was; his call.
4. The footer placeholder now reads "Your email".

## Decision Log lines to add (CLAUDE.md is not edited by this unit)

- **Typography:** add a row to the table. Reading (essays, Scripture,
  devotions, history, answers): Source Serif 4, 400, 400 italic and 600,
  `--font-reading`, `--fs-read` (19 to 20px), line height 1.6, column
  `--w-read`. Body (Inter) is then interface and short copy. Fonts stay
  self-hosted; the reading face is never preloaded.
- **Scale:** page titles use `--fs-h1`; only Home and About use
  `--fs-display`. Section titles use `--fs-h2`. Side padding of a page section
  is `var(--gutter)`. New pages take these tokens, not a new `clamp()`.
- **Parts:** one button family (`.btn` / `.pg-action`, `--quiet`, `--text`,
  `--on-dark`), one card (`.ed-card`), one label (`.eyebrow`). No mustard
  fills on buttons.
- **Quotes:** typewriter quotation marks are curled at render time by
  `lib/smartQuotes.ts`; stored text is not changed.
- **Essay page:** the head is the title block; one tools row (Listen, text
  size, Save, Focus); the contents line starts closed; send, print and cite
  are after the essay.
- **Pressed state:** global, in `index.css`; components do not add their own.
- **404:** rendered inside `Layout`, `noindex`.
