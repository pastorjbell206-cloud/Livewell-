# Prompt: a simpler, friendlier LiveWell, as a preview

Paste everything below the line into a Claude Code session opened in the LiveWell repo.

---

I want LiveWell (livewellbyjamesbell.co, this repo) to be much easier to use. I love the design: the cream, black and mustard, the serif headings, the engraved drawings. Keep all of that. But there is a lot of information, and a first-time visitor can feel it. I want the site to feel the way BibleProject's site feels: clean, calm, professional, and obvious to use. One clear thing to do on each page, generous space, plain words, and the next step always in sight.

Build me a **preview** I can click through before anything changes on the live site.

## 1. Read first

Read `CLAUDE.md` top to bottom (palette, typography, the seven doors, the design parts, the Decision Log), then `docs/work/elite/map.md` (the map as built) and `docs/work/elite/nav-audit.md`. Then look at the live site yourself, at phone width (390) and desktop (1440), with Playwright: the home page, each of the seven doors (/study, /theology/history, /topics, /family, /tools, /writing, /about), /start, one Bible book page, one chapter, one answer page, one tool, and /search.

Study bibleproject.com the same way, at both widths, and write down what makes it easy: how much is on a screen at once, how a page leads you to one action, how cards and lists are built, how video is offered, how navigation stays out of the way. Learn the principles. Do not copy their layouts, wording, illustrations or brand. LiveWell keeps its own look.

## 2. Diagnose, in plain words

Write `docs/work/elite/simpler/diagnosis.md`. For each page you looked at, answer:

- What is a first-time visitor trying to do here?
- What gets in the way? Be specific: too many choices at once, long blocks before the point, repeated links, labels that only make sense to us, buttons that look alike but do different things, dense text on a phone.
- What is the one thing this page should help them do?

End with the ten changes that would help the most, ranked, each in one or two sentences.

## 3. Design the simpler site

Keep LiveWell's palette, type, tokens and art kit exactly; change structure, density and wording, not the brand. Principles to hold to:

- **One job per screen.** The first screen of every page says what the page is and offers one obvious next step.
- **Fewer choices, better ordered.** Show the three or four things most people want, with "See everything" behind them. Nothing removed from the site; just less at once.
- **Big, quiet cards** for the things people choose between (a book, a film, a question, a tool): one picture, a title, one short line.
- **Plain labels.** Say what a thing is ("Read the Bible", "Watch a short film", "Ask a hard question"), not what we call it internally.
- **Video up front** where we have a film, the way BibleProject leads with its videos.
- **Shorter blocks of text** before the first action; the depth stays, lower on the page.
- **Phone first.** Everything works one-handed at 390.
- **The next step is always visible** at the end of every page.

Do not change: the seven doors and their names (James chose them), any of James's own writing (essays, books, his biography), Scripture, care and crisis wording (Find Help lines, safety plans), routes, the database or the API.

## 4. Build the preview

Build it on a new branch, `preview/simpler`, in a git worktree, so the live site is untouched. Redesign these pages, real and working, with the site's real data: the home page, the Bible door (/study), one Bible book page (/study/bible/john), the Questions door (/topics), the Family door (/family), the Tools door (/tools), and /start. Leave every other page as it is.

Push the branch and open a **draft** pull request titled "Preview: a simpler LiveWell". Vercel builds a preview of every pull request; put that preview link at the top of the pull request and send it to me. Never merge it, never push to `main`, never push to `claude/todo-implementation-hhp4bm`. Nothing reaches the live site until I say so.

Keep the normal gates green on the branch (`pnpm check`, the content gates in `.github/workflows/ci.yml`, `pnpm test`, `pnpm build`), so the preview is something we could actually ship.

## 5. Show me

Send me:

1. The preview link.
2. Before and after screenshots of each redesigned page, at phone and desktop width, side by side, as one page I can scroll (`docs/work/elite/simpler/before-after.html`, or an artifact if your session can make one).
3. The diagnosis and the ten ranked changes.
4. What you changed on each page, in a few plain sentences, and anything you wanted to change but left for me to decide.

Then stop and wait for me. I will choose what to keep.
