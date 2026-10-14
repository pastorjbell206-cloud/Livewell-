# Crisis pages awaiting James's approval

These two care pages are written, validated, and reviewed against the
safe-messaging and safety rules in `docs/grow/CARE-PAGE-SPEC.md`, but they are
not published. `docs/grow/GROW-PROMPT.md` Section 12 reserves one decision for
James: "approval of the tone of every `crisis` page before it ships."

| Draft | Read it | Source |
|---|---|---|
| I don't want to be alive anymore | `suicidal-thoughts.md` | `suicidal-thoughts.json` |
| I'm not safe at home | `unsafe-at-home.md` | `unsafe-at-home.json` |

The `.md` files are readable renderings for review; the `.json` files are the
pages themselves. Each lists, at the end, the places where James's own word or
landing belongs (slots) and every outside source, all of which were confirmed
only through search excerpts and should be opened once before release.

**To publish one after approval:** move the `.json` file into
`client/public/needs/` (it replaces nothing; neither need has a starter there),
run `node scripts/build-needs-index.mjs`, then
`node scripts/validate-needs.mjs` and the page render test
(`pnpm exec vitest run --project client client/src/pages/help/CarePage.test.tsx`).
Delete the matching `.md` file.

**To change one before approval:** edit the `.json`, then check it with
`node scripts/validate-needs.mjs --drafts <slug>` (CI runs the same check on
everything in this folder).
