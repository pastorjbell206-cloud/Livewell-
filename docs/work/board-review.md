# Board review: work notes (persisted so a container reset loses nothing)

Work on branch `claude/sweet-galileo-xykZR`, restarted from main (a2a2ad6e) on
2026-10-27 with James's approval. Nothing here is read by the site build.

## Where the September work went

The September board-review work (PR #459, closed unmerged on 2026-10-26) is
kept by GitHub at `refs/pull/459/head` = b03b1a3a. Read any file from it with
`git fetch origin refs/pull/459/head && git show FETCH_HEAD:<path>`. This
session cannot push tags (HTTP 403), so the requested `archive/pr-459` tag
was not created; James can add it with `git tag archive/pr-459 b03b1a3a`.

## James's decisions (keep them)

- 29 Sept: no book count anywhere ("author"; the books are listed at /books).
- 29 Sept, confirmed 27 Oct: he is "a pastor", never "a Baptist pastor"; no
  tie to the SBC or any convention. The church's name is a fact and may appear.
- 29 Sept: cut unverifiable anecdotes about him (done on main by 6241f132).
- 29 Sept: the Study Bible keeps the BSB and says why; essays quote the ESV.
- 27 Oct: gifts given on LiveWell pages go to LiveWell itself. LiveWell needs
  its own Stripe account first, so the PCN "Give a gift" links come down
  until it exists.
- Allowed biography: came to faith from atheism; raised without a father;
  married to Susanna; five sons; Lead Pastor of First Baptist Church of
  Fenton; founded PCN. Tenure: never "fifteen"; "twelve" was confirmed in
  September, but the October notes call it unresolved, so add no new tenure
  claims.

## Scope (27 Oct)

Another session owns the 43 pending shelf essays and the church-history study
redesign (branch `claude/todo-implementation-hhp4bm`, `docs/work/NOTES.md`).
This branch stays out of `client/src/lib/shelf.json`, `client/public/essays/`
and the church-history data, and does the rest of the board review in
PR-sized batches: trust, reader paths and dev server, reading polish,
study-guide nav and footer, argument cases, paid-ebook gate, print kit,
dark mode, Scripture index.

## Not decided (ask James)

- Serif text face for essay bodies (Source Serif 4) vs Inter.
- /ethics entries need his position on each before publishing.
